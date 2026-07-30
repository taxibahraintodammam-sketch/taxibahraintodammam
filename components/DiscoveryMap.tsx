'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Utensils, Car, Info, X, ArrowRight, Building, Landmark, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface Hotspot {
    id: string;
    x: number; // percentage from left
    y: number; // percentage from top
    title: string;
    description: string;
    category: 'religious' | 'food' | 'taxi' | 'town' | 'business';
    image?: string;
    link?: string;
}

const cityData: Record<string, { hotspots: Hotspot[], image: string, title: string, description: string }> = {
    makkah: {
        title: 'Makkah Discovery Hub',
        description: 'Explore sacred sites, best dining spots, and key transport zones in the Holy City.',
        image: '/makkah-discovery-map.png',
        hotspots: [
            { id: 'haram', x: 48, y: 55, title: 'Masjid al-Haram', description: 'The holiest site in Islam, housing the Kaaba.', category: 'religious', link: '/guides/makkah-umrah-guide' },
            { id: 'al-baik', x: 40, y: 65, title: 'Al Baik (Jabal Omar)', description: 'Most popular fast-food chain in KSA.', category: 'food' },
            { id: 'clock-tower', x: 78, y: 35, title: 'Abraj Al Bait', description: 'Iconic clock tower with luxury hotels.', category: 'town' },
            { id: 'ajyad-tunnel', x: 65, y: 60, title: 'Ajyad Taxi Zone', description: 'Primary underground drop-off for Clock Tower hotels.', category: 'taxi' },
            { id: 'jabal-nour', x: 20, y: 20, title: 'Jabal al-Nour', description: 'The Mountain of Light, where Hira cave is located.', category: 'religious', link: '/locations/makkah-ziyarat' },
            { id: 'aziziyah', x: 80, y: 80, title: 'Aziziyah District', description: 'Great for budget stays and pilgrims.', category: 'town' },
            { id: 'kudai-parking', x: 25, y: 85, title: 'Kudai Bus/Taxi Hub', description: 'Key transport center for shuttle buses.', category: 'taxi' }
        ]
    },
    madinah: {
        title: 'Madinah Heritage Hub',
        description: 'Discover the City of the Prophet ﷺ: Sacred landmarks and historical Ziyarat nodes.',
        image: '/madinah-discovery-map.png',
        hotspots: [
            { id: 'nabawi', x: 51, y: 48, title: 'Masjid an-Nabawi', description: "The Prophet's Mosque. The spiritual heart of Madinah.", category: 'religious', link: '/locations/madinah' },
            { id: 'quba', x: 65, y: 75, title: 'Masjid Quba', description: 'The first mosque in Islam. High spiritual reward for visiting.', category: 'religious' },
            { id: 'uhud', x: 40, y: 20, title: 'Mount Uhud', description: "Site of the Battle of Uhud and Martyrs' Cemetery.", category: 'religious', link: '/locations/madinah' },
            { id: 'date-farms', x: 15, y: 60, title: 'Madinah Date Farms', description: 'Famous for Ajwa dates and peaceful gardens.', category: 'town' },
            { id: 'hhr-madinah', x: 85, y: 30, title: 'Haramain Train Station', description: 'High-speed rail link to Makkah and Jeddah.', category: 'taxi' },
            { id: 'central-zone', x: 55, y: 60, title: 'Markaziyah (Central)', description: 'Hotel zone surrounding the Prophet\'s Mosque.', category: 'town' }
        ]
    },
    riyadh: {
        title: 'Riyadh Executive Hub',
        description: 'Navigate the business capital: KAFD, luxury landmarks, and corporate zones.',
        image: '/riyadh-discovery-map.png',
        hotspots: [
            { id: 'kingdom', x: 72, y: 38, title: 'Kingdom Centre', description: 'Luxury shopping and iconic 300m Sky Bridge.', category: 'town' },
            { id: 'kafd', x: 45, y: 32, title: 'KAFD', description: 'Saudi Arabia\'s futuristic financial district.', category: 'business' },
            { id: 'faisaliah', x: 60, y: 55, title: 'Al Faisaliah Tower', description: 'Elegant glass pyramid tower with fine dining.', category: 'town' },
            { id: 'ruh-airport', x: 85, y: 15, title: 'King Khalid Airport', description: 'Primary international entry gateway to Riyadh.', category: 'taxi' },
            { id: 'boulevard', x: 25, y: 65, title: 'Boulevard City', description: 'The entertainment heart of Riyadh Season.', category: 'food' },
            { id: 'diplomatic', x: 15, y: 80, title: 'Diplomatic Quarter', description: 'The base for international embassies and greenery.', category: 'business' }
        ]
    }
};

