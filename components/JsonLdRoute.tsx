

interface JsonLdRouteProps {
    from: string;
    to: string;
    description: string;
    distance?: string;
    duration?: string;
    ratingValue?: string;
    reviewCount?: string;
}

export default function JsonLdRoute({ from, to, description, distance, duration, ratingValue = "4.9", reviewCount = "156" }: JsonLdRouteProps) {
    const baseUrl = 'https://taxibahraintodammam.com';
    const routeName = `Taxi from ${from} to ${to}`;
    

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TaxiService",
                "name": `${routeName} Private Transfer`,
                "description": description,
                "provider": {
                    "@type": "LocalBusiness",
                    "name": "TaxiBahrainToDammam",
                    "url": baseUrl,
                    "telephone": "+973 3501 4335",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": ratingValue,
                        "reviewCount": reviewCount,
                        "bestRating": "5",
                        "worstRating": "1"
                    }
                },
                "areaServed": [
                    { "@type": "City", "name": from },
                    { "@type": "City", "name": to }
                ]
            },
            {
                "@type": "TravelAction",
                "name": routeName,
                "fromLocation": {
                    "@type": "Place",
                    "name": from,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": from,
                        "addressCountry": "SA"
                    }
                },
                "toLocation": {
                    "@type": "Place",
                    "name": to,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": to,
                        "addressCountry": "SA"
                    }
                },
                "distance": distance || "Variable",
                "instrument": {
                    "@type": "Car",
                    "name": "GMC Yukon, Mercedes S-Class, Toyota Camry, Cadillac Escalade"
                }
            }
        ]
    };

    const id = `route-schema-${from.toLowerCase()}-${to.toLowerCase()}`;

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
