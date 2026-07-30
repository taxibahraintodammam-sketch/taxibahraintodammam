

interface JsonLdLocationProps {
    cityName: string;
    description: string;
    services: { name: string; description: string }[];
    priceRange?: { min: number; max: number; currency: string };
    image?: string;
    ratingValue?: string;
    reviewCount?: string;
}

export default function JsonLdLocation({ 
    cityName, 
    description, 
    services, 
    priceRange,
    image,
    ratingValue = "4.9",
    reviewCount = "312"
}: JsonLdLocationProps) {
    const baseUrl = 'https://taxiserviceksa.com';
    
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TaxiService",
                "name": `Private Car, Taxi and Chauffeur Service in ${cityName}`,
                "description": description,
                "provider": {
                    "@type": "LocalBusiness",
                    "name": "TaxiServiceKSA",
                    "image": image || `${baseUrl}/logo.png`,
                    "url": baseUrl,
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": ratingValue,
                        "reviewCount": reviewCount,
                        "bestRating": "5",
                        "worstRating": "1"
                    }
                },
                "areaServed": {
                    "@type": "City",
                    "name": cityName
                },
                ...(priceRange && {
                    "offers": {
                        "@type": "AggregateOffer",
                        "lowPrice": priceRange.min,
                        "highPrice": priceRange.max,
                        "priceCurrency": priceRange.currency,
                        "offerCount": "10",
                        "url": `${baseUrl}/booking/`
                    }
                })
            },
            {
                "@type": "ItemList",
                "name": `Services in ${cityName}`,
                "itemListElement": services.map((service, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": service.name,
                    "description": service.description
                }))
            }
        ]
    };

    const id = `location-schema-${cityName.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
