"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star, Camera } from 'lucide-react';

const FEATURES = [
    {
        image: '/taif-rose-gardens.webp',
        alt: 'Taif rose gardens sightseeing stop on a private day trip in Saudi Arabia',
        badge: 'Popular add-on',
        title: 'Optional sightseeing stops',
        description: 'Stretch your legs. See something beautiful. Still arrive relaxed.',
    },
    {
        image: '/chauffeur-service.png',
        alt: 'Professional English-speaking chauffeur opening the car door in Saudi Arabia',
        title: 'English-speaking drivers',
        description: 'Ride with a professional behind the wheel, so you can relax and enjoy the trip.',
    },
    {
        image: '/gmc-yukon.webp',
        alt: 'Comfortable GMC Yukon fleet vehicle used for private transfers',
        title: 'Comfortable vehicles',
        description: 'Choose the vehicle that suits you best, from business sedans to premium SUVs.',
    },
    {
        image: '/jeddah-airport-terminal.webp',
        alt: 'Door-to-door pickup at Jeddah airport terminal',
        title: 'Door-to-door comfort',
        description: 'Start and end your trip exactly where you decide — hotel, airport, or home.',
    },
];

export default function HomeSocialProof() {
    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    25,000+ travelers love riding with Taxi Service KSA
                </h2>
                <div className="flex flex-wrap items-center gap-2 mb-8 text-sm sm:text-base">
                    <span className="flex items-center justify-center w-5 h-5 bg-[#00b67a] rounded-sm shrink-0">
                        <Star className="w-3 h-3 fill-white text-white" />
                    </span>
                    <span className="font-semibold text-gray-900">Trustpilot</span>
                    <span className="text-gray-600">Rated by real travelers.</span>
                    <a
                        href="https://www.trustpilot.com/review/taxibahraintodammam.com"
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="underline text-gray-900 hover:text-primary font-medium"
                    >
                        See what our customers say about us
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {FEATURES.map((f, idx) => (
                        <div
                            key={f.title}
                            className={`rounded-2xl overflow-hidden bg-white shadow-sm ${idx === 0 ? 'ring-2 ring-emerald-400' : ''}`}
                        >
                            <div className="relative h-56 sm:h-64">
                                <Image
                                    src={f.image}
                                    alt={f.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                {f.badge && (
                                    <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                                        <Camera className="w-3.5 h-3.5" />
                                        {f.badge}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-1.5">{f.title}</h3>
                                <p className="text-sm text-gray-600 leading-snug">{f.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
