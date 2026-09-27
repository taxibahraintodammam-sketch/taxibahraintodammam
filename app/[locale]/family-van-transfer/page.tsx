import type { Metadata } from "next";
import { FAMILY_GROUP, type FamilyGroupCopy } from "@/content/family-group";
import { FAMILY_GROUP_AR } from "@/content/family-group.ar";
import { getDictionary } from "@/content/dictionary";
import { absoluteUrl } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FamilyGroupPage } from "@/components/family-group/FamilyGroupPage";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

// The page keeps its original URL; /family-group-transfer-bahrain-saudi/
// 301s here (next.config.ts).
const SLUG = "family-van-transfer";

function getCopy(locale: Locale): FamilyGroupCopy {
  return locale === "ar" ? FAMILY_GROUP_AR : FAMILY_GROUP;
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
      {/* No price in the schema: group fares depend on passengers, luggage and route. */}
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: locale === "ar" ? "نقل خاص للعائلات والمجموعات بين البحرين والسعودية" : "Private family & group transfers between Bahrain and Saudi Arabia",
          description: copy.meta.description,
          serviceType: "Private group transfer",
          areaServed: ["Bahrain", "Saudi Arabia"],
        })}
      />
      <SchemaScript data={faqPageSchema(copy.faq.items)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <FamilyGroupPage copy={copy} locale={locale} />
    </>
  );
}
