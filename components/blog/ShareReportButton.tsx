"use client";

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ShareReportButton() {
    return (
        <button
            onClick={() => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Taxi vs Train 2025: The Efficiency Report',
                        text: 'Why do 70% of families choose taxis? The data might surprise you.',
                        url: window.location.href,
                    }).catch(console.error);
                } else {
                    window.print();
                }
            }}
            className="inline-flex items-center justify-center px-8 py-6 text-lg font-bold text-white border-2 border-white/20 rounded-md hover:bg-white/10 w-full sm:w-auto transition-colors"
        >
            <Share2 className="mr-2 w-5 h-5" /> Share Report
        </button>
    );
}
