import type { Metadata } from "next";
import { AIRPORT, type AirportCopy } from "@/content/airport";
import { AIRPORT_AR } from "@/content/airport.ar";
import { getRoute } from "@/content/routes";
import { getRouteAr } from "@/content/routes.ar";
import { lowestFare, fareWithSar } from "@/content/fares";
import { getDictionary } from "@/content/dictionary";
import { absoluteUrl } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AirportPage, type AirportFigures } from "@/components/airport/AirportPage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "airport-transfers";

function getCopy(locale: Locale): AirportCopy {
  return locale === "ar" ? AIRPORT_AR : AIRPORT;
}

/** Real figures for the BAH ↔ Dammam / DMM ↔ Bahrain corridor, from the data files. */
function getFigures(locale: Locale): AirportFigures {
  const route = (locale === "ar" ? getRouteAr : getRoute)("bahrain-airport-to-dammam-taxi")!;
  const fare = fareWithSar(lowestFare("bahrain-airport-to-dammam-taxi")!);
  return { time: route.durationLabel, fare: fare.bhd, fareSar: fare.sar };
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
    { name: copy.crumb, path: `${prefix}/${SLUG}` },
  ];

  return (
    <>
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: locale === "ar" ? "النقل من وإلى المطار بين البحرين والسعودية" : "Airport transfers between Bahrain and Saudi Arabia",
          description: copy.meta.description,
          serviceType: "Airport transfer",
          areaServed: ["Bahrain", "Saudi Arabia"],
          minPriceBhd: figures.fare,
        })}
      />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <AirportPage copy={copy} locale={locale} figures={figures} />
    </>
  );
}
