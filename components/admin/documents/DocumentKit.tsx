'use client';

import type { ReactNode } from 'react';
import { Herr_Von_Muellerhoff } from 'next/font/google';
import { ArrowLeft, Check, Languages, Loader2 } from 'lucide-react';
import { COMPANY, METHOD_AR, type DocLang } from '@/lib/doc-utils';

/**
 * Building blocks for the quotation, invoice and receipt, in a clean formal
 * corporate style: bold uppercase letterhead, a grey summary box, accent
 * section headings with label/value rows, a navy charges table and a totals
 * box. Each document has its own accent colour and title. Colours are plain
 * hex (not Tailwind theme tokens) so the PDF renderer reproduces them exactly.
 */

// Self-hosted by next/font, so it loads under the site's CSP and is
// available to the PDF renderer once document.fonts is ready.
const signatureFont = Herr_Von_Muellerhoff({ weight: '400', subsets: ['latin'], display: 'block' });

export const NAVY = '#0f172a';
const SIGNATURE_INK = '#16297a';

export type DocKind = 'quotation' | 'invoice' | 'receipt';

export const ACCENT: Record<DocKind, string> = {
    quotation: '#2747b8',
    invoice: '#118a5f',
    receipt: '#0f766e',
};

export const TONE = { green: '#118a5f', red: '#b42318', amber: '#b45309', ink: NAVY } as const;
export type Tone = keyof typeof TONE;

export const COMMON: Record<DocLang, Record<string, string>> = {
    en: {
        tagline: 'Private Transportation & Chauffeur Services',
        issueDate: 'Issue Date', currency: 'Currency', bookingRef: 'Booking Reference', bookingStatus: 'Booking Status',
        validUntil: 'Valid Until', customerName: 'Customer Name', emailAddress: 'Email Address', phone: 'Phone',
        billTo: 'Bill To', bookingDetails: 'Booking Details', journeyRoute: 'Journey Route',
        serviceDate: 'Service Date', pickupDate: 'Pickup Date', pickupTime: 'Pickup Time', vehicle: 'Vehicle',
        passengers: 'Passengers', luggage: 'Luggage', serviceType: 'Service Type',
        passengersN: 'passengers', bagsN: 'bags',
        pickup: 'Pickup', dropoff: 'Drop-off', returnTo: 'Return Drop-off', stop: 'Stop',
        oneWayService: 'Private One-Way Transfer', roundTripService: 'Private Round-Trip Transfer',
        chauffeur: 'Professional Chauffeur Service',
        description: 'Description', qty: 'Qty', unitPrice: 'Unit Price', amount: 'Amount',
        subtotal: 'Subtotal', paymentDetails: 'Payment Details', paymentMethod: 'Payment Method',
        amountReceived: 'Amount Received', outstanding: 'Outstanding Balance', inWords: 'Amount in Words',
        specialRequests: 'Special Requests', remarks: 'Remarks',
        terms: 'Terms & Conditions', director: 'Director',
        paid: 'Paid', unpaid: 'Unpaid', partial: 'Partially Paid', pending: 'Pending',
    },
    ar: {
        tagline: 'خدمات النقل الخاص والسائقين',
        issueDate: 'تاريخ الإصدار', currency: 'العملة', bookingRef: 'رقم الحجز', bookingStatus: 'حالة الحجز',
        validUntil: 'صالح حتى', customerName: 'اسم العميل', emailAddress: 'البريد الإلكتروني', phone: 'الهاتف',
        billTo: 'فاتورة إلى', bookingDetails: 'تفاصيل الحجز', journeyRoute: 'مسار الرحلة',
        serviceDate: 'تاريخ الخدمة', pickupDate: 'تاريخ الانطلاق', pickupTime: 'وقت الانطلاق', vehicle: 'المركبة',
        passengers: 'الركاب', luggage: 'الأمتعة', serviceType: 'نوع الخدمة',
        passengersN: 'ركاب', bagsN: 'حقائب',
        pickup: 'الانطلاق', dropoff: 'الوصول', returnTo: 'نقطة العودة', stop: 'محطة',
        oneWayService: 'نقل خاص باتجاه واحد', roundTripService: 'نقل خاص ذهاب وعودة',
        chauffeur: 'خدمة سائق محترف',
        description: 'الوصف', qty: 'الكمية', unitPrice: 'سعر الوحدة', amount: 'المبلغ',
        subtotal: 'المجموع الفرعي', paymentDetails: 'تفاصيل الدفع', paymentMethod: 'طريقة الدفع',
        amountReceived: 'المبلغ المستلم', outstanding: 'الرصيد المتبقي', inWords: 'المبلغ كتابةً',
        specialRequests: 'طلبات خاصة', remarks: 'ملاحظات',
        terms: 'الشروط والأحكام', director: 'المدير',
        paid: 'مدفوع', unpaid: 'غير مدفوع', partial: 'مدفوع جزئياً', pending: 'قيد الانتظار',
    },
};

