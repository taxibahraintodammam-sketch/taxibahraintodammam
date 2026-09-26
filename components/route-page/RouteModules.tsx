import Link from "next/link";
import type { RouteContent } from "@/content/routes";
import { ROUTE_MODULES } from "@/content/route-modules";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { DirArrow } from "@/components/ui/DirArrow";
import { DeparturePlanner } from "@/components/route-page/DeparturePlanner";

const prefix = (locale: Locale) => (locale === "ar" ? "/ar" : "");

/** Airport arrivals: the flight → driver → causeway sequence, as a numbered strip. */
export function ArrivalFlow({ locale }: { locale: Locale }) {
  const copy = ROUTE_MODULES[locale].arrival;
  return (
    <section aria-labelledby="arrival-flow-heading" className="bg-ink py-14 text-white lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-brass-lit">{copy.eyebrow}</p>
        <h2 id="arrival-flow-heading" className="mt-2 text-2xl font-bold lg:text-3xl">
          {copy.heading}
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="bg-ink p-5 lg:p-6">
              <span className="font-[family-name:var(--font-mono)] text-xs text-brass-lit">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-bold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-white/65">{step.body}</p>
            </li>
          ))}
        </ol>
        <Link href={withSlash(`${prefix(locale)}/airport-transfers`)} className="mt-6 inline-block py-1 text-sm font-semibold text-brass-lit hover:underline">
          {copy.link} <DirArrow />
        </Link>
      </div>
    </section>
  );
}

/** Airport departures: a pickup-time planner built from the page's own timing guidance. */
export function DepartureModule({ locale }: { locale: Locale }) {
  const copy = ROUTE_MODULES[locale].departure;
  return (
    <section aria-labelledby="departure-heading" className="bg-sea/[0.06] py-14 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow text-sea">{copy.eyebrow}</p>
          <h2 id="departure-heading" className="mt-2 text-2xl font-bold lg:text-[2.25rem] lg:leading-tight">
            {copy.heading}
          </h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.intro}</p>
          <Link href={withSlash(`${prefix(locale)}/airport-transfers`)} className="mt-5 inline-block py-1 text-sm font-semibold text-sea hover:underline">
            {copy.link} <DirArrow />
          </Link>
        </div>
        <DeparturePlanner copy={copy} />
      </div>
    </section>
  );
}

/** Long-haul routes: a planning sheet (label / answer rows) with the real distance and time up top. */
export function LongHaulPlan({ route, locale }: { route: RouteContent; locale: Locale }) {
  const copy = ROUTE_MODULES[locale].longHaul[route.slug];
  if (!copy) return null;
  return (
    <section aria-labelledby="long-haul-heading" className="bg-white py-14 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow text-sea">{copy.eyebrow}</p>
          <h2 id="long-haul-heading" className="mt-2 text-2xl font-bold lg:text-[2.25rem] lg:leading-tight">
            {copy.heading}
          </h2>
          <p dir="ltr" className="mt-6 flex items-baseline gap-4 font-[family-name:var(--font-display)] rtl:justify-end">
            <span className="text-4xl font-extrabold">~{route.distanceKm} km</span>
            <span className="text-xl font-semibold text-slate">{route.durationLabel}</span>
          </p>
        </div>
        <dl className="divide-y divide-ink/10 border-y border-ink/10">
          {copy.rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-bold uppercase tracking-wide text-sea rtl:normal-case">{row.label}</dt>
              <dd className="text-[0.98rem] text-ink/85">{row.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Rotation / site-travel routes: a compact 2×2 of the practicalities, with the corporate route onward. */
export function IndustrialPlan({ locale }: { locale: Locale }) {
  const copy = ROUTE_MODULES[locale].industrial;
  return (
    <section aria-labelledby="industrial-heading" className="bg-ink/[0.035] py-14 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{copy.eyebrow}</p>
        <h2 id="industrial-heading" className="mt-2 text-2xl font-bold lg:text-3xl">
          {copy.heading}
        </h2>
        <dl className="mt-8 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {copy.rows.map((row) => (
            <div key={row.label} className="border-t border-ink/10 py-5">
              <dt className="font-bold">{row.label}</dt>
              <dd className="mt-1.5 text-[0.95rem] text-slate">{row.body}</dd>
            </div>
          ))}
        </dl>
        <Link href={withSlash(`${prefix(locale)}/corporate-accounts`)} className="mt-2 inline-block py-1 text-sm font-semibold text-sea hover:underline">
          {copy.link} <DirArrow />
        </Link>
      </div>
    </section>
  );
}
