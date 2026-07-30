"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Trip = {
    name: string;
    duration: string;
    spots: string;
    image: string;
    href: string;
};

const T = {
    madinahZiyarat: { name: 'Madinah Ziyarat Tour', duration: '3-4 hours', spots: 'Quba · Mount Uhud · Seven Mosques · Qiblatain', image: '/madinah-prophets-mosque.webp', href: '/services/madinah-ziyarat/' },
    makkahZiyarat: { name: 'Makkah Ziyarat Tour', duration: '3-4 hours', spots: 'Jabal Al-Nour · Jabal Thawr · Mina & Arafat', image: '/makkah-grand-mosque.webp', href: '/services/makkah-ziyarat/' },
    aluaHeritage: { name: 'AlUla Heritage Circuit', duration: 'Full day (8-10 hours)', spots: 'Hegra UNESCO Site · Elephant Rock · Old Town', image: '/alula-hegra-tombs.webp', href: '/locations/alula/' },
    taifCity: { name: 'Taif City Tour', duration: '4-6 hours', spots: 'Shubra Palace · Al Rudaf Park · Rose Factory', image: '/taif-rose-gardens.webp', href: '/locations/taif/' },
    jeddahHistorical: { name: 'Jeddah Historical Tour', duration: '4 hours', spots: 'Al-Balad · Corniche · King Fahd Fountain', image: '/jeddah-corniche-sunset.webp', href: '/locations/jeddah/' },
    khaybar: { name: 'Khaybar Historical Tour', duration: 'Half day (4-6 hours)', spots: 'Khaybar Fort · Ancient Oases', image: '/khayber-fort-oasis.png', href: '/locations/khayber-fort/' },
    aluaKhaybar: { name: 'AlUla to Khaybar Circuit', duration: '2 days recommended', spots: 'Hegra + Khaybar · Desert Route', image: '/alula-hegra.webp', href: '/locations/alula/' },
} satisfies Record<string, Trip>;

const TABS: Record<string, Trip[]> = {
    Popular: [T.madinahZiyarat, T.makkahZiyarat, T.aluaHeritage, T.taifCity, T.jeddahHistorical, T.khaybar, T.aluaKhaybar],
    'Ziyarat Tours': [T.madinahZiyarat, T.makkahZiyarat],
    'Heritage & UNESCO': [T.aluaHeritage, T.khaybar, T.aluaKhaybar],
    'City Tours': [T.taifCity, T.jeddahHistorical],
};

const TAB_NAMES = Object.keys(TABS);

export default function HomeDayTrips() {
    const [active, setActive] = useState<string>('Popular');

    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
                    Top sightseeing day trips
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
                    {TABS[active].map((trip) => (
                        <Link key={trip.name} href={trip.href} className="group">
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3">
                                <Image
                                    src={trip.image}
                                    alt={trip.name}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <span className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                                    Private tour
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-900">{trip.name}</h3>
                            <p className="text-sm text-gray-600 mt-0.5">{trip.duration} · Private &amp; flexible</p>
                            <p className="text-sm text-gray-500 mt-0.5 truncate">{trip.spots}</p>
                            <p className="text-sm text-primary font-semibold underline mt-0.5">Get a quote</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
