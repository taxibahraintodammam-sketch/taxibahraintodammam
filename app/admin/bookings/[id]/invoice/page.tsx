'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Mail, Plus, Save, Trash2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import {
    CURRENCIES, PAYMENT_METHODS, amountInWords, bookingRef, docFilename, formatDocDate,
    formatMoney, formatTime12h, renderDocumentPdf, toNumber, type DocLang,
} from '@/lib/doc-utils';
import {
    ACCENT, ActionButton, Banner, COMMON, ChargesTable, ControlPanel, DocFooter, DocPage, DocTitle, DocToolbar,
    Field, KV, Letterhead, PartyLines, PrintStyles, RouteRows, Section, Segmented, SummaryBox,
    TermsAndSignature, TotalsBox, bookingStatusLabel, inputClass, methodLabel, type Tone, type TripStop,
} from '@/components/admin/documents/DocumentKit';

const DOC_ID = 'invoice-print';
const ACC = ACCENT.invoice;

const TEXT: Record<DocLang, Record<string, string>> = {
    en: {
        title: 'Invoice', invoiceNumber: 'Invoice Number', invoiceStatus: 'Invoice Status', dueDate: 'Payment Due',
        charges: 'Service Description & Charges', totalInvoice: 'Total Invoice Amount',
        payCash: 'Payment is to be made in cash to the driver on completion of the journey.',
        payBank: 'Please transfer the total to the bank account below and share the transfer receipt on WhatsApp.',
        payOnline: 'Payment is made online using the secure link sent by our team.',
        payCard: 'Payment by card is accepted at the time of the journey.',
        paidInFull: 'Payment has been received in full.',
        bannerPaid: 'Your payment has been received in full. Thank you for choosing Taxi Bahrain to Dammam.',
        bannerDue: 'Please settle the outstanding balance by the payment due date. Thank you for choosing Taxi Bahrain to Dammam.',
        bank: 'Bank Transfer Details', bankName: 'Bank Name', accountName: 'Account Name',
        accountNumber: 'Account Number', iban: 'IBAN', swift: 'SWIFT / BIC',
        term1: 'This invoice covers the transportation service and itinerary stated in this document.',
        term2: 'Fuel, tolls, parking and border crossing assistance are included in the price.',
        term3: 'Additional waiting time, stops, route changes or other services may incur additional charges when agreed.',
        term4: 'Free cancellation up to 24 hours before the pickup time; later cancellations follow the booking terms.',
        term5: 'Please quote the invoice number with any payment or query.',
        thanks: 'Thank you for choosing Taxi Bahrain to Dammam.',
    },
    ar: {
        title: 'فاتورة', invoiceNumber: 'رقم الفاتورة', invoiceStatus: 'حالة الفاتورة', dueDate: 'تاريخ الاستحقاق',
        charges: 'وصف الخدمة والرسوم', totalInvoice: 'إجمالي الفاتورة',
        payCash: 'يتم الدفع نقداً للسائق عند انتهاء الرحلة.',
        payBank: 'يرجى تحويل المبلغ إلى الحساب البنكي أدناه وإرسال إيصال التحويل عبر واتساب.',
        payOnline: 'يتم الدفع إلكترونياً عبر الرابط الآمن المرسل من فريقنا.',
        payCard: 'يتم قبول الدفع بالبطاقة وقت الرحلة.',
        paidInFull: 'تم استلام المبلغ بالكامل.',
        bannerPaid: 'تم استلام دفعتكم بالكامل. شكراً لاختياركم تاكسي البحرين إلى الدمام.',
        bannerDue: 'يرجى سداد الرصيد المتبقي بحلول تاريخ الاستحقاق. شكراً لاختياركم تاكسي البحرين إلى الدمام.',
        bank: 'تفاصيل التحويل البنكي', bankName: 'اسم البنك', accountName: 'اسم الحساب',
        accountNumber: 'رقم الحساب', iban: 'الآيبان', swift: 'السويفت',
        term1: 'تغطي هذه الفاتورة خدمة النقل وخط السير المذكورين في هذا المستند.',
        term2: 'السعر يشمل الوقود والرسوم والمواقف والمساعدة في عبور الحدود.',
        term3: 'قد يترتب على وقت الانتظار الإضافي أو المحطات أو تغيير المسار رسوم إضافية عند الاتفاق.',
        term4: 'إلغاء مجاني حتى 24 ساعة قبل موعد الانطلاق؛ وتخضع الإلغاءات اللاحقة لشروط الحجز.',
        term5: 'يرجى ذكر رقم الفاتورة عند الدفع أو الاستفسار.',
        thanks: 'شكراً لاختياركم تاكسي البحرين إلى الدمام.',
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
    status?: string;
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
    const statusTone: Tone = isPaid ? 'green' : paymentStatus === 'Unpaid' ? 'red' : 'amber';
    const [bookingStatus, bookingTone] = bookingStatusLabel(booking.status, lang);
    const received = isPaid ? total : 0;
    const outstanding = total - received;
    const showBank = bank.showOnDocument && !isPaid && (bank.iban || bank.accountNumber);
    const paymentText = isPaid ? t.paidInFull
        : paymentMethod === 'Cash to Driver' ? t.payCash
        : paymentMethod === 'Bank Transfer' ? t.payBank
        : paymentMethod === 'Card' ? t.payCard : t.payOnline;
    const passengersText = `${booking.passengers ?? 1} ${c.passengersN} · ${booking.luggage ?? 0} ${c.bagsN}`;

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

            <DocPage id={DOC_ID} lang={lang}>
                <Letterhead lang={lang} accent={ACC} />
                <DocTitle title={t.title} pill={statusLabel} pillTone={statusTone} />

                <SummaryBox items={[
                    { label: t.invoiceNumber, value: invoiceNumber, mono: true },
                    { label: c.issueDate, value: issued },
                    { label: c.bookingRef, value: `#${ref}`, mono: true },
                    { label: t.invoiceStatus, value: statusLabel, tone: statusTone },
                    { label: c.currency, value: currency },
                    { label: c.bookingStatus, value: bookingStatus, tone: bookingTone },
                ]} />

                <div className="mt-5 grid grid-cols-2 gap-8">
                    <Section title={c.billTo} accent={ACC}>
                        <PartyLines name={booking.customer_name} phone={booking.customer_phone} email={booking.customer_email} />
                    </Section>
                    <Section title={c.bookingDetails} accent={ACC}>
                        <KV label={c.serviceDate} value={formatDocDate(booking.pickup_date)} />
                        <KV label={c.pickupTime} value={formatTime12h(booking.pickup_time)} />
                        <KV label={c.vehicle} value={booking.vehicle_type} />
                        <KV label={c.passengers} value={passengersText} />
                        <KV label={c.serviceType} value={isRoundTrip ? c.roundTripService : c.oneWayService} />
                    </Section>
                </div>

                <Section title={c.journeyRoute} accent={ACC} className="mt-4">
                    <RouteRows lang={lang} pickup={booking.pickup_location} destination={booking.destination}
                        stops={stops} roundTrip={isRoundTrip} returnTo={returnDestination} formatTime={formatTime12h} />
                </Section>

                <Section title={t.charges} accent={ACC} className="mt-4">
                    <ChargesTable lang={lang} rows={[{
                        title: isRoundTrip ? c.roundTripService : c.oneWayService,
                        sub: `${booking.vehicle_type} — ${c.chauffeur}`,
                        detail: booking.special_requests
                            ? <p className="whitespace-pre-wrap"><b>{c.specialRequests}:</b> {booking.special_requests}</p>
                            : undefined,
                        unit: formatMoney(total, currency),
                        amount: formatMoney(total, currency),
                    }]} />
                </Section>

                <div className="mt-4 grid grid-cols-[1.25fr_1fr] gap-6">
                    <Section title={c.paymentDetails} accent={ACC}>
                        <KV label={c.paymentMethod} value={methodLabel(paymentMethod, lang)} />
                        <KV label={t.invoiceStatus} value={statusLabel} tone={statusTone} />
                        <KV label={c.amountReceived} value={formatMoney(received, currency)} />
                        <KV label={c.outstanding} value={formatMoney(outstanding, currency)} tone={outstanding > 0 ? 'red' : undefined} />
                        {!isPaid && <KV label={t.dueDate} value={formatDocDate(booking.pickup_date)} />}
                        {lang === 'en' && <KV label={c.inWords} value={<span className="font-normal italic">{amountInWords(total, currency)}</span>} />}
                    </Section>
                    <div className="pt-5">
                        <TotalsBox
                            before={[{ label: c.subtotal, value: formatMoney(total, currency) }]}
                            grand={{ label: t.totalInvoice, value: formatMoney(total, currency) }}
                            after={[
                                { label: c.amountReceived, value: formatMoney(received, currency), tone: received > 0 ? 'green' : undefined },
                                { label: c.outstanding, value: formatMoney(outstanding, currency), strong: true, tone: outstanding > 0 ? 'red' : undefined },
                            ]}
                        />
                    </div>
                </div>

                {showBank && (
                    <Section title={t.bank} accent={ACC} className="mt-4">
                        <div className="grid grid-cols-2 gap-x-8">
                            {bank.bankName && <KV label={t.bankName} value={bank.bankName} />}
                            {bank.accountName && <KV label={t.accountName} value={bank.accountName} />}
                            {bank.accountNumber && <KV label={t.accountNumber} value={<span className="font-mono">{bank.accountNumber}</span>} />}
                            {bank.swiftCode && <KV label={t.swift} value={<span className="font-mono">{bank.swiftCode}</span>} />}
                        </div>
                        {bank.iban && <KV labelWidth="18%" label={t.iban} value={<span className="font-mono tracking-wider">{bank.iban}</span>} />}
                        {bank.notes && <p className="mt-1 text-[10.5px] italic text-gray-500">{bank.notes}</p>}
                    </Section>
                )}

                {quickNote.trim() && (
                    <Section title={c.remarks} accent={ACC} className="mt-4">
                        <p className="whitespace-pre-wrap text-[11.5px] text-gray-700">{quickNote.trim()}</p>
                    </Section>
                )}

                <div className="mt-4">
                    <Banner tone={isPaid ? 'green' : 'amber'}>{isPaid ? t.bannerPaid : `${paymentText} ${t.bannerDue}`}</Banner>
                </div>

                <TermsAndSignature lang={lang} accent={ACC} terms={[t.term1, t.term2, t.term3, t.term4, t.term5]} />

                <DocFooter lang={lang} thanks={t.thanks} />
            </DocPage>

            <PrintStyles id={DOC_ID} />
        </div>
    );
}
