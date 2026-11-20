import { BUSINESS, SITE_URL } from '@/content/business';

/**
 * Shared helpers for the admin booking documents (quotation, invoice,
 * receipt). Everything here is pure / browser-safe so the three document
 * pages format money, dates and PDFs exactly the same way.
 */

export type DocLang = 'en' | 'ar';

export const COMPANY = {
    name: BUSINESS.brandName,
    director: BUSINESS.founderName,
    phone: BUSINESS.phoneDisplay,
    email: 'info@taxibahraintodammam.com',
    bookingEmail: 'booking@taxibahraintodammam.com',
    website: 'www.taxibahraintodammam.com',
    siteUrl: SITE_URL,
    logo: '/logo.svg',
    city: { en: 'Manama, Kingdom of Bahrain', ar: 'المنامة، مملكة البحرين' },
    tagline: {
        en: 'Private Chauffeur Transfers · Bahrain ⇄ Saudi Arabia',
        ar: 'خدمات نقل خاصة بسائق · البحرين ⇄ السعودية',
    },
} as const;

/** BHD first — the business is based in Bahrain. */
export const CURRENCIES = ['BHD', 'SAR', 'KWD', 'AED', 'QAR', 'OMR', 'USD'] as const;

export const PAYMENT_METHODS = ['Cash to Driver', 'Bank Transfer', 'Online', 'Card'] as const;

export const METHOD_AR: Record<string, string> = {
    'Cash to Driver': 'نقداً للسائق',
    'Bank Transfer': 'تحويل بنكي',
    Online: 'دفع إلكتروني',
    Card: 'بطاقة',
};

/** Dinar/rial currencies split into 1000 fils/baisa, so show 3 decimals. */
export function currencyDecimals(currency: string): number {
    return ['BHD', 'KWD', 'OMR'].includes(currency.toUpperCase()) ? 3 : 2;
}

