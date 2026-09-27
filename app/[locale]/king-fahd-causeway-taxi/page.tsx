import type { Metadata } from "next";
import { getRoute } from "@/content/routes";
import { getRouteAr } from "@/content/routes.ar";
import { lowestFare } from "@/content/fares";
import { CAUSEWAY, type CausewayCopy } from "@/content/causeway";
import { CAUSEWAY_AR } from "@/content/causeway.ar";
import { getDictionary } from "@/content/dictionary";
import { absoluteUrl, withSlash } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CausewayPage } from "@/components/causeway/CausewayPage";
import type { Branch } from "@/components/causeway/CausewayWidgets";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "king-fahd-causeway-taxi";

/** The branches after the causeway, in published-distance order. Only real route pages. */
const BRANCHES = [
  "taxi-bahrain-to-khobar",
  "taxi-bahrain-to-dammam",
  "bahrain-to-dammam-airport-taxi",
  "taxi-bahrain-to-qatif",
  "taxi-bahrain-to-abqaiq",
  "taxi-bahrain-to-jubail",
  "taxi-bahrain-to-ras-tanura",
  "taxi-bahrain-to-al-ahsa-hofuf",
  "taxi-bahrain-to-riyadh",
];

function getBranches(locale: Locale): Branch[] {
  const route = locale === "ar" ? getRouteAr : getRoute;
  const prefix = locale === "ar" ? "/ar" : "";
  return BRANCHES.map((slug) => {
    const r = route(slug)!;
    return { name: r.to, km: r.distanceKm, time: r.durationLabel, href: withSlash(`${prefix}/${slug}`) };
  }).sort((a, b) => a.km - b.km);
}

function getCopy(locale: Locale): CausewayCopy {
  return locale === "ar" ? CAUSEWAY_AR : CAUSEWAY;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const { meta } = getCopy(locale);
  const enPath = `/${SLUG}`;
  const arPath = `/ar/${SLUG}`;
  const path = locale === "ar" ? arPath : enPath;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl(enPath),
        "ar-BH": absoluteUrl(arPath),
        "x-default": absoluteUrl(enPath),
      },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      siteName: "Taxi Bahrain to Dammam",
      url: absoluteUrl(path),
      title: meta.title,
      description: meta.description,
      images: [{ url: absoluteUrl("/hero/slide-causeway.webp"), width: 1920, height: 1080 }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = getCopy(locale);
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: copy.crumb, path: `${prefix}/${SLUG}` },
  ];

  return (
    <>
      {/* Starting price = the lowest published corridor fare; no ratings, reviews or offers. */}
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: copy.schemaName,
          description: copy.meta.description,
          serviceType: "Cross-border private transfer",
          areaServed: ["Bahrain", "Saudi Arabia"],
          minPriceBhd: lowestFare("taxi-bahrain-to-khobar")?.bhd,
        })}
      />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <CausewayPage copy={copy} locale={locale} branches={getBranches(locale)} />
    </>
  );
}
