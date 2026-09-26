import Link from "next/link";
import type { DhahranCopy } from "@/content/dhahran";
import { FLEET } from "@/content/fleet";
import { FLEET_AR } from "@/content/fleet.ar";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { DhahranTripPanel } from "@/components/dhahran/DhahranTripPanel";
import { DhahranArrivalTabs } from "@/components/dhahran/DhahranArrivalTabs";

const PANEL_ANCHOR = "dhahran-trip";

/** Real figures from routes.ts / fares.ts, substituted into {tokens} in the copy. */
export type DhahranFigures = { khobar: string; dammam: string; khobarFare: number; dammamFare: number };

export function fillDhahran(text: string, f: DhahranFigures) {
  return text
    .replaceAll("{khobarFare}", String(f.khobarFare))
    .replaceAll("{dammamFare}", String(f.dammamFare))
    .replaceAll("{khobar}", f.khobar)
    .replaceAll("{dammam}", f.dammam);
}

export function DhahranPage({ copy, locale, figures }: { copy: DhahranCopy; locale: Locale; figures: DhahranFigures }) {
  const p = (path: string) => withSlash(locale === "ar" ? `/ar${path}` : path);

  return (
    <>
      <Hero copy={copy} />
      <Why copy={copy.why} />
      <Arrivals copy={copy.arrivals} />
      <Destinations copy={copy.destinations} />
      <Business copy={copy.business} />
      <Vehicles copy={copy.vehicles} locale={locale} p={p} />
      <Journey copy={copy.journey} figures={figures} p={p} />
      <TripType copy={copy.tripType} />
      <Fare copy={copy.fare} figures={figures} p={p} />
      <Before copy={copy.before} p={p} />
      <Faqs copy={copy.faq} figures={figures} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: DhahranCopy }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink/[0.035]">
      {/* A faint route line sweeping toward the headline: decoration only. */}
      <svg
        className="pointer-events-none absolute -end-24 top-0 -z-10 hidden h-full w-[70%] lg:block text-sea/10 rtl:-scale-x-100"
        viewBox="0 0 600 600"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M600 520 C 420 500, 360 380, 300 300 S 120 90, 0 60" stroke="currentColor" strokeWidth="3" strokeDasharray="10 10" />
      </svg>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 pb-14 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-24 lg:pt-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">{copy.hero.eyebrow}</p>
          <h1 className="mt-4 text-[2.4rem] font-extrabold leading-[1.04] sm:text-[3.25rem] lg:text-[4.25rem]">
            {copy.hero.headingLead} <span className="text-sea">{copy.hero.headingPlace}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/75 lg:text-xl">{copy.hero.sub}</p>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {copy.hero.trust.map((point) => (
              <li key={point} className="flex items-center gap-2 text-[0.95rem] font-semibold">
                <Tick />
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-lg border-s-2 border-sea/40 ps-4 text-sm text-slate">{copy.hero.note}</p>
        </div>

        <DhahranTripPanel id={PANEL_ANCHOR} copy={copy.panel} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Why({ copy }: { copy: DhahranCopy["why"] }) {
  return (
    <section aria-labelledby="why-heading" className="bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">{copy.eyebrow}</p>
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <h2 id="why-heading" className="text-[2rem] font-extrabold leading-[1.08] lg:text-[3.25rem]">
            {copy.headingLead} <span className="text-sea">{copy.headingAccent}</span>
          </h2>
          <p className="text-slate lg:text-lg">{copy.body}</p>
        </div>

        <dl className="mt-12 grid grid-cols-1 border-t border-ink/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {copy.points.map((point, index) => (
            <div
              key={point.title}
              className="border-b border-ink/10 py-6 sm:pe-8 lg:[&:nth-child(3n+2)]:border-x lg:[&:nth-child(3n+2)]:px-8 lg:[&:nth-child(3n+3)]:ps-8"
            >
              <dt className="flex items-baseline gap-3 font-bold">
                <span className="font-[family-name:var(--font-mono)] text-xs text-sea">{String(index + 1).padStart(2, "0")}</span>
                {point.title}
              </dt>
              <dd className="mt-2 text-[0.95rem] text-slate">{point.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-2xl text-lg font-semibold">{copy.closing}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Arrivals({ copy }: { copy: DhahranCopy["arrivals"] }) {
  return (
    <section aria-labelledby="arrivals-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">{copy.eyebrow}</p>
          <h2 id="arrivals-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
            {copy.heading}
          </h2>
          <p className="mt-3 text-slate">{copy.intro}</p>
        </div>
        <DhahranArrivalTabs copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Destinations({ copy }: { copy: DhahranCopy["destinations"] }) {
  return (
    <section aria-labelledby="destinations-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brass-lit">{copy.eyebrow}</p>
            <h2 id="destinations-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
              {copy.heading}
            </h2>
          </div>
          <p className="text-white/70">{copy.intro}</p>
        </div>

        {/* A departures-board treatment: mono headers, ruled rows. */}
        <div className="mt-10 rounded-card border border-white/10 bg-white/[0.03]">
          <div className="hidden grid-cols-[1.1fr_1fr_1.4fr] gap-6 border-b border-white/10 px-6 py-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-brass-lit md:grid">
            <span>{copy.columns.dest}</span>
            <span>{copy.columns.drop}</span>
            <span>{copy.columns.note}</span>
          </div>
          <ul>
            {copy.rows.map((row) => (
              <li
                key={row.dest}
                className="grid grid-cols-1 gap-1 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[1.1fr_1fr_1.4fr] md:gap-6 md:px-6"
              >
                <span className="text-lg font-bold">{row.dest}</span>
                <span className="font-[family-name:var(--font-mono)] text-sm text-brass-lit">
                  <span className="sr-only">{copy.columns.drop}: </span>
                  {row.drop}
                </span>
                <span className="text-sm text-white/65">{row.note}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 px-5 py-4 text-sm md:px-6">
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-white/50">{copy.nearbyLabel}</span>
            {copy.nearby.map((link) => (
              <Link key={link.href} href={withSlash(link.href)} className="py-1 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
          <p className="border-s-2 border-brass-lit/60 ps-4 text-sm text-white/75">{copy.accessNote}</p>
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="text-sm font-semibold lg:text-end">{copy.footnote}</p>
            <a
              href={whatsappHref(copy.ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-input bg-white px-6 text-sm font-bold text-ink hover:bg-white/90"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-4 w-4" color="currentColor" />
              {copy.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Business({ copy }: { copy: DhahranCopy["business"] }) {
  return (
    <section aria-labelledby="business-heading" className="bg-white py-16 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">{copy.eyebrow}</p>
          <h2 id="business-heading" className="mt-3 text-[2rem] font-extrabold leading-[1.08] lg:text-[3rem]">
            {copy.heading}
          </h2>
          {copy.body.map((para) => (
            <p key={para} className="mt-5 text-slate lg:text-lg">
              {para}
            </p>
          ))}
        </div>
        <ol className="flex flex-col">
          {copy.points.map((point, index) => (
            <li key={point.body} className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-ink/10 py-6 last:border-b">
              <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold leading-none text-sea/40">{index + 1}</span>
              <div>
                <p className="text-[1.02rem]">{point.body}</p>
                {point.link && (
                  <Link href={withSlash(point.link.href)} className="mt-2 inline-block py-1 text-sm font-semibold text-sea hover:underline">
                    {point.link.label} <DirArrow />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Vehicles({ copy, locale, p }: { copy: DhahranCopy["vehicles"]; locale: Locale; p: (path: string) => string }) {
  const fleet = locale === "ar" ? FLEET_AR : FLEET;
  return (
    <section aria-labelledby="vehicles-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">{copy.eyebrow}</p>
            <h2 id="vehicles-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
              {copy.heading}
            </h2>
            <p className="mt-3 text-slate">{copy.intro}</p>
          </div>
          <Link href={p("/fleet")} className="inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {copy.fleetLink} <DirArrow />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-ink/10 ring-1 ring-ink/10 md:grid-cols-2">
          {copy.items.map((item) => {
            const vehicle = fleet.find((v) => v.vehicle === item.vehicle);
            return (
              <li key={item.vehicle} className="flex flex-col bg-white p-6 sm:p-8">
                <p className="text-xl font-bold lg:text-2xl">{item.purpose}</p>
                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-sea">
                  <DirArrow />
                  {vehicle ? (
                    <Link href={p(`/fleet/${vehicle.slug}`)} className="underline decoration-sea/30 underline-offset-4 hover:decoration-sea">
                      {vehicle.name}
                    </Link>
                  ) : null}
                </p>
                <p className="mt-3 text-[0.95rem] text-slate">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Journey({ copy, figures, p }: { copy: DhahranCopy["journey"]; figures: DhahranFigures; p: (path: string) => string }) {
  const last = copy.stops.length - 1;
  return (
    <section aria-labelledby="journey-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">{copy.eyebrow}</p>
        <h2 id="journey-heading" className="mt-3 max-w-2xl text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
          {copy.heading}
        </h2>

        {/* Route line: vertical on phones, horizontal from md up. Follows reading direction. */}
        <ol className="relative mt-12 grid grid-cols-1 gap-7 md:grid-cols-5 md:gap-4">
          <span className="absolute bottom-3 start-[7px] top-3 w-0.5 bg-gradient-to-b from-ink/15 to-sea md:bottom-auto md:end-[10%] md:start-0 md:top-[7px] md:h-0.5 md:w-auto md:bg-gradient-to-r rtl:md:bg-gradient-to-l" aria-hidden="true" />
          {copy.stops.map((stop, index) => (
            <li key={stop.name} className="relative flex gap-4 md:flex-col md:gap-0">
              <span
                className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full md:mt-0 ${
                  index === last ? "bg-sea ring-4 ring-sea/20" : "border-2 border-ink/30 bg-white"
                }`}
                aria-hidden="true"
              />
              <div className="md:mt-5">
                <p className={`font-bold ${index === last ? "text-sea" : ""}`}>{stop.name}</p>
                <p className="mt-1 text-sm text-slate">{stop.note}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-ink/10 pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <p className="text-lg">{fillDhahran(copy.timing, figures)}</p>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate">{copy.caveatsHeading}</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {copy.caveats.map((caveat) => (
                <li key={caveat} className="flex gap-3 text-[0.95rem] text-slate">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate" aria-hidden="true" />
                  {caveat}
                </li>
              ))}
            </ul>
            <Link href={p("/king-fahd-causeway-taxi")} className="mt-4 inline-block py-1 text-sm font-semibold text-sea hover:underline">
              {copy.causewayLink} <DirArrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function TripType({ copy }: { copy: DhahranCopy["tripType"] }) {
  const columns = [
    { data: copy.oneWay, featured: false },
    { data: copy.return, featured: true },
  ];
  return (
    <section aria-labelledby="triptype-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-sea">{copy.eyebrow}</p>
        <h2 id="triptype-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
          {copy.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {columns.map(({ data, featured }) => (
            <div
              key={data.title}
              className={`flex flex-col rounded-card p-6 sm:p-8 ${featured ? "bg-white ring-2 ring-sea" : "bg-white/60 ring-1 ring-ink/10"}`}
            >
              <h3 className="text-2xl font-bold">{data.title}</h3>
              <p className="mt-3 text-slate">{data.body}</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-wide">{copy.bestFor}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {data.uses.map((use) => (
                  <li key={use} className="rounded-pill bg-ink/[0.06] px-3 py-1.5 text-sm">
                    {use}
                  </li>
                ))}
              </ul>
              {featured && (
                <a
                  href={whatsappHref(copy.ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-input bg-ink px-6 text-base font-bold text-white hover:bg-ink-soft md:self-start"
                  data-analytics="whatsapp_click"
                >
                  <WhatsAppIcon className="h-4 w-4" color="currentColor" />
                  {copy.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Fare({ copy, figures, p }: { copy: DhahranCopy["fare"]; figures: DhahranFigures; p: (path: string) => string }) {
  const message = [copy.greeting, ...copy.fields.map((field) => `${field}: `)].join("\n");
  return (
    <section aria-labelledby="fare-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20 lg:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brass-lit">{copy.eyebrow}</p>
          <h2 id="fare-heading" className="mt-3 text-[2rem] font-extrabold leading-[1.08] lg:text-[3rem]">
            {copy.heading}
          </h2>
          <p className="mt-5 text-white/75 lg:text-lg">{copy.body}</p>
          <p className="mt-5 text-sm text-white/60">
            {fillDhahran(copy.reference, figures)}{" "}
            <Link href={p("/fares")} className="font-semibold text-brass-lit hover:underline">
              {copy.faresLink}
            </Link>
          </p>
          <p className="mt-5 flex gap-3 text-sm text-white/80">
            <Tick light />
            {copy.included}
          </p>
        </div>

        {/* A preview of the exact message the CTA opens, so nothing is a surprise. */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">{copy.previewLabel}</p>
          <div className="mt-3 rounded-[18px] rounded-ss-md bg-white p-5 text-ink shadow-elevation sm:p-6">
            <p className="text-[0.95rem] font-semibold">{copy.greeting}</p>
            <ol className="mt-3 flex flex-col gap-1.5">
              {copy.fields.map((field, index) => (
                <li key={field} className="flex gap-3 text-[0.95rem]">
                  <span className="w-4 shrink-0 font-[family-name:var(--font-mono)] text-sm text-sea">{index + 1}</span>
                  <span>
                    {field}: <span className="text-slate/60">…</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex h-[52px] items-center justify-center gap-2 rounded-input bg-brass px-6 text-base font-bold text-ink hover:bg-brass-lit"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Before({ copy, p }: { copy: DhahranCopy["before"]; p: (path: string) => string }) {
  const chains = [
    { label: copy.sendLabel, items: copy.send, dark: false },
    { label: copy.confirmLabel, items: copy.confirm, dark: true },
  ];
  return (
    <section aria-labelledby="before-heading" className="border-b border-ink/10 bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <h2 id="before-heading" className="text-xl font-bold lg:text-2xl">
          {copy.heading}
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          {chains.map((chain) => (
            <div key={chain.label} className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <p className="w-32 shrink-0 text-xs font-bold uppercase tracking-wide text-slate">{chain.label}</p>
              <ol className="flex flex-wrap items-center gap-2">
                {chain.items.map((item, index) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      className={`rounded-pill px-3.5 py-1.5 text-sm font-medium ${
                        chain.dark ? "bg-ink text-white" : "bg-ink/[0.06] text-ink"
                      }`}
                    >
                      {item}
                    </span>
                    {index < chain.items.length - 1 && (
                      <span className="text-slate/60">
                        <DirArrow />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate">
          {copy.altLead}{" "}
          <Link href={p("/booking")} className="font-semibold text-sea hover:underline">
            {copy.altBooking}
          </Link>{" "}
          {copy.altOr}{" "}
          <Link href={p("/contact")} className="font-semibold text-sea hover:underline">
            {copy.altContact}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy, figures }: { copy: DhahranCopy["faq"]; figures: DhahranFigures }) {
  const faqs = copy.items.map((item) => ({ ...item, answer: fillDhahran(item.answer, figures) }));
  return (
    <section aria-labelledby="faq-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-sea">{copy.eyebrow}</p>
        <h2 id="faq-heading" className="mt-3 text-center text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
          {copy.heading}
        </h2>
        <div className="mt-10">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Tick({ light }: { light?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`mt-0.5 shrink-0 ${light ? "text-brass-lit" : "text-sea"}`} aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
