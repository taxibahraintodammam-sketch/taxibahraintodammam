import Link from "next/link";
import { getRoute } from "@/content/routes";
import { ROUTE_FARES, VEHICLE_LABEL, VEHICLE_CAPACITY, fareWithSar } from "@/content/fares";
import { PICKUP_AREAS } from "@/content/pickup-areas";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import { Reveal } from "@/components/ui/Reveal";
import { DirArrow } from "@/components/ui/DirArrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CausewayStrip } from "@/components/sections/CausewayStrip";
import { FlightHero } from "@/components/dmm-departure/FlightHero";
import { PlanningCalculator } from "@/components/dmm-departure/PlanningCalculator";
import { VehicleSelector } from "@/components/dmm-departure/VehicleSelector";
import { ScenarioToggle } from "@/components/dmm-departure/ScenarioToggle";
import {
  DMM_ROUTE_SLUG,
  DMM_HERO,
  DMM_NARRATIVE,
  DMM_TIMELINE,
  DMM_CALCULATOR,
  DMM_FLIGHT_TYPE,
  DMM_DRIVE_VS_PLAN,
  DMM_JOURNEY,
  DMM_TERMINAL,
  DMM_BORDER_BUFFER,
  DMM_SCENARIOS,
  DMM_VEHICLE_SELECTOR,
  DMM_SUV_HONESTY,
  DMM_GROUP_TRAVEL,
  DMM_EXECUTIVE,
  DMM_PICKUP,
  DMM_DISTANCE,
  DMM_CAUSEWAY,
  DMM_DOCUMENTS,
  DMM_INCLUDED,
  DMM_FARE,
  DMM_COST_EXPLAINER,
  DMM_BOOKING_TIMING,
  DMM_WHATSAPP_PREVIEW,
  DMM_RETURN,
  DMM_FAQS,
  DMM_FAQ_HEADING,
  DMM_FINAL_CTA,
} from "@/content/dmm-departure";

const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";
const label = "eyebrow text-sea";
const h2 = "mt-2 text-2xl font-bold text-ink lg:text-3xl";
const mono = "font-[family-name:var(--font-mono)]";
const GENERIC_WA = whatsappHref(DMM_HERO.messageIntro);

