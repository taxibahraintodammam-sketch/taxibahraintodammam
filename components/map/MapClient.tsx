'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin, Landmark, Utensils, Building, Car, Navigation, X, Layers, Compass, Plane, Briefcase, Locate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import WhatsAppIcon from '@/components/WhatsAppIcon';

import 'leaflet/dist/leaflet.css';

// --- Types ---
type Category = 'all' | 'religious' | 'hotel' | 'dining' | 'transport' | 'shopping' | 'business';
type City = 'makkah' | 'madinah' | 'jeddah' | 'riyadh';

interface Location {
    id: string;
    name: string;
    category: Category;
    lat: number;
    lng: number;
    description: string;
}

// --- Data ---
const CITIES: Record<City, { center: [number, number], zoom: number, locations: Location[] }> = {
    makkah: {
        center: [21.4225, 39.8262],
        zoom: 14,
        locations: [
            { id: 'haram', name: 'Al Masjid Al Haram', category: 'religious', lat: 21.4225, lng: 39.8262, description: 'The holiest mosque in Islam, housing the Kaaba.' },
            { id: 'jabal-nour', name: 'Jabal Al-Nour (Hira)', category: 'religious', lat: 21.4568, lng: 39.8587, description: 'Mountain housing Hira Cave, site of first revelation.' },
            { id: 'jabal-thawr', name: 'Jabal Thawr', category: 'religious', lat: 21.3789, lng: 39.8456, description: 'Cave where Prophet (PBUH) hid during migration.' },
            { id: 'masjid-aisha', name: 'Masjid Aisha (Taneem)', category: 'religious', lat: 21.4682, lng: 39.7994, description: 'Nearest Miqat point for residents of Makkah.' },
            { id: 'clock-tower', name: 'Abraj Al Bait', category: 'hotel', lat: 21.4197, lng: 39.8263, description: 'Fairmont Hotel and iconic Clock Tower complex.' },
            { id: 'makkah-mall', name: 'Makkah Mall', category: 'shopping', lat: 21.4055, lng: 39.8885, description: 'Premier shopping destination with international brands.' },
            { id: 'train-station', name: 'Haramain Train Station', category: 'transport', lat: 21.4265, lng: 39.7891, description: 'High-speed rail station connecting Makkah to Jeddah/Madinah.' },
        ]
    },
    madinah: {
        center: [24.4672, 39.6102],
        zoom: 14,
        locations: [
            { id: 'nabawi', name: 'Al Masjid An Nabawi', category: 'religious', lat: 24.4672, lng: 39.6102, description: 'The Prophet\'s Mosque, spiritual heart of Madinah.' },
            { id: 'quba', name: 'Masjid Quba', category: 'religious', lat: 24.4390, lng: 39.6173, description: 'The first mosque built in Islamic history.' },
            { id: 'uhud', name: 'Mount Uhud', category: 'religious', lat: 24.5034, lng: 39.6117, description: 'Site of the Battle of Uhud and Martyrs Cemetery.' },
            { id: 'qiblatain', name: 'Masjid Al Qiblatain', category: 'religious', lat: 24.4843, lng: 39.5786, description: 'Mosque where the prayer direction was changed.' },
        ]
    },
    jeddah: {
        center: [21.5433, 39.1728],
        zoom: 12,
        locations: [
            { id: 'kaia', name: 'Jeddah Airport (KAIA)', category: 'transport', lat: 21.6796, lng: 39.1565, description: 'King Abdulaziz International Airport.' },
            { id: 'corniche', name: 'Jeddah Corniche', category: 'dining', lat: 21.5830, lng: 39.1082, description: 'Beautiful waterfront with fountains and restaurants.' },
            { id: 'balad', name: 'Al Balad (Historic)', category: 'religious', lat: 21.4901, lng: 39.1856, description: 'UNESCO World Heritage site with ancient architecture.' },
        ]
    },
    riyadh: {
        center: [24.7136, 46.6753],
        zoom: 11,
        locations: [
            { id: 'kingdom-centre', name: 'Kingdom Centre', category: 'business', lat: 24.7114, lng: 46.6744, description: 'Iconic skyscraper with skybridge and luxury mall.' },
            { id: 'boulevard', name: 'Riyadh Boulevard', category: 'dining', lat: 24.7675, lng: 46.6114, description: 'Entertainment and dining hub of Riyadh Season.' },
            { id: 'kafd', name: 'KAFD', category: 'business', lat: 24.7618, lng: 46.6393, description: 'King Abdullah Financial District.' },
        ]
    }
};

