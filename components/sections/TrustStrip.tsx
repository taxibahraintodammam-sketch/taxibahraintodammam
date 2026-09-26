import type { Locale } from "@/lib/locale";

// Concrete, checkable promises the site already makes elsewhere (fares,
// FAQs, cancellation policy). The "licensed" claim isn't repeated here: it
// awaits the licence number in content/business.ts.
const ITEMS: Record<Locale, string[]> = {
  en: [
    "Fixed fare agreed before you travel",
    "Causeway toll included",
    "Open 24/7, no night surcharge",
    "English & Arabic speaking drivers",
    "Flights tracked on airport pickups",
    "No deposit, free cancellation before dispatch",
  ],
  ar: [
    "سعر ثابت يُتفق عليه قبل السفر",
    "رسوم الجسر مشمولة",
    "على مدار الساعة دون رسوم ليلية",
    "سائقون يتحدثون العربية والإنجليزية",
    "متابعة الرحلات الجوية عند الاستقبال من المطار",
    "بدون دفعة مقدمة، وإلغاء مجاني قبل تحرك السائق",
  ],
};

export function TrustStrip({ locale = "en" }: { locale?: Locale }) {
  return (
    <section aria-label={locale === "ar" ? "لماذا تحجز معنا" : "Why book with us"} className="border-b border-ink/10 bg-white">
      <ul className="mx-auto flex max-w-[1200px] flex-wrap gap-x-7 gap-y-2.5 px-5 py-5 text-sm text-ink/75 lg:px-10">
        {ITEMS[locale].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sea" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
