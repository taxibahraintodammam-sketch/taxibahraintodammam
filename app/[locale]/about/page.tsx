import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
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
    sections: { heading: string; paragraphs: string[] }[];
  }
> = {
  en: {
    title: "About Us | Licensed Cross-Border Operator, Bahrain–Saudi Arabia",
    description:
      "A licensed taxi and chauffeur operator running the Bahrain–Saudi Arabia corridor via the King Fahd Causeway. Licensed drivers, fixed fares, 24/7 availability.",
    eyebrow: "About Us",
    heading: "A licensed operator built around one corridor",
    intro:
      "We run a licensed taxi and chauffeur service focused entirely on the Bahrain–Saudi Arabia corridor via the King Fahd Causeway — one route family, done properly, rather than a general taxi company that happens to also cross the border.",
    sections: [
      {
        heading: "Meet the Founder",
        paragraphs: [
          "Taxi Bahrain to Dammam was founded by Fahad, who spent 15 years working in the transportation industry before building this operator around the Bahrain–Saudi Arabia corridor specifically.",
          "That background — knowing how the King Fahd Causeway crossing actually runs, day to day, in both directions — is why the service is built around fixed fares, licensed drivers, and one corridor done properly, rather than a general taxi operation that also happens to cross the border.",
        ],
      },
      {
        heading: "Licensing and Compliance",
        paragraphs: [
          "We operate as a licensed cross-border transport provider, with vehicles insured and documented for travel between Bahrain and Saudi Arabia. Licensing and insurance paperwork for the vehicle itself is handled entirely by us at every immigration post — it is never something a passenger needs to arrange.",
          "What we don't do is process visas, permits, or any passenger-side immigration paperwork. Each passenger is responsible for their own travel documents and their own entry requirements into whichever country they're crossing into — we're a transport operator, not an immigration authority or adviser.",
        ],
      },
      {
        heading: "Our Drivers",
        paragraphs: [
          "Drivers on this corridor operate in both English and Arabic, and are familiar with the specific rhythm of the King Fahd Causeway crossing — which immigration windows tend to move faster, how border traffic shifts through the week, and how to keep a long-distance drive comfortable rather than rushed.",
          "Vehicles are matched to the route and passenger count you book, from a standard sedan through to the Mercedes S-Class and 30-seat coaster, and are maintained to a standard suited for multi-hour trips, not just short city journeys.",
        ],
      },
      {
        heading: "Safety and Reliability",
        paragraphs: [
          "Every fare is confirmed in writing on WhatsApp before you travel, so there's a clear record of the vehicle, price, and pickup details agreed for your trip. We run 24 hours a day, seven days a week, including overnight and holiday crossings, and the same driver takes you from your pickup address to your final drop-off with no changeover at the border.",
        ],
      },
      {
        heading: "Why We Focus on One Corridor",
        paragraphs: [
          "Rather than being a general taxi operator that also happens to cross borders, we built the whole business around the Bahrain–Saudi Arabia corridor specifically — the King Fahd Causeway crossing, the immigration process on both sides, and the cities and towns realistically reached from it. That focus is why every route page on this site has real distance, timing, and fare information rather than a generic template.",
        ],
      },
    ],
  },
  ar: {
    title: "من نحن | شركة مرخّصة عابرة للحدود، البحرين–السعودية",
    description:
      "شركة تاكسي وشوفير مرخّصة تُشغّل ممر البحرين–السعودية عبر جسر الملك فهد. سائقون مرخّصون، أسعار ثابتة، تواجد على مدار الساعة.",
    eyebrow: "من نحن",
    heading: "شركة مرخّصة مبنية حول ممر واحد",
    intro:
      "نُشغّل خدمة تاكسي وشوفير مرخّصة تركّز بالكامل على ممر البحرين–السعودية عبر جسر الملك فهد — عائلة خطوط واحدة، مُنفَّذة باحتراف، بدلًا من شركة تاكسي عامة تصادف أنها تعبر الحدود أيضًا.",
    sections: [
      {
        heading: "تعرف على المؤسس",
        paragraphs: [
          "تأسست شركة تاكسي البحرين إلى الدمام على يد فهد، الذي أمضى 15 عامًا في العمل بقطاع النقل قبل أن يبني هذه الشركة حول ممر البحرين–السعودية تحديدًا.",
          "هذه الخبرة — معرفة كيف يسير عبور جسر الملك فهد فعليًا، يومًا بعد يوم وفي الاتجاهين — هي سبب بناء الخدمة حول أسعار ثابتة وسائقين مرخّصين وممر واحد يُنفَّذ باحتراف، بدلًا من شركة تاكسي عامة تصادف أنها تعبر الحدود أيضًا.",
        ],
      },
      {
        heading: "الترخيص والامتثال",
        paragraphs: [
          "نعمل كشركة نقل مرخّصة عابرة للحدود، بمركبات مؤمَّنة وموثّقة للسفر بين البحرين والسعودية. أوراق ترخيص وتأمين المركبة نفسها تتولاها شركتنا بالكامل عند كل نقطة هجرة — وهذا ليس أمرًا يحتاج الراكب ترتيبه أبدًا.",
          "ما لا نقوم به هو معالجة التأشيرات أو التصاريح أو أي أوراق هجرة خاصة بالراكب. كل راكب مسؤول عن مستنداته الخاصة ومتطلبات الدخول الخاصة به إلى أي دولة يعبر إليها — نحن شركة نقل، وليست جهة أو مستشارًا للهجرة.",
        ],
      },
      {
        heading: "سائقونا",
        paragraphs: [
          "يعمل السائقون على هذا الممر باللغتين الإنجليزية والعربية، وهم على دراية بإيقاع عبور جسر الملك فهد بالتحديد — أي نوافذ الهجرة تتحرك أسرع، وكيف تتغيّر حركة الحدود عبر الأسبوع، وكيف تُبقي رحلة طويلة مريحة بدلًا من متسرعة.",
          "تُخصَّص المركبات حسب الخط وعدد الركاب الذي تحجزه، من السيدان القياسية إلى مرسيدس الفئة S والحافلة ذات الثلاثين مقعدًا، وتُصان بمعيار يناسب رحلات متعددة الساعات، لا رحلات المدينة القصيرة فقط.",
        ],
      },
      {
        heading: "السلامة والموثوقية",
        paragraphs: [
          "يُؤكَّد كل سعر كتابيًا عبر واتساب قبل السفر، ما يمنحك سجلًا واضحًا بالمركبة والسعر وتفاصيل الاستلام المتفق عليها لرحلتك. نعمل على مدار 24 ساعة طوال أيام الأسبوع، بما في ذلك العبور الليلي وفي العطلات، ويأخذك السائق نفسه من عنوان الاستلام إلى التوصيل النهائي دون تبديل عند الحدود.",
        ],
      },
      {
        heading: "لماذا نركّز على ممر واحد",
        paragraphs: [
          "بدلًا من أن نكون شركة تاكسي عامة تعبر الحدود أيضًا، بنينا الشركة بأكملها حول ممر البحرين–السعودية تحديدًا — عبور جسر الملك فهد، وعملية الهجرة على كلا الجانبين، والمدن والبلدات التي يمكن الوصول إليها منه فعليًا. هذا التركيز هو سبب احتواء كل صفحة خط على هذا الموقع على مسافة وتوقيت وسعر حقيقيين بدلًا من قالب عام.",
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/about" : "/about";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/about"),
        "ar-BH": absoluteUrl("/ar/about"),
        "x-default": absoluteUrl("/about"),
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

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: copy.eyebrow, path: `${prefix}/about` },
  ];

  return (
    <>
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
        <div className="mx-auto flex max-w-[820px] flex-col gap-10 px-5 lg:px-10">
          {copy.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold text-ink lg:text-2xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="mt-3 text-base leading-relaxed text-ink/85">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <CtaBand dict={dict} />
    </>
  );
}
