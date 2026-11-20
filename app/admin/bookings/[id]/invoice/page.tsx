'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Landmark, Mail, Plus, Save, Trash2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import {
    CURRENCIES, PAYMENT_METHODS, amountInWords, bookingRef, docFilename, formatDocDate,
    formatMoney, renderDocumentPdf, toNumber, type DocLang,
} from '@/lib/doc-utils';
import {
    ActionButton, Badge, COMMON, ControlPanel, DocFooter, DocPage, DocToolbar, Field, InvoiceHeader,
    LineItems, NoteBox, PartyBlock, PrintStyles, Segmented, SectionLabel, Totals, TripDetails,
    inputClass, methodLabel, type TripStop,
} from '@/components/admin/documents/DocumentKit';

const DOC_ID = 'invoice-print';

const TEXT: Record<DocLang, Record<string, string>> = {
    en: {
        title: 'Invoice',
        service: 'Private Chauffeur Transfer', roundTripService: 'Round Trip Chauffeur Transfer',
        includes: 'Includes professional chauffeur, fuel, tolls and border crossing assistance.',
        payment: 'Payment',
        payCash: 'Please pay the driver in cash on completion of the journey.',
        payBank: 'Please transfer the total to the bank account below and share the receipt on WhatsApp.',
        payOnline: 'Payment is made online using the secure link sent by our team.',
        payCard: 'Payment by card is accepted at the time of the journey.',
        paidNote: 'This invoice has been paid in full. Thank you.',
        bank: 'Bank Transfer Details', bankName: 'Bank', accountName: 'Account Name',
        accountNumber: 'Account No.', iban: 'IBAN', swift: 'SWIFT / BIC',
        stamp: 'INVOICED',
        term1: 'Price includes fuel, parking, tolls and border crossing assistance.',
        term2: 'Free cancellation up to 24 hours before the pickup time.',
        term3: 'Driver waits up to 60 minutes for airport pickups at no charge.',
        term4: 'Please quote the invoice number with any payment or query.',
        remarks: 'Remarks', status: 'Status', serviceDetails: 'Service Details',
    },
    ar: {
        title: 'فاتورة',
        service: 'نقل خاص بسائق', roundTripService: 'نقل خاص ذهاب وعودة',
        includes: 'يشمل سائقاً محترفاً والوقود والرسوم والمساعدة في عبور الحدود.',
        payment: 'الدفع',
        payCash: 'يرجى الدفع نقداً للسائق عند انتهاء الرحلة.',
        payBank: 'يرجى تحويل المبلغ إلى الحساب البنكي أدناه وإرسال الإيصال عبر واتساب.',
        payOnline: 'يتم الدفع إلكترونياً عبر الرابط الآمن المرسل من فريقنا.',
        payCard: 'يتم قبول الدفع بالبطاقة وقت الرحلة.',
        paidNote: 'تم سداد هذه الفاتورة بالكامل. شكراً لكم.',
        bank: 'تفاصيل التحويل البنكي', bankName: 'البنك', accountName: 'اسم الحساب',
        accountNumber: 'رقم الحساب', iban: 'الآيبان', swift: 'السويفت',
        stamp: 'INVOICED',
        term1: 'السعر يشمل الوقود والمواقف والرسوم والمساعدة في عبور الحدود.',
        term2: 'إلغاء مجاني حتى 24 ساعة قبل موعد الانطلاق.',
        term3: 'ينتظر السائق حتى 60 دقيقة في المطار دون رسوم إضافية.',
        term4: 'يرجى ذكر رقم الفاتورة عند الدفع أو الاستفسار.',
        remarks: 'ملاحظات', status: 'الحالة', serviceDetails: 'تفاصيل الخدمة',
    },
};

const STATUSES = ['Unpaid', 'Paid', 'Pending'] as const;

interface BankDetails {
    showOnDocument: boolean;
    bankName: string;
    accountName: string;
    accountNumber: string;
    iban: string;
    swiftCode: string;
    notes: string;
}

const EMPTY_BANK: BankDetails = {
    showOnDocument: false, bankName: '', accountName: 'Taxi Bahrain to Dammam',
    accountNumber: '', iban: '', swiftCode: '',
    notes: 'Please send the transfer receipt on WhatsApp once completed.',
};

