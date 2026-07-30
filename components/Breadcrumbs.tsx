"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
    const pathname = usePathname();
    
    // Don't show breadcrumbs on home or admin pages
    if (pathname === '/' || pathname.startsWith('/admin')) {
        return null;
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    
    // Map path segments to pretty labels
    const segmentLabels: Record<string, string> = {
        'locations': 'Locations',
        'routes': 'Routes',
        'fleet': 'Fleet',
        'blog': 'Blog',
        'about': 'About Us',
        'contact': 'Contact',
        'jeddah': 'Jeddah',
        'makkah': 'Makkah',
        'madinah': 'Madinah',
        'riyadh': 'Riyadh',
        'taif': 'Taif',
        'tabuk': 'Tabuk'
    };

    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}/`;
        const label = segmentLabels[segment] || segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        return {
            label,
            href,
            active: index === pathSegments.length - 1
        };
    });

    return (
        <nav className="flex mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm font-medium">
                <li>
                    <Link href="/" className="flex items-center text-gray-400 hover:text-primary transition-colors">
                        <Home className="w-3.5 h-3.5 mr-1" />
                        <span>Home</span>
                    </Link>
                </li>
                
                {breadcrumbs.map((crumb, i) => (
                    <li key={crumb.href} className="flex items-center space-x-2">
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                        {crumb.active ? (
                            <span className="text-gray-900 font-bold">{crumb.label}</span>
                        ) : (
                            <Link href={crumb.href} className="text-gray-400 hover:text-primary transition-colors">
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
