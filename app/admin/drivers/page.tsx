'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { driverService, Driver, DriverExpense, DriverExpenseCategory } from '@/lib/driverService';
import { Button } from '@/components/ui/button';
import {
    CheckCircle, XCircle, RotateCcw, Phone, Mail, MapPin, Car,
    Calendar, MessageCircle, StickyNote, Save, Loader2, Check,
    Wallet, Fuel, Wrench, AlertTriangle, MoreHorizontal, ChevronDown,
    ChevronUp, Plus, Trash2, Image as ImageIcon, UserPlus, Pencil, X,
    CreditCard
} from 'lucide-react';

const CATEGORY_META: Record<DriverExpenseCategory, { label: string; color: string; icon: typeof Fuel }> = {
    fuel: { label: 'Fuel', color: 'bg-blue-100 text-blue-800', icon: Fuel },
    maintenance: { label: 'Maintenance', color: 'bg-purple-100 text-purple-800', icon: Wrench },
    advance: { label: 'Advance', color: 'bg-emerald-100 text-emerald-800', icon: Wallet },
    penalty: { label: 'Penalty', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
    other: { label: 'Other', color: 'bg-gray-100 text-gray-800', icon: MoreHorizontal },
};

const formatAmount = (amount: number, currency: string) =>
    `${currency} ${amount.toFixed(currency === 'BHD' ? 3 : 2)}`;

const sumByCurrency = (list: DriverExpense[]) =>
    list.reduce((acc, e) => {
        acc[e.currency] = (acc[e.currency] || 0) + e.amount;
        return acc;
    }, {} as Record<string, number>);

const emptyProfileForm = () => ({
    full_name: '',
    phone_number: '',
    email: '',
    city: '',
    vehicle_model: '',
    vehicle_plate: '',
});

const emptyExpenseForm = () => ({
    category: 'fuel' as DriverExpenseCategory,
    amount: '',
    currency: 'BHD',
    expense_date: new Date().toISOString().slice(0, 10),
    description: '',
    file: null as File | null,
});

export default function AdminDriversPage() {
    const router = useRouter();
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
    const [notesDraft, setNotesDraft] = useState<{ [key: string]: string }>({});
    const [savingNotes, setSavingNotes] = useState<string | null>(null);
    const [notesSaved, setNotesSaved] = useState<string | null>(null);

    // Fuel / maintenance / advance / penalty expense ledger per driver
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [expenses, setExpenses] = useState<{ [driverId: string]: DriverExpense[] }>({});
    const [allExpenses, setAllExpenses] = useState<DriverExpense[]>([]);
    const [loadingExpenses, setLoadingExpenses] = useState<string | null>(null);
    const [expenseForm, setExpenseForm] = useState(emptyExpenseForm());
    const [savingExpense, setSavingExpense] = useState(false);
    const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(null);

    // Add-to-roster + edit-profile (name/phone/vehicle/plate) — for company-owned drivers,
    // not just WhatsApp applications
    const [showAddDriver, setShowAddDriver] = useState(false);
    const [addDriverForm, setAddDriverForm] = useState(emptyProfileForm());
    const [addingDriver, setAddingDriver] = useState(false);
    const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
    const [profileForm, setProfileForm] = useState(emptyProfileForm());
    const [savingProfile, setSavingProfile] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) { router.push('/admin/login'); return; }
            loadDrivers();
            loadAllExpenses();
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

    const loadAllExpenses = async () => {
        try {
            const data = await driverService.getAllExpenses();
            setAllExpenses(data);
        } catch (error) {
            console.error('Error loading fleet expenses:', error);
        }
    };

    const toggleExpenses = async (driverId: string) => {
        if (expandedId === driverId) { setExpandedId(null); return; }
        setExpandedId(driverId);
        setExpenseForm(emptyExpenseForm());
        if (!expenses[driverId]) {
            setLoadingExpenses(driverId);
            try {
                const data = await driverService.getExpenses(driverId);
                setExpenses(prev => ({ ...prev, [driverId]: data }));
            } catch (error) {
                console.error('Error loading expenses:', error);
            } finally {
                setLoadingExpenses(null);
            }
        }
    };

    const handleAddExpense = async (driverId: string) => {
        const amountNum = parseFloat(expenseForm.amount);
        if (!amountNum || amountNum <= 0) { alert('Enter a valid amount'); return; }

        setSavingExpense(true);
        try {
            let receipt_url: string | undefined;
            if (expenseForm.file) {
                const url = await driverService.uploadReceipt(expenseForm.file);
                if (!url) {
                    alert('Receipt upload failed. Ensure the "driver-receipts" bucket exists in Supabase Storage.');
                    setSavingExpense(false);
                    return;
                }
                receipt_url = url;
            }

            const newExpense = await driverService.addExpense({
                driver_id: driverId,
                category: expenseForm.category,
                amount: amountNum,
                currency: expenseForm.currency,
                expense_date: expenseForm.expense_date,
                description: expenseForm.description || undefined,
                receipt_url,
            });

            setExpenses(prev => ({ ...prev, [driverId]: [newExpense, ...(prev[driverId] || [])] }));
            setAllExpenses(prev => [newExpense, ...prev]);
            setExpenseForm({ ...emptyExpenseForm(), currency: expenseForm.currency });
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense');
        } finally {
            setSavingExpense(false);
        }
    };

    const handleDeleteExpense = async (driverId: string, expenseId: string) => {
        if (!confirm('Delete this expense entry?')) return;
        setDeletingExpenseId(expenseId);
        try {
            await driverService.deleteExpense(expenseId);
            setExpenses(prev => ({ ...prev, [driverId]: (prev[driverId] || []).filter(e => e.id !== expenseId) }));
            setAllExpenses(prev => prev.filter(e => e.id !== expenseId));
        } catch (error) {
            console.error('Error deleting expense:', error);
            alert('Failed to delete expense');
        } finally {
            setDeletingExpenseId(null);
        }
    };

    const handleAddDriver = async () => {
        if (!addDriverForm.full_name || !addDriverForm.phone_number || !addDriverForm.city || !addDriverForm.vehicle_model) {
            alert('Full name, phone, city and vehicle are required');
            return;
        }
        setAddingDriver(true);
        try {
            const created = await driverService.addDriver(addDriverForm);
            setDrivers(prev => [created, ...prev]);
            setAddDriverForm(emptyProfileForm());
            setShowAddDriver(false);
        } catch (error) {
            console.error('Error adding driver:', error);
            alert('Failed to add driver');
        } finally {
            setAddingDriver(false);
        }
    };

    const startEditProfile = (driver: Driver) => {
        setEditingProfileId(driver.id);
        setProfileForm({
            full_name: driver.full_name,
            phone_number: driver.phone_number,
            email: driver.email,
            city: driver.city,
            vehicle_model: driver.vehicle_model,
            vehicle_plate: driver.vehicle_plate || '',
        });
    };

    const handleSaveProfile = async (id: string) => {
        if (!profileForm.full_name || !profileForm.phone_number || !profileForm.city || !profileForm.vehicle_model) {
            alert('Full name, phone, city and vehicle are required');
            return;
        }
        setSavingProfile(true);
        try {
            const updated = await driverService.updateDriverProfile(id, profileForm);
            setDrivers(prev => prev.map(d => d.id === id ? updated : d));
            setEditingProfileId(null);
        } catch (error) {
            console.error('Error updating driver profile:', error);
            alert('Failed to update driver');
        } finally {
            setSavingProfile(false);
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
                <div className="mb-8 flex items-start justify-between gap-3 flex-wrap">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Driver Management</h1>
                        <p className="text-gray-600 mt-2">Manage your driver roster, applications, and per-driver expenses</p>
                    </div>
                    <Button
                        onClick={() => setShowAddDriver(prev => !prev)}
                        className="bg-black text-white hover:bg-gray-800"
                    >
                        {showAddDriver ? <X className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                        {showAddDriver ? 'Cancel' : 'Add Driver'}
                    </Button>
                </div>

                {/* Add driver directly to the roster (bypasses the application flow) */}
                {showAddDriver && (
                    <div className="bg-white rounded-lg p-4 sm:p-6 border-2 border-gray-900 mb-8">
                        <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                            <UserPlus className="w-4 h-4" /> Add a company driver
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                            <input
                                value={addDriverForm.full_name}
                                onChange={e => setAddDriverForm({ ...addDriverForm, full_name: e.target.value })}
                                placeholder="Full name *"
                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                value={addDriverForm.phone_number}
                                onChange={e => setAddDriverForm({ ...addDriverForm, phone_number: e.target.value })}
                                placeholder="Phone number *"
                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                value={addDriverForm.email}
                                onChange={e => setAddDriverForm({ ...addDriverForm, email: e.target.value })}
                                placeholder="Email (optional)"
                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                value={addDriverForm.city}
                                onChange={e => setAddDriverForm({ ...addDriverForm, city: e.target.value })}
                                placeholder="City *"
                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                value={addDriverForm.vehicle_model}
                                onChange={e => setAddDriverForm({ ...addDriverForm, vehicle_model: e.target.value })}
                                placeholder="Vehicle model *"
                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                value={addDriverForm.vehicle_plate}
                                onChange={e => setAddDriverForm({ ...addDriverForm, vehicle_plate: e.target.value })}
                                placeholder="Vehicle plate"
                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <Button
                            onClick={handleAddDriver}
                            disabled={addingDriver}
                            className="bg-green-600 text-white hover:bg-green-700"
                        >
                            {addingDriver ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                            Add to Roster
                        </Button>
                    </div>
                )}

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

                {/* Fleet-wide expense total */}
                {allExpenses.length > 0 && (
                    <div className="bg-white rounded-lg p-4 sm:p-6 border-2 border-blue-200 mb-8 flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
                            <Wallet className="w-4 h-4 text-blue-600" /> Total Fleet Spend:
                        </span>
                        {Object.entries(sumByCurrency(allExpenses)).map(([cur, amt]) => (
                            <span key={cur} className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-bold">
                                {formatAmount(amt, cur)}
                            </span>
                        ))}
                    </div>
                )}

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
                                    {editingProfileId !== driver.id && (
                                        <button
                                            onClick={() => startEditProfile(driver)}
                                            className="text-gray-400 hover:text-gray-900 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
                                            title="Edit driver profile"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {editingProfileId === driver.id ? (
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                            <input
                                                value={profileForm.full_name}
                                                onChange={e => setProfileForm({ ...profileForm, full_name: e.target.value })}
                                                placeholder="Full name *"
                                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            />
                                            <input
                                                value={profileForm.phone_number}
                                                onChange={e => setProfileForm({ ...profileForm, phone_number: e.target.value })}
                                                placeholder="Phone number *"
                                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            />
                                            <input
                                                value={profileForm.email}
                                                onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                                                placeholder="Email"
                                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            />
                                            <input
                                                value={profileForm.city}
                                                onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                                                placeholder="City *"
                                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            />
                                            <input
                                                value={profileForm.vehicle_model}
                                                onChange={e => setProfileForm({ ...profileForm, vehicle_model: e.target.value })}
                                                placeholder="Vehicle model *"
                                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            />
                                            <input
                                                value={profileForm.vehicle_plate}
                                                onChange={e => setProfileForm({ ...profileForm, vehicle_plate: e.target.value })}
                                                placeholder="Vehicle plate"
                                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleSaveProfile(driver.id)}
                                                disabled={savingProfile}
                                                className="bg-black text-white hover:bg-gray-800"
                                            >
                                                {savingProfile ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                                Save
                                            </Button>
                                            <Button onClick={() => setEditingProfileId(null)} variant="outline">
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                                        <a href={`mailto:${driver.email}`} className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                                            <Mail className="w-4 h-4 text-gray-400 shrink-0" /> <span className="truncate">{driver.email || '—'}</span>
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
                                        {driver.vehicle_plate && (
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <CreditCard className="w-4 h-4 text-gray-400 shrink-0" /> {driver.vehicle_plate}
                                            </div>
                                        )}
                                    </div>
                                )}

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
                                    <Button
                                        onClick={() => toggleExpenses(driver.id)}
                                        variant="outline"
                                        className="text-blue-700 border-blue-300 hover:bg-blue-50"
                                    >
                                        <Wallet className="w-4 h-4 mr-2" />
                                        Expenses{expenses[driver.id] ? ` (${expenses[driver.id].length})` : ''}
                                        {expandedId === driver.id
                                            ? <ChevronUp className="w-4 h-4 ml-2" />
                                            : <ChevronDown className="w-4 h-4 ml-2" />}
                                    </Button>
                                </div>

                                {/* Expense ledger — fuel, maintenance, advance, penalty */}
                                {expandedId === driver.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        {(() => {
                                            const list = expenses[driver.id] || [];
                                            const totals = Object.entries(sumByCurrency(list));
                                            return totals.length > 0 ? (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {totals.map(([cur, amt]) => (
                                                        <span key={cur} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
                                                            Total spent: {formatAmount(amt, cur)}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : null;
                                        })()}

                                        {/* Add expense */}
                                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
                                            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                                <Fuel className="w-3.5 h-3.5" /> Add Expense
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                                                <select
                                                    value={expenseForm.category}
                                                    onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value as DriverExpenseCategory })}
                                                    className="text-sm border border-blue-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                >
                                                    {Object.entries(CATEGORY_META).map(([key, meta]) => (
                                                        <option key={key} value={key}>{meta.label}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.001"
                                                    placeholder="Amount"
                                                    value={expenseForm.amount}
                                                    onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                                                    className="text-sm border border-blue-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                />
                                                <select
                                                    value={expenseForm.currency}
                                                    onChange={e => setExpenseForm({ ...expenseForm, currency: e.target.value })}
                                                    className="text-sm border border-blue-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                >
                                                    <option value="BHD">BHD</option>
                                                    <option value="SAR">SAR</option>
                                                </select>
                                                <input
                                                    type="date"
                                                    value={expenseForm.expense_date}
                                                    onChange={e => setExpenseForm({ ...expenseForm, expense_date: e.target.value })}
                                                    className="text-sm border border-blue-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                />
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-2 mb-2">
                                                <textarea
                                                    value={expenseForm.description}
                                                    onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })}
                                                    placeholder="Note (e.g. full tank at ADNOC, Manama)"
                                                    rows={1}
                                                    className="flex-1 text-sm bg-white border border-blue-200 rounded-lg p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-blue-300 text-gray-700"
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => setExpenseForm({ ...expenseForm, file: e.target.files?.[0] || null })}
                                                    className="text-xs text-blue-700 file:mr-2 file:py-2 file:px-2.5 file:rounded-lg file:border-0 file:bg-blue-200 file:text-blue-800 file:text-xs file:font-semibold"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => handleAddExpense(driver.id)}
                                                disabled={savingExpense || !expenseForm.amount}
                                                className="bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                                {savingExpense ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                                                Add Expense
                                            </Button>
                                        </div>

                                        {/* Expense history */}
                                        {loadingExpenses === driver.id ? (
                                            <div className="text-center py-6 text-sm text-gray-500">Loading expenses...</div>
                                        ) : (expenses[driver.id] || []).length === 0 ? (
                                            <div className="text-center py-6 text-sm text-gray-400">No expenses recorded yet</div>
                                        ) : (
                                            <div className="space-y-2">
                                                {(expenses[driver.id] || []).map(expense => {
                                                    const meta = CATEGORY_META[expense.category];
                                                    const Icon = meta.icon;
                                                    return (
                                                        <div key={expense.id} className="flex items-start justify-between gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                            <div className="flex items-start gap-3 min-w-0">
                                                                <span className={`shrink-0 p-1.5 rounded-lg ${meta.color}`}>
                                                                    <Icon className="w-3.5 h-3.5" />
                                                                </span>
                                                                <div className="min-w-0">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <span className="text-sm font-bold text-gray-900">{formatAmount(expense.amount, expense.currency)}</span>
                                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${meta.color}`}>{meta.label}</span>
                                                                        <span className="text-xs text-gray-400">
                                                                            {new Date(expense.expense_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                        </span>
                                                                    </div>
                                                                    {expense.description && (
                                                                        <p className="text-xs text-gray-500 mt-0.5 truncate">{expense.description}</p>
                                                                    )}
                                                                    {expense.receipt_url && (
                                                                        <a
                                                                            href={expense.receipt_url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                                                                        >
                                                                            <ImageIcon className="w-3 h-3" /> View receipt
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeleteExpense(driver.id, expense.id)}
                                                                disabled={deletingExpenseId === expense.id}
                                                                className="shrink-0 text-gray-300 hover:text-red-600 transition-colors p-1"
                                                                title="Delete"
                                                            >
                                                                {deletingExpenseId === expense.id
                                                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                                                    : <Trash2 className="w-4 h-4" />}
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
