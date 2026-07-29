import type { Metadata } from "next";
import type { FleetVehicle } from "@/content/fleet";
import { absoluteUrl } from "@/lib/url";
import type { Locale } from "@/lib/locale";

export function buildFleetMetadata(vehicle: FleetVehicle, locale: Locale = "en"): Metadata {
  const enPath = `/fleet/${vehicle.slug}`;
  const arPath = `/ar/fleet/${vehicle.slug}`;
  const path = locale === "ar" ? arPath : enPath;
  return {
    title: vehicle.metaTitle,
    description: vehicle.metaDescription,
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
      title: vehicle.metaTitle,
      description: vehicle.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: vehicle.metaTitle,
      description: vehicle.metaDescription,
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
