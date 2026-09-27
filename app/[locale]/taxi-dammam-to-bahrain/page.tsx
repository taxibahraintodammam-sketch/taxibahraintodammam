import type { Metadata } from "next";
import { getRoute } from "@/content/routes";
import { getRouteAr } from "@/content/routes.ar";
import { lowestFare } from "@/content/fares";
import { buildRouteMetadata } from "@/lib/route-metadata";
import { RoutePageTemplate } from "@/components/route-page/RoutePageTemplate";
import { DammamBahrainPage } from "@/components/dammam-bahrain/DammamBahrainPage";
import { DB_META, DB_FAQS, DB_ROUTE_SLUG } from "@/content/dammam-bahrain";
import { absoluteUrl } from "@/lib/url";
import { tripSchema, serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getDictionary, fillTemplate } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  if (locale === "ar") return buildRouteMetadata(getRouteAr(DB_ROUTE_SLUG)!, locale);

  const enPath = `/${DB_ROUTE_SLUG}`;
  const arPath = `/ar/${DB_ROUTE_SLUG}`;
  return {
    title: DB_META.title,
    description: DB_META.description,
    alternates: {
      canonical: absoluteUrl(enPath),
      languages: { "en-BH": absoluteUrl(enPath), "ar-BH": absoluteUrl(arPath), "x-default": absoluteUrl(enPath) },
    },
    openGraph: {
      type: "website",
      locale: "en_BH",
      siteName: "Taxi Bahrain to Dammam",
      url: absoluteUrl(enPath),
      title: DB_META.title,
      description: DB_META.description,
    },
    twitter: { card: "summary_large_image", title: DB_META.title, description: DB_META.description },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };

  if (locale === "ar") {
    return <RoutePageTemplate route={getRouteAr(DB_ROUTE_SLUG)!} locale="ar" />;
  }

  const route = getRoute(DB_ROUTE_SLUG)!;
  const dict = getDictionary("en");
  const fare = lowestFare(DB_ROUTE_SLUG);
  const breadcrumbItems = [
    { name: dict.homeCrumb, path: "/" },
    { name: dict.causewayHubName, path: "/king-fahd-causeway-taxi" },
    { name: fillTemplate(dict.taxiFromTo, { from: route.from, to: route.to }), path: `/${DB_ROUTE_SLUG}` },
  ];

  return (
    <>
      <SchemaScript
        data={tripSchema({
          path: `/${DB_ROUTE_SLUG}`,
          name: `Taxi from ${route.from} to ${route.to}`,
          fromName: route.from,
          toName: route.to,
          minPriceBhd: fare?.bhd ?? 0,
        })}
      />
      <SchemaScript
        data={serviceSchema({
          path: `/${DB_ROUTE_SLUG}`,
          name: `Taxi from ${route.from} to ${route.to}`,
          description: DB_META.description,
          serviceType: "Cross-border taxi transfer",
          areaServed: [route.from, route.to],
          minPriceBhd: fare?.bhd ?? 0,
        })}
      />
      <SchemaScript data={faqPageSchema(DB_FAQS)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <DammamBahrainPage />
    </>
  );
}
