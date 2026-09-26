import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { BUSINESS, telHref } from "@/content/business";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import BookingTabs from "@/components/booking/BookingTabs";
import { FaqSection } from "@/components/sections/FaqSection";
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
    body: string;
    whatsappBtn: string;
    callBtn: string;
    stepsHeading: string;
    steps: { title: string; body: string }[];
    faqsHeading: string;
    faqs: { question: string; answer: string }[];
  }
> = {
  en: {
    title: "Book a Taxi | Bahrain–Saudi Arabia Causeway Transfer",
    description:
      "Book your Bahrain–Saudi Arabia taxi in one WhatsApp message. Fill in your route, date, passengers and vehicle, and get a fixed fare confirmed before you travel.",
    eyebrow: "Book Now",
    heading: "Get your fare on WhatsApp",
    body: "Tell us your route and we'll confirm a fixed, all-inclusive fare before you travel — no account, no app to download, no advance payment.",
    whatsappBtn: "Message us on WhatsApp",
    callBtn: "Call",
    stepsHeading: "How booking works",
    steps: [
      { title: "Fill in your trip", body: "From, to, date and time, passengers, and vehicle class — takes under a minute." },
      { title: "Send it on WhatsApp", body: "The form opens WhatsApp with your details pre-filled as a message to us." },
      { title: "Get your fixed fare", body: "We confirm the vehicle and the all-inclusive fare in the same chat, before you travel." },
    ],
    faqsHeading: "Booking FAQs",
    faqs: [
      { question: "Do I need to pay anything to reserve a booking?", answer: "No advance payment is required to confirm a booking — the fare is agreed on WhatsApp and settled with the driver as arranged in that conversation." },
      { question: "How far in advance can I book?", answer: "As far ahead as you like for routine trips, and we also take same-day and short-notice bookings depending on vehicle availability at the time." },
      { question: "Can I change my pickup time after booking?", answer: "Yes, message us on WhatsApp with the new time as early as you can — small adjustments are usually easy to accommodate." },
      { question: "What if I don't use WhatsApp?", answer: "Call us directly instead — the phone number is the same one used for WhatsApp, so either method reaches the same booking team." },
    ],
  },
  ar: {
    title: "احجز تاكسي | رحلة عبر جسر الملك فهد بين البحرين والسعودية",
    description:
      "احجز تاكسيك بين البحرين والسعودية برسالة واتساب واحدة. أدخل خطك وتاريخك وعدد الركاب، واحصل على سعر ثابت قبل السفر.",
    eyebrow: "احجز الآن",
    heading: "احصل على سعرك عبر واتساب",
    body: "أخبرنا بخطك وسنؤكد سعرًا ثابتًا شاملًا قبل السفر — دون حساب، ودون تطبيق لتنزيله، ودون دفع مسبق.",
    whatsappBtn: "راسلنا عبر واتساب",
    callBtn: "اتصل",
    stepsHeading: "كيف يسير الحجز",
    steps: [
      { title: "أدخل تفاصيل رحلتك", body: "من، إلى، التاريخ والوقت، عدد الركاب، والمركبة — أقل من دقيقة." },
      { title: "أرسلها عبر واتساب", body: "يفتح النموذج واتساب برسالة إلينا تتضمن تفاصيلك مسبقًا." },
      { title: "احصل على سعرك الثابت", body: "نؤكد المركبة والسعر الشامل في المحادثة نفسها، قبل السفر." },
    ],
    faqsHeading: "الأسئلة الشائعة حول الحجز",
    faqs: [
      { question: "هل أحتاج دفع أي شيء لتأكيد الحجز؟", answer: "لا حاجة لدفع مسبق لتأكيد الحجز — يُتفق على السعر عبر واتساب ويُسدَّد للسائق كما اتُّفق في تلك المحادثة." },
      { question: "قبل متى يمكنني الحجز؟", answer: "بأي مدة تريدها للرحلات الاعتيادية، ونقبل أيضًا حجوزات اليوم نفسه أو بإشعار قصير حسب توفر المركبات وقتها." },
      { question: "هل يمكنني تغيير موعد الاستلام بعد الحجز؟", answer: "نعم، راسلنا عبر واتساب بالوقت الجديد بأسرع ما يمكن — التعديلات الصغيرة عادةً سهلة الاستيعاب." },
      { question: "ماذا لو كنت لا أستخدم واتساب؟", answer: "اتصل بنا مباشرة بدلًا من ذلك — رقم الهاتف نفسه المستخدم لواتساب، لذا فكلتا الطريقتين تصلان إلى فريق الحجز نفسه." },
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
  const path = locale === "ar" ? "/ar/booking" : "/booking";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/booking"),
        "ar-BH": absoluteUrl("/ar/booking"),
        "x-default": absoluteUrl("/booking"),
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

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: copy.eyebrow, path: `${prefix}/booking` },
  ];

  return (
    <>
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <SchemaScript data={faqPageSchema(copy.faqs)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="border-b border-ink/10 bg-white pb-16 pt-8 lg:pb-20 lg:pt-12">
        {/* Phones: heading, then the form, then how it works. Desktop: steps sit under the heading, beside the form. */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-16 gap-y-8 px-5 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow text-brass">{copy.eyebrow}</p>
            <h1 className="mt-3 text-[2rem] font-bold leading-tight text-ink lg:text-[2.75rem]">
              {copy.heading}
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate lg:text-lg">{copy.body}</p>
          </div>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:items-center">
            <BookingTabs locale={locale} />
          </div>
          <div>
            <ol className="flex flex-col gap-5 border-t border-ink/10 pt-6">
              {copy.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-[family-name:var(--font-mono)] text-xs text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="mt-0.5 text-sm text-slate">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-slate">
              {copy.callBtn}{" "}
              <a href={telHref()} dir="ltr" className="font-semibold text-ink hover:text-sea" data-analytics="call_click">
                {BUSINESS.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={copy.faqs} heading={copy.faqsHeading} dict={dict} locale={locale} />
    </>
  );
}
