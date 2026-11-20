'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import {
    CURRENCIES, PAYMENT_METHODS, amountInWords, bookingRef, currencyDecimals, docFilename,
    formatDocDate, formatMoney, formatTime12h, renderDocumentPdf, toNumber, type DocLang,
} from '@/lib/doc-utils';
import {
    ActionButton, COMMON, ControlPanel, DocPage, DocToolbar, GREEN, ReceiptFooter, ReceiptHeader,
    Field, NoteBox, PrintStyles, Segmented, inputClass, methodLabel,
} from '@/components/admin/documents/DocumentKit';

const DOC_ID = 'receipt-print';

const TEXT: Record<DocLang, Record<string, string>> = {
    en: {
        title: 'Receipt',
        statementA: 'Received with thanks from',
        statementB: 'the sum of',
        statementC: 'towards private transport services on',
        service: 'Private Chauffeur Transfer',
        roundTripService: 'Round Trip Chauffeur Transfer',
        bookingTotal: 'Booking Total',
        stamp: 'RECEIVED',
        term1: 'This receipt confirms payment received for the booking referenced above.',
        term2: 'Please retain this receipt for your records.',
        term3: 'Refunds, where applicable, follow our cancellation policy.',
        remarks: 'Remarks', paymentStatus: 'Payment Status', thanks: 'Thank you for travelling with us!',
    },
    ar: {
        title: 'إيصال',
        statementA: 'استلمنا مع الشكر من',
        statementB: 'مبلغاً وقدره',
        statementC: 'مقابل خدمات النقل الخاص بتاريخ',
        service: 'نقل خاص بسائق',
        roundTripService: 'نقل خاص ذهاب وعودة',
        bookingTotal: 'إجمالي الحجز',
        stamp: 'RECEIVED',
        term1: 'يؤكد هذا الإيصال استلام الدفعة للحجز المذكور أعلاه.',
        term2: 'يرجى الاحتفاظ بهذا الإيصال لسجلاتكم.',
        term3: 'تخضع المبالغ المستردة لسياسة الإلغاء الخاصة بنا.',
        remarks: 'ملاحظات', paymentStatus: 'حالة الدفع', thanks: 'شكراً لسفركم معنا!',
    },
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
    invoice_data?: { stops?: { time: string; location: string }[] };
}

