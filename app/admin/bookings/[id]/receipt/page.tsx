'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import {
    CURRENCIES, PAYMENT_METHODS, amountInWords, bookingRef, currencyDecimals, docFilename,
    formatDocDate, formatMoney, formatTime12h, renderDocumentPdf, toNumber, type DocLang,
} from '@/lib/doc-utils';
import {
    ACCENT, ActionButton, Banner, COMMON, ControlPanel, DocFooter, DocPage, DocTitle, DocToolbar, Field, KV,
    Letterhead, PartyLines, PrintStyles, RouteRows, Section, Segmented, SummaryBox,
    TermsAndSignature, TotalsBox, bookingStatusLabel, inputClass, methodLabel, type Tone,
} from '@/components/admin/documents/DocumentKit';

const DOC_ID = 'receipt-print';
const ACC = ACCENT.receipt;

const TEXT: Record<DocLang, Record<string, string>> = {
    en: {
        title: 'Payment Receipt', receiptNumber: 'Receipt Number', paymentDate: 'Payment Date',
        paymentStatus: 'Payment Status', receivedFrom: 'Received From', paymentSummary: 'Payment Summary',
        bookingTotal: 'Booking Total', totalReceived: 'Amount Received',
        statement: 'We confirm that we have received {amount} from {name} towards the private transport service on {date}.',
        bannerPaid: 'Payment has been received in full. Thank you for choosing Taxi Bahrain to Dammam.',
        bannerPartial: 'Part payment received. The outstanding balance shown above is still due.',
        term1: 'This receipt confirms the payment received for the booking referenced above.',
        term2: 'Please retain this receipt for your records.',
        term3: 'Refunds, where applicable, follow the cancellation terms of the confirmed booking.',
        thanks: 'Thank you for travelling with Taxi Bahrain to Dammam.',
    },
    ar: {
        title: 'إيصال دفع', receiptNumber: 'رقم الإيصال', paymentDate: 'تاريخ الدفع',
        paymentStatus: 'حالة الدفع', receivedFrom: 'استلمنا من', paymentSummary: 'ملخص الدفع',
        bookingTotal: 'إجمالي الحجز', totalReceived: 'المبلغ المستلم',
        statement: 'نؤكد استلام مبلغ {amount} من {name} مقابل خدمة النقل الخاص بتاريخ {date}.',
        bannerPaid: 'تم استلام المبلغ بالكامل. شكراً لاختياركم تاكسي البحرين إلى الدمام.',
        bannerPartial: 'تم استلام دفعة جزئية. الرصيد المتبقي الموضح أعلاه لا يزال مستحقاً.',
        term1: 'يؤكد هذا الإيصال الدفعة المستلمة للحجز المذكور أعلاه.',
        term2: 'يرجى الاحتفاظ بهذا الإيصال لسجلاتكم.',
        term3: 'تخضع المبالغ المستردة لشروط الإلغاء الخاصة بالحجز المؤكد.',
        thanks: 'شكراً لسفركم مع تاكسي البحرين إلى الدمام.',
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
    status?: string;
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
    const paidLabel = fullyPaid ? c.paid : c.partial;
    const paidTone: Tone = fullyPaid ? 'green' : 'amber';
    const [bookingStatus, bookingTone] = bookingStatusLabel(booking.status, lang);

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

            <DocPage id={DOC_ID} lang={lang}>
                <Letterhead lang={lang} accent={ACC} />
                <DocTitle title={t.title} pill={paidLabel} pillTone={paidTone} />

                <SummaryBox items={[
                    { label: t.receiptNumber, value: receiptNumber, mono: true },
                    { label: t.paymentDate, value: issued },
                    { label: c.bookingRef, value: `#${ref}`, mono: true },
                    { label: t.paymentStatus, value: paidLabel, tone: paidTone },
                    { label: c.currency, value: currency },
                    { label: c.bookingStatus, value: bookingStatus, tone: bookingTone },
                ]} />

                <p className="mt-4 text-[12px] leading-relaxed text-gray-700">
                    {t.statement
                        .split(/(\{amount\}|\{name\}|\{date\})/)
                        .map((part, i) =>
                            part === '{amount}' ? <b key={i} style={{ color: ACC }} dir="ltr">{formatMoney(paid, currency)}</b>
                            : part === '{name}' ? <b key={i}><bdi>{booking.customer_name}</bdi></b>
                            : part === '{date}' ? <b key={i}><bdi>{formatDocDate(booking.pickup_date)}</bdi></b>
                            : part)}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-8">
                    <Section title={t.receivedFrom} accent={ACC}>
                        <PartyLines name={booking.customer_name} phone={booking.customer_phone} email={booking.customer_email} />
                    </Section>
                    <Section title={c.bookingDetails} accent={ACC}>
                        <KV label={c.serviceDate} value={formatDocDate(booking.pickup_date)} />
                        <KV label={c.pickupTime} value={formatTime12h(booking.pickup_time)} />
                        <KV label={c.vehicle} value={booking.vehicle_type} />
                        <KV label={c.passengers} value={`${booking.passengers ?? 1} ${c.passengersN} · ${booking.luggage ?? 0} ${c.bagsN}`} />
                        <KV label={c.serviceType} value={roundTrip ? c.roundTripService : c.oneWayService} />
                    </Section>
                </div>

                <Section title={c.journeyRoute} accent={ACC} className="mt-4">
                    <RouteRows lang={lang} pickup={booking.pickup_location} destination={booking.destination}
                        stops={booking.invoice_data?.stops} roundTrip={roundTrip} formatTime={formatTime12h} />
                </Section>

                <div className="mt-4 grid grid-cols-[1.25fr_1fr] gap-6">
                    <Section title={t.paymentSummary} accent={ACC}>
                        <KV label={c.paymentMethod} value={methodLabel(paymentMethod, lang)} />
                        <KV label={t.paymentStatus} value={paidLabel} tone={paidTone} />
                        <KV label={t.paymentDate} value={issued} />
                        {lang === 'en' && <KV label={c.inWords} value={<span className="font-normal italic">{amountInWords(paid, currency)}</span>} />}
                        {receiptNote.trim() && <KV label={c.remarks} value={<span className="whitespace-pre-wrap font-normal">{receiptNote.trim()}</span>} />}
                    </Section>
                    <div className="pt-5">
                        <TotalsBox
                            before={[{ label: t.bookingTotal, value: formatMoney(total || paid, currency) }]}
                            grand={{ label: t.totalReceived, value: formatMoney(paid, currency) }}
                            after={[{ label: c.outstanding, value: formatMoney(balance, currency), strong: true, tone: fullyPaid ? undefined : 'red' }]}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <Banner tone={fullyPaid ? 'green' : 'amber'}>{fullyPaid ? t.bannerPaid : t.bannerPartial}</Banner>
                </div>

                <TermsAndSignature lang={lang} accent={ACC} terms={[t.term1, t.term2, t.term3]} />

                <DocFooter lang={lang} thanks={t.thanks} />
            </DocPage>

            <PrintStyles id={DOC_ID} />
        </div>
    );
}
