"use client";

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeftRight, Check, Users, Briefcase, User, Mail, Wallet, ChevronsUpDown, Loader2, Car } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { vehicles } from '@/lib/supabase';
import { countryCodes } from '@/data/countryCodes';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface BookingFlowStepsProps {
    step: number;
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    isRoundTrip: boolean;
    selectedVehicle: typeof vehicles[0] | null;
    setSelectedVehicle: (v: typeof vehicles[0]) => void;
    passengers: number;
    setPassengers: React.Dispatch<React.SetStateAction<number>>;
    customerName: string;
    setCustomerName: (v: string) => void;
    customerEmail: string;
    setCustomerEmail: (v: string) => void;
    customerPhone: string;
    setCustomerPhone: (v: string) => void;
    countryCode: string;
    setCountryCode: (v: string) => void;
    openCountry: boolean;
    setOpenCountry: (v: boolean) => void;
    loading: boolean;
    handleBack: () => void;
    handleSubmitBooking: (e: React.FormEvent) => void;
    setStep: (n: number) => void;
    sendWhatsAppAgain: () => void;
    resetForm: () => void;
}

export default function BookingFlowSteps(props: BookingFlowStepsProps) {
    const {
        step, pickup, dropoff, date, time, isRoundTrip,
        selectedVehicle, setSelectedVehicle,
        passengers, setPassengers,
        customerName, setCustomerName,
        customerEmail, setCustomerEmail,
        customerPhone, setCustomerPhone,
        countryCode, setCountryCode,
        openCountry, setOpenCountry,
        loading, handleBack, handleSubmitBooking, setStep,
        sendWhatsAppAgain, resetForm,
    } = props;

    return (
        <>
            {/* Step 2: Vehicle Selection */}
            {step === 2 && (
                <div className="animate-fade-in-up space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 border-b border-gray-100 pb-4 gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Select Vehicle</h3>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                <span className="truncate max-w-[120px] sm:max-w-xs">{pickup}</span>
                                <ArrowLeftRight className="w-3 h-3 text-gray-400" />
                                <span className="truncate max-w-[120px] sm:max-w-xs">{dropoff}</span>
                            </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleBack} className="text-gray-600 hover:text-black">
                            Change Trip
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <Select
                            value={selectedVehicle?.name || ""}
                            onValueChange={(val) => {
                                const v = vehicles.find(veh => veh.name === val);
                                if (v) setSelectedVehicle(v);
                            }}
                        >
                            <SelectTrigger className="w-full h-16 bg-white border-2 border-gray-100 focus:border-primary rounded-xl text-lg relative overflow-hidden">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="w-14 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                        {selectedVehicle ? (
                                            <img
                                                src={selectedVehicle.image}
                                                alt={selectedVehicle.name}
                                                className="w-full h-full object-contain p-0.5"
                                            />
                                        ) : (
                                            <Car className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <SelectValue placeholder="Choose your vehicle..." />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="max-h-[420px]">
                                {vehicles.map((v) => (
                                    <SelectItem key={v.name} value={v.name} className="py-2 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                                <img
                                                    src={v.image}
                                                    alt={v.name}
                                                    className="w-full h-full object-contain p-0.5"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="font-bold text-gray-900">{v.name}</span>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {v.passengers} Pax</span>
                                                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {v.luggage} Bags</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Vehicle Image Preview + Passenger Selector */}
                        {selectedVehicle && (
                            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm animate-fade-in">
                                {/* Car Image Banner */}
                                <div className="bg-gray-50 flex items-center justify-center h-36 px-6">
                                    <img
                                        src={selectedVehicle.image}
                                        alt={selectedVehicle.name}
                                        className="h-full w-full object-contain"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </div>
                                {/* Passenger Selector */}
                                <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">Passengers</span>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-0.5">
                                            Max {selectedVehicle.passengers} • {selectedVehicle.luggage} Bags
                                        </span>
                                    </div>
                                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setPassengers(p => Math.max(1, p - 1))}
                                            className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-all active:scale-90 border"
                                        >
                                            <span className="text-xl font-bold text-gray-900">-</span>
                                        </button>
                                        <span className="text-2xl font-black text-primary min-w-[50px] text-center">{passengers}</span>
                                        <button
                                            type="button"
                                            onClick={() => setPassengers(p => Math.min(selectedVehicle.passengers, p + 1))}
                                            className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-all active:scale-90 border"
                                        >
                                            <span className="text-xl font-bold text-gray-900">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                            <div className="bg-blue-100 p-2 rounded-full shrink-0">
                                <Check className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="text-sm text-blue-800">
                                <p className="font-semibold mb-1">Best Price Guarantee</p>
                                <p className="opacity-90">All prices include taxes, fees, and gratuities. No hidden charges.</p>
                            </div>
                        </div>

                         <Button
                            onClick={() => setStep(3)}
                            disabled={!selectedVehicle}
                            className="w-full h-14 bg-gray-950 hover:bg-black text-white font-black text-lg rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            Continue to Details
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && selectedVehicle && (
                <form onSubmit={handleSubmitBooking} className="animate-fade-in-up space-y-6">
                    <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Enter Details</h3>
                            <p className="text-sm text-gray-500">{selectedVehicle.name} • {date ? format(new Date(date), "MMM d") : ''} at {time ? format(new Date(`2000-01-01T${time}`), "h:mm a") : ''}</p>
                        </div>
                        <Button type="button" variant="ghost" onClick={handleBack} className="text-gray-500">Back</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <Input name="name" placeholder="Full Name" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl" />
                            </div>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <Input name="email" type="email" placeholder="Email Address" required value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Popover open={openCountry} onOpenChange={setOpenCountry} modal={false}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-label="Select country code" aria-expanded={openCountry} className="w-[100px] h-12 justify-between bg-gray-50 border-gray-200 rounded-xl"><span className="truncate">{countryCode}</span><ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[250px] p-0 max-h-[300px] overflow-y-auto">
                                        <Command>
                                            <CommandInput placeholder="Search..." />
                                            <CommandList>
                                                <CommandEmpty>No country found.</CommandEmpty>
                                                <CommandGroup>
                                                    {countryCodes.map((c) => (
                                                        <CommandItem key={c.country} onSelect={() => { setCountryCode(c.code); setOpenCountry(false); }}>
                                                            <Check className={cn("mr-2 h-4 w-4", countryCode === c.code ? "opacity-100" : "opacity-0")} />
                                                            <span>{c.flag}</span> {c.code}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <Input name="phone" type="tel" placeholder="Mobile Number" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="flex-1 h-12 bg-gray-50 border-gray-200 rounded-xl" />
                            </div>

                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-700 flex items-center"><Wallet className="w-4 h-4 mr-2" /> Fare Estimate:</span>
                                <span className="text-xl font-bold text-primary">Custom Quote</span>
                            </div>
                        </div>
                    </div>

                     <Button type="submit" disabled={loading} className="w-full h-14 bg-gray-950 hover:bg-black text-white font-bold text-lg rounded-xl shadow-md flex items-center justify-center gap-2">
                        {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting Request...</> : <>Submit Request</>}
                    </Button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-bold tracking-wider">Need Help?</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <a href="mailto:taxiserviceksa9988@gmail.com" className="block w-full">
                            <Button
                                type="button"
                                className="w-full h-14 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                Email
                            </Button>
                        </a>
                        <a href="https://wa.me/966569487569?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20transfer." target="_blank" rel="nofollow noopener noreferrer" className="block w-full">
                            <Button
                                type="button"
                                className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                                <WhatsAppIcon className="w-5 h-5" color="white" />
                                Direct WhatsApp
                            </Button>
                        </a>
                    </div>
                </form>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
                <div className="text-center py-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Request Received!</h3>
                        <p className="text-gray-500 font-medium pb-2 text-sm">Your quotation request has been sent for review.</p>
                    </div>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                        We've sent a summary to <strong>{customerEmail}</strong>. Our team will contact you with the official quote shortly.
                    </p>

                    <div className="flex flex-col gap-3 max-w-sm mx-auto">
                        <Button
                            onClick={sendWhatsAppAgain}
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <WhatsAppIcon className="w-5 h-5" color="white" />
                            Send on WhatsApp Again
                        </Button>

                        <Button onClick={resetForm} className="border-2 border-gray-200 hover:bg-black hover:text-white text-gray-700 font-black py-4 px-8 rounded-xl transition-all">
                            Request Another
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
