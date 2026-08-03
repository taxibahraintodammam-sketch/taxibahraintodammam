'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, Car, Wallet, FileText, User, List } from 'lucide-react';
import DriverTripsTab from './DriverTripsTab';
import DriverFinanceTab from './DriverFinanceTab';
import DriverDocumentsTab from './DriverDocumentsTab';
import DriverProfileTab from './DriverProfileTab';

export interface PortalDriverInfo {
    full_name: string;
    phone_number: string;
    email: string;
    city: string;
    vehicle_model: string;
    vehicle_plate: string | null;
    duty_status: 'on_duty' | 'off_duty' | 'on_leave' | 'suspended';
}

const DUTY_OPTIONS = [
    { value: 'on_duty', label: 'On Duty', dot: 'bg-green-400' },
    { value: 'off_duty', label: 'Off Duty', dot: 'bg-gray-400' },
    { value: 'on_leave', label: 'On Leave', dot: 'bg-amber-400' },
] as const;

export interface PortalEarnings {
    completedTrips: number;
    earnedByCurrency: Record<string, number>;
    spentByCurrency: Record<string, number>;
}

type Tab = 'trips' | 'finance' | 'documents' | 'profile';

const TABS: { id: Tab; label: string; icon: typeof Car }[] = [
    { id: 'trips', label: 'Trips', icon: List },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
];

export default function DriverPortalDashboard({ token }: { token: string }) {
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [driver, setDriver] = useState<PortalDriverInfo | null>(null);
    const [earnings, setEarnings] = useState<PortalEarnings | null>(null);
    const [tab, setTab] = useState<Tab>('trips');

    const loadOverview = useCallback(async () => {
        try {
            const res = await fetch(`/api/driver-portal/${token}/`);
            if (!res.ok) throw new Error('not found');
            const data = await res.json();
            setDriver(data.driver);
            setEarnings(data.earnings);
        } catch {
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadOverview();
    }, [loadOverview]);

    const handleDutyChange = async (duty_status: string) => {
        if (!driver) return;
        const previous = driver.duty_status;
        setDriver({ ...driver, duty_status: duty_status as PortalDriverInfo['duty_status'] });
        try {
            const res = await fetch(`/api/driver-portal/${token}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ duty_status }),
            });
            if (!res.ok) throw new Error('Failed');
        } catch (err) {
            console.error('Error updating duty status:', err);
            setDriver({ ...driver, duty_status: previous });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (notFound || !driver) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="text-center max-w-sm">
                    <p className="text-lg font-bold text-gray-900 mb-2">Link not valid</p>
                    <p className="text-sm text-gray-500">This link is invalid or your account isn&apos;t active. Please contact your manager.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-black text-white px-4 sm:px-8 py-6">
                <div className="max-w-2xl mx-auto flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                        <Car className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-lg font-bold truncate">Hi, {driver.full_name}</h1>
                        <p className="text-xs text-gray-400 truncate">{driver.vehicle_model}{driver.vehicle_plate ? ` · ${driver.vehicle_plate}` : ''}</p>
                    </div>
                    {driver.duty_status !== 'suspended' && (
                        <div className="relative shrink-0">
                            <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${DUTY_OPTIONS.find(o => o.value === driver.duty_status)?.dot || 'bg-gray-400'}`} />
                            <select
                                value={driver.duty_status}
                                onChange={e => handleDutyChange(e.target.value)}
                                className="bg-white/10 text-white text-xs font-semibold rounded-full pl-6 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                            >
                                {DUTY_OPTIONS.map(o => (
                                    <option key={o.value} value={o.value} className="text-gray-900">{o.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-4 sm:p-6">
                {tab === 'trips' && <DriverTripsTab token={token} />}
                {tab === 'finance' && earnings && (
                    <DriverFinanceTab token={token} earnings={earnings} onExpenseAdded={loadOverview} />
                )}
                {tab === 'documents' && <DriverDocumentsTab token={token} />}
                {tab === 'profile' && (
                    <DriverProfileTab token={token} driver={driver} onSaved={setDriver} />
                )}
            </div>

            {/* Bottom tab bar */}
            <div
                className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
                {TABS.map(t => {
                    const Icon = t.icon;
                    const active = tab === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-semibold transition-colors ${
                                active ? 'text-black' : 'text-gray-400'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${active ? 'text-primary' : ''}`} />
                            {t.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
