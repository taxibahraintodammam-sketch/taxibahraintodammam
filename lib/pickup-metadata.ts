import type { Metadata } from "next";
import type { PickupArea } from "@/content/pickup-areas";
import { absoluteUrl } from "@/lib/url";
import type { Locale } from "@/lib/locale";

export function buildPickupMetadata(area: PickupArea, locale: Locale = "en"): Metadata {
  const enPath = `/pickup/${area.slug}`;
  const arPath = `/ar/pickup/${area.slug}`;
  const path = locale === "ar" ? arPath : enPath;
  return {
    title: area.metaTitle,
    description: area.metaDescription,
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
      locale: locale === "ar" ? "ar_BH" : "en_BH",
      siteName: "Taxi Bahrain to Dammam",
      url: absoluteUrl(path),
      title: area.metaTitle,
      description: area.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}
