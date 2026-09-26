import Link from "next/link";
import { FLEET } from "@/content/fleet";
import { FLEET_AR } from "@/content/fleet.ar";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { DirArrow } from "@/components/ui/DirArrow";

const COPY: Record<Locale, { eyebrow: string; heading: string; intro: string; seats: string; all: string }> = {
  en: {
    eyebrow: "Fleet",
    heading: "Choose by who's travelling",
    intro: "Every class runs on every route at a fixed fare. What changes is space: people, bags and the standard of car.",
    seats: "seats",
    all: "Compare the fleet in detail",
  },
  ar: {
    eyebrow: "الأسطول",
    heading: "اختر حسب من يسافر معك",
    intro: "كل الفئات متاحة على كل الخطوط بسعر ثابت. ما يختلف هو المساحة: عدد الركاب والحقائب ومستوى السيارة.",
    seats: "مقاعد",
    all: "قارن الأسطول بالتفصيل",
  },
};

// Largest seat count in each class's passenger string, e.g. "1–4 passengers" → 4.
function maxSeats(passengers: string): string {
  const nums = passengers.match(/\d+/g);
  return nums ? nums[nums.length - 1] : "";
}

/**
 * A capacity scale rather than five identical cards: the number people
 * actually choose by (seats) leads each row.
 */
export function FleetTeaser({ locale = "en" }: { locale?: Locale }) {
  const fleet = locale === "ar" ? FLEET_AR : FLEET;
  const prefix = locale === "ar" ? "/ar" : "";
  const copy = COPY[locale];

  return (
    <section aria-labelledby="fleet-teaser-heading" className="bg-ink/[0.03] py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow text-sea">{copy.eyebrow}</p>
          <h2 id="fleet-teaser-heading" className="mt-2 text-2xl font-bold text-ink lg:text-3xl">
            {copy.heading}
          </h2>
          <p className="mt-3 text-slate">{copy.intro}</p>
          <Link href={withSlash(`${prefix}/fleet`)} className="mt-4 inline-block py-1 text-sm font-semibold text-sea hover:underline">
            {copy.all} <DirArrow />
          </Link>
        </div>

        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {fleet.map((vehicle) => (
            <li key={vehicle.slug}>
              <Link
                href={withSlash(`${prefix}/fleet/${vehicle.slug}`)}
                className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-white sm:px-3"
              >
                <span className="text-center font-[family-name:var(--font-display)] leading-none">
                  <span className="block text-2xl font-extrabold">{maxSeats(vehicle.passengers)}</span>
                  <span className="text-[11px] text-slate">{copy.seats}</span>
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-ink">{vehicle.name}</span>
                  <span className="block text-sm text-slate">{vehicle.bestFor}</span>
                </span>
                <span className="text-slate transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                  <DirArrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
