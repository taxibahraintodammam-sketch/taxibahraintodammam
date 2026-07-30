"use client";

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MapPin, Calendar, Clock, ArrowLeftRight, Check } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useBookingFlow } from '@/hooks/useBookingFlow';
import BookingFlowSteps from '@/components/BookingFlowSteps';
import LocationAutocomplete from '@/components/LocationAutocomplete';

interface HeroBookingWidgetProps {
    title?: string;
}

export default function HeroBookingWidget({ title }: HeroBookingWidgetProps) {
    const flow = useBookingFlow();
    const {
        step, pickup, setPickup, dropoff, setDropoff, date, setDate, time, setTime,
        isRoundTrip, setIsRoundTrip, preferredTimeNote, setPreferredTimeNote,
    } = flow;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pickup || !dropoff || !date || !time) {
            alert("Please fill in all fields.");
            return;
        }
        flow.setStep(2); // Move to Vehicle Selection inline
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl mx-auto relative z-20 transition-all duration-300">
            {/* Header / Title */}
            {step === 1 && (
                <>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 text-center mb-2 animate-fade-in uppercase tracking-tight">
                        {title || "Private Transfer & Chauffeur Service"}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100">
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Airport Pickup</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Intercity Travel</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-100">
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Elite Fleet</span>
                        </div>
                    </div>
                </>
            )}

            {/* Step 1: Search Form (Horizontal) */}
            {step === 1 && (
                <form onSubmit={handleSearch} className="space-y-4 animate-fade-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                        {/* Pickup */}
                        <div className="relative group">
                            <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors z-10" />
                            <LocationAutocomplete
                                placeholder="Pickup (Airport or City)"
                                value={pickup}
                                onChange={setPickup}
                                required
                                className="w-full pl-10 pr-9 h-12 bg-gray-50 border border-gray-200 focus:border-primary rounded-xl text-base font-medium outline-none"
                            />
                        </div>

                        {/* Swap Button */}
                        <button
                            type="button"
                            onClick={() => { const temp = pickup; setPickup(dropoff); setDropoff(temp); }}
                            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:scale-110 transition-transform text-gray-500 hover:text-primary"
                        >
                            <ArrowLeftRight className="w-4 h-4" />
                        </button>

                        {/* Dropoff */}
                        <div className="relative group">
                            <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors z-10" />
                            <LocationAutocomplete
                                placeholder="Destination (Hotel or City)"
                                value={dropoff}
                                onChange={setDropoff}
                                required
                                className="w-full pl-10 pr-9 h-12 bg-gray-50 border border-gray-200 focus:border-primary rounded-xl text-base font-medium outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Modern Date Picker */}
                        <div className="relative group flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full h-12 justify-start text-left font-normal bg-gray-50 border-gray-200 hover:bg-gray-100 hover:text-gray-900 rounded-xl px-3",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <Calendar className="mr-2 h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                                        {date ? format(new Date(date), "PPP") : <span>Pickup Date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 z-[200]" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={date ? new Date(date) : undefined}
                                        onSelect={(d) => d && setDate(format(d, "yyyy-MM-dd"))}
                                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Pickup Time */}
                        <div className="relative group flex items-center h-12 bg-gray-50 border border-gray-200 focus-within:border-primary rounded-xl px-3">
                            <Clock className="mr-2 h-5 w-5 text-gray-400 shrink-0" />
                            <input
                                type="time"
                                step={60}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-transparent outline-none text-base text-gray-600"
                            />
                        </div>

                        {/* Round Trip Toggle */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2 h-12 sm:col-span-2 lg:col-span-1">
                            <Switch id="round-trip" checked={isRoundTrip} onCheckedChange={setIsRoundTrip} />
                            <Label htmlFor="round-trip" className="text-sm font-medium text-gray-600 cursor-pointer">Round trip</Label>
                        </div>
                    </div>

                    {/* Preferred Time Note */}
                    <Input
                        value={preferredTimeNote}
                        onChange={(e) => setPreferredTimeNote(e.target.value)}
                        placeholder="Flexible on time? Leave a note (optional) — e.g. Anytime between 1:00 - 1:30 PM"
                        className="h-11 bg-gray-50 border-gray-200 focus:border-primary rounded-xl text-sm"
                    />

                    <Button type="submit" className="w-full h-16 bg-gray-950 hover:bg-black text-white font-black text-lg rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                        Get Quote
                    </Button>
                    <p className="text-[10px] sm:text-xs text-center text-rose-600 font-extrabold uppercase tracking-[0.2em] mt-2 px-4 shadow-sm bg-rose-50/50 py-2 rounded-lg">
                        100% PRIVATE TRANSFERS ONLY • NO SHARED TAXIS • ALL KSA CITIES
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-center text-gray-400 mt-2 px-4 italic leading-tight">
                        * Authorized intercity transfers, hourly chauffeur service, and airport pickups. We do NOT provide local short-hailing or sharing.
                    </p>
                </form>
            )}

            <BookingFlowSteps {...flow} />
        </div>
    );
}
