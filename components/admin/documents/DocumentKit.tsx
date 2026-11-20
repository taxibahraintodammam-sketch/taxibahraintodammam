'use client';

import type { ReactNode } from 'react';
import { ArrowLeft, Check, Languages, Loader2 } from 'lucide-react';
import { COMPANY, METHOD_AR, formatTime12h, formatDocDate, type DocLang } from '@/lib/doc-utils';

/**
 * One visual system for the quotation, invoice and receipt: same letterhead,
 * party block, trip summary, totals, footer and stamp. Colours are plain hex
 * (not Tailwind theme tokens) so the PDF renderer reproduces them exactly.
 */

export const INK = '#0d0d0d';
export const BLUE = '#0655ff';

export type DocKind = 'quotation' | 'invoice' | 'receipt';

export const ACCENT: Record<DocKind, string> = {
    quotation: BLUE,
    invoice: INK,
    receipt: '#1e7f4f',
};

export const COMMON: Record<DocLang, Record<string, string>> = {
    en: {
        no: 'No.', issued: 'Date', bookingRef: 'Booking Ref', validUntil: 'Valid Until', dueDate: 'Due',
        billTo: 'Bill To', preparedFor: 'Prepared For', receivedFrom: 'Received From',
        tripDetails: 'Trip Details', date: 'Date', time: 'Pickup Time', vehicle: 'Vehicle',
        passengers: 'Passengers', pax: 'Pax', bags: 'Bags', route: 'Route',
        pickup: 'Pick-up', dropoff: 'Drop-off', returnTo: 'Return Drop-off', stop: 'Stop',
        roundTrip: 'Round Trip', oneWay: 'One Way',
        specialRequests: 'Special Requests', note: 'Note',
        description: 'Description', qty: 'Qty', amount: 'Amount',
        subtotal: 'Subtotal', total: 'Total', amountPaid: 'Amount Paid', balanceDue: 'Balance Due',
        inWords: 'Amount in words',
        terms: 'Terms & Conditions', authorizedSignature: 'Authorized Signature', director: 'Director',
        paid: 'Paid', unpaid: 'Unpaid', partial: 'Partially Paid', pending: 'Pending',
        paymentMethod: 'Payment Method',
        phone: 'Phone', email: 'Email',
    },
    ar: {
        no: 'الرقم', issued: 'التاريخ', bookingRef: 'رقم الحجز', validUntil: 'صالح حتى', dueDate: 'الاستحقاق',
        billTo: 'فاتورة إلى', preparedFor: 'مُعد لـ', receivedFrom: 'استلمنا من',
        tripDetails: 'تفاصيل الرحلة', date: 'التاريخ', time: 'وقت الانطلاق', vehicle: 'المركبة',
        passengers: 'الركاب', pax: 'راكب', bags: 'حقيبة', route: 'المسار',
        pickup: 'الانطلاق', dropoff: 'الوصول', returnTo: 'نقطة العودة', stop: 'محطة',
        roundTrip: 'ذهاب وعودة', oneWay: 'اتجاه واحد',
        specialRequests: 'طلبات خاصة', note: 'ملاحظة',
        description: 'الوصف', qty: 'الكمية', amount: 'المبلغ',
        subtotal: 'المجموع الفرعي', total: 'الإجمالي', amountPaid: 'المبلغ المدفوع', balanceDue: 'الرصيد المستحق',
        inWords: 'المبلغ كتابةً',
        terms: 'الشروط والأحكام', authorizedSignature: 'التوقيع المعتمد', director: 'المدير',
        paid: 'مدفوع', unpaid: 'غير مدفوع', partial: 'مدفوع جزئياً', pending: 'قيد الانتظار',
        paymentMethod: 'طريقة الدفع',
        phone: 'الهاتف', email: 'البريد الإلكتروني',
    },
};

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
        dark: 'bg-[#0d0d0d] text-white hover:bg-black',
        blue: 'bg-[#0655ff] text-white hover:bg-[#0546d6]',
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
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition ${value === o ? 'bg-[#0d0d0d] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
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

export const inputClass = 'h-9 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-900 outline-none focus:border-[#0655ff] focus:bg-white';

// ── The A4 document ─────────────────────────────────────────────────────────

export function DocPage({ id, lang, kind, watermark, children }: {
    id: string; lang: DocLang; kind: DocKind; watermark?: string | null; children: ReactNode;
}) {
    return (
        <div id={id} dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="doc-page relative mx-auto w-full max-w-[210mm] overflow-hidden bg-white text-[#0d0d0d] shadow-[0_10px_40px_rgba(0,0,0,0.12)] print:max-w-none print:shadow-none"
            style={{ minHeight: '297mm', fontFamily: lang === 'ar' ? 'Tahoma, Arial, sans-serif' : 'Inter, "Segoe UI", Arial, sans-serif' }}>
            <div className="flex h-2">
                <div className="flex-1" style={{ background: INK }} />
                <div className="w-1/3" style={{ background: ACCENT[kind] === INK ? BLUE : ACCENT[kind] }} />
            </div>
            {watermark && (
                <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="-rotate-[28deg] select-none rounded-2xl border-[6px] px-10 py-3 text-[96px] font-black uppercase tracking-[0.15em] opacity-[0.07]"
                        style={{ color: ACCENT[kind] === INK ? '#1e7f4f' : ACCENT[kind], borderColor: ACCENT[kind] === INK ? '#1e7f4f' : ACCENT[kind] }}>
                        {watermark}
                    </span>
                </div>
            )}
            <div className="relative flex flex-col px-[14mm] pb-[8mm] pt-[9mm]" style={{ minHeight: 'calc(297mm - 8px)' }}>
                {children}
            </div>
        </div>
    );
}

export function DocHeader({ lang, kind, title, meta, badges }: {
    lang: DocLang; kind: DocKind; title: string;
    meta: { label: string; value: string; mono?: boolean }[];
    badges?: ReactNode;
}) {
    return (
        <header className="flex items-start justify-between gap-8 border-b border-gray-200 pb-5">
            <div className="flex items-start gap-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={COMPANY.logo} alt="" className="h-14 w-14 shrink-0 object-contain" />
                <div>
                    <p className="text-[19px] font-black leading-tight tracking-tight">
                        Taxi Bahrain <span style={{ color: BLUE }}>to Dammam</span>
                    </p>
                    <p className="mt-0.5 text-[10.5px] font-medium text-gray-500">{COMPANY.tagline[lang]}</p>
                    <div className="mt-2.5 space-y-0.5 text-[10.5px] leading-snug text-gray-600">
                        <p>{COMPANY.city[lang]}</p>
                        <p><span dir="ltr">{COMPANY.phone}</span> · {COMPANY.email}</p>
                        <p>{COMPANY.website}</p>
                    </div>
                </div>
            </div>
            <div className="shrink-0 text-end">
                <p className="text-[28px] font-black uppercase leading-none tracking-[0.08em]" style={{ color: ACCENT[kind] }}>{title}</p>
                <table className="ms-auto mt-3 text-[11px]">
                    <tbody>
                        {meta.map((m) => (
                            <tr key={m.label}>
                                <td className="pe-3 text-start text-gray-500">{m.label}</td>
                                <td className={`text-end font-bold ${m.mono ? 'font-mono tracking-wide' : ''}`} dir="ltr">{m.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {badges && <div className="mt-2.5 flex flex-wrap justify-end gap-1.5">{badges}</div>}
            </div>
        </header>
    );
}

export function Badge({ children, tone = 'gray' }: { children: ReactNode; tone?: 'green' | 'red' | 'amber' | 'blue' | 'gray' }) {
    const tones = {
        green: 'border-green-200 bg-green-50 text-green-700',
        red: 'border-red-200 bg-red-50 text-red-700',
        amber: 'border-amber-200 bg-amber-50 text-amber-700',
        blue: 'border-blue-200 bg-blue-50 text-blue-700',
        gray: 'border-gray-200 bg-gray-50 text-gray-600',
    }[tone];
    return <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${tones}`}>{children}</span>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
    return <p className="mb-2 text-[9.5px] font-black uppercase tracking-[0.18em] text-gray-400">{children}</p>;
}

export function PartyBlock({ label, name, phone, email }: { label: string; name: string; phone?: string; email?: string }) {
    return (
        <div>
            <SectionLabel>{label}</SectionLabel>
            <p className="text-[15px] font-bold">{name || '—'}</p>
            <div className="mt-1 space-y-0.5 text-[11px] text-gray-600">
                {phone && <p dir="ltr" className="text-start">{phone}</p>}
                {email && <p>{email}</p>}
            </div>
        </div>
    );
}

export interface TripStop { time: string; location: string }

export function TripDetails({ lang, date, time, vehicle, passengers, luggage, pickup, destination, stops = [], roundTrip, returnTo }: {
    lang: DocLang; date: string; time: string; vehicle: string; passengers?: number; luggage?: number;
    pickup: string; destination: string; stops?: TripStop[]; roundTrip?: boolean; returnTo?: string;
}) {
    const c = COMMON[lang];
    const points = [
        { label: `${c.pickup} · ${formatTime12h(time)}`, place: pickup, color: '#1e7f4f' },
        ...stops.filter((s) => s.location.trim()).map((s, i) => ({
            label: `${c.stop} ${i + 1}${s.time ? ` · ${formatTime12h(s.time)}` : ''}`, place: s.location, color: '#d97706',
        })),
        { label: c.dropoff, place: destination, color: '#b3261e' },
        ...(roundTrip ? [{ label: c.returnTo, place: returnTo || pickup, color: BLUE }] : []),
    ];
    return (
        <div className="grid grid-cols-[1fr_1.35fr] gap-6">
            <div>
                <SectionLabel>{c.tripDetails}</SectionLabel>
                <dl className="space-y-1.5 text-[11.5px]">
                    {[
                        [c.date, formatDocDate(date)],
                        [c.time, formatTime12h(time)],
                        [c.vehicle, vehicle || '—'],
                        [c.passengers, `${passengers ?? 1} ${c.pax}${luggage !== undefined ? ` · ${luggage} ${c.bags}` : ''}`],
                        [c.route, roundTrip ? c.roundTrip : c.oneWay],
                    ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-3 border-b border-dashed border-gray-100 pb-1.5">
                            <dt className="text-gray-500">{k}</dt>
                            <dd className="text-end font-semibold">{v}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div>
                <SectionLabel>{c.route}</SectionLabel>
                <ol className="relative space-y-2.5">
                    {points.map((p, i) => (
                        <li key={i} className="relative flex gap-3">
                            <div className="flex flex-col items-center">
                                <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ring-[3px] ring-white" style={{ background: p.color, boxShadow: `0 0 0 1px ${p.color}` }} />
                                {i < points.length - 1 && <span className="mt-1 w-px flex-1 border-s border-dashed border-gray-300" />}
                            </div>
                            <div className="min-w-0 pb-0.5">
                                <p className="text-[9.5px] font-bold uppercase tracking-wider" style={{ color: p.color }}>{p.label}</p>
                                <p className="break-words text-[12px] font-semibold leading-snug">{p.place || '—'}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export function LineItems({ lang, rows }: {
    lang: DocLang; rows: { title: string; detail?: ReactNode; amount: string }[];
}) {
    const c = COMMON[lang];
    return (
        <table className="w-full overflow-hidden rounded-lg text-[11.5px]">
            <thead>
                <tr className="text-white" style={{ background: INK }}>
                    <th className="w-8 px-3 py-2.5 text-start text-[9.5px] font-bold uppercase tracking-wider">#</th>
                    <th className="px-3 py-2.5 text-start text-[9.5px] font-bold uppercase tracking-wider">{c.description}</th>
                    <th className="w-12 px-3 py-2.5 text-center text-[9.5px] font-bold uppercase tracking-wider">{c.qty}</th>
                    <th className="w-36 px-3 py-2.5 text-end text-[9.5px] font-bold uppercase tracking-wider">{c.amount}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((r, i) => (
                    <tr key={i} className="border-b border-gray-100 align-top">
                        <td className="px-3 py-2.5 text-gray-400">{i + 1}</td>
                        <td className="px-3 py-2.5">
                            <p className="font-bold">{r.title}</p>
                            {r.detail && <div className="mt-0.5 text-[10.5px] leading-snug text-gray-500">{r.detail}</div>}
                        </td>
                        <td className="px-3 py-2.5 text-center">1</td>
                        <td className="px-3 py-2.5 text-end font-bold" dir="ltr">{r.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export function Totals({ rows, grand, words, wordsLabel, accent = INK }: {
    rows: { label: string; value: string; tone?: 'green' | 'red' }[];
    grand: { label: string; value: string };
    words?: string; wordsLabel?: string; accent?: string;
}) {
    return (
        <div className="flex items-end justify-between gap-6">
            <div className="max-w-[55%] text-[10.5px] text-gray-500">
                {words && (
                    <>
                        <p className="text-[9.5px] font-black uppercase tracking-[0.18em] text-gray-400">{wordsLabel}</p>
                        <p className="mt-1 font-semibold italic text-gray-700">{words}</p>
                    </>
                )}
            </div>
            <div className="w-[260px] shrink-0 text-[11.5px]">
                {rows.map((r) => (
                    <div key={r.label} className="flex justify-between border-b border-gray-100 py-1.5">
                        <span className="text-gray-500">{r.label}</span>
                        <span className={`font-bold ${r.tone === 'green' ? 'text-green-700' : r.tone === 'red' ? 'text-red-700' : ''}`} dir="ltr">{r.value}</span>
                    </div>
                ))}
                <div className="mt-2 flex items-center justify-between rounded-lg px-3.5 py-2.5 text-white" style={{ background: accent }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{grand.label}</span>
                    <span className="text-[16px] font-black" dir="ltr">{grand.value}</span>
                </div>
            </div>
        </div>
    );
}

export function NoteBox({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="rounded-lg border-s-[3px] bg-gray-50 px-3.5 py-2.5" style={{ borderColor: BLUE }}>
            <p className="text-[9.5px] font-black uppercase tracking-[0.18em] text-gray-400">{label}</p>
            <p className="mt-0.5 whitespace-pre-wrap text-[11.5px] leading-relaxed text-gray-700">{children}</p>
        </div>
    );
}

export function Stamp({ kind, label }: { kind: DocKind; label: string }) {
    const color = kind === 'receipt' ? '#1e7f4f' : BLUE;
    return (
        <svg viewBox="0 0 120 120" className="h-[96px] w-[96px] -rotate-6 opacity-90">
            <defs>
                {/* Top arc runs left→right over the top; glyphs sit outside it (r 40–46). */}
                <path id={`top-${kind}`} d="M 20,60 a 40,40 0 1,1 80,0" />
                {/* Bottom arc runs left→right under the bottom so text reads upright; glyphs sit inside it (r 46→40). */}
                <path id={`bot-${kind}`} d="M 14,60 a 46,46 0 0,0 92,0" />
            </defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke={color} strokeWidth="2.5" />
            <circle cx="60" cy="60" r="49" fill="none" stroke={color} strokeWidth="0.8" />
            <text fill={color} fontSize="7" fontWeight="900" letterSpacing="0.5" fontFamily="Arial, sans-serif">
                <textPath href={`#top-${kind}`} startOffset="50%" textAnchor="middle">TAXI BAHRAIN TO DAMMAM</textPath>
            </text>
            <text fill={color} fontSize="7" fontWeight="700" letterSpacing="1.2" fontFamily="Arial, sans-serif">
                <textPath href={`#bot-${kind}`} startOffset="50%" textAnchor="middle">★ MANAMA · BAHRAIN ★</textPath>
            </text>
            <rect x="26" y="50" width="68" height="20" rx="3" fill={color} />
            <text x="60" y="64" fill="#fff" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="1.5" fontFamily="Arial, sans-serif">{label}</text>
        </svg>
    );
}

export function DocFooter({ lang, kind, terms, stampLabel, refLine }: {
    lang: DocLang; kind: DocKind; terms: string[]; stampLabel: string; refLine: string;
}) {
    const c = COMMON[lang];
    return (
        <footer className="mt-auto pt-4">
            <div className="flex items-end justify-between gap-8 border-t border-gray-200 pt-4">
                <div className="max-w-[58%]">
                    <SectionLabel>{c.terms}</SectionLabel>
                    <ol className="list-decimal space-y-0.5 ps-4 text-[9.5px] leading-relaxed text-gray-500">
                        {terms.map((t) => <li key={t}>{t}</li>)}
                    </ol>
                </div>
                <div className="flex items-end gap-4">
                    <Stamp kind={kind} label={stampLabel} />
                    <div className="text-center">
                        <div className="mt-10 w-36 border-t border-gray-400 pt-1">
                            <p className="text-[11px] font-bold">{COMPANY.director}</p>
                            <p className="text-[9.5px] text-gray-500">{c.director} · {c.authorizedSignature}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 rounded-lg px-4 py-2 text-[9.5px] text-white/80" style={{ background: INK }}>
                <span className="font-mono tracking-wide" dir="ltr">{refLine}</span>
                <span dir="ltr">{COMPANY.website} · {COMPANY.bookingEmail} · {COMPANY.phone}</span>
            </div>
        </footer>
    );
}

/** Print rules shared by every document page. */
export function PrintStyles({ id }: { id: string }) {
    return (
        <style jsx global>{`
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
