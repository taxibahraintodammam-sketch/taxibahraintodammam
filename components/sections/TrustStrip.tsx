import type { Locale } from "@/lib/locale";

const ITEMS: Record<Locale, string[]> = {
  en: [
    "Licensed cross-border operator",
    "Fixed fare, tolls included",
    "Available 24 hours a day, 7 days a week",
    "English & Arabic speaking drivers",
    "Flight tracking on airport transfers",
    "Door-to-door, no city-to-city changeovers",
  ],
  ar: [
    "شركة نقل مرخّصة عابرة للحدود",
    "سعر ثابت، الرسوم مشمولة",
    "متاحون على مدار 24 ساعة، طوال أيام الأسبوع",
    "سائقون يتحدثون العربية والإنجليزية",
    "تتبع الرحلة الجوية في نقل المطار",
    "من الباب إلى الباب، دون تبديل بين المدن",
  ],
};

export function TrustStrip({ locale = "en" }: { locale?: Locale }) {
  const items = ITEMS[locale];
  return (
    <section aria-label="Why book with us" className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-8 lg:px-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 shrink-0 text-sea"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M8 12.5l2.5 2.5L16 9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
