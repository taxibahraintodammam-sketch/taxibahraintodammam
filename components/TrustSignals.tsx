import React from 'react';
import { ShieldCheck, Award, ThumbsUp, CheckCircle } from 'lucide-react';

export default function TrustSignals() {
    const badges = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
            title: "TGA Licensed",
            subtitle: "Certified by Saudi Transport General Authority"
        },
        {
            icon: <Award className="w-8 h-8 text-amber-500" />,
            title: "Premium Fleet",
            subtitle: "Luxury SUVs & Business Sedans"
        },
        {
            icon: <ThumbsUp className="w-8 h-8 text-blue-600" />,
            title: "5-Star Service",
            subtitle: "Rated by 25,000+ Happy Travelers"
        },
        {
            icon: <CheckCircle className="w-8 h-8 text-primary" />,
            title: "24/7 Support",
            subtitle: "Instant WhatsApp & Live Assistance"
        }
    ];

    return (
        <section className="py-12 bg-gray-50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {badges.map((badge, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                                {badge.icon}
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{badge.title}</h4>
                            <p className="text-gray-500 text-[10px] sm:text-xs leading-tight">{badge.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
