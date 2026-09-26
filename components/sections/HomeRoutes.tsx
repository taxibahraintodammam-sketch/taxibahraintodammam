import Link from "next/link";
import { ROUTES } from "@/content/routes";
import { ROUTES_AR } from "@/content/routes.ar";
import { lowestFare, fareWithSar } from "@/content/fares";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { DirArrow } from "@/components/ui/DirArrow";

type Group = { title: string; line: string; items: { slug: string; label?: string }[] };

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    heading: string;
    coreTitle: string;
    coreLine: string;
    outbound: string;
    inbound: string;
    from: string;
    groups: Group[];
    allFares: string;
    hub: string;
  }
> = {
  en: {
    eyebrow: "Where are you going?",
    heading: "Pick the trip, not a page",
    coreTitle: "Bahrain ⇄ Dammam",
    coreLine: "The run we make most. Door to door across the King Fahd Causeway, in either direction.",
    outbound: "Bahrain to Dammam",
    inbound: "Dammam to Bahrain",
    from: "from",
    groups: [
      {
        title: "Catching or landing a flight",
        line: "Timed to your flight, not a fixed clock.",
        items: [
          { slug: "bahrain-airport-to-dammam-taxi" },
          { slug: "bahrain-to-dammam-airport-taxi" },
          { slug: "dammam-airport-to-bahrain-taxi" },
        ],
      },
      {
        title: "Elsewhere in the Eastern Province",
        line: "Shorter hops for meetings, hotels and visits.",
        items: [{ slug: "taxi-bahrain-to-khobar" }, { slug: "taxi-bahrain-to-dhahran", label: "Bahrain → Dhahran" }, { slug: "taxi-bahrain-to-qatif" }],
      },
      {
        title: "Work and rotation travel",
        line: "Compounds, sites and shift dates up the coast.",
        items: [{ slug: "taxi-bahrain-to-jubail" }, { slug: "taxi-bahrain-to-ras-tanura" }, { slug: "taxi-bahrain-to-abqaiq" }],
      },
      {
        title: "Longer journeys",
        line: "Hours on the road, planned properly.",
        items: [{ slug: "taxi-bahrain-to-al-ahsa-hofuf" }, { slug: "taxi-bahrain-to-riyadh" }],
      },
    ],
    allFares: "Compare every fare",
    hub: "How the causeway crossing works",
  },
  ar: {
    eyebrow: "إلى أين تتجه؟",
    heading: "اختر رحلتك",
    coreTitle: "البحرين ⇄ الدمام",
    coreLine: "الرحلة الأكثر طلبًا لدينا. من الباب إلى الباب عبر جسر الملك فهد، في الاتجاهين.",
    outbound: "البحرين إلى الدمام",
    inbound: "الدمام إلى البحرين",
    from: "ابتداءً من",
    groups: [
      {
        title: "اللحاق برحلة طيران أو الوصول منها",
        line: "مواعيد مرتبطة برحلتك الجوية، لا بوقت ثابت.",
        items: [
          { slug: "bahrain-airport-to-dammam-taxi" },
          { slug: "bahrain-to-dammam-airport-taxi" },
          { slug: "dammam-airport-to-bahrain-taxi" },
        ],
      },
      {
        title: "مدن أخرى في المنطقة الشرقية",
        line: "رحلات أقصر للاجتماعات والفنادق والزيارات.",
        items: [{ slug: "taxi-bahrain-to-khobar" }, { slug: "taxi-bahrain-to-dhahran", label: "البحرين ← الظهران" }, { slug: "taxi-bahrain-to-qatif" }],
      },
      {
        title: "العمل والمناوبات",
        line: "المجمعات والمواقع ومواعيد المناوبات على الساحل.",
        items: [{ slug: "taxi-bahrain-to-jubail" }, { slug: "taxi-bahrain-to-ras-tanura" }, { slug: "taxi-bahrain-to-abqaiq" }],
      },
      {
        title: "الرحلات الطويلة",
        line: "ساعات على الطريق، بتخطيط مناسب.",
        items: [{ slug: "taxi-bahrain-to-al-ahsa-hofuf" }, { slug: "taxi-bahrain-to-riyadh" }],
      },
    ],
    allFares: "قارن جميع الأسعار",
    hub: "كيف يتم العبور عبر الجسر",
  },
};

/**
 * The homepage's route block: a featured core corridor plus routes grouped by
 * what the traveller is doing — replacing a flat grid of every route page.
 */
export function HomeRoutes({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale];
  const routes = locale === "ar" ? ROUTES_AR : ROUTES;
  const p = (slug: string) => withSlash(`${locale === "ar" ? "/ar" : ""}/${slug}`);
  const core = routes.find((r) => r.slug === "taxi-bahrain-to-dammam");
  const coreFare = lowestFare("taxi-bahrain-to-dammam");
  const coreSar = coreFare ? fareWithSar(coreFare) : undefined;

  return (
    <section aria-labelledby="home-routes-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{copy.eyebrow}</p>
        <h2 id="home-routes-heading" className="mt-2 text-2xl font-bold lg:text-[2.25rem]">
          {copy.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Featured corridor */}
          <div className="flex flex-col justify-between rounded-card bg-ink p-7 text-white sm:p-9">
            <div>
              <p dir="ltr" className="font-[family-name:var(--font-display)] text-3xl font-extrabold rtl:text-end lg:text-4xl">
                {copy.coreTitle}
              </p>
              <p className="mt-3 max-w-sm text-white/70">{copy.coreLine}</p>
              {core && coreSar && (
                <p className="mt-6 font-[family-name:var(--font-display)]">
                  <span className="text-sm text-white/60">{copy.from} </span>
                  <span className="text-2xl font-bold">BHD {coreSar.bhd}</span>
                  <span className="text-sm text-white/60"> / SAR {coreSar.sar} · {core.durationLabel}</span>
                </p>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={p("taxi-bahrain-to-dammam")} className="flex h-12 items-center justify-center rounded-input bg-brass px-5 text-sm font-bold text-ink hover:bg-brass-lit">
                {copy.outbound}
              </Link>
              <Link href={p("taxi-dammam-to-bahrain")} className="flex h-12 items-center justify-center rounded-input border border-white/25 px-5 text-sm font-semibold hover:border-white/60">
                {copy.inbound}
              </Link>
            </div>
          </div>

          {/* Grouped by purpose */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {copy.groups.map((group) => (
              <div key={group.title}>
                <h3 className="font-bold">{group.title}</h3>
                <p className="mt-1 text-sm text-slate">{group.line}</p>
                <ul className="mt-3 divide-y divide-ink/10 border-t border-ink/10">
                  {group.items.map((item) => {
                    const route = routes.find((r) => r.slug === item.slug);
                    const label = item.label ?? (route ? `${route.from} → ${route.to}` : item.slug);
                    const fare = lowestFare(item.slug);
                    return (
                      <li key={item.slug}>
                        <Link href={p(item.slug)} className="flex min-h-11 items-center justify-between gap-3 py-2 text-[0.95rem] hover:text-sea">
                          <span dir="auto">{label}</span>
                          {fare && <span className="shrink-0 text-xs font-semibold text-slate">BHD {fare.bhd}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <Link href={withSlash(`${locale === "ar" ? "/ar" : ""}/fares`)} className="py-1 text-sea hover:underline">
            {copy.allFares} <DirArrow />
          </Link>
          <Link href={withSlash(`${locale === "ar" ? "/ar" : ""}/king-fahd-causeway-taxi`)} className="py-1 text-sea hover:underline">
            {copy.hub} <DirArrow />
          </Link>
        </p>
      </div>
    </section>
  );
}
