

/**
 * JsonLdWebSite – Global WebSite structured data.
 * 
 * Per Google Search Central:
 * - Tells Google the preferred name for your site in Search results
 * - Enables Sitelinks Search Box when SearchAction is provided
 * - Links to the Organization entity via publisher
 * 
 * @see https://developers.google.com/search/docs/appearance/site-names
 * @see https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 */
export default function JsonLdWebSite() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://taxiserviceksa.com/#website",
        "name": "Taxi Service KSA",
        "alternateName": [
            "TaxiServiceKSA", 
            "Taxi Service Saudi Arabia", 
            "taxiserviceksa.com"
        ],
        "url": "https://taxiserviceksa.com",
        "publisher": {
            "@id": "https://taxiserviceksa.com/#organization"
        },
        "inLanguage": ["en", "ar", "ur"],
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://taxiserviceksa.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
