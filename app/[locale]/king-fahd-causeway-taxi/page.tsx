import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { CAUSEWAY_HUB } from "@/content/causeway-hub";
import { CAUSEWAY_HUB_AR } from "@/content/causeway-hub.ar";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { CausewayStrip } from "@/components/sections/CausewayStrip";
import { RouteCardGrid } from "@/components/sections/RouteCardGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SLUG = "king-fahd-causeway-taxi";

function getContent(locale: Locale) {
  return locale === "ar" ? CAUSEWAY_HUB_AR : CAUSEWAY_HUB;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const hub = getContent(locale);
  const enPath = `/${SLUG}`;
  const arPath = `/ar/${SLUG}`;
  const path = locale === "ar" ? arPath : enPath;
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
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
      title: hub.metaTitle,
      description: hub.metaDescription,
    },
    twitter: { card: "summary_large_image", title: hub.metaTitle, description: hub.metaDescription },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function CausewayHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const hub = getContent(locale);
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const isAr = locale === "ar";

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: dict.causewayHubName, path: `${prefix}/${SLUG}` },
  ];

  return (
    <>
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${SLUG}`,
          name: dict.causewayHubName,
          description: hub.metaDescription,
          serviceType: "Cross-border taxi transfer",
          areaServed: ["Bahrain", "Dammam", "Khobar", "Jubail", "Riyadh", "Al Ahsa", "Ras Tanura", "Qatif"],
          minPriceBhd: 22,
        })}
      />
      <SchemaScript data={faqPageSchema(hub.faqs)} />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="bg-ink pb-16 pt-8 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-brass-lit">
              {isAr ? "البحرين ⇄ السعودية · مرخّصة على مدار الساعة" : "Bahrain ⇄ Saudi Arabia · Licensed 24/7"}
            </p>
            <h1 className="mt-3 text-[2rem] font-bold leading-tight text-white lg:text-[2.75rem]">
              {dict.causewayHubName}
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/80 lg:text-lg">{hub.intro[0]}</p>
          </div>
          <div className="flex items-center">
            <QuoteForm />
          </div>
        </div>
      </section>

      <CausewayStrip
        fromLabel={isAr ? "استلام، البحرين" : "Pickup, Bahrain"}
        toLabel={isAr ? "توصيل، السعودية" : "Drop-off, Saudi Arabia"}
        locale={locale}
      />

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-[820px] px-5 lg:px-10">
          <div className="flex flex-col gap-4">
            {hub.intro.slice(1).map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-ink/85">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-10">
            {hub.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-ink lg:text-2xl">{section.heading}</h2>
                <div className="mt-3 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base leading-relaxed text-ink/85">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RouteCardGrid locale={locale} />

      <FaqSection
        faqs={hub.faqs}
        heading={isAr ? "الأسئلة الشائعة — عبور جسر الملك فهد" : "FAQs — King Fahd Causeway Crossing"}
        dict={dict}
        locale={locale}
      />

      <CtaBand dict={dict} />
    </>
  );
}
