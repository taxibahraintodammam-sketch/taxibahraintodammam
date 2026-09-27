import type { Metadata } from "next";
import { getRoute } from "@/content/routes";
import { getRouteAr } from "@/content/routes.ar";
import { ROUTE_FARES, fareWithSar, lowestFare } from "@/content/fares";
import { RIYADH, type RiyadhCopy } from "@/content/riyadh";
import { RIYADH_AR } from "@/content/riyadh.ar";
import { getDictionary } from "@/content/dictionary";
import { absoluteUrl } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RiyadhPage, fillRiyadh, type RiyadhFigures } from "@/components/riyadh/RiyadhPage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "taxi-bahrain-to-riyadh";
/** Closer destinations shown for context, in published-distance order. */
const COMPARE = ["taxi-bahrain-to-khobar", "taxi-bahrain-to-dammam", "taxi-bahrain-to-jubail", SLUG];

/** Distance, driving time and fares come from the shared route and fare data. */
function getFigures(locale: Locale): RiyadhFigures {
  const route = locale === "ar" ? getRouteAr : getRoute;
  const riyadh = route(SLUG)!;
  const fare = (v: string) => {
    const f = ROUTE_FARES[SLUG]?.find((x) => x.vehicle === v);
    return f ? fareWithSar(f) : undefined;
  };
  return {
    km: riyadh.distanceKm,
    time: riyadh.durationLabel,
    fares: { sedan: fare("sedan"), van: fare("van"), suv: fare("suv"), luxury: fare("luxury") },
    compare: COMPARE.map((slug) => {
      const r = route(slug)!;
      return { name: r.to, km: r.distanceKm, time: r.durationLabel, slug };
    }),
  };
}

function getCopy(locale: Locale): RiyadhCopy {
  return fillRiyadh(locale === "ar" ? RIYADH_AR : RIYADH, getFigures(locale));
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
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = getCopy(locale);
  const figures = getFigures(locale);
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: dict.causewayHubName, path: `${prefix}/king-fahd-causeway-taxi` },
    { name: copy.crumb, path: `${prefix}/${SLUG}` },
  ];

  return (
    <>
      {/* Starting price = lowest published fare on this route; no ratings, reviews or offers. */}
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: copy.schemaName,
          description: copy.meta.description,
          serviceType: "Long-distance cross-border private transfer",
          areaServed: ["Bahrain", "Riyadh"],
          minPriceBhd: lowestFare(SLUG)?.bhd,
        })}
      />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <RiyadhPage copy={copy} locale={locale} figures={figures} />
    </>
  );
}
