'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { driverService, Driver, DriverExpense, DriverExpenseCategory, DriverDocument, DriverDocType, DriverAdvanceRepayment, DriverSettlement } from '@/lib/driverService';
import { absoluteUrl } from '@/lib/url';
import { Button } from '@/components/ui/button';
import {
    CheckCircle, XCircle, RotateCcw, Phone, Mail, MapPin, Car,
    Calendar, MessageCircle, StickyNote, Save, Loader2, Check,
    Wallet, Fuel, Wrench, AlertTriangle, MoreHorizontal, ChevronDown,
    ChevronUp, Plus, Trash2, Image as ImageIcon, UserPlus, Pencil, X,
    CreditCard, TrendingUp, FileText, Banknote, Link2
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

const sumByCurrency = (list: { amount: number; currency: string }[]) =>
    list.reduce((acc, e) => {
        acc[e.currency] = (acc[e.currency] || 0) + e.amount;
        return acc;
    }, {} as Record<string, number>);

interface BookingSummaryRow {
    total_price: number | null;
    currency: string | null;
    status: string;
}

const sumEarningsByCurrency = (rows: BookingSummaryRow[]) =>
    rows.filter(r => r.status === 'completed').reduce((acc, r) => {
        const cur = r.currency || 'SAR';
        acc[cur] = (acc[cur] || 0) + (r.total_price || 0);
        return acc;
    }, {} as Record<string, number>);

const DOC_TYPE_META: Record<DriverDocType, string> = {
    license: 'Driving License',
    iqama_id: 'Iqama / ID',
    vehicle_registration: 'Vehicle Registration',
    insurance: 'Insurance',
    other: 'Other',
};

const getExpiryStatus = (expiryDate?: string): { label: string; color: string } | null => {
    if (!expiryDate) return null;
    const days = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 0) return { label: `Expired ${Math.abs(days)}d ago`, color: 'bg-red-100 text-red-800' };
    if (days <= 30) return { label: `Expires in ${days}d`, color: 'bg-amber-100 text-amber-800' };
    return { label: 'Valid', color: 'bg-green-100 text-green-800' };
};

const emptyDocumentForm = () => ({
    doc_type: 'license' as DriverDocType,
    document_number: '',
    expiry_date: '',
    file: null as File | null,
});

const emptyRepaymentForm = () => ({
    amount: '',
    currency: 'BHD',
    repaid_date: new Date().toISOString().slice(0, 10),
    note: '',
});

