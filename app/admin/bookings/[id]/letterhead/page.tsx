'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Mail, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import {
    COMPANY, addDays, amountInWords, bookingRef, docFilename, formatDocDate, formatMoney,
    renderDocumentPdf, toNumber, type DocLang,
} from '@/lib/doc-utils';
import {
    ActionButton, BLUE, COMMON, ControlPanel, DocPage, DocToolbar, NoteBox, PartyBlock, PrintStyles,
    QuoteFooter, QuoteHeader, SectionLabel, TripDetails, type TripStop,
} from '@/components/admin/documents/DocumentKit';

const DOC_ID = 'printable-area';
const VALID_DAYS = 7;

const TEXT = {
    en: {
        title: 'Quotation',
        subject: 'Official quotation for private transport services',
        dear: 'Dear',
        intro: 'Thank you for your enquiry. We are pleased to quote for your private transfer as detailed below. The price is all-inclusive — there are no hidden charges at the border or on arrival.',
        service: 'Private Chauffeur Transfer', roundTripService: 'Round Trip Chauffeur Transfer',
        includes: ['Professional, licensed chauffeur', 'Fuel, tolls and parking', 'Border crossing assistance (King Fahd Causeway)', 'Free waiting time — 60 min at airports'],
        accept: 'Accept this quotation online',
        acceptHint: 'Open the link below, or reply to our email / WhatsApp, to confirm your booking.',
        stamp: 'QUOTED',
        term1: `This quotation is valid for ${VALID_DAYS} days from the date of issue, subject to vehicle availability.`,
        term2: 'Free cancellation up to 24 hours before the pickup time.',
        term3: 'Changes to the route, time or vehicle may change the price.',
        term4: 'Valid passports / visas for the border crossing are the passenger’s responsibility.',
        note: 'Note',
        noPrice: 'Price on request',
        subtitle: 'Private Transfer Proposal',
        journey: 'Your Journey',
        included: "What's Included",
        fare: 'Your Fare',
        fareHint: 'All-inclusive · no hidden charges',
        acceptedBy: 'Accepted by Client',
        acceptCaption: 'Name · Signature · Date',
    },
    ar: {
        title: 'عرض سعر',
        subject: 'عرض سعر رسمي لخدمات النقل الخاص',
        dear: 'عزيزي',
        intro: 'شكراً لاستفساركم. يسعدنا تقديم عرض السعر التالي لرحلتكم الخاصة. السعر شامل بالكامل — لا توجد رسوم مخفية عند الحدود أو عند الوصول.',
        service: 'نقل خاص بسائق', roundTripService: 'نقل خاص ذهاب وعودة',
        includes: ['سائق محترف ومرخص', 'الوقود والرسوم والمواقف', 'المساعدة في عبور جسر الملك فهد', 'انتظار مجاني — 60 دقيقة في المطار'],
        accept: 'اقبل عرض السعر عبر الإنترنت',
        acceptHint: 'افتح الرابط أدناه، أو رد على بريدنا / واتساب، لتأكيد حجزك.',
        stamp: 'QUOTED',
        term1: `هذا العرض صالح لمدة ${VALID_DAYS} أيام من تاريخ الإصدار حسب توفر المركبات.`,
        term2: 'إلغاء مجاني حتى 24 ساعة قبل موعد الانطلاق.',
        term3: 'قد يتغير السعر عند تغيير المسار أو الوقت أو المركبة.',
        term4: 'جوازات السفر والتأشيرات اللازمة لعبور الحدود مسؤولية الراكب.',
        note: 'ملاحظة',
        noPrice: 'السعر عند الطلب',
        subtitle: 'عرض نقل خاص',
        journey: 'رحلتكم',
        included: 'ما يشمله السعر',
        fare: 'الأجرة',
        fareHint: 'شامل بالكامل · بدون رسوم مخفية',
        acceptedBy: 'موافقة العميل',
        acceptCaption: 'الاسم · التوقيع · التاريخ',
    },
} satisfies Record<DocLang, Record<string, string | string[]>>;

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
    status: string;
    special_requests?: string;
    total_price?: number;
    currency?: string;
    has_return_trip?: boolean;
    invoice_data?: { stops?: TripStop[] };
}