export function DmmDeparturePage() {
  const route = getRoute(DMM_ROUTE_SLUG)!;
  const fares = (ROUTE_FARES[DMM_ROUTE_SLUG] ?? []).map(fareWithSar);
  const pickupAreas = PICKUP_AREAS.filter((a) => route.pickupAreas.includes(a.slug));

  return (
    <>
      <FlightHero />
      <Narrative />
      <BackwardTimeline />
      <Calculator />
      <FlightType />
      <DriveVsPlan route={route} />
      <JourneySteps />
      <Terminal />
      <BorderBuffer />
      <Scenarios />
      <VehiclePicker />
      <SuvAndGroup />
      <Executive />
      <PickupLocations areas={pickupAreas} />
      <Distance route={route} />
      <Causeway />
      <DocumentsIncluded />
      <FareTable fares={fares} route={route} />
      <CostExplainer />
      <BookingTiming />
      <WhatsAppPreview />
      <ReturnLink />
      <Faqs />
      <FinalCta />
      <StickyBar />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Narrative() {
  return (
    <section aria-labelledby="narrative-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_NARRATIVE.eyebrow}</p>
        <h2 id="narrative-heading" className={`${h2} max-w-3xl`}>{DMM_NARRATIVE.heading}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            {DMM_NARRATIVE.body.map((p, i) => (
              <p key={i} className="text-ink/80 lg:text-lg">{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3 self-start sm:grid-cols-2">
            <div className="rounded-card border border-ink/10 bg-ink/[0.03] p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate">{DMM_NARRATIVE.compareNormalLabel}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{DMM_NARRATIVE.compareNormal}</p>
            </div>
            <div className="rounded-card border border-sea bg-sea/[0.06] p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-sea">{DMM_NARRATIVE.compareAirportLabel}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{DMM_NARRATIVE.compareAirport}</p>
            </div>
            <p className="sm:col-span-2 mt-1 text-center text-sm font-bold uppercase tracking-wide text-slate">
              {DMM_NARRATIVE.conclusion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BackwardTimeline() {
  return (
    <section aria-labelledby="timeline-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        <p className="eyebrow text-brass-lit">{DMM_TIMELINE.eyebrow}</p>
        <h2 id="timeline-heading" className="mt-2 text-2xl font-bold lg:text-3xl">{DMM_TIMELINE.heading}</h2>
        <p className="mt-3 max-w-2xl text-white/70">{DMM_TIMELINE.intro}</p>

        <ol className="relative mt-10 max-w-xl border-s-2 border-white/15 ps-8">
          {DMM_TIMELINE.stages.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.title}
              delay={i * 90}
              className={`relative pb-8 last:pb-0 ${i === 0 ? "" : ""}`}
            >
              <span
                className={`absolute -start-[41px] top-0 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${mono} ${
                  i === 0 ? "bg-brass-lit text-ink" : "border-2 border-white/30 bg-ink text-white/70"
                }`}
                aria-hidden="true"
              >
                {i === 0 ? "✈" : "↑"}
              </span>
              <p className={`text-xs font-bold uppercase tracking-wide ${i === 0 ? "text-brass-lit" : "text-white/40"}`}>{stage.time}</p>
              <p className={`mt-1 text-lg font-bold ${i === 0 ? "text-2xl" : ""}`}>{stage.title}</p>
              <p className="mt-1 text-sm text-white/65">{stage.body}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 max-w-xl text-xs text-white/45">{DMM_TIMELINE.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Calculator() {
  return (
    <section aria-labelledby="calculator-heading" id="planning-calculator" className="scroll-mt-20 bg-sea/[0.05] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16`}>
        <div>
          <p className={label}>{DMM_CALCULATOR.eyebrow}</p>
          <h2 id="calculator-heading" className={h2}>{DMM_CALCULATOR.heading}</h2>
          <p className="mt-4 text-ink/80 lg:text-lg">{DMM_CALCULATOR.intro}</p>
          <ul className="mt-6 flex flex-col gap-2">
            {DMM_CALCULATOR.breakdown.map((b, i) => (
              <Reveal as="li" key={b.key} delay={i * 60} className="flex items-center gap-3 text-sm text-ink/75">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sea" aria-hidden="true" />
                {b.label}
              </Reveal>
            ))}
          </ul>
        </div>
        <PlanningCalculator />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FlightType() {
  return (
    <section aria-labelledby="flighttype-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_FLIGHT_TYPE.eyebrow}</p>
        <h2 id="flighttype-heading" className={`${h2} max-w-2xl`}>{DMM_FLIGHT_TYPE.heading}</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-card border border-ink/10 p-6">
            <h3 className="text-lg font-bold text-ink">{DMM_FLIGHT_TYPE.international.title}</h3>
            <p className="mt-2 text-ink/75">{DMM_FLIGHT_TYPE.international.body}</p>
          </div>
          <div className="rounded-card border border-ink/10 p-6">
            <h3 className="text-lg font-bold text-ink">{DMM_FLIGHT_TYPE.regional.title}</h3>
            <p className="mt-2 text-ink/75">{DMM_FLIGHT_TYPE.regional.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function DriveVsPlan({ route }: { route: { durationLabel: string } }) {
  return (
    <section aria-labelledby="drivevsplan-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_DRIVE_VS_PLAN.eyebrow}</p>
        <h2 id="drivevsplan-heading" className={`${h2} max-w-3xl`}>{DMM_DRIVE_VS_PLAN.heading}</h2>
        <p className="mt-4 max-w-3xl text-ink/80 lg:text-lg">{DMM_DRIVE_VS_PLAN.body}</p>

        <div className="mt-8 rounded-card bg-white p-6 ring-1 ring-ink/10 sm:p-8">
          <p className="text-sm font-semibold text-slate">
            {DMM_DRIVE_VS_PLAN.equationIntro.replace("{duration}", route.durationLabel)}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center" dir="ltr">
            {DMM_DRIVE_VS_PLAN.equation.map((part, i) => (
              <span key={part} className="flex items-center gap-2">
                <span
                  className={`rounded-input px-3 py-2 text-sm font-semibold ${
                    i === 2 ? "bg-sea text-white" : "bg-ink/[0.06] text-ink"
                  }`}
                  dir="auto"
                >
                  {part}
                </span>
                {i < DMM_DRIVE_VS_PLAN.equation.length - 1 && (
                  <span className="text-slate" aria-hidden="true">+</span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate">{DMM_DRIVE_VS_PLAN.equationNote}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function JourneySteps() {
  return (
    <section aria-labelledby="journeysteps-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_JOURNEY.eyebrow}</p>
        <h2 id="journeysteps-heading" className={h2}>{DMM_JOURNEY.heading}</h2>
        <ol className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {DMM_JOURNEY.steps.map((step) => (
            <li key={step.step} className="bg-white p-6">
              <span className={`text-3xl font-bold text-sea/30 ${mono}`}>{step.step}</span>
              <h3 className="mt-2 font-bold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm text-slate">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Terminal() {
  return (
    <section aria-labelledby="terminal-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={label}>{DMM_TERMINAL.eyebrow}</p>
          <h2 id="terminal-heading" className={h2}>{DMM_TERMINAL.heading}</h2>
          <p className="mt-4 text-ink/80 lg:text-lg">{DMM_TERMINAL.body}</p>
          <p className="mt-4 text-sm text-slate">{DMM_TERMINAL.note}</p>
        </div>
        <div className="self-center rounded-card bg-white p-6 ring-1 ring-ink/10 sm:p-8">
          <p className="text-sm font-bold text-slate">{DMM_TERMINAL.fieldsLabel}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {DMM_TERMINAL.fields.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-input bg-ink/[0.04] px-4 py-3 text-sm font-semibold text-ink">
                {f}
              </li>
            ))}
          </ul>
          <a href="#build-transfer" className="mt-5 inline-block text-sm font-semibold text-sea hover:underline">
            {DMM_TERMINAL.formCta} <DirArrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BorderBuffer() {
  return (
    <section aria-labelledby="borderbuffer-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_BORDER_BUFFER.eyebrow}</p>
        <h2 id="borderbuffer-heading" className={`${h2} max-w-3xl`}>{DMM_BORDER_BUFFER.heading}</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {DMM_BORDER_BUFFER.conditions.map((c, i) => (
            <Reveal key={c.label} delay={i * 100} className="rounded-card border border-ink/10 p-5">
              <p className={`text-xs font-bold uppercase tracking-wide ${i === 0 ? "text-slate" : i === 1 ? "text-sea" : "text-danger"}`}>
                {c.label}
              </p>
              <p className="mt-2 text-sm text-ink/80">{c.body}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-ink/80">{DMM_BORDER_BUFFER.body}</p>
        <p className="mt-4 max-w-3xl rounded-card bg-ink/[0.04] p-4 text-sm text-ink/75">{DMM_BORDER_BUFFER.calendarNote}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Scenarios() {
  const c = DMM_SCENARIOS;
  return (
    <section aria-labelledby="scenarios-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{c.eyebrow}</p>
        <h2 id="scenarios-heading" className={`${h2} max-w-3xl`}>{c.heading}</h2>
        <div className="mt-8">
          <ScenarioToggle />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-ink/10 bg-white p-6">
            <h3 className="font-bold text-ink">{c.changeExample.title}</h3>
            <div className="mt-3 flex items-center gap-3 text-sm" dir="ltr">
              <span className="rounded-input bg-ink/[0.06] px-3 py-1.5 font-semibold text-ink/70 line-through">{c.changeExample.original}</span>
              <DirArrow />
              <span className="rounded-input bg-sea/10 px-3 py-1.5 font-semibold text-sea">{c.changeExample.changed}</span>
            </div>
            <p className="mt-3 text-sm text-ink/75">{c.changeExample.action}</p>
          </div>
          <div className="rounded-card border border-ink/10 bg-white p-6">
            <h3 className="font-bold text-ink">{c.missedFlight.title}</h3>
            <p className="mt-3 text-sm text-ink/75">{c.missedFlight.body}</p>
          </div>
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
        <p className={label}>{DMM_VEHICLE_SELECTOR.eyebrow}</p>
        <h2 id="vehiclepicker-heading" className={h2}>{DMM_VEHICLE_SELECTOR.heading}</h2>
        <div className="mt-8">
          <VehicleSelector />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SuvAndGroup() {
  return (
    <section aria-labelledby="suvgroup-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12`}>
        <div>
          <p className={label}>{DMM_SUV_HONESTY.eyebrow}</p>
          <h2 id="suvgroup-heading" className={h2}>{DMM_SUV_HONESTY.heading}</h2>
          {DMM_SUV_HONESTY.body.map((p, i) => (
            <p key={i} className="mt-3 text-ink/80">{p}</p>
          ))}
        </div>
        <div className="self-start rounded-card bg-ink p-6 text-white sm:p-8">
          <p className="eyebrow text-brass-lit">{DMM_GROUP_TRAVEL.eyebrow}</p>
          <h3 className="mt-2 text-xl font-bold">{DMM_GROUP_TRAVEL.heading}</h3>
          <p className="mt-3 text-white/75">{DMM_GROUP_TRAVEL.body}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Executive() {
  return (
    <section aria-labelledby="executive-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16`}>
        <div>
          <p className="eyebrow text-brass-lit">{DMM_EXECUTIVE.eyebrow}</p>
          <h2 id="executive-heading" className="mt-2 text-2xl font-bold lg:text-3xl">{DMM_EXECUTIVE.heading}</h2>
          <p className="mt-4 text-white/75 lg:text-lg">{DMM_EXECUTIVE.body}</p>
        </div>
        <div className="rounded-card border border-white/15 bg-white/5 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">{VEHICLE_LABEL.luxury}</p>
          <p className="mt-2 text-lg font-semibold">{VEHICLE_CAPACITY.luxury}</p>
          <Link href={withSlash("/fleet/luxury-mercedes-s-class")} className="mt-4 inline-block text-sm font-semibold text-brass-lit hover:underline">
            {DMM_EXECUTIVE.cta} <DirArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function PickupLocations({ areas }: { areas: { slug: string; name: string }[] }) {
  if (areas.length === 0) return null;
  return (
    <section aria-labelledby="pickup-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_PICKUP.eyebrow}</p>
        <h2 id="pickup-heading" className={`${h2} max-w-3xl`}>{DMM_PICKUP.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/80">{DMM_PICKUP.body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={withSlash(`/pickup/${area.slug}`)}
              className="rounded-input border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-sea"
            >
              {area.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Distance({ route }: { route: { distanceKm: number } }) {
  return (
    <section aria-labelledby="distance-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_DISTANCE.eyebrow}</p>
        <p dir="ltr" className={`mt-3 text-6xl font-extrabold text-ink sm:text-7xl ${mono}`}>~{route.distanceKm} km</p>
        <h2 id="distance-heading" className="mt-4 text-2xl font-bold text-ink lg:text-3xl">{DMM_DISTANCE.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/80 lg:text-lg">{DMM_DISTANCE.body}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Causeway() {
  return (
    <>
      <CausewayStrip heading={DMM_CAUSEWAY.eyebrow} fromLabel="Bahrain pickup" toLabel="DMM departures" />
      <div className="bg-white pb-16 lg:pb-24">
        <div className={`${wrap} max-w-[820px]`}>
          <p className="font-semibold text-ink lg:text-lg">{DMM_CAUSEWAY.heading}</p>
          <p className="mt-2 text-ink/80 lg:text-lg">{DMM_CAUSEWAY.body}</p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function DocumentsIncluded() {
  return (
    <section aria-labelledby="documents-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <p className={label}>{DMM_DOCUMENTS.eyebrow}</p>
          <h2 id="documents-heading" className={h2}>{DMM_DOCUMENTS.heading}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate">{DMM_DOCUMENTS.you.label}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {DMM_DOCUMENTS.you.items.map((it) => (
                  <li key={it} className="text-sm text-ink/80">{it}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate">{DMM_DOCUMENTS.driver.label}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {DMM_DOCUMENTS.driver.items.map((it) => (
                  <li key={it} className="text-sm text-ink/80">{it}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate">{DMM_DOCUMENTS.note}</p>
        </div>

        <div>
          <p className={label}>{DMM_INCLUDED.eyebrow}</p>
          <h2 className={h2}>{DMM_INCLUDED.heading}</h2>
          <ul className="mt-6 flex flex-col gap-2.5">
            {DMM_INCLUDED.yes.map((y) => (
              <li key={y} className="flex items-center gap-3 text-ink/85">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sea text-[10px] text-white" aria-hidden="true">✓</span>
                {y}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-xs font-bold uppercase tracking-wide text-slate">{DMM_INCLUDED.noHeading}</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {DMM_INCLUDED.no.map((n) => (
              <li key={n} className="flex gap-3 text-sm text-slate">
                <span aria-hidden="true">×</span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FareTable({ fares, route }: { fares: { vehicle: keyof typeof VEHICLE_LABEL; bhd: number; sar: number }[]; route: { from: string; to: string } }) {
  if (fares.length === 0) return null;
  return (
    <section aria-label={`${route.from} to ${route.to} fare table`} className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_FARE.eyebrow}</p>
        <h2 className={h2}>{DMM_FARE.heading}</h2>
        <div className="mt-8 overflow-x-auto rounded-card border border-ink/10">
          <table className="w-full border-collapse text-start text-sm sm:min-w-[560px]">
            <thead>
              <tr className="border-b-2 border-ink text-ink">
                <th className="px-4 py-3 font-semibold">{DMM_FARE.vehicleHeader}</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">{DMM_FARE.capacityHeader}</th>
                <th className="px-4 py-3 font-semibold">{DMM_FARE.fareHeader}</th>
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
        <p className="mt-4 text-xs text-slate">{DMM_FARE.disclaimer}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function CostExplainer() {
  return (
    <section aria-labelledby="cost-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_COST_EXPLAINER.eyebrow}</p>
        <h2 id="cost-heading" className={`${h2} max-w-2xl`}>{DMM_COST_EXPLAINER.heading}</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {DMM_COST_EXPLAINER.parts.map((part, i) => (
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

function BookingTiming() {
  return (
    <section aria-labelledby="booking-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={label}>{DMM_BOOKING_TIMING.eyebrow}</p>
        <h2 id="booking-heading" className={`${h2} max-w-2xl`}>{DMM_BOOKING_TIMING.heading}</h2>
        <p className="mt-4 max-w-2xl text-ink/80 lg:text-lg">{DMM_BOOKING_TIMING.body}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function WhatsAppPreview() {
  const c = DMM_WHATSAPP_PREVIEW;
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

function ReturnLink() {
  return (
    <section aria-labelledby="return-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16`}>
        <div>
          <p className="eyebrow text-brass-lit">{DMM_RETURN.eyebrow}</p>
          <h2 id="return-heading" className="mt-2 text-2xl font-bold lg:text-3xl">{DMM_RETURN.heading}</h2>
          <p className="mt-3 max-w-xl text-white/75">{DMM_RETURN.body}</p>
        </div>
        <Link
          href={withSlash(DMM_RETURN.href)}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-input border border-white/25 px-6 text-sm font-semibold hover:border-white/60"
        >
          {DMM_RETURN.link} <DirArrow />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs() {
  const half = Math.ceil(DMM_FAQS.length / 2);
  return (
    <section aria-labelledby="faq-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <h2 id="faq-heading" className="text-2xl font-bold text-ink lg:text-3xl">{DMM_FAQ_HEADING}</h2>
        <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={DMM_FAQS.slice(0, half)} />
          <FaqAccordion faqs={DMM_FAQS.slice(half)} />
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
          <h2 className="max-w-xl text-2xl font-bold leading-tight lg:text-[2rem]">{DMM_FINAL_CTA.heading}</h2>
          <p className="mt-3 max-w-xl text-white/70">{DMM_FINAL_CTA.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <a href="#build-transfer" className="flex h-12 items-center justify-center rounded-input bg-brass px-6 text-base font-semibold text-ink hover:bg-brass-lit">
            {DMM_FINAL_CTA.primary}
          </a>
          <a
            href={GENERIC_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-input border border-white/20 px-6 text-sm font-semibold text-white/85 hover:border-white/50"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-4 w-4" color="currentColor" />
            {DMM_FINAL_CTA.secondary}
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
      <a href="#build-transfer" className="flex items-center justify-center bg-ink px-3 text-center text-sm font-bold text-white">
        {DMM_FINAL_CTA.primary}
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
