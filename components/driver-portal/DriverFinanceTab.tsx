'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, Fuel, Wrench, MoreHorizontal, Upload } from 'lucide-react';
import type { PortalEarnings } from './DriverPortalDashboard';

const CATEGORIES = [
    { value: 'fuel', label: 'Fuel', icon: Fuel },
    { value: 'maintenance', label: 'Maintenance', icon: Wrench },
    { value: 'other', label: 'Other', icon: MoreHorizontal },
];

const formatAmount = (amount: number, currency: string) =>
    `${currency} ${amount.toFixed(currency === 'BHD' ? 3 : 2)}`;

export default function DriverFinanceTab({
    token,
    earnings,
    onExpenseAdded,
}: {
    token: string;
    earnings: PortalEarnings;
    onExpenseAdded: () => void;
}) {
    const [category, setCategory] = useState('fuel');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('BHD');
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10));
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const earnedEntries = Object.entries(earnings.earnedByCurrency);
    const spentEntries = Object.entries(earnings.spentByCurrency);
    const currencies = Array.from(new Set([...Object.keys(earnings.earnedByCurrency), ...Object.keys(earnings.spentByCurrency)]));

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

            const res = await fetch(`/api/driver-portal/${token}/expenses/`, { method: 'POST', body: formData });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to submit');

            setSubmitted(true);
            setAmount('');
            setDescription('');
            setFile(null);
            onExpenseAdded();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">My Earnings</p>
                <p className="text-xs text-gray-500 mb-3">{earnings.completedTrips} completed trip{earnings.completedTrips === 1 ? '' : 's'}</p>
                {currencies.length === 0 ? (
                    <p className="text-sm text-gray-400">No completed trips or expenses yet</p>
                ) : (
                    <div className="space-y-2">
                        {earnedEntries.map(([cur, amt]) => (
                            <div key={`e-${cur}`} className="flex justify-between text-sm">
                                <span className="text-gray-500">Earned ({cur})</span>
                                <span className="font-bold text-emerald-700">{formatAmount(amt, cur)}</span>
                            </div>
                        ))}
                        {spentEntries.map(([cur, amt]) => (
                            <div key={`s-${cur}`} className="flex justify-between text-sm">
                                <span className="text-gray-500">Spent ({cur})</span>
                                <span className="font-bold text-blue-700">{formatAmount(amt, cur)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-100 p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Submit an Expense</p>

                {submitted ? (
                    <div className="text-center py-4">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="font-bold text-gray-900 mb-1 text-sm">Submitted!</p>
                        <button onClick={() => setSubmitted(false)} className="text-xs font-semibold text-primary underline">
                            Submit another
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
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