export default function QuotationPage() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<DocLang>('en');
    const [quickNote, setQuickNote] = useState('');
    const [busy, setBusy] = useState<'' | 'download' | 'email' | 'both'>('');
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data, error } = await supabase.from('bookings').select('*').eq('id', id).single();
                if (error) throw error;
                setBooking(data);
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

    if (loading) return <div className="flex min-h-screen items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#0655ff]" /></div>;
    if (!booking) return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <p className="text-xl font-bold">Booking not found</p>
            <button onClick={() => router.back()} className="rounded-lg bg-black px-4 py-2 font-bold text-white">Go Back</button>
        </div>
    );

    const t = TEXT[lang];
    const c = COMMON[lang];
    const ref = bookingRef(booking.id);
    const quoteNumber = `QUO-${ref}`;
    const today = new Date();
    const issued = formatDocDate(today);
    const validUntil = formatDocDate(addDays(today, VALID_DAYS));
    const currency = booking.currency || 'BHD';
    const hasPrice = booking.total_price !== undefined && booking.total_price !== null && toNumber(booking.total_price) > 0;
    const total = toNumber(booking.total_price);
    const roundTrip = !!booking.has_return_trip;
    const acceptUrl = `${COMPANY.siteUrl}/booking/quote/?id=${booking.id}`;
    const filename = docFilename('Quotation', ref, booking.customer_name);

    const buildPdf = async () => {
        const el = document.getElementById(DOC_ID);
        if (!el) throw new Error('Quotation not found on page');
        return renderDocumentPdf(el, filename);
    };

    const emailQuote = async (pdfBase64: string) => {
        if (!booking.customer_email) throw new Error('This booking has no customer email.');
        if (!hasPrice) throw new Error('Set a price on the booking before emailing a quotation.');
        const res = await adminFetch('/api/send-quote-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                booking: {
                    ...booking,
                    special_requests: quickNote.trim()
                        ? `${booking.special_requests || ''}\nNote: ${quickNote.trim()}`.trim()
                        : booking.special_requests,
                },
                currency,
                pdfBase64,
                pdfFilename: filename,
            }),
        });
        if (!res.ok) throw new Error('Failed to send quote email');
        // The "Accept online" link only works for bookings in quote_sent.
        if (booking.status === 'pending') {
            await supabase.from('bookings').update({ status: 'quote_sent' }).eq('id', booking.id);
            setBooking({ ...booking, status: 'quote_sent' });
        }
    };

    const run = async (mode: 'download' | 'email' | 'both') => {
        setBusy(mode);
        try {
            const pdf = await buildPdf();
            if (mode !== 'download') await emailQuote(pdf.base64());
            if (mode !== 'email') pdf.save();
            if (mode !== 'download') { setSent(true); setTimeout(() => setSent(false), 4000); }
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setBusy('');
        }
    };

    return (
        <div className="min-h-screen bg-[#eef0f3] px-4 pb-10 print:bg-white print:p-0">
            <DocToolbar onBack={() => router.back()} lang={lang} onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}>
                <ActionButton onClick={() => run('download')} busy={busy === 'download'} icon={<Download className="h-4 w-4" />} label="Download PDF" busyLabel="Generating…" variant="outline" />
                <ActionButton onClick={() => run('email')} busy={busy === 'email'} done={sent && busy === ''} icon={<Mail className="h-4 w-4" />} label="Email Quote" busyLabel="Sending…" doneLabel="Sent" variant="outline" />
                <ActionButton onClick={() => run('both')} busy={busy === 'both'} icon={<Send className="h-4 w-4" />} label="Email & Download" busyLabel="Sending…" variant="blue" />
            </DocToolbar>

            <ControlPanel title="Quotation" hint={hasPrice
                ? `Price comes from the booking (${formatMoney(total, currency)}). Change it on the booking to update the quote.`
                : 'This booking has no price yet — set one on the booking before emailing the quote.'}>
                <textarea value={quickNote} onChange={(e) => setQuickNote(e.target.value)} rows={2}
                    placeholder="Personal note shown on the quotation (optional)…"
                    className="w-full resize-none rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#0655ff] focus:bg-white" />
            </ControlPanel>

            <div className="h-3 print:hidden" />

            <DocPage id={DOC_ID} lang={lang} kind="quotation">
                <QuoteHeader lang={lang} title={t.title} subtitle={t.subtitle}
                    meta={[
                        { label: c.no, value: quoteNumber, mono: true },
                        { label: c.issued, value: issued },
                        { label: c.validUntil, value: validUntil },
                        { label: c.bookingRef, value: `#${ref}`, mono: true },
                    ]}
                    badges={roundTrip ? <span className="rounded-full bg-white px-3 py-0.5 text-[9.5px] font-black uppercase tracking-wider" style={{ color: BLUE }}>{c.roundTrip}</span> : undefined}
                />

                <div className="mt-5 grid grid-cols-[1fr_1.5fr] gap-6">
                    <PartyBlock label={c.preparedFor} name={booking.customer_name} phone={booking.customer_phone} email={booking.customer_email} />
                    <div className="border-s-2 ps-5" style={{ borderColor: BLUE }}>
                        <p className="text-[12.5px] font-bold">{t.subject}</p>
                        <p className="mt-1.5 text-[11.5px] leading-relaxed text-gray-600">
                            {t.dear} {booking.customer_name?.split(' ')[0] || ''}, {t.intro}
                        </p>
                    </div>
                </div>

                <section className="mt-4 rounded-xl border border-blue-100 bg-[#f7f9ff] px-5 py-3">
                    <p className="mb-2 text-[13px] font-black" style={{ color: BLUE }}>{t.journey}</p>
                    <TripDetails lang={lang} date={booking.pickup_date} time={booking.pickup_time} vehicle={booking.vehicle_type}
                        passengers={booking.passengers} luggage={booking.luggage}
                        pickup={booking.pickup_location} destination={booking.destination}
                        stops={booking.invoice_data?.stops} roundTrip={roundTrip} />
                </section>

                <div className="mt-4 grid grid-cols-[1.15fr_1fr] gap-5">
                    <div>
                        <SectionLabel>{t.included}</SectionLabel>
                        <div className="grid grid-cols-2 gap-2">
                            {t.includes.map((x) => (
                                <div key={x} className="flex items-start gap-2 rounded-lg border border-gray-100 px-2.5 py-2">
                                    <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-black text-white" style={{ background: BLUE }}>✓</span>
                                    <span className="text-[10.5px] leading-snug text-gray-700">{x}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 rounded-lg border-2 border-dashed px-3 py-2" style={{ borderColor: '#b9ccff' }}>
                            <p className="text-[11.5px] font-black" style={{ color: BLUE }}>{t.accept}</p>
                            <p className="mt-0.5 text-[10px] leading-snug text-gray-600">{t.acceptHint}</p>
                            <p className="mt-0.5 break-all font-mono text-[9px] text-gray-500" dir="ltr">{acceptUrl.replace('https://', '')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center rounded-xl px-5 py-4 text-white" style={{ background: BLUE }}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.fare}</p>
                        <p className="mt-1 text-[30px] font-black leading-none" dir="ltr">{hasPrice ? formatMoney(total, currency) : t.noPrice}</p>
                        <p className="mt-1.5 text-[10px]" style={{ color: 'rgba(255,255,255,0.8)' }}>{roundTrip ? t.roundTripService : t.service} · {t.fareHint}</p>
                        {hasPrice && lang === 'en' && <p className="mt-2 border-t pt-2 text-[10px] italic" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}>{amountInWords(total, currency)}</p>}
                        <span className="mt-3 self-start rounded-full bg-white px-3 py-1 text-[10px] font-black" style={{ color: BLUE }} dir="ltr">{c.validUntil} · {validUntil}</span>
                    </div>
                </div>

                {(booking.special_requests || quickNote.trim()) && (
                    <div className="mt-4">
                        <NoteBox label={quickNote.trim() ? t.note : c.specialRequests}>
                            {[booking.special_requests, quickNote.trim()].filter(Boolean).join('\n')}
                        </NoteBox>
                    </div>
                )}

                <QuoteFooter lang={lang} terms={[t.term1, t.term2, t.term3, t.term4]} stampLabel={t.stamp}
                    refLine={`${quoteNumber} · ${issued}`} acceptLabel={t.acceptedBy} acceptCaption={t.acceptCaption} />
            </DocPage>

            <PrintStyles id={DOC_ID} />
        </div>
    );
}
