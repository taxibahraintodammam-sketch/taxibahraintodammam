import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const fleet = [
    {
        name: "Toyota Camry",
        image: "/toyota-camry.webp",
        passengers: 4,
        luggage: 2,
        features: ["Professional Chauffeur", "Climate Controlled", "Efficient Transfer"],
        link: "/fleet/toyota-camry/",
    },
    {
        name: "GMC Yukon XL / Denali",
        image: "/fleet/gmc-yukon-xl-premium-chauffeur-saudi.webp",
        passengers: 7,
        luggage: 5,
        features: ["Executive SUV", "Extra Legroom", "Luxury Interior"],
        link: "/fleet/gmc-yukon/",
    },
    {
        name: "Cadillac Escalade",
        image: "/fleet/cadillac-escalade-chauffeur-service-ksa.webp",
        passengers: 7,
        luggage: 4,
        features: ["Elite Audio", "Extra Comfort", "Professional Chauffeur"],
        link: "/fleet/cadillac-escalade/",
    },
    {
        name: "Mercedes S-Class",
        image: "/fleet/mercedes-s-class-vip-chauffeur-service-saudi.webp",
        passengers: 3,
        luggage: 2,
        features: ["Premium Experience", "Leather Interior", "Discreet Service"],
        link: "/fleet/mercedes-s-class/",
    },
    {
        name: "Hyundai Staria VIP",
        image: "/hyundai-staria.webp",
        passengers: 7,
        luggage: 4,
        features: ["Premium Family Van", "Spacious Interior", "Group Excellence"],
        link: "/fleet/hyundai-staria/",
    },
    {
        name: "Mercedes Sprinter",
        image: "/fleet/mercedes-sprinter-luxury-van-transfer-saudi.webp",
        passengers: 14,
        luggage: 4,
        features: ["Custom Interior", "High Roof", "Corporate Travel"],
        link: "/fleet/mercedes-sprinter/",
    },
];

export default function RouteFleetSection() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="bg-primary text-white font-semibold tracking-wider uppercase text-xs sm:text-sm px-4 py-1.5 rounded-full inline-block shadow-md shadow-primary/30">
                        Available Vehicles
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-4">
                        Choose Your Ride
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        All vehicles come with a professional chauffeur, fixed rates, and door-to-door service.
                    </p>
                </div>

                {/* Fleet Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {fleet.map((vehicle, index) => (
                        <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary/50 flex flex-col">
                            {/* Vehicle Image */}
                            <Link href={vehicle.link} className="block">
                                <div className="relative h-52 overflow-hidden bg-gray-100">
                                    <Image
                                        src={vehicle.image}
                                        alt={`${vehicle.name} - transfer vehicle for this route`}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                </div>
                            </Link>

                            {/* Vehicle Info */}
                            <div className="p-5 flex-1 flex flex-col">
                                <Link href={vehicle.link}>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                                    </div>
                                </Link>

                                {/* Capacity */}
                                <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-100 text-gray-600 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{vehicle.passengers} Passengers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        <span>{vehicle.luggage} Luggage</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-1.5 mb-5 flex-1">
                                    {vehicle.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="grid grid-cols-2 gap-2 mt-auto">
                                    <Link
                                        href={`/booking?vehicle=${encodeURIComponent(vehicle.name.replace(/\s+/g, '-'))}`}
                                        className="w-full"
                                    >
                                        <Button className="w-full bg-primary text-white hover:bg-blue-600 font-bold transition-all min-h-[44px] text-xs">
                                            Book Online
                                        </Button>
                                    </Link>
                                    <a
                                        href={`https://wa.me/966569487569?text=Hello%2C%20I%20want%20a%20${encodeURIComponent(vehicle.name)}%20for%20this%20route.`}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700 font-bold transition-all min-h-[44px] text-xs flex items-center gap-1.5 px-2">
                                            <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                                            WhatsApp
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Fleet Link */}
                <div className="text-center mt-10">
                    <Link href="/fleet/">
                        <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-3 rounded-xl transition-all">
                            View Full Fleet <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
