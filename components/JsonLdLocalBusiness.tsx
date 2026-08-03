

export default function JsonLdLocalBusiness() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "@id": "https://taxibahraintodammam.com/#taxiservice",
        "name": "Taxi Bahrain to Dammam",
        "alternateName": "TaxiBahrainToDammam",
        "logo": {
            "@type": "ImageObject",
            "url": "https://taxibahraintodammam.com/logo.png",
            "width": 512,
            "height": 512
        },
        "image": "https://taxibahraintodammam.com/og-image.jpg",
        "url": "https://taxibahraintodammam.com",
        "telephone": "+966-56-948-7569",
        "email": "booking@taxibahraintodammam.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Prince Sultan Road",
            "addressLocality": "Jeddah",
            "addressRegion": "Makkah Province",
            "postalCode": "23423",
            "addressCountry": "SA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 21.5433,
            "longitude": 39.1728
        },
        "priceRange": "$$",
        "areaServed": [
            { "@type": "City", "name": "Jeddah" },
            { "@type": "City", "name": "Makkah" },
            { "@type": "City", "name": "Madinah" },
            { "@type": "City", "name": "Riyadh" },
            { "@type": "City", "name": "Tabuk" },
            { "@type": "City", "name": "Taif" },
            { "@type": "City", "name": "Yanbu" },
            { "@type": "City", "name": "AlUla" },
            { "@type": "City", "name": "Dammam" },
            { "@type": "City", "name": "Al Khobar" },
            { "@type": "City", "name": "Dhahran" },
            { "@type": "City", "name": "Jubail" },
            { "@type": "City", "name": "Abha" },
            { "@type": "City", "name": "Khamis Mushait" },
            { "@type": "City", "name": "Najran" },
            { "@type": "City", "name": "Jizan" },
            { "@type": "City", "name": "Hail" },
            { "@type": "City", "name": "Buraydah" },
            { "@type": "City", "name": "Unaizah" },
            { "@type": "City", "name": "Khaybar" },
            { "@type": "City", "name": "Qassim" },
            { "@type": "City", "name": "Hafar Al-Batin" },
            { "@type": "City", "name": "Wadi Al-Dawasir" },
            { "@type": "City", "name": "Baha" },
            { "@type": "City", "name": "Sambah" },
            { "@type": "AdministrativeArea", "name": "Saudi Arabia" }
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "description": "24/7 Private Car, Taxi & Executive Chauffeur Service in Saudi Arabia. Specializing in Umrah transfers, Jeddah Airport pickups, and all intercity travel across the Kingdom.",
        "founder": {
            "@type": "Person",
            "name": "Muhammad Ismail"
        },
        "foundingDate": "2012",
        "paymentAccepted": "Cash, Credit Card, Apple Pay, Online Transfer",
        "currenciesAccepted": "SAR, USD, EUR, GBP, CAD, AUD, IDR, PKR",
        "sameAs": [
            "https://www.facebook.com/taxiserviceksa",
            "https://www.instagram.com/taxiserviceksa",
            "https://x.com/taxiserviceksa",
            "https://www.linkedin.com/company/taxiserviceksa",
            "https://www.tiktok.com/@taxiserviceksa",
            "https://www.youtube.com/@taxiserviceksa"
        ]
    };

    return (
        <script
            id="local-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
