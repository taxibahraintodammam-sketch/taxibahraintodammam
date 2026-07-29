import type { Metadata } from "next";
import type { RouteContent } from "@/content/routes";
import { absoluteUrl } from "@/lib/url";
import type { Locale } from "@/lib/locale";

export function buildRouteMetadata(route: RouteContent, locale: Locale = "en"): Metadata {
  const path = locale === "ar" ? `/ar/${route.slug}` : `/${route.slug}`;
  const enPath = `/${route.slug}`;
  const arPath = `/ar/${route.slug}`;
  return {
    title: route.metaTitle,
    description: route.metaDescription,
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
      title: route.metaTitle,
      description: route.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: route.metaTitle,
      description: route.metaDescription,
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
