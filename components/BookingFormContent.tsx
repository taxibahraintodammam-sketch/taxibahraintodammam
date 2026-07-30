"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MapPin, Phone, User, Clock, Car, Mail, ArrowRight, ArrowLeft, Check, Users, Briefcase, Wallet, ChevronsUpDown, Search, Calendar as CalendarIcon, Info } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import { supabase, vehicles, type BookingData } from '@/lib/supabase';

import { countryCodes } from '@/data/countryCodes';
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { BRAND } from '@/lib/brand-config';

const POPULAR_ROUTES = [
    { id: 'custom', label: 'Custom Location (Enter below)' },
    // Core intercity routes
    { id: 'jeddah-makkah', from: 'Jeddah Airport', to: 'Makkah Hotel', label: 'Jeddah Airport → Makkah' },
    { id: 'makkah-madinah-hotel', from: 'Makkah Hotel', to: 'Madinah Hotel', label: 'Makkah → Madinah Hotel' },
    { id: 'makkah-madinah-badr-ziyarat', from: 'Makkah', to: 'Madinah (via Badr Ziyarat)', label: 'Makkah → Madinah (via Baddar Ziyarat)' },
    { id: 'makkah-ziyarat-tour', from: 'Makkah Hotel', to: 'Makkah Ziyarat Tour', label: 'Makkah Ziyarat Tour' },
    { id: 'madinah-hotel-airport', from: 'Madinah Hotel', to: 'Madinah Airport', label: 'Madinah Hotel → Jeddah Airport' },
    { id: 'madinah-ziyarat-tour', from: 'Madinah Hotel', to: 'Madinah Ziyarat Tour', label: 'Madinah Ziyarat Tour' },
    { id: 'jeddah-train-station-transfer', from: 'Jeddah City', to: 'Jeddah Train Station (Haramain)', label: 'City → Jeddah Train Station' },
    { id: 'madinah-train-station-transfer', from: 'Madinah City', to: 'Madinah Train Station (Haramain)', label: 'City → Madinah Train Station' },
    // Riyadh Routes
    { id: 'ruh-olaya', from: 'King Khalid Airport (RUH)', to: 'Olaya District', label: 'RUH Airport → Olaya' },
    { id: 'ruh-kafd', from: 'King Khalid Airport (RUH)', to: 'KAFD Financial District', label: 'RUH Airport → KAFD' },
    { id: 'ruh-dq', from: 'King Khalid Airport (RUH)', to: 'Diplomatic Quarter', label: 'RUH Airport → DQ' },
    { id: 'ruh-diriyah', from: 'King Khalid Airport (RUH)', to: 'Diriyah / Bujairi Terrace', label: 'RUH Airport → Diriyah' },
    // Border Crossings / GCC
    { id: 'khobar-bahrain', from: 'Al Khobar / Dammam', to: 'Manama, Bahrain (via Causeway)', label: 'Khobar → Bahrain Border' },
    { id: 'ruh-uae-border', from: 'Riyadh', to: 'Al Batha (UAE Border)', label: 'Riyadh → UAE Border' },
    { id: 'jeddah-jordan-border', from: 'Jeddah', to: 'Halat Ammar (Jordan Border)', label: 'Jeddah → Jordan Border' },
];

interface BookingFormProps {
    prefilledData?: Partial<BookingData>;
    className?: string; // Allow custom styling wrapper
}

