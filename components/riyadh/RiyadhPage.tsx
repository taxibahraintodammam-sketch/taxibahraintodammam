import Link from "next/link";
import type { RiyadhCopy } from "@/content/riyadh";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { VehicleFit } from "@/components/riyadh/VehicleFit";
import { TripShape } from "@/components/riyadh/TripShape";
import { RiyadhRequest } from "@/components/riyadh/RiyadhRequest";

type Fare = { bhd: number; sar: number };

/** Real figures from content/routes.ts and content/fares.ts. */
export type RiyadhFigures = {
  km: number;
  time: string;
  fares: Record<"sedan" | "van" | "suv" | "luxury", Fare | undefined>;
  /** Published distances for context, closest first, Riyadh last. */
  compare: { name: string; km: number; time: string; slug: string }[];
};

/** Fill the {tokens} in the copy with the published figures. */
export function fillRiyadh<T>(copy: T, f: RiyadhFigures): T {
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
const REQUEST = "riyadh-request";
const CAUSEWAY_KM = 25; // stated across the site's route copy
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.7rem]";
const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";

export function RiyadhPage({ copy, locale, figures }: { copy: RiyadhCopy; locale: Locale; figures: RiyadhFigures }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  const wa = copy.hero.secondaryMessage;
  return (
    <>
      <Hero copy={copy.hero} />
      <Difference copy={copy.difference} p={p} />
      <Scale copy={copy.scale} km={figures.km} />
      <Time copy={copy.time} />
      <Vehicle copy={copy} figures={figures} p={p} />
      <TwoParts copy={copy.twoParts} />
      <Planning copy={copy.planning} />
      <Shape copy={copy} p={p} />
      <Airport copy={copy.airport} p={p} />
      <Who copy={copy.who} p={p} />
      <Compare copy={copy.compare} figures={figures} p={p} />
      <Pricing copy={copy} figures={figures} p={p} />
      <Request copy={copy} message={wa} p={p} />
      <Faqs copy={copy.faq} />
      <Final copy={copy.final} message={wa} />
      <StickyBar copy={copy.sticky} message={wa} />
    </>
  );
}

/* ------------------------------------------------------------------ */

/** A drawn dawn highway: no stock photo pretending to be the actual road. */
function RoadArt() {
  return (
    <svg viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="rd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d0d0d" />
          <stop offset="0.55" stopColor="#14213d" />
          <stop offset="0.8" stopColor="#6b4a2b" />
          <stop offset="1" stopColor="#d99a55" />
        </linearGradient>
        <linearGradient id="rd-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2a1c" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="rd-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#141414" />
        </linearGradient>
      </defs>
      <rect width="1440" height="330" fill="url(#rd-sky)" />
      <circle cx="1060" cy="330" r="60" fill="#f2b76b" opacity="0.35" />
      <rect y="328" width="1440" height="232" fill="url(#rd-ground)" />
      {/* Low dunes on the horizon */}
      <path d="M0 330 C 180 312 320 318 470 326 S 760 312 900 322 S 1240 310 1440 326 L1440 336 L0 336 Z" fill="#2b2016" opacity="0.8" />
      {/* The road to the vanishing point */}
      <path d="M 700 330 L 740 330 L 1150 560 L 290 560 Z" fill="url(#rd-road)" />
      <path d="M 700 330 L 290 560" stroke="#e8d3b0" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M 740 330 L 1150 560" stroke="#e8d3b0" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M 720 334 L 720 560" className="road-dash" stroke="#f5e6c8" strokeWidth="5" strokeDasharray="26 30" strokeOpacity="0.7" />
    </svg>
  );
}

