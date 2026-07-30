import WhatsAppIcon from '@/components/WhatsAppIcon';

interface DriverWhatsAppCTAProps {
    message?: string;
}

export default function DriverWhatsAppCTA({ message = "Hello, I want to apply as a VIP driver." }: DriverWhatsAppCTAProps) {
    const encodedMessage = encodeURIComponent(message);
    
    return (
        <a 
            href={`https://wa.me/966569487569?text=${encodedMessage}`} 
            target="_blank" 
            rel="nofollow noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-black py-8 rounded-2xl text-lg shadow-2xl shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
            <WhatsAppIcon className="w-6 h-6 fill-white" />
            Apply on WhatsApp
        </a>
    );
}
