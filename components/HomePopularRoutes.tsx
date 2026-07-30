"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Route = {
    from: string;
    to: string;
    distance: string;
    duration: string;
    price: string;
    image: string;
    href: string;
};

const R = {
    jeddahMakkah: { from: 'Jeddah', to: 'Makkah', distance: '85-95 km', duration: '60-80 min', price: 'From 300 SAR', image: '/makkah-kaaba-night.webp', href: '/routes/jeddah-makkah/' },
    makkahMadinah: { from: 'Makkah', to: 'Madinah', distance: '450 km', duration: '4-5 hours', price: 'From 550 SAR', image: '/madinah-prophets-mosque.webp', href: '/routes/makkah-madinah/' },
    madinahJeddah: { from: 'Madinah', to: 'Jeddah', distance: '415-450 km', duration: '4-4.5 hours', price: 'Get quote', image: '/jeddah-corniche-sunset.webp', href: '/routes/madinah-jeddah/' },
    jeddahTaif: { from: 'Jeddah', to: 'Taif', distance: '170 km', duration: '2-2.5 hours', price: 'Get quote', image: '/taif-rose-gardens.webp', href: '/routes/jeddah-taif/' },
    jeddahAlula: { from: 'Jeddah', to: 'AlUla', distance: '700 km', duration: '7-8 hours', price: 'Get quote', image: '/alula-hegra-tombs.webp', href: '/routes/jeddah-alula/' },
    riyadhJeddah: { from: 'Riyadh', to: 'Jeddah', distance: '950 km', duration: '9-10 hours', price: 'Get quote', image: '/jeddah-city-night.webp', href: '/routes/riyadh-jeddah/' },
    makkahTaif: { from: 'Makkah', to: 'Taif', distance: '85-100 km', duration: '1.5-2 hours', price: 'Get quote', image: '/taif-mountains-view.webp', href: '/routes/makkah-taif/' },
    madinahAlula: { from: 'Madinah', to: 'AlUla', distance: '330 km', duration: '3.5 hours', price: 'Get quote', image: '/alula-hegra.webp', href: '/routes/madinah-alula/' },
    jeddahMadinah: { from: 'Jeddah', to: 'Madinah', distance: '415 km', duration: '4-4.5 hours', price: 'Get quote', image: '/madinah-night-view.webp', href: '/routes/jeddah-madinah/' },
    jeddahDammam: { from: 'Jeddah', to: 'Dammam', distance: '~1,300 km', duration: '13-14 hours', price: 'Get quote', image: '/hero-slide-3.webp', href: '/routes/jeddah-dammam/' },
} satisfies Record<string, Route>;

const TABS: Record<string, Route[]> = {
    Popular: [R.jeddahMakkah, R.makkahMadinah, R.madinahJeddah, R.jeddahTaif, R.jeddahAlula, R.riyadhJeddah, R.makkahTaif, R.madinahAlula],
    'Umrah Routes': [R.jeddahMakkah, R.makkahMadinah, R.madinahJeddah, R.jeddahMadinah],
    'Heritage & Day Trips': [R.jeddahTaif, R.makkahTaif, R.jeddahAlula, R.madinahAlula],
    'Long-Distance': [R.riyadhJeddah, R.jeddahDammam, R.jeddahAlula],
};

const TAB_NAMES = Object.keys(TABS);

export default function HomePopularRoutes() {
    const [active, setActive] = useState<string>('Popular');

    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
                    Most popular private transfer routes
                </h2>

                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
                    {TAB_NAMES.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActive(tab)}
                            className={cn(
                                'shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap',
                                active === tab
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {TABS[active].map((route) => (
                        <Link key={`${route.from}-${route.to}`} href={route.href} className="group">
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3">
                                <Image
                                    src={route.image}
                                    alt={`Private transfer from ${route.from} to ${route.to}`}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            <h3 className="font-bold text-gray-900">{route.from} to {route.to}</h3>
                            <p className="text-sm text-gray-600 mt-0.5">{route.duration} · {route.distance}</p>
                            <p className="text-sm text-primary font-semibold underline mt-0.5">{route.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
