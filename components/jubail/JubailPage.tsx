import Image from "next/image";
import Link from "next/link";
import type { RouteContent } from "@/content/routes";
import { ROUTE_FARES, VEHICLE_CAPACITY, fareWithSar } from "@/content/fares";
import { FLEET } from "@/content/fleet";
import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import {
  JUBAIL_HERO,
  JUBAIL_LONG_TRIP,
  JUBAIL_ZONES,
  JUBAIL_TRAVELLERS,
  JUBAIL_JOURNEY,
  JUBAIL_VEHICLES,
  JUBAIL_VEHICLE_FIT,
  JUBAIL_PRICING,
  JUBAIL_CORPORATE,
  JUBAIL_CHECKLIST,
  type JubailFaq,
} from "@/content/jubail";
import { withSlash } from "@/lib/url";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { JubailFarePanel, type JubailFareOption } from "@/components/jubail/JubailFarePanel";
import { JubailRouteMap } from "@/components/jubail/JubailRouteMap";

const FARE_ANCHOR = "jubail-fare";
const HELLO_JUBAIL = "Hi, I'd like a fare for a taxi from Bahrain to Jubail.";

// Seat counts match VEHICLE_CAPACITY in content/fares.ts.
const SEATS: Record<JubailFareOption["vehicle"], number> = { sedan: 3, suv: 4, van: 7, luxury: 3 };
const SHORT_LABEL: Record<JubailFareOption["vehicle"], string> = {
  sedan: "Sedan",
  suv: "SUV",
  van: "Van",
  luxury: "Luxury",
};

function fareOptions(slug: string): JubailFareOption[] {
  return (ROUTE_FARES[slug] ?? [])
    .map(fareWithSar)
    .filter((f): f is typeof f & { vehicle: JubailFareOption["vehicle"] } => f.vehicle in SEATS)
    .map((f) => ({ vehicle: f.vehicle, label: SHORT_LABEL[f.vehicle], seats: SEATS[f.vehicle], bhd: f.bhd, sar: f.sar }))
    .sort((a, b) => a.bhd - b.bhd);
}

