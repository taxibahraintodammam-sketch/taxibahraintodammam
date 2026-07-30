import Link from 'next/link';
import { MapPin, Plane, Car, Users, Star, Hotel } from 'lucide-react';

const serviceCategories = [
    {
        title: "Airport Transfers",
        icon: Plane,
        services: [
            "Jeddah Airport to Makkah Taxi",
            "JED to Makkah Taxi",
            "Jeddah to Madinah Taxi",
            "JED to Madinah Taxi",
            "Jeddah Airport Pickup",
            "Jeddah Airport Transfer",
            "Madinah Airport to Makkah Taxi",
            "Madinah Airport to Madinah City Taxi",
            "Madinah Airport Pickup",
            "Madinah Airport Transfer",
            "Taif Airport to Makkah Taxi",
            "Riyadh Airport to Makkah Taxi"
        ]
    },
    {
        title: "City-to-City Transfers",
        icon: MapPin,
        services: [
            "Makkah to Madinah Taxi",
            "Madinah to Makkah Taxi",
            "Makkah to Jeddah Taxi",
            "Madinah to Jeddah Taxi",
            "Jeddah to Madinah Train Station Transfer",
            "Madinah to Jeddah Airport Taxi",
            "Makkah to Taif Taxi",
            "Taif to Makkah Taxi",
            "Taif to Madinah Taxi",
            "Riyadh to Makkah Taxi",
            "Dammam to Makkah Taxi",
            "Yanbu to Madinah Taxi",
            "Rabigh to Makkah Taxi"
        ]
    },
    {
        title: "Umrah Travel Services",
        icon: Car,
        services: [
            "Umrah Taxi Service",
            "Private Car for Umrah",
            "Chauffeur for Umrah",
            "VIP Umrah Transport",
            "Luxury Umrah Taxi",
            "7-Seater Umrah Taxi",
            "Suburban / GMC for Umrah",
            "Hiace Van for Umrah",
            "Hyundai H1 for Umrah",
            "Toyota Previa for Umrah",
            "Family Taxi for Umrah",
            "Group Transport for Umrah"
        ]
    },
    {
        title: "Ziyarat / Pilgrimage Visits",
        icon: Star,
        services: [
            "Makkah Ziyarat Taxi",
            "Madinah Ziyarat Taxi",
            "Taif Ziyarat Taxi",
            "Makkah Holy Sites Tour",
            "Madinah Holy Places Tour",
            "Miqat Masjid Taxi",
            "Jabal al Nour Taxi",
            "Jabal al Thawr Taxi",
            "Arafat Ziyarat Taxi",
            "Mina Ziyarat Taxi",
            "Muzdalifah Ziyarat Taxi"
        ]
    },
    {
        title: "Local Taxi Services",
        icon: Car,
        services: [
            "Makkah Local Taxi",
            "Madinah Local Taxi",
            "Jeddah Local Taxi",
            "Taxi Near Me",
            "Airport Taxi Near Me",
            "Taxi Service Near Me",
            "Makkah Private Driver",
            "Madinah Private Driver",
            "Jeddah Private Driver",
            "Makkah Chauffeur Service",
            "Madinah Chauffeur Service",
            "Jeddah Chauffeur Service"
        ]
    },
    {
        title: "Hotel Transfers",
        icon: Hotel,
        services: [
            "Makkah Hotel Taxi Service",
            "Madinah Hotel Taxi Service",
            "Hotel to Haram Taxi",
            "Haram to Hotel Taxi",
            "Jeddah Hotel to Makkah Transfer",
            "Hilton Makkah Taxi",
            "Clock Tower Taxi",
            "Pullman Zamzam Taxi",
            "Fairmont Makkah Taxi"
        ]
    },
    {
        title: "Group Transport",
        icon: Users,
        services: [
            "7-Seater Taxi",
            "10-Seater Taxi",
            "14-Seater Hiace",
            "30-Seater Coaster",
            "Family Van for Umrah",
            "Group Van for Hajj",
            "Bus Service for Umrah Groups"
        ]
    },
    {
        title: "VIP & Luxury",
        icon: Star,
        services: [
            "VIP Airport Transfer",
            "VIP Chauffeur Service",
            "Black Car Service Saudi Arabia",
            "Luxury SUV for Umrah",
            "VIP GMC for Pilgrims",
            "Lexus ES Umrah Transport"
        ]
    },
    {
        title: "Special Needs / Add-Ons",
        icon: Star,
        services: [
            "Child Seat Taxi Service",
            "Female Friendly Taxi",
            "Large Luggage Taxi",
            "24/7 Taxi Service Saudi Arabia",
            "Urgent Taxi Booking Saudi Arabia"
        ]
    }
];

export default function ServiceKeywords() {
    return (
        <section className="py-20 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="bg-primary text-black font-semibold tracking-wider uppercase text-sm px-4 py-1.5 rounded-full inline-block">Explore All Services</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">Comprehensive Transport Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Browse our complete range of taxi and chauffeur services across Saudi Arabia. Click any service to book instantly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceCategories.map((category, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <category.icon className="w-6 h-6 text-gray-700 mr-3" />
                                {category.title === "Airport Transfers" ? (
                                    <Link href="/services/airport-transfers/" className="hover:text-black transition-colors">
                                        <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                                    </Link>
                                ) : (
                                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                                )}
                            </div>
                            <ul className="space-y-2.5">
                                {category.services.map((service, idx) => {
                                    const isJeddahMakkah = service === "Jeddah Airport to Makkah Taxi";
                                    const isJeddahPickup = service === "Jeddah Airport Pickup";

                                    let href = `/booking/?service=${encodeURIComponent(service.replace(/\s+/g, '-'))}`;

                                    if (isJeddahMakkah) {
                                        href = "/services/jeddah-airport-to-makkah-taxi/";
                                    } else if (isJeddahPickup) {
                                        href = "/services/jeddah-airport-pickup/";
                                    }

                                    return (
                                        <li key={idx}>
                                            <Link href={href} className="text-gray-600 hover:text-black text-sm transition-colors flex items-center group">
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 group-hover:bg-black"></span>
                                                {service}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
