import Link from 'next/link';

import JsonLdLocation from '@/components/JsonLdLocation';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, CheckCircle2, DollarSign, ArrowRight, Navigation, Building2 } from 'lucide-react';
import Hero from '@/components/Hero';
import MicroSemanticFAQ from '@/components/seo/MicroSemanticFAQ';
import RecentTrips from '@/components/RecentTrips';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import RouteFleetSection from '@/components/RouteFleetSection';
import { HotelTransferData } from '@/types/hotel';

interface OtherHotelLink {
    name: string;
    url: string;
}

interface HotelTransferPageProps {
    hotel: HotelTransferData;
    otherHotels: OtherHotelLink[];
}

export default function HotelTransferPage({ hotel, otherHotels }: HotelTransferPageProps) {
    const routeDetails = [
        { label: 'Hotel Distance', value: `${hotel.distanceKm} km`, icon: Navigation },
        { label: 'Time to Lobby', value: `${hotel.driveTimeMin} Mins`, icon: Clock },
        { label: 'Price', value: 'Affordable', icon: DollarSign },
        { label: 'Drop-Off', value: hotel.area.split(',')[0], icon: MapPin },
    ];

    const routeImages = hotel.cityName === 'Madinah'
        ? ['/madinah-prophets-mosque.webp', '/gmc-yukon.webp', '/madinah-night-view.webp']
        : ['/makkah-kaaba-night.webp', '/gmc-yukon.webp', '/hero-slide-3.webp'];

    const bookingQuery = encodeURIComponent(hotel.shortName);

    return (
        <div className="bg-gray-50 min-h-screen">
            <JsonLdLocation
                cityName={`Jeddah to ${hotel.shortName}`}
                description={`Professional private car service for Jeddah to ${hotel.name}. Reliable 24/7 door-to-door transfers with luxury vehicles and professional chauffeurs.`}
                services={[
                    { name: `Jeddah to ${hotel.shortName} Taxi`, description: 'Premium private transfer with guaranteed fixed rates.' },
                    { name: 'Executive Chauffeur', description: 'Professional drivers for business and leisure travel.' },
                    { name: 'Family Van Service', description: 'Spacious vehicles perfect for groups with luggage.' },
                    { name: 'Airport & Hotel Transfers', description: 'Convenient pickups and drop-offs at all major locations.' },
                ]}
                image="https://taxibahraintodammam.com/hero-slide-1.webp"
            />

            <Hero
                images={routeImages}
                h1Text={`Jeddah Airport to ${hotel.name} Taxi`}
                title={
                    <span className="bg-emerald-600/90 text-white font-semibold tracking-wider uppercase px-4 py-2 rounded-lg inline-block shadow-lg">
                        Hotel Transfer Specialist
                    </span>
                }
                subtitle={`Direct Transfer to ${hotel.area}`}
                location={`KAIA (JED) ➔ ${hotel.shortName} Lobby`}
            >
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link href={`/booking/?destination=${bookingQuery}`}>
                        <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-10 py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group w-full sm:w-auto">
                            Book {hotel.shortName} Transfer
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <a href="mailto:booking@taxibahraintodammam.com">
                        <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 font-bold text-lg px-10 py-7 rounded-2xl w-full sm:w-auto"><WhatsAppIcon className="w-4 h-4 mr-2 fill-current" /> WhatsApp Booking</Button>
                    </a>
                </div>
            </Hero>

            {/* Reverse Silo Link - Linking UP to Main Route Page */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ArrowRight className="w-4 h-4" />
                        <span>Part of our</span>
                        <Link href={hotel.hubUrl} className="text-primary font-bold hover:underline">
                            {hotel.hubLabel}
                        </Link>
                        <span>network</span>
                    </div>
                </div>
            </div>

            {/* AI SEO: Early Definition & Summary, Scannable Format */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto bg-emerald-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        TL;DR: Jeddah Airport to {hotel.shortName} Transfer Facts
                    </h2>
                    <ul className="space-y-3 text-gray-700">
                        <li><strong>Distance & Time:</strong> {hotel.distanceKm} kilometers. The drive takes {hotel.driveTimeMin} minutes from JED Airport.</li>
                        <li><strong>Drop-off Point:</strong> {hotel.dropOffNote}.</li>
                        <li><strong>Vehicle Types:</strong> Sedans (Toyota Camry) and SUVs (GMC Yukon) accommodating up to 7 passengers and heavy luggage.</li>
                        <li><strong>Pricing:</strong> Affordable, fixed rates with no hidden surge fees. Bookings include meet-and-greet at the airport arrivals terminal.</li>
                    </ul>
                </div>
            </section>

            {/* Route Details Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="bg-emerald-100 text-emerald-800 font-semibold tracking-wider uppercase text-sm px-4 py-1.5 rounded-full inline-block mb-4">Hotel Transfer Info</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Jeddah Airport (JED) to {hotel.name}</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            <strong>{hotel.name}</strong> {hotel.highlight}. Our private taxi service specializes in direct transfers from <strong>King Abdulaziz International Airport (KAIA)</strong> to the hotel, with drivers experienced in local traffic patterns and drop-off procedures via {hotel.haramAccess}.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {routeDetails.map((detail, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200 hover:border-emerald-500 transition-colors">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                                    <detail.icon className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">{detail.label}</div>
                                <div className="text-2xl font-bold text-gray-900">{detail.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Specific Hotel Context */}
                    <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-bold mb-6">Why Request a Quote for a Private Taxi to {hotel.shortName}?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                        <p><strong className="text-emerald-400">Exact Drop-Off:</strong> {hotel.name} is located in {hotel.area}. Our drivers know {hotel.dropOffNote}, saving you the walk with luggage.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                        <p><strong className="text-emerald-400">Luggage Handling:</strong> Porters at the {hotel.shortName} entrance will handle your bags directly from our trunk.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                        <p><strong className="text-emerald-400">Zero Waiting:</strong> We track your flight at KAIA North Terminal or Terminal 1. Your car is ready when you land.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <Building2 className="w-10 h-10 text-emerald-400" />
                                    <div>
                                        <div className="font-bold text-lg">{hotel.name}</div>
                                        <div className="text-sm text-gray-400">{hotel.complex || hotel.area}</div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>Location</span>
                                        <span className="font-mono text-white text-right">{hotel.area}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>Access Route</span>
                                        <span className="font-mono text-white text-right">{hotel.haramAccess}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Airport Drive Time</span>
                                        <span className="font-mono text-white">{hotel.driveTimeMin} mins</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Avalanche Theory: Horizontal Linking */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-emerald-600" />
                        Other Popular Hotel Transfers
                    </h4>
                    <div className="flex flex-wrap gap-4">
                        {otherHotels.map((other) => (
                            <Link
                                key={other.url}
                                href={other.url}
                                className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-sm"
                            >
                                Taxi to {other.name}
                            </Link>
                        ))}
                        <Link href={hotel.hubUrl} className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-sm">
                            All {hotel.hubLabel === 'Jeddah Airport Transfers' ? 'Jeddah Airport Transfers' : `${hotel.cityName} Hotels`}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <RecentTrips />
            </div>

            <RouteFleetSection />

            <MicroSemanticFAQ
                contextName={`Jeddah To ${hotel.shortName}`}
                faqs={[
                    {
                        question: `How much is a taxi from Jeddah Airport to ${hotel.name}?`,
                        shortAnswer: 'WhatsApp Booking',
                        detailedAnswer: `A private sedan (like a Toyota Camry) from Jeddah Airport to ${hotel.shortName} is offered at an affordable fixed rate. An SUV (like a GMC Yukon) is also available for larger families or groups with extensive luggage. All prices are fixed and pre-agreed before you travel.`,
                        perspectives: [],
                    },
                    {
                        question: `Where exactly does the taxi drop off at ${hotel.shortName}?`,
                        shortAnswer: 'Direct to the hotel entrance',
                        detailedAnswer: `${hotel.name} is located in ${hotel.area}. Our drivers drop you at ${hotel.dropOffNote}, so you reach ${hotel.haramName} via ${hotel.haramAccess} without dragging luggage through traffic.`,
                        perspectives: [],
                    },
                    {
                        question: `How long is the drive from Jeddah Airport (JED) to ${hotel.shortName}?`,
                        shortAnswer: `${hotel.driveTimeMin} Minutes`,
                        detailedAnswer: `The drive from King Abdulaziz International Airport (JED) to ${hotel.name} covers approximately ${hotel.distanceKm} kilometers and takes ${hotel.driveTimeMin} minutes. This travel time depends on traffic congestion and, for pilgrims, processing time at any entry checkpoints along the way.`,
                        perspectives: [],
                    },
                ]}
            />

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Get a Quote for Your {hotel.shortName} Transfer
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Guarantee your ride from Jeddah Airport to {hotel.area}. No haggling, no waiting.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/booking/?destination=${bookingQuery}`}>
                            <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-lg px-10 py-6 h-auto min-w-[200px]"><WhatsAppIcon className="w-4 h-4 mr-2 fill-current" /> WhatsApp Booking</Button>
                        </Link>
                        <a href="mailto:booking@taxibahraintodammam.com">
                            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 font-bold text-lg px-10 py-6 h-auto min-w-[200px]">
                                Email for Quote
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