export function JubailPage({ route, faqs }: { route: RouteContent; faqs: JubailFaq[] }) {
  const options = fareOptions(route.slug);
  const from = options[0];

  return (
    <>
      <Hero route={route} options={options} />
      <LongTrip />
      <Zones />
      <Travellers />
      <Journey route={route} />
      <Vehicles options={options} />
      <Pricing from={from} />
      <Corporate />
      <Checklist />
      <Faqs faqs={faqs} />
      <Onward />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ route, options }: { route: RouteContent; options: JubailFareOption[] }) {
  const from = options[0];
  const facts = [
    { label: "Door to door", value: route.durationLabel },
    { label: "Starting fare", value: `BHD ${from.bhd}`, sub: `SAR ${from.sar}` },
    { label: "Your own car", value: "1 driver", sub: "no changeovers" },
    { label: "Available", value: "24/7", sub: "no night surcharge" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src="/hero/slide-causeway.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={80}
        className="-z-10 object-cover object-[70%_center] opacity-35"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/85 to-ink lg:bg-gradient-to-r lg:from-ink lg:via-ink/90 lg:to-ink/40" aria-hidden="true" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 pb-14 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="flex flex-col justify-center">
          <p className="eyebrow self-start text-brass-lit">{JUBAIL_HERO.eyebrow}</p>
          <h1 className="mt-4 text-[2.25rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            {JUBAIL_HERO.heading}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75 lg:text-lg">{JUBAIL_HERO.lede}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`#${FARE_ANCHOR}`}
              className="flex h-12 items-center justify-center rounded-input bg-brass px-7 text-base font-bold text-ink transition-colors hover:bg-brass-lit"
            >
              Get my Jubail fare
            </a>
            <a
              href={whatsappHref(HELLO_JUBAIL)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-input border border-white/25 px-7 text-base font-semibold text-white transition-colors hover:border-white/60"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-5 w-5" color="currentColor" />
              WhatsApp us
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0">
                <dt className="text-[10px] font-bold uppercase tracking-wide text-white/50">{fact.label}</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">
                  {fact.value}
                  {fact.sub && <span className="block text-xs font-medium text-white/55">{fact.sub}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex items-center">
          <div className="w-full">
            <JubailFarePanel id={FARE_ANCHOR} options={options} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function LongTrip() {
  return (
    <section aria-labelledby="long-trip-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-sea">{JUBAIL_LONG_TRIP.eyebrow}</p>
          <h2 id="long-trip-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
            {JUBAIL_LONG_TRIP.heading}
          </h2>
          <p className="mt-4 text-slate lg:text-lg">{JUBAIL_LONG_TRIP.intro}</p>
        </div>

        {/* A single rail running through all three points: the "one trip" idea, drawn. */}
        <ol className="relative mt-12 grid grid-cols-1 gap-10 border-s-2 border-brass/30 ps-6 lg:grid-cols-3 lg:gap-12 lg:border-s-0 lg:border-t-2 lg:ps-0 lg:pt-10">
          {JUBAIL_LONG_TRIP.points.map((point, index) => (
            <li key={point.title} className="relative">
              <span
                className="absolute -start-[33px] top-1 h-4 w-4 rounded-full border-2 border-brass bg-white lg:-top-[49px] lg:start-0"
                aria-hidden="true"
              />
              <p className="font-[family-name:var(--font-mono)] text-sm text-brass">0{index + 1}</p>
              <h3 className="mt-1 text-xl font-bold lg:text-2xl">{point.title}</h3>
              <p className="mt-2 text-slate">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Zones() {
  return (
    <section aria-labelledby="zones-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-sea">{JUBAIL_ZONES.eyebrow}</p>
          <h2 id="zones-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
            {JUBAIL_ZONES.heading}
          </h2>
          <p className="mt-4 text-slate">{JUBAIL_ZONES.intro}</p>
          <div className="mt-8 rounded-card bg-ink p-5 sm:p-6">
            <JubailRouteMap className="mx-auto max-w-[360px] lg:max-w-none" />
          </div>
        </div>

        <div>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {JUBAIL_ZONES.zones.map((zone) => (
              <li key={zone.name} className="grid grid-cols-1 gap-1 py-6 sm:grid-cols-[1fr_1.3fr] sm:gap-6">
                <div>
                  <h3 className="text-lg font-bold leading-snug">{zone.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-sea">{zone.tag}</p>
                </div>
                <p className="text-[0.95rem] text-slate">{zone.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex flex-col gap-3 text-sm text-ink sm:flex-row sm:items-center sm:justify-between">
            <span className="max-w-md">{JUBAIL_ZONES.footnote}</span>
            <a
              href={whatsappHref(`${HELLO_JUBAIL}\nMy Jubail destination is: `)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-input border border-ink/20 px-5 font-semibold hover:border-sea hover:text-sea"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-4 w-4" color="currentColor" />
              Send your location
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Travellers() {
  return (
    <section aria-labelledby="travellers-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{JUBAIL_TRAVELLERS.eyebrow}</p>
        <h2 id="travellers-heading" className="mt-3 max-w-2xl text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
          {JUBAIL_TRAVELLERS.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {JUBAIL_TRAVELLERS.items.map((item, index) => (
            <article
              key={item.who}
              className={`border-t border-ink/10 py-7 ${index === 0 ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-12" : ""}`}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate">{item.use}</p>
                <h3 className={`mt-1 font-bold ${index === 0 ? "text-2xl lg:text-3xl" : "text-xl"}`}>{item.who}</h3>
              </div>
              <p className={`mt-3 text-slate ${index === 0 ? "md:mt-0 lg:text-lg" : ""}`}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Journey({ route }: { route: RouteContent }) {
  return (
    <section aria-labelledby="journey-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow text-brass-lit">{JUBAIL_JOURNEY.eyebrow}</p>
          <h2 id="journey-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
            {JUBAIL_JOURNEY.heading}
          </h2>
          <p className="mt-4 text-white/70">
            About {route.durationLabel.replace("hrs", "hours")} from pickup to drop-off, covering roughly {route.distanceKm} km.
          </p>
          <div className="mt-8 rounded-card border border-white/15 p-5 text-sm text-white/80">
            <p>{JUBAIL_JOURNEY.note}</p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-semibold">
              <Link href={withSlash("/blog/documents-required-bahrain-to-saudi-by-road")} className="text-brass-lit hover:underline">
                Documents for crossing by road
              </Link>
              <Link href={withSlash("/king-fahd-causeway-taxi")} className="text-brass-lit hover:underline">
                How the causeway crossing works
              </Link>
            </p>
          </div>
        </div>

        <ol className="relative">
          {JUBAIL_JOURNEY.stages.map((stage, index) => {
            const last = index === JUBAIL_JOURNEY.stages.length - 1;
            return (
              <li key={stage.title} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-8 last:pb-0">
                {!last && <span className="absolute start-[19px] top-10 bottom-0 w-px bg-white/15" aria-hidden="true" />}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-[family-name:var(--font-mono)] text-sm ${
                    last ? "bg-brass-lit text-ink" : "border border-white/25 text-white/80"
                  }`}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-bold">{stage.title}</h3>
                  <p className="mt-0.5 font-[family-name:var(--font-mono)] text-xs text-brass-lit">
                    {stage.meta.replace("{border}", route.borderLabel)}
                  </p>
                  <p className="mt-2 text-[0.95rem] text-white/70">{stage.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Vehicles({ options }: { options: JubailFareOption[] }) {
  return (
    <section aria-labelledby="vehicles-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-sea">{JUBAIL_VEHICLES.eyebrow}</p>
            <h2 id="vehicles-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
              {JUBAIL_VEHICLES.heading}
            </h2>
            <p className="mt-4 text-slate">{JUBAIL_VEHICLES.intro}</p>
          </div>
          <Link href={withSlash("/fleet")} className="inline-block py-2 text-sm font-semibold text-sea hover:underline">
            See the full fleet →
          </Link>
        </div>

        <div className="mt-10 border-t-2 border-ink">
          <div className="hidden grid-cols-[1.2fr_0.9fr_1.6fr_0.7fr] gap-6 border-b border-ink/10 py-3 text-[11px] font-bold uppercase tracking-wide text-slate lg:grid">
            <span>Vehicle</span>
            <span>Seats &amp; bags</span>
            <span>Why for Jubail</span>
            <span className="text-end">One-way from</span>
          </div>
          {options.map((option) => {
            const fleet = FLEET.find((v) => v.vehicle === option.vehicle);
            return (
              <div
                key={option.vehicle}
                className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-b border-ink/10 py-6 lg:grid-cols-[1.2fr_0.9fr_1.6fr_0.7fr] lg:items-start lg:gap-6"
              >
                <div className="min-w-0">
                  <h3 className="text-lg font-bold">{option.label}</h3>
                  {fleet && (
                    <Link href={withSlash(`/fleet/${fleet.slug}`)} className="inline-block py-1.5 text-sm text-slate underline decoration-ink/20 underline-offset-2 hover:text-sea">
                      {fleet.name.split("—")[1]?.trim() ?? fleet.name}
                    </Link>
                  )}
                </div>
                <p className="text-end font-[family-name:var(--font-display)] text-lg font-bold lg:order-last">
                  BHD {option.bhd}
                  <span className="block text-xs font-medium text-slate">SAR {option.sar}</span>
                </p>
                <p className="col-span-2 text-sm text-ink/80 lg:col-span-1">{VEHICLE_CAPACITY[option.vehicle]}</p>
                <p className="col-span-2 text-sm text-slate lg:col-span-1">{JUBAIL_VEHICLE_FIT[option.vehicle]}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-slate">
          Travelling with more than seven people? We can send several vehicles, or a 30-seat coaster for company groups.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pricing({ from }: { from: JubailFareOption }) {
  return (
    <section aria-labelledby="pricing-heading" className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="grid grid-cols-1 overflow-hidden rounded-card border border-ink/10 lg:grid-cols-[1fr_1.1fr]">
          <div className="bg-sea/[0.06] p-6 sm:p-10">
            <p className="eyebrow text-sea">{JUBAIL_PRICING.eyebrow}</p>
            <h2 id="pricing-heading" className="mt-4 font-[family-name:var(--font-display)] leading-none">
              <span className="block text-sm font-semibold text-slate">Bahrain to Jubail, from</span>
              <span className="mt-2 block text-[3.25rem] font-extrabold tracking-tight sm:text-[4rem]">BHD {from.bhd}</span>
              <span className="mt-1 block text-xl font-semibold text-slate">SAR {from.sar}</span>
            </h2>
            <p className="mt-6 max-w-md text-slate">{JUBAIL_PRICING.lead}</p>
            <a
              href={`#${FARE_ANCHOR}`}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-input bg-ink px-7 text-base font-bold text-white transition-colors hover:bg-ink-soft"
            >
              Get your exact Jubail fare
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-1">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide">Always included</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {JUBAIL_PRICING.included.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem]">
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide">Your exact fare depends on</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {JUBAIL_PRICING.dependsOn.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] text-slate">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm">
                <Link href={withSlash("/fares")} className="font-semibold text-sea hover:underline">
                  Compare fares on every route →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Corporate() {
  return (
    <section aria-labelledby="corporate-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow text-sea">{JUBAIL_CORPORATE.eyebrow}</p>
          <h2 id="corporate-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.25rem]">
            {JUBAIL_CORPORATE.heading}
          </h2>
          <p className="mt-4 text-slate">{JUBAIL_CORPORATE.body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={withSlash("/corporate-accounts")}
              className="flex h-12 items-center justify-center whitespace-nowrap rounded-input bg-ink px-6 text-base font-semibold text-white hover:bg-ink-soft"
            >
              How corporate accounts work
            </Link>
            <a
              href={whatsappHref(JUBAIL_CHECKLIST.corporateTemplate)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center whitespace-nowrap gap-2 rounded-input border border-ink/20 px-6 text-base font-semibold hover:border-sea hover:text-sea"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-4 w-4" color="currentColor" />
              Discuss staff transport
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-px self-center overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {JUBAIL_CORPORATE.points.map((point) => (
            <li key={point} className="bg-white p-5 text-[0.95rem] font-medium">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Checklist() {
  return (
    <section aria-labelledby="checklist-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{JUBAIL_CHECKLIST.eyebrow}</p>
        <h2 id="checklist-heading" className="mt-3 max-w-2xl text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
          {JUBAIL_CHECKLIST.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_auto_1fr] lg:items-stretch lg:gap-8">
          <div className="rounded-card border border-ink/10 p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wide">Send us</h3>
            <ol className="mt-5 flex flex-col gap-3">
              {JUBAIL_CHECKLIST.send.map((item, index) => (
                <li key={item} className="flex gap-3 text-[0.95rem]">
                  <span className="w-5 shrink-0 font-[family-name:var(--font-mono)] text-sm text-sea">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-center justify-center text-2xl text-brass" aria-hidden="true">
            <span className="rotate-90 lg:rotate-0">→</span>
          </div>

          <div className="flex flex-col rounded-card bg-ink p-6 text-white sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wide">We&rsquo;ll confirm</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {JUBAIL_CHECKLIST.confirm.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] text-white/85">
                  <Tick light />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 lg:mt-auto lg:pt-8">
              <a
                href={whatsappHref(JUBAIL_CHECKLIST.template)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-input bg-brass px-6 text-base font-bold text-ink hover:bg-brass-lit"
                data-analytics="whatsapp_click"
              >
                <WhatsAppIcon className="h-5 w-5" color="currentColor" />
                Book on WhatsApp
              </a>
              <a
                href={whatsappHref(JUBAIL_CHECKLIST.returnTemplate)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center rounded-input border border-white/25 px-6 text-base font-semibold hover:border-white/60"
                data-analytics="whatsapp_click"
              >
                Request a return trip
              </a>
              <p className="mt-1 text-center text-xs text-white/55">
                Opens WhatsApp with this checklist ready to fill in.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate">
          Prefer not to use WhatsApp? Use the{" "}
          <Link href={withSlash("/booking")} className="font-semibold text-sea hover:underline">
            booking form
          </Link>
          , call{" "}
          <a href={telHref()} className="font-semibold text-sea hover:underline" data-analytics="call_click">
            {BUSINESS.phoneDisplay}
          </a>{" "}
          or{" "}
          <Link href={withSlash("/contact")} className="font-semibold text-sea hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ faqs }: { faqs: JubailFaq[] }) {
  return (
    <section aria-labelledby="faq-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow text-sea">FAQ</p>
          <h2 id="faq-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.5rem]">
            Bahrain to Jubail questions
          </h2>
          <p className="mt-4 text-slate">
            Anything else? Ask us on{" "}
            <a
              href={whatsappHref(HELLO_JUBAIL)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sea hover:underline"
              data-analytics="whatsapp_click"
            >
              WhatsApp
            </a>{" "}
            or read the{" "}
            <Link href={withSlash("/faqs")} className="font-semibold text-sea hover:underline">
              general FAQs
            </Link>
            .
          </p>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Onward() {
  const links = [
    { href: "/taxi-bahrain-to-dammam", label: "Bahrain to Dammam" },
    { href: "/taxi-bahrain-to-ras-tanura", label: "Bahrain to Ras Tanura" },
    { href: "/airport-transfers", label: "Airport transfers" },
  ];
  return (
    <section aria-label="Other Eastern Province routes" className="border-t border-ink/10 bg-white py-10">
      <p className="mx-auto max-w-[1200px] px-5 text-sm text-slate lg:px-10">
        Other trips across the causeway:{" "}
        {links.map((link, index) => (
          <span key={link.href}>
            <Link href={withSlash(link.href)} className="font-semibold text-ink underline decoration-ink/20 underline-offset-2 hover:text-sea">
              {link.label}
            </Link>
            {index < links.length - 2 ? ", " : index === links.length - 2 ? " or " : "."}
          </span>
        ))}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Tick({ light }: { light?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`mt-0.5 shrink-0 ${light ? "text-brass-lit" : "text-sea"}`} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