export function toNumber(value: unknown): number {
    const n = typeof value === 'number' ? value : parseFloat(String(value ?? '').replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
}

/** "BHD 1,250.500" — thousands separators and the right number of decimals. */
export function formatMoney(amount: unknown, currency: string): string {
    const d = currencyDecimals(currency);
    const n = toNumber(amount);
    return `${currency} ${n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`;
}

export function formatTime12h(timeStr?: string | null): string {
    if (!timeStr) return '—';
    const [h, m] = timeStr.split(':');
    let hours = parseInt(h, 10);
    if (Number.isNaN(hours) || m === undefined) return timeStr;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${m.slice(0, 2)} ${ampm}`;
}

/** "19 Nov 2026". Kept in Latin digits in both languages so numbers match the PDF everywhere. */
export function formatDocDate(date: Date | string | null | undefined): string {
    if (!date) return '—';
    const d = typeof date === 'string' ? new Date(date.length === 10 ? `${date}T00:00:00` : date) : date;
    if (Number.isNaN(d.getTime())) return String(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

/** The 8-character booking reference customers see in every email (#AB12CD34). */
export function bookingRef(id: string): string {
    return id.slice(0, 8).toUpperCase();
}

// ── Amount in words (English) ───────────────────────────────────────────────

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function wordsBelowThousand(n: number): string {
    const parts: string[] = [];
    if (n >= 100) {
        parts.push(`${ONES[Math.floor(n / 100)]} Hundred`);
        n %= 100;
    }
    if (n >= 20) {
        parts.push(TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : ''));
    } else if (n > 0) {
        parts.push(ONES[n]);
    }
    return parts.join(' ');
}

function integerToWords(n: number): string {
    if (n === 0) return 'Zero';
    const scales = ['', 'Thousand', 'Million', 'Billion'];
    const parts: string[] = [];
    let i = 0;
    while (n > 0 && i < scales.length) {
        const chunk = n % 1000;
        if (chunk) parts.unshift(`${wordsBelowThousand(chunk)}${scales[i] ? ` ${scales[i]}` : ''}`);
        n = Math.floor(n / 1000);
        i++;
    }
    return parts.join(' ');
}

const UNIT_NAMES: Record<string, [string, string, string, string]> = {
    // [major singular, major plural, minor singular, minor plural]
    BHD: ['Bahraini Dinar', 'Bahraini Dinars', 'Fils', 'Fils'],
    KWD: ['Kuwaiti Dinar', 'Kuwaiti Dinars', 'Fils', 'Fils'],
    OMR: ['Omani Rial', 'Omani Rials', 'Baisa', 'Baisa'],
    SAR: ['Saudi Riyal', 'Saudi Riyals', 'Halala', 'Halalas'],
    QAR: ['Qatari Riyal', 'Qatari Riyals', 'Dirham', 'Dirhams'],
    AED: ['UAE Dirham', 'UAE Dirhams', 'Fils', 'Fils'],
    USD: ['US Dollar', 'US Dollars', 'Cent', 'Cents'],
};

/** "One Hundred Twenty Bahraini Dinars and Five Hundred Fils Only" */
export function amountInWords(amount: unknown, currency: string): string {
    const d = currencyDecimals(currency);
    const scale = 10 ** d;
    const total = Math.round(toNumber(amount) * scale);
    const major = Math.floor(total / scale);
    const minor = total % scale;
    const [maj1, majN, min1, minN] = UNIT_NAMES[currency.toUpperCase()] || [currency, currency, '', ''];
    let text = `${integerToWords(major)} ${major === 1 ? maj1 : majN}`;
    if (minor && min1) text += ` and ${integerToWords(minor)} ${minor === 1 ? min1 : minN}`;
    return `${text} Only`;
}

// ── PDF ─────────────────────────────────────────────────────────────────────

/**
 * Renders a document element to an A4 PDF. Uses html2canvas-pro because the
 * plain html2canvas inside html2pdf.js can't parse Tailwind v4's oklch()
 * colours. Content taller than one page is split across pages.
 */
export async function renderDocumentPdf(element: HTMLElement, filename: string) {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf'),
    ]);

    // Always lay the document out at true A4 width (794 CSS px) in the clone
    // that gets rasterised, so a phone or a narrow window produces exactly the
    // same one-page PDF as a desktop.
    const A4_PX = 794;
    // The signature uses a web font; make sure it has loaded before rasterising.
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1280,
        width: A4_PX,
        onclone: (doc: Document) => {
            const clone = element.id ? doc.getElementById(element.id) : null;
            if (clone) {
                clone.style.width = `${A4_PX}px`;
                clone.style.maxWidth = `${A4_PX}px`;
                clone.style.margin = '0';
                clone.style.boxShadow = 'none';
            }
        },
    });

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    const pageW = 210;
    const pageH = 297;
    const pagePx = Math.floor((canvas.width * pageH) / pageW);

    if (canvas.height <= pagePx * 1.12) {
        // Fits, or is only slightly taller than A4: keep it on one page,
        // shrinking it a touch (centred) rather than spilling a few lines
        // onto a second page.
        const fullH = (canvas.height * pageW) / canvas.width;
        const k = Math.min(1, pageH / fullH);
        const w = pageW * k;
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', (pageW - w) / 2, 0, w, fullH * k);
    } else {
        const slice = document.createElement('canvas');
        slice.width = canvas.width;
        const ctx = slice.getContext('2d')!;
        for (let y = 0, page = 0; y < canvas.height; y += pagePx, page++) {
            const h = Math.min(pagePx, canvas.height - y);
            slice.height = h;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, slice.width, h);
            ctx.drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h);
            if (page > 0) pdf.addPage();
            pdf.addImage(slice.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pageW, (h * pageW) / canvas.width);
        }
    }

    return {
        save: () => pdf.save(filename),
        base64: () => pdf.output('datauristring').split(',')[1],
        filename,
    };
}

/** "Invoice-AB12CD34-John-Smith.pdf" */
export function docFilename(kind: string, ref: string, customerName?: string | null): string {
    const who = (customerName || 'Client').trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'Client';
    return `${kind}-${ref}-${who}.pdf`;
}
