import type { Metadata } from "next";
import { getRoute } from "@/content/routes";
import { getRouteAr } from "@/content/routes.ar";
import { lowestFare } from "@/content/fares";
import { DHAHRAN, type DhahranCopy } from "@/content/dhahran";
import { DHAHRAN_AR } from "@/content/dhahran.ar";
import { getDictionary } from "@/content/dictionary";
import { absoluteUrl } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DhahranPage, fillDhahran, type DhahranFigures } from "@/components/dhahran/DhahranPage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "taxi-bahrain-to-dhahran";

function getCopy(locale: Locale): DhahranCopy {
  return locale === "ar" ? DHAHRAN_AR : DHAHRAN;
}

/**
 * Dhahran has no published fare or duration of its own. These are the real
 * neighbouring Khobar/Dammam figures, shown on the page only as a labelled guide.
 */
function getFigures(locale: Locale): DhahranFigures {
  const route = locale === "ar" ? getRouteAr : getRoute;
  return {
    khobar: route("taxi-bahrain-to-khobar")!.durationLabel,
    dammam: route("taxi-bahrain-to-dammam")!.durationLabel,
    khobarFare: lowestFare("taxi-bahrain-to-khobar")!.bhd,
    dammamFare: lowestFare("taxi-bahrain-to-dammam")!.bhd,
  };
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
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
    { name: dict.causewayHubName, path: `${prefix}/king-fahd-causeway-taxi` },
    { name: copy.crumb, path: `${prefix}/${SLUG}` },
  ];
  const faqs = copy.faq.items.map((item) => ({ ...item, answer: fillDhahran(item.answer, figures) }));

  return (
    <>
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: locale === "ar" ? "تاكسي خاص من البحرين إلى الظهران" : "Private taxi from Bahrain to Dhahran",
          description: copy.meta.description,
          serviceType: "Cross-border private taxi transfer",
          areaServed: ["Bahrain", "Dhahran"],
        })}
      />
      <SchemaScript data={faqPageSchema(faqs)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <DhahranPage copy={copy} locale={locale} figures={figures} />
    </>
  );
}
