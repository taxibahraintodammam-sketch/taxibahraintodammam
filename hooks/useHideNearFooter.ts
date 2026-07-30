'use client';

import { useEffect, useState } from 'react';

// True once the page has been scrolled within `threshold`px of #site-footer —
// used to hide floating WhatsApp buttons before they overlap the footer.
export function useHideNearFooter(threshold = 300) {
    const [nearFooter, setNearFooter] = useState(false);

    useEffect(() => {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        const onScroll = () => {
            const rect = footer.getBoundingClientRect();
            setNearFooter(rect.top < window.innerHeight + threshold);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [threshold]);

    return nearFooter;
}
