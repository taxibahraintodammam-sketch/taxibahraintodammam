import Link from "next/link";
import { getRoute } from "@/content/routes";
import { ROUTE_FARES, VEHICLE_LABEL, VEHICLE_CAPACITY, fareWithSar } from "@/content/fares";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import { Reveal } from "@/components/ui/Reveal";
import { DirArrow } from "@/components/ui/DirArrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CausewayStrip } from "@/components/sections/CausewayStrip";
import { TripHero } from "@/components/dammam-bahrain/TripHero";
import { DestinationSelector } from "@/components/dammam-bahrain/DestinationSelector";
import { VehicleSelector } from "@/components/dammam-bahrain/VehicleSelector";
import {
  DB_ROUTE_SLUG,
  DB_HERO,
  DB_NARRATIVE,
  DB_JOURNEY,
  DB_BORDER_MIDDLE,
  DB_DESTINATION,
  DB_FLYING_FROM_BAHRAIN,
  DB_DMM_ARRIVAL,
  DB_BUSINESS,
  DB_WEEKEND,
  DB_BORDER_TIME,
  DB_CAUSEWAY,
  DB_DOCUMENTS,
  DB_VISA,
  DB_VEHICLE_SELECTOR,
  DB_SUV_DECISION,
  DB_ONE_VEHICLE,
  DB_INCLUDED,
  DB_FARE,
  DB_COST_EXPLAINER,
  DB_PICKUP,
  DB_BOOKING_ADVANCE,
  DB_CHANGES,
  DB_WHATSAPP_PREVIEW,
  DB_FAQS,
  DB_FAQ_HEADING,
  DB_FINAL_CTA,
} from "@/content/dammam-bahrain";

const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";
const label = "eyebrow text-sea";
const h2 = "mt-2 text-2xl font-bold text-ink lg:text-3xl";
const mono = "font-[family-name:var(--font-mono)]";
const GENERIC_WA = whatsappHref(DB_HERO.messageIntro);