// --- Icons Helper ---
const createCustomIcon = (category: Category) => {
    let IconComponent = MapPin;
    let colorClass = 'text-gray-700';
    let bgClass = 'bg-white';

    switch (category) {
        case 'religious': IconComponent = Landmark; colorClass = 'text-amber-600'; bgClass = 'bg-amber-50'; break;
        case 'hotel': IconComponent = Building; colorClass = 'text-indigo-600'; bgClass = 'bg-indigo-50'; break;
        case 'dining': IconComponent = Utensils; colorClass = 'text-red-600'; bgClass = 'bg-red-50'; break;
        case 'transport': IconComponent = Plane; colorClass = 'text-blue-600'; bgClass = 'bg-blue-50'; break;
        case 'shopping': IconComponent = Compass; colorClass = 'text-pink-600'; bgClass = 'bg-pink-50'; break;
        case 'business': IconComponent = Briefcase; colorClass = 'text-slate-600'; bgClass = 'bg-slate-50'; break;
    }

    const html = renderToStaticMarkup(
        <div className={`w-9 h-9 rounded-full ${bgClass} border-2 border-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200`}>
            <IconComponent className={`w-5 h-5 ${colorClass}`} />
        </div>
    );

    return L.divIcon({
        html: html,
        className: 'custom-marker-icon',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
    });
};

// --- Components ---

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
    }, [center, zoom, map]);
    return null;
}

