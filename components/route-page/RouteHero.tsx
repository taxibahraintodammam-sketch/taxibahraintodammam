import { QuoteForm } from "@/components/ui/QuoteForm";
import type { RouteContent } from "@/content/routes";
import { getDictionary, fillTemplate, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

const COUNTRY_LABEL: Record<Locale, Record<"Bahrain" | "Saudi Arabia", string>> = {
  en: { Bahrain: "Bahrain", "Saudi Arabia": "Saudi Arabia" },
  ar: { Bahrain: "البحرين", "Saudi Arabia": "السعودية" },
};

export function RouteHero({
  route,
  dict = getDictionary("en"),
  locale = "en",
}: {
  route: RouteContent;
  dict?: Dictionary;
  locale?: Locale;
}) {
  return (
    <section className="bg-ink pb-16 pt-8 lg:pb-20 lg:pt-12">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-brass-lit">
            <span dir="ltr" className="inline-block">
              {COUNTRY_LABEL[locale][route.fromCountry]} → {COUNTRY_LABEL[locale][route.toCountry]}
            </span>{" "}
            · {dict.licensed247}
          </p>
          <h1 className="mt-3 text-[2rem] font-bold leading-tight text-white lg:text-[2.75rem]">
            {fillTemplate(dict.taxiFromTo, { from: route.from, to: route.to })}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 lg:text-lg">{route.intro[0]}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <dt className="eyebrow text-white/50">{dict.distanceLabel}</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                ~{route.distanceKm} km
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-white/50">{dict.doorToDoorLabel}</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {route.durationLabel}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-white/50">{dict.borderLabel}</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {route.borderLabel}
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
