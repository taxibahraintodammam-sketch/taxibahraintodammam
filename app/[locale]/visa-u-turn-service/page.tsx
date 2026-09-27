import type { Metadata } from "next";
import { ROUTE_FARES, fareWithSar, lowestFare } from "@/content/fares";
import { UTURN, type UturnCopy } from "@/content/uturn";
import { UTURN_AR } from "@/content/uturn.ar";
import { getDictionary } from "@/content/dictionary";
import { absoluteUrl } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { UturnPage, fillUturn, type UturnFares } from "@/components/uturn/UturnPage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "visa-u-turn-service";

/** Starting fares come from the shared fare data, never typed into the page. */
function getFares(): UturnFares {
  const fare = (v: string) => {
    const f = ROUTE_FARES[SLUG]?.find((x) => x.vehicle === v);
    return f ? fareWithSar(f) : undefined;
  };
  return { sedan: fare("sedan"), suv: fare("suv"), van: fare("van") };
}

function getCopy(locale: Locale): UturnCopy {
  const raw = locale === "ar" ? UTURN_AR : UTURN;
  return fillUturn(raw, raw.hours, getFares());
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
      {/* Starting price = lowest published U-turn fare; no ratings, reviews or offers. */}
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: copy.schemaName,
          description: copy.meta.description,
          serviceType: "Cross-border round-trip transport",
          areaServed: ["Bahrain", "Saudi Arabia"],
          minPriceBhd: lowestFare(SLUG)?.bhd,
        })}
      />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <UturnPage copy={copy} locale={locale} fares={getFares()} />
    </>
  );
}
