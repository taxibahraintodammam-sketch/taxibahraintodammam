'use client';

import { usePathname } from 'next/navigation';

export default function JsonLdBreadcrumb() {
    const pathname = usePathname();

    const baseUrl = 'https://taxiserviceksa.com';

    // Split path and remove empty strings
    const segments = pathname.split('/').filter(Boolean);

    const itemListElement = [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
        },
        ...segments.map((segment, index) => {
            const url = `${baseUrl}/${segments.slice(0, index + 1).join('/')}/`;

            // Format name: replace hyphens with spaces and capitalize words
            const name = segment
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase());

            return {
                '@type': 'ListItem',
                position: index + 2,
                name: name,
                item: url,
            };
        }),
    ];

    const graph = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
    };

    return (
        <script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}
