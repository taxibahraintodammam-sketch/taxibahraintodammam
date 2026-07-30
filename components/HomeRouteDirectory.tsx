"use client";

import Link from 'next/link';

const ROUTES: { name: string; href: string }[] = [
    { name: 'Jeddah Airport to Makkah', href: '/routes/jeddah-makkah/' },
    { name: 'Makkah to Madinah', href: '/routes/makkah-madinah/' },
    { name: 'Madinah to Jeddah Airport', href: '/routes/madinah-jeddah/' },
    { name: 'Riyadh to Jeddah', href: '/routes/riyadh-jeddah/' },
    { name: 'Riyadh to Makkah', href: '/routes/riyadh-makkah/' },
    { name: 'Riyadh to Dammam', href: '/routes/riyadh-dammam/' },
    { name: 'Jeddah to Taif', href: '/routes/jeddah-taif/' },
    { name: 'Jeddah to AlUla', href: '/routes/jeddah-alula/' },
    { name: 'Jeddah to Dammam', href: '/routes/jeddah-dammam/' },
    { name: 'Jeddah to Yanbu', href: '/routes/jeddah-yanbu/' },
    { name: 'Makkah to Jeddah', href: '/routes/makkah-jeddah/' },
    { name: 'Taif to Jeddah', href: '/routes/taif-jeddah/' },
    { name: 'Makkah to Taif', href: '/routes/makkah-taif/' },
    { name: 'Madinah to AlUla', href: '/routes/madinah-alula/' },
    { name: 'AlUla to Jeddah', href: '/routes/alula-jeddah/' },

    { name: 'Yanbu to Jeddah', href: '/routes/yanbu-jeddah/' },
    { name: 'Dammam to Jeddah', href: '/routes/dammam-jeddah/' },
    { name: 'Dammam to Makkah', href: '/routes/dammam-makkah/' },
    { name: 'Dammam to Madinah', href: '/routes/dammam-madinah/' },
    { name: 'Khobar to Bahrain', href: '/routes/khobar-bahrain/' },
    { name: 'Riyadh to Dubai', href: '/routes/riyadh-dubai/' },
    { name: 'Riyadh to Doha', href: '/routes/riyadh-doha/' },
    { name: 'Riyadh to Kuwait City', href: '/routes/riyadh-kuwait/' },
    { name: 'Riyadh to Muscat', href: '/routes/riyadh-muscat/' },
    { name: 'Riyadh to Amman', href: '/routes/riyadh-amman/' },
    { name: 'Riyadh to Bahrain', href: '/routes/riyadh-bahrain/' },
    { name: 'Riyadh to Sharjah', href: '/routes/riyadh-sharjah/' },
    { name: 'Riyadh to Abu Dhabi', href: '/routes/riyadh-abu-dhabi/' },
    { name: 'Dammam to Bahrain', href: '/routes/dammam-bahrain/' },
    { name: 'Dammam to Dubai', href: '/routes/dammam-dubai/' },

    { name: 'Dammam to Doha', href: '/routes/dammam-doha/' },
    { name: 'Dammam to Kuwait City', href: '/routes/dammam-kuwait/' },
    { name: 'Dammam to Muscat', href: '/routes/dammam-muscat/' },
    { name: 'Dammam to Sharjah', href: '/routes/dammam-sharjah/' },
    { name: 'Dammam to Abu Dhabi', href: '/routes/dammam-abu-dhabi/' },
    { name: 'Jeddah to Bahrain', href: '/routes/jeddah-bahrain/' },
    { name: 'Jeddah to Dubai', href: '/routes/jeddah-dubai/' },
    { name: 'Jeddah to Doha', href: '/routes/jeddah-doha/' },
    { name: 'Jeddah to Kuwait City', href: '/routes/jeddah-kuwait/' },
    { name: 'Jeddah to Muscat', href: '/routes/jeddah-muscat/' },
    { name: 'Jeddah to Amman', href: '/routes/jeddah-amman/' },
    { name: 'Jeddah to Sharjah', href: '/routes/jeddah-sharjah/' },
    { name: 'Jeddah to Abu Dhabi', href: '/routes/jeddah-abu-dhabi/' },
    { name: 'Madinah to Dubai', href: '/routes/madinah-dubai/' },
    { name: 'Madinah to Doha', href: '/routes/madinah-doha/' },

    { name: 'Madinah to Bahrain', href: '/routes/madinah-bahrain/' },
    { name: 'Madinah to Kuwait City', href: '/routes/madinah-kuwait/' },
    { name: 'Madinah to Muscat', href: '/routes/madinah-muscat/' },
    { name: 'Makkah to Dubai', href: '/routes/makkah-dubai/' },
    { name: 'Makkah to Doha', href: '/routes/makkah-doha/' },
    { name: 'Makkah to Bahrain', href: '/routes/makkah-bahrain/' },
    { name: 'Makkah to Kuwait City', href: '/routes/makkah-kuwait/' },
    { name: 'Makkah to Muscat', href: '/routes/makkah-muscat/' },
    { name: 'Tabuk to Madinah', href: '/routes/tabuk-madinah/' },
    { name: 'Tabuk to Makkah', href: '/routes/tabuk-makkah/' },
    { name: 'Tabuk to Riyadh', href: '/routes/tabuk-riyadh/' },
    { name: 'Tabuk to Jeddah', href: '/routes/tabuk-jeddah/' },
    { name: 'Tabuk to Dammam', href: '/routes/tabuk-dammam/' },
    { name: 'Jeddah Train Station Taxi', href: '/routes/jeddah-train-station-taxi/' },
    { name: 'Madinah Train Station Taxi', href: '/routes/madinah-train-station-taxi/' },
];

export default function HomeRouteDirectory() {
    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                    The most popular transfers
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
                    {ROUTES.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className="block text-sm text-gray-600 hover:text-primary hover:underline truncate"
                            title={route.name}
                        >
                            {route.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-8">
                    <Link href="/routes/" className="text-sm font-semibold text-primary hover:underline">
                        View all 50+ routes →
                    </Link>
                </div>
            </div>
        </section>
    );
}
