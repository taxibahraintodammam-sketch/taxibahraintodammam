'use client';

import { Phone, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { useHideNearFooter } from '@/hooks/useHideNearFooter';

export default function MobileStickyWhatsApp() {
    const nearFooter = useHideNearFooter();
    return (
        <div className={`fixed bottom-0 left-0 right-0 z-[90] bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] transition-opacity duration-300 ${nearFooter ? 'hidden opacity-0 pointer-events-none' : 'lg:hidden opacity-100'}`}>
            <div className="flex gap-3">
                <a
                    href="https://wa.me/966569487569?text=Hello%2C%20I%20would%20like%20to%20get%20a%20transfer%20quote."
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                    WhatsApp Booking
                </a>
                <a
                    href="tel:+966569487569"
                    className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-black transition-colors shadow-lg active:scale-95"
                    aria-label="Call us"
                >
                    <Phone className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
}
