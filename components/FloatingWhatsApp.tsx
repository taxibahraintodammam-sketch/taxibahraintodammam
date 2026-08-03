'use client';

import WhatsAppIcon from '@/components/WhatsAppIcon';
import { useHideNearFooter } from '@/hooks/useHideNearFooter';

export default function FloatingWhatsApp() {
    const nearFooter = useHideNearFooter();
    return (
        <a
            href="https://wa.me/97335014335?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20transfer."
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={`fixed bottom-6 right-6 z-[100] group items-center gap-3 transition-opacity duration-300 ${nearFooter ? 'hidden opacity-0 pointer-events-none' : 'hidden lg:flex opacity-100'}`}
            aria-label="Contact on WhatsApp"
        >
            <div className="bg-white px-4 py-2 rounded-full shadow-xl border border-emerald-100 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none">
                <span className="text-emerald-700 font-bold text-sm whitespace-nowrap">Chat with us</span>
            </div>
            <div className="relative w-16 h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95 animate-bounce-slow">
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25"></div>
                <WhatsAppIcon className="w-8 h-8 fill-current relative z-10" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full z-20"></span>
            </div>
        </a>
    );
}
