import { LucideIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export default function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
    return (
        <Link href={`/booking?service=${encodeURIComponent(title.replace(/\s+/g, '-'))}`} className="block group h-full">
            <div className="h-full bg-white rounded-2xl p-6 hover:bg-gray-900 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-2xl relative overflow-hidden flex flex-col">

                {/* Hover Accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                {/* Top Row: Icon & Arrow */}
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-gray-50 group-hover:bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300">
                        <Icon className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transform rotate-0 group-hover:-rotate-45 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                        {description}
                    </p>
                </div>

                {/* Bottom: CTA Button */}
                <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-gray-800 transition-colors duration-300">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold group-hover:bg-white group-hover:text-black transition-all">
                        WhatsApp Booking <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </Link>
    );
}
