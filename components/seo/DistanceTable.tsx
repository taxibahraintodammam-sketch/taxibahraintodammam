import React from 'react';
import { MapPin, Clock, Car } from 'lucide-react';

interface LocationDistance {
    destination: string;
    distance: string;
    time: string;
    route?: string;
}

export interface DistanceTableLabels {
    title: string;
    subtitle: string;
    destinationHeader: string;
    distanceHeader: string;
    timeHeader: string;
    routeHeader: string;
    disclaimer: string;
}

interface DistanceTableProps {
    origin: string;
    locations: LocationDistance[];
    labels?: DistanceTableLabels;
    isRtl?: boolean;
}

export default function DistanceTable({ origin, locations, labels, isRtl = false }: DistanceTableProps) {
    const defaultLabels: DistanceTableLabels = {
        title: `Average Traveler Times from ${origin}`,
        subtitle: "Estimated travel times and distances for taxi planning",
        destinationHeader: "Destination",
        distanceHeader: "Distance (approx.)",
        timeHeader: "Est. Taxi Time",
        routeHeader: "Route",
        disclaimer: "*Times may vary based on traffic conditions (especially during Ramadan & Hajj seasons)."
    };

    const t = { ...defaultLabels, ...labels };

    return (
        <div className={`overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white my-8 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    {labels?.title || `Average Traveler Times from ${origin}`}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    {t.subtitle}
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50/50 text-gray-900 font-semibold border-b border-gray-200">
                        <tr>
                            <th className={`px-6 py-4 ${isRtl ? 'text-right' : 'text-left'}`}>{t.destinationHeader}</th>
                            <th className={`px-6 py-4 ${isRtl ? 'text-right' : 'text-left'}`}>{t.distanceHeader}</th>
                            <th className={`px-6 py-4 ${isRtl ? 'text-right' : 'text-left'}`}>{t.timeHeader}</th>
                            <th className={`px-6 py-4 hidden sm:table-cell ${isRtl ? 'text-right' : 'text-left'}`}>{t.routeHeader}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {locations.map((loc, index) => (
                            <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    {loc.destination}
                                </td>
                                <td className="px-6 py-4">{loc.distance}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded inline-block text-xs font-semibold">
                                        <Clock className="w-3 h-3" />
                                        {loc.time}
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden sm:table-cell text-gray-500">{loc.route || 'Direct Highway'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 text-center">
                {t.disclaimer}
            </div>
        </div>
    );
}
