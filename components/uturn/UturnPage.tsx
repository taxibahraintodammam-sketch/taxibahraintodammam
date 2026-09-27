import Image from "next/image";
import Link from "next/link";
import type { UturnCopy } from "@/content/uturn";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { LoopStages } from "@/components/uturn/LoopStages";
import { PlanForm, StayChooser, VehicleCounter, JourneyChooser, PickupSender, PrepChecklist } from "@/components/uturn/UturnWidgets";

type Fare = { bhd: number; sar: number };
export type UturnFares = Record<"sedan" | "suv" | "van", Fare | undefined>;

/** Fill {hours} and fare tokens with the published figures. */
export function fillUturn<T>(copy: T, hours: string, fares: UturnFares): T {
  const map: Record<string, string> = {
    hours,
    sedan: String(fares.sedan?.bhd ?? ""),
    suv: String(fares.suv?.bhd ?? ""),
    van: String(fares.van?.bhd ?? ""),
  };
  return JSON.parse(JSON.stringify(copy).replace(/\{(hours|sedan|suv|van)\}/g, (_, k: string) => map[k])) as T;
}

type P = (path: string) => string;
const PLAN = "plan-uturn";
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.7rem]";
const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";

export function UturnPage({ copy, locale, fares }: { copy: UturnCopy; locale: Locale; fares: UturnFares }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  const wa = copy.hero.secondaryMessage;
  return (
    <>
      <Hero copy={copy} />
      <What copy={copy.what} />
      <Journey copy={copy.journey} />
      <Checkpoints copy={copy.checkpoints} />
      <Roles copy={copy} />
      <Time copy={copy.time} />
      <Stay copy={copy.stay} p={p} />
      <Vehicle copy={copy.vehicle} fares={fares} />
      <Scenarios copy={copy.scenarios} />
      <Which copy={copy.which} p={p} />
      <Pickup copy={copy.pickup} p={p} />
      <Pricing copy={copy} fares={fares} p={p} />
      <Booking copy={copy.booking} />
      <Prep copy={copy} p={p} />
      <Faqs copy={copy.faq} />
      <Final copy={copy.final} message={wa} />
      <StickyBar copy={copy.sticky} message={wa} />
    </>
  );
}

/* ------------------------------------------------------------------ */

/** The border loop: out along the top, turn, back along the bottom. */
const LOOP = "M 70 60 H 860 A 60 60 0 0 1 860 180 H 70";

function LoopDiagram({ copy }: { copy: UturnCopy["hero"] }) {
  const xs = [70, 300, 530, 760];
  const outs = copy.loop.out;
  const backs = copy.loop.back;
  return (
    <figure className="hidden md:block" aria-label={[...outs, copy.loop.turn, ...backs].join(" → ")}>
      <svg viewBox="0 0 1000 240" className="w-full" style={{ direction: "ltr" }} aria-hidden="true">
        <path d={LOOP} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
        <path d={LOOP} fill="none" stroke="var(--color-brass-lit)" strokeWidth="4" pathLength={1} className="loop-draw" strokeLinecap="round" />
        {/* Causeway stretches drawn as water-coloured dashes */}
        <path d="M 330 60 H 730" stroke="var(--color-sea)" strokeWidth="10" strokeDasharray="16 10" opacity="0.55" />
        <path d="M 330 180 H 730" stroke="var(--color-sea)" strokeWidth="10" strokeDasharray="16 10" opacity="0.55" />
        {outs.map((o, i) => (
          <g key={`o-${i}`}>
            <rect x={xs[i] - 7} y={53} width="14" height="14" rx={i === 1 || i === 3 ? 2 : 7} fill={i === 0 ? "#fff" : "#0d0d0d"} stroke="#fff" strokeWidth="2" />
            <text x={xs[i]} y="36" textAnchor={i === 0 ? "start" : "middle"} className="fill-white text-[15px] font-semibold">{o}</text>
          </g>
        ))}
        {backs.map((b, i) => {
          const x = xs[3 - i];
          return (
            <g key={`b-${i}`}>
              <rect x={x - 7} y={173} width="14" height="14" rx={i === 0 || i === 2 ? 2 : 7} fill={i === 3 ? "#fff" : "#0d0d0d"} stroke="#fff" strokeWidth="2" />
              <text x={x} y="214" textAnchor={i === 3 ? "start" : "middle"} className="fill-white text-[15px] font-semibold">{b}</text>
            </g>
          );
        })}
        <text x="872" y="126" textAnchor="end" className="fill-white/70 text-[14px] font-semibold">{copy.loop.turn}</text>
        <text x="884" y="127" textAnchor="start" className="fill-[var(--color-brass-lit)] text-[16px] font-bold">↺</text>
        {/* One slow pass of the car marker */}
        <circle r="9" fill="var(--color-brass-lit)" className="loop-marker">
          <animateMotion dur="10s" begin="0.6s" fill="freeze" path={LOOP} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" />
        </circle>
        <circle r="9" cx="70" cy="180" fill="var(--color-brass-lit)" className="loop-marker-static" />
      </svg>
      <figcaption className="mt-2 text-xs text-white/40">{copy.illustration}</figcaption>
    </figure>
  );
}

