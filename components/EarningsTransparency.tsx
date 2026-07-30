import React from 'react';
import { TrendingUp, Clock, MapPin, DollarSign, Star, ShieldCheck } from 'lucide-react';

interface EarningTier {
    tripType: string;
    avgFare: string;
    avgTime: string;
    monthlyFreq: string;
    potential: string;
}

const tiers: EarningTier[] = [
    {
        tripType: "Airport (RUH)",
        avgFare: "SAR 250",
        avgTime: "45 Mins",
        monthlyFreq: "40 Trips",
        potential: "SAR 10,000"
    },
    {
        tripType: "Intercity (DMM/MKK)",
        avgFare: "SAR 1,200",
        avgTime: "4-8 Hours",
        monthlyFreq: "12 Trips",
        potential: "SAR 14,400"
    },
    {
        tripType: "Daily Chauffeur",
        avgFare: "SAR 600",
        avgTime: "12 Hours",
        monthlyFreq: "15 Days",
        potential: "SAR 9,000"
    }
];

const EarningsTransparency = () => {
    return (
        <div className="w-full py-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gray-900 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-bold">2026 Earnings Transparency</h3>
                    </div>
                    <p className="text-gray-400">Projected monthly income based on active Riyadh chauffeurs. We take 0% commission on tips.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Trip Type</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider text-center">Avg. Fare</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider text-center">Duration</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider text-right text-emerald-600">Potential/Mo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tiers.map((tier, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-gray-900">{tier.tripType}</div>
                                        <div className="text-xs text-gray-500">{tier.monthlyFreq} avg/month</div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-gray-700 font-medium">{tier.avgFare}</td>
                                    <td className="px-6 py-5 text-center text-gray-500 text-sm">
                                        <div className="flex items-center justify-center gap-1">
                                            <Clock className="w-3 h-3" /> {tier.avgTime}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="text-lg font-black text-emerald-600">{tier.potential}</div>
                                        <div className="text-[10px] text-gray-400 uppercase font-bold">Gross Revenue</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-emerald-50 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-emerald-100">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-bold text-emerald-900 tracking-tight">Net potential for full-time drivers: SAR 18,000 - 25,000 / Month</span>
                    </div>
                    <div className="text-[10px] text-emerald-700/60 italic">*Results vary based on vehicle efficiency and availability.</div>
                </div>
            </div>
        </div>
    );
};

export default EarningsTransparency;
