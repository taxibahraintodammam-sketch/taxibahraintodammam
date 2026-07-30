"use client";

import Link from 'next/link';

const TRIPS: { name: string; href: string }[] = [
    { name: 'Jeddah Corniche: Private day trip', href: '/locations/jeddah/corniche/' },
    { name: 'Al-Balad Old Jeddah: Private day trip', href: '/locations/jeddah/al-balad/' },
    { name: 'Obhur Beach: Private day trip', href: '/locations/jeddah/obhur/' },
    { name: 'Jeddah Islamic Port: Private day trip', href: '/locations/jeddah/islamic-port/' },
    { name: 'Al Hamra Jeddah: Private day trip', href: '/locations/jeddah/al-hamra/' },
    { name: 'KAEC Transfer: Private day trip', href: '/locations/jeddah/kaec-transfer/' },
    { name: 'Jabal Omar Makkah: Private day trip', href: '/locations/makkah/jabal-omar/' },
    { name: 'Misfalah Makkah: Private day trip', href: '/locations/makkah/misfalah/' },
    { name: 'Aziziyah Makkah: Private day trip', href: '/locations/makkah/aziziyah/' },
    { name: 'Makkah Train Station: Private day trip', href: '/locations/makkah/train-station/' },
    { name: 'Jarwal Makkah: Private day trip', href: '/locations/makkah/jarwal/' },
    { name: 'Kudai Makkah: Private day trip', href: '/locations/makkah/kudai/' },
    { name: 'Quba Mosque Madinah: Private day trip', href: '/locations/madinah/quba/' },
    { name: 'Mount Uhud Madinah: Private day trip', href: '/locations/madinah/uhud/' },
    { name: 'Qiblatain Mosque: Private day trip', href: '/locations/madinah/qiblatain/' },

    { name: 'Madinah Train Station: Private day trip', href: '/locations/madinah/train-station/' },
    { name: 'Sultana Madinah: Private day trip', href: '/locations/madinah/sultana/' },
    { name: 'Madinah Central Area: Private day trip', href: '/locations/madinah/central-area/' },
    { name: 'Diriyah Riyadh: Private day trip', href: '/locations/riyadh/diriyah/' },
    { name: 'Olaya Riyadh: Private day trip', href: '/locations/riyadh/olaya/' },
    { name: 'Boulevard World Riyadh: Private day trip', href: '/locations/riyadh/boulevard-world/' },
    { name: 'Bujairi Terrace: Private day trip', href: '/locations/riyadh/bujairi-terrace/' },
    { name: 'Diplomatic Quarter Riyadh: Private day trip', href: '/locations/riyadh/diplomatic-quarter/' },
    { name: 'KAFD Riyadh: Private day trip', href: '/locations/riyadh/kafd/' },
    { name: 'Riyadh Front: Private day trip', href: '/locations/riyadh/front/' },
    { name: 'Al Hada Taif: Private day trip', href: '/locations/taif/al-hada/' },
    { name: 'Al Shafa Taif: Private day trip', href: '/locations/taif/al-shafa/' },
    { name: 'Miqat Qarn Al Manazil: Private day trip', href: '/locations/taif/miqat-qarn-al-manazil/' },
    { name: 'Elephant Rock AlUla: Private day trip', href: '/locations/alula/elephant-rock/' },
    { name: 'Hegra AlUla: Private day trip', href: '/locations/alula/hegra/' },

    { name: 'Al Khobar Corniche: Private day trip', href: '/locations/al-khobar/corniche/' },
    { name: 'Half Moon Bay: Private day trip', href: '/locations/al-khobar/half-moon-bay/' },
    { name: 'Dammam Corniche: Private day trip', href: '/locations/dammam/corniche/' },
    { name: 'Ithra Dhahran: Private day trip', href: '/locations/dhahran/ithra/' },
    { name: 'Jubail: Private day trip', href: '/locations/jubail/' },
    { name: 'Yanbu Red Sea: Private day trip', href: '/locations/yanbu/' },
    { name: 'Abha: Private day trip', href: '/locations/abha/' },
    { name: 'Khamis Mushait: Private day trip', href: '/locations/khamis-mushait/' },
    { name: 'Jizan: Private day trip', href: '/locations/jizan/' },
    { name: 'Najran: Private day trip', href: '/locations/najran/' },
    { name: 'Al Bahah: Private day trip', href: '/locations/al-bahah/' },
    { name: 'Bishah: Private day trip', href: '/locations/bishah/' },
    { name: 'Baljurashi: Private day trip', href: '/locations/baljurashi/' },
    { name: 'Sabya: Private day trip', href: '/locations/sabya/' },
    { name: 'Buraidah: Private day trip', href: '/locations/buraidah/' },

    { name: 'Hail: Private day trip', href: '/locations/hail/' },
    { name: 'Al Kharj: Private day trip', href: '/locations/al-kharj/' },
    { name: 'Unaizah: Private day trip', href: '/locations/unaizah/' },
    { name: 'Sakaka: Private day trip', href: '/locations/sakaka/' },
    { name: 'Al Ahsa: Private day trip', href: '/locations/al-ahsa/' },
    { name: 'Hafar Al Batin: Private day trip', href: '/locations/hafar-al-batin/' },
    { name: 'Rabigh: Private day trip', href: '/locations/rabigh/' },
    { name: 'Al Wajh: Private day trip', href: '/locations/al-wajh/' },
    { name: 'Khulais: Private day trip', href: '/locations/khulais/' },
    { name: 'Umluj: Private day trip', href: '/locations/umluj/' },
    { name: 'Duba: Private day trip', href: '/locations/duba/' },
    { name: 'NEOM: Private day trip', href: '/locations/neom/' },
    { name: 'Dawadmi: Private day trip', href: '/locations/dawadmi/' },
    { name: 'Tayma: Private day trip', href: '/locations/tayma/' },
    { name: 'Khaybar Fort: Private day trip', href: '/locations/khayber-fort/' },
];

export default function HomeDayTripDirectory() {
    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                    The most popular Taxi Service KSA
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
                    {TRIPS.map((trip) => (
                        <Link
                            key={trip.href}
                            href={trip.href}
                            className="block text-sm text-gray-600 hover:text-primary hover:underline truncate"
                            title={trip.name}
                        >
                            {trip.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-8">
                    <Link href="/locations/" className="text-sm font-semibold text-primary hover:underline">
                        View all destinations →
                    </Link>
                </div>
            </div>
        </section>
    );
}
