'use client';

interface JsonLdArticleProps {
    title: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
    publisherName?: string;
    url: string;
}

export default function JsonLdArticle({
    title,
    description,
    image,
    datePublished,
    dateModified,
    authorName = "Haram Taxi Editorial",
    publisherName = "Taxi Service KSA",
    url
}: JsonLdArticleProps) {
    const baseUrl = 'https://taxiserviceksa.com';
    const finalImage = image || `${baseUrl}/logo.png`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": finalImage,
        "datePublished": datePublished,
        "dateModified": dateModified || datePublished,
        "author": {
            "@type": "Person",
            "name": authorName,
            "url": baseUrl
        },
        "publisher": {
            "@type": "Organization",
            "name": publisherName,
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };

    const id = `article-schema-${title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}`;

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
