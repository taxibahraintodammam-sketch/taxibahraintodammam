import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { MASTER_FAQ_CATEGORIES, ALL_MASTER_FAQS } from "@/content/faqs-master";
import { MASTER_FAQ_CATEGORIES_AR, ALL_MASTER_FAQS_AR } from "@/content/faqs-master.ar";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const COPY: Record<Locale, { title: string; description: string; heading: string; bodyPrefix: string; bodySuffix: string }> = {
  en: {
    title: "FAQs | Taxi Bahrain to Dammam & the King Fahd Causeway",
    description:
      "Answers on booking, fares, the King Fahd Causeway crossing, documents and visas, vehicles, routes, and safety for our Bahrain–Saudi Arabia taxi service.",
    heading: "Everything you need to know before you cross",
    bodyPrefix: "",
    bodySuffix: " questions covering booking, fares, the causeway crossing, documents, vehicles, routes, and safety.",
  },
  ar: {
    title: "الأسئلة الشائعة | تاكسي البحرين إلى الدمام وجسر الملك فهد",
    description:
      "إجابات حول الحجز والأسعار وعبور جسر الملك فهد والمستندات والتأشيرات والمركبات والخطوط والسلامة لخدمة التاكسي بين البحرين والسعودية.",
    heading: "كل ما تحتاج معرفته قبل العبور",
    bodyPrefix: "",
    bodySuffix: " سؤالًا يغطي الحجز والأسعار وعبور الجسر والمستندات والمركبات والخطوط والسلامة.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/faqs" : "/faqs";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/faqs"),
        "ar-BH": absoluteUrl("/ar/faqs"),
        "x-default": absoluteUrl("/faqs"),
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

export default async function FaqsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const categories = locale === "ar" ? MASTER_FAQ_CATEGORIES_AR : MASTER_FAQ_CATEGORIES;
  const allFaqs = locale === "ar" ? ALL_MASTER_FAQS_AR : ALL_MASTER_FAQS;

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: locale === "ar" ? "الأسئلة الشائعة" : "FAQs", path: `${prefix}/faqs` },
  ];

  return (
    <>
      <SchemaScript data={faqPageSchema(allFaqs)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="bg-ink py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <p className="eyebrow text-brass-lit">{locale === "ar" ? "الأسئلة الشائعة" : "FAQs"}</p>
          <h1 className="mt-3 max-w-2xl text-[2rem] font-bold leading-tight text-white lg:text-[2.75rem]">
            {copy.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 lg:text-lg">
            {copy.bodyPrefix}
            {allFaqs.length}
            {copy.bodySuffix}
          </p>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto flex max-w-[900px] flex-col gap-12 px-5 lg:px-10">
          {categories.map((category) => (
            <div key={category.heading}>
              <h2 className="text-xl font-bold text-ink lg:text-2xl">{category.heading}</h2>
              <div className="mt-5">
                <FaqAccordion faqs={category.faqs} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand dict={dict} />
    </>
  );
}
