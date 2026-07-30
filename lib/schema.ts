import { BUSINESS, SITE_URL } from "@/content/business";
import { absoluteUrl } from "@/lib/url";

/** JSON-LD is data we build ourselves (no raw user input), but we still
 * escape "<" so a value can never prematurely close the </script> tag. */
export function schemaJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: BUSINESS.brandName,
    legalName: BUSINESS.legalName,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    telephone: BUSINESS.phoneE164,
    priceRange: "BHD 10 - BHD 60",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.addressLine,
      addressLocality: BUSINESS.addressLocality,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "City", name: "Manama" },
      { "@type": "City", name: "Dammam" },
      { "@type": "City", name: "Khobar" },
      { "@type": "City", name: "Jubail" },
      { "@type": "City", name: "Riyadh" },
      { "@type": "City", name: "Al Ahsa" },
      { "@type": "City", name: "Ras Tanura" },
      { "@type": "City", name: "Qatif" },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=King+Fahd+Causeway`,
    founder: {
      "@type": "Person",
      name: BUSINESS.founderName,
    },
    ...(BUSINESS.sameAs.length > 0 ? { sameAs: BUSINESS.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: BUSINESS.brandName,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: ["en", "ar"],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(params: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed: string[];
  minPriceBhd: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(params.path),
    name: params.name,
    description: params.description,
    serviceType: params.serviceType,
    provider: { "@id": BUSINESS_ID },
    areaServed: params.areaServed.map((name) => ({ "@type": "City", name })),
    offers: {
      "@type": "Offer",
      priceCurrency: "BHD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: params.minPriceBhd,
        priceCurrency: "BHD",
      },
      availability: "https://schema.org/InStock",
    },
  };
}

export function tripSchema(params: {
  path: string;
  name: string;
  fromName: string;
  toName: string;
  minPriceBhd: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Trip",
    "@id": absoluteUrl(params.path),
    name: params.name,
    provider: { "@id": BUSINESS_ID },
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: { "@type": "Place", name: params.fromName },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: { "@type": "Place", name: "King Fahd Causeway" },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: { "@type": "Place", name: params.toName },
        },
      ],
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BHD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: params.minPriceBhd,
        priceCurrency: "BHD",
      },
    },
  };
}

export function articleSchema(params: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline.slice(0, 110),
    description: params.description,
    image: absoluteUrl(params.image),
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: { "@type": "Organization", name: BUSINESS.brandName },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: absoluteUrl(params.path),
  };
}
