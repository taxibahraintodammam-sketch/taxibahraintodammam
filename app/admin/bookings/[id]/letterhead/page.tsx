'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Mail, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import {
    COMPANY, addDays, amountInWords, bookingRef, docFilename, formatDocDate, formatMoney, formatTime12h,
    renderDocumentPdf, toNumber, type DocLang,
} from '@/lib/doc-utils';
import {
    ACCENT, ActionButton, COMMON, ControlPanel, DocFooter, DocPage, DocTitle, DocToolbar, KV, Letterhead,
    NAVY, PrintStyles, RouteRows, Section, SignatureBlock, SummaryBox, TONE, TermsSection, methodLabel,
    type Tone, type TripStop,
} from '@/components/admin/documents/DocumentKit';

const DOC_ID = 'printable-area';
const VALID_DAYS = 7;
const ACC = ACCENT.quotation;

const TEXT: Record<DocLang, Record<string, string>> = {
    en: {
        title: 'Official Transportation Quotation',
        quoteRef: 'Quotation Reference', quoteStatus: 'Quotation Status',
        awaiting: 'Awaiting Acceptance', confirmed: 'Confirmed', cancelled: 'Cancelled',
        preparedFor: 'Prepared For', serviceJourney: 'Service & Journey Details', summary: 'Quotation Summary',
        baseFare: 'Base Transportation Fare', totalQuoted: 'Total Quoted Price',
        payable: 'Full amount, payable',
        payableCash: 'in cash to the driver on the day of service',
        payableOther: 'by {method} before the day of service',
        pricingBasis: 'Pricing Basis', pricingBasisText: 'One private vehicle for the journey specified above.',
        included: 'Included in the Fare', includedText: 'Vehicle and professional chauffeur, fuel, road tolls, parking fees and King Fahd Causeway crossing assistance.',
        otherCharges: 'Any other charge (extra stops, extended waiting, route changes) is not included and will be agreed with you before it applies.',
        noAdvance: 'No advance payment is required unless agreed otherwise.',
        noPrice: 'Price on request',
        term1: 'This quotation is valid until {date}, unless otherwise stated.',
        term2: 'Subject to vehicle availability; the booking is confirmed once you accept and we send our confirmation.',
        term3: 'Journey times vary with traffic, flights and border processing; an exact arrival time cannot be guaranteed.',
        term4: 'Changes to time, route, passengers, luggage or vehicle may change the fare; we will ask for your approval first.',
        term5: 'Valid passports and visas for the border crossing are the passenger’s responsibility. There are no hidden fees.',
        nextStep: 'Next Step',
        nextStepText: 'Please check the journey details and fare, then accept online or reply by email or WhatsApp to confirm your booking.',
        acceptOnline: 'Accept online',
        customerAcceptance: 'Customer Acceptance', bookingConfirmation: 'Booking Confirmation', pending: 'Pending',
        representative: 'Authorised Representative',
        thanks: 'Thank you for considering Taxi Bahrain to Dammam for your transportation requirements.',
    },
    ar: {
        title: 'عرض سعر رسمي لخدمات النقل',
        quoteRef: 'رقم العرض', quoteStatus: 'حالة العرض',
        awaiting: 'بانتظار الموافقة', confirmed: 'مؤكد', cancelled: 'ملغي',
        preparedFor: 'مُعد لـ', serviceJourney: 'تفاصيل الخدمة والرحلة', summary: 'ملخص العرض',
        baseFare: 'أجرة النقل الأساسية', totalQuoted: 'السعر الإجمالي المقترح',
        payable: 'المبلغ كاملاً، يُدفع',
        payableCash: 'نقداً للسائق يوم الخدمة',
        payableOther: 'عن طريق {method} قبل يوم الخدمة',
        pricingBasis: 'أساس التسعير', pricingBasisText: 'مركبة خاصة واحدة للرحلة المذكورة أعلاه.',
        included: 'يشمل السعر', includedText: 'المركبة والسائق المحترف والوقود ورسوم الطرق والمواقف والمساعدة في عبور جسر الملك فهد.',
        otherCharges: 'أي رسوم أخرى (محطات إضافية، انتظار مطوّل، تغيير المسار) غير مشمولة وسيتم الاتفاق عليها معكم مسبقاً.',
        noAdvance: 'لا يلزم دفع مقدم ما لم يتم الاتفاق على غير ذلك.',
        noPrice: 'السعر عند الطلب',
        term1: 'هذا العرض صالح حتى {date} ما لم يذكر خلاف ذلك.',
        term2: 'هذا العرض يخضع لتوفر المركبات. يتم تأكيد الحجز بعد موافقتكم وإرسال تأكيد الحجز منا.',
        term3: 'قد تختلف مدة الرحلة بسبب حركة المرور والرحلات الجوية وإجراءات الحدود، ولا يمكن ضمان وقت وصول محدد.',
        term4: 'قد يؤثر تغيير وقت الانطلاق أو المسار أو عدد الركاب أو الأمتعة أو المركبة على التوفر والسعر، وسنشارككم أي تغيير للموافقة أولاً.',
        term5: 'جوازات السفر والتأشيرات اللازمة لعبور الحدود مسؤولية الراكب. لا توجد رسوم مخفية.',
        nextStep: 'الخطوة التالية',
        nextStepText: 'للمتابعة، يرجى التأكد من صحة تفاصيل الرحلة والمركبة والسعر. اقبلوا العرض عبر الرابط أدناه أو ردوا على بريدنا أو واتساب وسنؤكد حجزكم.',
        acceptOnline: 'القبول عبر الإنترنت',
        customerAcceptance: 'موافقة العميل', bookingConfirmation: 'تأكيد الحجز', pending: 'قيد الانتظار',
        representative: 'الممثل المفوض',
        thanks: 'شكراً لاختياركم تاكسي البحرين إلى الدمام لاحتياجات النقل الخاصة بكم.',
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
    status: string;
    special_requests?: string;
    total_price?: number;
    currency?: string;
    payment_method?: string;
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
    const isConfirmed = ['confirmed', 'in_progress', 'completed'].includes(booking.status);
    const [quoteStatus, quoteTone]: [string, Tone] = booking.status === 'cancelled' ? [t.cancelled, 'red']
        : isConfirmed ? [t.confirmed, 'green'] : [t.awaiting, 'amber'];
    const method = booking.payment_method || 'Cash to Driver';
    const payableText = `${t.payable} ${method === 'Cash to Driver' ? t.payableCash : t.payableOther.replace('{method}', methodLabel(method, lang).toLowerCase())}`;

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

            <DocPage id={DOC_ID} lang={lang}>
                <Letterhead lang={lang} accent={ACC} />
                <DocTitle title={t.title} center size={20} />

                <SummaryBox items={[
                    { label: t.quoteRef, value: quoteNumber, mono: true },
                    { label: c.issueDate, value: issued },
                    { label: c.validUntil, value: validUntil },
                    { label: t.quoteStatus, value: quoteStatus, tone: quoteTone },
                    { label: c.currency, value: currency },
                    { label: c.bookingRef, value: `#${ref}`, mono: true },
                ]} />

                <Section title={t.preparedFor} accent={ACC} className="mt-5">
                    <div className="grid grid-cols-3 gap-x-6 text-[11.5px]">
                        {[
                            [c.customerName, booking.customer_name],
                            [c.emailAddress, booking.customer_email || '—'],
                            [c.phone, <span key="p" dir="ltr">{booking.customer_phone || '—'}</span>],
                        ].map(([k, v]) => (
                            <div key={k as string}>
                                <p className="text-gray-500">{k}</p>
                                <p className="font-bold"><bdi>{v}</bdi></p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title={t.serviceJourney} accent={ACC} className="mt-4">
                    <div className="grid grid-cols-2 gap-x-8">
                        <KV label={c.serviceType} value={roundTrip ? c.roundTripService : c.oneWayService} />
                        <KV label={c.vehicle} value={booking.vehicle_type} />
                        <KV label={c.pickupDate} value={formatDocDate(booking.pickup_date)} />
                        <KV label={c.pickupTime} value={formatTime12h(booking.pickup_time)} />
                        <KV label={c.passengers} value={String(booking.passengers ?? 1)} />
                        <KV label={c.luggage} value={`${booking.luggage ?? 0} ${c.bagsN}`} />
                    </div>
                    <RouteRows lang={lang} pickup={booking.pickup_location} destination={booking.destination}
                        stops={booking.invoice_data?.stops} roundTrip={roundTrip} formatTime={formatTime12h} />
                    {booking.special_requests && <KV labelWidth="20%" label={c.specialRequests} value={booking.special_requests} />}
                </Section>

                <Section title={t.summary} accent={ACC} className="mt-4">
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <div className="flex justify-between px-4 py-2 text-[12px]">
                            <span>{t.baseFare}</span>
                            <span className="font-bold" dir="ltr">{hasPrice ? formatMoney(total, currency) : t.noPrice}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2 text-white" style={{ background: NAVY }}>
                            <span className="text-[13px] font-bold uppercase">{t.totalQuoted}</span>
                            <span className="whitespace-nowrap text-[19px] font-black" dir="ltr">{hasPrice ? formatMoney(total, currency) : t.noPrice}</span>
                        </div>
                        {hasPrice && (
                            <div className="flex justify-between gap-4 px-4 py-2 text-[11.5px] font-bold" style={{ color: TONE.green, background: '#ecfdf3' }}>
                                <span>{payableText}</span>
                                <span dir="ltr">{formatMoney(total, currency)}</span>
                            </div>
                        )}
                        <div className="space-y-0.5 bg-[#f8fafc] px-4 py-2 text-[11px] text-gray-700">
                            {hasPrice && lang === 'en' && <p><span className="text-gray-500">{c.inWords}:</span> <i>{amountInWords(total, currency)}</i></p>}
                            <p><span className="text-gray-500">{t.pricingBasis}:</span> {t.pricingBasisText}</p>
                            <p><span className="text-gray-500">{t.included}:</span> {t.includedText}</p>
                            <p className="text-gray-500">{t.otherCharges} {t.noAdvance}</p>
                            {quickNote.trim() && <p className="whitespace-pre-wrap"><span className="text-gray-500">{c.remarks}:</span> {quickNote.trim()}</p>}
                        </div>
                    </div>
                </Section>

                <TermsSection lang={lang} accent={ACC} className="mt-4"
                    terms={[t.term1.replace('{date}', validUntil), t.term2, t.term3, t.term4, t.term5]} />

                <div className="mb-3 mt-4 grid grid-cols-[1.25fr_1fr] items-end gap-8">
                    <Section title={t.nextStep} accent={ACC}>
                        <p className="text-[11.5px] leading-relaxed text-gray-700">{t.nextStepText}</p>
                        <p className="mt-1 break-all text-[10px] text-gray-500" dir="ltr">
                            <b style={{ color: ACC }}>{t.acceptOnline}:</b> {acceptUrl.replace('https://', '')}
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-4 text-[11px]">
                            <div>
                                <p className="text-gray-500">{t.customerAcceptance}</p>
                                <p className="font-bold" style={{ color: TONE[isConfirmed ? 'green' : 'amber'] }}>{isConfirmed ? t.confirmed : t.pending}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">{t.bookingConfirmation}</p>
                                <p className="font-bold" style={{ color: TONE[isConfirmed ? 'green' : 'amber'] }}>{isConfirmed ? t.confirmed : t.pending}</p>
                            </div>
                        </div>
                    </Section>
                    <div className="flex flex-col items-center">
                        <p className="mb-3 text-[10.5px] uppercase tracking-[0.15em] text-gray-500">{t.representative}</p>
                        <SignatureBlock lang={lang} />
                    </div>
                </div>

                <DocFooter lang={lang} thanks={t.thanks} />
            </DocPage>

            <PrintStyles id={DOC_ID} />
        </div>
    );
}
