"use client";

import React from 'react';
import { MapPin, Monitor, Car, Heart, FileText, CheckCircle } from 'lucide-react';

interface HowItWorksProps {
    title?: React.ReactNode;
}

export default function HowItWorks({ title }: HowItWorksProps) {
    const steps = [
        {
            id: 1,
            title: "Choose Your Service",
            description: "Select your route—whether it's an Airport Transfer, Umrah Taxi, or Ziyarat Tour—and pick the perfect vehicle for your family size.",
            icon: <div className="relative">
                <FileText className="w-12 h-12 text-blue-500" />
                <MapPin className="w-6 h-6 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
            </div>
        },
        {
            id: 2,
            title: "Send WhatsApp Message",
            description: "Submit details and finalize your booking via <strong>WhatsApp</strong>. We track your international flight to ensure the driver waits even if you are delayed.",
            icon: <Monitor className="w-12 h-12 text-green-500" />
        },
        {
            id: 3,
            title: "Performance & Comfort",
            description: "Meet your English-speaking chauffeur at the arrival hall with a name sign. Enjoy a safe, premium journey to Makkah or Madinah.",
            icon: <div className="relative">
                <Car className="w-12 h-12 text-blue-500" />
                <Heart className="w-5 h-5 text-red-500 absolute -bottom-1 -right-1 fill-red-500" />
            </div>
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900">
                        {title || <>Book your taxi via WhatsApp in <span className="text-[#FFC107]">3 simple steps</span></>}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        From your first WhatsApp message till the moment you step out the auto at your destination, it couldn't be any simpler:
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {steps.map((step) => (
                        <div key={step.id} className="relative flex flex-col items-center text-center group">
                            {/* Background Number */}
                            <div className="absolute top-0 opacity-[0.03] text-[200px] font-black leading-none select-none pointer-events-none transform -translate-y-1/2">
                                {step.id}
                            </div>

                            {/* Icon Container */}
                            <div className="bg-blue-50 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 relative z-10 transition-transform duration-300 group-hover:scale-110">
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed max-w-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
