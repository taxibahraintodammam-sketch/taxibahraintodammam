import type { Metadata } from "next";
import type { ServiceContent } from "@/content/services";
import { absoluteUrl } from "@/lib/url";
import type { Locale } from "@/lib/locale";

export function buildServiceMetadata(service: ServiceContent, locale: Locale = "en"): Metadata {
  const path = locale === "ar" ? `/ar/${service.slug}` : `/${service.slug}`;
  const enPath = `/${service.slug}`;
  const arPath = `/ar/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
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
      title: service.metaTitle,
      description: service.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
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
