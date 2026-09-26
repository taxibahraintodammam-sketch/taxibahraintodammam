import { getRoute } from "@/content/routes";
import { getRouteAr } from "@/content/routes.ar";
import { ROUTE_FARES, fareWithSar } from "@/content/fares";
import { JUBAIL_META, JUBAIL_FAQS } from "@/content/jubail";
import { buildRouteMetadata } from "@/lib/route-metadata";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RoutePageTemplate } from "@/components/route-page/RoutePageTemplate";
import { JubailPage } from "@/components/jubail/JubailPage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "taxi-bahrain-to-jubail";

function getContent(locale: Locale) {
  return locale === "ar" ? getRouteAr(SLUG)! : getRoute(SLUG)!;
}

/** The FAQ price answer is built from fares.ts so it can't drift from the published fares. */
function jubailFaqs() {
  const fares = Object.fromEntries((ROUTE_FARES[SLUG] ?? []).map((f) => [f.vehicle, fareWithSar(f)]));
  const fareAnswer = `From BHD ${fares.sedan.bhd} (about SAR ${fares.sedan.sar}) one-way in a sedan. Vans start from BHD ${fares.van.bhd}, SUVs from BHD ${fares.suv.bhd} and luxury sedans from BHD ${fares.luxury.bhd}. The causeway toll is included. Your exact fixed fare depends on your pickup, destination and vehicle, and we confirm it on WhatsApp before you travel.`;
  return JUBAIL_FAQS.map((faq) => ({ ...faq, answer: faq.answer.replace("{fareAnswer}", fareAnswer) }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const route = getContent(locale);
  // The Arabic page is still the shared template; only English gets the bespoke copy.
  return buildRouteMetadata(
    locale === "en" ? { ...route, metaTitle: JUBAIL_META.title, metaDescription: JUBAIL_META.description } : route,
    locale
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const route = getContent(locale);

  if (locale === "ar") {
    return <RoutePageTemplate route={route} locale={locale} />;
  }

  const faqs = jubailFaqs();
  const minFare = Math.min(...(ROUTE_FARES[SLUG] ?? []).map((f) => f.bhd));
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "King Fahd Causeway Taxi", path: "/king-fahd-causeway-taxi" },
    { name: "Bahrain to Jubail Taxi", path: `/${SLUG}` },
  ];

  return (
    <>
      <SchemaScript
        data={serviceSchema({
          path: `/${SLUG}`,
          name: "Private taxi from Bahrain to Jubail",
          description: JUBAIL_META.description,
          serviceType: "Cross-border private taxi transfer",
          areaServed: ["Bahrain", "Jubail"],
          minPriceBhd: minFare,
        })}
      />
      <SchemaScript data={faqPageSchema(faqs)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <JubailPage route={route} faqs={faqs} />
    </>
  );
}
