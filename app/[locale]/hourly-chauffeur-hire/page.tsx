import type { Metadata } from "next";
import { HOURLY, type HourlyCopy } from "@/content/hourly";
import { HOURLY_AR } from "@/content/hourly.ar";
import { getService } from "@/content/services";
import { getDictionary } from "@/content/dictionary";
import { absoluteUrl } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { HourlyPage } from "@/components/hourly/HourlyPage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "hourly-chauffeur-hire";

function getCopy(locale: Locale): HourlyCopy {
  return locale === "ar" ? HOURLY_AR : HOURLY;
}

/** The published starting reference lives with the service data (content/services.ts). */
const minPriceBhd = getService(SLUG)?.minPriceBhd;

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
      images: [{ url: absoluteUrl("/hero/slide-chauffeur.webp"), width: 1920, height: 1080 }],
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
      {/* Starting reference only; no hourly packages, ratings or reviews. */}
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: copy.schemaName,
          description: copy.meta.description,
          serviceType: "Hourly chauffeur hire",
          areaServed: ["Bahrain", "Saudi Arabia"],
          minPriceBhd,
        })}
      />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <HourlyPage copy={copy} locale={locale} minPriceBhd={minPriceBhd} />
    </>
  );
}
