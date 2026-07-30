"use client";

import { Plane, Navigation, Landmark, ShieldCheck, CheckCircle2 } from 'lucide-react';

const STEPS = [
    { num: 1, label: 'Application & interview' },
    { num: 2, label: 'License & background check' },
    { num: 3, label: 'Hospitality & safety training' },
];

const SPECIALISTS = [
    {
        icon: Plane,
        role: 'Airport Specialist',
        description: 'Tracks flight delays and meets you at arrivals — JED, RUH, MED and beyond.',
    },
    {
        icon: Navigation,
        role: 'Intercity & Long-Distance',
        description: 'Comfortable with 400km+ highway drives between Jeddah, Riyadh, and Dammam.',
    },
    {
        icon: Landmark,
        role: 'Ziyarat & Umrah Guide',
        description: 'Knows prayer times, Haram access routes, and pilgrim etiquette.',
    },
    {
        icon: ShieldCheck,
        role: 'Executive Chauffeur',
        description: 'Trained in luxury hospitality for executives, diplomats, and distinguished guests.',
    },
];

export default function HomeDriverStandards() {
    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Our drivers are licensed professionals
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Every driver is licensed by the Transport General Authority (TGA), background-checked, and trained to Saudi hospitality standards before joining our network.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                    {STEPS.map((step, idx) => (
                        <div key={step.num} className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm">
                                <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-bold shrink-0">
                                    {step.num}
                                </span>
                                {step.label}
                            </span>
                            {idx < STEPS.length - 1 && (
                                <span className="hidden sm:block w-8 h-px bg-gray-300" aria-hidden="true" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
                    {SPECIALISTS.map(({ icon: Icon, role, description }) => (
                        <div key={role} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="relative w-14 h-14 mb-4">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <span className="absolute -bottom-1 -right-1 bg-white rounded-full">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-white" />
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1.5">{role}</h3>
                            <p className="text-sm text-gray-600 leading-snug">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
