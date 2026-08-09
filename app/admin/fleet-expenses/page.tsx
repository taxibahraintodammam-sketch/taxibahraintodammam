'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { driverService, Driver, DriverExpense, DriverExpenseCategory } from '@/lib/driverService';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    Fuel, Wrench, Wallet, AlertTriangle, MoreHorizontal, TrendingUp,
    DollarSign, Loader2, Calendar, RefreshCw, X, Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CATEGORY_META: Record<DriverExpenseCategory, { label: string; color: string; icon: typeof Fuel }> = {
    fuel:        { label: 'Fuel',        color: '#60a5fa', icon: Fuel },
    maintenance: { label: 'Maintenance', color: '#a78bfa', icon: Wrench },
    advance:     { label: 'Advance',     color: '#34d399', icon: Wallet },
    penalty:     { label: 'Penalty',     color: '#f87171', icon: AlertTriangle },
    other:       { label: 'Other',       color: '#9ca3af', icon: MoreHorizontal },
};

const CATEGORY_ORDER: DriverExpenseCategory[] = ['fuel', 'maintenance', 'advance', 'penalty', 'other'];

const formatAmount = (amount: number, currency: string) =>
    `${currency} ${amount.toFixed(currency === 'BHD' ? 3 : 2)}`;

const PRESETS = [
    { label: 'This Month',    getValue: () => { const d = new Date(); return { from: `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-01`, to: new Date().toLocaleDateString('en-CA') }; } },
    { label: 'Last Month',    getValue: () => { const d = new Date(); d.setMonth(d.getMonth()-1); const y = d.getFullYear(), m = d.getMonth()+1; const last = new Date(y, m, 0).getDate(); return { from: `${y}-${String(m).padStart(2,'0')}-01`, to: `${y}-${String(m).padStart(2,'0')}-${last}` }; } },
    { label: 'Last 3 Months', getValue: () => { const to = new Date().toLocaleDateString('en-CA'); const f = new Date(); f.setMonth(f.getMonth()-3); return { from: f.toLocaleDateString('en-CA'), to }; } },
    { label: 'This Year',     getValue: () => { const y = new Date().getFullYear(); return { from: `${y}-01-01`, to: new Date().toLocaleDateString('en-CA') }; } },
    { label: 'All Time',      getValue: () => ({ from: '', to: '' }) },
];

