import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import Link from 'next/link';

interface FleetCardProps {
    name: string;
    image: string;
    passengers: number;
    luggage: number;
    features: string[];
    href: string;
}

export default function FleetCard({ name, image, passengers, luggage, features, href }: FleetCardProps) {
    return (
        <div className="block group h-full">
            <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">

                {/* Image */}
                <Link href={href} className="block">
                    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                        <Image
                            src={image}
                            alt={name}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                    <Link href={href}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-900 transition-colors">
                            {name}
                        </h3>
                    </Link>

                    {/* Capacity Info */}
                    <div className="flex gap-6 mb-6 pb-6 border-b border-gray-100">
                        <div className="flex items-center text-gray-600">
                            <div className="bg-gray-100 p-2 rounded-lg mr-3">
                                <Users className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Passengers</div>
                                <div className="font-bold text-gray-900">{passengers}</div>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <div className="bg-gray-100 p-2 rounded-lg mr-3">
                                <Briefcase className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Luggage</div>
                                <div className="font-bold text-gray-900">{luggage}</div>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-6 flex-grow">
                        {features.map((feature, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-center">
                                <CheckCircle2 className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* CTA Buttons */}
                                        <div className="grid grid-cols-1 gap-2">
                        <Link href={`/booking?vehicle=${encodeURIComponent(name.replace(/\s+/g, '-'))}`} className="block">
                            <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black h-12 rounded-xl text-sm flex items-center justify-center gap-2">
                                <WhatsAppIcon className="w-5 h-5 fill-current shrink-0" /><WhatsAppIcon className="w-4 h-4 mr-2 fill-current" /> WhatsApp Booking</Button>
                        </Link>
                    </div>
                    <Link href={href} className="block mt-2">
                        <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50 text-gray-500 font-bold h-10 text-[11px] uppercase tracking-wider rounded-xl">
                            Vehicle Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
