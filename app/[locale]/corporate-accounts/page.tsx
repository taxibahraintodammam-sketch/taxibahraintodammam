import type { Metadata } from "next";
import { CORPORATE, type CorporateCopy } from "@/content/corporate";
import { CORPORATE_AR } from "@/content/corporate.ar";
import { getDictionary } from "@/content/dictionary";
import { absoluteUrl } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CorporatePage } from "@/components/corporate/CorporatePage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "corporate-accounts";

function getCopy(locale: Locale): CorporateCopy {
  return locale === "ar" ? CORPORATE_AR : CORPORATE;
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
      {/* Quote-led: no price or offer in the schema. */}
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: locale === "ar" ? "حسابات النقل للشركات بين البحرين والسعودية" : "Corporate transport accounts between Bahrain and Saudi Arabia",
          description: copy.meta.description,
          serviceType: "Corporate transport account",
          areaServed: ["Bahrain", "Saudi Arabia"],
        })}
      />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <CorporatePage copy={copy} locale={locale} />
    </>
  );
}