const emptySettlementForm = () => ({
    period_start: new Date(new Date().setDate(1)).toISOString().slice(0, 10),
    period_end: new Date().toISOString().slice(0, 10),
    amount_paid: '',
    currency: 'BHD',
    note: '',
});

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

    // Fuel / maintenance / advance / penalty expense ledger per driver, plus the
    // earnings side (completed bookings) so we can show a net profit per driver
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [expenses, setExpenses] = useState<{ [driverId: string]: DriverExpense[] }>({});
    const [allExpenses, setAllExpenses] = useState<DriverExpense[]>([]);
    const [bookingSummaries, setBookingSummaries] = useState<{ [driverId: string]: BookingSummaryRow[] }>({});
    const [allBookingSummaries, setAllBookingSummaries] = useState<(BookingSummaryRow & { driver_id: string })[]>([]);
    const [loadingExpenses, setLoadingExpenses] = useState<string | null>(null);
    const [expenseForm, setExpenseForm] = useState(emptyExpenseForm());
    const [savingExpense, setSavingExpense] = useState(false);
    const [deletingExpenseId, setDeletingExpenseId] = useState<string | null>(null);

    // License / Iqama / registration / insurance documents per driver
    const [expandedDocsId, setExpandedDocsId] = useState<string | null>(null);
    const [documents, setDocuments] = useState<{ [driverId: string]: DriverDocument[] }>({});
    const [allDocuments, setAllDocuments] = useState<DriverDocument[]>([]);
    const [loadingDocuments, setLoadingDocuments] = useState<string | null>(null);
    const [documentForm, setDocumentForm] = useState(emptyDocumentForm());
    const [savingDocument, setSavingDocument] = useState(false);
    const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(null);

    // Outstanding advance balance (advances given minus repaid) + logged payouts per period
    const [expandedSettlementId, setExpandedSettlementId] = useState<string | null>(null);
    const [advanceRepayments, setAdvanceRepayments] = useState<{ [driverId: string]: DriverAdvanceRepayment[] }>({});
    const [settlements, setSettlements] = useState<{ [driverId: string]: DriverSettlement[] }>({});
    const [loadingSettlement, setLoadingSettlement] = useState<string | null>(null);
    const [repaymentForm, setRepaymentForm] = useState(emptyRepaymentForm());
    const [savingRepayment, setSavingRepayment] = useState(false);
    const [deletingRepaymentId, setDeletingRepaymentId] = useState<string | null>(null);
    const [settlementForm, setSettlementForm] = useState(emptySettlementForm());
    const [savingSettlement, setSavingSettlement] = useState(false);
    const [deletingSettlementId, setDeletingSettlementId] = useState<string | null>(null);
    const [allAdvanceRepayments, setAllAdvanceRepayments] = useState<DriverAdvanceRepayment[]>([]);

    // Add-to-roster + edit-profile (name/phone/vehicle/plate) — for company-owned drivers,
    // not just WhatsApp applications
    const [showAddDriver, setShowAddDriver] = useState(false);
    const [addDriverForm, setAddDriverForm] = useState(emptyProfileForm());
    const [addingDriver, setAddingDriver] = useState(false);
    const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
    const [profileForm, setProfileForm] = useState(emptyProfileForm());
    const [savingProfile, setSavingProfile] = useState(false);
    const [sendingPortalLinkId, setSendingPortalLinkId] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) { router.push('/admin/login'); return; }
            loadDrivers();
            loadAllExpenses();
            loadAllBookingSummaries();
            loadAllDocuments();
            loadAllAdvanceRepayments();
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

    const loadAllBookingSummaries = async () => {
        try {
            const data = await driverService.getAllDriverBookingSummaries();
            setAllBookingSummaries(data);
        } catch (error) {
            console.error('Error loading fleet booking summaries:', error);
        }
    };

    const loadAllDocuments = async () => {
        try {
            const data = await driverService.getAllDocuments();
            setAllDocuments(data);
        } catch (error) {
            console.error('Error loading fleet documents:', error);
        }
    };

    const loadAllAdvanceRepayments = async () => {
        try {
            const data = await driverService.getAllAdvanceRepayments();
            setAllAdvanceRepayments(data);
        } catch (error) {
            console.error('Error loading fleet advance repayments:', error);
        }
    };

    const toggleExpenses = async (driverId: string) => {
        if (expandedId === driverId) { setExpandedId(null); return; }
        setExpandedId(driverId);
        setExpenseForm(emptyExpenseForm());
        const needsExpenses = !expenses[driverId];
        const needsBookings = !bookingSummaries[driverId];
        if (needsExpenses || needsBookings) {
            setLoadingExpenses(driverId);
            try {
                const [expenseData, bookingData] = await Promise.all([
                    needsExpenses ? driverService.getExpenses(driverId) : Promise.resolve(expenses[driverId]),
                    needsBookings ? driverService.getDriverBookingSummary(driverId) : Promise.resolve(bookingSummaries[driverId]),
                ]);
                if (needsExpenses) setExpenses(prev => ({ ...prev, [driverId]: expenseData }));
                if (needsBookings) setBookingSummaries(prev => ({ ...prev, [driverId]: bookingData }));
            } catch (error) {
                console.error('Error loading driver finance data:', error);
            } finally {
                setLoadingExpenses(null);
            }
        }
    };

    const toggleDocuments = async (driverId: string) => {
        if (expandedDocsId === driverId) { setExpandedDocsId(null); return; }
        setExpandedDocsId(driverId);
        setDocumentForm(emptyDocumentForm());
        if (!documents[driverId]) {
            setLoadingDocuments(driverId);
            try {
                const data = await driverService.getDocuments(driverId);
                setDocuments(prev => ({ ...prev, [driverId]: data }));
            } catch (error) {
                console.error('Error loading documents:', error);
            } finally {
                setLoadingDocuments(null);
            }
        }
    };

    const handleAddDocument = async (driverId: string) => {
        setSavingDocument(true);
        try {
            let file_url: string | undefined;
            if (documentForm.file) {
                const url = await driverService.uploadDocumentFile(documentForm.file);
                if (!url) {
                    alert('File upload failed. Ensure the "driver-receipts" bucket exists in Supabase Storage.');
                    setSavingDocument(false);
                    return;
                }
                file_url = url;
            }

            const newDoc = await driverService.addDocument({
                driver_id: driverId,
                doc_type: documentForm.doc_type,
                document_number: documentForm.document_number || undefined,
                expiry_date: documentForm.expiry_date || undefined,
                file_url,
            });

            setDocuments(prev => ({ ...prev, [driverId]: [newDoc, ...(prev[driverId] || [])] }));
            setAllDocuments(prev => [newDoc, ...prev]);
            setDocumentForm(emptyDocumentForm());
        } catch (error) {
            console.error('Error adding document:', error);
            alert('Failed to add document');
        } finally {
            setSavingDocument(false);
        }
    };

    const handleDeleteDocument = async (driverId: string, docId: string) => {
        if (!confirm('Delete this document?')) return;
        setDeletingDocumentId(docId);
        try {
            await driverService.deleteDocument(docId);
            setDocuments(prev => ({ ...prev, [driverId]: (prev[driverId] || []).filter(d => d.id !== docId) }));
            setAllDocuments(prev => prev.filter(d => d.id !== docId));
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Failed to delete document');
        } finally {
            setDeletingDocumentId(null);
        }
    };

    const toggleSettlement = async (driverId: string) => {
        if (expandedSettlementId === driverId) { setExpandedSettlementId(null); return; }
        setExpandedSettlementId(driverId);
        setRepaymentForm(emptyRepaymentForm());
        setSettlementForm(emptySettlementForm());
        const needsExpenses = !expenses[driverId];
        const needsRepayments = !advanceRepayments[driverId];
        const needsSettlements = !settlements[driverId];
        if (needsExpenses || needsRepayments || needsSettlements) {
            setLoadingSettlement(driverId);
            try {
                const [expenseData, repaymentData, settlementData] = await Promise.all([
                    needsExpenses ? driverService.getExpenses(driverId) : Promise.resolve(expenses[driverId]),
                    needsRepayments ? driverService.getAdvanceRepayments(driverId) : Promise.resolve(advanceRepayments[driverId]),
                    needsSettlements ? driverService.getSettlements(driverId) : Promise.resolve(settlements[driverId]),
                ]);
                if (needsExpenses) setExpenses(prev => ({ ...prev, [driverId]: expenseData }));
                if (needsRepayments) setAdvanceRepayments(prev => ({ ...prev, [driverId]: repaymentData }));
                if (needsSettlements) setSettlements(prev => ({ ...prev, [driverId]: settlementData }));
            } catch (error) {
                console.error('Error loading settlement data:', error);
            } finally {
                setLoadingSettlement(null);
            }
        }
    };

    const handleAddRepayment = async (driverId: string) => {
        const amountNum = parseFloat(repaymentForm.amount);
        if (!amountNum || amountNum <= 0) { alert('Enter a valid amount'); return; }
        setSavingRepayment(true);
        try {
            const newRepayment = await driverService.addAdvanceRepayment({
                driver_id: driverId,
                amount: amountNum,
                currency: repaymentForm.currency,
                repaid_date: repaymentForm.repaid_date,
                note: repaymentForm.note || undefined,
            });
            setAdvanceRepayments(prev => ({ ...prev, [driverId]: [newRepayment, ...(prev[driverId] || [])] }));
            setAllAdvanceRepayments(prev => [newRepayment, ...prev]);
            setRepaymentForm({ ...emptyRepaymentForm(), currency: repaymentForm.currency });
        } catch (error) {
            console.error('Error adding repayment:', error);
            alert('Failed to add repayment');
        } finally {
            setSavingRepayment(false);
        }
    };

    const handleDeleteRepayment = async (driverId: string, repaymentId: string) => {
        if (!confirm('Delete this repayment entry?')) return;
        setDeletingRepaymentId(repaymentId);
        try {
            await driverService.deleteAdvanceRepayment(repaymentId);
            setAdvanceRepayments(prev => ({ ...prev, [driverId]: (prev[driverId] || []).filter(r => r.id !== repaymentId) }));
            setAllAdvanceRepayments(prev => prev.filter(r => r.id !== repaymentId));
        } catch (error) {
            console.error('Error deleting repayment:', error);
            alert('Failed to delete repayment');
        } finally {
            setDeletingRepaymentId(null);
        }
    };

    const handleAddSettlement = async (driverId: string) => {
        const amountNum = parseFloat(settlementForm.amount_paid);
        if (!amountNum || amountNum <= 0) { alert('Enter a valid amount'); return; }
        if (!settlementForm.period_start || !settlementForm.period_end) { alert('Pick a period'); return; }
        setSavingSettlement(true);
        try {
            const newSettlement = await driverService.addSettlement({
                driver_id: driverId,
                period_start: settlementForm.period_start,
                period_end: settlementForm.period_end,
                amount_paid: amountNum,
                currency: settlementForm.currency,
                note: settlementForm.note || undefined,
            });
            setSettlements(prev => ({ ...prev, [driverId]: [newSettlement, ...(prev[driverId] || [])] }));
            setSettlementForm({ ...emptySettlementForm(), currency: settlementForm.currency });
        } catch (error) {
            console.error('Error adding settlement:', error);
            alert('Failed to add settlement');
        } finally {
            setSavingSettlement(false);
        }
    };

    const handleDeleteSettlement = async (driverId: string, settlementId: string) => {
        if (!confirm('Delete this settlement record?')) return;
        setDeletingSettlementId(settlementId);
        try {
            await driverService.deleteSettlement(settlementId);
            setSettlements(prev => ({ ...prev, [driverId]: (prev[driverId] || []).filter(s => s.id !== settlementId) }));
        } catch (error) {
            console.error('Error deleting settlement:', error);
            alert('Failed to delete settlement');
        } finally {
            setDeletingSettlementId(null);
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
            setFilter('approved');
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

    const handleSendPortalLink = async (driver: Driver) => {
        setSendingPortalLinkId(driver.id);
        try {
            let token = driver.access_token;
            if (!token) {
                token = crypto.randomUUID();
                const updated = await driverService.setAccessToken(driver.id, token);
                setDrivers(prev => prev.map(d => d.id === driver.id ? updated : d));
            }
            const url = absoluteUrl(`/driver/${token}`);
            const message = `Hi ${driver.full_name}, use this link to submit your fuel/expense receipts directly to the office: ${url}`;
            window.open(`https://wa.me/${driver.phone_number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
        } catch (error) {
            console.error('Error generating portal link:', error);
            alert('Failed to generate upload link');
        } finally {
            setSendingPortalLinkId(null);
        }
    };

    const filteredDrivers = drivers.filter(d => filter === 'all' || d.status === filter);

    const driversById = Object.fromEntries(drivers.map(d => [d.id, d]));

    const expiringDocs = allDocuments
        .filter(doc => doc.expiry_date && Math.ceil((new Date(doc.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 30)
        .sort((a, b) => new Date(a.expiry_date!).getTime() - new Date(b.expiry_date!).getTime());

    // At-a-glance comparison across the whole roster — earned/spent/net/advance owed per driver
    const overviewRows = drivers
        .filter(d => d.status === 'approved')
        .map(driver => {
            const driverExpensesAll = allExpenses.filter(e => e.driver_id === driver.id);
            const driverBookings = allBookingSummaries.filter(b => b.driver_id === driver.id);
            const driverRepayments = allAdvanceRepayments.filter(r => r.driver_id === driver.id);

            const spent = sumByCurrency(driverExpensesAll);
            const earned = sumEarningsByCurrency(driverBookings);
            const netCurrencies = Array.from(new Set([...Object.keys(spent), ...Object.keys(earned)]));
            const netByCur = Object.fromEntries(netCurrencies.map(cur => [cur, (earned[cur] || 0) - (spent[cur] || 0)]));

            const advancesGiven = sumByCurrency(driverExpensesAll.filter(e => e.category === 'advance'));
            const repaid = sumByCurrency(driverRepayments);
            const advanceCurrencies = Array.from(new Set([...Object.keys(advancesGiven), ...Object.keys(repaid)]));
            const outstandingByCur = advanceCurrencies
                .map(cur => [cur, (advancesGiven[cur] || 0) - (repaid[cur] || 0)] as const)
                .filter(([, amt]) => Math.abs(amt) > 0.001);

            return {
                driver,
                completedTrips: driverBookings.filter(b => b.status === 'completed').length,
                earnedText: Object.entries(earned).map(([c, a]) => formatAmount(a, c)).join(', '),
                spentText: Object.entries(spent).map(([c, a]) => formatAmount(a, c)).join(', '),
                netText: netCurrencies.map(c => formatAmount(netByCur[c], c)).join(', '),
                netNegative: Object.values(netByCur).some(v => v < 0),
                advanceText: outstandingByCur.map(([c, a]) => formatAmount(a, c)).join(', '),
                netSortKey: Object.values(netByCur).reduce((a, b) => a + b, 0),
            };
        })
        .sort((a, b) => b.netSortKey - a.netSortKey);

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

                {/* Documents expiring soon or already expired, across the whole fleet */}
                {expiringDocs.length > 0 && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 sm:p-6 mb-8">
                        <p className="text-sm font-bold text-red-700 mb-3 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4" /> {expiringDocs.length} document{expiringDocs.length === 1 ? '' : 's'} expiring soon or expired
                        </p>
                        <div className="space-y-1.5">
                            {expiringDocs.map(doc => {
                                const driver = driversById[doc.driver_id];
                                const status = getExpiryStatus(doc.expiry_date);
                                return (
                                    <div key={doc.id} className="flex items-center justify-between gap-2 text-sm bg-white rounded-lg px-3 py-2 border border-red-100">
                                        <span className="text-gray-700 truncate">
                                            <span className="font-semibold">{driver?.full_name || 'Unknown driver'}</span> — {DOC_TYPE_META[doc.doc_type]}
                                        </span>
                                        {status && <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${status.color}`}>{status.label}</span>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Fleet-wide finance overview: earned (completed bookings) vs spent (expenses) */}
                {(allExpenses.length > 0 || allBookingSummaries.length > 0) && (
                    <div className="bg-white rounded-lg p-4 sm:p-6 border-2 border-gray-900 mb-8">
                        <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4" /> Fleet Finance Overview
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-gray-500 mr-1">Earned:</span>
                            {Object.entries(sumEarningsByCurrency(allBookingSummaries)).length === 0 ? (
                                <span className="text-xs text-gray-400">—</span>
                            ) : Object.entries(sumEarningsByCurrency(allBookingSummaries)).map(([cur, amt]) => (
                                <span key={cur} className="px-3 py-1 rounded-full bg-emerald-600 text-white text-sm font-bold">{formatAmount(amt, cur)}</span>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-gray-500 mr-1">Spent:</span>
                            {Object.entries(sumByCurrency(allExpenses)).length === 0 ? (
                                <span className="text-xs text-gray-400">—</span>
                            ) : Object.entries(sumByCurrency(allExpenses)).map(([cur, amt]) => (
                                <span key={cur} className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-bold">{formatAmount(amt, cur)}</span>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500 mr-1">Net Profit:</span>
                            {(() => {
                                const earned = sumEarningsByCurrency(allBookingSummaries);
                                const spent = sumByCurrency(allExpenses);
                                const currencies = Array.from(new Set([...Object.keys(earned), ...Object.keys(spent)]));
                                return currencies.length === 0 ? (
                                    <span className="text-xs text-gray-400">—</span>
                                ) : currencies.map(cur => {
                                    const net = (earned[cur] || 0) - (spent[cur] || 0);
                                    return (
                                        <span key={cur} className={`px-3 py-1 rounded-full text-white text-sm font-bold ${net >= 0 ? 'bg-slate-900' : 'bg-red-600'}`}>
                                            {formatAmount(net, cur)}
                                        </span>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                )}

                {/* Fleet overview table — compare all approved drivers at a glance */}
                {overviewRows.length > 0 && (
                    <div className="bg-white rounded-lg border-2 border-gray-200 mb-8 overflow-x-auto">
                        <table className="w-full text-sm whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wide">
                                    <th className="px-4 py-3">Driver</th>
                                    <th className="px-4 py-3">Vehicle</th>
                                    <th className="px-4 py-3">Trips</th>
                                    <th className="px-4 py-3">Earned</th>
                                    <th className="px-4 py-3">Spent</th>
                                    <th className="px-4 py-3">Net</th>
                                    <th className="px-4 py-3">Advance Owed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overviewRows.map(row => (
                                    <tr key={row.driver.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">{row.driver.full_name}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.driver.vehicle_model}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.completedTrips}</td>
                                        <td className="px-4 py-3 text-emerald-700">{row.earnedText || '—'}</td>
                                        <td className="px-4 py-3 text-blue-700">{row.spentText || '—'}</td>
                                        <td className={`px-4 py-3 font-semibold ${row.netNegative ? 'text-red-600' : 'text-gray-900'}`}>{row.netText || '—'}</td>
                                        <td className="px-4 py-3 text-amber-700">{row.advanceText || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                    {driver.status === 'approved' && (
                                        <Button
                                            onClick={() => handleSendPortalLink(driver)}
                                            disabled={sendingPortalLinkId === driver.id}
                                            variant="outline"
                                            className="text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                                        >
                                            {sendingPortalLinkId === driver.id
                                                ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                : <Link2 className="w-4 h-4 mr-2" />}
                                            Upload Link
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => toggleExpenses(driver.id)}
                                        variant="outline"
                                        className="text-blue-700 border-blue-300 hover:bg-blue-50"
                                    >
                                        <Wallet className="w-4 h-4 mr-2" />
                                        Finance{expenses[driver.id] ? ` (${expenses[driver.id].length})` : ''}
                                        {expandedId === driver.id
                                            ? <ChevronUp className="w-4 h-4 ml-2" />
                                            : <ChevronDown className="w-4 h-4 ml-2" />}
                                    </Button>
                                    <Button
                                        onClick={() => toggleDocuments(driver.id)}
                                        variant="outline"
                                        className="text-purple-700 border-purple-300 hover:bg-purple-50"
                                    >
                                        <FileText className="w-4 h-4 mr-2" />
                                        Documents{documents[driver.id] ? ` (${documents[driver.id].length})` : ''}
                                        {expandedDocsId === driver.id
                                            ? <ChevronUp className="w-4 h-4 ml-2" />
                                            : <ChevronDown className="w-4 h-4 ml-2" />}
                                    </Button>
                                    <Button
                                        onClick={() => toggleSettlement(driver.id)}
                                        variant="outline"
                                        className="text-amber-700 border-amber-300 hover:bg-amber-50"
                                    >
                                        <Banknote className="w-4 h-4 mr-2" />
                                        Settlement{settlements[driver.id] ? ` (${settlements[driver.id].length})` : ''}
                                        {expandedSettlementId === driver.id
                                            ? <ChevronUp className="w-4 h-4 ml-2" />
                                            : <ChevronDown className="w-4 h-4 ml-2" />}
                                    </Button>
                                </div>

                                {/* Finance — earnings from completed bookings vs fuel/maintenance/advance/penalty spend */}
                                {expandedId === driver.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        {(() => {
                                            const list = expenses[driver.id] || [];
                                            const bookingRows = bookingSummaries[driver.id] || [];
                                            const spent = sumByCurrency(list);
                                            const earned = sumEarningsByCurrency(bookingRows);
                                            const currencies = Array.from(new Set([...Object.keys(spent), ...Object.keys(earned)]));
                                            const completedTrips = bookingRows.filter(r => r.status === 'completed').length;
                                            return (
                                                <div className="mb-4">
                                                    {completedTrips > 0 && (
                                                        <p className="text-xs text-gray-500 mb-1.5">{completedTrips} completed trip{completedTrips === 1 ? '' : 's'} on record</p>
                                                    )}
                                                    {currencies.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {Object.entries(earned).map(([cur, amt]) => (
                                                                <span key={`earn-${cur}`} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                                                                    Earned: {formatAmount(amt, cur)}
                                                                </span>
                                                            ))}
                                                            {Object.entries(spent).map(([cur, amt]) => (
                                                                <span key={`spent-${cur}`} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                                                                    Spent: {formatAmount(amt, cur)}
                                                                </span>
                                                            ))}
                                                            {currencies.map(cur => {
                                                                const net = (earned[cur] || 0) - (spent[cur] || 0);
                                                                return (
                                                                    <span key={`net-${cur}`} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-bold ${net >= 0 ? 'bg-slate-900' : 'bg-red-600'}`}>
                                                                        Net: {formatAmount(net, cur)}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
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
                                                                        {expense.source === 'driver' && (
                                                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">via driver</span>
                                                                        )}
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

                                {/* Documents — license, Iqama/ID, vehicle registration, insurance */}
                                {expandedDocsId === driver.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-4">
                                            <p className="text-xs font-bold text-purple-700 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                                <FileText className="w-3.5 h-3.5" /> Add Document
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                                                <select
                                                    value={documentForm.doc_type}
                                                    onChange={e => setDocumentForm({ ...documentForm, doc_type: e.target.value as DriverDocType })}
                                                    className="text-sm border border-purple-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                                                >
                                                    {Object.entries(DOC_TYPE_META).map(([key, label]) => (
                                                        <option key={key} value={key}>{label}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    value={documentForm.document_number}
                                                    onChange={e => setDocumentForm({ ...documentForm, document_number: e.target.value })}
                                                    placeholder="Document # (optional)"
                                                    className="text-sm border border-purple-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                                                />
                                                <input
                                                    type="date"
                                                    value={documentForm.expiry_date}
                                                    onChange={e => setDocumentForm({ ...documentForm, expiry_date: e.target.value })}
                                                    className="text-sm border border-purple-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={e => setDocumentForm({ ...documentForm, file: e.target.files?.[0] || null })}
                                                    className="text-xs text-purple-700 file:mr-2 file:py-2 file:px-2.5 file:rounded-lg file:border-0 file:bg-purple-200 file:text-purple-800 file:text-xs file:font-semibold"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => handleAddDocument(driver.id)}
                                                disabled={savingDocument}
                                                className="bg-purple-600 text-white hover:bg-purple-700"
                                            >
                                                {savingDocument ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                                                Add Document
                                            </Button>
                                        </div>

                                        {loadingDocuments === driver.id ? (
                                            <div className="text-center py-6 text-sm text-gray-500">Loading documents...</div>
                                        ) : (documents[driver.id] || []).length === 0 ? (
                                            <div className="text-center py-6 text-sm text-gray-400">No documents on file</div>
                                        ) : (
                                            <div className="space-y-2">
                                                {(documents[driver.id] || []).map(doc => {
                                                    const status = getExpiryStatus(doc.expiry_date);
                                                    return (
                                                        <div key={doc.id} className="flex items-start justify-between gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span className="text-sm font-bold text-gray-900">{DOC_TYPE_META[doc.doc_type]}</span>
                                                                    {status && <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${status.color}`}>{status.label}</span>}
                                                                </div>
                                                                <p className="text-xs text-gray-500 mt-0.5">
                                                                    {doc.document_number && <span>#{doc.document_number} · </span>}
                                                                    {doc.expiry_date ? `Expires ${new Date(doc.expiry_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : 'No expiry set'}
                                                                </p>
                                                                {doc.file_url && (
                                                                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1">
                                                                        <ImageIcon className="w-3 h-3" /> View file
                                                                    </a>
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeleteDocument(driver.id, doc.id)}
                                                                disabled={deletingDocumentId === doc.id}
                                                                className="shrink-0 text-gray-300 hover:text-red-600 transition-colors p-1"
                                                                title="Delete"
                                                            >
                                                                {deletingDocumentId === doc.id
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

                                {/* Settlement — outstanding advance balance, repayments, logged payouts */}
                                {expandedSettlementId === driver.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        {loadingSettlement === driver.id ? (
                                            <div className="text-center py-6 text-sm text-gray-500">Loading settlement data...</div>
                                        ) : (
                                            <>
                                                {(() => {
                                                    const advancesGiven = (expenses[driver.id] || []).filter(e => e.category === 'advance');
                                                    const givenByCur = sumByCurrency(advancesGiven);
                                                    const repaidByCur = sumByCurrency(advanceRepayments[driver.id] || []);
                                                    const currencies = Array.from(new Set([...Object.keys(givenByCur), ...Object.keys(repaidByCur)]));
                                                    const outstanding = currencies
                                                        .map(cur => [cur, (givenByCur[cur] || 0) - (repaidByCur[cur] || 0)] as const)
                                                        .filter(([, amt]) => Math.abs(amt) > 0.001);
                                                    return outstanding.length > 0 ? (
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {outstanding.map(([cur, amt]) => (
                                                                <span key={cur} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                                                                    Outstanding Advance: {formatAmount(amt, cur)}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-gray-400 mb-4">No outstanding advance balance</p>
                                                    );
                                                })()}

                                                {/* Record repayment */}
                                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
                                                    <p className="text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                                        <Banknote className="w-3.5 h-3.5" /> Record Advance Repayment
                                                    </p>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.001"
                                                            placeholder="Amount"
                                                            value={repaymentForm.amount}
                                                            onChange={e => setRepaymentForm({ ...repaymentForm, amount: e.target.value })}
                                                            className="text-sm border border-amber-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                        />
                                                        <select
                                                            value={repaymentForm.currency}
                                                            onChange={e => setRepaymentForm({ ...repaymentForm, currency: e.target.value })}
                                                            className="text-sm border border-amber-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                        >
                                                            <option value="BHD">BHD</option>
                                                            <option value="SAR">SAR</option>
                                                        </select>
                                                        <input
                                                            type="date"
                                                            value={repaymentForm.repaid_date}
                                                            onChange={e => setRepaymentForm({ ...repaymentForm, repaid_date: e.target.value })}
                                                            className="text-sm border border-amber-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                        />
                                                        <input
                                                            value={repaymentForm.note}
                                                            onChange={e => setRepaymentForm({ ...repaymentForm, note: e.target.value })}
                                                            placeholder="Note (optional)"
                                                            className="text-sm border border-amber-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                        />
                                                    </div>
                                                    <Button
                                                        onClick={() => handleAddRepayment(driver.id)}
                                                        disabled={savingRepayment || !repaymentForm.amount}
                                                        className="bg-amber-600 text-white hover:bg-amber-700"
                                                    >
                                                        {savingRepayment ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                                                        Record Repayment
                                                    </Button>
                                                </div>

                                                {(advanceRepayments[driver.id] || []).length > 0 && (
                                                    <div className="space-y-1.5 mb-4">
                                                        {(advanceRepayments[driver.id] || []).map(r => (
                                                            <div key={r.id} className="flex items-center justify-between gap-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 text-sm">
                                                                <span className="text-gray-700 truncate">
                                                                    <span className="font-semibold">{formatAmount(r.amount, r.currency)}</span> repaid on {new Date(r.repaid_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                    {r.note && <span className="text-gray-400"> — {r.note}</span>}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleDeleteRepayment(driver.id, r.id)}
                                                                    disabled={deletingRepaymentId === r.id}
                                                                    className="shrink-0 text-gray-300 hover:text-red-600 transition-colors p-1"
                                                                    title="Delete"
                                                                >
                                                                    {deletingRepaymentId === r.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Log a payout */}
                                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
                                                    <p className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                                                        <Banknote className="w-3.5 h-3.5" /> Log a Settlement Payout
                                                    </p>
                                                    <p className="text-xs text-slate-500 mb-2">Check the Finance tab for earned/spent for the period, then log what was actually paid out.</p>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                                                        <input
                                                            type="date"
                                                            value={settlementForm.period_start}
                                                            onChange={e => setSettlementForm({ ...settlementForm, period_start: e.target.value })}
                                                            className="text-sm border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                                                        />
                                                        <input
                                                            type="date"
                                                            value={settlementForm.period_end}
                                                            onChange={e => setSettlementForm({ ...settlementForm, period_end: e.target.value })}
                                                            className="text-sm border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                                                        />
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="0.001"
                                                                placeholder="Amount paid"
                                                                value={settlementForm.amount_paid}
                                                                onChange={e => setSettlementForm({ ...settlementForm, amount_paid: e.target.value })}
                                                                className="text-sm border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 flex-1"
                                                            />
                                                            <select
                                                                value={settlementForm.currency}
                                                                onChange={e => setSettlementForm({ ...settlementForm, currency: e.target.value })}
                                                                className="text-sm border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                                                            >
                                                                <option value="BHD">BHD</option>
                                                                <option value="SAR">SAR</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <input
                                                        value={settlementForm.note}
                                                        onChange={e => setSettlementForm({ ...settlementForm, note: e.target.value })}
                                                        placeholder="Note (optional)"
                                                        className="w-full text-sm border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 mb-2"
                                                    />
                                                    <Button
                                                        onClick={() => handleAddSettlement(driver.id)}
                                                        disabled={savingSettlement || !settlementForm.amount_paid}
                                                        className="bg-slate-900 text-white hover:bg-slate-800"
                                                    >
                                                        {savingSettlement ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                                        Save Settlement
                                                    </Button>
                                                </div>

                                                {(settlements[driver.id] || []).length === 0 ? (
                                                    <div className="text-center py-4 text-sm text-gray-400">No settlements logged yet</div>
                                                ) : (
                                                    <div className="space-y-1.5">
                                                        {(settlements[driver.id] || []).map(s => (
                                                            <div key={s.id} className="flex items-center justify-between gap-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 text-sm">
                                                                <span className="text-gray-700 truncate">
                                                                    <span className="font-semibold">{formatAmount(s.amount_paid, s.currency)}</span> for {new Date(s.period_start).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} – {new Date(s.period_end).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                    {s.note && <span className="text-gray-400"> — {s.note}</span>}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleDeleteSettlement(driver.id, s.id)}
                                                                    disabled={deletingSettlementId === s.id}
                                                                    className="shrink-0 text-gray-300 hover:text-red-600 transition-colors p-1"
                                                                    title="Delete"
                                                                >
                                                                    {deletingSettlementId === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
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
