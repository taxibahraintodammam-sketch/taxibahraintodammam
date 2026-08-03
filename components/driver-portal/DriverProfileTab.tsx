'use client';

import { useState } from 'react';
import { Loader2, Save, Check } from 'lucide-react';
import type { PortalDriverInfo } from './DriverPortalDashboard';

export default function DriverProfileTab({
    token,
    driver,
    onSaved,
}: {
    token: string;
    driver: PortalDriverInfo;
    onSaved: (driver: PortalDriverInfo) => void;
}) {
    const [form, setForm] = useState({
        full_name: driver.full_name,
        phone_number: driver.phone_number,
        city: driver.city,
        vehicle_model: driver.vehicle_model,
        vehicle_plate: driver.vehicle_plate || '',
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async () => {
        setError('');
        if (!form.full_name || !form.phone_number || !form.city || !form.vehicle_model) {
            setError('Full name, phone, city and vehicle are required');
            return;
        }
        setSaving(true);
        try {
            const res = await fetch(`/api/driver-portal/${token}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to save');

            onSaved({ ...driver, ...form });
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">My Profile</p>
            <div className="space-y-3">
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
                    <input
                        value={form.full_name}
                        onChange={e => setForm({ ...form, full_name: e.target.value })}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
                    <input
                        value={form.phone_number}
                        onChange={e => setForm({ ...form, phone_number: e.target.value })}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">City</label>
                    <input
                        value={form.city}
                        onChange={e => setForm({ ...form, city: e.target.value })}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Vehicle Model</label>
                    <input
                        value={form.vehicle_model}
                        onChange={e => setForm({ ...form, vehicle_model: e.target.value })}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Vehicle Plate</label>
                    <input
                        value={form.vehicle_plate}
                        onChange={e => setForm({ ...form, vehicle_plate: e.target.value })}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`w-full font-bold py-3 rounded-xl disabled:opacity-40 flex items-center justify-center gap-2 transition-colors ${
                        saved ? 'bg-emerald-600 text-white' : 'bg-black text-white'
                    }`}
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? 'Saved' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
