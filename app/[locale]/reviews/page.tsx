import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { whatsappHref } from "@/content/business";
import { breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const COPY: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    intro: string;
    shareHeading: string;
    shareBody: string;
    shareBtn: string;
    whatsappMessage: string;
  }
> = {
  en: {
    title: "Reviews | Taxi Bahrain to Dammam",
    description: "Rider feedback for our Bahrain–Saudi Arabia taxi service. We publish genuine reviews only — no invented testimonials.",
    eyebrow: "Reviews",
    heading: "We're collecting genuine rider reviews",
    intro:
      "This page will list real, attributable reviews from riders as they come in. We don't publish invented testimonials or ratings — if you don't see reviews yet, it's because we haven't collected enough to publish honestly.",
    shareHeading: "Ridden with us recently?",
    shareBody:
      "If you've taken a trip with us, we'd genuinely like to hear how it went — message us on WhatsApp with your feedback. With your permission, we'll publish it here under your name or initials once we have a solid set of reviews to show.",
    shareBtn: "Share your feedback on WhatsApp",
    whatsappMessage: "Hi, I'd like to share feedback about a recent trip.",
  },
  ar: {
    title: "التقييمات | تاكسي البحرين إلى الدمام",
    description: "آراء ركابنا في خدمة التاكسي بين البحرين والسعودية. ننشر تقييمات حقيقية فقط — دون شهادات ملفّقة.",
    eyebrow: "التقييمات",
    heading: "نجمع تقييمات حقيقية من ركابنا",
    intro:
      "ستُدرج هذه الصفحة تقييمات حقيقية وموثّقة من الركاب فور ورودها. نحن لا ننشر شهادات أو تقييمات ملفّقة — إذا لم ترَ تقييمات بعد، فذلك لأننا لم نجمع ما يكفي منها لنشرها بأمانة.",
    shareHeading: "سافرت معنا مؤخرًا؟",
    shareBody:
      "إذا كنت قد سافرت معنا، يسعدنا فعلًا معرفة رأيك — راسلنا عبر واتساب بتجربتك. بموافقتك، سننشرها هنا باسمك أو أحرفك الأولى بمجرد أن يتوفر لدينا عدد كافٍ من التقييمات لعرضها.",
    shareBtn: "شارك رأيك عبر واتساب",
    whatsappMessage: "مرحبًا، أودّ مشاركة رأيي حول رحلة أخيرة.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/reviews" : "/reviews";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/reviews"),
        "ar-BH": absoluteUrl("/ar/reviews"),
        "x-default": absoluteUrl("/reviews"),
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

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: copy.eyebrow, path: `${prefix}/reviews` },
  ];

  return (
    <>
      {/* No AggregateRating/Review schema by design: only genuine, attributable reviews get published, and none exist yet. */}
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="bg-ink py-14 lg:py-20">
        <div className="mx-auto max-w-[820px] px-5 lg:px-10">
          <p className="eyebrow text-brass-lit">{copy.eyebrow}</p>
          <h1 className="mt-3 text-[2rem] font-bold leading-tight text-white lg:text-[2.75rem]">
            {copy.heading}
          </h1>
          <p className="mt-5 text-base text-white/80 lg:text-lg">{copy.intro}</p>
        </div>
      </section>

      <TrustStrip locale={locale} />

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-[820px] px-5 lg:px-10">
          <h2 className="text-xl font-bold text-ink lg:text-2xl">{copy.shareHeading}</h2>
          <p className="mt-3 text-base leading-relaxed text-ink/85">{copy.shareBody}</p>
          <a
            href={whatsappHref(copy.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-input bg-brass px-6 text-sm font-semibold text-ink hover:bg-brass-lit"
            data-analytics="whatsapp_click"
          >
            {copy.shareBtn}
          </a>
        </div>
      </section>

      <CtaBand dict={dict} />
    </>
  );
}