export default function MapClient() {
    const [activeCity, setActiveCity] = useState<City>('makkah');
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    // Real Routing State
    const [routePolyline, setRoutePolyline] = useState<[number, number][] | null>(null);
    const [routeInfo, setRouteInfo] = useState<{ distance: number, duration: number, price: number } | null>(null);
    const [loadingRoute, setLoadingRoute] = useState(false);

    const currentCityData = CITIES[activeCity];

    // Fetch Real Route when location selected
    useEffect(() => {
        if (!selectedLocation) {
            setRoutePolyline(null);
            setRouteInfo(null);
            return;
        }

        const fetchRoute = async () => {
            setLoadingRoute(true);
            try {
                // Using City Center as Start Point (In real app, use User Location)
                const start = currentCityData.center;
                const end = [selectedLocation.lat, selectedLocation.lng];

                // OSRM Public API
                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
                );
                const data = await response.json();

                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0];

                    // Decode GeoJSON to LatLng path
                    const coords = route.geometry.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);
                    setRoutePolyline(coords);

                    // Calculate Real Stats
                    const distanceKm = (route.distance / 1000).toFixed(1);
                    const durationMins = Math.round(route.duration / 60);

                    // Pricing Algorithm (Base + Distance)
                    const baseFare = 15;
                    const costPerKm = 2.5;
                    const totalFare = Math.round(baseFare + (parseFloat(distanceKm) * costPerKm));

                    setRouteInfo({
                        distance: parseFloat(distanceKm),
                        duration: durationMins,
                        price: totalFare
                    });
                }
            } catch (error) {
                console.error("Failed to fetch route", error);
            } finally {
                setLoadingRoute(false);
            }
        };

        fetchRoute();
    }, [selectedLocation, currentCityData.center]);

    const filteredLocations = activeCategory === 'all'
        ? currentCityData.locations
        : currentCityData.locations.filter(l => l.category === activeCategory);

    return (
        <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex flex-col md:flex-row font-sans">

            {/* Sidebar Overlay */}
            <div className="absolute top-0 left-0 z-[1000] w-full md:w-96 p-4 h-full md:h-auto md:max-h-screen flex flex-col gap-3 pointer-events-none">

                {/* Main Control Card */}
                <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/40 pointer-events-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/20">
                                <Compass className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-gray-900 leading-tight">Saudi Taxi Explorer</h1>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Live Routing</p>
                            </div>
                        </div>
                    </div>

                    {/* City Tabs */}
                    <div className="flex p-1 bg-gray-100/80 rounded-xl mb-6 backdrop-blur-sm">
                        {(['makkah', 'madinah', 'jeddah', 'riyadh'] as City[]).map((city) => (
                            <button
                                key={city}
                                onClick={() => {
                                    setActiveCity(city);
                                    setSelectedLocation(null);
                                }}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${activeCity === city
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {[
                            { id: 'all', label: 'All', icon: Layers },
                            { id: 'religious', label: 'Holy', icon: Landmark },
                            { id: 'hotel', label: 'Stays', icon: Building },
                            { id: 'transport', label: 'Taxi', icon: Car },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id as Category)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${activeCategory === cat.id
                                        ? 'bg-black text-white shadow-lg transform scale-105'
                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                    }`}
                            >
                                <cat.icon className="w-3 h-3" />
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Locations List */}
                    <div className="max-h-[35vh] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                        {filteredLocations.map(loc => (
                            <div
                                key={loc.id}
                                onClick={() => {
                                    setSelectedLocation(loc);
                                }}
                                className={`group p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 hover:shadow-md ${selectedLocation?.id === loc.id
                                        ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-100 shadow-sm'
                                        : 'bg-white border-transparent hover:border-gray-100 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${selectedLocation?.id === loc.id ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-100 text-gray-400 group-hover:bg-white group-hover:shadow-sm'
                                    }`}>
                                    {loc.category === 'religious' && <Landmark className="w-4 h-4" />}
                                    {loc.category === 'hotel' && <Building className="w-4 h-4" />}
                                    {loc.category === 'transport' && <Car className="w-4 h-4" />}
                                    {loc.category === 'shopping' && <Compass className="w-4 h-4" />}
                                    {loc.category === 'dining' && <Utensils className="w-4 h-4" />}
                                    {loc.category === 'business' && <Briefcase className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h3 className={`font-bold text-sm transition-colors ${selectedLocation?.id === loc.id ? 'text-emerald-900' : 'text-gray-900'}`}>{loc.name}</h3>
                                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{loc.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Detail Card - Real Data */}
                {selectedLocation && (
                    <div className="bg-white/95 backdrop-blur-xl p-0 rounded-3xl shadow-2xl border border-white/40 pointer-events-auto overflow-hidden animate-in slide-in-from-left-4 duration-500">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-800 p-5 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <button
                                onClick={() => setSelectedLocation(null)}
                                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-1.5 rounded-full backdrop-blur-md transition-all sm:hidden"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <span className="inline-block px-2 py-1 rounded bg-black/20 text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-sm border border-white/10">
                                {selectedLocation.category}
                            </span>
                            <h2 className="text-xl font-black">{selectedLocation.name}</h2>
                        </div>

                        <div className="p-5">
                            {/* Real Route Info */}
                            {loadingRoute ? (
                                <div className="flex items-center justify-center p-6 gap-2 text-emerald-600">
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-xs font-bold">Calculating Route...</span>
                                </div>
                            ) : routeInfo ? (
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Est. Fare</p>
                                        <p className="text-xl font-black text-emerald-600">{routeInfo.price} <span className="text-xs text-gray-400 font-medium">SAR</span></p>
                                        <p className="text-[10px] text-gray-400 mt-1">Real-time Estimate</p>
                                    </div>
                                    <div className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Duration</p>
                                        <p className="text-xl font-black text-gray-900">{routeInfo.duration} <span className="text-xs text-gray-400 font-medium">min</span></p>
                                        <p className="text-[10px] text-gray-400 mt-1">{routeInfo.distance} km</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-4 text-xs text-red-500">Route info unavailable</div>
                            )}

                            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                {selectedLocation.description}
                            </p>
                            <div className="flex gap-2">
                                <Link href="/booking/" className="flex-1">
                                    <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-xl h-12 text-sm font-bold shadow-lg shadow-black/10"><WhatsAppIcon className="w-4 h-4 mr-2 fill-current" /> WhatsApp Booking</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Map Container */}
            <div className="flex-1 w-full h-full relative">
                <MapContainer
                    center={currentCityData.center}
                    zoom={currentCityData.zoom}
                    zoomControl={false}
                    className="w-full h-full outline-none z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    <ZoomControl position="bottomright" />
                    <MapController center={currentCityData.center} zoom={currentCityData.zoom} />

                    {/* Static Location Markers */}
                    {filteredLocations.map(loc => (
                        <Marker
                            key={loc.id}
                            position={[loc.lat, loc.lng]}
                            icon={createCustomIcon(loc.category)}
                            eventHandlers={{
                                click: () => {
                                    setSelectedLocation(loc);
                                }
                            }}
                        />
                    ))}

                    {/* Draw Real Route Polyline */}
                    {routePolyline && (
                        <Polyline
                            positions={routePolyline}
                            color="#059669"
                            weight={5}
                            opacity={0.8}
                            dashArray="10, 10"
                            lineCap="round"
                            lineJoin="round"
                        />
                    )}

                    {/* City Center Marker (Start Point) */}
                    <Marker
                        position={currentCityData.center}
                        icon={L.divIcon({
                            html: renderToStaticMarkup(
                                <div className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-md animate-pulse"></div>
                            ),
                            className: 'start-point',
                            iconSize: [16, 16]
                        })}
                    />

                </MapContainer>

                {/* Overlay Gradients */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-[400]" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-[400]" />
            </div>

            <style jsx global>{`
        .leaflet-div-icon {
            background: transparent;
            border: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
      `}</style>
        </div>
    );
}
