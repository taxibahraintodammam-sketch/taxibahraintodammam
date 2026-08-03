'use client';
// @ts-ignore
import html2canvas from 'html2canvas';
// @ts-ignore
import { jsPDF } from 'jspdf';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import {
    Printer,
    ArrowLeft,
    Globe,
    MapPin,
    Phone,
    Mail,
    Languages
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type DocLang = 'en' | 'ar';

const QUOTE_TEXT: Record<DocLang, Record<string, string>> = {
    en: {
        quotation: 'QUOTATION', ref: 'Ref:', date: 'Date:',
        preparedFor: 'Prepared For', clientName: 'Client Name', phone: 'Phone:', email: 'Email:',
        subject: 'Sub: Official Quotation for Transport Services',
        dear: 'Dear', intro: 'Thank you for choosing Taxi Bahrain to Dammam. We are pleased to provide the following quotation for your requested transportation services. Please review the details of your upcoming journey below:',
        pickupDate: 'Pickup Date', time: 'Time', routeDetails: 'Route Details', from: 'From:', to: 'To:',
        vehicleReq: 'Vehicle Requirements', occupancy: 'Occupancy', passengers: 'Passengers', bags: 'Bags',
        specialRequests: 'Special Requests',
        closing: 'This quotation is based on the details provided. For any modifications, please contact our support team. We look forward to providing you with a comfortable and seamless experience.',
        totalQuoted: 'Total Quoted Price',
        terms: 'Terms & Conditions',
        term1: 'Price includes fuel, toll fees, and basic wait times.',
        term2: 'Cancellation is free up to 24 hours before pickup.',
        term3: 'This quotation is valid for 7 days from the date of issue.',
        authorizedSignature: 'Authorized Signature', director: 'Director', partner: 'Partner',
        city: 'Manama, Bahrain',
    },
    ar: {
        quotation: 'عرض سعر', ref: 'الرقم:', date: 'التاريخ:',
        preparedFor: 'مُعد لـ', clientName: 'اسم العميل', phone: 'الهاتف:', email: 'البريد الإلكتروني:',
        subject: 'الموضوع: عرض سعر رسمي لخدمات النقل',
        dear: 'عزيزي', intro: 'شكراً لاختياركم تاكسي البحرين إلى الدمام. يسعدنا تزويدكم بعرض السعر التالي لخدمات النقل المطلوبة. يرجى مراجعة تفاصيل رحلتكم القادمة أدناه:',
        pickupDate: 'تاريخ الانطلاق', time: 'الوقت', routeDetails: 'تفاصيل المسار', from: 'من:', to: 'إلى:',
        vehicleReq: 'متطلبات المركبة', occupancy: 'عدد الركاب', passengers: 'ركاب', bags: 'حقائب',
        specialRequests: 'طلبات خاصة',
        closing: 'يستند هذا العرض إلى التفاصيل المقدمة. لأي تعديلات، يرجى التواصل مع فريق الدعم لدينا. نتطلع لتقديم تجربة مريحة وسلسة لكم.',
        totalQuoted: 'السعر الإجمالي المقترح',
        terms: 'الشروط والأحكام',
        term1: 'السعر يشمل الوقود ورسوم الطرق ووقت الانتظار الأساسي.',
        term2: 'إلغاء مجاني حتى 24 ساعة قبل موعد الانطلاق.',
        term3: 'هذا العرض صالح لمدة 7 أيام من تاريخ الإصدار.',
        authorizedSignature: 'التوقيع المعتمد', director: 'المدير', partner: 'الشريك',
        city: 'المنامة، مملكة البحرين',
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
}

export default function LetterheadPage() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<DocLang>('en');
    const [quickNote, setQuickNote] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isEmailingOnly, setIsEmailingOnly] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setBooking(data);
            } catch (error) {
                console.error('Error fetching booking:', error);
            } finally {
                setLoading(false);
            }
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) { router.push('/admin/login'); return; }
            if (id) fetchBooking();
        });
    }, [id, router]);

    // Renders the letterhead to a PDF and returns it, without sending or downloading anything.
    const generateQuotationPdf = async () => {
        if (!booking) return null;
        const element = document.getElementById('printable-area');
        if (!element) return null;

        const customerName = booking.customer_name ? booking.customer_name.replace(/\s+/g, '-') : 'Client';
        const refId = booking.id.slice(0, 8).toUpperCase();
        const dateStr = booking.pickup_date || new Date().toISOString().split('T')[0];
        const filename = `Quotation-${refId}-${customerName}-${dateStr}.pdf`;

        const a4W = 210;
        const a4H = 297;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, scrollY: 0 });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
        pdf.addImage(imgData, 'JPEG', 0, 0, a4W, a4H);

        // Get base64 string (without the "data:application/pdf;base64," prefix)
        const pdfBase64 = pdf.output('datauristring').split(',')[1];

        return { pdf, pdfBase64, filename };
    };

    const emailQuotation = async (pdfBase64: string, filename: string) => {
        if (!booking) return;
        const emailRes = await adminFetch('/api/send-quote-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                booking: {
                    ...booking,
                    special_requests: quickNote.trim()
                        ? `${booking.special_requests || ''}\nNote: ${quickNote}`
                        : booking.special_requests
                },
                currency: booking.currency || 'SAR',
                pdfBase64,
                pdfFilename: filename,
            }),
        });

        if (!emailRes.ok) {
            throw new Error('Failed to send quote email');
        }
    };

    // Combined action: email the quotation AND download a local copy.
    const handlePrint = async () => {
        if (!booking) return;

        setSendingEmail(true);
        try {
            const result = await generateQuotationPdf();
            if (!result) return;

            await emailQuotation(result.pdfBase64, result.filename);
            result.pdf.save(result.filename);

            alert("✅ Quotation emailed with PDF attachment & downloaded successfully!");
        } catch (error) {
            console.error('Error in handlePrint:', error);
            alert("An error occurred. Please try again.");
        } finally {
            setSendingEmail(false);
        }
    };

    // Download-only action: no email is sent.
    const handleDownloadOnly = async () => {
        if (!booking) return;

        setIsDownloading(true);
        try {
            const result = await generateQuotationPdf();
            if (!result) return;
            result.pdf.save(result.filename);
        } catch (error) {
            console.error('Error downloading quotation PDF:', error);
            alert("An error occurred while generating the PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    // Email-only action: no local download is triggered.
    const handleSendEmailOnly = async () => {
        if (!booking) return;

        setIsEmailingOnly(true);
        try {
            const result = await generateQuotationPdf();
            if (!result) return;
            await emailQuotation(result.pdfBase64, result.filename);
            setEmailSent(true);
            setTimeout(() => setEmailSent(false), 4000);
        } catch (error) {
            console.error('Error emailing quotation:', error);
            alert("An error occurred while sending the email. Please try again.");
        } finally {
            setIsEmailingOnly(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    const documentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formatTime12h = (timeStr?: string) => {
        if (!timeStr) return '—';
        try {
            const parts = timeStr.split(':');
            if (parts.length < 2) return timeStr;
            let hours = parseInt(parts[0], 10);
            const minutes = parts[1];
            if (isNaN(hours)) return timeStr;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${hours}:${minutes} ${ampm}`;
        } catch {
            return timeStr;
        }
    };

    const t = QUOTE_TEXT[lang];

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 print:bg-white print:py-0 print:px-0 print:min-h-0">
            {/* Header Controls */}
            <div className="max-w-[210mm] mx-auto mb-4 flex flex-wrap gap-3 justify-between items-center print:hidden">
                <Button variant="outline" onClick={() => router.back()} className="bg-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>
                <div className="flex flex-wrap gap-2 items-center">
                    <button
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 h-10 bg-white hover:bg-gray-50 transition-all text-xs font-bold"
                    >
                        <Languages className="w-3.5 h-3.5" /> {lang === 'en' ? 'English' : 'عربي'}
                    </button>
                    <Button
                        onClick={handleDownloadOnly}
                        disabled={isDownloading}
                        variant="outline"
                        className="bg-white font-bold"
                    >
                        {isDownloading ? (
                            <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900 mr-2"></div> Generating...</>
                        ) : (
                            <><Printer className="w-4 h-4 mr-2" /> Download PDF</>
                        )}
                    </Button>

                    <Button
                        onClick={handleSendEmailOnly}
                        disabled={isEmailingOnly}
                        className={`font-bold ${emailSent ? 'bg-green-500 text-white hover:bg-green-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        {isEmailingOnly ? (
                            <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div> Sending...</>
                        ) : (
                            <><Mail className="w-4 h-4 mr-2" /> {emailSent ? '✓ Email Sent!' : 'Send Email'}</>
                        )}
                    </Button>

                    <Button
                        onClick={handlePrint}
                        disabled={sendingEmail}
                        className="bg-primary text-black hover:bg-black hover:text-white font-bold"
                    >
                        {sendingEmail ? (
                            <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div> Sending & Generating...</>
                        ) : (
                            <><Printer className="w-4 h-4 mr-2" /> Send & Download Quotation</>
                        )}
                    </Button>
                </div>
            </div>

            {/* Quick Note Input — screen only */}
            <div className="max-w-[210mm] mx-auto mb-4 print:hidden">
                <textarea
                    value={quickNote}
                    onChange={e => setQuickNote(e.target.value)}
                    placeholder="Type a custom message here (e.g. I have 2 checked bags...)"
                    rows={2}
                    className="w-full border-2 border-dashed border-primary/20 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-primary focus:ring-0 resize-none bg-white/50 backdrop-blur-sm shadow-sm transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1 uppercase font-bold tracking-widest">Note: Text entered above will appear directly in the quotation below.</p>
            </div>

            {/* Letterhead Container */}
            <div
                id="printable-area"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                className="max-w-[210mm] mx-auto bg-white shadow-xl border border-gray-100 print:shadow-none print:border-none print:m-0"
            >
                <div className="h-full flex flex-col p-12 md:p-16 relative font-sans text-gray-900 justify-between">
                    <div>
                        {/* Company Header */}
                        <div className="flex justify-between items-start mb-10 border-b border-gray-200 pb-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2.5 mb-3">
                                    <div className="relative w-12 h-12 print:w-10 print:h-10">
                                        <Image
                                            src="/logo.svg"
                                            alt="Taxi Bahrain to Dammam"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-xl font-bold tracking-tight text-gray-900">
                                        Taxi Service <span className="text-lime-600">KSA</span>
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 space-y-1 leading-snug">
                                    <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-400" /> {t.city}</p>
                                    <p className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400" /> info@taxibahraintodammam.com</p>
                                    <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400" /> <span dir="ltr">+973 3501 4335</span></p>
                                    <p className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-gray-400" /> www.taxibahraintodammam.com</p>
                                </div>
                            </div>
                            <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-wide">{t.quotation}</h1>
                                <p className="text-gray-500 font-mono text-xs mt-1">{t.ref} #{booking.id.slice(0, 8).toUpperCase()}</p>
                                <p className="text-gray-500 text-xs">{t.date} {documentDate}</p>
                            </div>
                        </div>

                        {/* Recipient */}
                        <div className="mb-8">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t.preparedFor}</h3>
                            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                                <p className="font-bold text-sm text-gray-900">{booking.customer_name || t.clientName}</p>
                                <div className="text-xs text-gray-600 mt-1.5 space-y-1">
                                    {booking.customer_phone && <p>{t.phone} <span dir="ltr">{booking.customer_phone}</span></p>}
                                    {booking.customer_email && <p>{t.email} {booking.customer_email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Letter Content */}
                        <div className="flex-1 space-y-5">
                            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-200 pb-2 inline-block">{t.subject}</h3>

                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {t.dear} {booking.customer_name},<br /><br />
                                {t.intro}
                            </p>

                            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm">
                                <div className="grid grid-cols-2 gap-y-4">
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{t.pickupDate}</p>
                                        <p className="font-semibold text-gray-900">{booking.pickup_date}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{t.time}</p>
                                        <p className="font-semibold text-gray-900">{formatTime12h(booking.pickup_time)}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{t.routeDetails}</p>
                                        <p className="font-semibold text-gray-900">{t.from} {booking.pickup_location}</p>
                                        <p className="font-semibold text-gray-900 mt-0.5">{t.to} {booking.destination}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{t.vehicleReq}</p>
                                        <p className="font-semibold text-gray-900">{booking.vehicle_type}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{t.occupancy}</p>
                                        <p className="font-semibold text-gray-900">{booking.passengers} {t.passengers}, {booking.luggage} {t.bags}</p>
                                    </div>
                                    {booking.special_requests && (
                                        <div className="col-span-2">
                                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{t.specialRequests}</p>
                                            <p className="font-semibold text-gray-900">{booking.special_requests}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm text-gray-700">
                                {t.closing}
                            </p>

                            {quickNote.trim() && (
                                <div className="border-l-2 border-primary px-3 py-1.5 bg-primary/5 rounded-r">
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{quickNote.trim()}</p>
                                </div>
                            )}

                            {booking.total_price !== undefined && booking.total_price !== null && (
                                <div className="flex items-center justify-between border border-gray-200 py-3 px-4 rounded-lg bg-gray-50">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.totalQuoted}</span>
                                    <span className="text-xl font-bold text-gray-900">
                                        {booking.currency || 'SAR'} {booking.total_price.toFixed(2)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-end gap-8">
                        <div className="max-w-md">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">{t.terms}</p>
                            <ul className="list-disc list-inside space-y-0.5 text-[10px] text-gray-500">
                                <li>{t.term1}</li>
                                <li>{t.term2}</li>
                                <li>{t.term3}</li>
                            </ul>
                        </div>
                        <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">{t.authorizedSignature}</p>
                            <div className={`flex items-end gap-6 ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                                <div className="text-center">
                                    <img src="/fahed-signature.png" alt="Fahed Irshad" className="h-8 w-auto object-contain mx-auto" />
                                    <p className="text-[10px] font-semibold text-gray-700 border-t border-gray-300 pt-1 mt-1 min-w-[70px]">Fahed Irshad</p>
                                    <p className="text-[8px] text-gray-400">{t.director}</p>
                                </div>
                                <div className="text-center">
                                    <img src="/zumer-signature.png" alt="Zumer" className="h-8 w-auto object-contain mx-auto" />
                                    <p className="text-[10px] font-semibold text-gray-700 border-t border-gray-300 pt-1 mt-1 min-w-[70px]">Zumer</p>
                                    <p className="text-[8px] text-gray-400">{t.partner}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { background: white !important; margin: 0 !important; }
                    main { margin: 0 !important; padding: 0 !important; }
                    .md\\:ml-64, header, nav, aside, .print\\:hidden { display: none !important; }
                    #printable-area {
                        width: 210mm !important;
                        height: 297mm !important;
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 !important;
                        position: static !important;
                    }
                }
            `}</style>
        </div>
    );
}
