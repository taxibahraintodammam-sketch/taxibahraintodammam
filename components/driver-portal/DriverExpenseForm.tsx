'use client';

import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, Fuel, Wrench, MoreHorizontal, Upload } from 'lucide-react';

interface DriverInfo {
    full_name: string;
    vehicle_model: string;
}

const CATEGORIES = [
    { value: 'fuel', label: 'Fuel', icon: Fuel },
    { value: 'maintenance', label: 'Maintenance', icon: Wrench },
    { value: 'other', label: 'Other', icon: MoreHorizontal },
];

export default function DriverExpenseForm({ token }: { token: string }) {
    const [driver, setDriver] = useState<DriverInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [category, setCategory] = useState('fuel');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('BHD');
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10));
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/driver-portal/${token}/`)
            .then(res => {
                if (!res.ok) throw new Error('not found');
                return res.json();
            })
            .then(data => setDriver(data))
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [token]);

    const handleSubmit = async () => {
        setError('');
        const amountNum = parseFloat(amount);
        if (!amountNum || amountNum <= 0) { setError('Enter a valid amount'); return; }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('amount', amount);
            formData.append('currency', currency);
            formData.append('expense_date', expenseDate);
            if (description) formData.append('description', description);
            if (file) formData.append('file', file);

            const res = await fetch(`/api/driver-portal/${token}/`, { method: 'POST', body: formData });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to submit');

            setSubmitted(true);
            setAmount('');
            setDescription('');
            setFile(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit');
        } finally {
            setSubmitting(false);
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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold text-gray-900">Hi, {driver.full_name}</h1>
                    <p className="text-sm text-gray-500">{driver.vehicle_model}</p>
                </div>

                {submitted ? (
                    <div className="bg-white rounded-2xl p-6 text-center border-2 border-green-200">
                        <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                        <p className="font-bold text-gray-900 mb-1">Submitted!</p>
                        <p className="text-sm text-gray-500 mb-4">Your expense has been sent to the office.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-sm font-semibold text-primary underline"
                        >
                            Submit another
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                            {CATEGORIES.map(c => {
                                const Icon = c.icon;
                                return (
                                    <button
                                        key={c.value}
                                        onClick={() => setCategory(c.value)}
                                        className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-xs font-semibold transition-colors ${
                                            category === c.value ? 'border-primary bg-primary/10 text-gray-900' : 'border-gray-200 text-gray-500'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {c.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="0"
                                step="0.001"
                                placeholder="Amount"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <select
                                value={currency}
                                onChange={e => setCurrency(e.target.value)}
                                className="text-sm border border-gray-300 rounded-lg px-2.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="BHD">BHD</option>
                                <option value="SAR">SAR</option>
                            </select>
                        </div>

                        <input
                            type="date"
                            value={expenseDate}
                            onChange={e => setExpenseDate(e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Note (optional)"
                            rows={2}
                            className="w-full text-sm border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        <label className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-gray-600 border-2 border-dashed border-gray-300 rounded-xl py-4 cursor-pointer hover:bg-gray-50">
                            <Upload className="w-4 h-4" />
                            {file ? file.name : 'Upload receipt photo'}
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={e => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                        </label>

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <button
                            onClick={handleSubmit}
                            disabled={submitting || !amount}
                            className="w-full bg-black text-white font-bold py-3 rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
                        >
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            Submit Expense
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