function Hero({ copy }: { copy: RiyadhCopy["hero"] }) {
  const n = copy.stops.length;
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <RoadArt />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/90" />
      </div>

      <div className={`${wrap} flex min-h-[640px] flex-col pb-12 pt-12 lg:min-h-[720px] lg:pb-16 lg:pt-20`}>
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[2.4rem] font-bold leading-[1.04] sm:text-6xl lg:text-[4.6rem]">{copy.heading}</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/75">{copy.sub}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`#${REQUEST}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-brass px-7 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit">
            {copy.primary}
          </a>
          <a
            href={whatsappHref(copy.secondaryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/25 bg-ink/30 px-6 text-base font-semibold backdrop-blur transition-colors hover:border-white/60"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.secondary}
          </a>
        </div>

        {/* The long line: stops, a marker that takes its time, tags as it passes */}
        <div className="mt-auto pt-16">
          <div className="relative" dir="ltr">
            <div className="relative h-3">
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/15" aria-hidden="true" />
              <span className="route-draw absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-brass-lit" style={{ animationDuration: "6s", animationDelay: "0.3s", transformOrigin: "left center" }} aria-hidden="true" />
              {copy.stops.map((_, i) => (
                <span key={i} className="absolute top-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-ink" style={{ left: `${(i / (n - 1)) * 100}%` }} aria-hidden="true" />
              ))}
              <span className="riyadh-drive absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-lit shadow-[0_0_0_6px_rgba(96,165,250,0.25)]" aria-hidden="true" />
            </div>
            <ol className="mt-4 grid grid-cols-4 text-xs font-bold sm:text-base" aria-label={copy.stops.join(" → ")}>
              {copy.stops.map((s, i) => (
                <li key={s} className={i === 0 ? "text-left" : i === n - 1 ? "text-right" : "text-center"} dir="auto">
                  {s}
                  <span className="ledger-row mt-1 hidden text-xs font-semibold uppercase tracking-wider text-white/50 sm:block rtl:normal-case" style={{ animationDelay: `${600 + i * 1600}ms` }}>
                    {copy.tags[i]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8 flex flex-wrap items-end gap-x-12 gap-y-4 border-t border-white/10 pt-6">
            {copy.figures.map((f) => (
              <div key={f.label}>
                <p className={`text-2xl font-bold sm:text-4xl ${mono}`}>{f.value}</p>
                <p className="mt-1 text-sm text-white/55">{f.label}</p>
              </div>
            ))}
            <p className="text-xs text-white/40 sm:ms-auto">{copy.illustration}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Difference({ copy, p }: { copy: RiyadhCopy["difference"]; p: P }) {
  return (
    <section aria-labelledby="diff-heading" className="bg-white py-16 lg:py-28">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="diff-heading" className={`${h2} max-w-4xl lg:text-[3.1rem]`}>{copy.heading}</h2>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <p className="text-2xl font-semibold leading-snug text-ink lg:text-[1.75rem]">{copy.lead}</p>
            {copy.body.map((b, i) => (
              <p key={i} className="mt-5 text-ink/75 lg:text-[1.05rem] lg:leading-relaxed">
                {b}
                {i === 0 && (
                  <>
                    {" "}
                    <Link href={p("/taxi-bahrain-to-khobar")} className="font-semibold text-sea hover:underline">{copy.khobarLink} <DirArrow /></Link>
                  </>
                )}
              </p>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate">{copy.mattersLabel}</p>
            <ul className="mt-4 border-t-2 border-ink">
              {copy.matters.map((m, i) => (
                <Reveal as="li" key={m} delay={i * 70} className="flex items-center justify-between border-b border-ink/10 py-3.5 text-lg font-semibold">
                  {m}
                  <span className="text-sea" aria-hidden="true">↑</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Scale({ copy, km }: { copy: RiyadhCopy["scale"]; km: number }) {
  const causewayPct = (CAUSEWAY_KM / km) * 100;
  const bahrainPct = 3;
  return (
    <section aria-labelledby="scale-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h2 id="scale-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 text-white/60">{copy.intro}</p>

        {/* Geography left (Bahrain) to right (Riyadh) in both languages */}
        <figure className="mt-12" dir="ltr">
          <div className="flex h-4 overflow-hidden rounded-full">
            <span className="h-full bg-white/80" style={{ width: `${bahrainPct}%` }} />
            <span className="h-full bg-sea" style={{ width: `${causewayPct}%` }} />
            <span className="h-full flex-1 bg-brass-lit/70" />
          </div>
          <div className="relative mt-4 grid grid-cols-5 text-xs font-semibold sm:text-sm">
            {copy.segments.map((s, i) => (
              <span key={s} className={`${i === 0 ? "text-left" : i === 4 ? "text-right" : "text-center"} ${i === 1 ? "text-sea" : "text-white/80"}`} dir="auto">
                {s}
              </span>
            ))}
          </div>
          <figcaption className="mt-8 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2" dir="auto">
            <span className="flex items-center gap-2 text-white/75"><span className="h-2.5 w-2.5 rounded-full bg-sea" aria-hidden="true" />{copy.causewayNote}</span>
            <span className="flex items-center gap-2 text-white/75"><span className="h-2.5 w-2.5 rounded-full bg-brass-lit/70" aria-hidden="true" />{copy.restNote}</span>
          </figcaption>
        </figure>
        <p className="mt-8 max-w-3xl text-sm text-white/50">{copy.routeNote}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Time({ copy }: { copy: RiyadhCopy["time"] }) {
  return (
    <section aria-labelledby="time-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="time-heading" className={`${h2} max-w-3xl`}>{copy.heading}</h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-ink/10 rtl:md:divide-x-reverse">
          <Reveal className="md:pe-10">
            <p className="text-sm font-semibold text-slate">{copy.roadLabel}</p>
            <p className={`mt-2 text-6xl font-bold tracking-tight lg:text-7xl ${mono}`}>{copy.road}</p>
          </Reveal>
          <Reveal delay={150} className="md:ps-10">
            <p className="text-sm font-semibold text-slate">{copy.driveLabel}</p>
            <p className={`mt-2 text-6xl font-bold tracking-tight lg:text-7xl ${mono}`}>{copy.drive}</p>
            <p className="mt-2 font-semibold text-sea">+ {copy.plus}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="text-ink/80 lg:text-lg lg:leading-relaxed">{copy.body}</p>
            <p className="mt-8 text-3xl font-bold">{copy.buffer}</p>
            <p className="mt-2 text-slate">{copy.bufferNote}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate">{copy.partsLabel}</p>
            <ol className="mt-3">
              {copy.parts.map((pt, i) => (
                <Reveal as="li" key={pt} delay={i * 70} className="grid grid-cols-[2rem_1fr] items-center border-b border-ink/10 py-3">
                  <span className={`text-xs text-slate ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={i === 4 ? "font-bold" : ""}>{pt}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Vehicle({ copy, figures, p }: { copy: RiyadhCopy; figures: RiyadhFigures; p: P }) {
  const v = copy.vehicle;
  const l = copy.luggage;
  const fares = Object.fromEntries(Object.entries(figures.fares).map(([k, f]) => [k, f?.bhd]));
  return (
    <section aria-labelledby="vehicle-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} text-sea`}>{v.eyebrow}</p>
            <h2 id="vehicle-heading" className={h2}>{v.heading}</h2>
          </div>
          <p className="self-end text-ink/80 lg:text-lg">{v.body}</p>
        </div>
        <VehicleFit copy={v} fares={fares} />
        <Link href={p("/fleet")} className="mt-3 inline-block py-2 text-sm font-semibold text-sea hover:underline">{v.fleetLink} <DirArrow /></Link>

        {/* Luggage */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-ink/10 pt-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} text-sea`}>{l.eyebrow}</p>
            <h3 className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.3rem]">{l.heading}</h3>
            <p className="mt-4 text-ink/80">{l.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {l.items.map((it) => (
                <li key={it} className="rounded-md bg-white px-3 py-1.5 text-sm ring-1 ring-ink/10">{it}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate">{l.note}</p>
          </div>
          <div className="self-center">
            <p className="text-sm font-semibold text-slate">{l.compareLabel}</p>
            <div className="mt-4 flex flex-col gap-4">
              {l.compare.map((c, i) => (
                <Reveal key={i} delay={i * 150} className="rounded-xl bg-white p-5 ring-1 ring-ink/10">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-hidden="true">
                    <span className="flex gap-1">
                      {Array.from({ length: c.people }).map((_, j) => <span key={j} className="h-4 w-4 rounded-full bg-ink" />)}
                    </span>
                    <span className="flex items-end gap-1">
                      {Array.from({ length: c.bags }).map((_, j) => <span key={j} className="h-6 w-4 rounded-[3px] bg-sea" />)}
                    </span>
                  </div>
                  <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                    <span className={`text-sm text-slate ${mono}`}>{c.people} {l.peopleUnit} · {c.bags} {l.bagsUnit}</span>
                    <span className="font-bold">{c.verdict}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function TwoParts({ copy }: { copy: RiyadhCopy["twoParts"] }) {
  return (
    <section aria-labelledby="parts-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="parts-heading" className={h2}>{copy.heading}</h2>
        {/* Short part, long part: widths hint at the difference */}
        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-xl lg:grid-cols-[0.8fr_1.6fr]">
          {[copy.first, copy.second].map((part, i) => (
            <Reveal key={part.title} delay={i * 150} className={`p-6 sm:p-10 ${i === 0 ? "bg-sea text-white" : "bg-ink text-white"}`}>
              <p className={`text-sm font-semibold ${i === 0 ? "text-white/70" : "text-brass-lit"}`}>{part.label}</p>
              <h3 className="mt-2 text-2xl font-bold">{part.title}</h3>
              <p className="mt-3 text-white/80">{part.body}</p>
              {i === 1 && <span className="mt-8 block h-px bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0_18px,transparent_18px_30px)]" aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate">{copy.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Planning({ copy }: { copy: RiyadhCopy["planning"] }) {
  const ex = copy.example;
  return (
    <section aria-labelledby="planning-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="planning-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/75">{copy.intro}</p>

        {/* Three departure windows along a day arc */}
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {copy.windows.map((w, i) => (
            <Reveal as="li" key={w.key} delay={i * 120} className="rounded-xl bg-white p-6 ring-1 ring-ink/10">
              <svg viewBox="0 0 120 40" className="h-8 w-24 text-sea" aria-hidden="true">
                <path d="M4 36 Q 60 -8 116 36" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
                <circle cx={[18, 60, 102][i]} cy={[22, 8, 22][i]} r="6" fill={i === 2 ? "#0d0d0d" : "currentColor"} />
              </svg>
              <h3 className="mt-3 text-lg font-bold">{w.label}</h3>
              <p className="mt-1.5 text-[0.95rem] text-ink/75">{w.body}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-slate">{copy.basisLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {copy.basis.map((b) => (
                <li key={b} className="rounded-md bg-white px-3 py-1.5 text-sm ring-1 ring-ink/10">{b}</li>
              ))}
            </ul>
            <p className="mt-6 border-s-2 border-sea ps-4 text-[0.95rem] text-ink/85">{copy.advance}</p>
          </div>
          <figure className="rounded-xl bg-ink p-6 text-white sm:p-8">
            <p className={`text-[11px] font-semibold uppercase tracking-wide text-brass-lit ${mono} rtl:normal-case`}>{ex.tag}</p>
            <ol className="mt-4">
              {ex.steps.map((s, i) => (
                <li key={s} className="relative flex items-center gap-4 pb-3.5 last:pb-0">
                  {i < ex.steps.length - 1 && (
                    <span className={`absolute start-[5px] top-4 h-full w-0.5 ${i === 3 ? "bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.4)_0_4px,transparent_4px_8px)]" : "bg-white/15"}`} aria-hidden="true" />
                  )}
                  <span className={`relative z-10 h-3 w-3 shrink-0 rounded-full ${i === ex.steps.length - 1 ? "bg-brass-lit" : "bg-white"}`} aria-hidden="true" />
                  <span className={i === 4 ? "font-bold" : "text-white/85"}>{s}</span>
                </li>
              ))}
            </ol>
            <figcaption className="mt-5 border-t border-white/10 pt-4 text-sm text-white/60">{ex.note}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Shape({ copy, p }: { copy: RiyadhCopy; p: P }) {
  const s = copy.shape;
  const sd = copy.sameDay;
  const st = copy.stops;
  return (
    <section aria-labelledby="shape-heading" className="bg-ink py-16 text-white lg:py-28">
      <div className={wrap}>
        <p className={`${label} text-brass-lit`}>{s.eyebrow}</p>
        <h2 id="shape-heading" className={h2}>{s.heading}</h2>
        <TripShape copy={s} hourlyHref={p("/hourly-chauffeur-hire")} />

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-white/10 pt-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Same-day return */}
          <div>
            <p className={`${label} text-brass-lit`}>{sd.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-bold lg:text-[2rem]">{sd.heading}</h3>
            <p className="mt-4 text-white/75">{sd.body}</p>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {sd.consider.map((c) => (
                <li key={c} className="flex gap-2.5 border-b border-white/10 py-2.5 text-[0.95rem] text-white/85">
                  <span className="text-brass-lit" aria-hidden="true">?</span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-white/60">
              {sd.note}{" "}
              <Link href={p("/hourly-chauffeur-hire")} className="font-semibold text-brass-lit hover:underline">{s.link} <DirArrow /></Link>
            </p>
          </div>
          {/* Stops and breaks */}
          <div>
            <p className={`${label} text-brass-lit`}>{st.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-bold lg:text-[2rem]">{st.heading}</h3>
            <p className="mt-4 text-white/75">{st.body}</p>
            <ul className="mt-5 border-t border-white/10">
              {st.points.map((pt) => (
                <li key={pt} className="border-b border-white/10 py-3 text-[0.95rem] text-white/85">{pt}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-white/60">{st.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Airport({ copy, p }: { copy: RiyadhCopy["airport"]; p: P }) {
  return (
    <section aria-labelledby="ry-airport-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="ry-airport-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80 lg:text-lg">{copy.body}</p>
          <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            {copy.flow.map((f, i) => (
              <li key={f} className="flex items-center gap-2">
                <span className={`rounded-md px-3 py-1.5 font-semibold ${i === 0 || i === copy.flow.length - 1 ? "bg-ink text-white" : "bg-ink/[0.05]"}`}>{f}</span>
                {i < copy.flow.length - 1 && <span className="text-slate"><DirArrow /></span>}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm">
            <span className="font-bold">{copy.sendLabel}: </span>
            <span className="text-ink/75">{copy.send.join(" · ")}</span>
          </p>
          <Link href={p("/airport-transfers")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {copy.link} <DirArrow />
          </Link>
        </div>
        <div className="self-center rounded-xl bg-ink/[0.04] p-6 sm:p-8">
          <h3 className="text-xl font-bold">{copy.destHeading}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {copy.dest.map((d) => (
              <li key={d} className="rounded-md bg-white px-3 py-1.5 text-sm ring-1 ring-ink/10">{d}</li>
            ))}
          </ul>
          <p className="mt-5 text-[0.95rem] text-ink/80">{copy.destNote}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Who({ copy, p }: { copy: RiyadhCopy["who"]; p: P }) {
  return (
    <section aria-labelledby="who-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="who-heading" className={h2}>{copy.heading}</h2>
        <dl className="mt-10 grid grid-cols-1 gap-x-16 md:grid-cols-2">
          {copy.items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 2) * 100} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-ink/15 py-6">
              <span className={`pt-1 text-sm text-sea ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <dt className="text-lg font-bold">{it.title}</dt>
                <dd className="mt-1.5 text-ink/75">{it.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <p className="mt-6 text-sm text-slate">
          {copy.corporate}{" "}
          <Link href={p("/corporate-accounts")} className="font-semibold text-sea hover:underline">{copy.corporateLink} <DirArrow /></Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Compare({ copy, figures, p }: { copy: RiyadhCopy["compare"]; figures: RiyadhFigures; p: P }) {
  const max = Math.max(...figures.compare.map((c) => c.km));
  return (
    <section aria-labelledby="compare-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="compare-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80">{copy.body}</p>
          <p className="mt-4 text-sm text-slate">{copy.note}</p>
        </div>
        <ul className="flex flex-col gap-6 self-center">
          {figures.compare.map((c, i) => {
            const riyadh = i === figures.compare.length - 1;
            return (
              <li key={c.slug}>
                <div className="flex items-baseline justify-between gap-3">
                  {riyadh ? (
                    <span className="text-xl font-bold">{c.name}</span>
                  ) : (
                    <Link href={p(`/${c.slug}`)} className="font-semibold hover:text-sea">{c.name}</Link>
                  )}
                  <span className={`text-sm text-slate ${mono}`} dir="auto">{c.km} {copy.km} · {c.time}</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink/[0.06]" dir="ltr">
                  <Reveal className={`h-full rounded-full ${riyadh ? "bg-sea" : "bg-ink/35"}`}>
                    <span className="block h-2.5" style={{ width: `${(c.km / max) * 100}%` }} />
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pricing({ copy, figures, p }: { copy: RiyadhCopy; figures: RiyadhFigures; p: P }) {
  const pr = copy.pricing;
  const inc = copy.included;
  const doc = copy.documents;
  const order = ["sedan", "van", "suv", "luxury"] as const;
  return (
    <section aria-labelledby="ry-pricing-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-brass-lit`}>{pr.eyebrow}</p>
        <h2 id="ry-pricing-heading" className={h2}>{pr.heading}</h2>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 lg:grid-cols-4">
          {order.map((k) => {
            const f = figures.fares[k];
            if (!f) return null;
            return (
              <div key={k} className="bg-ink p-5 sm:p-7">
                <dt className="text-sm text-white/60">{pr.names[k]}</dt>
                <dd className={`mt-2 ${mono}`}>
                  <span className="text-xs text-white/50">{pr.from} </span>
                  <span className="text-2xl font-bold sm:text-3xl" dir="ltr">BHD {f.bhd}</span>
                  <span className="mt-1 block text-sm text-white/50" dir="ltr">SAR {f.sar.toLocaleString("en-US")}</span>
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="mt-5 max-w-3xl text-white/70">{pr.note}</p>

        {/* What makes up the fare */}
        <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm">
          {pr.formula.map((f, i) => (
            <Reveal as="li" key={f} delay={i * 90} className="flex items-center gap-2">
              <span className="rounded-md border border-white/20 px-3 py-1.5">{f}</span>
              <span className="text-white/40">{i < pr.formula.length - 1 ? "+" : "="}</span>
            </Reveal>
          ))}
          <Reveal as="li" delay={pr.formula.length * 90}>
            <span className="rounded-md bg-brass-lit px-3 py-1.5 font-bold text-ink">{pr.equals}</span>
          </Reveal>
        </ol>
        <Link href={p("/fares")} className="mt-4 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">
          {pr.allFares} <DirArrow />
        </Link>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 md:grid-cols-3 md:gap-8">
          <div>
            <h3 className="font-bold">{inc.heading}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {inc.yes.map((y) => (
                <li key={y} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass-lit text-[11px] text-ink" aria-hidden="true">✓</span>
                  {y}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white/70">{inc.passengerHeading}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {inc.passenger.map((n) => (
                <li key={n} className="flex gap-3 text-white/70">
                  <span aria-hidden="true">·</span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold">{doc.heading}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {doc.items.map((it) => (
                <li key={it} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-brass-lit text-[11px] text-brass-lit" aria-hidden="true">✓</span>
                  {it}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/55">{doc.note}</p>
            <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="mt-1 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">
              {doc.link} <DirArrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Request({ copy, message, p }: { copy: RiyadhCopy; message: string; p: P }) {
  const b = copy.booking;
  return (
    <section id={REQUEST} aria-labelledby="ry-request-heading" className="scroll-mt-20 bg-ink/[0.035] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16`}>
        <div className="rounded-xl bg-white p-6 shadow-elevation ring-1 ring-ink/10 sm:p-8">
          <p className={`${label} text-sea`}>{b.eyebrow}</p>
          <h2 id="ry-request-heading" className={h2}>{b.heading}</h2>
          <p className="mt-3 text-slate">{b.body}</p>
          <div className="mt-7">
            <RiyadhRequest copy={b} secondaryMessage={message} />
          </div>
          <Link href={p("/booking")} className="mt-4 inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {b.fullBooking} <DirArrow />
          </Link>
        </div>
        <aside className="self-center">
          <div className="rounded-2xl rounded-se-sm bg-[#dcf8c6] p-5 text-[0.95rem] leading-relaxed text-ink shadow-elevation rtl:rounded-se-2xl rtl:rounded-ss-sm">
            <p className={`mb-2 text-[10px] font-semibold uppercase tracking-wide text-ink/50 ${mono} rtl:normal-case`}>{b.exampleTag}</p>
            {b.example.map((l, i) => (
              <p key={i} className={i === 0 || i === b.example.length - 1 ? "" : "text-ink/70"}>{l}</p>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy }: { copy: RiyadhCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="ry-faq-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="ry-faq-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: RiyadhCopy["final"]; message: string }) {
  return (
    <section aria-labelledby="ry-final-heading" className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
      <div className="absolute inset-0 -z-10 opacity-60">
        <RoadArt />
        <div className="absolute inset-0 bg-ink/70" />
      </div>
      <div className={wrap}>
        <h2 id="ry-final-heading" className="max-w-2xl text-[2.2rem] font-bold leading-tight lg:text-[3.4rem]">{copy.heading}</h2>
        <p className="mt-5 max-w-xl text-lg text-white/75">{copy.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`#${REQUEST}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-brass px-7 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit">
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
        <p className={`mt-6 text-sm text-white/55 ${mono}`}>{copy.small}</p>
      </div>
    </section>
  );
}

/** Riyadh mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: RiyadhCopy["sticky"]; message: string }) {
  return (
    <div
      data-page-sticky
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.5fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a href={`#${REQUEST}`} className="flex items-center justify-center bg-brass px-3 text-center text-sm font-bold text-ink">
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