export default function ReceiptPage() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<DocLang>('en');
    const [currency, setCurrency] = useState('BHD');
    const [paymentMethod, setPaymentMethod] = useState('Cash to Driver');
    const [amountPaid, setAmountPaid] = useState('');
    const [receiptNote, setReceiptNote] = useState('');
    const [downloading, setDownloading] = useState(false);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data, error } = await supabase.from('bookings').select('*').eq('id', id).single();
                if (error) throw error;
                setBooking(data);
                if (data.currency) setCurrency(data.currency);
                if (data.payment_method) setPaymentMethod(data.payment_method);
                if (data.total_price) setAmountPaid(String(data.total_price));
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

    if (loading) return <div className="flex min-h-screen items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#1e7f4f]" /></div>;
    if (!booking) return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <p className="text-xl font-bold">Booking not found</p>
            <button onClick={() => router.back()} className="rounded-lg bg-black px-4 py-2 font-bold text-white">Go Back</button>
        </div>
    );

    const t = TEXT[lang];
    const c = COMMON[lang];
    const ref = bookingRef(booking.id);
    const receiptNumber = `RCP-${ref}`;
    const issued = formatDocDate(new Date());
    const total = toNumber(booking.total_price);
    const paid = toNumber(amountPaid || booking.total_price);
    const balance = Math.max(0, total - paid);
    const tolerance = 0.5 / 10 ** currencyDecimals(currency);
    const fullyPaid = total === 0 || balance <= tolerance;
    const filename = docFilename('Receipt', ref, booking.customer_name);
    const roundTrip = !!booking.has_return_trip;

    const buildPdf = async () => {
        const el = document.getElementById(DOC_ID);
        if (!el) throw new Error('Receipt not found on page');
        return renderDocumentPdf(el, filename);
    };

    const handleDownload = async () => {
        setDownloading(true);
        try { (await buildPdf()).save(); }
        catch (err) { console.error(err); window.print(); }
        finally { setDownloading(false); }
    };

    const handleSend = async () => {
        if (!booking.customer_email) { alert('This booking has no customer email.'); return; }
        setSending(true);
        try {
            const pdf = await buildPdf();
            await supabase.from('bookings')
                .update({ currency, payment_status: fullyPaid ? 'paid' : 'partial', payment_method: paymentMethod })
                .eq('id', booking.id);
            const res = await adminFetch('/api/send-receipt-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking, pdfBase64: pdf.base64(), filename,
                    currency, paymentMethod,
                    amountPaid: paid.toFixed(currencyDecimals(currency)),
                }),
            });
            if (!res.ok) throw new Error('Email API error');
            setSent(true);
            setTimeout(() => setSent(false), 4000);
        } catch (err) {
            console.error(err);
            alert('Failed to send the receipt. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#eef0f3] px-4 pb-10 print:bg-white print:p-0">
            <DocToolbar onBack={() => router.back()} lang={lang} onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}>
                <ActionButton onClick={handleDownload} busy={downloading} icon={<Download className="h-4 w-4" />} label="Download PDF" busyLabel="Generating…" variant="outline" />
                <ActionButton onClick={handleSend} busy={sending} done={sent} icon={<Mail className="h-4 w-4" />} label="Email Receipt" busyLabel="Sending…" doneLabel="Sent" variant="dark" />
            </DocToolbar>

            <ControlPanel title="Payment received" hint="These details appear on the receipt. Sending the email also saves the payment status on the booking.">
                <div className="grid gap-4 md:grid-cols-[160px_1fr]">
                    <Field label={`Amount paid (${currency})`}>
                        <input value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} inputMode="decimal" className={inputClass} placeholder="0.000" />
                    </Field>
                    <div className="flex flex-wrap gap-5">
                        <Segmented label="Currency" options={CURRENCIES} value={currency} onChange={setCurrency} />
                        <Segmented label="Method" options={PAYMENT_METHODS} value={paymentMethod} onChange={setPaymentMethod} />
                    </div>
                </div>
                <textarea value={receiptNote} onChange={(e) => setReceiptNote(e.target.value)} rows={2}
                    placeholder="Remarks shown on the receipt (optional)…"
                    className="mt-3 w-full resize-none rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#1e7f4f] focus:bg-white" />
            </ControlPanel>

            <DocPage id={DOC_ID} lang={lang} kind="receipt" watermark={fullyPaid ? c.paid : null}>
                <ReceiptHeader lang={lang} title={t.title}
                    meta={[
                        { label: c.no, value: receiptNumber, mono: true },
                        { label: c.issued, value: issued },
                        { label: c.bookingRef, value: `#${ref}`, mono: true },
                    ]}
                />

                {/* Ticket-style amount block with punched notches */}
                <div className="relative mt-6 overflow-hidden rounded-2xl px-8 py-6 text-center text-white" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #145c39 100%)` }}>
                    <span aria-hidden className="absolute -start-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white" />
                    <span aria-hidden className="absolute -end-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white" />
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.35em]" style={{ color: 'rgba(255,255,255,0.75)' }}>{c.amountPaid}</p>
                    <p className="mt-1.5 text-[44px] font-black leading-none" dir="ltr">{formatMoney(paid, currency)}</p>
                    {lang === 'en' && <p className="mt-2 text-[11px] italic" style={{ color: 'rgba(255,255,255,0.85)' }}>{amountInWords(paid, currency)}</p>}
                    <div className="mt-3 flex justify-center gap-2">
                        <span className="rounded-full bg-white px-3 py-0.5 text-[9.5px] font-black uppercase tracking-wider" style={{ color: GREEN }}>{fullyPaid ? c.paid : c.partial}</span>
                        <span className="rounded-full px-3 py-0.5 text-[9.5px] font-bold uppercase tracking-wider" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5)' }}>{methodLabel(paymentMethod, lang)}</span>
                    </div>
                </div>

                <p className="mx-auto mt-5 max-w-[88%] text-center text-[12.5px] leading-relaxed text-gray-700">
                    {t.statementA} <strong className="text-[#0d0d0d]"><bdi>{booking.customer_name}</bdi></strong> {t.statementB}{' '}
                    <strong style={{ color: GREEN }} dir="ltr">{formatMoney(paid, currency)}</strong> {t.statementC}{' '}
                    <strong className="text-[#0d0d0d]"><bdi>{formatDocDate(booking.pickup_date)}</bdi></strong>.
                </p>

                <div className="mt-5 overflow-hidden rounded-xl border-2 border-dashed border-gray-200">
                    {/* 1px gaps over a grey background draw the inner grid lines */}
                    <dl className="grid grid-cols-2 gap-px bg-gray-200 text-[11.5px]">
                        {([
                            [c.receivedFrom, <>{booking.customer_name}<span className="block text-[10px] font-normal text-gray-500" dir="ltr">{booking.customer_phone}</span></>, false],
                            [c.paymentMethod, methodLabel(paymentMethod, lang), false],
                            [`${c.date} · ${c.time}`, <bdi key="v">{formatDocDate(booking.pickup_date)} · {formatTime12h(booking.pickup_time)}</bdi>, false],
                            [c.vehicle, <><bdi>{booking.vehicle_type}</bdi> · {booking.passengers} {c.pax}</>, false],
                            [c.route, <><bdi>{booking.pickup_location}</bdi> <span style={{ color: GREEN }}>{roundTrip ? "⇄" : (lang === "ar" ? "←" : "→")}</span> <bdi>{booking.destination}</bdi></>, true],
                            [t.bookingTotal, <span key="v" dir="ltr">{formatMoney(total || paid, currency)}</span>, false],
                            fullyPaid
                                ? [t.paymentStatus, <span key="v" style={{ color: GREEN }}>{c.paid}</span>, false]
                                : [c.balanceDue, <span key="v" className="text-red-700" dir="ltr">{formatMoney(balance, currency)}</span>, false],
                        ] as [string, ReactNode, boolean][]).map(([k, v, wide]) => (
                            <div key={k} className={`bg-white px-4 py-2.5 ${wide ? 'col-span-2' : ''}`}>
                                <dt className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">{k}</dt>
                                <dd className="mt-0.5 font-bold leading-snug">{v}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {receiptNote.trim() && <div className="mt-4"><NoteBox label={t.remarks}>{receiptNote.trim()}</NoteBox></div>}

                <ReceiptFooter lang={lang} terms={[t.term1, t.term2, t.term3]} stampLabel={t.stamp}
                    refLine={`${receiptNumber} · ${issued}`} thanks={t.thanks} />
            </DocPage>

            <PrintStyles id={DOC_ID} />
        </div>
    );
}