export default function BookingFormContent({ prefilledData, className }: BookingFormProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [countryCode, setCountryCode] = useState('+966');
    const router = useRouter();

    const [promoInput, setPromoInput] = useState('');
    const [promoApplied, setPromoApplied] = useState<{ code: string; discount_type: string; discount_value: number } | null>(null);
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoError, setPromoError] = useState('');
    const [open, setOpen] = useState(false);
    const [preferredTimeNote, setPreferredTimeNote] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');

    const [formData, setFormData] = useState<BookingData>({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        pickup_location: '',
        destination: '',
        pickup_date: '',
        pickup_time: '',
        vehicle_type: '',
        vehicle_image: '',
        passengers: 1,
        luggage: 0,
        special_requests: '',
        status: 'pending',
        has_return_trip: false,
        child_seats: 0,
        flight_number: ''
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        let updates: Partial<BookingData> = {};

        if (prefilledData) {
            updates = { ...updates, ...prefilledData };
        }

        if (searchParams) {
            const from = searchParams.get('from');
            const to = searchParams.get('to');
            const date = searchParams.get('date');
            const time = searchParams.get('time');
            const vehicle = searchParams.get('vehicle');
            const phone = searchParams.get('phone');

            if (from) updates.pickup_location = from;
            if (to) updates.destination = to;
            if (date) updates.pickup_date = date;
            if (time) updates.pickup_time = time;
            if (phone) updates.customer_phone = phone;

            if (vehicle) {
                const vName = vehicle.replace(/-/g, ' ');
                const vObj = vehicles.find(v => v.name === vName);
                if (vObj) {
                    updates.vehicle_type = vObj.name;
                    updates.vehicle_image = vObj.image;
                    updates.passengers = vObj.passengers;
                    updates.luggage = vObj.luggage;
                }
            }
        }

        if (Object.keys(updates).length > 0) {
            setFormData(prev => {
                const newData = { ...prev, ...updates };
                if (newData.pickup_location && newData.destination && newData.pickup_date && newData.pickup_time) {
                    setStep(2);
                }
                return newData;
            });
        }
    }, [searchParams, prefilledData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['passengers', 'luggage'].includes(name) ? Number(value) || 0 : value
        }));
    };

    const selectVehicle = (vehicle: typeof vehicles[0]) => {
        setFormData(prev => ({
            ...prev,
            vehicle_type: vehicle.name,
            vehicle_image: vehicle.image,
            // Keep whatever passenger/luggage count the customer already set, only
            // clamping down if it exceeds the newly selected vehicle's capacity —
            // don't silently overwrite it to the vehicle's max seats/bags.
            passengers: Math.min(prev.passengers || 1, vehicle.passengers) || 1,
            luggage: Math.min(prev.luggage || 0, vehicle.luggage)
        }));
    };

    const validatePromo = async () => {
        if (!promoInput.trim()) return;
        setPromoLoading(true);
        setPromoError('');
        try {
            const res = await fetch('/api/validate-promo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: promoInput }),
            });
            const data = await res.json();
            if (data.valid) {
                setPromoApplied({ code: data.code, discount_type: data.discount_type, discount_value: data.discount_value });
            } else {
                setPromoError(data.error || 'Invalid promo code');
            }
        } catch {
            setPromoError('Failed to validate code');
        } finally {
            setPromoLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fullPhoneNumber = `${countryCode}${formData.customer_phone}`;
            const { has_return_trip, child_seats, ...insertData } = formData;
            const finalFormData = {
                ...insertData,
                customer_phone: fullPhoneNumber,
                special_requests: `${formData.has_return_trip ? `[RETURN TRIP REQUESTED${returnDate ? ` - Return Date: ${returnDate}` : ''}${returnTime ? ` at ${returnTime}` : ''}] ` : ''}${formData.child_seats ? `[CHILD SEATS: ${formData.child_seats}] ` : ''}${preferredTimeNote.trim() ? `[PREFERRED TIME: ${preferredTimeNote.trim()}] ` : ''}${promoApplied ? `[PROMO: ${promoApplied.code} - ${promoApplied.discount_value}${promoApplied.discount_type === 'percentage' ? '%' : ' SAR'} off] ` : ''}${(formData.special_requests ? formData.special_requests + '. ' : '') + 'Please Provide Quote'}`
            };

            const { data, error } = await supabase.from('bookings').insert([finalFormData]).select();
            if (error) throw error;

            fetch('/api/send-booking-emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ booking: data[0], price: 'Need Quote' })
            }).then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    console.error('Email API error:', res.status, errorData);
                }
            }).catch((err) => console.error('Email fetch failed:', err));

            setSuccess(true);
            setStep(4);

            const bookingId = data[0]?.id || '';
            const confirmParams = new URLSearchParams({
                ref: bookingId,
                name: formData.customer_name,
                email: formData.customer_email,
                from: formData.pickup_location,
                to: formData.destination,
                date: formData.pickup_date,
                time: formData.pickup_time,
                vehicle: formData.vehicle_type,
            });

            // Redirect to confirmation page after brief delay
            setTimeout(() => {
                router.push(`/booking/confirmation?${confirmParams.toString()}`);
            }, 800);

        } catch (error) {
            console.error(error);
            alert('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isStep1Valid = !!(formData.pickup_location && formData.destination && formData.pickup_date && formData.pickup_time);
    const isStep2Valid = !!(formData.vehicle_type);
    const isStep3Valid = !!(formData.customer_name && formData.customer_email && formData.customer_phone);

    const nextStep = () => {
        if (step === 1 && !isStep1Valid) return alert('Please fill in all trip details.');
        if (step === 2 && !isStep2Valid) return alert('Please select a vehicle.');
        if (step === 3 && !isStep3Valid) return alert('Please fill in your contact details.');
        if (step === 3) return;
        setStep(val => val + 1);
    };

    const prevStep = () => setStep(val => val - 1);

    return (
        <div className={`bg-white border border-gray-200 p-4 sm:p-8 rounded-3xl shadow-xl w-full mx-auto relative overflow-hidden ${className}`}>
            <div className="mb-8">
                <div className="flex justify-between items-center relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    ></div>

                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex flex-col items-center gap-2 bg-white px-2 cursor-pointer transition-colors ${step >= s ? 'text-primary' : 'text-gray-400'}`} onClick={() => s < step && setStep(s)}>
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step > s ? 'bg-primary text-black border-primary' :
                                step === s ? 'bg-white text-primary border-primary ring-4 ring-primary/10' :
                                    'bg-white text-gray-300 border-gray-200'
                                }`}>
                                {step > s ? <Check className="w-5 h-5" /> : s}
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:block">
                                {s === 1 && "Trip"}
                                {s === 2 && "Vehicle"}
                                {s === 3 && "Details"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                    <div className="space-y-5 animate-fade-in-up">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Plan Your Journey</h2>
                            <p className="text-[10px] text-rose-600 font-extrabold uppercase tracking-[0.2em] mt-2">
                                Private Transfers Only • No Shared Taxis
                            </p>
                        </div>

                        <div className="bg-gray-50/50 p-3 rounded-xl border border-dashed border-gray-200">
                            <label className="text-xs font-semibold text-gray-500 ml-2 mb-1 block">Quick Select Route</label>
                            <Select onValueChange={(val) => {
                                if (val === 'custom') setFormData(prev => ({ ...prev, pickup_location: '', destination: '' }));
                                else {
                                    const r = POPULAR_ROUTES.find(pr => pr.id === val);
                                    if (r) setFormData(prev => ({ ...prev, pickup_location: r.from || '', destination: r.to || '' }));
                                }
                            }}>
                                <SelectTrigger className="bg-white border-gray-200"><SelectValue placeholder="Select a popular route..." /></SelectTrigger>
                                <SelectContent className="z-[200]">{POPULAR_ROUTES.map((r) => <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 ml-1">From</label>
                                <div className="relative group/input">
                                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within/input:text-primary transition-colors z-10" />
                                    <LocationAutocomplete
                                        name="pickup_location"
                                        placeholder="Jeddah Airport, Hotel..."
                                        required
                                        value={formData.pickup_location}
                                        onChange={(val) => setFormData(prev => ({ ...prev, pickup_location: val }))}
                                        className="w-full pl-10 pr-9 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-700 ml-1">To</label>
                                <div className="relative group/input">
                                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within/input:text-primary transition-colors z-10" />
                                    <LocationAutocomplete
                                        name="destination"
                                        placeholder="Makkah Hotel, Kaaba..."
                                        required
                                        value={formData.destination}
                                        onChange={(val) => setFormData(prev => ({ ...prev, destination: val }))}
                                        className="w-full pl-10 pr-9 h-12 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative group/input flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Pickup Date</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full h-12 justify-start text-left font-normal bg-gray-50 border-gray-300 rounded-xl hover:bg-gray-100",
                                                !formData.pickup_date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                                            {formData.pickup_date ? (
                                                format(new Date(formData.pickup_date), "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 z-[200]" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={formData.pickup_date ? new Date(formData.pickup_date) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        pickup_date: format(date, "yyyy-MM-dd")
                                                    }));
                                                }
                                            }}
                                            disabled={(date) =>
                                                date < new Date(new Date().setHours(0, 0, 0, 0))
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="relative group/input flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Pickup Time</label>
                                <div className="relative flex items-center h-12 bg-gray-50 border border-gray-300 rounded-xl px-3">
                                    <Clock className="mr-2 h-4 w-4 text-gray-500 shrink-0" />
                                    <input
                                        type="time"
                                        step={60}
                                        value={formData.pickup_time}
                                        onChange={(e) =>
                                            setFormData(prev => ({ ...prev, pickup_time: e.target.value }))
                                        }
                                        className="w-full bg-transparent outline-none text-sm text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preferred Time Note */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Flexible on time? Leave a note (optional)</label>
                            <Input
                                value={preferredTimeNote}
                                onChange={(e) => setPreferredTimeNote(e.target.value)}
                                placeholder="e.g. Anytime between 1:00 - 1:30 PM"
                                className="h-11 bg-gray-50 border-gray-300 rounded-xl text-sm"
                            />
                        </div>

                        {/* Flight Number */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Flight Number (optional)</label>
                            <Input
                                name="flight_number"
                                value={formData.flight_number}
                                onChange={handleChange}
                                placeholder="e.g. SV123 or EK803"
                                className="h-11 bg-gray-50 border-gray-300 rounded-xl text-sm"
                            />
                        </div>

                        {/* Return Trip Toggle */}
                        <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 cursor-pointer transition-all hover:bg-blue-50" onClick={() => setFormData(prev => ({ ...prev, has_return_trip: !prev.has_return_trip }))}>
                            <div className={`w-10 h-6 rounded-full relative transition-colors ${formData.has_return_trip ? 'bg-primary' : 'bg-gray-200'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.has_return_trip ? 'left-5' : 'left-1'}`}></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">Add Return Trip?</span>
                                <span className="text-[10px] text-gray-500 font-medium">Book both ways for a chauffeured experience.</span>
                            </div>
                        </div>

                        {formData.has_return_trip && (
                            <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50/30 rounded-2xl border border-dashed border-blue-200 animate-fade-in-up">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Return Date</label>
                                    <Input
                                        type="date"
                                        value={returnDate}
                                        min={formData.pickup_date || undefined}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                        className="h-11 bg-white border-gray-300 rounded-xl text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">Return Time</label>
                                    <Input
                                        type="time"
                                        value={returnTime}
                                        onChange={(e) => setReturnTime(e.target.value)}
                                        className="h-11 bg-white border-gray-300 rounded-xl text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Special Requests */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Special Requests / Notes (optional)</label>
                            <textarea
                                name="special_requests"
                                value={formData.special_requests}
                                onChange={handleChange}
                                placeholder="e.g. Meeting a colleague too, extra bags, gate number..."
                                rows={2}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm outline-none focus:border-primary resize-none"
                            />
                        </div>

                        <Button type="button" onClick={nextStep} className="w-full bg-gray-950 hover:bg-black text-white font-black py-5 text-xl rounded-2xl mt-4 shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95">
                            Get Quote <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Select Your Vehicle</h2>
                            <p className="text-gray-500 text-sm mt-1">{formData.pickup_location} <ArrowRight className="w-3 h-3 inline mx-1" /> {formData.destination}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                            {vehicles.map((v) => (
                                <div
                                    key={v.name}
                                    onClick={() => selectVehicle(v)}
                                    className={`relative group cursor-pointer border-2 rounded-2xl p-3 transition-all hover:shadow-md ${formData.vehicle_type === v.name ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 bg-white hover:border-primary/50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Car Image */}
                                        <div className="w-28 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                                            <img
                                                src={(v as any).image}
                                                alt={v.name}
                                                className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-base text-gray-900 leading-tight">{v.name}</h3>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                <span className="flex items-center gap-1 font-bold"><Users className="w-3 h-3 text-primary" /> {v.passengers} Pax</span>
                                                <span className="flex items-center gap-1 font-bold"><Briefcase className="w-3 h-3 text-primary" /> {v.luggage} Bags</span>
                                            </div>
                                            {(v as any).description && (
                                                <p className="text-[10px] text-gray-400 mt-1 font-medium italic line-clamp-1 group-hover:line-clamp-none transition-all">
                                                    {(v as any).description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Badge + Checkmark */}
                                        <div className="flex flex-col items-end gap-1 flex-shrink-0 pr-1">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.vehicle_type === v.name ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
                                                {formData.vehicle_type === v.name && <Check className="w-3 h-3" />}
                                            </div>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Quote</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Number of Passengers */}
                        {formData.vehicle_type && (() => {
                            const selectedVehicle = vehicles.find(v => v.name === formData.vehicle_type);
                            const maxPax = selectedVehicle?.passengers || 1;
                            return (
                                <div className="bg-primary/5 p-5 rounded-3xl border border-dashed border-primary/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-xl shadow-sm">
                                                <Users className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900 leading-none">Number of Passengers</h4>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mt-1">
                                                    How many people are traveling? (Max {maxPax} for this vehicle)
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white rounded-lg p-1 border shadow-sm h-10">
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); formData.passengers > 1 && setFormData(prev => ({ ...prev, passengers: prev.passengers - 1 })); }}
                                                className="w-8 h-8 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all active:scale-95"
                                            >
                                                <span className="text-base font-black text-gray-900">-</span>
                                            </button>
                                            <span className="font-black text-primary min-w-[20px] text-center">{formData.passengers}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); formData.passengers < maxPax && setFormData(prev => ({ ...prev, passengers: prev.passengers + 1 })); }}
                                                className="w-8 h-8 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all active:scale-95"
                                            >
                                                <span className="text-base font-black text-gray-900">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Number of Luggage/Bags */}
                        {formData.vehicle_type && (() => {
                            const selectedVehicle = vehicles.find(v => v.name === formData.vehicle_type);
                            const maxLuggage = selectedVehicle?.luggage || 0;
                            return (
                                <div className="bg-primary/5 p-5 rounded-3xl border border-dashed border-primary/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-xl shadow-sm">
                                                <Briefcase className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900 leading-none">Number of Luggage</h4>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mt-1">
                                                    How many bags/suitcases? (Max {maxLuggage} for this vehicle)
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white rounded-lg p-1 border shadow-sm h-10">
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); formData.luggage > 0 && setFormData(prev => ({ ...prev, luggage: prev.luggage - 1 })); }}
                                                className="w-8 h-8 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all active:scale-95"
                                            >
                                                <span className="text-base font-black text-gray-900">-</span>
                                            </button>
                                            <span className="font-black text-primary min-w-[20px] text-center">{formData.luggage}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); formData.luggage < maxLuggage && setFormData(prev => ({ ...prev, luggage: prev.luggage + 1 })); }}
                                                className="w-8 h-8 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all active:scale-95"
                                            >
                                                <span className="text-base font-black text-gray-900">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Extras: Child Seats */}
                        <div className="bg-amber-50/50 p-5 rounded-3xl border border-dashed border-amber-200">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-xl shadow-sm">
                                        <Users className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 leading-none">Need Child Seats?</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mt-1">Recommended for pilgrims with kids</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white rounded-lg p-1 border shadow-sm h-10">
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); formData.child_seats! > 0 && setFormData(prev => ({ ...prev, child_seats: prev.child_seats! - 1 })); }}
                                        className="w-8 h-8 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all active:scale-95"
                                    >
                                        <span className="text-base font-black text-gray-900">-</span>
                                    </button>
                                    <span className="font-black text-amber-600 min-w-[20px] text-center">{formData.child_seats}</span>
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); formData.child_seats! < 2 && setFormData(prev => ({ ...prev, child_seats: prev.child_seats! + 1 })); }}
                                        className="w-8 h-8 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all active:scale-95"
                                    >
                                        <span className="text-base font-black text-gray-900">+</span>
                                    </button>
                                </div>
                             </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button type="button" onClick={prevStep} variant="ghost" className="flex-1 py-4 text-base rounded-xl text-gray-500">Back</Button>
                             <Button type="button" onClick={nextStep} disabled={!formData.vehicle_type} className="flex-[2] bg-gray-950 hover:bg-black text-white font-black py-5 text-xl rounded-2xl shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                Continue to Details <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-5 animate-fade-in-up">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                            <p className="text-gray-500 text-sm">Where should we send the booking confirmation?</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm space-y-2">
                            <div className="flex justify-between font-medium">
                                <span className="text-gray-500">Vehicle:</span>
                                <span className="text-gray-900">{formData.vehicle_type}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-gray-500">Date:</span>
                                <span className="text-gray-900">{formData.pickup_date} at {formData.pickup_time}</span>
                            </div>
                            <div className="flex justify-between font-bold text-primary pt-2 border-t border-gray-200 mt-2">
                                <span>Total Estimate:</span>
                                <span>Custom Quote</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group/input">
                                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                                <Input name="customer_name" placeholder="Full Name *" required value={formData.customer_name} className="pl-10 h-12 bg-gray-50 border-gray-300 rounded-xl" onChange={handleChange} />
                            </div>
                            <div className="relative group/input">
                                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within/input:text-primary transition-colors" />
                                <Input name="customer_email" type="email" placeholder="Email Address *" required value={formData.customer_email} className="pl-10 h-12 bg-gray-50 border-gray-300 rounded-xl" onChange={handleChange} />
                            </div>
                            <div className="relative group/input">
                                <div className="flex gap-2">
                                    <Popover open={open} onOpenChange={setOpen} modal={false}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[110px] h-12 justify-between bg-gray-50 border-gray-300"><span className="truncate">{countryCode}</span><ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /></Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[250px] p-0 max-h-[300px] z-[200]">
                                            <Command>
                                                <CommandInput placeholder="Search country..." />
                                                <CommandList>
                                                    <CommandEmpty>No country found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {countryCodes.map((c) => (
                                                            <CommandItem key={c.country} onSelect={() => { setCountryCode(c.code); setOpen(false); }}>
                                                                <Check className={cn("mr-2 h-4 w-4", countryCode === c.code ? "opacity-100" : "opacity-0")} />
                                                                <span className="mr-2">{c.flag}</span>
                                                                {c.country} ({c.code})
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <Input name="customer_phone" type="tel" placeholder="Mobile Number *" required value={formData.customer_phone} className="flex-1 h-12 bg-gray-50 border-gray-300 rounded-xl" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="border border-dashed border-gray-300 rounded-xl p-3">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Have a promo code?</p>
                            {promoApplied ? (
                                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                    <div>
                                        <span className="font-black text-green-700 text-sm">{promoApplied.code}</span>
                                        <span className="text-green-600 text-xs ml-2">— {promoApplied.discount_value}{promoApplied.discount_type === 'percentage' ? '%' : ' SAR'} discount applied</span>
                                    </div>
                                    <button onClick={() => { setPromoApplied(null); setPromoInput(''); setPromoError(''); }} className="text-green-600 hover:text-green-800 text-lg leading-none font-bold">×</button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Input
                                        value={promoInput}
                                        onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError(''); }}
                                        placeholder="Enter code"
                                        className="h-9 text-sm font-mono flex-1"
                                        onKeyDown={e => e.key === 'Enter' && validatePromo()}
                                    />
                                    <button
                                        type="button"
                                        onClick={validatePromo}
                                        disabled={promoLoading || !promoInput.trim()}
                                        className="px-3 h-9 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black disabled:opacity-40 transition-colors shrink-0"
                                    >
                                        {promoLoading ? '...' : 'Apply'}
                                    </button>
                                </div>
                            )}
                            {promoError && <p className="text-red-500 text-xs mt-1.5">{promoError}</p>}
                        </div>

                        <div className="flex gap-3 mt-4">
                            <Button type="button" onClick={prevStep} variant="outline" className="flex-1 py-4 text-lg rounded-xl">Back</Button>
                             <Button type="submit" className="flex-1 bg-gray-950 hover:bg-black text-white font-black py-5 text-xl rounded-2xl shadow-lg flex items-center justify-center gap-3" disabled={loading}>
                                {loading ? 'Processing...' : <>Submit Request</>}
                            </Button>
                        </div>
                        
                        <div className="relative flex py-2 items-center mt-4">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-bold tracking-wider">Or</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <Button
                                type="button"
                                onClick={() => window.location.href = 'mailto:taxiserviceksa9988@gmail.com'}
                                className="w-full h-14 bg-gray-950 hover:bg-black text-white font-bold text-sm lg:text-lg rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                Email
                            </Button>
                            <Button
                                type="button"
                                onClick={() => window.open('https://wa.me/966569487569?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20transfer.', '_blank')}
                                className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm lg:text-lg rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                                WhatsApp
                            </Button>
                        </div>
                    </div>
                )}

                {step === 4 && success && (
                    <div className="text-center space-y-6 animate-fade-in-up py-8">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto"><Check className="w-10 h-10 text-black" /></div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-gray-900">Request Received!</h3>
                            <p className="text-gray-500 font-medium">Your quotation request has been sent for review.</p>
                        </div>
                        <p className="text-gray-600 px-4">We've sent a summary to <strong>{formData.customer_email}</strong>. Our team will contact you with the official quote shortly.</p>
                        
                        <div className="flex flex-col gap-3 max-w-sm mx-auto">
                            <Button 
                                type="button" 
                                onClick={() => {
                                    const fullPhoneNumber = `${countryCode}${formData.customer_phone}`;
                                    const whatsappMsg = `*New Booking Request - ${BRAND.name}*
*Name:* ${formData.customer_name}
*Email:* ${formData.customer_email}
*Phone:* ${fullPhoneNumber}
*Pickup:* ${formData.pickup_location}
*Destination:* ${formData.destination}
*Date:* ${formData.pickup_date}
*Time:* ${formData.pickup_time}
*Vehicle:* ${formData.vehicle_type}
*Passengers:* ${formData.passengers}
*Luggage:* ${formData.luggage} bags
*Child Seats:* ${formData.child_seats || 0}${formData.flight_number ? `\n*Flight Number:* ${formData.flight_number}` : ''}
*Return Trip:* ${formData.has_return_trip ? 'Yes' : 'No'}${formData.has_return_trip && returnDate ? `\n*Return Date:* ${returnDate}${returnTime ? ` at ${returnTime}` : ''}` : ''}
*Special Requests:* ${formData.special_requests || 'None'}
---
Please provide a quote for this journey.`;
                                    const encodedMsg = encodeURIComponent(whatsappMsg);
                                    window.open(`https://wa.me/${BRAND.contact.whatsapp.replace('+', '')}?text=${encodedMsg}`, '_blank');
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
                                Send on WhatsApp Again
                            </Button>

                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => {
                                    setStep(1);
                                    setSuccess(false);
                                    setPreferredTimeNote('');
                                    setReturnDate('');
                                    setReturnTime('');
                                    setFormData(prev => ({
                                        ...prev,
                                        customer_name: '',
                                        customer_email: '',
                                        customer_phone: '',
                                        pickup_location: '',
                                        destination: '',
                                        status: 'pending',
                                        has_return_trip: false,
                                        child_seats: 0,
                                        flight_number: ''
                                    }));
                                }}
                                className="border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-xl transition-colors"
                            >
                                New Quotation Request
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
