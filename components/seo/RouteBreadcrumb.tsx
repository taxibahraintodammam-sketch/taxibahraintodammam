import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface RouteBreadcrumbProps {
    fromCity: string;
    toCity: string;
    fromSlug: string;
    toSlug: string;
}

export default function RouteBreadcrumb({ fromCity, toCity, fromSlug, toSlug }: RouteBreadcrumbProps) {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://taxiserviceksa.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Routes",
                "item": "https://taxiserviceksa.com/routes/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `Taxi ${fromCity} to ${toCity}`,
                "item": `https://taxiserviceksa.com/routes/${fromSlug}-${toSlug}/`
            }
        ]
    };

    // Check if a reverse route exists
    const reverseSlug = `${toSlug}-${fromSlug}`;

    return (
        <>
            <script
                id={`breadcrumb-schema-${fromSlug}-${toSlug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Visual Breadcrumb */}
            <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                        <li>
                            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                                <Home className="w-3.5 h-3.5" />
                                Home
                            </Link>
                        </li>
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                        <li>
                            <Link href="/routes/" className="hover:text-primary transition-colors">
                                Routes
                            </Link>
                        </li>
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                        <li className="text-gray-900 font-semibold">
                            {fromCity} to {toCity}
                        </li>
                    </ol>

                    {/* Reverse Route Link */}
                    <div className="mt-2">
                        <Link
                            href={`/routes/${reverseSlug}/`}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-primary/5 px-3 py-1.5 rounded-full hover:bg-primary/10"
                        >
                            🔄 Looking for {toCity} to {fromCity}?
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
