import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FLEET, getFleetVehicle } from "@/content/fleet";
import { getFleetVehicleAr } from "@/content/fleet.ar";
import { SUV, type SuvCopy } from "@/content/suv";
import { SUV_AR } from "@/content/suv.ar";
import { minFareForVehicleClass } from "@/content/fares";
import { getDictionary } from "@/content/dictionary";
import { buildFleetMetadata } from "@/lib/fleet-metadata";
import { absoluteUrl } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FleetDetailTemplate } from "@/components/fleet-page/FleetDetailTemplate";
import { SuvPage } from "@/components/suv/SuvPage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";
export const dynamicParams = false;

/** The SUV class has its own hand-built page; the other vehicles use the template. */
const SUV_SLUG = "suv-gmc-tahoe";

export function generateStaticParams() {
  return FLEET.map((vehicle) => ({ vehicle: vehicle.slug }));
}

function getContent(slug: string, locale: Locale) {
  return locale === "ar" ? getFleetVehicleAr(slug) : getFleetVehicle(slug);
}

function suvCopy(locale: Locale): SuvCopy {
  return locale === "ar" ? SUV_AR : SUV;
}

function suvMetadata(locale: Locale): Metadata {
  const { meta } = suvCopy(locale);
  const enPath = `/fleet/${SUV_SLUG}`;
  const arPath = `/ar/fleet/${SUV_SLUG}`;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; vehicle: string }>;
}) {
  const { locale, vehicle: slug } = (await params) as { locale: Locale; vehicle: string };
  if (slug === SUV_SLUG) return suvMetadata(locale);
  const vehicle = getContent(slug, locale);
  if (!vehicle) return {};
  return buildFleetMetadata(vehicle, locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; vehicle: string }>;
}) {
  const { locale, vehicle: slug } = (await params) as { locale: Locale; vehicle: string };
  if (slug === SUV_SLUG) return <Suv locale={locale} />;
  const vehicle = getContent(slug, locale);
  if (!vehicle) notFound();
  return <FleetDetailTemplate vehicle={vehicle} locale={locale} />;
}

function Suv({ locale }: { locale: Locale }) {
  const copy = suvCopy(locale);
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: dict.fleetCrumb, path: `${prefix}/fleet` },
    { name: copy.crumb, path: `${prefix}/fleet/${SUV_SLUG}` },
  ];
  return (
    <>
      {/* Starting price is the lowest published SUV fare in content/fares.ts; no ratings or reviews. */}
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/fleet/${SUV_SLUG}`,
          name: copy.schemaName,
          description: copy.meta.description,
          serviceType: "SUV transfer",
          areaServed: ["Bahrain", "Saudi Arabia"],
          minPriceBhd: minFareForVehicleClass("suv"),
        })}
      />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <SuvPage copy={copy} locale={locale} />
    </>
  );
}
