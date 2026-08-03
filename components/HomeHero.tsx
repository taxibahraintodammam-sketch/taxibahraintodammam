"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
    Car, Clock, Palmtree, MapPin, Circle, CalendarDays, Plus, X,
    Users, Briefcase, ChevronDown, Search, Shield, Sparkles,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import BookingFlowSteps from '@/components/BookingFlowSteps';
import WhatsAppIcon from '@/components/WhatsAppIcon';

type TabKey = 'transfers' | 'hourly' | 'daytrips';

const TABS: { key: TabKey; label: string; icon: typeof Car }[] = [
    { key: 'transfers', label: 'Transfers', icon: Car },
    { key: 'hourly', label: 'Hourly driver', icon: Clock },
    { key: 'daytrips', label: 'Day trips', icon: Palmtree },
];

const DURATIONS = ['4 Hours', '6 Hours', '8 Hours', '10 Hours', '12 Hours', 'Full Day (24h)'];

const DAY_TRIPS = [
    { label: 'Taif — City of Roses', value: 'Day Trip: Taif' },
    { label: 'AlUla Heritage Tour', value: 'Day Trip: AlUla' },
    { label: 'Madinah Ziyarat Tour', value: 'Day Trip: Madinah Ziyarat' },
    { label: 'Jeddah City & Corniche Tour', value: 'Day Trip: Jeddah City Tour' },
    { label: 'Khaybar Fort Tour', value: 'Day Trip: Khaybar' },
];

function generateTimeSlots() {
    return Array.from({ length: 48 }).map((_, i) => {
        const hour = Math.floor(i / 2);
        const minute = i % 2 === 0 ? '00' : '30';
        const value = `${hour.toString().padStart(2, '0')}:${minute}`;
        const d = new Date();
        d.setHours(hour);
        d.setMinutes(parseInt(minute));
        return { value, label: format(d, 'h:mm a') };
    });
}
const TIME_SLOTS = generateTimeSlots();

