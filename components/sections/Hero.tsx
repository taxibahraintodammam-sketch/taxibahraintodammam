import Image from "next/image";
import { QuoteForm } from "@/components/ui/QuoteForm";
import type { Locale } from "@/lib/locale";

const COPY: Record<Locale, { eyebrow: string; heading: string; body: string; hint: string; alt: string }> = {
  en: {
    eyebrow: "Bahrain ⇄ Saudi Arabia · King Fahd Causeway",
    heading: "Private taxi from Bahrain to Dammam and across Saudi Arabia",
    body: "For travellers, families, airport passengers and business trips. Tell us where you're going and we'll confirm a fixed fare on WhatsApp before you travel.",
    hint: "Opens WhatsApp with your trip filled in. We reply with a fixed fare. Nothing is booked or paid until you confirm.",
    alt: "The King Fahd Causeway between Bahrain and Saudi Arabia at sunset",
  },
  ar: {
    eyebrow: "البحرين ⇄ السعودية · جسر الملك فهد",
    heading: "تاكسي خاص من البحرين إلى الدمام وأنحاء السعودية",
    body: "للمسافرين والعائلات والقادمين من المطار ورحلات العمل. أخبرنا بوجهتك ونؤكد لك سعرًا ثابتًا عبر واتساب قبل السفر.",
    hint: "يفتح واتساب مع تفاصيل رحلتك، ونرد بسعر ثابت. لا يتم الحجز أو الدفع قبل تأكيدك.",
    alt: "جسر الملك فهد بين البحرين والسعودية عند الغروب",
  },
};

/**
 * One strong photo and one clear action. (This used to be a 5-slide
 * autoplay slider, three of whose slides had no image yet — the hero kept
 * rotating to an empty gradient, and the slider cost client JS for nothing.)
 */
export function Hero({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-10 pt-12 text-white lg:pb-16 lg:pt-24">
      <Image
        src="/hero/slide-causeway.webp"
        alt={copy.alt}
        fill
        priority
        quality={80}
        sizes="100vw"
        className="-z-10 object-cover object-[65%_center]"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/70 to-ink lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/70 lg:to-ink/20 rtl:lg:bg-gradient-to-l"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-brass-lit">{copy.eyebrow}</p>
          <h1 className="mt-4 text-[2.1rem] font-bold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">{copy.heading}</h1>
          <p className="mt-5 max-w-xl text-base text-white/80 lg:text-lg">{copy.body}</p>
        </div>

        <div className="mt-9 lg:mt-14">
          <QuoteForm variant="pill" />
          <p className="mt-3 text-sm text-white/65">{copy.hint}</p>
        </div>
      </div>
    </section>
  );
}
