'use client';
// html2pdf will be imported dynamically to avoid SSR issues


import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { adminFetch } from '@/lib/admin-fetch';
import {
    Printer,
    ArrowLeft,
    Mail,
    Phone,
    Globe,
    MapPin,
    Calendar,
    Clock,
    Car,
    User,
    Plus,
    Trash2,
    Repeat,
    Landmark,
    Languages
} from 'lucide-react';

type DocLang = 'en' | 'ar';

const INVOICE_TEXT: Record<DocLang, Record<string, string>> = {
    en: {
        invoice: 'INVOICE', no: 'No.', date: 'Date:', roundTrip: 'Round Trip',
        billTo: 'Bill To', tripSchedule: 'Trip Schedule',
        dateLabel: 'Date', timeLabel: 'Time', vehicleLabel: 'Vehicle', passengersLabel: 'Passengers',
        journeyRoute: 'Journey Route', stop: 'stop', stops: 'stops',
        pickup: 'Pick-up', dropoff: 'Drop-off', destination: 'Destination', returnDropoff: 'Return Drop-off',
        description: 'Description', amount: 'Amount',
        roundTripService: 'Round Trip Transfer Service', privateService: 'Private Transfer Service',
        chauffeurService: 'Professional Chauffeur Service',
        specialRequests: 'Special Requests:', totalPayable: 'Total Payable',
        bookingConfirmation: 'Booking Confirmation',
        bookingConfirmationText: 'Your transport service is fully confirmed. Please have this invoice ready for your chauffeur.',
        paymentInstruction: 'Payment Instruction',
        payCash: 'Payment to be handed to the driver upon journey completion.',
        payOnline: 'Payment has been secured via online transaction.',
        bankDetails: 'Bank Transfer Details', bankName: 'Bank Name', accountName: 'Account Name',
        accountNumber: 'Account Number', swift: 'SWIFT / BIC', iban: 'IBAN', note: 'Note:',
        terms: 'Terms & Conditions',
        term1: 'Price includes fuel, parking, and toll fees.',
        term2: 'Free cancellation up to 24 hours before pickup.',
        term3: 'Driver will wait 60 minutes for airport pickups.',
        term4: 'This invoice is valid for 30 days from date issued.',
        authorizedSignature: 'Authorized Signature', director: 'Director', partner: 'Partner',
        thankYou: 'Thank you for choosing Taxi Service KSA — www.taxibahraintodammam.com',
        pax: 'Pax', bags: 'Bags', city: 'Jeddah, Saudi Arabia',
    },
    ar: {
        invoice: 'فاتورة', no: 'الرقم', date: 'التاريخ:', roundTrip: 'ذهاب وعودة',
        billTo: 'فاتورة إلى', tripSchedule: 'جدول الرحلة',
        dateLabel: 'التاريخ', timeLabel: 'الوقت', vehicleLabel: 'المركبة', passengersLabel: 'الركاب',
        journeyRoute: 'مسار الرحلة', stop: 'محطة', stops: 'محطات',
        pickup: 'الانطلاق', dropoff: 'الوصول', destination: 'الوجهة', returnDropoff: 'نقطة العودة',
        description: 'الوصف', amount: 'المبلغ',
        roundTripService: 'خدمة نقل ذهاب وعودة', privateService: 'خدمة نقل خاص',
        chauffeurService: 'خدمة سائق محترف',
        specialRequests: 'طلبات خاصة:', totalPayable: 'المبلغ الإجمالي المستحق',
        bookingConfirmation: 'تأكيد الحجز',
        bookingConfirmationText: 'تم تأكيد خدمة النقل الخاصة بكم بالكامل. يرجى إحضار هذه الفاتورة لسائقكم.',
        paymentInstruction: 'تعليمات الدفع',
        payCash: 'يتم تسليم المبلغ للسائق عند انتهاء الرحلة.',
        payOnline: 'تم تأمين الدفع عبر معاملة إلكترونية.',
        bankDetails: 'تفاصيل التحويل البنكي', bankName: 'اسم البنك', accountName: 'اسم صاحب الحساب',
        accountNumber: 'رقم الحساب', swift: 'رمز السويفت', iban: 'رقم الآيبان', note: 'ملاحظة:',
        terms: 'الشروط والأحكام',
        term1: 'السعر يشمل الوقود ورسوم الانتظار والرسوم المرورية.',
        term2: 'إلغاء مجاني حتى 24 ساعة قبل موعد الانطلاق.',
        term3: 'ينتظر السائق 60 دقيقة عند الاستلام من المطار.',
        term4: 'هذه الفاتورة صالحة لمدة 30 يوماً من تاريخ الإصدار.',
        authorizedSignature: 'التوقيع المعتمد', director: 'المدير', partner: 'الشريك',
        thankYou: 'شكراً لاختياركم تاكسي سيرفس السعودية — www.taxibahraintodammam.com',
        pax: 'راكب', bags: 'حقيبة', city: 'جدة، المملكة العربية السعودية',
    },
};

