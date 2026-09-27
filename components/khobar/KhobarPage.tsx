import Image from "next/image";
import Link from "next/link";
import type { KhobarCopy } from "@/content/khobar";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { JourneyMap } from "@/components/khobar/JourneyMap";
import { VehicleChoice, type KhobarFare } from "@/components/khobar/VehicleChoice";
import { KhobarRequest } from "@/components/khobar/KhobarRequest";

/** Real figures from content/routes.ts and content/fares.ts. */
export type KhobarFigures = {
  km: number;
  time: string;
  dammamKm: number;
  dammamTime: string;
  dammamSedan: number;
  fares: Record<"sedan" | "van" | "suv" | "luxury", KhobarFare | undefined>;
};

/** Fill the {tokens} in the copy with the published figures. */
export function fillKhobar<T>(copy: T, f: KhobarFigures): T {
  const map: Record<string, string> = {
    km: String(f.km),
    time: f.time,
    sedan: String(f.fares.sedan?.bhd ?? ""),
    van: String(f.fares.van?.bhd ?? ""),
    suv: String(f.fares.suv?.bhd ?? ""),
    luxury: String(f.fares.luxury?.bhd ?? ""),
  };
  return JSON.parse(JSON.stringify(copy).replace(/\{(km|time|sedan|van|suv|luxury)\}/g, (_, k: string) => map[k])) as T;
}

type P = (path: string) => string;
const BOOK = "khobar-booking";
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.7rem]";
const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";

