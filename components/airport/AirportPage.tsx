import Link from "next/link";
import type { AirportCopy } from "@/content/airport";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { FlightWidget } from "@/components/airport/FlightWidget";
import { VehicleFit } from "@/components/airport/VehicleFit";

type P = (path: string) => string;
export type AirportFigures = { time: string; fare: number; fareSar: number };

const WIDGET = "airport-fare";
const mono = "font-[family-name:var(--font-mono)]";
const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";

const fill = (t: string, f: AirportFigures) => t.replace("{time}", f.time).replace("{fare}", String(f.fare)).replace("{fareSar}", String(f.fareSar));

export function AirportPage({ copy, locale, figures }: { copy: AirportCopy; locale: Locale; figures: AirportFigures }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  return (
    <>
      <Hero copy={copy} />
      <Landing copy={copy.landing} />
      <Meeting copy={copy.meeting} />
      <Tracking copy={copy.tracking} />
      <Airports copy={copy.airports} />
      <Corridor copy={copy.corridor} />
      <Timing copy={copy.timing} figures={figures} />
      <Situations copy={copy.situations} />
      <Luggage copy={copy.luggage} p={p} />
      <Split copy={copy.split} />
      <Night copy={copy.night} />
      <Hotels copy={copy.hotels} />
      <Compare copy={copy.compare} />
      <Details copy={copy.details} example={copy.example} />
      <Pricing copy={copy.pricing} figures={figures} p={p} />
      <Documents copy={copy.documents} />
      <Faqs copy={copy.faq} p={p} />
      <Final copy={copy.final} message={copy.hero.secondaryMessage} />
      <StickyBar copy={copy.sticky} message={copy.hero.secondaryMessage} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: AirportCopy }) {
  const h = copy.hero;
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Faint runway centreline: the only decoration, and it's on-topic */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 hidden h-1 lg:block" aria-hidden="true">
        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0_48px,transparent_48px_96px)]" />
      </div>
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 pb-14 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-24 lg:pt-16">
        <div>
          <p className={`${eyebrow} text-brass-lit`}>{h.eyebrow}</p>
          <h1 className="mt-4 text-[2.2rem] font-bold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">{h.heading}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">{h.sub}</p>
          <p className="mt-6 border-s-2 border-brass-lit ps-4 text-base font-semibold text-white">{h.promise}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`#${WIDGET}`} className="flex h-12 items-center justify-center rounded-input bg-brass px-7 text-base font-bold text-ink transition-colors hover:bg-brass-lit">
              {h.primary}
            </a>
            <a
              href={whatsappHref(h.secondaryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-input border border-white/25 px-6 text-base font-semibold hover:border-white/60"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-5 w-5" color="currentColor" />
              {h.secondary}
            </a>
          </div>
        </div>
        <FlightWidget id={WIDGET} copy={copy.widget} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Landing({ copy }: { copy: AirportCopy["landing"] }) {
  const last = copy.steps.length - 1;
  return (
    <section aria-labelledby="landing-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
            <h2 id="landing-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
          </div>
          <p className="text-slate lg:text-lg">{copy.intro}</p>
        </div>

        {/* Terminal → address: one line, gate-style markers */}
        <ol className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-4">
          <span className="absolute bottom-3 start-[15px] top-3 w-0.5 bg-ink/10 md:bottom-auto md:end-0 md:start-0 md:top-[15px] md:h-0.5 md:w-auto" aria-hidden="true" />
          {copy.steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[2rem_1fr] gap-4 md:block">
              <span
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-md text-xs ${mono} ${
                  i === last ? "bg-sea text-white" : i === 0 ? "bg-ink text-white" : "border border-ink/20 bg-white text-ink/70"
                }`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-5">
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-slate">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Meeting({ copy }: { copy: AirportCopy["meeting"] }) {
  return (
    <section aria-labelledby="meeting-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="meeting-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
          <p className="mt-3 text-slate">{copy.intro}</p>
          <ol className="mt-8 flex flex-col gap-5">
            {copy.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className={`pt-0.5 text-sm text-sea ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-0.5 text-[0.95rem] text-slate">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* The thing you'll actually look for: a name board */}
        <figure>
          <div className="mx-auto max-w-sm rotate-[-2deg] rounded-md border border-ink/10 bg-white p-6 text-center shadow-elevation">
            <p className={`text-[11px] uppercase tracking-[0.2em] text-slate ${mono}`}>{copy.placardLabel}</p>
            <p className="mt-4 border-y-2 border-ink py-5 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-wide">{copy.placardName}</p>
            <p className="mt-3 text-xs text-slate" dir="ltr">{copy.placardNote}</p>
          </div>
          <figcaption className="mx-auto mt-8 max-w-sm text-sm text-slate">{copy.terminalNote}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Tracking({ copy }: { copy: AirportCopy["tracking"] }) {
  return (
    <section aria-labelledby="tracking-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-brass-lit`}>{copy.eyebrow}</p>
          <h2 id="tracking-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
          {copy.body.map((b) => (
            <p key={b} className="mt-4 text-white/75">{b}</p>
          ))}
          <p className="mt-6 border-s-2 border-brass-lit/60 ps-4 text-sm text-white/65">{copy.waiting}</p>
        </div>

        {/* A flight-status board, clearly labelled as illustrative */}
        <figure>
          <div className="overflow-hidden rounded-lg border border-white/15 bg-black">
            <p className={`border-b border-white/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-brass-lit ${mono} rtl:tracking-normal`}>{copy.boardLabel}</p>
            <dl className={mono}>
              {copy.board.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 last:border-b-0">
                  <dt className="text-sm text-white/60">{row.label}</dt>
                  <dd className={`text-lg ${row.tone === "late" ? "text-amber-300" : row.tone === "ok" ? "text-emerald-300" : "text-white"}`}>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figcaption className="mt-2 text-xs text-white/40">{copy.illustration}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Airports({ copy }: { copy: AirportCopy["airports"] }) {
  return (
    <section aria-labelledby="airports-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="airports-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.intro}</p>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {copy.boards.map((b) => (
            <article key={b.code} className="overflow-hidden rounded-lg bg-ink text-white">
              <header className="flex items-end justify-between gap-4 border-b border-white/10 px-6 py-5">
                <div>
                  <p className="text-sm text-white/60">{b.country}</p>
                  <h3 className="text-lg font-bold">{b.name}</h3>
                </div>
                <p className={`text-4xl font-bold text-brass-lit ${mono}`} dir="ltr">{b.code}</p>
              </header>
              <ul className={mono}>
                {b.rows.map((r) => (
                  <li key={r.to} className="border-b border-white/10 last:border-b-0">
                    {r.href ? (
                      <Link href={withSlash(r.href)} className="flex min-h-12 items-center justify-between gap-3 px-6 py-3 text-[0.95rem] transition-colors hover:bg-white/[0.06]">
                        <span dir="auto"><span className="text-white/40" dir="ltr">{b.code} → </span>{r.to}</span>
                        <DirArrow />
                      </Link>
                    ) : (
                      <p className="flex min-h-12 items-center px-6 py-3 text-[0.95rem] text-white/65">
                        <span dir="auto"><span className="text-white/40" dir="ltr">{b.code} → </span>{r.to}</span>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate">{copy.other}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Corridor({ copy }: { copy: AirportCopy["corridor"] }) {
  const border = new Set([2, 4]);
  return (
    <section aria-labelledby="corridor-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="corridor-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.body}</p>

        {/* Corridor as a strip: border posts stand out from the road */}
        <ol className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {copy.stops.map((s, i) => (
            <li
              key={s}
              className={`flex min-h-20 items-end rounded-md p-4 text-sm font-semibold ${
                border.has(i) ? "bg-ink text-white" : i === 3 ? "bg-sea text-white" : "bg-white text-ink"
              }`}
            >
              <span>
                <span className={`block text-[11px] opacity-60 ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                {s}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate">{copy.reverse}</p>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { h: copy.driverHeading, items: copy.driver },
            { h: copy.youHeading, items: copy.you },
          ].map((col) => (
            <div key={col.h} className="rounded-lg bg-white p-6">
              <h3 className="font-bold">{col.h}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[0.95rem] text-ink/85">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Timing({ copy, figures }: { copy: AirportCopy["timing"]; figures: AirportFigures }) {
  // Widths are proportions for the picture, not measured minutes.
  const widths = [9, 8, 18, 12, 20, 12, 21];
  const driving = new Set([2, 4, 6]);
  return (
    <section aria-labelledby="timing-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="timing-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate lg:text-lg">{copy.body}</p>

        <div className="mt-10 space-y-5" aria-hidden="true">
          <div>
            <p className="text-sm font-semibold">{copy.drivingLabel}</p>
            <div className="mt-2 flex h-9 gap-0.5 overflow-hidden rounded-md">
              {widths.map((w, i) => (
                <span key={i} style={{ width: `${w}%` }} className={driving.has(i) ? "bg-sea" : "bg-transparent"} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">{copy.totalLabel}</p>
            <div className="mt-2 flex h-9 gap-0.5 overflow-hidden rounded-md">
              {widths.map((w, i) => (
                <span key={i} style={{ width: `${w}%` }} className={`flex items-center justify-center overflow-hidden text-[10px] font-semibold ${driving.has(i) ? "bg-sea text-white" : "bg-ink/80 text-white"}`}>
                  <span className="hidden truncate px-1 md:inline">{copy.segments[i]}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Screen-reader version of the bars */}
        <p className="sr-only">{copy.segments.join(", ")}</p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-4">
            <p className="text-lg">{fill(copy.typical, figures)}</p>
            <p className="rounded-lg bg-ink/[0.04] p-4 text-[0.95rem] text-ink/85">{copy.departure}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide rtl:normal-case">{copy.factorsHeading}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {copy.factors.map((f) => (
                <li key={f} className="rounded-md border border-ink/15 px-3 py-1.5 text-sm">{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Situations({ copy }: { copy: AirportCopy["situations"] }) {
  return (
    <section aria-labelledby="situations-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="situations-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {copy.items.map((s, i) => (
            <article key={s.title} className="border-t border-ink/15 py-7">
              <p className={`text-xs text-sea ${mono}`}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-[0.97rem] text-slate">{s.body}</p>
              {s.link && (
                <Link href={withSlash(s.link.href)} className="mt-2 inline-block py-1 text-sm font-semibold text-sea hover:underline">
                  {s.link.label} <DirArrow />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Luggage({ copy, p }: { copy: AirportCopy["luggage"]; p: P }) {
  return (
    <section aria-labelledby="luggage-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="luggage-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
          <p className="mt-4 text-slate">{copy.body}</p>
          <Link href={p("/fleet")} className="mt-4 inline-block py-1 text-sm font-semibold text-sea hover:underline">
            {copy.fleetLink} <DirArrow />
          </Link>
        </div>
        <VehicleFit copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Split({ copy }: { copy: AirportCopy["split"] }) {
  const cols = [
    { data: copy.arriving, arrow: "↓", dark: false },
    { data: copy.departing, arrow: "↑", dark: true },
  ];
  return (
    <section aria-labelledby="split-heading" className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="split-heading" className="mt-3 max-w-3xl text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.body}</p>
        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-lg border border-ink/10 md:grid-cols-2">
          {cols.map(({ data, arrow, dark }) => (
            <div key={data.title} className={`p-6 sm:p-8 ${dark ? "bg-ink text-white" : "bg-white"}`}>
              <h3 className="flex items-center gap-3 text-2xl font-bold">
                <span className={`flex h-9 w-9 items-center justify-center rounded-md text-lg ${dark ? "bg-white/10" : "bg-ink/[0.06]"}`} aria-hidden="true">{arrow}</span>
                {data.title}
              </h3>
              <ol className="mt-5 flex flex-col gap-2">
                {data.items.map((it, i) => (
                  <li key={it} className="flex gap-3 text-[0.95rem]">
                    <span className={`w-5 shrink-0 text-sm ${mono} ${dark ? "text-brass-lit" : "text-sea"}`}>{i + 1}</span>
                    {it}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Night({ copy }: { copy: AirportCopy["night"] }) {
  return (
    <section className="bg-[#070b14] py-16 text-white lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <h2 className="text-[1.9rem] font-bold leading-tight lg:text-[2.8rem]">{copy.heading}</h2>
          <p className="mt-4 text-white/75 lg:text-lg">{copy.body}</p>
          <p className="mt-6 text-sm text-white/55">{copy.advice}</p>
        </div>
        <ul className={`flex flex-col divide-y divide-white/10 border-y border-white/10 ${mono}`}>
          {copy.moments.map((m, i) => (
            <li key={m} className="flex items-center justify-between gap-4 py-3.5">
              <span className="text-white/85">{m}</span>
              <span className="text-xs text-brass-lit" aria-hidden="true">{["02:00", "05:30", "23:45", "SAT", "EID"][i]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Hotels({ copy }: { copy: AirportCopy["hotels"] }) {
  return (
    <section aria-labelledby="hotels-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="hotels-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
          <p className="mt-4 text-slate">{copy.body}</p>
        </div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {copy.journeys.map((j) => (
            <li key={j.label}>
              {j.href ? (
                <Link href={withSlash(j.href)} className="flex min-h-12 items-center justify-between gap-3 py-3 font-medium hover:text-sea">
                  <span dir="auto">{j.label}</span>
                  <DirArrow />
                </Link>
              ) : (
                <p className="flex min-h-12 items-center py-3 font-medium text-ink/70" dir="auto">{j.label}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Compare({ copy }: { copy: AirportCopy["compare"] }) {
  return (
    <section aria-labelledby="compare-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="compare-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.body}</p>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {[copy.booked, copy.later].map((col) => (
            <div key={col.title}>
              <h3 className="border-b-2 border-ink pb-3 text-lg font-bold">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.items.map((it) => (
                  <li key={it} className="text-[0.95rem] text-ink/85">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-slate">{copy.fair}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Details({ copy, example }: { copy: AirportCopy["details"]; example: AirportCopy["example"] }) {
  return (
    <section aria-labelledby="details-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Boarding-pass style checklist */}
        <div className="overflow-hidden rounded-[20px] bg-ink text-white">
          <div className="px-6 pb-5 pt-6 sm:px-8">
            <p className={`${eyebrow} text-brass-lit`}>{copy.eyebrow}</p>
            <h2 id="details-heading" className="mt-2 text-[1.9rem] font-bold leading-tight">{copy.heading}</h2>
          </div>
          <div className="mx-6 border-t-2 border-dashed border-white/15 sm:mx-8" aria-hidden="true" />
          <ol className={`grid grid-cols-1 gap-x-6 gap-y-2.5 px-6 py-6 sm:grid-cols-2 sm:px-8 ${mono}`}>
            {copy.items.map((it, i) => (
              <li key={it} className="flex gap-3 text-sm">
                <span className="w-5 shrink-0 text-brass-lit">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-[family-name:var(--font-body)] text-white/90">{it}</span>
              </li>
            ))}
          </ol>
          <div className="px-6 pb-7 sm:px-8">
            <a
              href={whatsappHref(copy.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-input bg-brass px-6 text-base font-bold text-ink hover:bg-brass-lit"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-5 w-5" color="currentColor" />
              {copy.cta}
            </a>
            <p className="mt-2 text-center text-xs text-white/55">{copy.ctaNote}</p>
          </div>
        </div>

        {/* Worked example */}
        <article aria-labelledby="example-heading">
          <p className="inline-block rounded-md bg-ink/[0.06] px-2 py-0.5 text-xs font-semibold text-slate">{example.tag}</p>
          <h2 id="example-heading" className="mt-3 text-2xl font-bold lg:text-[1.9rem]">{example.heading}</h2>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-lg font-semibold">
            <span>{example.from}</span>
            <span className="text-sea"><DirArrow /></span>
            <span>{example.to}</span>
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-ink/10 ring-1 ring-ink/10">
            {example.facts.map((f) => (
              <div key={f.label} className="bg-white p-4">
                <dt className="text-xs text-slate">{f.label}</dt>
                <dd className="mt-0.5 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 flex flex-col gap-3">
            {example.reasoning.map((r) => (
              <li key={r} className="border-s-2 border-sea/40 ps-4 text-[0.95rem] text-ink/85">{r}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pricing({ copy, figures, p }: { copy: AirportCopy["pricing"]; figures: AirportFigures; p: P }) {
  return (
    <section aria-labelledby="airport-pricing-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="airport-pricing-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.body}</p>
          <p className="mt-4 text-[0.95rem] text-ink/85">{fill(copy.published, figures)}</p>
          <Link href={p("/fares")} className="mt-3 inline-block py-1 text-sm font-semibold text-sea hover:underline">
            {copy.faresLink} <DirArrow />
          </Link>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide rtl:normal-case">{copy.factorsHeading}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {copy.factors.map((f) => (
              <li key={f} className="rounded-md border border-ink/15 bg-white px-3 py-2 text-sm">{f}</li>
            ))}
          </ul>
          <a href={`#${WIDGET}`} className="mt-7 inline-flex h-12 items-center justify-center rounded-input bg-ink px-6 text-sm font-bold text-white hover:bg-ink-soft">
            {copy.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Documents({ copy }: { copy: AirportCopy["documents"] }) {
  return (
    <section aria-labelledby="documents-heading" className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="documents-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
          <p className="mt-4 text-sm text-slate">{copy.responsibility}</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            {copy.links.map((l) => (
              <Link key={l.href} href={withSlash(l.href)} className="py-1 text-sea hover:underline">
                {l.label} <DirArrow />
              </Link>
            ))}
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-3 self-center sm:grid-cols-2">
          {copy.items.map((it) => (
            <li key={it} className="flex gap-3 rounded-lg border border-ink/10 p-4 text-[0.95rem]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-sea" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {it}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy, p }: { copy: AirportCopy["faq"]; p: P }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="airport-faq-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
            <h2 id="airport-faq-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
          </div>
          <Link href={p("/faqs")} className="py-1 text-sm font-semibold text-sea hover:underline">
            {copy.allFaqs} <DirArrow />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: AirportCopy["final"]; message: string }) {
  return (
    <section className="bg-ink py-16 text-white lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <h2 className="text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
          <p className="mt-4 max-w-xl text-white/75 lg:text-lg">{copy.body}</p>
          <ul className={`mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60 ${mono}`}>
            {copy.facts.map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <a href={`#${WIDGET}`} className="flex h-12 items-center justify-center rounded-input bg-brass px-7 text-base font-bold text-ink hover:bg-brass-lit">
            {copy.primary}
          </a>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-input border border-white/25 px-6 text-base font-semibold hover:border-white/60"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Airport-specific mobile bar. It replaces the site-wide bar on this page
 * (see the :has() rule in globals.css) instead of stacking a second one,
 * and uses the same height so the footer clearance still fits.
 */
function StickyBar({ copy, message }: { copy: AirportCopy["sticky"]; message: string }) {
  return (
    <div
      data-page-sticky
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.4fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a href={`#${WIDGET}`} className="flex items-center justify-center bg-brass text-sm font-bold text-ink">
        {copy.fare}
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
