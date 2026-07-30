"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Map, Clock, Zap, ExternalLink } from 'lucide-react';

const TrustedTransportNetwork = () => {
    return (
        <section className="py-16 md:py-24 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-12 items-start">

                    {/* Left Column: Brand Authority Narrative (The "Partial Match" Bridge) */}
                    <div className="w-full md:w-1/2 prose prose-lg">
                        <span className="bg-primary/10 text-primary-dark font-bold tracking-wider uppercase text-xs px-3 py-1 rounded-full mb-4 inline-block">
                            Official Transport Partner
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Why <span className="text-primary decoration-primary/30 underline decoration-4 underline-offset-4">TaxiServiceKSA</span> is the Trusted Choice Across Saudi Arabia &amp; the GCC
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            Whether you're performing Umrah, connecting between business hubs, or crossing into a neighbouring
                            GCC country, <strong>TaxiServiceKSA</strong> isn't just a generic ride-booking platform — we are a
                            dedicated transport network covering <Link href="/locations/makkah/" className="text-primary hover:underline font-semibold">Makkah</Link>, <Link href="/locations/madinah/" className="text-primary hover:underline font-semibold">Madinah</Link>, <Link href="/locations/riyadh/" className="text-primary hover:underline font-semibold">Riyadh</Link>, <Link href="/locations/dammam/" className="text-primary hover:underline font-semibold">Dammam</Link>, and cross-border routes into the GCC.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-base mt-4">
                            Unlike standard taxi apps, our drivers understand the <em>Miqat</em> locations and Haram drop-off
                            points for pilgrims, the business districts for executive travel, and the paperwork needed for
                            <strong> Saudi-Bahrain, Saudi-UAE, and other GCC border crossings</strong> — all with guaranteed
                            fixed pricing.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-6 h-6 text-emerald-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Official License</h3>
                                    <p className="text-xs text-gray-500">Ministry of Transport Certified</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="w-6 h-6 text-emerald-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Prayer-Time Synced</h3>
                                    <p className="text-xs text-gray-500">Schedules aligned with Salah</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The "Hub" Visualization (Visualizing the connections) */}
                    <div className="w-full md:w-1/2 bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Map className="w-64 h-64" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-6 relative z-10">High-Frequency Corridors</h3>

                        <div className="space-y-4 relative z-10">
                            {/* Route 1: Jeddah -> Makkah */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-primary/50 transition-all group cursor-pointer">
                                <Link href="/routes/jeddah-makkah/" className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                            <div className="h-8 w-0.5 bg-gray-200"></div>
                                            <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 font-medium">Most Popular Route</div>
                                            <div className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                                                Jeddah Airport <span className="text-gray-400 mx-2">→</span> Makkah
                                            </div>
                                        </div>
                                    </div>
                                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                                </Link>
                            </div>

                            {/* Route 2: Makkah -> Madinah */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-primary/50 transition-all group cursor-pointer">
                                <Link href="/routes/makkah-madinah/" className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                            <div className="h-8 w-0.5 bg-gray-200"></div>
                                            <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 font-medium">The Hijrah Route</div>
                                            <div className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                                                Makkah <span className="text-gray-400 mx-2">→</span> Madinah
                                            </div>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-gray-400" />
                                </Link>
                            </div>

                            {/* Route 3: Madinah -> Jeddah */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-primary/50 transition-all group cursor-pointer">
                                <Link href="/routes/madinah-jeddah/" className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                            <div className="h-8 w-0.5 bg-gray-200"></div>
                                            <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 font-medium">Return Journey</div>
                                            <div className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                                                Madinah <span className="text-gray-400 mx-2">→</span> Jeddah Airport
                                            </div>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-gray-400" />
                                </Link>
                            </div>

                            {/* Route 4: Dammam -> Bahrain (GCC) */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-primary/50 transition-all group cursor-pointer">
                                <Link href="/routes/dammam-bahrain/" className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                            <div className="h-8 w-0.5 bg-gray-200"></div>
                                            <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 font-medium">GCC Border Crossing</div>
                                            <div className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                                                Dammam <span className="text-gray-400 mx-2">→</span> Bahrain
                                            </div>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-gray-400" />
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TrustedTransportNetwork;
