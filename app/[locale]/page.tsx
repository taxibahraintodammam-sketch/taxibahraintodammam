import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { localBusinessSchema, websiteSchema, faqPageSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CausewayStrip } from "@/components/sections/CausewayStrip";
import { RouteCardGrid } from "@/components/sections/RouteCardGrid";
import { FareTableTeaser } from "@/components/sections/FareTableTeaser";
import { FleetTeaser } from "@/components/sections/FleetTeaser";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { HOME_FAQS } from "@/content/faqs-home";
import { HOME_FAQS_AR } from "@/content/faqs-home.ar";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const COPY: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Bahrain to Dammam Taxi Service | King Fahd Causeway 24/7",
    description:
      "Licensed cross-border taxi service between Bahrain and Saudi Arabia via the King Fahd Causeway. Fixed fares, every route, English & Arabic drivers. Book on WhatsApp, 24/7.",
  },
  ar: {
    title: "خدمة تاكسي البحرين إلى السعودية | جسر الملك فهد 24/7",
    description:
      "خدمة تاكسي مرخّصة عابرة للحدود بين البحرين والسعودية عبر جسر الملك فهد. أسعار ثابتة لكل الخطوط، سائقون يتحدثون العربية والإنجليزية. احجز عبر واتساب على مدار الساعة.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/" : "/";
  return {
    title: copy.title,
    description: copy.description,
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
      title: copy.title,
      description: copy.description,
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const dict = getDictionary(locale);
  const faqs = locale === "ar" ? HOME_FAQS_AR : HOME_FAQS;

  return (
    <>
      <SchemaScript data={localBusinessSchema()} />
      <SchemaScript data={websiteSchema()} />
      <SchemaScript data={faqPageSchema(faqs)} />

      <Hero locale={locale} />
      <TrustStrip locale={locale} />
      <CausewayStrip locale={locale} />
      <RouteCardGrid locale={locale} />
      <FareTableTeaser locale={locale} />
      <FleetTeaser locale={locale} />
      <FaqSection faqs={faqs} dict={dict} locale={locale} />
      <CtaBand dict={dict} />
    </>
  );
}
