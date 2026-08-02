import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import { breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const SERVICE_AREA: Record<Locale, Record<string, string[]>> = {
  en: {
    Bahrain: ["Manama", "Juffair", "Seef", "Muharraq", "Riffa", "Adliya", "Amwaj Islands", "Budaiya", "Isa Town", "Hamad Town", "Sitra", "Bahrain International Airport"],
    "Saudi Arabia": ["Dammam", "Khobar", "Jubail", "Al Ahsa / Hofuf", "Ras Tanura", "Abqaiq", "Qatif", "Riyadh"],
  },
  ar: {
    البحرين: ["المنامة", "الجفير", "السيف", "المحرق", "الرفاع", "العدلية", "جزر أمواج", "البديع", "مدينة عيسى", "مدينة حمد", "سترة", "مطار البحرين الدولي"],
    السعودية: ["الدمام", "الخبر", "الجبيل", "الأحساء / الهفوف", "رأس تنورة", "بقيق", "القطيف", "الرياض"],
  },
};

const COPY: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    body: string;
    whatsappLabel: string;
    callLabel: string;
    emailLabel: string;
    areaHeading: string;
    areaBody: string;
  }
> = {
  en: {
    title: "Contact Us | Phone, WhatsApp & Service Area",
    description:
      "Contact our Bahrain–Saudi Arabia taxi service by phone or WhatsApp, 24 hours a day. See our full service area across Bahrain and the Eastern Province.",
    eyebrow: "Contact",
    heading: "Talk to us on WhatsApp or by phone",
    body: "We're available 24 hours a day, 7 days a week. WhatsApp is the fastest way to get a fare confirmed; call if you'd rather speak to someone directly.",
    whatsappLabel: "WhatsApp",
    callLabel: "Call",
    emailLabel: "Email",
    areaHeading: "Service area",
    areaBody:
      "We collect and drop off across both sides of the King Fahd Causeway. If your address isn't listed below, message us the location and we'll confirm coverage and the fare.",
  },
  ar: {
    title: "تواصل معنا | الهاتف وواتساب ومنطقة الخدمة",
    description:
      "تواصل مع خدمة التاكسي بين البحرين والسعودية عبر الهاتف أو واتساب، على مدار 24 ساعة. اطّلع على منطقة خدمتنا الكاملة في البحرين والمنطقة الشرقية.",
    eyebrow: "تواصل معنا",
    heading: "تحدّث معنا عبر واتساب أو الهاتف",
    body: "نحن متاحون على مدار 24 ساعة، طوال أيام الأسبوع. واتساب أسرع طريقة لتأكيد السعر؛ اتصل بنا إذا كنت تفضّل التحدث مع أحدهم مباشرة.",
    whatsappLabel: "واتساب",
    callLabel: "اتصال",
    emailLabel: "البريد الإلكتروني",
    areaHeading: "منطقة الخدمة",
    areaBody: "نستلم ونوصّل على جانبي جسر الملك فهد. إذا لم يكن عنوانك مدرجًا أدناه، أرسل الموقع وسنؤكد التغطية والسعر.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/contact" : "/contact";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/contact"),
        "ar-BH": absoluteUrl("/ar/contact"),
        "x-default": absoluteUrl("/contact"),
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

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const serviceArea = SERVICE_AREA[locale];

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: copy.eyebrow, path: `${prefix}/contact` },
  ];

  return (
    <>
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="border-b border-ink/10 bg-white pb-16 pt-8 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-brass">{copy.eyebrow}</p>
            <h1 className="mt-3 text-[2rem] font-bold leading-tight text-ink lg:text-[2.75rem]">
              {copy.heading}
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate lg:text-lg">{copy.body}</p>
            <div className="mt-8 flex flex-col gap-4 border-t border-ink/10 pt-6">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-ink hover:text-brass"
                data-analytics="whatsapp_click"
              >
                {copy.whatsappLabel}: {BUSINESS.phoneDisplay}
              </a>
              <a
                href={telHref()}
                className="text-lg font-semibold text-ink hover:text-brass"
                data-analytics="call_click"
              >
                {copy.callLabel}: {BUSINESS.phoneDisplay}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="text-lg font-semibold text-ink hover:text-brass">
                {copy.emailLabel}: {BUSINESS.email}
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <h2 className="text-2xl font-bold text-ink lg:text-3xl">{copy.areaHeading}</h2>
          <p className="mt-3 max-w-2xl text-base text-slate">{copy.areaBody}</p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {Object.entries(serviceArea).map(([country, areas]) => (
              <div key={country} className="rounded-card border border-ink/10 bg-white p-6">
                <h3 className="eyebrow text-sea">{country}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <li
                      key={area}
                      className="rounded-input border border-ink/10 bg-ink/5 px-3 py-1.5 text-sm text-ink"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