export function DammamBahrainPage() {
  const route = getRoute(DB_ROUTE_SLUG)!;
  const fares = (ROUTE_FARES[DB_ROUTE_SLUG] ?? []).map(fareWithSar);

  return (
    <>
      <TripHero />
      <Narrative />
      <Journey />
      <BorderMiddle />
      <Destination />
      <FlyingFromBahrain />
      <DmmArrival />
      <BusinessAndWeekend />
      <BorderTime route={route} />
      <Causeway />
      <DocumentsAndVisa />
      <VehiclePicker />
      <OneVehicle />
      <IncludedFare fares={fares} route={route} />
      <CostExplainer />
      <PickupAndAdvance />
      <WhatsAppPreview />
      <Faqs />
      <FinalCta />
      <StickyBar />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Narrative() {
  return (
    <section aria-labelledby="narrative-heading" className="bg-sand py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DB_NARRATIVE.eyebrow}</p>
        <h2 id="narrative-heading" className={`${h2} max-w-3xl`}>{DB_NARRATIVE.heading}</h2>
        <div className="mt-6 flex flex-col gap-4 lg:max-w-3xl">
          {DB_NARRATIVE.body.map((p, i) => (
            <p key={i} className="text-ink/80 lg:text-lg">{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Journey() {
  return (
    <section aria-labelledby="journey-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        <p className="eyebrow text-brass-lit">{DB_JOURNEY.eyebrow}</p>
        <h2 id="journey-heading" className="mt-2 text-2xl font-bold lg:text-3xl">{DB_JOURNEY.heading}</h2>

        <ol className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-3">
          {DB_JOURNEY.stages.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.step}
              delay={i * 100}
              className="relative flex-1 border-s-2 border-white/15 ps-5 lg:border-s-0 lg:border-t-2 lg:pl-0 lg:pt-5"
            >
              <span
                className={`absolute -start-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full lg:-top-[9px] lg:start-0 ${
                  i === DB_JOURNEY.stages.length - 1 ? "bg-brass-lit" : "border-2 border-white/40 bg-ink"
                }`}
                aria-hidden="true"
              />
              <p className={`text-xs font-bold ${mono} text-white/40`}>{stage.step}</p>
              <p className="mt-1 text-lg font-bold">{stage.title}</p>
              <p className="mt-1 text-sm text-white/65">{stage.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BorderMiddle() {
  return (
    <section aria-labelledby="bordermiddle-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DB_BORDER_MIDDLE.eyebrow}</p>
        <h2 id="bordermiddle-heading" className={`${h2} max-w-3xl`}>{DB_BORDER_MIDDLE.heading}</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-card border border-ink/10 bg-ink/[0.03] p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-slate">{DB_BORDER_MIDDLE.wrongLabel}</p>
            <p className="mt-2 text-ink/70 line-through decoration-slate/50">{DB_BORDER_MIDDLE.wrong}</p>
          </div>
          <div className="rounded-card border border-sea bg-sea/[0.06] p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-sea">{DB_BORDER_MIDDLE.rightLabel}</p>
            <p className="mt-2 font-semibold text-ink">{DB_BORDER_MIDDLE.right}</p>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm text-slate">{DB_BORDER_MIDDLE.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Destination() {
  return (
    <section aria-labelledby="destination-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DB_DESTINATION.eyebrow}</p>
        <h2 id="destination-heading" className={h2}>{DB_DESTINATION.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/80 lg:text-lg">{DB_DESTINATION.intro}</p>
        <div className="mt-8">
          <DestinationSelector />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FlyingFromBahrain() {
  const c = DB_FLYING_FROM_BAHRAIN;
  return (
    <section aria-labelledby="flying-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{c.eyebrow}</p>
        <h2 id="flying-heading" className={`${h2} max-w-3xl`}>{c.heading}</h2>
        <p className="mt-4 max-w-2xl text-ink/80 lg:text-lg">{c.body}</p>
        <ol className="mt-6 flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center lg:gap-2">
          {c.chain.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className={`rounded-input px-3 py-2 text-sm font-semibold ${i === 0 ? "bg-ink text-white" : "bg-ink/[0.06] text-ink"}`}>
                {step}
              </span>
              {i < c.chain.length - 1 && <span className="text-slate lg:inline hidden" aria-hidden="true">{"→"}</span>}
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-2xl text-sm text-slate">{c.note}</p>
        <Link href={withSlash(c.linkHref)} className="mt-4 inline-block text-sm font-semibold text-sea hover:underline">
          {c.linkLabel} <DirArrow />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function DmmArrival() {
  const c = DB_DMM_ARRIVAL;
  return (
    <section aria-labelledby="dmmarrival-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{c.eyebrow}</p>
        <h2 id="dmmarrival-heading" className={`${h2} max-w-3xl`}>{c.heading}</h2>
        <ol className="mt-6 flex flex-wrap items-center gap-2">
          {c.flow.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-input bg-white px-3 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10">{step}</span>
              {i < c.flow.length - 1 && <span className="text-slate" aria-hidden="true">{"→"}</span>}
            </li>
          ))}
        </ol>
        <Link href={withSlash(c.linkHref)} className="mt-5 inline-block text-sm font-semibold text-sea hover:underline">
          {c.linkLabel} <DirArrow />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BusinessAndWeekend() {
  return (
    <section aria-labelledby="bizweekend-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <p className={label}>{DB_BUSINESS.eyebrow}</p>
          <h2 id="bizweekend-heading" className={h2}>{DB_BUSINESS.heading}</h2>
          <ul className="mt-5 flex flex-col gap-2">
            {DB_BUSINESS.scenarios.map((s) => (
              <li key={s} className="text-ink/80">{s}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate">{DB_BUSINESS.body}</p>
        </div>
        <div>
          <p className="eyebrow text-sea">{DB_WEEKEND.eyebrow}</p>
          <h3 className="mt-2 text-xl font-bold text-ink">{DB_WEEKEND.heading}</h3>
          <p className="mt-3 text-ink/80">{DB_WEEKEND.body}</p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {DB_WEEKEND.calendar.map((c, i) => (
              <Reveal key={c.label} delay={i * 60} className="rounded-card border border-ink/10 p-3 text-center">
                <p className="text-xs font-bold text-ink">{c.label}</p>
                <p className="mt-1 text-[11px] text-slate">{c.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BorderTime({ route }: { route: { durationLabel: string } }) {
  return (
    <section aria-labelledby="bordertime-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DB_BORDER_TIME.eyebrow}</p>
        <h2 id="bordertime-heading" className={`${h2} max-w-3xl`}>{DB_BORDER_TIME.heading}</h2>
        <p className="mt-4 max-w-3xl text-ink/80 lg:text-lg">{DB_BORDER_TIME.body}</p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-card bg-white px-5 py-4 ring-1 ring-ink/10" dir="ltr">
          <span className={`text-3xl font-extrabold text-ink ${mono}`}>{route.durationLabel}</span>
          <span className="text-sm text-slate">planning reference</span>
        </div>
        <p className="mt-5 max-w-2xl text-sm text-slate">{DB_BORDER_TIME.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Causeway() {
  return (
    <>
      <CausewayStrip heading={DB_CAUSEWAY.eyebrow} fromLabel="Dammam pickup" toLabel="Bahrain destination" reverse />
      <div className="bg-white pb-16 lg:pb-24">
        <div className={`${wrap} max-w-[820px]`}>
          <p className="font-semibold text-ink lg:text-lg">{DB_CAUSEWAY.heading}</p>
          <p className="mt-2 text-ink/80 lg:text-lg">{DB_CAUSEWAY.body}</p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function DocumentsAndVisa() {
  return (
    <section aria-labelledby="documents-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <p className={label}>{DB_DOCUMENTS.eyebrow}</p>
          <h2 id="documents-heading" className={h2}>{DB_DOCUMENTS.heading}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate">{DB_DOCUMENTS.you.label}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {DB_DOCUMENTS.you.items.map((it) => (
                  <li key={it} className="text-sm text-ink/80">{it}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate">{DB_DOCUMENTS.driver.label}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {DB_DOCUMENTS.driver.items.map((it) => (
                  <li key={it} className="text-sm text-ink/80">{it}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate">{DB_DOCUMENTS.note}</p>
        </div>

        <div className="self-start rounded-card bg-ink p-6 text-white sm:p-8">
          <p className="eyebrow text-brass-lit">{DB_VISA.eyebrow}</p>
          <h2 className="mt-2 text-xl font-bold">{DB_VISA.heading}</h2>
          <p className="mt-3 text-white/75">{DB_VISA.body}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function VehiclePicker() {
  return (
    <section aria-labelledby="vehiclepicker-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DB_VEHICLE_SELECTOR.eyebrow}</p>
        <h2 id="vehiclepicker-heading" className={h2}>{DB_VEHICLE_SELECTOR.heading}</h2>
        <div className="mt-8">
          <VehicleSelector />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
          <p className="eyebrow text-sea sm:col-span-2">{DB_SUV_DECISION.eyebrow}</p>
          <h3 className="sr-only">{DB_SUV_DECISION.heading}</h3>
          {DB_SUV_DECISION.rows.map((row) => (
            <div key={row.label} className="rounded-card bg-ink/[0.04] p-4">
              <p className="text-sm font-bold text-ink">{row.label}</p>
              <p className="mt-1 text-sm text-slate">{row.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function OneVehicle() {
  return (
    <section aria-labelledby="onevehicle-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        <p className="eyebrow text-brass-lit">{DB_ONE_VEHICLE.eyebrow}</p>
        <h2 id="onevehicle-heading" className="mt-2 text-2xl font-bold lg:text-3xl">{DB_ONE_VEHICLE.heading}</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-card border border-brass-lit/40 bg-white/5 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-brass-lit">{DB_ONE_VEHICLE.leftLabel}</p>
            <p className="mt-2 text-white/85">{DB_ONE_VEHICLE.left}</p>
          </div>
          <div className="rounded-card border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-white/40">{DB_ONE_VEHICLE.rightLabel}</p>
            <p className="mt-2 text-white/60">{DB_ONE_VEHICLE.right}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function IncludedFare({
  fares,
  route,
}: {
  fares: { vehicle: keyof typeof VEHICLE_LABEL; bhd: number; sar: number }[];
  route: { from: string; to: string };
}) {
  return (
    <section aria-label={`${route.from} to ${route.to} fare table`} className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <p className={label}>{DB_INCLUDED.eyebrow}</p>
          <h2 className={h2}>{DB_INCLUDED.heading}</h2>
          <ul className="mt-6 flex flex-col gap-2.5">
            {DB_INCLUDED.yes.map((y) => (
              <li key={y} className="flex items-center gap-3 text-ink/85">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sea text-[10px] text-white" aria-hidden="true">{"✓"}</span>
                {y}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-xs font-bold uppercase tracking-wide text-slate">{DB_INCLUDED.noHeading}</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {DB_INCLUDED.no.map((n) => (
              <li key={n} className="flex gap-3 text-sm text-slate">
                <span aria-hidden="true">{"×"}</span>
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={label}>{DB_FARE.eyebrow}</p>
          <h2 className={h2}>{DB_FARE.heading}</h2>
          {fares.length > 0 && (
            <div className="mt-6 overflow-x-auto rounded-card border border-ink/10">
              <table className="w-full border-collapse text-start text-sm sm:min-w-[420px]">
                <thead>
                  <tr className="border-b-2 border-ink text-ink">
                    <th className="px-4 py-3 font-semibold">{DB_FARE.vehicleHeader}</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">{DB_FARE.capacityHeader}</th>
                    <th className="px-4 py-3 font-semibold">{DB_FARE.fareHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {fares.map((fare, i) => (
                    <tr key={fare.vehicle} className={i % 2 === 1 ? "bg-ink/5" : undefined}>
                      <td className="px-4 py-3 font-medium text-ink">
                        {VEHICLE_LABEL[fare.vehicle]}
                        <span className="block text-xs font-normal text-slate sm:hidden">{VEHICLE_CAPACITY[fare.vehicle]}</span>
                      </td>
                      <td className="hidden px-4 py-3 text-slate sm:table-cell">{VEHICLE_CAPACITY[fare.vehicle]}</td>
                      <td className={`px-4 py-3 font-bold text-ink ${mono}`} dir="ltr">
                        BHD {fare.bhd} <span className="font-normal text-slate">/ SAR {fare.sar}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-4 text-xs text-slate">{DB_FARE.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function CostExplainer() {
  return (
    <section aria-labelledby="cost-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DB_COST_EXPLAINER.eyebrow}</p>
        <h2 id="cost-heading" className={`${h2} max-w-2xl`}>{DB_COST_EXPLAINER.heading}</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {DB_COST_EXPLAINER.parts.map((part, i) => (
            <Reveal key={part} delay={i * 50} as="span" className="rounded-full bg-white px-3.5 py-1.5 text-sm text-ink ring-1 ring-ink/10">
              {part}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function PickupAndAdvance() {
  return (
    <section aria-labelledby="pickup-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <p className={label}>{DB_PICKUP.eyebrow}</p>
          <h2 id="pickup-heading" className={h2}>{DB_PICKUP.heading}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {DB_PICKUP.types.map((t) => (
              <span key={t} className="rounded-input bg-ink/[0.06] px-3.5 py-2 text-sm font-medium text-ink">{t}</span>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate">{DB_PICKUP.body}</p>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="eyebrow text-sea">{DB_BOOKING_ADVANCE.eyebrow}</p>
            <h3 className="mt-2 text-lg font-bold text-ink">{DB_BOOKING_ADVANCE.heading}</h3>
            <p className="mt-2 text-sm text-ink/80">{DB_BOOKING_ADVANCE.body}</p>
          </div>
          <div>
            <p className="eyebrow text-sea">{DB_CHANGES.eyebrow}</p>
            <h3 className="mt-2 text-lg font-bold text-ink">{DB_CHANGES.heading}</h3>
            <p className="mt-2 text-sm text-ink/80">{DB_CHANGES.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function WhatsAppPreview() {
  const c = DB_WHATSAPP_PREVIEW;
  return (
    <section aria-labelledby="wa-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{c.eyebrow}</p>
        <h2 id="wa-heading" className={h2}>{c.heading}</h2>
        <div className="mt-8 max-w-md overflow-hidden rounded-card bg-white shadow-elevation ring-1 ring-ink/10">
          <p className={`border-b border-dashed border-ink/15 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate ${mono}`}>
            {c.eyebrow}
          </p>
          <div className="flex flex-col gap-1.5 bg-[#e8f5e9] p-5">
            <Reveal className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-white px-4 py-3 text-sm text-ink shadow-sm">
              {c.customer.map((line, i) => (
                <span key={i} className={i === 0 ? "block font-semibold" : "block text-ink/80"}>{line}</span>
              ))}
            </Reveal>
            <Reveal delay={150} className="mt-2 max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-brass px-4 py-3 text-sm text-ink shadow-sm">
              {c.reply}
            </Reveal>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate">{c.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs() {
  const half = Math.ceil(DB_FAQS.length / 2);
  return (
    <section aria-labelledby="faq-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <h2 id="faq-heading" className="text-2xl font-bold text-ink lg:text-3xl">{DB_FAQ_HEADING}</h2>
        <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={DB_FAQS.slice(0, half)} />
          <FaqAccordion faqs={DB_FAQS.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="bg-ink text-white">
      <div className={`${wrap} grid grid-cols-1 gap-8 py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:py-16`}>
        <div>
          <h2 className="max-w-xl text-2xl font-bold leading-tight lg:text-[2rem]">{DB_FINAL_CTA.heading}</h2>
          <p className="mt-3 max-w-xl text-white/70">{DB_FINAL_CTA.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <a href="#build-trip" className="flex h-12 items-center justify-center rounded-input bg-brass px-6 text-base font-semibold text-ink hover:bg-brass-lit">
            {DB_FINAL_CTA.primary}
          </a>
          <a
            href={GENERIC_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-input border border-white/20 px-6 text-sm font-semibold text-white/85 hover:border-white/50"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-4 w-4" color="currentColor" />
            {DB_FINAL_CTA.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function StickyBar() {
  return (
    <div
      data-page-sticky
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.5fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a href="#build-trip" className="flex items-center justify-center bg-ink px-3 text-center text-sm font-bold text-white">
        Get My Fare
      </a>
      <a
        href={GENERIC_WA}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-sm font-semibold text-ink"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon className="h-4 w-4" color="currentColor" />
        WhatsApp
      </a>
    </div>
  );
}
