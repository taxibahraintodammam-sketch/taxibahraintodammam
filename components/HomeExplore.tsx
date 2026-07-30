"use client";

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Card = { flag: string; name: string; subtitle: string; href: string };

const SA = '🇸🇦';

const REGIONS: Record<string, Card[]> = {
    Popular: [
        { flag: SA, name: 'Jeddah', subtitle: 'Corniche · Al Balad · Obhur +3 more', href: '/locations/jeddah/' },
        { flag: SA, name: 'Makkah', subtitle: 'Jabal Omar · Misfalah · Aziziyah +3 more', href: '/locations/makkah/' },
        { flag: SA, name: 'Madinah', subtitle: 'Quba · Uhud · Qiblatain +4 more', href: '/locations/madinah/' },
        { flag: SA, name: 'Riyadh', subtitle: 'Diriyah · Olaya · Boulevard World +4 more', href: '/locations/riyadh/' },
        { flag: SA, name: 'Dammam', subtitle: 'Corniche · Eastern Province hub', href: '/locations/dammam/' },
        { flag: SA, name: 'Taif', subtitle: 'Al Hada · Al Shafa · City of Roses', href: '/locations/taif/' },
        { flag: SA, name: 'AlUla', subtitle: 'Hegra · Elephant Rock · Heritage tours', href: '/locations/alula/' },
        { flag: SA, name: 'Abha', subtitle: 'Al Soudah · Asir Mountains', href: '/locations/abha/' },
    ],
    Western: [
        { flag: SA, name: 'Jeddah', subtitle: 'Corniche · Al Balad · Obhur +3 more', href: '/locations/jeddah/' },
        { flag: SA, name: 'Makkah', subtitle: 'Jabal Omar · Misfalah · Aziziyah +3 more', href: '/locations/makkah/' },
        { flag: SA, name: 'Madinah', subtitle: 'Quba · Uhud · Qiblatain +4 more', href: '/locations/madinah/' },
        { flag: SA, name: 'Taif', subtitle: 'Al Hada · Al Shafa · City of Roses', href: '/locations/taif/' },
        { flag: SA, name: 'Yanbu', subtitle: 'Industrial City · Red Sea coast', href: '/locations/yanbu/' },
        { flag: SA, name: 'Rabigh', subtitle: 'Private transfers available', href: '/locations/rabigh/' },
        { flag: SA, name: 'Al Wajh', subtitle: 'Private transfers available', href: '/locations/al-wajh/' },
        { flag: SA, name: 'Khulais', subtitle: 'Private transfers available', href: '/locations/khulais/' },
    ],
    Central: [
        { flag: SA, name: 'Riyadh', subtitle: 'Diriyah · Olaya · Boulevard World +4 more', href: '/locations/riyadh/' },
        { flag: SA, name: 'Buraidah', subtitle: 'Private transfers available', href: '/locations/buraidah/' },
        { flag: SA, name: 'Hail', subtitle: 'Private transfers available', href: '/locations/hail/' },
        { flag: SA, name: 'Al Kharj', subtitle: 'Private transfers available', href: '/locations/al-kharj/' },
        { flag: SA, name: 'Unaizah', subtitle: 'Private transfers available', href: '/locations/unaizah/' },
        { flag: SA, name: 'Sakaka', subtitle: 'Private transfers available', href: '/locations/sakaka/' },
        { flag: SA, name: 'Dawadmi', subtitle: 'Private transfers available', href: '/locations/dawadmi/' },
        { flag: SA, name: 'Al Majmaah', subtitle: 'Private transfers available', href: '/locations/al-majma-ah/' },
    ],
    Eastern: [
        { flag: SA, name: 'Dammam', subtitle: 'Corniche · Eastern Province hub', href: '/locations/dammam/' },
        { flag: SA, name: 'Al Khobar', subtitle: 'Corniche · Half Moon Bay · Causeway', href: '/locations/al-khobar/' },
        { flag: SA, name: 'Dhahran', subtitle: 'Ithra', href: '/locations/dhahran/' },
        { flag: SA, name: 'Jubail', subtitle: 'Industrial City', href: '/locations/jubail/' },
        { flag: SA, name: 'Al Ahsa', subtitle: 'Private transfers available', href: '/locations/al-ahsa/' },
        { flag: SA, name: 'Hafar Al Batin', subtitle: 'Private transfers available', href: '/locations/hafar-al-batin/' },
        { flag: SA, name: 'Khafji', subtitle: 'Private transfers available', href: '/locations/khafji/' },
        { flag: SA, name: 'Buqayq', subtitle: 'Private transfers available', href: '/locations/buqayq/' },
    ],
    Southern: [
        { flag: SA, name: 'Abha', subtitle: 'Al Soudah · Asir Mountains', href: '/locations/abha/' },
        { flag: SA, name: 'Khamis Mushait', subtitle: 'Private transfers available', href: '/locations/khamis-mushait/' },
        { flag: SA, name: 'Jizan', subtitle: 'Private transfers available', href: '/locations/jizan/' },
        { flag: SA, name: 'Najran', subtitle: 'Private transfers available', href: '/locations/najran/' },
        { flag: SA, name: 'Al Bahah', subtitle: 'Private transfers available', href: '/locations/al-bahah/' },
        { flag: SA, name: 'Bishah', subtitle: 'Private transfers available', href: '/locations/bishah/' },
        { flag: SA, name: 'Baljurashi', subtitle: 'Private transfers available', href: '/locations/baljurashi/' },
        { flag: SA, name: 'Sabya', subtitle: 'Private transfers available', href: '/locations/sabya/' },
    ],
    'GCC & Borders': [
        { flag: '🛂', name: 'Border Crossings', subtitle: '12 official crossings covered', href: '/border-crossings/' },
        { flag: '🇦🇪', name: 'UAE', subtitle: 'Riyadh · Jeddah · Dammam to Dubai', href: '/routes/riyadh-dubai/' },
        { flag: '🇧🇭', name: 'Bahrain', subtitle: 'King Fahd Causeway route', href: '/routes/dammam-bahrain/' },
        { flag: '🇶🇦', name: 'Qatar', subtitle: 'Riyadh to Doha', href: '/routes/riyadh-doha/' },
        { flag: '🇰🇼', name: 'Kuwait', subtitle: 'Riyadh to Kuwait City', href: '/routes/riyadh-kuwait/' },
        { flag: '🇴🇲', name: 'Oman', subtitle: 'Riyadh to Muscat', href: '/routes/riyadh-muscat/' },
        { flag: '🇯🇴', name: 'Jordan', subtitle: 'Riyadh to Amman', href: '/routes/riyadh-amman/' },
        { flag: '🗺️', name: 'All Routes', subtitle: 'View 50+ transfer routes', href: '/routes/' },
    ],
};

const TABS = Object.keys(REGIONS);

export default function HomeExplore() {
    const [active, setActive] = useState<string>('Popular');

    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto bg-gray-50 rounded-[2rem] p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
                    Explore 80+ cities across Saudi Arabia &amp; the GCC with our private transfers &amp; day trips
                </h2>

                <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-1">
                    {TABS.map((tab) => (
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {REGIONS[active].map((card) => (
                        <Link
                            key={card.name}
                            href={card.href}
                            className="flex items-start gap-3 bg-white hover:bg-gray-100 border border-gray-100 rounded-xl p-4 transition-colors"
                        >
                            <span className="text-2xl leading-none shrink-0" aria-hidden="true">{card.flag}</span>
                            <span className="min-w-0">
                                <span className="block font-bold text-gray-900 truncate">{card.name}</span>
                                <span className="block text-sm text-gray-500 truncate">{card.subtitle}</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
