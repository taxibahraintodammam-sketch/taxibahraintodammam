'use client';

import { useState } from 'react';
import FleetCard from '@/components/FleetCard';
import { SlidersHorizontal } from 'lucide-react';

interface Vehicle {
    name: string;
    type: string;
    image: string;
    passengers: number;
    luggage: number;
    features: string[];
    href: string;
    category: string;
}

interface FleetListingProps {
    fleet: Vehicle[];
}

export default function FleetListing({ fleet }: FleetListingProps) {
    const [filter, setFilter] = useState('All');
    const filteredFleet = filter === 'All' ? fleet : fleet.filter(v => v.category === filter);
    const categories = ['All', 'Luxury', 'Economy', 'Group'];

    return (
        <>
            {/* Filter Bar */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <SlidersHorizontal className="w-4 h-4" /> Filter Vehicles:
                    </div>
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg overflow-x-auto max-w-full">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-300 ${filter === cat
                                    ? 'bg-white text-black shadow-md scale-105'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="hidden sm:block text-sm text-gray-400">
                        Showing {filteredFleet.length} vehicles
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFleet.map((vehicle, index) => (
                        <div key={index} className="transform hover:-translate-y-2 transition-transform duration-500">
                            <FleetCard {...vehicle} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