interface Booking {
    id: string;
    created_at: string;
    pickup_location: string;
    destination: string;
    pickup_date: string;
    pickup_time: string;
    vehicle_type: string;
    passengers: number;
    luggage: number;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    special_requests?: string;
    total_price?: number;
    currency?: string;
    payment_status?: string;
    payment_method?: string;
    has_return_trip?: boolean;
    invoice_data?: { stops?: TripStop[]; quickNote?: string; bankDetails?: BankDetails };
}

/** DB stores lowercase ('paid'/'partial'); the invoice shows Title Case. */
function normaliseStatus(s?: string) {
    if (!s) return 'Unpaid';
    const v = s.toLowerCase();
    if (v === 'paid') return 'Paid';
    if (v === 'pending' || v === 'partial') return 'Pending';
    if (v === 'unpaid') return 'Unpaid';
    return s;
}

export default function InvoicePage() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<DocLang>('en');
    const [quickNote, setQuickNote] = useState('');
    const [currency, setCurrency] = useState('BHD');
    const [paymentStatus, setPaymentStatus] = useState('Unpaid');
    const [paymentMethod, setPaymentMethod] = useState('Cash to Driver');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [returnDestination, setReturnDestination] = useState('');
    const [stops, setStops] = useState<TripStop[]>([]);
    const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [bank, setBank] = useState<BankDetails>(EMPTY_BANK);
    const [downloading, setDownloading] = useState(false);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data, error } = await supabase.from('bookings').select('*').eq('id', id).single();
                if (error) throw error;
                setBooking(data);
                if (data.currency) setCurrency(data.currency);
                setPaymentStatus(normaliseStatus(data.payment_status));
                if (data.payment_method) setPaymentMethod(data.payment_method);
                if (data.has_return_trip) {
                    setIsRoundTrip(true);
                    setReturnDestination(data.pickup_location || '');
                }
                if (data.invoice_data) {
                    if (data.invoice_data.stops) setStops(data.invoice_data.stops);
                    if (data.invoice_data.quickNote) setQuickNote(data.invoice_data.quickNote);
                    if (data.invoice_data.bankDetails) setBank({ ...EMPTY_BANK, ...data.invoice_data.bankDetails });
                }
            } catch (err) {
                console.error('Error fetching booking:', err);
            } finally {
                setLoading(false);
            }
        };
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) { router.push('/admin/login'); return; }
            if (id) fetchBooking();
        });
    }, [id, router]);

    if (loading) return <div className="flex min-h-screen items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" /></div>;
    if (!booking) return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <p className="text-xl font-bold">Booking not found</p>
            <button onClick={() => router.back()} className="rounded-lg bg-black px-4 py-2 font-bold text-white">Go Back</button>
        </div>
    );

    const t = TEXT[lang];
    const c = COMMON[lang];
    const ref = bookingRef(booking.id);
    const invoiceNumber = `INV-${(booking.pickup_date || booking.created_at.slice(0, 10)).replace(/-/g, '')}-${booking.id.slice(0, 6).toUpperCase()}`;
    const issued = formatDocDate(booking.created_at);
    const total = toNumber(booking.total_price);
    const isPaid = paymentStatus.toLowerCase() === 'paid';
    const filename = docFilename('Invoice', ref, booking.customer_name);
    const statusLabel = paymentStatus === 'Paid' ? c.paid : paymentStatus === 'Unpaid' ? c.unpaid : paymentStatus === 'Pending' ? c.pending : paymentStatus;
    const showBank = bank.showOnDocument && !isPaid && (bank.iban || bank.accountNumber);
    const paymentText = isPaid ? t.paidNote
        : paymentMethod === 'Cash to Driver' ? t.payCash
        : paymentMethod === 'Bank Transfer' ? t.payBank
        : paymentMethod === 'Card' ? t.payCard : t.payOnline;

    const saveDraft = async (silent = false) => {
        if (!silent) setSaving(true);
        try {
            await supabase.from('bookings').update({ invoice_data: { stops, quickNote, bankDetails: bank } }).eq('id', booking.id);
            if (!silent) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
        } catch (err) {
            console.error('Error saving invoice draft:', err);
        } finally {
            if (!silent) setSaving(false);
        }
    };

    const buildPdf = async () => {
        const el = document.getElementById(DOC_ID);
        if (!el) throw new Error('Invoice not found on page');
        return renderDocumentPdf(el, filename);
    };

    const handleDownload = async () => {
        saveDraft(true);
        setDownloading(true);
        try { (await buildPdf()).save(); }
        catch (err) { console.error(err); window.print(); }
        finally { setDownloading(false); }
    };

    const handleSend = async () => {
        if (!booking.customer_email) { alert('This booking has no customer email.'); return; }
        saveDraft(true);
        setSending(true);
        try {
            const pdf = await buildPdf();
            await supabase.from('bookings')
                .update({ currency, payment_status: paymentStatus.toLowerCase(), payment_method: paymentMethod })
                .eq('id', booking.id);
            const res = await adminFetch('/api/send-invoice-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking, pdfBase64: pdf.base64(), filename,
                    currency, paymentStatus, paymentMethod, additionalEmails,
                }),
            });
            if (!res.ok) throw new Error('Email API error');
            setSent(true);
            setTimeout(() => setSent(false), 4000);
        } catch (err) {
            console.error(err);
            alert('Failed to send the invoice. Please try again.');
        } finally {
            setSending(false);
        }
    };

    const addEmail = () => {
        const v = emailInput.trim().toLowerCase();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && !additionalEmails.includes(v)) {
            setAdditionalEmails((p) => [...p, v]);
            setEmailInput('');
        }
    };
    const updateStop = (i: number, field: keyof TripStop, value: string) =>
        setStops((p) => p.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));

    return (
        <div className="min-h-screen bg-[#eef0f3] px-4 pb-10 print:bg-white print:p-0">
            <DocToolbar onBack={() => router.back()} lang={lang} onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}>
                <ActionButton onClick={() => saveDraft(false)} busy={saving} done={saved} icon={<Save className="h-4 w-4" />} label="Save" busyLabel="Saving…" doneLabel="Saved" variant="outline" />
                <ActionButton onClick={handleDownload} busy={downloading} icon={<Download className="h-4 w-4" />} label="Download PDF" busyLabel="Generating…" variant="outline" />
                <ActionButton onClick={handleSend} busy={sending} done={sent} icon={<Mail className="h-4 w-4" />} label="Email Invoice" busyLabel="Sending…" doneLabel="Sent" variant="dark" />
            </DocToolbar>

            <ControlPanel title="Invoice settings">
                <div className="flex flex-wrap gap-5">
                    <Segmented label="Status" options={STATUSES} value={paymentStatus} onChange={setPaymentStatus} />
                    <Segmented label="Method" options={PAYMENT_METHODS} value={paymentMethod}
                        onChange={(m) => { setPaymentMethod(m); if (m === 'Bank Transfer') setBank((b) => ({ ...b, showOnDocument: true })); }} />
                    <Segmented label="Currency" options={CURRENCIES} value={currency} onChange={setCurrency} />
                </div>
                <div className="mt-4 flex flex-wrap items-end gap-3">
                    <label className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm font-semibold">
                        <input type="checkbox" checked={isRoundTrip} className="h-4 w-4 accent-[#0655ff]"
                            onChange={(e) => { setIsRoundTrip(e.target.checked); if (e.target.checked && !returnDestination) setReturnDestination(booking.pickup_location); }} />
                        Round trip
                    </label>
                    {isRoundTrip && (
                        <Field label="Return drop-off">
                            <input value={returnDestination} onChange={(e) => setReturnDestination(e.target.value)} className={`${inputClass} w-64`} />
                        </Field>
                    )}
                </div>
                <textarea value={quickNote} onChange={(e) => setQuickNote(e.target.value)} rows={2}
                    placeholder="Remarks shown on the invoice (optional)…"
                    className="mt-3 w-full resize-none rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0655ff] focus:bg-white" />
            </ControlPanel>

            <ControlPanel title="Extra stops" hint="Stops between pickup and drop-off"
                aside={<button onClick={() => setStops((p) => [...p, { time: '', location: '' }])} className="inline-flex items-center gap-1 rounded-lg bg-[#0d0d0d] px-3 py-1.5 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" /> Add stop</button>}>
                {stops.length === 0 ? <p className="text-xs italic text-gray-400">No extra stops.</p> : (
                    <div className="space-y-2">
                        {stops.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-12 shrink-0 text-[10px] font-black text-gray-400">Stop {i + 1}</span>
                                <input type="time" value={s.time} onChange={(e) => updateStop(i, 'time', e.target.value)} className={`${inputClass} w-32`} />
                                <input value={s.location} onChange={(e) => updateStop(i, 'location', e.target.value)} placeholder="Location…" className={`${inputClass} flex-1`} />
                                <button onClick={() => setStops((p) => p.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        ))}
                    </div>
                )}
            </ControlPanel>

            <ControlPanel title="Bank transfer details" hint="Printed only when the invoice is unpaid and an IBAN or account number is filled in"
                aside={<label className="flex items-center gap-2 text-xs font-bold text-gray-600"><input type="checkbox" checked={bank.showOnDocument} onChange={(e) => setBank({ ...bank, showOnDocument: e.target.checked })} className="h-4 w-4 accent-[#0655ff]" /> Show on invoice</label>}>
                {bank.showOnDocument && (
                    <div className="grid gap-3 md:grid-cols-3">
                        <Field label="Bank name"><input value={bank.bankName} onChange={(e) => setBank({ ...bank, bankName: e.target.value })} className={inputClass} /></Field>
                        <Field label="Account name"><input value={bank.accountName} onChange={(e) => setBank({ ...bank, accountName: e.target.value })} className={inputClass} /></Field>
                        <Field label="Account number"><input value={bank.accountNumber} onChange={(e) => setBank({ ...bank, accountNumber: e.target.value })} className={inputClass} /></Field>
                        <div className="md:col-span-2"><Field label="IBAN"><input value={bank.iban} onChange={(e) => setBank({ ...bank, iban: e.target.value.toUpperCase() })} className={`${inputClass} w-full font-mono`} /></Field></div>
                        <Field label="SWIFT / BIC"><input value={bank.swiftCode} onChange={(e) => setBank({ ...bank, swiftCode: e.target.value.toUpperCase() })} className={`${inputClass} font-mono`} /></Field>
                        <div className="md:col-span-3"><Field label="Note"><input value={bank.notes} onChange={(e) => setBank({ ...bank, notes: e.target.value })} className={`${inputClass} w-full`} /></Field></div>
                    </div>
                )}
            </ControlPanel>

            <ControlPanel title="CC recipients" hint="The invoice email is also sent to these addresses">
                <div className="flex gap-2">
                    <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addEmail()} placeholder="name@company.com" className={`${inputClass} flex-1`} />
                    <button onClick={addEmail} className="rounded-lg bg-[#0d0d0d] px-3 text-xs font-bold text-white">Add</button>
                </div>
                {additionalEmails.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {additionalEmails.map((e) => (
                            <span key={e} className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] text-blue-700">
                                {e}<button onClick={() => setAdditionalEmails((p) => p.filter((x) => x !== e))}><X className="h-3 w-3" /></button>
                            </span>
                        ))}
                    </div>
                )}
            </ControlPanel>

            <div className="h-3 print:hidden" />

            <DocPage id={DOC_ID} lang={lang} kind="invoice" watermark={isPaid ? c.paid : null}>
                <InvoiceHeader lang={lang} title={t.title}
                    meta={[
                        { label: c.no, value: invoiceNumber, mono: true },
                        { label: c.issued, value: issued },
                        { label: c.dueDate, value: formatDocDate(booking.pickup_date) },
                        { label: c.bookingRef, value: `#${ref}`, mono: true },
                    ]}
                    badges={<>
                        <Badge tone={isPaid ? 'green' : paymentStatus === 'Unpaid' ? 'red' : 'amber'}>{statusLabel}</Badge>
                        {isRoundTrip && <Badge tone="blue">{c.roundTrip}</Badge>}
                    </>}
                />

                <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-gray-200 px-4 py-3">
                        <PartyBlock label={c.billTo} name={booking.customer_name} phone={booking.customer_phone} email={booking.customer_email} />
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                        <SectionLabel>{t.payment}</SectionLabel>
                        <dl className="space-y-1 text-[11.5px]">
                            <div className="flex justify-between"><dt className="text-gray-500">{c.paymentMethod}</dt><dd className="font-bold">{methodLabel(paymentMethod, lang)}</dd></div>
                            <div className="flex justify-between"><dt className="text-gray-500">{t.status}</dt><dd className={`font-bold ${isPaid ? 'text-green-700' : 'text-red-700'}`}>{statusLabel}</dd></div>
                            <div className="flex justify-between"><dt className="text-gray-500">{isPaid ? c.amountPaid : c.balanceDue}</dt><dd className="font-black" dir="ltr">{formatMoney(total, currency)}</dd></div>
                        </dl>
                    </div>
                </div>

                <section className="mt-5">
                    <div className="mb-3 flex items-center gap-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em]">{t.serviceDetails}</p>
                        <span className="h-px flex-1 bg-gray-300" />
                    </div>
                    <TripDetails lang={lang} date={booking.pickup_date} time={booking.pickup_time} vehicle={booking.vehicle_type}
                        passengers={booking.passengers} luggage={booking.luggage}
                        pickup={booking.pickup_location} destination={booking.destination}
                        stops={stops} roundTrip={isRoundTrip} returnTo={returnDestination} />
                </section>

                <div className="mt-5">
                    <LineItems lang={lang} rows={[{
                        title: isRoundTrip ? t.roundTripService : t.service,
                        detail: <>
                            <p>{booking.vehicle_type} · {booking.pickup_location.split(',')[0]} {isRoundTrip ? '⇄' : '→'} {booking.destination.split(',')[0]}</p>
                            <p>{t.includes}</p>
                            {booking.special_requests && <p className="mt-1 whitespace-pre-wrap"><b>{c.specialRequests}:</b> {booking.special_requests}</p>}
                        </>,
                        amount: formatMoney(total, currency),
                    }]} />
                </div>

                <div className="mt-4">
                    <Totals
                        rows={[
                            { label: c.subtotal, value: formatMoney(total, currency) },
                            ...(isPaid ? [{ label: c.amountPaid, value: formatMoney(total, currency), tone: 'green' as const }] : []),
                        ]}
                        grand={{ label: isPaid ? c.balanceDue : c.total, value: formatMoney(isPaid ? 0 : total, currency) }}
                        words={lang === 'en' ? amountInWords(total, currency) : undefined} wordsLabel={c.inWords} />
                </div>

                <div className="mt-5 grid gap-4" style={{ gridTemplateColumns: showBank ? '1fr 1.4fr' : '1fr' }}>
                    <div className="rounded-lg border border-gray-200 px-4 py-3">
                        <SectionLabel>{t.payment} · {methodLabel(paymentMethod, lang)}</SectionLabel>
                        <p className="text-[11.5px] leading-relaxed text-gray-700">{paymentText}</p>
                    </div>
                    {showBank && (
                        <div className="rounded-lg border border-blue-100 bg-[#f4f7ff] px-4 py-3">
                            <SectionLabel><span className="inline-flex items-center gap-1.5"><Landmark className="h-3 w-3" /> {t.bank}</span></SectionLabel>
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                                {([[t.bankName, bank.bankName], [t.accountName, bank.accountName], [t.accountNumber, bank.accountNumber], [t.swift, bank.swiftCode]] as const)
                                    .filter(([, v]) => v).map(([k, v]) => (
                                        <div key={k}><dt className="text-gray-500">{k}</dt><dd className="font-mono font-bold" dir="ltr">{v}</dd></div>
                                    ))}
                                {bank.iban && <div className="col-span-2"><dt className="text-gray-500">{t.iban}</dt><dd className="font-mono font-bold tracking-wider" dir="ltr">{bank.iban}</dd></div>}
                            </dl>
                            {bank.notes && <p className="mt-2 text-[10.5px] italic text-blue-700">{bank.notes}</p>}
                        </div>
                    )}
                </div>

                {quickNote.trim() && <div className="mt-5"><NoteBox label={t.remarks}>{quickNote.trim()}</NoteBox></div>}

                <DocFooter lang={lang} kind="invoice" terms={[t.term1, t.term2, t.term3, t.term4]} stampLabel={t.stamp}
                    refLine={`${invoiceNumber} · ${issued}`} />
            </DocPage>

            <PrintStyles id={DOC_ID} />
        </div>
    );
}
