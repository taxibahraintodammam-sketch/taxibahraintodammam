

/**
 * JsonLdOrganization – Global Organization structured data.
 * 
 * Per Google Search Central:
 * - Specifies the logo Google should use in Search results and Knowledge Panel
 * - Provides social profile links for Knowledge Panel sameAs
 * - Declares customer support contactPoints for support methods
 * - Uses @id for cross-referencing with other schemas on the site
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
export default function JsonLdOrganization() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://taxibahraintodammam.com/#organization",
        "name": "Taxi Service KSA",
        "alternateName": "TaxiServiceKSA",
        "url": "https://taxibahraintodammam.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://taxibahraintodammam.com/logo.png",
            "width": 512,
            "height": 512
        },
        "image": "https://taxibahraintodammam.com/og-image.jpg",
        "description": "Executive chauffeur and private transfer service in Saudi Arabia. Specializing in Umrah transport, airport pickups, and intercity travel across the Kingdom.",
        "foundingDate": "2012",
        "founder": {
            "@type": "Person",
            "name": "Muhammad Ismail",
            "url": "https://taxibahraintodammam.com/author/muhammad-ismail"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Prince Sultan Road",
            "addressLocality": "Jeddah",
            "addressRegion": "Makkah Province",
            "postalCode": "23423",
            "addressCountry": "SA"
        },
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+966-56-948-7569",
                "contactType": "customer service",
                "availableLanguage": ["English", "Arabic", "Urdu"],
                "areaServed": "SA",
                "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday", "Tuesday", "Wednesday", "Thursday",
                        "Friday", "Saturday", "Sunday"
                    ],
                    "opens": "00:00",
                    "closes": "23:59"
                }
            },
            {
                "@type": "ContactPoint",
                "email": "taxiserviceksa9988@gmail.com",
                "contactType": "reservations",
                "availableLanguage": ["English", "Arabic", "Urdu"],
                "areaServed": "SA"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/taxiserviceksa",
            "https://www.instagram.com/taxiserviceksa",
            "https://x.com/taxiserviceksa",
            "https://www.linkedin.com/company/taxiserviceksa",
            "https://www.tiktok.com/@taxiserviceksa",
            "https://www.youtube.com/@taxiserviceksa"
        ],
        "areaServed": [
            { "@type": "Country", "name": "Saudi Arabia" }
        ],
        "knowsAbout": [
            "Airport Transfers",
            "Umrah Transportation",
            "Executive Chauffeur Services",
            "Intercity Travel Saudi Arabia",
            "Pilgrimage Logistics"
        ]
    };

    return (
        <script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
