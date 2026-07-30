
interface JsonLdPersonProps {
  name: string;
  url: string;
  image: string;
  jobTitle: string;
  worksFor: string;
  sameAs: string[];
}

export default function JsonLdPerson({ name, url, image, jobTitle, worksFor, sameAs }: JsonLdPersonProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "url": url,
    "image": image,
    "jobTitle": jobTitle,
    "worksFor": {
      "@type": "Organization",
      "name": worksFor
    },
    "sameAs": sameAs
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
