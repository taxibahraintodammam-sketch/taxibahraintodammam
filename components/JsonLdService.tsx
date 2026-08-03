

export default function JsonLdService() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TaxiService",
                "name": "Airport Transfer Service",
                "description": "Reliable airport transfers from King Abdulaziz International Airport (Jeddah) and King Khalid International Airport (Riyadh).",

                "areaServed": "Saudi Arabia",
                "serviceType": "Airport Transfer",
                "url": "https://taxibahraintodammam.com/locations/jeddah"
            },
            {
                "@type": "TaxiService",
                "name": "Umrah Transport Service",
                "description": "Dedicated transport for Umrah pilgrims between Makkah, Madinah, and Jeddah.",

                "areaServed": ["Makkah", "Madinah"],
                "serviceType": "Religious Travel",
                "url": "https://taxibahraintodammam.com/locations/makkah"
            },
            {
                "@type": "TaxiService",
                "name": "Luxury Chauffeur Service",
                "description": "Executive and corporate chauffeur services with luxury vehicles like GMC Yukon and BMW.",

                "areaServed": "Saudi Arabia",
                "serviceType": "Executive Transport",
                "url": "https://taxibahraintodammam.com/fleet"
            }
        ]
    };

    return (
        <script
            id="service-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
    );
}