export default function HomeHero() {
    const flow = useBookingFlow();
    const {
        step, pickup, setPickup, dropoff, setDropoff, date, setDate, time, setTime,
        isRoundTrip, setIsRoundTrip, returnDate, setReturnDate, viaCity, setViaCity,
        setTripType, passengers, setPassengers,
    } = flow;

    const [activeTab, setActiveTab] = useState<TabKey>('transfers');
    const [showReturn, setShowReturn] = useState(false);
    const [showMultiCity, setShowMultiCity] = useState(false);
    const [luggage, setLuggage] = useState(2);
    const [departureOpen, setDepartureOpen] = useState(false);
    const [returnOpen, setReturnOpen] = useState(false);

    // Match the reference layout's default traveler count
    useEffect(() => { setPassengers(2); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setDropoff('');
        setShowReturn(false);
        setIsRoundTrip(activeTab === 'daytrips');
        if (activeTab === 'transfers') setTripType('');
        else if (activeTab === 'hourly') setTripType('Hourly Driver');
        else setTripType('Day Trip');
    }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pickup || !dropoff || !date || !time) {
            alert('Please fill in pickup, destination, and departure date & time.');
            return;
        }
        flow.setStep(2);
    };

    const departureLabel = date
        ? `${format(new Date(date), 'MMM d')}${time ? `, ${format(new Date(`2000-01-01T${time}`), 'h:mm a')}` : ''}`
        : 'Departure';

    return (
        <section className="relative bg-[#0a1442] text-white overflow-hidden" aria-label="Hero section">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a52] via-[#0a1442] to-[#050a26]" aria-hidden="true" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 sm:pt-20 sm:pb-16">
                <div className="max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
                        Private car transfers with English-speaking drivers in Saudi Arabia.
                    </h1>
                    <p className="text-base sm:text-lg text-gray-300 font-medium">
                        Travel city-to-city, by the hour, or take day trips.
                    </p>
                </div>

                {step === 1 ? (
                    <>
                        {/* Tabs */}
                        <div className="flex items-center gap-6 sm:gap-8 mt-8 mb-5 border-b border-white/10">
                            {TABS.map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setActiveTab(key)}
                                    className={cn(
                                        'flex items-center gap-2 pb-3 text-sm sm:text-base font-semibold border-b-2 -mb-px whitespace-nowrap transition-colors',
                                        activeTab === key
                                            ? 'text-primary border-primary'
                                            : 'text-gray-400 border-transparent hover:text-gray-200'
                                    )}
                                >
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Search Pill */}
                        <form onSubmit={handleSearch}>
                            <div className="flex flex-col md:flex-row items-stretch md:h-[72px] bg-white rounded-[28px] md:rounded-full shadow-2xl divide-y md:divide-y-0 md:divide-x divide-gray-200 overflow-hidden text-gray-900">
                                {/* From */}
                                <div className="flex items-center gap-2 px-5 py-4 md:py-0 flex-1 min-w-0">
                                    <Circle className="w-4 h-4 text-gray-400 shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="From city, hotel, airport"
                                        value={pickup}
                                        onChange={(e) => setPickup(e.target.value)}
                                        className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-gray-400 placeholder:font-medium"
                                    />
                                </div>

                                {/* Via (multi-city, transfers only) */}
                                {showMultiCity && activeTab === 'transfers' && (
                                    <div className="flex items-center gap-2 px-5 py-4 md:py-0 flex-1 min-w-0">
                                        <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Via city (optional)"
                                            value={viaCity}
                                            onChange={(e) => setViaCity(e.target.value)}
                                            className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-gray-400 placeholder:font-medium"
                                        />
                                    </div>
                                )}

                                {/* To / Duration / Day trip */}
                                {activeTab === 'transfers' && (
                                    <div className="flex items-center gap-2 px-5 py-4 md:py-0 flex-1 min-w-0">
                                        <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="To city, hotel, airport"
                                            value={dropoff}
                                            onChange={(e) => setDropoff(e.target.value)}
                                            className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-gray-400 placeholder:font-medium"
                                        />
                                    </div>
                                )}
                                {activeTab === 'hourly' && (
                                    <div className="flex items-center gap-2 px-5 py-4 md:py-0 flex-1 min-w-0">
                                        <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                                        <Select value={dropoff} onValueChange={setDropoff}>
                                            <SelectTrigger className="w-full h-auto border-none shadow-none p-0 focus:ring-0 text-sm font-semibold [&>span]:font-semibold">
                                                <SelectValue placeholder="Choose duration" />
                                            </SelectTrigger>
                                            <SelectContent className="z-[200]">
                                                {DURATIONS.map((d) => (
                                                    <SelectItem key={d} value={`Hourly Charter - ${d}`}>{d}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                {activeTab === 'daytrips' && (
                                    <div className="flex items-center gap-2 px-5 py-4 md:py-0 flex-1 min-w-0">
                                        <Palmtree className="w-5 h-5 text-gray-400 shrink-0" />
                                        <Select value={dropoff} onValueChange={setDropoff}>
                                            <SelectTrigger className="w-full h-auto border-none shadow-none p-0 focus:ring-0 text-sm font-semibold [&>span]:font-semibold">
                                                <SelectValue placeholder="Choose a day trip" />
                                            </SelectTrigger>
                                            <SelectContent className="z-[200]">
                                                {DAY_TRIPS.map((t) => (
                                                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Departure */}
                                <Popover open={departureOpen} onOpenChange={setDepartureOpen}>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 px-5 py-4 md:py-0 shrink-0 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <CalendarDays className="w-5 h-5 text-gray-400 shrink-0" />
                                            <span className={cn('text-sm font-semibold whitespace-nowrap', !date && 'text-gray-400 font-medium')}>
                                                {departureLabel}
                                            </span>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 z-[200]" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={date ? new Date(date) : undefined}
                                            onSelect={(d) => d && setDate(format(d, 'yyyy-MM-dd'))}
                                            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                        <div className="p-3 border-t border-gray-100">
                                            <Select value={time} onValueChange={(v) => { setTime(v); setDepartureOpen(false); }}>
                                                <SelectTrigger className="w-full h-10 rounded-lg text-sm">
                                                    <SelectValue placeholder="Pickup time" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[240px] z-[210]">
                                                    {TIME_SLOTS.map((t) => (
                                                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                {/* Add return (transfers only) */}
                                {activeTab === 'transfers' && (
                                    showReturn ? (
                                        <div className="flex items-center shrink-0">
                                            <Popover open={returnOpen} onOpenChange={setReturnOpen}>
                                                <PopoverTrigger asChild>
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-2 pl-5 pr-2 py-4 md:py-0 text-left hover:bg-gray-50 transition-colors"
                                                    >
                                                        <CalendarDays className="w-5 h-5 text-gray-400 shrink-0" />
                                                        <span className={cn('text-sm font-semibold whitespace-nowrap', !returnDate && 'text-gray-400 font-medium')}>
                                                            {returnDate ? format(new Date(returnDate), 'MMM d') : 'Return date'}
                                                        </span>
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 z-[200]" align="start">
                                                    <CalendarComponent
                                                        mode="single"
                                                        selected={returnDate ? new Date(returnDate) : undefined}
                                                        onSelect={(d) => { if (d) { setReturnDate(format(d, 'yyyy-MM-dd')); setReturnOpen(false); } }}
                                                        disabled={(d) => d < (date ? new Date(date) : new Date(new Date().setHours(0, 0, 0, 0)))}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <button
                                                type="button"
                                                onClick={() => { setShowReturn(false); setIsRoundTrip(false); setReturnDate(''); }}
                                                className="pr-4 text-gray-300 hover:text-gray-500 transition-colors"
                                                aria-label="Remove return date"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => { setShowReturn(true); setIsRoundTrip(true); }}
                                            className="flex items-center gap-1.5 px-5 py-4 md:py-0 shrink-0 text-gray-400 hover:text-gray-600 font-semibold text-sm transition-colors"
                                        >
                                            <Plus className="w-4 h-4" /> Add return
                                        </button>
                                    )
                                )}

                                {/* Passengers & Luggage */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            className="flex items-center gap-3 px-5 py-4 md:py-0 shrink-0 text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="flex items-center gap-1 text-sm font-semibold"><Users className="w-4 h-4 text-gray-400" /> {passengers}</span>
                                            <span className="flex items-center gap-1 text-sm font-semibold"><Briefcase className="w-4 h-4 text-gray-400" /> {luggage}</span>
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64 p-4 space-y-4 z-[200]" align="end">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-gray-900 text-sm">Passengers</span>
                                            <div className="flex items-center gap-3">
                                                <button type="button" onClick={() => setPassengers((p) => Math.max(1, p - 1))} className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center font-bold text-gray-700">−</button>
                                                <span className="w-4 text-center font-bold text-gray-900">{passengers}</span>
                                                <button type="button" onClick={() => setPassengers((p) => Math.min(20, p + 1))} className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center font-bold text-gray-700">+</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-gray-900 text-sm">Luggage</span>
                                            <div className="flex items-center gap-3">
                                                <button type="button" onClick={() => setLuggage((l) => Math.max(0, l - 1))} className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center font-bold text-gray-700">−</button>
                                                <span className="w-4 text-center font-bold text-gray-900">{luggage}</span>
                                                <button type="button" onClick={() => setLuggage((l) => Math.min(20, l + 1))} className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center font-bold text-gray-700">+</button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                {/* Search */}
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold text-sm sm:text-base px-8 py-4 md:py-0 transition-colors shrink-0"
                                >
                                    <Search className="w-4 h-4" />
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* Multi-city + trust row */}
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            {activeTab === 'transfers' && (
                                <button
                                    type="button"
                                    onClick={() => { setShowMultiCity((v) => !v); if (showMultiCity) setViaCity(''); }}
                                    className={cn(
                                        'text-sm font-semibold px-4 py-2 rounded-full border transition-colors',
                                        showMultiCity
                                            ? 'bg-primary/20 border-primary text-white'
                                            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                                    )}
                                >
                                    {showMultiCity ? 'Remove stop' : 'Multi-city'}
                                </button>
                            )}
                            <div className="flex items-center gap-2 text-gray-400">
                                <Shield className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[11px] font-bold uppercase tracking-wider">Licensed Drivers</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[11px] font-bold uppercase tracking-wider">25k+ Happy Travelers</span>
                            </div>
                            <a
                                href="https://wa.me/97335014335?text=Hello%2C%20I%20want%20to%20get%20a%20taxi%20quote."
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors ml-auto"
                            >
                                <WhatsAppIcon className="w-4 h-4 fill-current" />
                                Instant quote on WhatsApp
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="mt-8 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl text-gray-900">
                        <BookingFlowSteps {...flow} />
                    </div>
                )}
            </div>
        </section>
    );
}