const categories = [
    { id: 'all', label: 'All Places', icon: MapPin },
    { id: 'religious', label: 'Sacred Sites', icon: Landmark },
    { id: 'business', label: 'Business Nodes', icon: Briefcase },
    { id: 'food', label: 'Dining', icon: Utensils },
    { id: 'taxi', label: 'Taxi Zones', icon: Car },
    { id: 'town', label: 'Districts', icon: Info },
];

export default function DiscoveryMap({ city = 'makkah' }: { city?: 'makkah' | 'madinah' | 'riyadh' }) {
    const [mounted, setMounted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-[600px] bg-black" />; // Loading placeholder
    }

    const currentCityData = cityData[city] || cityData['makkah'];
    const filteredHotspots = selectedCategory === 'all'
        ? currentCityData.hotspots
        : currentCityData.hotspots.filter(h => h.category === selectedCategory);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
                        {currentCityData.title}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {currentCityData.description}
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setSelectedCategory(cat.id);
                                setActiveHotspot(null);
                            }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300",
                                selectedCategory === cat.id
                                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                            )}
                        >
                            {React.createElement(cat.icon, { className: "w-4 h-4" })}
                            <span className="font-semibold text-sm">{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Map Container */}
                <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                    <Image
                        src={currentCityData.image}
                        alt={`${city} Discovery Map`}
                        fill
                        className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hotspots Overlay */}
                    <div className="absolute inset-0">
                        {filteredHotspots.map((spot) => (
                            <div
                                key={spot.id}
                                className="absolute transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                            >
                                <button
                                    onClick={() => setActiveHotspot(spot)}
                                    className={cn(
                                        "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 custom-pulse",
                                        spot.category === 'religious' ? "bg-amber-500" :
                                            spot.category === 'food' ? "bg-red-500" :
                                                spot.category === 'taxi' ? "bg-emerald-500" :
                                                    spot.category === 'business' ? "bg-indigo-500" : "bg-blue-500",
                                        activeHotspot?.id === spot.id ? "scale-150 ring-4 ring-white/50" : "hover:scale-125"
                                    )}
                                >
                                    <span className="absolute inset-0 rounded-full animate-ping opacity-75 ring-2 ring-white" />
                                    {spot.category === 'religious' && <Landmark className="w-4 h-4 text-white" />}
                                    {spot.category === 'food' && <Utensils className="w-4 h-4 text-white" />}
                                    {spot.category === 'taxi' && <Car className="w-4 h-4 text-white" />}
                                    {spot.category === 'town' && <Info className="w-4 h-4 text-white" />}
                                    {spot.category === 'business' && <Briefcase className="w-4 h-4 text-white" />}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Info Card (active hotspot) */}
                    {activeHotspot && (
                        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white text-black rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300 backdrop-blur-md border border-white/20">
                            <button
                                onClick={() => setActiveHotspot(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="inline-block px-2 py-1 rounded bg-gray-100 text-[10px] font-bold uppercase tracking-wider mb-2">
                                {activeHotspot.category}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{activeHotspot.title}</h3>
                            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                {activeHotspot.description}
                            </p>

                            <div className="flex flex-col gap-2">
                                <Link href="/booking/" className="w-full">
                                    <Button className="w-full bg-black text-white hover:bg-black/90 rounded-xl group">
                                        Book Taxi Here
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                {activeHotspot.link && (
                                    <Link href={activeHotspot.link} className="w-full">
                                        <Button variant="outline" className="w-full border-black/10 hover:bg-gray-50 rounded-xl">
                                            Read Guide
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Map Legend (Mobile) */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-medium text-gray-500 uppercase tracking-widest md:hidden">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500" /> Sacred</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Dining</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Taxi</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Business</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> District</div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(0.95); }
                }
                .custom-pulse {
                    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}} />
        </section>
    );
}
