import React from 'react';
import { MessageCircle, CreditCard, Car, ArrowRight } from 'lucide-react';

interface Step {
    title: string;
    description: string;
    icon: any;
    color: string;
    textColor: string;
}

interface BookingProcessProps {
    title?: string;
    subtitle?: string;
    steps?: Step[];
}

export default function BookingProcess({ 
    title = "3 Steps to Your Transfer",
    subtitle = "No complex forms. No payment upfront. Just professional service via WhatsApp.",
    steps: customSteps 
}: BookingProcessProps) {
    const defaultSteps = [
        {
            title: 'Send Message',
            description: 'Click the WhatsApp button and send your pickup details & date.',
            icon: MessageCircle,
            color: 'bg-emerald-500',
            textColor: 'text-emerald-500'
        },
        {
            title: 'Get Fixed Quote',
            description: 'Our team will instantly provide a fixed-rate quote with no hidden fees.',
            icon: CreditCard,
            color: 'bg-blue-500',
            textColor: 'text-blue-500'
        },
        {
            title: 'Enjoy Your Ride',
            description: 'Your chauffeur will meet you at the terminal with a name board.',
            icon: Car,
            color: 'bg-gray-900',
            textColor: 'text-gray-900'
        }
    ];

    const steps = customSteps || defaultSteps;

    return (
        <section className="py-24 bg-gray-50 rounded-[40px] px-8 my-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block">Simple & Transparent</span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 font-display italic">{title}</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connection Lines (Desktop only) */}
                    <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gray-200 -translate-y-12"></div>
                    
                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                            <div className={`${step.color} w-24 h-24 rounded-3xl flex items-center justify-center text-white shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <step.icon className="w-10 h-10" />
                            </div>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className={`text-xs font-black ${step.textColor} uppercase tracking-widest`}>Step 0{index + 1}</span>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {step.description}
                            </p>
                            
                            {index < 2 && (
                                <div className="md:hidden flex justify-center py-8">
                                    <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-100 shadow-sm">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">Average Response Time: 2 Minutes</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