const BOOKING_STATUS: Record<DocLang, Record<string, [string, Tone]>> = {
    en: {
        pending: ['Awaiting Quote', 'amber'], quote_sent: ['Quote Sent', 'amber'], confirmed: ['Confirmed', 'green'],
        in_progress: ['In Progress', 'green'], completed: ['Service Completed', 'green'],
        cancelled: ['Cancelled', 'red'], no_show: ['No Show', 'red'],
    },
    ar: {
        pending: ['بانتظار العرض', 'amber'], quote_sent: ['تم إرسال العرض', 'amber'], confirmed: ['مؤكد', 'green'],
        in_progress: ['قيد التنفيذ', 'green'], completed: ['تمت الخدمة', 'green'],
        cancelled: ['ملغي', 'red'], no_show: ['لم يحضر', 'red'],
    },
};

export function bookingStatusLabel(status: string | undefined, lang: DocLang): [string, Tone] {
    return BOOKING_STATUS[lang][status || 'pending'] || [status || '—', 'ink'];
}

export function methodLabel(method: string, lang: DocLang) {
    return lang === 'ar' ? METHOD_AR[method] || method : method;
}

// ── Screen-only controls ────────────────────────────────────────────────────

export function DocToolbar({ onBack, lang, onToggleLang, children }: {
    onBack: () => void; lang: DocLang; onToggleLang: () => void; children: ReactNode;
}) {
    return (
        <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur print:hidden">
            <div className="mx-auto flex max-w-[210mm] flex-wrap items-center gap-2">
                <button onClick={onBack} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button onClick={onToggleLang} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-gray-700 hover:bg-gray-50">
                    <Languages className="h-4 w-4" /> {lang === 'en' ? 'English' : 'عربي'}
                </button>
                <div className="ms-auto flex flex-wrap items-center gap-2">{children}</div>
            </div>
        </div>
    );
}

