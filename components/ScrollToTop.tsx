'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-4 md:bottom-6 md:right-6 z-40">
            <Button
                onClick={scrollToTop}
                size="icon"
                className="bg-primary text-white hover:bg-blue-600 rounded-full shadow-xl shadow-primary/40 w-12 h-12 md:w-14 md:h-14 transition-all hover:scale-110 active:scale-95 min-h-[48px] min-w-[48px]"
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
        </div>
    );
}