export function KhobarPage({ copy, locale, figures }: { copy: KhobarCopy; locale: Locale; figures: KhobarFigures }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  const wa = copy.hero.secondaryMessage;
  return (
    <>
      <Hero copy={copy.hero} />
      <Close copy={copy.close} />
      <Distance copy={copy.distance} />
      <RouteMap copy={copy.map} />
      <Border copy={copy.border} />
      <SameDay copy={copy.sameDay} />
      <DayOrHourly copy={copy.day} p={p} />
      <Ends copy={copy.ends} />
      <Airport copy={copy.airport} p={p} />
      <Vehicles copy={copy} figures={figures} p={p} />
      <IncludedDocs copy={copy} p={p} />
      <ReturnTrip copy={copy.returnTrip} p={p} />
      <Versus copy={copy.versus} figures={figures} p={p} />
      <Booking copy={copy.booking} message={wa} p={p} />
      <Faqs copy={copy.faq} />
      <Final copy={copy.final} message={wa} />
      <StickyBar copy={copy.sticky} message={wa} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: KhobarCopy["hero"] }) {
  return (
    <section className="bg-white">
      <div className={`${wrap} grid grid-cols-1 gap-6 pb-10 pt-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14 lg:pb-14 lg:pt-14`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.05] text-ink sm:text-[3.4rem] lg:text-[4rem]">{copy.heading}</h1>
        </div>
        <div>
          <p className="text-lg text-ink/70">{copy.sub}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`#${BOOK}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-ink px-7 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft">
              {copy.primary}
            </a>
            <a
              href={whatsappHref(copy.secondaryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-ink/20 px-6 text-base font-semibold text-ink transition-colors hover:border-ink/50"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-5 w-5" color="currentColor" />
              {copy.secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Panoramic causeway strip, then the route drawn beneath it */}
      <div className="relative h-[230px] overflow-hidden sm:h-[320px] lg:h-[420px]">
        <Image src="/hero/slide-causeway.webp" alt={copy.imageAlt} fill priority sizes="100vw" quality={80} className="object-cover object-[45%_62%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" aria-hidden="true" />
      </div>
      <div className="bg-ink pb-10 text-white lg:pb-14">
        <div className={wrap}>
          {/* Geography runs west (Bahrain) to east (Khobar) in both languages */}
          <div className="relative pt-2" dir="ltr">
            <div className="flex items-center justify-between text-sm font-bold sm:text-base">
              <span dir="auto">{copy.from}</span>
              <span className="text-xs font-semibold text-sea sm:text-sm" dir="auto">{copy.via}</span>
              <span dir="auto">{copy.to}</span>
            </div>
            <div className="relative mt-3 h-3">
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/15" aria-hidden="true" />
              <span className="route-draw absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-brass-lit" style={{ animationDuration: "3.2s", animationDelay: "0.4s", transformOrigin: "left center" }} aria-hidden="true" />
              <span className="absolute left-[30%] right-[30%] top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-sea/70" aria-hidden="true" />
              <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-white" aria-hidden="true" />
              <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-white" aria-hidden="true" />
              <span className="khobar-drive absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-lit shadow-[0_0_0_6px_rgba(96,165,250,0.25)]" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {copy.stats.map((s, i) => (
              <div key={s.label} className="ledger-row" style={{ animationDelay: `${1100 + i * 800}ms` }}>
                <p className={`text-xl font-bold sm:text-3xl ${mono}`}>{s.value}</p>
                <p className="mt-1 text-xs text-white/55 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/45">{copy.caveat}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Close({ copy }: { copy: KhobarCopy["close"] }) {
  return (
    <section aria-labelledby="close-heading" className="bg-white py-16 lg:py-28">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="close-heading" className={`${h2} lg:text-[3.1rem]`}>{copy.heading}</h2>
          <p className="mt-8 border-s-4 border-sea ps-5 text-xl font-semibold leading-relaxed text-ink lg:text-2xl">{copy.lead}</p>
          {copy.body.map((b, i) => (
            <p key={i} className="mt-5 text-ink/75 lg:text-[1.05rem] lg:leading-relaxed">{b}</p>
          ))}
        </div>
        <div className="lg:pt-24">
          <p className="text-sm font-semibold text-slate">{copy.stepsLabel}</p>
          <ol className="mt-4">
            {copy.steps.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 90} className={`flex items-center gap-4 border-t py-4 last:border-b ${i === 2 ? "border-sea/40" : "border-ink/10"}`}>
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${mono} ${i === 2 ? "bg-sea text-white" : "bg-ink/[0.06]"}`}>{i + 1}</span>
                <span className={`text-lg ${i === 1 || i === 3 ? "font-bold" : ""}`}>{s}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Distance({ copy }: { copy: KhobarCopy["distance"] }) {
  return (
    <section aria-labelledby="distance-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="distance-heading" className={h2}>{copy.heading}</h2>

        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-xl ring-1 ring-ink/10 md:grid-cols-[1fr_auto_1fr]">
          <Reveal className="bg-white p-6 sm:p-10">
            <p className="text-sm font-semibold text-slate">{copy.roadLabel}</p>
            <p className={`mt-2 text-5xl font-bold sm:text-6xl ${mono}`}>{copy.road}</p>
            <p className="mt-2 text-slate">{copy.roadNote}</p>
          </Reveal>
          <span className="flex items-center justify-center bg-ink/[0.06] py-2 text-2xl font-bold text-slate md:px-5 md:py-0" aria-hidden="true">≠</span>
          <Reveal delay={150} className="bg-ink p-6 text-white sm:p-10">
            <p className="text-sm font-semibold text-white/60">{copy.doorLabel}</p>
            <p className={`mt-2 text-5xl font-bold sm:text-6xl ${mono}`}>{copy.door}</p>
            <p className="mt-2 text-white/60">{copy.doorNote}</p>
          </Reveal>
        </div>

        {/* What's inside the time: stages, not a timed breakdown */}
        <div className="mt-10">
          <p className="text-sm font-semibold text-slate">{copy.partsLabel}</p>
          <ol className="mt-3 flex flex-col gap-1 sm:flex-row" dir="ltr">
            {copy.parts.map((pt, i) => (
              <Reveal
                as="li"
                key={pt}
                delay={i * 80}
                className={`flex items-center rounded-md px-3 py-3 text-sm font-semibold sm:justify-center sm:text-center ${
                  i === 2 ? "bg-sea text-white sm:flex-[1.6]" : i === 1 || i === 3 ? "bg-ink text-white sm:flex-1" : "bg-white ring-1 ring-ink/10 sm:flex-1"
                }`}
              >
                <span dir="auto">{pt}</span>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <p className="text-ink/80 lg:text-lg">{copy.body}</p>
          <p className="self-start border-s-2 border-sea ps-4 text-[0.95rem] font-semibold">{copy.caution}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function RouteMap({ copy }: { copy: KhobarCopy["map"] }) {
  return (
    <section aria-labelledby="map-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="map-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 text-slate">{copy.intro}</p>
        <JourneyMap copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Border({ copy }: { copy: KhobarCopy["border"] }) {
  return (
    <section aria-labelledby="border-heading" className="bg-white pb-16 lg:pb-24">
      <div className={wrap}>
        <div className="border-t border-ink/10 pt-14">
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="border-heading" className={h2}>{copy.heading}</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            {[
              { h: copy.youHeading, items: copy.you },
              { h: copy.driverHeading, items: copy.driver },
            ].map((col) => (
              <div key={col.h}>
                <h3 className="text-xl font-bold">{col.h}</h3>
                <ul className="mt-4 border-t border-ink/10">
                  {col.items.map((it) => (
                    <li key={it} className="border-b border-ink/10 py-3.5 text-[1.02rem] text-ink/85">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-lg bg-ink/[0.04] p-5 text-[0.95rem] text-ink/80">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SameDay({ copy }: { copy: KhobarCopy["sameDay"] }) {
  const ex = copy.example;
  return (
    <section aria-labelledby="sameday-heading" className="bg-ink py-16 text-white lg:py-28">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
            <h2 id="sameday-heading" className={`${h2} lg:text-[3rem]`}>{copy.heading}</h2>
            <p className="mt-5 text-white/75 lg:text-lg">{copy.body}</p>

            {/* There and back: one loop */}
            <div className="mt-10 flex items-center gap-3" dir="ltr" aria-hidden="true">
              {copy.loop.map((l, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className={`rounded-full px-4 py-2 text-sm font-bold ${i === 1 ? "bg-brass-lit text-ink" : "bg-white/10"}`} dir="auto">{l}</span>
                  {i < copy.loop.length - 1 && <span className="h-px w-8 bg-white/30 sm:w-14" />}
                </span>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {copy.uses.map((u, i) => (
                <Reveal as="li" key={u} delay={i * 60} className="rounded-md border border-white/15 px-3 py-1.5 text-sm text-white/85">{u}</Reveal>
              ))}
            </ul>
          </div>

          <figure className="self-start rounded-xl bg-white p-6 text-ink sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-bold">{ex.heading}</h3>
              <span className={`rounded-md bg-ink/[0.06] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate ${mono} rtl:normal-case`}>{ex.tag}</span>
            </div>
            <ol className="mt-6">
              {ex.stops.map((s, i) => (
                <Reveal as="li" key={s.text} delay={i * 110} className="relative grid grid-cols-[1rem_6.5rem_1fr] items-baseline gap-3 pb-5 last:pb-0">
                  {i < ex.stops.length - 1 && <span className="absolute bottom-0 start-[5px] top-4 w-0.5 bg-ink/10" aria-hidden="true" />}
                  <span className={`relative z-10 h-3 w-3 rounded-full ${i === 2 ? "bg-sea" : "bg-ink"}`} aria-hidden="true" />
                  <span className={`text-sm text-slate ${mono}`}>{s.time}</span>
                  <span className="font-semibold">{s.text}</span>
                </Reveal>
              ))}
            </ol>
            <figcaption className="mt-6 border-t border-ink/10 pt-4 text-sm text-ink/75">{ex.note}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function DayOrHourly({ copy, p }: { copy: KhobarCopy["day"]; p: P }) {
  const plans = [copy.transfer, copy.hourly];
  return (
    <section aria-labelledby="day-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="day-heading" className={`${h2} max-w-3xl`}>{copy.heading}</h2>
        <p className="mt-4 max-w-3xl text-ink/80 lg:text-lg">{copy.body}</p>
        <div className="mt-10 grid grid-cols-1 gap-4">
          {plans.map((pl, i) => (
            <Reveal key={pl.label} delay={i * 120} className={`grid grid-cols-1 gap-4 rounded-xl p-5 sm:p-7 lg:grid-cols-[14rem_1fr] lg:items-center ${i === 0 ? "bg-ink/[0.035]" : "bg-sea/[0.07]"}`}>
              <div>
                <p className="font-bold">{pl.label}</p>
                <p className="mt-1 text-sm text-slate">{pl.note}</p>
              </div>
              <ol className="flex flex-wrap items-center gap-2">
                {pl.plan.map((step, j) => (
                  <li key={`${step}-${j}`} className="flex items-center gap-2">
                    <span className={`rounded-md px-3 py-1.5 text-sm font-semibold ${j === 0 || j === pl.plan.length - 1 ? "bg-ink text-white" : "bg-white ring-1 ring-ink/10"}`}>{step}</span>
                    {j < pl.plan.length - 1 && <span className="text-slate"><DirArrow /></span>}
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
        <Link href={p("/hourly-chauffeur-hire")} className="mt-4 inline-block py-2 text-sm font-semibold text-sea hover:underline">
          {copy.link} <DirArrow />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Ends({ copy }: { copy: KhobarCopy["ends"] }) {
  return (
    <section aria-labelledby="ends-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="ends-heading" className={`${h2} max-w-3xl`}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_auto_0.85fr] lg:items-stretch">
          <div className="rounded-xl bg-white p-6 ring-1 ring-ink/10 sm:p-8">
            <h3 className="flex items-center gap-3 text-lg font-bold">
              <span className="h-3 w-3 rounded-full border-2 border-ink" aria-hidden="true" />
              {copy.pickupHeading}
            </h3>
            {/* One flowing line of places, not a grid of pages */}
            <p className="mt-5 text-lg leading-[2.1] text-ink/85">
              {copy.pickups.map((pk, i) => (
                <span key={pk}>
                  <span className={`whitespace-nowrap ${i === copy.pickups.length - 1 ? "font-semibold text-sea" : ""}`}>{pk}</span>
                  {i < copy.pickups.length - 1 && <span className="mx-2 text-ink/25" aria-hidden="true">/</span>}{" "}
                </span>
              ))}
            </p>
            <p className="mt-5 text-sm text-slate">{copy.pickupNote}</p>
          </div>
          <span className="hidden items-center text-2xl text-slate lg:flex" aria-hidden="true"><DirArrow /></span>
          <div className="rounded-xl bg-ink p-6 text-white sm:p-8">
            <h3 className="flex items-center gap-3 text-lg font-bold">
              <span className="h-3 w-3 rounded-full bg-sea" aria-hidden="true" />
              {copy.dropHeading}
            </h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {copy.drops.map((d) => (
                <li key={d} className="border-b border-white/10 pb-2.5 text-white/85">{d}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-white/60">{copy.dropNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Airport({ copy, p }: { copy: KhobarCopy["airport"]; p: P }) {
  return (
    <section aria-labelledby="kh-airport-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="kh-airport-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80 lg:text-lg">{copy.body}</p>
          <Link href={p("/airport-transfers")} className="mt-3 inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {copy.link} <DirArrow />
          </Link>
        </div>
        <div className="self-center">
          <ol className="border-s-2 border-ink/10 ps-6">
            {copy.flow.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 80} className="relative py-2">
                <span className={`absolute -start-[31px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ${i === 0 ? "bg-ink" : i === copy.flow.length - 1 ? "bg-sea" : "border-2 border-ink/30 bg-white"}`} aria-hidden="true" />
                <span className={i === 0 || i === copy.flow.length - 1 ? "text-lg font-bold" : "text-ink/80"}>{f}</span>
              </Reveal>
            ))}
          </ol>
          <div className="mt-6 rounded-lg bg-ink/[0.04] p-5">
            <p className="text-sm font-bold">{copy.sendLabel}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {copy.send.map((s) => (
                <li key={s} className="rounded-md bg-white px-2.5 py-1 text-sm ring-1 ring-ink/10">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Vehicles({ copy, figures, p }: { copy: KhobarCopy; figures: KhobarFigures; p: P }) {
  const v = copy.vehicles;
  const fr = copy.fare;
  const sedan = figures.fares.sedan;
  return (
    <section aria-labelledby="kh-vehicles-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{v.eyebrow}</p>
        <h2 id="kh-vehicles-heading" className={h2}>{v.heading}</h2>
        <p className="mt-3 text-slate">{v.intro}</p>
        <VehicleChoice copy={v} fares={figures.fares} />
        <p className="mt-4 text-sm text-slate">
          {v.modelNote}{" "}
          <Link href={p("/fleet")} className="font-semibold text-sea hover:underline">{v.fleet} <DirArrow /></Link>
        </p>

        {/* What changes the fare: the start point, then what moves it */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-ink/10 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className={`${label} text-sea`}>{fr.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-bold lg:text-[2rem]">{fr.heading}</h3>
            {sedan && (
              <div className="mt-6">
                <p className="text-sm text-slate">{fr.startLabel}</p>
                <p className={`mt-1 ${mono}`} dir="ltr">
                  <span className="text-5xl font-bold">BHD {sedan.bhd}</span>
                  <span className="text-slate"> / SAR {sedan.sar}</span>
                </p>
              </div>
            )}
          </div>
          <div>
            <p className="text-ink/80">{fr.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {fr.factors.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 50} className="rounded-full bg-white px-3.5 py-1.5 text-sm ring-1 ring-ink/10">{f}</Reveal>
              ))}
            </ul>
            <p className="mt-6 font-semibold">{fr.confirm}</p>
            <Link href={p("/fares")} className="mt-1 inline-block py-2 text-sm font-semibold text-sea hover:underline">
              {fr.allFares} <DirArrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function IncludedDocs({ copy, p }: { copy: KhobarCopy; p: P }) {
  const inc = copy.included;
  const doc = copy.documents;
  return (
    <section aria-labelledby="included-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{inc.eyebrow}</p>
          <h2 id="included-heading" className={h2}>{inc.heading}</h2>
          <ul className="mt-8 flex flex-col gap-3">
            {inc.yes.map((y) => (
              <li key={y} className="flex items-center gap-3 text-lg">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sea text-xs text-white" aria-hidden="true">✓</span>
                {y}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 text-sm font-bold text-slate">{inc.noHeading}</h3>
          <ul className="mt-3 flex flex-col gap-1.5">
            {inc.no.map((n) => (
              <li key={n} className="flex gap-3 text-[0.95rem] text-slate">
                <span aria-hidden="true">×</span>
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="self-start rounded-xl bg-ink p-6 text-white sm:p-8">
          <p className={`${label} text-brass-lit`}>{doc.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold lg:text-[2rem]">{doc.heading}</h2>
          <ul className="mt-6 flex flex-col gap-3">
            {doc.items.map((it) => (
              <li key={it} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-brass-lit text-[11px] text-brass-lit" aria-hidden="true">✓</span>
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/60">{doc.note}</p>
          <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="mt-2 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">
            {doc.link} <DirArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ReturnTrip({ copy, p }: { copy: KhobarCopy["returnTrip"]; p: P }) {
  return (
    <section aria-labelledby="return-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="return-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-ink/10 ring-1 ring-ink/10 md:grid-cols-2">
          {copy.options.map((o) => (
            <div key={o.key} className="bg-white p-6 sm:p-8">
              <span className={`text-5xl font-bold text-sea/30 ${mono}`}>{o.key}</span>
              <h3 className="mt-2 text-xl font-bold">{o.title}</h3>
              <p className="mt-2 text-ink/75">{o.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[0.95rem] text-ink/80">{copy.note}</p>
          <Link href={p("/taxi-khobar-to-bahrain")} className="shrink-0 py-2 text-sm font-semibold text-sea hover:underline">
            {copy.link} <DirArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Versus({ copy, figures, p }: { copy: KhobarCopy["versus"]; figures: KhobarFigures; p: P }) {
  const rows = [
    { ...copy.khobar, km: figures.km, time: figures.time, sedan: figures.fares.sedan?.bhd, here: true },
    { ...copy.dammam, km: figures.dammamKm, time: figures.dammamTime, sedan: figures.dammamSedan, here: false },
  ];
  const max = Math.max(figures.km, figures.dammamKm);
  return (
    <section aria-labelledby="versus-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="versus-heading" className={h2}>{copy.heading}</h2>
          <div className="mt-10 flex flex-col gap-8">
            {rows.map((r, i) => (
              <Reveal key={r.name} delay={i * 150}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`text-2xl font-bold ${r.here ? "" : "text-ink/70"}`}>{r.name}</h3>
                  <span className={`text-sm text-slate ${mono}`} dir="auto">{r.km} {copy.km} · {r.time}</span>
                </div>
                {/* Bar length follows the published distance */}
                <div className="mt-3 h-3 rounded-full bg-ink/[0.06]" dir="ltr">
                  <div className={`h-full rounded-full ${r.here ? "bg-sea" : "bg-ink/40"}`} style={{ width: `${(r.km / max) * 100}%` }} />
                </div>
                <p className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
                  <span className="text-slate">{r.note}</span>
                  {r.sedan !== undefined && <span className={`font-semibold ${mono}`}>{copy.sedanFrom} <span dir="ltr">BHD {r.sedan}</span></span>}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="self-center">
          <p className="text-ink/80 lg:text-lg lg:leading-relaxed">{copy.body}</p>
          <Link href={p("/taxi-bahrain-to-dammam")} className="mt-3 inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {copy.link} <DirArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Booking({ copy, message, p }: { copy: KhobarCopy["booking"]; message: string; p: P }) {
  return (
    <section id={BOOK} aria-labelledby="booking-heading" className="scroll-mt-20 bg-ink/[0.035] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="booking-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80">{copy.body}</p>

          {/* A worked example, clearly marked */}
          <figure className="mt-8 overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
            <p className={`border-b border-dashed border-ink/20 px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate ${mono} rtl:normal-case`}>{copy.exampleTag}</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 px-5 py-4 text-sm">
              {copy.example.map((e) => (
                <div key={e.label}>
                  <dt className="text-slate">{e.label}</dt>
                  <dd className="font-semibold">{e.value}</dd>
                </div>
              ))}
            </dl>
            <ol className="flex flex-wrap items-center gap-1.5 border-t border-ink/10 bg-ink/[0.03] px-5 py-3 text-xs">
              {copy.exampleFlow.map((f, i) => (
                <li key={f} className="flex items-center gap-1.5">
                  <span className={i === copy.exampleFlow.length - 1 ? "font-bold text-sea" : "text-ink/75"}>{f}</span>
                  {i < copy.exampleFlow.length - 1 && <span className="text-slate"><DirArrow /></span>}
                </li>
              ))}
            </ol>
          </figure>
        </div>

        <div className="self-start rounded-xl bg-white p-6 shadow-elevation ring-1 ring-ink/10 sm:p-8">
          <KhobarRequest copy={copy} secondaryMessage={message} />
          <Link href={p("/booking")} className="mt-4 inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {copy.fullBooking} <DirArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy }: { copy: KhobarCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="kh-faq-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="kh-faq-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: KhobarCopy["final"]; message: string }) {
  return (
    <section aria-labelledby="kh-final-heading" className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
      <Image src="/hero/slide-causeway.webp" alt="" fill sizes="100vw" quality={60} className="-z-10 object-cover object-[50%_60%] opacity-25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/50" aria-hidden="true" />
      <div className={wrap}>
        {/* The address is where it starts: a pin on a line */}
        <div className="flex items-center gap-3 text-brass-lit" dir="ltr" aria-hidden="true">
          <span className="h-3 w-3 rounded-full border-2 border-current" />
          <span className="h-px w-16 bg-current opacity-50" />
          <span className="h-3 w-3 rounded-full bg-current" />
        </div>
        <h2 id="kh-final-heading" className="mt-6 max-w-2xl text-[2.2rem] font-bold leading-tight lg:text-[3.4rem]">{copy.heading}</h2>
        <p className="mt-5 max-w-xl text-lg text-white/75">{copy.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`#${BOOK}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-brass px-7 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit">
            {copy.primary}
          </a>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/25 px-6 text-base font-semibold transition-colors hover:border-white/60"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.secondary}
          </a>
        </div>
        <p className={`mt-6 text-sm text-white/55 ${mono}`}>{copy.trust}</p>
      </div>
    </section>
  );
}

/** Khobar mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: KhobarCopy["sticky"]; message: string }) {
  return (
    <div
      data-page-sticky
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.5fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a href={`#${BOOK}`} className="flex items-center justify-center bg-ink px-3 text-center text-sm font-bold text-white">
        {copy.primary}
      </a>
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-sm font-semibold text-ink"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon className="h-4 w-4" color="currentColor" />
        {copy.whatsapp}
      </a>
    </div>
  );
}