const STATUS_AR: Record<string, string> = { Paid: 'مدفوع', Unpaid: 'غير مدفوع', Pending: 'قيد الانتظار' };
const METHOD_AR: Record<string, string> = { 'Cash to Driver': 'نقداً للسائق', Online: 'دفع إلكتروني', 'Bank Transfer': 'تحويل بنكي' };

interface Stop {
    time: string;
    location: string;
}
import { Button } from '@/components/ui/button';

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
    payment_status?: string;
    payment_method?: string;
}

export default function InvoicePage() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<DocLang>('en');
    const [quickNote, setQuickNote] = useState('');
    const [currency, setCurrency] = useState('SAR');
    const [paymentStatus, setPaymentStatus] = useState('Unpaid');
    const [paymentMethod, setPaymentMethod] = useState('Cash to Driver');
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [returnDestination, setReturnDestination] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [stops, setStops] = useState<Stop[]>([]);
    const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [bankDetails, setBankDetails] = useState({
        showOnDocument: false,
        bankName: 'Al Rajhi Bank',
        accountName: 'Taxi Service KSA LLC',
        accountNumber: '123456789012345',
        iban: 'SA8280000000123456789012',
        swiftCode: 'RAJHSARIXXX',
        notes: 'Please send transaction screenshot on WhatsApp once completed.'
    });

    const addEmail = () => {
        const val = emailInput.trim().toLowerCase();
        if (val && val.includes('@') && !additionalEmails.includes(val)) {
            setAdditionalEmails(prev => [...prev, val]);
            setEmailInput('');
        }
    };

    const addStop = () => setStops(prev => [...prev, { time: '', location: '' }]);
    const removeStop = (i: number) => setStops(prev => prev.filter((_, idx) => idx !== i));
    const updateStop = (i: number, field: keyof Stop, value: string) =>
        setStops(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));

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
                // Initialize editable fields from booking data if they exist
                if (data.currency) setCurrency(data.currency);
                if (data.payment_status) setPaymentStatus(data.payment_status);
                // Note: payment_method might not be in the DB yet, but we check just in case
                if (data.payment_method) setPaymentMethod(data.payment_method);
                // Auto-detect round trip from booking data
                if (data.has_return_trip) {
                    setIsRoundTrip(true);
                    setReturnDestination(data.pickup_location || '');
                }
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
        } catch (e) {
            return timeStr;
        }
    };

    const handlePrint = async () => {
        if (!booking) return;
        const customerName = booking.customer_name ? booking.customer_name.replace(/\s+/g, '-') : 'Client';
        const refId = booking.id.slice(0, 8).toUpperCase();
        const dateStr = booking.pickup_date || new Date().toISOString().split('T')[0];
        const filename = `Invoice-${refId}-${customerName}-${dateStr}.pdf`;

        const element = document.getElementById('invoice-print');
        if (!element) return;

        const opt = {
            margin: [0, 0, 0, 0] as [number, number, number, number],
            filename: filename,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                windowWidth: 1200, // Important: capture at desktop width
                scrollY: 0,
                scrollX: 0
            },
            jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
        };

        try {
            // @ts-ignore - dynamic import to avoid SSR 'self is not defined'
            const html2pdf = (await import('html2pdf.js')).default;
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF Generation Error:', error);
            // Fallback to window.print if html2pdf fails
            window.print();
        }
    };

    const handleSendEmail = async () => {
        if (!booking) return;
        setSendingEmail(true);
        setEmailSent(false);

        try {
            const customerName = booking.customer_name ? booking.customer_name.replace(/\s+/g, '-') : 'Client';
            const refId = booking.id.slice(0, 8).toUpperCase();
            const dateStr = booking.pickup_date || new Date().toISOString().split('T')[0];
            const filename = `Invoice-${refId}-${customerName}-${dateStr}.pdf`;

            const element = document.getElementById('invoice-print');
            if (!element) throw new Error('Invoice element not found');

            const opt = {
                margin: [0, 0, 0, 0] as [number, number, number, number],
                filename,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true, windowWidth: 1200, scrollY: 0, scrollX: 0 },
                jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
            };

            // @ts-ignore
            const html2pdf = (await import('html2pdf.js')).default;
            const pdfBlob: Blob = await html2pdf().set(opt).from(element).outputPdf('blob');

            const arrayBuffer = await pdfBlob.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);
            let binary = '';
            for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
            const base64 = btoa(binary);

            // Persist currency, paymentStatus, paymentMethod back to DB
            await supabase
                .from('bookings')
                .update({ currency, payment_status: paymentStatus, payment_method: paymentMethod })
                .eq('id', booking.id);

            const res = await adminFetch('/api/send-invoice-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking,
                    pdfBase64: base64,
                    filename,
                    currency,
                    paymentStatus,
                    paymentMethod,
                    additionalEmails,
                }),
            });

            if (!res.ok) throw new Error('Email API error');
            setEmailSent(true);
            setTimeout(() => setEmailSent(false), 4000);
        } catch (err) {
            console.error('Send Invoice Email Error:', err);
            alert('Failed to send invoice email. Please try again.');
        } finally {
            setSendingEmail(false);
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

    const invoiceDate = new Date(booking.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const invoiceNumber = `INV-${(booking.pickup_date || booking.created_at.slice(0, 10)).replace(/-/g, '')}-${booking.id.slice(0, 6).toUpperCase()}`;
    const t = INVOICE_TEXT[lang];

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 print:bg-white print:py-0 print:px-0 print:min-h-0">
            {/* Header Controls */}
            <div className="max-w-[210mm] mx-auto mb-4 flex flex-wrap gap-4 justify-between items-center print:hidden border-b pb-4">
                <Button variant="outline" onClick={() => router.back()} className="bg-white">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                <div className="flex flex-wrap gap-4 items-center">
                    {/* Language Toggle */}
                    <button
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        className="flex items-center gap-2 rounded-lg border p-1 shadow-sm px-3 h-10 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 transition-all"
                    >
                        <Languages className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                            {lang === 'en' ? 'English' : 'عربي'}
                        </span>
                    </button>

                    {/* Round Trip Toggle */}
                    <div className="flex flex-col gap-1">
                        <div
                            onClick={() => {
                                setIsRoundTrip(!isRoundTrip);
                                if (!isRoundTrip && booking) setReturnDestination(booking.pickup_location);
                            }}
                            className={`flex items-center gap-2 rounded-lg border p-1 shadow-sm px-3 cursor-pointer transition-all select-none ${
                                isRoundTrip ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white text-gray-500 border-gray-200'
                            }`}
                        >
                            <span className="text-lg">🔄</span>
                            <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                                {isRoundTrip ? 'Round Trip ON' : 'Round Trip'}
                            </span>
                        </div>
                        {isRoundTrip && (
                            <input
                                value={returnDestination}
                                onChange={(e) => setReturnDestination(e.target.value)}
                                className="h-7 w-40 text-[11px] font-bold border rounded px-2 outline-none bg-white"
                                placeholder="Return destination..."
                            />
                        )}
                    </div>

                    {/* Payment Status Custom Input */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 bg-white rounded-lg border p-1 shadow-sm px-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 whitespace-nowrap">Status:</span>
                            <input
                                value={paymentStatus}
                                onChange={(e) => setPaymentStatus(e.target.value)}
                                className="h-7 w-24 text-[11px] font-bold outline-none bg-transparent"
                                placeholder="e.g. Paid, Half"
                            />
                        </div>
                        <div className="flex gap-1 px-1">
                            {['Paid', 'Unpaid', 'Pending'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setPaymentStatus(status)}
                                    className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all ${paymentStatus === status
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method Custom Input */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 bg-white rounded-lg border p-1 shadow-sm px-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 whitespace-nowrap">Method:</span>
                            <input
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-7 w-28 text-[11px] font-bold outline-none bg-transparent"
                                placeholder="e.g. Cash, Link"
                            />
                        </div>
                        <div className="flex gap-1 px-1">
                            {['Cash to Driver', 'Online', 'Bank Transfer'].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => {
                                        setPaymentMethod(method);
                                        if (method === 'Bank Transfer') {
                                            setBankDetails(prev => ({ ...prev, showOnDocument: true }));
                                        }
                                    }}
                                    className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all ${paymentMethod === method
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Currency Custom Input */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 bg-white rounded-lg border p-1 shadow-sm px-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 whitespace-nowrap">Curr:</span>
                            <input
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                                className="h-7 w-16 text-[11px] font-bold outline-none bg-transparent uppercase"
                                placeholder="SAR"
                            />
                        </div>
                        <div className="flex gap-1 px-1">
                            {['SAR', 'KWD', 'AED', 'USD'].map((curr) => (
                                <button
                                    key={curr}
                                    onClick={() => setCurrency(curr)}
                                    className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all ${currency === curr
                                            ? 'bg-primary text-black'
                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                >
                                    {curr}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button onClick={handlePrint} className="bg-primary text-black hover:bg-black hover:text-white font-bold h-10 px-6">
                        <Printer className="w-4 h-4 mr-2" /> Download PDF
                    </Button>

                    <Button
                        onClick={handleSendEmail}
                        disabled={sendingEmail}
                        className={`font-bold h-10 px-6 ${emailSent ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        <Mail className="w-4 h-4 mr-2" />
                        {sendingEmail ? 'Sending...' : emailSent ? '✓ Email Sent!' : 'Send Invoice Email'}
                    </Button>
                </div>
            </div>

            {/* Quick Note Input — screen only */}
            <div className="max-w-[210mm] mx-auto mb-3 print:hidden">
                <textarea
                    value={quickNote}
                    onChange={e => setQuickNote(e.target.value)}
                    placeholder="Type a custom message here (e.g. I have 2 checked bags...)"
                    rows={2}
                    className="w-full border-2 border-dashed border-primary/20 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-primary focus:ring-0 resize-none bg-white/50 backdrop-blur-sm shadow-sm transition-all"
                />
            </div>

            {/* Multi-Stop Builder — screen only */}
            <div className="max-w-[210mm] mx-auto mb-4 print:hidden">
                <div className="bg-white border-2 border-dashed border-orange-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-xs font-black text-orange-600 uppercase tracking-widest">Multi-Stop Itinerary</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Add extra stops between pickup and drop-off</p>
                        </div>
                        <button
                            onClick={addStop}
                            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add Stop
                        </button>
                    </div>

                    {stops.length === 0 ? (
                        <p className="text-[11px] text-gray-400 italic text-center py-2">No extra stops. Click "Add Stop" to add intermediate locations.</p>
                    ) : (
                        <div className="space-y-2">
                            {stops.map((stop, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <span className="text-[10px] font-black text-gray-400 w-14 shrink-0">Stop {i + 1}</span>
                                    <input
                                        type="time"
                                        value={stop.time}
                                        onChange={e => updateStop(i, 'time', e.target.value)}
                                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold outline-none focus:border-orange-400 w-28 shrink-0"
                                    />
                                    <input
                                        type="text"
                                        value={stop.location}
                                        onChange={e => updateStop(i, 'location', e.target.value)}
                                        placeholder="Location / address..."
                                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-orange-400"
                                    />
                                    <button onClick={() => removeStop(i)} className="text-red-400 hover:text-red-600 transition-colors shrink-0">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Recipients */}
            <div className="max-w-[210mm] mx-auto mb-4 print:hidden">
                <div className="bg-white border-2 border-dashed border-blue-200 rounded-xl p-4">
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Additional Recipients</p>
                    <p className="text-[10px] text-gray-400 mb-3">Invoice email will also be sent (CC) to these addresses</p>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="email"
                            value={emailInput}
                            onChange={e => setEmailInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addEmail()}
                            placeholder="email@example.com"
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-blue-400"
                        />
                        <button
                            onClick={addEmail}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                    </div>
                    {additionalEmails.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {additionalEmails.map(email => (
                                <span key={email} className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-medium px-2 py-0.5 rounded-full">
                                    {email}
                                    <button onClick={() => setAdditionalEmails(prev => prev.filter(e => e !== email))} className="text-blue-400 hover:text-red-500 transition-colors ml-0.5">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Bank Details Editor Card — screen only */}
            <div className="max-w-[210mm] mx-auto mb-4 print:hidden">
                <div className="bg-white border-2 border-dashed border-blue-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🏦</span>
                            <div>
                                <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Bank Transfer Details</p>
                                <p className="text-[10px] text-gray-400">Configure bank information shown on the invoice document</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Show On Document</label>
                            <input 
                                type="checkbox" 
                                checked={bankDetails.showOnDocument} 
                                onChange={(e) => setBankDetails({...bankDetails, showOnDocument: e.target.checked})}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    {bankDetails.showOnDocument && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Bank Name</span>
                                <input
                                    value={bankDetails.bankName}
                                    onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                                    placeholder="e.g. Al Rajhi Bank"
                                    className="h-8 text-xs font-bold border rounded px-2 outline-none focus:border-blue-400 bg-gray-50/50"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Account Holder</span>
                                <input
                                    value={bankDetails.accountName}
                                    onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                                    placeholder="e.g. Taxi Service KSA"
                                    className="h-8 text-xs font-bold border rounded px-2 outline-none focus:border-blue-400 bg-gray-50/50"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">Account Number</span>
                                <input
                                    value={bankDetails.accountNumber}
                                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                                    placeholder="e.g. 123456789012345"
                                    className="h-8 text-xs font-bold border rounded px-2 outline-none focus:border-blue-400 bg-gray-50/50"
                                />
                            </div>
                            <div className="flex flex-col gap-1 md:col-span-2">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">IBAN Number</span>
                                <input
                                    value={bankDetails.iban}
                                    onChange={(e) => setBankDetails({...bankDetails, iban: e.target.value})}
                                    placeholder="e.g. SA8280000000..."
                                    className="h-8 text-xs font-bold border rounded px-2 outline-none focus:border-blue-400 bg-gray-50/50"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-gray-500 uppercase">SWIFT / BIC Code (Optional)</span>
                                <input
                                    value={bankDetails.swiftCode}
                                    onChange={(e) => setBankDetails({...bankDetails, swiftCode: e.target.value})}
                                    placeholder="e.g. RAJHSARIXXX"
                                    className="h-8 text-xs font-bold border rounded px-2 outline-none focus:border-blue-400 bg-gray-50/50"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Invoice Container — Single A4 Page */}
            <div id="invoice-print" dir={lang === 'ar' ? 'rtl' : 'ltr'} className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none print:max-w-none print:w-[210mm] box-border">
                {/* Decorative Top Bar */}
                <div className="h-2 bg-gray-900 w-full"></div>

                <div className="px-10 py-8 print:px-[14mm] print:py-[10mm] flex flex-col min-h-[calc(296mm-8px)] justify-between bg-white">

                    {/* Top Content */}
                    <div>
                        {/* Invoice Header */}
                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                                    Taxi Service <span className="text-lime-600">KSA</span>
                                </h2>
                                <div className="text-xs text-gray-500 space-y-1 mt-2 leading-snug">
                                    <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-400" /> {t.city}</p>
                                    <p className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400" /> info@taxibahraintodammam.com</p>
                                    <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400" /> <span dir="ltr">+966 56 948 7569</span></p>
                                    <p className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-gray-400" /> www.taxibahraintodammam.com</p>
                                </div>
                            </div>
                            <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-wide">{t.invoice}</h1>
                                <p className="text-gray-500 font-mono text-xs mt-1">{t.no} {invoiceNumber}</p>
                                <p className="text-gray-500 text-xs">{t.date} {invoiceDate}</p>
                                <div className={`flex gap-1.5 mt-2 ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                                    {isRoundTrip && (
                                        <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1 whitespace-nowrap">
                                            <Repeat className="w-2.5 h-2.5" /> {t.roundTrip}
                                        </span>
                                    )}
                                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase border whitespace-nowrap ${paymentStatus === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                        {lang === 'ar' ? (STATUS_AR[paymentStatus] || paymentStatus) : paymentStatus}
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-gray-50 text-gray-600 border border-gray-200 whitespace-nowrap">
                                        {lang === 'ar' ? (METHOD_AR[paymentMethod] || paymentMethod) : paymentMethod}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bill To + Trip Schedule */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t.billTo}</h3>
                                <p className="text-sm font-bold text-gray-900">{booking.customer_name}</p>
                                <div className="space-y-1 text-xs text-gray-600 mt-1.5">
                                    <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400 flex-shrink-0" /> <span dir="ltr">{booking.customer_phone}</span></p>
                                    <p className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400 flex-shrink-0" /> {booking.customer_email}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t.tripSchedule}</h3>
                                <div className="space-y-1">
                                    {[
                                        { icon: <Calendar className="w-3 h-3" />, label: t.dateLabel, value: booking.pickup_date },
                                        { icon: <Clock className="w-3 h-3" />, label: t.timeLabel, value: formatTime12h(booking.pickup_time) },
                                        { icon: <Car className="w-3 h-3" />, label: t.vehicleLabel, value: booking.vehicle_type },
                                        { icon: <User className="w-3 h-3" />, label: t.passengersLabel, value: `${booking.passengers} ${t.pax} · ${booking.luggage} ${t.bags}` },
                                    ].map(({ icon, label, value }) => (
                                        <div key={label} className="flex justify-between items-center text-xs">
                                            <span className="text-gray-500 flex items-center gap-1.5">{icon} {label}</span>
                                            <span className="font-semibold text-gray-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Route Details */}
                        <div className="mb-6">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                                {t.journeyRoute}
                                {stops.length > 0 && <span className="text-orange-500 normal-case font-medium mx-1.5">· {stops.length} {stops.length > 1 ? t.stops : t.stop}</span>}
                            </h3>
                            <div className={`relative space-y-3 before:absolute before:top-2 before:bottom-2 before:w-0.5 before:border-dashed before:border-gray-200 ${lang === 'ar' ? 'pr-5 before:right-[7px] before:border-r-2' : 'pl-5 before:left-[7px] before:border-l-2'}`}>

                                {/* Pickup */}
                                <div className="relative">
                                    <div className={`absolute top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm ${lang === 'ar' ? '-right-[18px]' : '-left-[18px]'}`}></div>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase">
                                        {t.pickup}{booking.pickup_time ? ` · ${formatTime12h(booking.pickup_time)}` : ''}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900 leading-snug break-words">{booking.pickup_location}</p>
                                </div>

                                {/* Extra stops */}
                                {stops.filter(s => s.location.trim()).map((stop, i) => (
                                    <div key={i} className="relative">
                                        <div className={`absolute top-1 w-3 h-3 bg-orange-400 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${lang === 'ar' ? '-right-[18px]' : '-left-[18px]'}`}>
                                            <span className="text-white text-[6px] font-bold">{i + 1}</span>
                                        </div>
                                        <p className="text-[10px] text-orange-500 font-semibold uppercase">
                                            {i + 1}. {stop.time ? ` · ${stop.time}` : ''}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 leading-snug break-words">{stop.location}</p>
                                    </div>
                                ))}

                                {/* Drop-off */}
                                <div className="relative">
                                    <div className={`absolute top-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm ${lang === 'ar' ? '-right-[18px]' : '-left-[18px]'}`}></div>
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase">{isRoundTrip ? t.destination : t.dropoff}</p>
                                    <p className="text-sm font-semibold text-gray-900 leading-snug break-words">{booking.destination}</p>
                                </div>

                                {/* Return */}
                                {isRoundTrip && (
                                    <div className="relative">
                                        <div className={`absolute top-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${lang === 'ar' ? '-right-[18px]' : '-left-[18px]'}`}>
                                            <Repeat className="w-2 h-2 text-white" />
                                        </div>
                                        <p className="text-[10px] text-blue-500 font-semibold uppercase">{t.returnDropoff}</p>
                                        <p className="text-sm font-semibold text-gray-900 leading-snug break-words">{returnDestination || booking.pickup_location}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Service Table */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3">{t.description}</th>
                                        <th className="px-4 py-3 text-right">{t.amount}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-gray-100">
                                        <td className="px-4 py-3.5">
                                            <p className="font-bold text-gray-900 text-sm">
                                                {isRoundTrip ? t.roundTripService : t.privateService}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {booking.vehicle_type} — {t.chauffeurService}
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-1 font-medium">
                                                {isRoundTrip
                                                    ? `${booking.pickup_location.split(',')[0]} ↔ ${booking.destination.split(',')[0]}`
                                                    : `${booking.pickup_location.split(',')[0]} → ${booking.destination.split(',')[0]}`}
                                            </p>
                                            {booking.special_requests && (
                                                <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-100 text-[11px] text-gray-500 whitespace-pre-wrap leading-snug">
                                                    <span className="font-semibold">{t.specialRequests} </span>{booking.special_requests}
                                                </div>
                                            )}
                                            {quickNote.trim() && (
                                                <div className="mt-2 border-l-2 border-primary px-3 py-1.5 bg-primary/5 rounded-r">
                                                    <p className="text-xs text-gray-700 whitespace-pre-wrap leading-snug">{quickNote.trim()}</p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3.5 text-right align-top">
                                            <span className="text-sm font-bold text-gray-900">{currency} {booking.total_price?.toFixed(2) || '0.00'}</span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-900">
                                        <td className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-white/60">{t.totalPayable}</td>
                                        <td className="px-4 py-3 text-right border-l border-white/10">
                                            <span className="text-base font-bold text-primary">{currency} {booking.total_price?.toFixed(2) || '0.00'}</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Payment Info */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                                <h3 className="text-[10px] font-bold text-primary uppercase tracking-wide mb-1">{t.bookingConfirmation}</h3>
                                <p className="text-xs text-gray-600 leading-snug">
                                    {t.bookingConfirmationText}
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">{t.paymentInstruction}</h3>
                                <p className="text-xs text-gray-700 font-medium leading-snug">
                                    {paymentMethod === 'Cash to Driver' ? t.payCash : t.payOnline}
                                </p>
                            </div>
                        </div>

                        {/* Printed Bank Details Block */}
                        {bankDetails.showOnDocument && (
                            <div className="mb-6 bg-blue-50/40 rounded-lg p-4 border border-blue-100">
                                <h3 className="text-[11px] font-bold text-blue-700 uppercase tracking-wide flex items-center gap-1.5 mb-3 pb-2 border-b border-blue-100">
                                    <Landmark className="w-3.5 h-3.5" /> {t.bankDetails}
                                </h3>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                                    {bankDetails.bankName && (
                                        <div className="flex justify-between border-b border-gray-100 pb-1">
                                            <span className="text-gray-500">{t.bankName}</span>
                                            <span className="font-semibold text-gray-900">{bankDetails.bankName}</span>
                                        </div>
                                    )}
                                    {bankDetails.accountName && (
                                        <div className="flex justify-between border-b border-gray-100 pb-1">
                                            <span className="text-gray-500">{t.accountName}</span>
                                            <span className="font-semibold text-gray-900">{bankDetails.accountName}</span>
                                        </div>
                                    )}
                                    {bankDetails.accountNumber && (
                                        <div className="flex justify-between border-b border-gray-100 pb-1">
                                            <span className="text-gray-500">{t.accountNumber}</span>
                                            <span className="font-semibold font-mono text-gray-900">{bankDetails.accountNumber}</span>
                                        </div>
                                    )}
                                    {bankDetails.swiftCode && (
                                        <div className="flex justify-between border-b border-gray-100 pb-1">
                                            <span className="text-gray-500">{t.swift}</span>
                                            <span className="font-semibold font-mono text-gray-900">{bankDetails.swiftCode}</span>
                                        </div>
                                    )}
                                    {bankDetails.iban && (
                                        <div className="col-span-2 flex justify-between border-b border-gray-100 pb-1">
                                            <span className="text-gray-500">{t.iban}</span>
                                            <span className="font-semibold font-mono text-gray-900 tracking-wide">{bankDetails.iban}</span>
                                        </div>
                                    )}
                                </div>
                                {bankDetails.notes && (
                                    <p className="text-[11px] text-blue-600/80 italic mt-2">{t.note} {bankDetails.notes}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto">
                        <div className="grid grid-cols-2 gap-8 items-end border-t border-gray-200 pt-4">
                            <div>
                                <p className="font-bold text-gray-900 mb-1.5 uppercase tracking-wide text-[10px]">{t.terms}</p>
                                <ul className="list-disc list-inside space-y-0.5 text-[10px] text-gray-500">
                                    <li>{t.term1}</li>
                                    <li>{t.term2}</li>
                                    <li>{t.term3}</li>
                                    <li>{t.term4}</li>
                                </ul>
                            </div>
                            <div className={lang === 'ar' ? 'text-left' : 'text-right'}>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">{t.authorizedSignature}</p>
                                <div className={`flex items-end gap-6 ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                                    <div className="text-center">
                                        <img src="/ismail-signature.png" alt="Ismail" className="h-8 w-auto object-contain mx-auto" />
                                        <p className="text-[10px] font-semibold text-gray-700 border-t border-gray-300 pt-1 mt-1 min-w-[70px]">Ismail</p>
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
                        <div className="mt-4 pt-3 border-t border-gray-100 text-center text-gray-400 text-[10px]">
                            <p>{t.thankYou}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styling */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    html, body {
                        width: 210mm;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        overflow: visible !important;
                    }
                    #invoice-print {
                        width: 210mm !important;
                        min-height: 296mm !important;
                        background: white !important;
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 auto !important;
                        overflow: visible !important;
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
        </div>
    );
}
