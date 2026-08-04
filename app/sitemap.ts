import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/business";
import { PICKUP_AREAS } from "@/content/pickup-areas";
import { FLEET } from "@/content/fleet";
import { getAllPostsMeta } from "@/lib/posts";

// Static page folders under app/[locale]/** (excluding dynamic segments,
// which are enumerated separately below from their content source).
const STATIC_PATHS = [
  "",
  "about",
  "airport-transfers",
  "bahrain-airport-to-dammam-taxi",
  "bahrain-to-dammam-airport-taxi",
  "blog",
  "booking",
  "cancellation-and-refund-policy",
  "contact",
  "corporate-accounts",
  "dammam-airport-to-bahrain-taxi",
  "family-van-transfer",
  "faqs",
  "fares",
  "fleet",
  "hourly-chauffeur-hire",
  "king-fahd-causeway-taxi",
  "privacy-policy",
  "reviews",
  "taxi-bahrain-to-abqaiq",
  "taxi-bahrain-to-al-ahsa-hofuf",
  "taxi-bahrain-to-dammam",
  "taxi-bahrain-to-jubail",
  "taxi-bahrain-to-khobar",
  "taxi-bahrain-to-qatif",
  "taxi-bahrain-to-ras-tanura",
  "taxi-bahrain-to-riyadh",
  "taxi-dammam-to-bahrain",
  "taxi-khobar-to-bahrain",
  "terms-and-conditions",
  "vip-luxury-transfer",
  "visa-u-turn-service",
  "wheelchair-accessible-transfer",
];

function priorityFor(path: string): number {
  if (path === "") return 1;
  if (path === "booking") return 0.9;
  if (["privacy-policy", "terms-and-conditions", "cancellation-and-refund-policy"].includes(path)) {
    return 0.3;
  }
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Only blog posts carry a real per-page "last modified" fact (frontmatter
  // dateModified). Stamping every other page with `new Date()` on every
  // build made lastmod meaningless, so those are left unset instead.
  const postLastModified = new Map(
    getAllPostsMeta("en").map((post) => [`blog/${post.slug}`, post.dateModified])
  );

  const dynamicPaths = [
    ...PICKUP_AREAS.map((area) => `pickup/${area.slug}`),
    ...FLEET.map((vehicle) => `fleet/${vehicle.slug}`),
    ...[...postLastModified.keys()],
  ];

  const allPaths = [...STATIC_PATHS, ...dynamicPaths];

  return allPaths.flatMap((path) => {
    const enUrl = path ? `${SITE_URL}/${path}/` : `${SITE_URL}/`;
    const arUrl = `${SITE_URL}/ar/${path}${path ? "/" : ""}`;
    const priority = priorityFor(path);
    const lastModified = postLastModified.get(path);

    return [
      {
        url: enUrl,
        ...(lastModified ? { lastModified } : {}),
        priority,
        alternates: { languages: { en: enUrl, ar: arUrl } },
      },
      {
        url: arUrl,
        ...(lastModified ? { lastModified } : {}),
        priority,
        alternates: { languages: { en: enUrl, ar: arUrl } },
      },
    ];
  });
}