export function ActionButton({ onClick, busy, done, icon, label, busyLabel, doneLabel, variant = 'dark' }: {
    onClick: () => void; busy?: boolean; done?: boolean; icon: ReactNode; label: string;
    busyLabel?: string; doneLabel?: string; variant?: 'dark' | 'blue' | 'outline';
}) {
    const styles = {
        dark: 'bg-[#0f172a] text-white hover:bg-black',
        blue: 'bg-[#2747b8] text-white hover:bg-[#1f3a99]',
        outline: 'border border-gray-200 bg-white text-gray-800 hover:bg-gray-50',
    }[variant];
    return (
        <button onClick={onClick} disabled={busy}
            className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-sm font-bold transition disabled:opacity-60 ${done ? 'bg-green-600 text-white' : styles}`}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : done ? <Check className="h-4 w-4" /> : icon}
            {busy ? busyLabel || 'Working…' : done ? doneLabel || 'Done' : label}
        </button>
    );
}

/** A card of settings above the document — never printed. */
export function ControlPanel({ title, hint, children, aside }: { title: string; hint?: string; children: ReactNode; aside?: ReactNode }) {
    return (
        <section className="mx-auto mb-3 max-w-[210mm] rounded-xl border border-gray-200 bg-white p-4 shadow-sm print:hidden">
            <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-800">{title}</p>
                    {hint && <p className="mt-0.5 text-[11px] text-gray-400">{hint}</p>}
                </div>
                {aside}
            </div>
            {children}
        </section>
    );
}

export function Segmented<T extends string>({ label, options, value, onChange, render }: {
    label: string; options: readonly T[]; value: string; onChange: (v: T) => void; render?: (v: T) => string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
            <div className="flex flex-wrap gap-1">
                {options.map((o) => (
                    <button key={o} onClick={() => onChange(o)}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition ${value === o ? 'bg-[#0f172a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {render ? render(o) : o}
                    </button>
                ))}
            </div>
        </div>
    );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
            {children}
        </label>
    );
}

export const inputClass = 'h-9 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-900 outline-none focus:border-[#2747b8] focus:bg-white';

// ── The A4 document ─────────────────────────────────────────────────────────

export function DocPage({ id, lang, children }: { id: string; lang: DocLang; children: ReactNode }) {
    return (
        <div id={id} dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="doc-page relative mx-auto flex w-full max-w-[210mm] flex-col bg-white px-[14mm] pb-[8mm] pt-[9mm] shadow-[0_10px_40px_rgba(0,0,0,0.12)] print:max-w-none print:shadow-none"
            style={{ minHeight: '297mm', color: NAVY, fontFamily: lang === 'ar' ? 'Tahoma, Arial, sans-serif' : 'Arial, Helvetica, sans-serif' }}>
            {children}
        </div>
    );
}

/** Bold uppercase letterhead with contacts on the right and a heavy rule. */
export function Letterhead({ lang, accent }: { lang: DocLang; accent: string }) {
    return (
        <header className="flex items-start justify-between gap-6 border-b-2 pb-3" style={{ borderColor: NAVY }}>
            <div>
                <p className="text-[25px] font-black uppercase leading-none tracking-[0.02em]">
                    Taxi Bahrain to <span style={{ color: accent }}>Dammam</span>
                </p>
                <p className="mt-1.5 text-[12px] font-bold text-gray-600">{COMMON[lang].tagline}</p>
                <p className="text-[11px] text-gray-500">{COMPANY.city[lang]}</p>
            </div>
            <div className="text-end text-[11px] leading-[1.7] text-gray-600">
                <p dir="ltr">{COMPANY.phone}</p>
                <p>{COMPANY.email}</p>
                <p>{COMPANY.website}</p>
            </div>
        </header>
    );
}

export function DocTitle({ title, center, pill, pillTone = 'green', size = 26 }: {
    title: string; center?: boolean; pill?: string; pillTone?: Tone; size?: number;
}) {
    return (
        <div className={`mt-5 flex items-center gap-4 ${center ? 'justify-center' : 'justify-between'}`}>
            <h1 className="font-black uppercase leading-none tracking-[0.16em]" style={{ fontSize: size }}>{title}</h1>
            {pill && (
                <span className="rounded-xl border-2 px-4 py-1 text-[13px] font-black uppercase tracking-wider" style={{ color: TONE[pillTone], borderColor: TONE[pillTone] }}>
                    {pill}
                </span>
            )}
        </div>
    );
}

export type SummaryItem = { label: string; value: ReactNode; mono?: boolean; tone?: Tone };

/** Rounded grey box of 3-column label/value pairs under the title. */
export function SummaryBox({ items }: { items: SummaryItem[] }) {
    return (
        <div className="mt-3 grid grid-cols-3 gap-x-6 gap-y-2.5 rounded-xl border border-gray-200 bg-[#f8fafc] px-5 py-3.5">
            {items.map((it) => (
                <div key={it.label}>
                    <p className="text-[11px] text-gray-500">{it.label}</p>
                    <p className={`text-[12px] font-bold ${it.mono ? 'font-mono' : ''}`} style={it.tone ? { color: TONE[it.tone] } : undefined}><bdi>{it.value}</bdi></p>
                </div>
            ))}
        </div>
    );
}

export function Section({ title, accent, children, className = '' }: { title: string; accent: string; children: ReactNode; className?: string }) {
    return (
        <section className={className}>
            <h2 className="mb-2 border-b-[1.5px] pb-0.5 text-[10.5px] font-black uppercase tracking-[0.2em]" style={{ color: accent, borderColor: `${accent}99` }}>
                {title}
            </h2>
            {children}
        </section>
    );
}

/** One label/value row with a faint divider. */
export function KV({ label, value, labelWidth = '38%', tone }: { label: string; value: ReactNode; labelWidth?: string; tone?: Tone }) {
    return (
        <div className="grid gap-3 border-b border-gray-100 py-[3px] text-[11.5px]" style={{ gridTemplateColumns: `${labelWidth} 1fr` }}>
            <span className="text-gray-500">{label}</span>
            <span className="font-bold" style={tone ? { color: TONE[tone] } : undefined}><bdi>{value}</bdi></span>
        </div>
    );
}

export function PartyLines({ name, phone, email }: { name: string; phone?: string; email?: string }) {
    return (
        <div className="text-[11.5px] leading-[1.6]">
            <p className="text-[13px] font-bold"><bdi>{name || '—'}</bdi></p>
            {phone && <p className="text-gray-600" dir="ltr" style={{ textAlign: 'start' }}>{phone}</p>}
            {email && <p className="text-gray-600">{email}</p>}
        </div>
    );
}

export interface TripStop { time: string; location: string }

/** Pickup → stops → drop-off (→ return) as label/value rows. */
export function RouteRows({ lang, pickup, destination, stops = [], roundTrip, returnTo, formatTime }: {
    lang: DocLang; pickup: string; destination: string; stops?: TripStop[]; roundTrip?: boolean; returnTo?: string;
    formatTime: (t: string) => string;
}) {
    const c = COMMON[lang];
    return (
        <div>
            <KV labelWidth="20%" label={c.pickup} value={pickup} />
            {stops.filter((s) => s.location.trim()).map((s, i) => (
                <KV key={i} labelWidth="20%" label={`${c.stop} ${i + 1}${s.time ? ` · ${formatTime(s.time)}` : ''}`} value={s.location} />
            ))}
            <KV labelWidth="20%" label={c.dropoff} value={destination} />
            {roundTrip && <KV labelWidth="20%" label={c.returnTo} value={returnTo || pickup} />}
        </div>
    );
}

export function ChargesTable({ lang, rows }: {
    lang: DocLang; rows: { title: string; sub?: string; detail?: ReactNode; unit: string; amount: string }[];
}) {
    const c = COMMON[lang];
    return (
        <table className="w-full text-[11.5px]">
            <thead>
                <tr className="text-white" style={{ background: NAVY }}>
                    <th className="px-2.5 py-2 text-start font-bold">{c.description}</th>
                    <th className="w-14 px-2.5 py-2 text-center font-bold">{c.qty}</th>
                    <th className="w-32 px-2.5 py-2 text-end font-bold">{c.unitPrice}</th>
                    <th className="w-32 px-2.5 py-2 text-end font-bold">{c.amount}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((r, i) => (
                    <tr key={i} className="border-b border-gray-200 align-top">
                        <td className="px-2.5 py-2.5">
                            <p className="font-bold">{r.title}</p>
                            {r.sub && <p className="text-gray-600"><bdi>{r.sub}</bdi></p>}
                            {r.detail && <div className="text-[10.5px] text-gray-500">{r.detail}</div>}
                        </td>
                        <td className="px-2.5 py-2.5 text-center">1</td>
                        <td className="px-2.5 py-2.5 text-end" dir="ltr">{r.unit}</td>
                        <td className="px-2.5 py-2.5 text-end font-bold" dir="ltr">{r.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

/** Totals card: plain rows, a navy grand-total band, then follow-up rows. */
export function TotalsBox({ before = [], grand, after = [] }: {
    before?: { label: string; value: string; tone?: Tone }[];
    grand: { label: string; value: string };
    after?: { label: string; value: string; tone?: Tone; strong?: boolean }[];
}) {
    const row = (r: { label: string; value: string; tone?: Tone; strong?: boolean }) => (
        <div key={r.label} className={`flex items-center justify-between gap-3 border-b border-gray-100 px-3.5 py-1.5 last:border-b-0 ${r.strong ? 'text-[12.5px] font-bold' : 'text-[11.5px]'}`}>
            <span className={r.strong ? '' : 'text-gray-600'}>{r.label}</span>
            <span className="font-bold" style={r.tone ? { color: TONE[r.tone] } : undefined} dir="ltr">{r.value}</span>
        </div>
    );
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200">
            {before.map(row)}
            <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-white" style={{ background: NAVY }}>
                <span className="text-[11px] font-bold uppercase leading-tight">{grand.label}</span>
                <span className="whitespace-nowrap text-[17px] font-black" dir="ltr">{grand.value}</span>
            </div>
            {after.map(row)}
        </div>
    );
}

export function Banner({ tone = 'green', children }: { tone?: Tone; children: ReactNode }) {
    const color = TONE[tone];
    return (
        <div className="rounded-lg border px-4 py-2.5 text-[11.5px] font-bold" style={{ color, borderColor: `${color}55`, background: `${color}10` }}>
            {children}
        </div>
    );
}

export function TermsSection({ lang, accent, terms, className = '' }: { lang: DocLang; accent: string; terms: string[]; className?: string }) {
    return (
        <Section title={COMMON[lang].terms} accent={accent} className={className}>
            {/* Numbered by hand: list-decimal markers land on the wrong side in RTL PDFs. */}
            <ol className="list-none space-y-px text-[10px] leading-snug text-gray-600">
                {terms.map((t, i) => (
                    <li key={t} className="flex gap-1.5"><span className="shrink-0">{i + 1}.</span><span>{t}</span></li>
                ))}
            </ol>
        </Section>
    );
}

/** Fahed Irshad's signature: script name with a pen flourish, in blue ink. */
export function Signature({ width = 150 }: { width?: number }) {
    return (
        <div className="relative" style={{ width, height: 44 }} dir="ltr" aria-label={`Signed: ${COMPANY.director}`}>
            <span className={`${signatureFont.className} absolute start-2 top-0 whitespace-nowrap leading-none`}
                style={{ color: SIGNATURE_INK, fontSize: 36, transform: 'rotate(-4deg)', transformOrigin: 'left bottom' }}>
                Fahed Irshad
            </span>
            <svg viewBox="0 0 150 18" className="absolute bottom-0 start-0" style={{ width, height: 14 }}>
                <path d="M8 12 C 36 5, 64 16, 94 9 S 134 4, 146 7" stroke={SIGNATURE_INK} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
        </div>
    );
}

/** Terms on the left, company signature on the right, in one row. */
export function TermsAndSignature({ lang, accent, terms }: { lang: DocLang; accent: string; terms: string[] }) {
    return (
        <div className="mb-3 mt-4 grid grid-cols-[1fr_auto] items-end gap-6">
            <TermsSection lang={lang} accent={accent} terms={terms} />
            <SignatureBlock lang={lang} />
        </div>
    );
}

/** Company signature block, aligned to the end of the row. */
export function SignatureBlock({ lang, caption }: { lang: DocLang; caption?: string }) {
    return (
        <div className="w-[200px] text-center">
            <div className="flex justify-center"><Signature /></div>
            <div className="mt-0.5 border-t border-gray-400 pt-1">
                <p className="text-[12px] font-bold">{COMPANY.director}</p>
                <p className="text-[10.5px] text-gray-500">{caption || `${COMMON[lang].director}, ${COMPANY.name}`}</p>
            </div>
        </div>
    );
}

export function DocFooter({ lang, thanks }: { lang: DocLang; thanks: string }) {
    return (
        <footer className="mt-auto border-t border-gray-200 pt-2 text-center text-[10px] leading-relaxed text-gray-500">
            <p>{COMPANY.name} | {COMPANY.city[lang]} | <span dir="ltr">{COMPANY.phone}</span> | {COMPANY.email} | {COMPANY.website}</p>
            <p className="italic">{thanks}</p>
        </footer>
    );
}

/** Print rules shared by every document page. */
export function PrintStyles({ id }: { id: string }) {
    return (
        <style jsx global>{`
            /* Letter-spacing pulls joined Arabic letters apart, so drop it in RTL. */
            #${id}[dir='rtl'], #${id}[dir='rtl'] * { letter-spacing: 0 !important; }
            @media print {
                @page { size: A4; margin: 0; }
                html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
                body * { visibility: hidden; }
                #${id}, #${id} * { visibility: visible; }
                #${id} { position: absolute; inset: 0 auto auto 0; width: 210mm !important; box-shadow: none !important; }
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            }
        `}</style>
    );
}
