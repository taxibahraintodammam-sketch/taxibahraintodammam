export default function JsonLdSiteNavigation() {
    const baseUrl = 'https://taxiserviceksa.com';

    const navigationItems = [
        { name: "Home", url: `${baseUrl}/` },
        { name: "Routes", url: `${baseUrl}/routes/` },
        { name: "Fleet", url: `${baseUrl}/fleet/` },
        { name: "Locations", url: `${baseUrl}/locations/` },
        { name: "Ziyarat Guides", url: `${baseUrl}/guides/` },
        { name: "Chauffeur Jobs", url: `${baseUrl}/chauffeur-jobs-riyadh/` },
        { name: "Contact", url: `${baseUrl}/contact/` }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": navigationItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "SiteNavigationElement",
                "name": item.name,
                "url": item.url
            }
        }))
    };

    return (
        <script
            id="site-navigation-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