function Hero({ copy }: { copy: UturnCopy }) {
  const h = copy.hero;
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image src="/hero/slide-causeway.webp" alt="" fill priority sizes="100vw" quality={70} className="-z-10 object-cover object-[50%_60%] opacity-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/90 to-ink" aria-hidden="true" />
      <div className={`${wrap} pb-14 pt-10 lg:pb-20 lg:pt-16`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex flex-col">
            <p className={`${label} text-brass-lit`}>{h.eyebrow}</p>
            <h1 className="mt-4 text-[2.4rem] font-bold leading-[1.04] sm:text-[3.4rem] lg:text-[4rem]">{h.heading}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">{h.sub}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {h.facts.map((f) => (
                <li key={f} className="rounded-md border border-white/20 px-3 py-1.5 text-sm font-semibold">{f}</li>
              ))}
            </ul>
            <a
              href={whatsappHref(h.secondaryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 py-2 text-sm font-semibold text-brass-lit hover:underline"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-4 w-4" color="currentColor" />
              {h.secondary}
            </a>
          </div>
          <div id={PLAN} className="scroll-mt-24 self-start rounded-xl bg-white p-5 text-ink shadow-elevation sm:p-7">
            <h2 className="text-xl font-bold">{copy.plan.heading}</h2>
            <div className="mt-4">
              <PlanForm copy={copy.plan} />
            </div>
          </div>
        </div>
        <div className="mt-14">
          <p className={`${label} mb-4 text-white/50`}>{h.loopLabel}</p>
          <LoopDiagram copy={h} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function What({ copy }: { copy: UturnCopy["what"] }) {
  return (
    <section aria-labelledby="what-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="what-heading" className={`${h2} lg:text-[3rem]`}>{copy.heading}</h2>
        </div>
        <div>
          {copy.body.map((b, i) => (
            <p key={i} className={`${i ? "mt-5" : ""} text-lg leading-relaxed ${i === 0 ? "text-ink" : "text-ink/75"}`}>{b}</p>
          ))}
          <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-lg sm:grid-cols-2">
            <p className="bg-ink px-5 py-4 font-semibold text-white">{copy.ours}</p>
            <p className="bg-sea/10 px-5 py-4 font-semibold text-ink">{copy.yours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Journey({ copy }: { copy: UturnCopy["journey"] }) {
  return (
    <section aria-labelledby="journey-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="journey-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.intro}</p>
        <LoopStages copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Checkpoints({ copy }: { copy: UturnCopy["checkpoints"] }) {
  const it = copy.items;
  const cp = (i: number) => (
    <Reveal delay={i * 180} className="text-center">
      <span className={`block text-6xl font-bold leading-none text-white lg:text-7xl ${mono}`}>{it[i].n}</span>
      <span className="mt-3 block text-lg font-bold">{it[i].name}</span>
      <span className="mt-1 block text-sm text-white/55">{it[i].note}</span>
    </Reveal>
  );
  const causeway = (
    <span className="flex flex-col items-center gap-2 px-2" aria-hidden="true">
      <span className="h-1.5 w-full min-w-10 rounded-full bg-[repeating-linear-gradient(90deg,var(--color-sea)_0_12px,transparent_12px_18px)]" />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-sea rtl:normal-case">{copy.causeway}</span>
    </span>
  );
  return (
    <section aria-labelledby="cp-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h2 id="cp-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-white/70">{copy.intro}</p>

        {/* Desktop: 01 ── causeway ── 02 ↺ 03 ── causeway ── 04 */}
        <div className="mt-14 hidden grid-cols-[1fr_0.7fr_1fr_auto_1fr_0.7fr_1fr] items-center lg:grid" dir="ltr">
          {cp(0)}
          {causeway}
          {cp(1)}
          <span className="px-4 text-3xl text-brass-lit" aria-hidden="true">↺</span>
          {cp(2)}
          {causeway}
          {cp(3)}
        </div>
        {/* Phones: two pairs */}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:hidden">
          {[0, 1, 2, 3].map((i) => <div key={i}>{cp(i)}</div>)}
        </div>
        <p className="mt-12 max-w-3xl border-s-2 border-brass-lit ps-4 text-white/75">{copy.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Roles({ copy }: { copy: UturnCopy }) {
  const r = copy.roles;
  const o = copy.outcome;
  return (
    <section aria-labelledby="roles-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{r.eyebrow}</p>
        <h2 id="roles-heading" className={h2}>{r.heading}</h2>
        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-xl md:grid-cols-2">
          <Reveal className="reveal-xl bg-ink p-6 text-white sm:p-10">
            <h3 className="text-xl font-bold">{r.oursHeading}</h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {r.ours.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="text-brass-lit" aria-hidden="true">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="reveal-x bg-sea/[0.08] p-6 sm:p-10">
            <h3 className="text-xl font-bold">{r.yoursHeading}</h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {r.yours.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="text-sea" aria-hidden="true">●</span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-slate">{r.authorities}</p>

        {/* Transport, not an outcome */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t-2 border-ink pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h3 className="text-[1.75rem] font-bold leading-tight lg:text-[2.4rem]">{o.heading}</h3>
            <p className="mt-4 text-ink/80 lg:text-lg">{o.body}</p>
          </div>
          <div>
            <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {o.items.map((x) => (
                <li key={x} className="border-b border-ink/10 py-3 text-ink/85">
                  <span className="me-2 text-slate" aria-hidden="true">—</span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate">{o.close}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Time({ copy }: { copy: UturnCopy["time"] }) {
  return (
    <section aria-labelledby="time-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="time-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-6 text-2xl font-bold lg:text-3xl">{copy.lead}</p>
        <p className="mt-3 max-w-3xl text-ink/80">{copy.body}</p>

        {/* The journey window: checkpoint stages hatched, the Saudi side open-ended */}
        <ol className="mt-10 grid grid-cols-1 gap-1 sm:grid-cols-9" dir="ltr">
          {copy.segments.map((s, i) => {
            const check = i === 1 || i === 3 || i === 5 || i === 7;
            const saudi = i === 4;
            return (
              <Reveal
                as="li"
                key={`${s}-${i}`}
                delay={i * 60}
                className={`flex min-h-12 items-center rounded-md px-3 py-2 text-xs font-semibold sm:justify-center sm:text-center ${
                  saudi
                    ? "border-2 border-dashed border-sea bg-white text-sea"
                    : check
                      ? "bg-[repeating-linear-gradient(135deg,rgba(13,13,13,0.9)_0_8px,rgba(13,13,13,0.75)_8px_16px)] text-white"
                      : "bg-white ring-1 ring-ink/10"
                }`}
              >
                <span dir="auto">{s}</span>
              </Reveal>
            );
          })}
        </ol>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate">
          <span className="flex items-center gap-2"><span className="h-3 w-5 rounded-sm bg-ink/80" aria-hidden="true" />{copy.queues}</span>
          <span className="flex items-center gap-2"><span className="h-3 w-5 rounded-sm border-2 border-dashed border-sea" aria-hidden="true" />{copy.variable}</span>
        </div>

        {/* 24/7 */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-ink/10 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold">{copy.dayHeading}</h3>
            <p className="mt-3 text-ink/80">{copy.dayBody}</p>
          </div>
          <div className="self-center">
            <div className="h-3 rounded-full bg-[linear-gradient(90deg,#0d0d0d_0%,#14213d_18%,#d99a55_30%,#f5d9a8_50%,#d99a55_72%,#14213d_85%,#0d0d0d_100%)]" aria-hidden="true" />
            <ol className="mt-3 grid grid-cols-6 text-center text-[11px] font-semibold text-slate sm:text-xs">
              {copy.day.map((d, i) => <li key={`${d}-${i}`}>{d}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Stay({ copy, p }: { copy: UturnCopy["stay"]; p: P }) {
  return (
    <section aria-labelledby="stay-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="stay-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/75">{copy.intro}</p>
        <StayChooser copy={copy} planHref={`#${PLAN}`} hourlyHref={p("/hourly-chauffeur-hire")} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Vehicle({ copy, fares }: { copy: UturnCopy["vehicle"]; fares: UturnFares }) {
  const f = { sedan: fares.sedan?.bhd, suv: fares.suv?.bhd, van: fares.van?.bhd };
  return (
    <section aria-labelledby="uv-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="uv-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/75">{copy.intro}</p>
        <VehicleCounter copy={copy} fares={f} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Scenarios({ copy }: { copy: UturnCopy["scenarios"] }) {
  return (
    <section aria-labelledby="sc-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="sc-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-16 md:grid-cols-2">
          {copy.items.map((s, i) => (
            <Reveal key={s.quote} delay={(i % 2) * 120} className="border-t border-ink/15 py-8">
              <p className={`text-xs text-sea ${mono}`}>0{i + 1}</p>
              <p className="mt-2 text-xl font-bold leading-snug">“{s.quote}”</p>
              <p className="mt-3 text-ink/75">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Which({ copy, p }: { copy: UturnCopy["which"]; p: P }) {
  const hrefs = copy.options.map((o) => (o.href ? p(o.href) : ""));
  return (
    <section aria-labelledby="which-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h2 id="which-heading" className={h2}>{copy.heading}</h2>
        <JourneyChooser copy={copy} hrefs={hrefs} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pickup({ copy, p }: { copy: UturnCopy["pickup"]; p: P }) {
  return (
    <section aria-labelledby="pickup-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="pickup-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80">{copy.body}</p>
        </div>
        <div className="self-center">
          <ul className="mb-5 flex flex-wrap gap-2">
            {copy.types.map((t) => (
              <li key={t} className="rounded-md bg-ink/[0.05] px-3 py-1.5 text-sm">{t}</li>
            ))}
          </ul>
          <PickupSender copy={copy} />
          <p className="mt-4 text-sm text-slate">
            {copy.airport}{" "}
            <Link href={p("/airport-transfers")} className="font-semibold text-sea hover:underline">{copy.airportLink} <DirArrow /></Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pricing({ copy, fares, p }: { copy: UturnCopy; fares: UturnFares; p: P }) {
  const pr = copy.pricing;
  const inc = copy.included;
  const order = ["sedan", "suv", "van"] as const;
  return (
    <section aria-labelledby="up-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        {/* What the fare covers: one strip, then what depends on the plan */}
        <p className={`${label} text-sea`}>{inc.eyebrow}</p>
        <h2 className={h2}>{inc.heading}</h2>
        <ol className="mt-8 flex flex-wrap items-center gap-2">
          {inc.yes.map((y, i) => (
            <Reveal as="li" key={y} delay={i * 70} className="flex items-center gap-2">
              <span className="rounded-md bg-ink px-3.5 py-2 text-sm font-semibold text-white">{y}</span>
              {i < inc.yes.length - 1 && <span className="text-ink/30" aria-hidden="true">+</span>}
            </Reveal>
          ))}
        </ol>
        <div className="mt-6 rounded-xl border border-dashed border-ink/25 p-5">
          <p className="text-sm font-bold">{inc.dependsHeading}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {inc.depends.map((d) => <li key={d} className="rounded-md bg-white px-3 py-1.5 text-sm ring-1 ring-ink/10">{d}</li>)}
          </ul>
          <p className="mt-4 text-sm font-semibold text-sea">{inc.confirmed}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-ink/10 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} text-sea`}>{pr.eyebrow}</p>
            <h2 id="up-heading" className="mt-3 text-2xl font-bold lg:text-[2rem]">{pr.heading}</h2>
            <dl className="mt-6 border-t-2 border-ink">
              {order.map((k) => {
                const f = fares[k];
                if (!f) return null;
                return (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-4">
                    <dt className="font-semibold">{pr.names[k]}</dt>
                    <dd className={mono}>
                      <span className="text-sm text-slate">{pr.from} </span>
                      <span className="text-2xl font-bold" dir="ltr">BHD {f.bhd}</span>
                      <span className="text-sm text-slate" dir="ltr"> / SAR {f.sar}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-3 text-sm text-slate">{pr.startNote}</p>
            <p className="mt-6 text-sm font-bold">{pr.factorsHeading}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pr.factors.map((f) => <li key={f} className="rounded-md bg-white px-3 py-1.5 text-sm ring-1 ring-ink/10">{f}</li>)}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={whatsappHref(pr.ctaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-ink px-6 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft"
                data-analytics="whatsapp_click"
              >
                <WhatsAppIcon className="h-5 w-5" color="currentColor" />
                {pr.cta}
              </a>
              <Link href={p("/fares")} className="py-2 text-sm font-semibold text-sea hover:underline">{pr.allFares} <DirArrow /></Link>
            </div>
          </div>
          <div className="self-start rounded-xl bg-white p-6 ring-1 ring-ink/10 sm:p-8">
            <h3 className="text-xl font-bold">{pr.whyHeading}</h3>
            <p className="mt-3 text-ink/80">{pr.why}</p>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {pr.whyItems.map((w, i) => (
                <li key={w} className="flex items-center gap-3 text-[0.95rem]">
                  <span className={`text-xs text-sea ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Booking({ copy }: { copy: UturnCopy["booking"] }) {
  const msg = copy.customer.join("\n");
  return (
    <section aria-labelledby="ub-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="ub-heading" className={h2}>{copy.heading}</h2>
          <ol className="mt-10">
            {copy.steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 130} className="relative grid grid-cols-[3rem_1fr] gap-4 pb-8 last:pb-0">
                {i < copy.steps.length - 1 && <span className="absolute bottom-0 start-[23px] top-12 w-0.5 bg-ink/10" aria-hidden="true" />}
                <span className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-lg font-bold text-white ${mono}`}>{s.n}</span>
                <div className="pt-2.5">
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-ink/70">{s.items.join(" · ")}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <a href={`#${PLAN}`} className="mt-8 inline-flex h-12 items-center rounded-md bg-brass px-7 font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit">
            {copy.cta}
          </a>
        </div>

        {/* A WhatsApp-style preview: the lines arrive in order as it scrolls in */}
        <figure className="self-center rounded-2xl bg-[#e5ddd5] p-4 sm:p-5">
          <figcaption className={`mb-3 text-center text-[10px] font-semibold uppercase tracking-wide text-ink/50 ${mono} rtl:normal-case`}>{copy.previewTag}</figcaption>
          <div className="ms-auto max-w-[88%] rounded-lg rounded-se-none bg-[#dcf8c6] p-3.5 text-[0.93rem] leading-relaxed text-ink shadow-sm rtl:rounded-se-lg rtl:rounded-ss-none">
            {copy.customer.map((l, i) => (
              <Reveal as="p" key={i} delay={i * 220} className={i === 0 ? "" : "text-ink/75"}>{l}</Reveal>
            ))}
          </div>
          <Reveal delay={copy.customer.length * 220 + 400} className="mt-3 max-w-[80%] rounded-lg rounded-ss-none bg-white p-3.5 text-[0.93rem] text-ink shadow-sm rtl:rounded-ss-lg rtl:rounded-se-none">
            {copy.reply}
          </Reveal>
          <a
            href={whatsappHref(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex h-12 items-center justify-center gap-2 rounded-md bg-[#25d366] font-bold text-ink transition-colors hover:bg-[#1fbd5b]"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.send}
          </a>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Prep({ copy, p }: { copy: UturnCopy; p: P }) {
  const d = copy.documents;
  const c = copy.checklist;
  return (
    <section aria-labelledby="prep-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{d.eyebrow}</p>
          <h2 className={h2}>{d.heading}</h2>
          <ul className="mt-6 flex flex-col gap-3">
            {d.items.map((it) => (
              <li key={it} className="flex gap-3 text-lg">
                <span className="text-sea" aria-hidden="true">→</span>
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-slate">{d.note}</p>
          {/* Transport booking ≠ immigration approval */}
          <p className="mt-6 flex flex-wrap items-center gap-3 text-lg font-bold">
            <span className="rounded-md bg-ink px-3 py-1.5 text-white">{d.equation[0]}</span>
            <span className="text-2xl text-danger" aria-label="is not">≠</span>
            <span className="rounded-md border-2 border-ink px-3 py-1">{d.equation[1]}</span>
          </p>
          <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="mt-4 inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {d.link} <DirArrow />
          </Link>
        </div>
        <div>
          <p className={`${label} text-sea`}>{c.eyebrow}</p>
          <h2 id="prep-heading" className={h2}>{c.heading}</h2>
          <p className="mt-3 text-ink/75">{c.intro}</p>
          <div className="mt-6">
            <PrepChecklist copy={c} planHref={`#${PLAN}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy }: { copy: UturnCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="uf-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="uf-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: UturnCopy["final"]; message: string }) {
  return (
    <section aria-labelledby="ufinal-heading" className="bg-ink py-20 text-white lg:py-28">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center`}>
        <div>
          <h2 id="ufinal-heading" className="text-[2.2rem] font-bold leading-tight lg:text-[3.4rem]">{copy.heading}</h2>
          <p className="mt-5 max-w-xl text-lg text-white/75">{copy.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`#${PLAN}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-brass px-7 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit">
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
        </div>
        {/* A small closing loop mark */}
        <svg viewBox="0 0 200 90" className="hidden w-full max-w-xs justify-self-end text-brass-lit lg:block" aria-hidden="true">
          <path d="M 10 20 H 150 A 25 25 0 0 1 150 70 H 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="10" cy="20" r="5" fill="currentColor" />
          <circle cx="10" cy="70" r="5" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}

/** U-turn mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: UturnCopy["sticky"]; message: string }) {
  return (
    <div
      data-page-sticky
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.6fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a href={`#${PLAN}`} className="flex items-center justify-center bg-brass px-3 text-center text-sm font-bold text-ink">
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
