
interface BreadcrumbItem {
  name: string;
  item: string;
}

interface JsonLdBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function JsonLdBreadcrumb({ items }: JsonLdBreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://taxiserviceksa.com${item.item.startsWith('/') ? item.item : '/' + item.item}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
