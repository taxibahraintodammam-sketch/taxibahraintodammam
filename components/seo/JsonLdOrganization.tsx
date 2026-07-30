'use client';

export default function JsonLdOrganization() {
    const baseUrl = 'https://taxiserviceksa.com';
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Taxi Service KSA",
        "alternateName": "Haram Taxi Service",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "sameAs": [
            "https://www.facebook.com/people/Taxi-Service-KSA/61573850597962/",
            "https://www.linkedin.com/company/taxi-service-ksa/",
            "https://www.youtube.com/channel/UCeP44oxBUKUG5X-UhYmPMNw",
            "https://www.pinterest.com/taxiserviceksa/",
            "https://twitter.com/TaxiServiceKSA",
            "https://www.instagram.com/taxiserviceksa/"
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+966 56 073 2928",
                "contactType": "customer service",
                "areaServed": "SA",
                "availableLanguage": ["en", "ar", "ur"]
            },
            {
                "@type": "ContactPoint",
                "telephone": "+966 56 948 7569",
                "contactType": "WhatsApp Booking",
                "areaServed": "SA",
                "availableLanguage": ["en", "ar", "ur"]
            }
        ],
        "founder": {
            "@type": "Person",
            "name": "Muhammad Ismail"
        }
    };

    return (
        <script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
