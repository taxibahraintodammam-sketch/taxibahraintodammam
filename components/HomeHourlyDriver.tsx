"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function HomeHourlyDriver() {
    return (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="bg-gray-950 rounded-3xl p-8 sm:p-10 flex flex-col justify-center min-h-[320px] sm:min-h-[420px]">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
                        Hire a private driver by the hour.
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-3">
                        The most flexible car service you can imagine. A professional, licensed driver at your service, for as long as you need.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Perfect for business meetings, exploring a city, or a fully custom itinerary — fixed hourly rates, no surge pricing.
                    </p>
                    <Link href="/services/private-driver/" className="w-fit">
                        <span className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold rounded-full px-6 py-3 transition-colors">
                            Learn more
                        </span>
                    </Link>
                </div>

                <div className="relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[420px]">
                    <Image
                        src="/chauffeur-service.png"
                        alt="Professional chauffeur greeting a family for an hourly private driver service in Saudi Arabia"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </div>
        </section>
    );
}
