"use client";

import React from 'react';
import { Globe2 } from 'lucide-react';
import Image from 'next/image';

export default function GlobalTrust() {
    // Top 30+ countries frequenting Saudi Arabia for Umrah/Tourism
    const countries = [
        { name: "Saudi Arabia", code: "sa" },
        { name: "United Kingdom", code: "gb" },
        { name: "United States", code: "us" },
        { name: "Pakistan", code: "pk" },
        { name: "Indonesia", code: "id" },
        { name: "India", code: "in" },
        { name: "Malaysia", code: "my" },
        { name: "Turkey", code: "tr" },
        { name: "Egypt", code: "eg" },
        { name: "UAE", code: "ae" },
        { name: "Kuwait", code: "kw" },
        { name: "Qatar", code: "qa" },
        { name: "Oman", code: "om" },
        { name: "Bahrain", code: "bh" },
        { name: "Jordan", code: "jo" },
        { name: "Iraq", code: "iq" },
        { name: "Bangladesh", code: "bd" },
        { name: "Algeria", code: "dz" },
        { name: "Morocco", code: "ma" },
        { name: "Tunisia", code: "tn" },
        { name: "France", code: "fr" },
        { name: "Germany", code: "de" },
        { name: "Canada", code: "ca" },
        { name: "Australia", code: "au" },
        { name: "Singapore", code: "sg" },
        { name: "South Africa", code: "za" },
        { name: "Nigeria", code: "ng" },
        { name: "Netherlands", code: "nl" },
        { name: "Belgium", code: "be" },
        { name: "Spain", code: "es" },
        { name: "Italy", code: "it" },
        { name: "Russia", code: "ru" },
        { name: "China", code: "cn" },
        { name: "Japan", code: "jp" },
        { name: "South Korea", code: "kr" },
        { name: "Uzbekistan", code: "uz" },
        { name: "Kazakhstan", code: "kz" },
        { name: "Azerbaijan", code: "az" }
    ];

    // Triplicate list for smoother infinite scroll on wide screens
    const scrollList = [...countries, ...countries, ...countries];

    return (
        <section className="py-8 sm:py-10 bg-gray-50 border-b border-gray-200 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <div className="inline-flex items-center gap-2 text-gray-500 font-medium text-xs sm:text-sm uppercase tracking-widest mb-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                    <Globe2 className="w-4 h-4 text-primary" />
                    <span>International Reach</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Trusted by Pilgrims from <span className="text-primary">Global Nations</span> for Taxi Service in Saudi Arabia
                </h3>
                <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Join thousands of satisfied international travelers who rely on our premium fleet for seamless Airport and Umrah transfers.
                </p>
            </div>

            {/* Scrolling Marquee */}
            <div className="relative w-full flex overflow-x-hidden group/marquee">
                <div className="flex animate-marquee whitespace-nowrap py-2 sm:py-4">
                    {scrollList.map((country, index) => (
                        <div
                            key={`${country.name}-${index}`}
                            className="mx-4 sm:mx-8 flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 cursor-default group hover:shadow-md transition-all duration-300"
                        >
                            <div className="relative w-8 h-6 sm:w-10 sm:h-7 shadow-sm rounded-sm overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                <Image
                                    src={`https://flagcdn.com/w80/${country.code}.png`}
                                    alt={`${country.name} flag`}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-sm sm:text-base font-bold text-gray-700 group-hover:text-primary transition-colors">
                                {country.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap py-2 sm:py-4">
                    {scrollList.map((country, index) => (
                        <div
                            key={`${country.name}-${index}-dup`}
                            className="mx-4 sm:mx-8 flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 cursor-default group hover:shadow-md transition-all duration-300"
                        >
                            <div className="relative w-8 h-6 sm:w-10 sm:h-7 shadow-sm rounded-sm overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                <Image
                                    src={`https://flagcdn.com/w80/${country.code}.png`}
                                    alt={`${country.name} flag`}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-sm sm:text-base font-bold text-gray-700 group-hover:text-primary transition-colors">
                                {country.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent pointer-events-none z-10"></div>
        </section>
    );
}
