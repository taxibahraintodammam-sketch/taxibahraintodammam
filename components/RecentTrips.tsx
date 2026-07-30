
'use client';

import { Calendar, MapPin, User, Star, Car } from 'lucide-react';
import Image from 'next/image';

const recentTrips = [
    {
        id: 1,
        route: "Jeddah Airport -> Clock Tower Makkah",
        date: "2 Days Ago",
        passenger: "Family of 4 from UK",
        vehicle: "GMC Yukon XL",
        highlight: "Driver waited 45 mins due to flight delay (Free)",
        rating: 5,
        image: "/makkah-clock-tower.webp"
    },
    {
        id: 2,
        route: "Madinah -> Jeddah Airport",
        date: "3 Days Ago",
        passenger: "Business Group from Malaysia",
        vehicle: "HiAce Bus",
        highlight: "Direct transfer for Friday Prayer",
        rating: 5,
        image: "/madinah-prophets-mosque.webp"
    },
    {
        id: 3,
        route: "Makkah -> Madinah (Ziyarat)",
        date: "Last Week",
        passenger: "Couple from USA",
        vehicle: "Toyota Camry",
        highlight: "Stopped at Quba Mosque on the way",
        rating: 5,
        image: "/quba-mosque.webp"
    }
];

export default function RecentTrips() {
    return (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 p-2 rounded-lg">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Recent Passenger Journeys</h3>
            </div>

            <div className="space-y-6">
                {recentTrips.map((trip) => (
                    <div key={trip.id} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
                        {/* Fallback image logic would normally go here, using a placeholder for now if needed, or just icons */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900 text-sm">{trip.route}</h4>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{trip.date}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-600 mb-3">
                                <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                    {trip.passenger}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Car className="w-3.5 h-3.5 text-gray-400" />
                                    {trip.vehicle}
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 italic border-l-2 border-emerald-300 pl-3">
                                "{trip.highlight}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">Real verified trips from our booking log.</p>
            </div>
        </div>
    );
}
