import { QuoteForm } from "@/components/ui/QuoteForm";
import type { Locale } from "@/lib/locale";

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    heading: string;
    body: string;
    distance: string;
    doorToDoor: string;
    causeway: string;
    distanceValue: string;
    doorToDoorValue: string;
    causewayValue: string;
  }
> = {
  en: {
    eyebrow: "Licensed cross-border operator · 24/7",
    heading: "Taxi from Bahrain to Dammam, door-to-door",
    body: "Licensed sedans, SUVs and vans cross the King Fahd Causeway every day. Fixed fare, tolls included, about 70–90 minutes from your Bahrain address to your Dammam address — confirmed on WhatsApp before you travel.",
    distance: "Distance",
    doorToDoor: "Door-to-door",
    causeway: "Causeway",
    distanceValue: "~130 km",
    doorToDoorValue: "70–90 min",
    causewayValue: "25 km",
  },
  ar: {
    eyebrow: "شركة نقل مرخّصة عابرة للحدود · على مدار الساعة",
    heading: "تاكسي من البحرين إلى الدمام، من الباب إلى الباب",
    body: "سيارات سيدان ودفع رباعي وفان مرخّصة تعبر جسر الملك فهد يوميًا. سعر ثابت، الرسوم مشمولة، نحو 70–90 دقيقة من عنوانك في البحرين إلى عنوانك في الدمام — يُؤكَّد عبر واتساب قبل السفر.",
    distance: "المسافة",
    doorToDoor: "من الباب إلى الباب",
    causeway: "الجسر",
    distanceValue: "١٣٠ كم تقريبًا",
    doorToDoorValue: "70–90 دقيقة",
    causewayValue: "٢٥ كم",
  },
};

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="bg-ink pb-16 pt-10 lg:pb-20 lg:pt-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-brass-lit">{copy.eyebrow}</p>
          <h1 className="mt-3 text-[2rem] font-bold leading-tight text-white lg:text-[3.5rem]">
            {copy.heading}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 lg:text-lg">{copy.body}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <dt className="eyebrow text-white/50">{copy.distance}</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {copy.distanceValue}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-white/50">{copy.doorToDoor}</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {copy.doorToDoorValue}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-white/50">{copy.causeway}</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {copy.causewayValue}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
