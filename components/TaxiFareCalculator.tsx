"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Car, DollarSign, MapPin, Calculator, CalendarCheck, Info, Users } from 'lucide-react';
import Link from 'next/link';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { getPrice } from '@/lib/pricing';

const CITY_LABELS: Record<string, string> = {
    jeddah: 'Jeddah',
    makkah: 'Makkah',
    madinah: 'Madinah',
    taif: 'Taif',
};

export default function TaxiFareCalculator() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [result, setResult] = useState<null | { sedan: number | null; suv: number | null; van: number | null }>(null);
    const [sameCityError, setSameCityError] = useState(false);

    const handleCalculate = () => {
        if (!from || !to) return;
        if (from === to) { setSameCityError(true); setResult(null); return; }
        setSameCityError(false);

        setResult({
            sedan: getPrice(from, to, 'Toyota Camry'),
            suv: getPrice(from, to, 'GMC Yukon XL / Denali'),
            van: getPrice(from, to, 'Toyota Hiace'),
        });
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-900 p-6 text-white text-center">
                <Calculator className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                <h3 className="text-2xl font-bold">Taxi Quote Estimator</h3>
                <p className="text-gray-400 text-sm">Get Instant Quotations via WhatsApp</p>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Pickup City</label>
                        <select
                            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        >
                            <option value="">Select Pickup...</option>
                            <option value="jeddah">Jeddah (Airport/City)</option>
                            <option value="makkah">Makkah (Haram/Hotels)</option>
                            <option value="madinah">Madinah (Markaziyah)</option>
                            <option value="taif">Taif</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Drop-off City</label>
                        <select
                            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        >
                            <option value="">Select Destination...</option>
                            <option value="jeddah">Jeddah (Airport/City)</option>
                            <option value="makkah">Makkah (Haram/Hotels)</option>
                            <option value="madinah">Madinah (Markaziyah)</option>
                            <option value="taif">Taif</option>
                        </select>
                    </div>
                </div>

                <Button
                    onClick={handleCalculate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 text-lg rounded-xl mb-8 shadow-lg shadow-emerald-200"
                    disabled={!from || !to}
                ><Calculator className="w-4 h-4 mr-2" /> Calculate Fare</Button>

                {sameCityError ? (
                    <div className="text-center py-8 bg-amber-50 rounded-2xl border border-dashed border-amber-300">
                        <Info className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                        <p className="text-amber-700 text-sm font-medium">Pickup and destination can&apos;t be the same city.</p>
                    </div>
                ) : result ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 mb-4 justify-center text-gray-500 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Professional transfers with meet-and-greet service</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Sedan */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center hover:border-emerald-500 transition-colors cursor-pointer group">
                                <Car className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-emerald-600" />
                                <div className="font-bold text-gray-900">Economy Sedan</div>
                                <div className="text-xs text-gray-500 mb-2">Toyota Camry / Sonata</div>
                                <div className="text-xl font-black text-gray-900 mb-4">
                                    {result.sedan ? `SAR ${result.sedan}` : <span className="text-sm font-semibold text-gray-500">Contact for Quote</span>}
                                </div>
                                <Link href={`https://wa.me/966569487569?text=${encodeURIComponent(`Hello, I want to book a Sedan from ${CITY_LABELS[from]} to ${CITY_LABELS[to]}${result.sedan ? ` (quoted SAR ${result.sedan})` : ''}.`)}`}>
                                    <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">WhatsApp Quote</Button>
                                </Link>
                            </div>

                            {/* SUV */}
                            <div className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-500 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">POPULAR</div>
                                <Car className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                                <div className="font-bold text-gray-900">Luxury SUV</div>
                                <div className="text-xs text-gray-500 mb-2">GMC Yukon XL / Denali</div>
                                <div className="text-xl font-black text-gray-900 mb-4">
                                    {result.suv ? `SAR ${result.suv}` : <span className="text-sm font-semibold text-gray-500">Contact for Quote</span>}
                                </div>
                                <Link href={`https://wa.me/966569487569?text=${encodeURIComponent(`Hello, I want to book an SUV from ${CITY_LABELS[from]} to ${CITY_LABELS[to]}${result.suv ? ` (quoted SAR ${result.suv})` : ''}.`)}`}>
                                    <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">WhatsApp Quote</Button>
                                </Link>
                            </div>

                            {/* Van */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center hover:border-emerald-500 transition-colors cursor-pointer group">
                                <Users className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-emerald-600" />
                                <div className="font-bold text-gray-900">Group Transport</div>
                                <div className="text-xs text-gray-500 mb-2">Toyota Hiace (11 pax)</div>
                                <div className="text-xl font-black text-gray-900 mb-4">
                                    {result.van ? `SAR ${result.van}` : <span className="text-sm font-semibold text-gray-500">Contact for Quote</span>}
                                </div>
                                <Link href={`https://wa.me/966569487569?text=${encodeURIComponent(`Hello, I want to book Group Transport from ${CITY_LABELS[from]} to ${CITY_LABELS[to]}${result.van ? ` (quoted SAR ${result.van})` : ''}.`)}`}>
                                    <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">WhatsApp Quote</Button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link href="/booking/">
                                <Button variant="outline" className="w-full sm:w-auto font-bold px-8 py-4 rounded-xl">
                                    Use Web Booking Form
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <Info className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 text-sm">Select locations to see official rates</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Icon helper
function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