export default function FleetExpensesPage() {
    const router = useRouter();
    const [expenses, setExpenses] = useState<DriverExpense[]>([]);
    const [drivers, setDrivers]   = useState<Driver[]>([]);
    const [loading, setLoading]   = useState(true);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo]     = useState('');
    const [activePreset, setActivePreset] = useState('All Time');
    const [categoryFilter, setCategoryFilter] = useState<DriverExpenseCategory | 'all'>('all');
    const [driverFilter, setDriverFilter] = useState('all');

    const loadData = async () => {
        setLoading(true);
        try {
            const [expenseData, driverData] = await Promise.all([
                driverService.getAllExpenses(),
                driverService.getAllDrivers(),
            ]);
            setExpenses(expenseData);
            setDrivers(driverData);
        } catch (error) {
            console.error('Error loading fleet expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) { router.push('/admin/login'); return; }
            loadData();
        });
    }, [router]);

    const driverName = useMemo(() => {
        const map = new Map<string, string>();
        drivers.forEach(d => map.set(d.id, d.full_name));
        return map;
    }, [drivers]);

    const applyPreset = (preset: typeof PRESETS[0]) => {
        const { from, to } = preset.getValue();
        setDateFrom(from);
        setDateTo(to);
        setActivePreset(preset.label);
    };

    const clearDates = () => {
        setDateFrom('');
        setDateTo('');
        setActivePreset('All Time');
    };

    const filtered = useMemo(() => {
        return expenses.filter(e => {
            if (dateFrom && e.expense_date < dateFrom) return false;
            if (dateTo && e.expense_date > dateTo) return false;
            if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
            if (driverFilter !== 'all' && e.driver_id !== driverFilter) return false;
            return true;
        });
    }, [expenses, dateFrom, dateTo, categoryFilter, driverFilter]);

    if (loading) return (
        <div className="flex justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
        </div>
    );

    const hasDateFilter = !!dateFrom || !!dateTo;

    // --- Summary stats (all currencies, grouped) ---
    const totalByCurrency = filtered.reduce((acc, e) => {
        acc[e.currency] = (acc[e.currency] || 0) + e.amount;
        return acc;
    }, {} as Record<string, number>);
    const fuelByCurrency = filtered.filter(e => e.category === 'fuel').reduce((acc, e) => {
        acc[e.currency] = (acc[e.currency] || 0) + e.amount;
        return acc;
    }, {} as Record<string, number>);
    const labelFromCurrencyMap = (m: Record<string, number>) =>
        Object.keys(m).length === 0 ? '—' : Object.entries(m).map(([c, a]) => formatAmount(a, c)).join(' + ');

    const driversWithSpend = new Set(filtered.map(e => e.driver_id)).size;

    // --- Monthly trend, stacked by category (BHD only — mixing currencies would misreport totals) ---
    const monthlyMap = new Map<string, Record<string, number>>();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(); d.setMonth(d.getMonth() - i);
        monthlyMap.set(d.toLocaleString('en-US', { month: 'short', year: '2-digit' }), { fuel: 0, maintenance: 0, advance: 0, penalty: 0, other: 0 });
    }
    for (const e of filtered) {
        if (e.currency !== 'BHD') continue;
        const key = new Date(e.expense_date).toLocaleString('en-US', { month: 'short', year: '2-digit' });
        const row = monthlyMap.get(key);
        if (row) row[e.category] = (row[e.category] || 0) + e.amount;
    }
    const monthlyTrend = Array.from(monthlyMap.entries()).map(([month, cats]) => ({ month, ...cats }));

    // --- Category breakdown (BHD only) ---
    const categoryTotals = CATEGORY_ORDER.map(cat => ({
        name: CATEGORY_META[cat].label,
        category: cat,
        value: filtered.filter(e => e.category === cat && e.currency === 'BHD').reduce((s, e) => s + e.amount, 0),
    })).filter(c => c.value > 0);

    // --- Per-driver breakdown (BHD only, top 8) ---
    const driverTotals = new Map<string, number>();
    for (const e of filtered) {
        if (e.currency !== 'BHD') continue;
        driverTotals.set(e.driver_id, (driverTotals.get(e.driver_id) || 0) + e.amount);
    }
    const driverBreakdown = Array.from(driverTotals.entries())
        .map(([driverId, total]) => ({ driver: driverName.get(driverId) || 'Unknown', total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 8);

    return (
        <div className="text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Fleet Expenses
                    </h1>
                    <p className="text-neutral-400 mt-1">
                        {hasDateFilter
                            ? `Showing ${filtered.length} entries ${dateFrom ? `from ${dateFrom}` : ''} ${dateTo ? `to ${dateTo}` : ''}`
                            : 'Fuel, maintenance, advances and penalties across every driver'
                        }
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={loadData} className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 gap-2 shrink-0">
                    <RefreshCw className="w-4 h-4" /> Refresh
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4 mb-6 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <Calendar className="w-4 h-4 text-neutral-400 shrink-0 mt-2 sm:mt-0" />
                    <div className="flex flex-wrap gap-2 flex-1">
                        {PRESETS.map(p => (
                            <button
                                key={p.label}
                                onClick={() => applyPreset(p)}
                                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors ${activePreset === p.label ? 'bg-primary text-black' : 'bg-neutral-700 text-neutral-300 hover:text-white'}`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                            type="date"
                            value={dateFrom}
                            onChange={e => { setDateFrom(e.target.value); setActivePreset('Custom'); }}
                            className="bg-neutral-700 border-neutral-600 text-white text-xs h-8 w-36"
                        />
                        <span className="text-neutral-500 text-xs">to</span>
                        <Input
                            type="date"
                            value={dateTo}
                            onChange={e => { setDateTo(e.target.value); setActivePreset('Custom'); }}
                            className="bg-neutral-700 border-neutral-600 text-white text-xs h-8 w-36"
                        />
                        {hasDateFilter && (
                            <button onClick={clearDates} className="text-neutral-500 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center border-t border-neutral-700 pt-3">
                    <button
                        onClick={() => setCategoryFilter('all')}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors ${categoryFilter === 'all' ? 'bg-primary text-black' : 'bg-neutral-700 text-neutral-300 hover:text-white'}`}
                    >
                        All Categories
                    </button>
                    {CATEGORY_ORDER.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors ${categoryFilter === cat ? 'bg-primary text-black' : 'bg-neutral-700 text-neutral-300 hover:text-white'}`}
                        >
                            {CATEGORY_META[cat].label}
                        </button>
                    ))}
                    <select
                        value={driverFilter}
                        onChange={e => setDriverFilter(e.target.value)}
                        className="ml-auto text-xs bg-neutral-700 border border-neutral-600 text-neutral-300 rounded-lg px-3 py-1.5 focus:outline-none"
                    >
                        <option value="all">All Drivers</option>
                        {drivers.map(d => (
                            <option key={d.id} value={d.id}>{d.full_name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Spend',   value: labelFromCurrencyMap(totalByCurrency), icon: DollarSign, color: 'text-primary' },
                    { label: 'Fuel Spend',    value: labelFromCurrencyMap(fuelByCurrency),   icon: Fuel,       color: 'text-sky-400' },
                    { label: 'Entries',       value: filtered.length,                        icon: Receipt,    color: 'text-emerald-400' },
                    { label: 'Drivers w/ Spend', value: driversWithSpend,                    icon: TrendingUp, color: 'text-neutral-300' },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-neutral-800 rounded-xl p-5 border border-neutral-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-4 h-4 ${color}`} />
                            <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">{label}</p>
                        </div>
                        <p className={`text-2xl font-black ${color}`}>{value}</p>
                        {hasDateFilter && <p className="text-[10px] text-neutral-500 mt-1">In selected period</p>}
                    </div>
                ))}
            </div>

            {/* Monthly Trend (stacked by category) */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 mb-5">
                <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-widest mb-1">
                    Monthly Spend (Last 6 Months)
                </h2>
                <p className="text-[11px] text-neutral-500 mb-4">BHD entries only — other currencies excluded to avoid mixing totals</p>
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={monthlyTrend} barSize={36}>
                        <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}`} />
                        <Tooltip
                            contentStyle={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: 8, color: '#fff' }}
                            formatter={(v, name) => [`BHD ${Number(v).toLocaleString()}`, CATEGORY_META[name as DriverExpenseCategory]?.label || name]}
                        />
                        <Legend formatter={(value) => <span className="text-neutral-300 text-xs">{CATEGORY_META[value as DriverExpenseCategory]?.label || value}</span>} />
                        {CATEGORY_ORDER.map(cat => (
                            <Bar key={cat} dataKey={cat} stackId="spend" fill={CATEGORY_META[cat].color} radius={cat === 'fuel' ? [0, 0, 0, 0] : undefined} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                {/* Category Breakdown */}
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
                    <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-widest mb-5">
                        Spend by Category
                    </h2>
                    {categoryTotals.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={categoryTotals} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
                                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}
                                >
                                    {categoryTotals.map((entry, i) => (
                                        <Cell key={i} fill={CATEGORY_META[entry.category].color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: 8, color: '#fff' }}
                                    formatter={(v) => `BHD ${Number(v).toLocaleString()}`}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[200px] flex items-center justify-center text-neutral-500 text-sm">No BHD data in this range</div>
                    )}
                </div>

                {/* Per-Driver Breakdown */}
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
                    <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-widest mb-5">
                        Top Spend by Driver
                    </h2>
                    {driverBreakdown.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={driverBreakdown} layout="vertical" barSize={16}>
                                <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis type="category" dataKey="driver" tick={{ fill: '#d1d5db', fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                                <Tooltip
                                    contentStyle={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: 8, color: '#fff' }}
                                    formatter={(v) => `BHD ${Number(v).toLocaleString()}`}
                                />
                                <Bar dataKey="total" fill="#C6FF00" radius={[0, 6, 6, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[200px] flex items-center justify-center text-neutral-500 text-sm">No BHD data in this range</div>
                    )}
                </div>
            </div>

            {/* Raw ledger */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
                <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-widest px-6 pt-6 pb-4">
                    All Entries
                </h2>
                {filtered.length === 0 ? (
                    <p className="text-neutral-500 text-sm text-center py-10">No expenses in this range.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-neutral-700 text-left text-xs text-neutral-500 uppercase tracking-wide">
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Driver</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Source</th>
                                    <th className="px-6 py-3">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered
                                    .slice()
                                    .sort((a, b) => b.expense_date.localeCompare(a.expense_date))
                                    .slice(0, 100)
                                    .map(e => {
                                        const meta = CATEGORY_META[e.category];
                                        const Icon = meta.icon;
                                        return (
                                            <tr key={e.id} className="border-b border-neutral-700/50 last:border-0 hover:bg-neutral-700/20">
                                                <td className="px-6 py-3 text-neutral-300">
                                                    {new Date(e.expense_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-3 text-neutral-300">{driverName.get(e.driver_id) || 'Unknown'}</td>
                                                <td className="px-6 py-3">
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: meta.color }}>
                                                        <Icon className="w-3.5 h-3.5" /> {meta.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 font-semibold text-white">{formatAmount(e.amount, e.currency)}</td>
                                                <td className="px-6 py-3 text-neutral-400 capitalize">{e.source || 'admin'}</td>
                                                <td className="px-6 py-3 text-neutral-400 max-w-xs truncate">{e.description || '—'}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {filtered.length > 100 && (
                            <p className="text-xs text-neutral-500 text-center py-4">Showing latest 100 of {filtered.length} entries — narrow the filters above to see more specific results.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
