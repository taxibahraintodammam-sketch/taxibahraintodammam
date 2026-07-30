import React from 'react';
import { DollarSign, CheckCircle2, Info } from 'lucide-react';

interface PricingRow {
    vehicle: string;
    description: string;
    price: string;
    capacity: string;
    isPopular?: boolean;
}

interface PricingTableProps {
    title?: string;
    subtitle?: string;
    rows?: PricingRow[];
    disclaimer?: string;
    currency?: string;
}

const defaultRows: PricingRow[] = [
    {
        vehicle: "Economy (Camry)",
        description: "Comfortable standard sedan",
        price: "250",
        capacity: "4 Passengers",
        isPopular: true
    },
    {
        vehicle: "Business (Sonata/K5)",
        description: "Executive sedan with extra legroom",
        price: "350",
        capacity: "4 Passengers"
    },
    {
        vehicle: "SUV (GMC/Chevrolet)",
        description: "Spacious family vehicle",
        price: "500",
        capacity: "7 Passengers",
        isPopular: true
    },
    {
        vehicle: "Van (Hiace/Hyundai)",
        description: "Large group transport",
        price: "700",
        capacity: "12 Passengers"
    }
];

export default function PricingTable({
    title = "Fixed Price Transparency",
    subtitle = "2026 Verified Rates",
    rows = defaultRows,
    disclaimer = "Prices are all-inclusive of tolls, taxes, and fuel. No hidden fees.",
    currency = "SAR"
}: PricingTableProps) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden my-12">
            <div className="bg-gray-900 px-8 py-10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-black text-white mb-2">{title}</h2>
                    <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm">{subtitle}</p>
                </div>
            </div>

            <div className="p-4 md:p-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-wider">Vehicle Type</th>
                                <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-wider">Capacity</th>
                                <th className="py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-wider">Starting From</th>
                                <th className="py-4 px-4 text-center text-xs font-black text-gray-400 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rows.map((row, idx) => (
                                <tr key={idx} className={`hover:bg-gray-50/50 transition-colors ${row.isPopular ? 'bg-emerald-50/30' : ''}`}>
                                    <td className="py-6 px-4">
                                        <div className="flex flex-col">
                                            <span className="font-black text-gray-900 text-lg flex items-center gap-2">
                                                {row.vehicle}
                                                {row.isPopular && (
                                                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Popular Choice</span>
                                                )}
                                            </span>
                                            <span className="text-gray-500 text-sm">{row.description}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-4 text-gray-600 font-bold text-sm">
                                        {row.capacity}
                                    </td>
                                    <td className="py-6 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black text-gray-900">
                                                {row.price} <span className="text-xs font-bold text-gray-400">{currency}</span>
                                            </span>
                                            <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-1">All-Inclusive Fixed Rate</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-4 text-center">
                                        <a 
                                            href={`/booking/?vehicle=${encodeURIComponent(row.vehicle)}`}
                                            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
                                        >
                                            Book Now
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {disclaimer && (
                    <div className="mt-8 flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-500 leading-relaxed italic">
                            {disclaimer}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
