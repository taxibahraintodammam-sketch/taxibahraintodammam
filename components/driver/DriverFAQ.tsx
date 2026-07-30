"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DriverFAQ() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "Can I join with my own car?",
            a: "Yes! We only hire professional drivers who own their vehicles (model 2020 or newer). We do not accept rental drivers."
        },
        {
            q: "Do I need English?",
            a: "Yes, English or Arabic communication skills are required."
        },
        {
            q: "How do I receive bookings?",
            a: "Once approved, you will receive bookings directly from our platform. There is no open marketplace competition like Uber or Careem."
        },
        {
            q: "Is this like Uber?",
            a: "No. This is NOT a ride-hailing app. There are no random passengers and no app competition. We provide direct bookings from premium clients."
        },
        {
            q: "When do I get paid?",
            a: "We provide weekly or fast payouts for all our approved chauffeurs."
        }
    ];

    return (
        <section className="py-24 px-4 bg-gray-50 mt-16 rounded-[2.5rem] w-full">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900">FAQ</h2>
                    <p className="text-gray-500 mt-4 text-lg">Common questions about joining as a chauffeur.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                            >
                                <span className="font-bold text-gray-900 text-lg">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                            </button>
                            <div className={`px-6 pb-5 text-gray-600 leading-relaxed transition-all ${openFaq === i ? 'block' : 'hidden'}`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
