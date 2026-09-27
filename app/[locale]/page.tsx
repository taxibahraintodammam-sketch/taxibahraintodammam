import type { Metadata } from "next";
import { absoluteUrl, withSlash } from "@/lib/url";
import { localBusinessSchema, websiteSchema, faqPageSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { getRoute } from "@/content/routes";
import { getRouteAr } from "@/content/routes.ar";
import { ROUTE_FARES, fareWithSar, lowestFare } from "@/content/fares";
import { HOME, type HomeCopy } from "@/content/home";
import { HOME_AR } from "@/content/home.ar";
import { HomePage, type HomeFigures } from "@/components/home/HomePage";
import type { HomeBranch } from "@/components/home/HomeWidgets";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

/** The branches after the causeway, grouped the way passengers think about them. */
const BRANCHES: { slug: string; group: HomeBranch["group"] }[] = [
  { slug: "taxi-bahrain-to-khobar", group: "near" },
  { slug: "taxi-bahrain-to-dammam", group: "near" },
  { slug: "taxi-bahrain-to-qatif", group: "near" },
  { slug: "bahrain-to-dammam-airport-taxi", group: "airport" },
  { slug: "taxi-bahrain-to-abqaiq", group: "east" },
  { slug: "taxi-bahrain-to-jubail", group: "east" },
  { slug: "taxi-bahrain-to-ras-tanura", group: "east" },
  { slug: "taxi-bahrain-to-al-ahsa-hofuf", group: "east" },
  { slug: "taxi-bahrain-to-riyadh", group: "long" },
];
const LONG = ["taxi-bahrain-to-riyadh", "taxi-bahrain-to-al-ahsa-hofuf", "taxi-bahrain-to-ras-tanura", "taxi-bahrain-to-jubail", "taxi-bahrain-to-abqaiq"];

/** Every distance, time and fare on the homepage comes from the shared route and fare data. */
function getFigures(locale: Locale): HomeFigures {
  const route = locale === "ar" ? getRouteAr : getRoute;
  const prefix = locale === "ar" ? "/ar" : "";
  const href = (slug: string) => withSlash(`${prefix}/${slug}`);
  const dmm = (v: string) => {
    const f = ROUTE_FARES["taxi-bahrain-to-dammam"]?.find((x) => x.vehicle === v);
    return f ? fareWithSar(f) : undefined;
  };
  return {
    branches: BRANCHES.map(({ slug, group }) => {
      const r = route(slug)!;
      return { key: slug, name: r.to, km: r.distanceKm, time: r.durationLabel, fare: lowestFare(slug)?.bhd, href: href(slug), group };
    }).sort((a, b) => a.km - b.km),
    dammamFares: { sedan: dmm("sedan"), van: dmm("van"), suv: dmm("suv"), luxury: dmm("luxury") },
    long: LONG.map((slug) => {
      const r = route(slug)!;
      return { name: r.to, km: r.distanceKm, time: r.durationLabel, href: href(slug) };
    }),
  };
}

function getCopy(locale: Locale): HomeCopy {
  const raw = locale === "ar" ? HOME_AR : HOME;
  const dammam = (locale === "ar" ? getRouteAr : getRoute)("taxi-bahrain-to-dammam")!;
  const map: Record<string, string> = { dammamTime: dammam.durationLabel, dammamKm: String(dammam.distanceKm) };
  return JSON.parse(JSON.stringify(raw).replace(/\{(dammamTime|dammamKm)\}/g, (_, k: string) => map[k])) as HomeCopy;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const { meta } = getCopy(locale);
  const path = locale === "ar" ? "/ar/" : "/";
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/"),
        "ar-BH": absoluteUrl("/ar/"),
        "x-default": absoluteUrl("/"),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_BH" : "en_BH",
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

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = getCopy(locale);

  return (
    <>
      <SchemaScript data={localBusinessSchema()} />
      <SchemaScript data={websiteSchema()} />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <HomePage copy={copy} locale={locale} figures={getFigures(locale)} />
    </>
  );
}
