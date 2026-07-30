import React from 'react';
import { Train, Car, Clock, DollarSign, Luggage, MapPin, CheckCircle2, XCircle } from 'lucide-react';

interface TrainComparisonProps {
    route?: string;
    taxiPrice?: string;
    trainPrice?: string;
}

export default function TrainComparison({ 
    route = "Jeddah to Makkah", 
    taxiPrice = "250", 
    trainPrice = "80" 
}: TrainComparisonProps) {
    const comparisonPoints = [
        {
            feature: 'Convenience',
            train: 'Station-to-Station only. Requires 2 extra taxis.',
            taxi: 'Door-to-Door. Airport to Hotel direct.',
            trainIcon: XCircle,
            taxiIcon: CheckCircle2,
            icon: MapPin
        },
        {
            feature: 'Luggage',
            train: 'Strict limits. Hard to manage 4+ bags.',
            taxi: 'Unlimited space in SUVs/Vans for all bags.',
            trainIcon: XCircle,
            taxiIcon: CheckCircle2,
            icon: Luggage
        },
        {
            feature: 'Travel Time',
            train: '35 mins (Train) + 40 mins (Wait/Transfers).',
            taxi: '60-80 mins (Total journey time).',
            trainIcon: Clock,
            taxiIcon: CheckCircle2,
            icon: Clock
        },
        {
            feature: 'Total Cost',
            train: `~${trainPrice} SAR per person. High for families (4+ tickets).`,
            taxi: `Fixed ${taxiPrice} SAR. Flat rate for up to 7 people in an SUV.`,
            trainIcon: DollarSign,
            taxiIcon: CheckCircle2,
            icon: DollarSign
        }
    ];

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden my-16">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side: Header */}
                <div className="bg-gray-950 p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 inline-block">Decision Guide</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{route}: Train or Taxi?</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            While the high-speed train is fast, the private taxi is the strategic choice for families and pilgrims with heavy luggage who value door-to-door comfort.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                                <Train className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-400 text-sm font-bold uppercase">Train</span>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                                <Car className="w-5 h-5 text-emerald-500" />
                                <span className="text-emerald-400 text-sm font-bold uppercase">Taxi Service KSA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Comparison Table */}
                <div className="p-8 lg:p-12 bg-gray-50/50">
                    <div className="space-y-6">
                        {comparisonPoints.map((point, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gray-100 rounded-lg text-gray-900">
                                        <point.icon className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-black text-gray-900 uppercase tracking-tighter text-sm">{point.feature}</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <point.trainIcon className="w-3 h-3 text-red-400" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Haramain Train</span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed italic">{point.train}</p>
                                    </div>
                                    <div className="space-y-2 border-l border-gray-100 pl-6">
                                        <div className="flex items-center gap-2">
                                            <point.taxiIcon className="w-3 h-3 text-emerald-500" />
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest text-wrap">Taxi Service KSA</span>
                                        </div>
                                        <p className="text-xs text-gray-900 font-bold leading-relaxed">{point.taxi}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="bg-emerald-600 px-8 py-4 text-center">
                <p className="text-white text-xs font-bold uppercase tracking-widest">
                    Expert Verdict: For 3+ people or Umrah pilgrims with bags, the Private Taxi is 40% more cost-effective.
                </p>
            </div>
        </div>
    );
}
