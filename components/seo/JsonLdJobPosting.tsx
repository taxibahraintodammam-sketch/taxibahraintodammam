
interface JsonLdJobPostingProps {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  hiringOrganization: string;
  jobLocation: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  baseSalary?: {
    currency: string;
    value: number;
    unitText: string;
  };
}

export default function JsonLdJobPosting({
  title,
  description,
  datePosted,
  validThrough,
  employmentType,
  hiringOrganization,
  jobLocation,
  baseSalary
}: JsonLdJobPostingProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": title,
    "description": description,
    "datePosted": datePosted,
    "validThrough": validThrough,
    "employmentType": employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": hiringOrganization,
      "sameAs": "https://taxibahraintodammam.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Prince Sultan Road",
        "addressLocality": jobLocation.addressLocality,
        "addressRegion": jobLocation.addressRegion,
        "addressCountry": jobLocation.addressCountry
      }
    },
    ...(baseSalary && {
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": baseSalary.currency,
        "value": {
          "@type": "QuantitativeValue",
          "value": baseSalary.value,
          "unitText": baseSalary.unitText
        }
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
