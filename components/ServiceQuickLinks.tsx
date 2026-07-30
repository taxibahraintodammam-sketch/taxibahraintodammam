"use client";

import Link from 'next/link';
import { Building2, Plane, Clock, Palmtree, Ship, Car } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const LINKS = [
    {
        title: 'City-to-city transfers',
        description: 'Take private rides tailored to your plans and destination',
        icon: Building2,
        href: '/services/intercity/',
    },
    {
        title: 'Airport transfers',
        description: 'Enjoy direct transfers to and from the airport',
        icon: Plane,
        href: '/services/airport-transfers/',
    },
    {
        title: 'Hourly driver',
        description: 'Hire an hourly private driver and travel on your schedule',
        icon: Clock,
        href: '/services/private-driver/',
    },
    {
        title: 'Sightseeing day trips',
        description: 'Explore more of your surroundings with day trips',
        icon: Palmtree,
        href: '/services/tours/',
    },
    {
        title: 'Cruise port transfers',
        description: 'Start and end your cruise with a private ride',
        icon: Ship,
        href: '/services/jeddah-port-taxi-transfer/',
    },
];

export default function ServiceQuickLinks() {
    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {LINKS.map(({ title, description, icon: Icon, href }) => (
                        <Link
                            key={title}
                            href={href}
                            className="group relative flex flex-col justify-between bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 min-h-[210px] transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                                    <p className="text-sm text-gray-600 mt-1.5 leading-snug max-w-[70%]">{description}</p>
                                </div>
                                <div className="relative w-16 h-16 shrink-0">
                                    <div className="absolute inset-0 bg-primary/10 rounded-2xl flex items-center justify-center">
                                        <Icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100">
                                        <Car className="w-3.5 h-3.5 text-gray-700" />
                                    </div>
                                </div>
                            </div>
                            <span className="inline-flex items-center justify-center w-fit bg-white border border-gray-300 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 text-gray-900 text-sm font-semibold rounded-full px-4 py-2 transition-colors">
                                Learn more
                            </span>
                        </Link>
                    ))}

                    {/* WhatsApp quote card */}
                    <a
                        href="https://wa.me/966569487569?text=Hello%2C%20I%20want%20to%20get%20a%20taxi%20quote."
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="group relative flex flex-col justify-between bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-6 min-h-[210px] transition-colors overflow-hidden"
                    >
                        <div>
                            <span className="inline-flex items-center bg-white text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                                Instant Quote
                            </span>
                            <h3 className="text-lg font-bold text-gray-900">Go anywhere.</h3>
                            <p className="text-sm text-gray-700 mt-1 leading-snug max-w-[75%]">
                                WhatsApp booking makes it easy — reply in minutes, any time of day.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-2 justify-center w-fit bg-[#25D366] group-hover:bg-[#128C7E] text-white text-sm font-bold rounded-full px-4 py-2 transition-colors">
                            <WhatsAppIcon className="w-4 h-4" color="white" />
                            Chat on WhatsApp
                        </span>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/60 rounded-full flex items-center justify-center">
                            <WhatsAppIcon className="w-10 h-10 text-emerald-600" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
