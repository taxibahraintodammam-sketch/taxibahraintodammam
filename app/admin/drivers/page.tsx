'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { driverService, Driver } from '@/lib/driverService';
import { Button } from '@/components/ui/button';
import {
    CheckCircle, XCircle, RotateCcw, Phone, Mail, MapPin, Car,
    Calendar, MessageCircle, StickyNote, Save, Loader2, Check
} from 'lucide-react';

export default function AdminDriversPage() {
    const router = useRouter();
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
    const [notesDraft, setNotesDraft] = useState<{ [key: string]: string }>({});
    const [savingNotes, setSavingNotes] = useState<string | null>(null);
    const [notesSaved, setNotesSaved] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) { router.push('/admin/login'); return; }
            loadDrivers();
        });
    }, [router]);

    const loadDrivers = async () => {
        try {
            setLoading(true);
            const data = await driverService.getAllDrivers();
            setDrivers(data);
        } catch (error) {
            console.error('Error loading drivers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await driverService.approveDriver(id);
            loadDrivers();
        } catch (error) {
            console.error('Error approving driver:', error);
            alert('Failed to approve driver');
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm('Reject this driver application?')) return;
        try {
            await driverService.rejectDriver(id);
            loadDrivers();
        } catch (error) {
            console.error('Error rejecting driver:', error);
            alert('Failed to reject driver');
        }
    };

    const handleRevert = async (id: string) => {
        try {
            await driverService.revertToPending(id);
            loadDrivers();
        } catch (error) {
            console.error('Error reverting driver:', error);
        }
    };

    const saveNotes = async (id: string) => {
        setSavingNotes(id);
        try {
            await driverService.saveNotes(id, notesDraft[id] || '');
            setDrivers(prev => prev.map(d => d.id === id ? { ...d, admin_notes: notesDraft[id] } : d));
            setNotesSaved(id);
            setTimeout(() => setNotesSaved(null), 2500);
        } catch (error) {
            console.error('Error saving notes:', error);
        } finally {
            setSavingNotes(null);
        }
    };

    const filteredDrivers = drivers.filter(d => filter === 'all' || d.status === filter);

    const stats = {
        total: drivers.length,
        pending: drivers.filter(d => d.status === 'pending').length,
        approved: drivers.filter(d => d.status === 'approved').length,
        rejected: drivers.filter(d => d.status === 'rejected').length,
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Driver Applications</h1>
                    <p className="text-gray-600 mt-2">Review and manage drivers who applied to join the fleet</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <div className="bg-white rounded-lg p-4 sm:p-6 border-2 border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Total</div>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 sm:p-6 border-2 border-yellow-200">
                        <div className="text-sm text-gray-600 mb-1">Pending</div>
                        <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.pending}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 sm:p-6 border-2 border-green-200">
                        <div className="text-sm text-gray-600 mb-1">Approved</div>
                        <div className="text-2xl sm:text-3xl font-bold text-green-600">{stats.approved}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 sm:p-6 border-2 border-red-200">
                        <div className="text-sm text-gray-600 mb-1">Rejected</div>
                        <div className="text-2xl sm:text-3xl font-bold text-red-600">{stats.rejected}</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg p-4 mb-6 border-2 border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
                            <Button
                                key={f}
                                variant={filter === f ? 'default' : 'outline'}
                                onClick={() => setFilter(f)}
                                className={filter === f
                                    ? f === 'pending' ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                    : f === 'approved' ? 'bg-green-600 text-white hover:bg-green-700'
                                    : f === 'rejected' ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-black text-white hover:bg-gray-800'
                                    : ''}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? stats.total : stats[f]})
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Drivers List */}
                {loading ? (
                    <div className="text-center py-12 text-gray-600">Loading applications...</div>
                ) : filteredDrivers.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center border-2 border-gray-200">
                        <div className="text-gray-400">No driver applications found</div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredDrivers.map((driver) => (
                            <div key={driver.id} className="bg-white rounded-lg p-4 sm:p-6 border-2 border-gray-200">
                                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h3 className="text-lg font-bold text-gray-900">{driver.full_name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                driver.status === 'approved' ? 'bg-green-100 text-green-800'
                                                : driver.status === 'pending' ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                                {driver.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Applied {new Date(driver.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                                    <a href={`mailto:${driver.email}`} className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                                        <Mail className="w-4 h-4 text-gray-400 shrink-0" /> <span className="truncate">{driver.email}</span>
                                    </a>
                                    <a href={`https://wa.me/${driver.phone_number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors">
                                        <Phone className="w-4 h-4 text-gray-400 shrink-0" /> {driver.phone_number}
                                    </a>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" /> {driver.city}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Car className="w-4 h-4 text-gray-400 shrink-0" /> {driver.vehicle_model}
                                    </div>
                                </div>

                                {/* Internal Notes */}
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1.5">
                                            <StickyNote className="w-3.5 h-3.5" /> Internal Notes
                                        </p>
                                        <button
                                            onClick={() => saveNotes(driver.id)}
                                            disabled={savingNotes === driver.id || (notesDraft[driver.id] ?? driver.admin_notes ?? '') === (driver.admin_notes || '')}
                                            className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                                                notesSaved === driver.id
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-amber-200 text-amber-800 hover:bg-amber-300 disabled:opacity-40'
                                            }`}
                                        >
                                            {savingNotes === driver.id
                                                ? <Loader2 className="w-3 h-3 animate-spin" />
                                                : notesSaved === driver.id
                                                ? <><Check className="w-3 h-3" /> Saved</>
                                                : <><Save className="w-3 h-3" /> Save</>
                                            }
                                        </button>
                                    </div>
                                    <textarea
                                        value={notesDraft[driver.id] ?? driver.admin_notes ?? ''}
                                        onChange={e => setNotesDraft({ ...notesDraft, [driver.id]: e.target.value })}
                                        placeholder="e.g. license checked, called and confirmed vehicle year..."
                                        rows={2}
                                        className="w-full text-sm bg-white border border-amber-200 rounded-lg p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder:text-amber-300 text-gray-700"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-2">
                                    {driver.status !== 'approved' && (
                                        <Button onClick={() => handleApprove(driver.id)} className="bg-green-600 text-white hover:bg-green-700">
                                            <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                        </Button>
                                    )}
                                    {driver.status !== 'rejected' && (
                                        <Button onClick={() => handleReject(driver.id)} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                                            <XCircle className="w-4 h-4 mr-2" /> Reject
                                        </Button>
                                    )}
                                    {driver.status !== 'pending' && (
                                        <Button onClick={() => handleRevert(driver.id)} variant="outline" className="text-gray-500 border-gray-300 hover:bg-gray-50">
                                            <RotateCcw className="w-4 h-4 mr-2" /> Back to Pending
                                        </Button>
                                    )}
                                    <a
                                        href={`https://wa.me/${driver.phone_number.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${driver.full_name}, thank you for applying to join our driver network in ${driver.city}.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#25D366] text-white text-sm font-medium hover:bg-[#20bd5a] transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4" /> WhatsApp
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
