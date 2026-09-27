import Image from "next/image";
import Link from "next/link";
import type { BahDmmCopy } from "@/content/bah-dammam";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { ArrivalPlanner, ArrivalStages, StatusBoard, SpaceTool, DestinationPicker } from "@/components/bah-dammam/BahWidgets";

type Fare = { bhd: number; sar: number };

/** Real figures from content/routes.ts and content/fares.ts. */
export type BahDmmFigures = {
  km: number;
  time: string;
  fares: Record<"sedan" | "van" | "suv" | "luxury", Fare | undefined>;
};

/** Fill {tokens} in the copy with the published figures. */
export function fillBahDmm<T>(copy: T, f: BahDmmFigures): T {
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
const PLAN = "plan-arrival";
const AMBER = "text-[#f5c451]";
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.7rem]";
const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";

export function BahDammamPage({ copy, locale, figures }: { copy: BahDmmCopy; locale: Locale; figures: BahDmmFigures }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  const wa = copy.hero.secondaryMessage;
  const fares = { sedan: figures.fares.sedan?.bhd, van: figures.fares.van?.bhd, suv: figures.fares.suv?.bhd, luxury: figures.fares.luxury?.bhd };
  return (
    <>
      <Hero copy={copy} />
      <Halfway copy={copy.halfway} />
      <Stages copy={copy.stages} />
      <Landing copy={copy} />
      <Status copy={copy.status} />
      <Distance copy={copy} />
      <Space copy={copy.space} fares={fares} p={p} />
      <OneCar copy={copy.oneCar} p={p} />
      <Destination copy={copy.destination} />
      <Who copy={copy.who} p={p} />
      <Roles copy={copy} p={p} />
      <Pricing copy={copy} figures={figures} p={p} />
      <Flow copy={copy.flow} p={p} />
      <Faqs copy={copy.faq} />
      <Final copy={copy.final} message={wa} />
      <StickyBar copy={copy.sticky} message={wa} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: BahDmmCopy }) {
  const h = copy.hero;
  return (
    <section className="bg-[#111] text-white">
      <div className={`${wrap} grid grid-cols-1 gap-10 pb-14 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-20 lg:pt-16`}>
        <div>
          <p className={`${label} ${AMBER}`}>{h.eyebrow}</p>
          <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.05] sm:text-[3.3rem] lg:text-[3.9rem]">{h.heading}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/70">{h.sub}</p>

          {/* Arrivals board */}
          <figure className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-black/40">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <p className={`text-sm font-bold uppercase tracking-widest ${AMBER} ${mono} rtl:normal-case`}>{h.board.title}</p>
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5c451]" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </span>
            </div>
            <table className={`w-full text-start text-sm ${mono}`}>
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-white/40 rtl:normal-case">
                  {h.board.cols.map((c) => <th key={c} scope="col" className="px-4 pb-1 pt-3 text-start font-semibold">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {h.board.rows.map((r, i) => (
                  <tr key={r.from} className="ledger-row border-t border-white/[0.06]" style={{ animationDelay: `${300 + i * 350}ms` }}>
                    <td className="px-4 py-2.5 text-white/85">{r.from}</td>
                    <td className={`px-4 py-2.5 font-bold ${i === 0 ? "text-success" : AMBER}`}>{r.status}</td>
                    <td className="px-4 py-2.5 font-bold text-white">{r.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <figcaption className="border-t border-white/10 px-4 py-2 text-[11px] text-white/35">{h.board.note}</figcaption>
          </figure>

          {/* Flight becomes road: a dashed air leg, then the drive */}
          <div className="mt-8" dir="ltr">
            <div className="relative h-10">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-y-0 left-0 w-[18%]" aria-hidden="true">
                <path d="M0 18 Q 50 -6 100 10" fill="none" stroke="#f5c451" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="absolute left-[18%] right-0 top-1/2 h-0.5 bg-white/15" aria-hidden="true" />
              <span className="absolute left-[46%] right-[30%] top-1/2 h-1.5 -translate-y-[2px] rounded-full bg-sea/70" aria-hidden="true" />
              <span className="absolute left-[18%] right-0 top-1/2 h-0.5">
                <span className="khobar-drive absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5c451] shadow-[0_0_0_5px_rgba(245,196,81,0.2)]" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-2 grid grid-cols-[18%_1fr_1fr_auto] text-xs font-bold sm:text-sm">
              <span />
              <span dir="auto">{h.route[0]}</span>
              <span className="text-center text-sea" dir="auto">{h.route[1]}</span>
              <span dir="auto">{h.route[2]}</span>
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-white/40 rtl:normal-case">{h.planned}</p>
          </div>
        </div>

        <div id={PLAN} className="scroll-mt-24 self-start rounded-xl bg-white p-5 text-ink shadow-elevation sm:p-7">
          <h2 className="text-xl font-bold">{copy.planner.heading}</h2>
          <div className="mt-4">
            <ArrivalPlanner copy={copy.planner} />
          </div>
          <a
            href={whatsappHref(h.secondaryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 py-2 text-sm font-semibold text-sea hover:underline"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-4 w-4" color="currentColor" />
            {h.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Halfway({ copy }: { copy: BahDmmCopy["halfway"] }) {
  return (
    <section aria-labelledby="half-heading" className="bg-white py-16 lg:py-28">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className={`${label} text-sea`}>{copy.eyebrow}</p>
            <h2 id="half-heading" className={`${h2} lg:text-[3.1rem]`}>{copy.heading}</h2>
          </div>
          <div className="flex flex-col gap-4 text-lg leading-relaxed">
            <p className="text-ink/80">{copy.body[0]}</p>
            <p className="font-semibold text-ink">{copy.body[1]}</p>
          </div>
        </div>

        {/* Landing | continuing, joined by the route */}
        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-xl ring-1 ring-ink/10 md:grid-cols-[1fr_auto_1fr]">
          <Reveal className="reveal-xl bg-ink/[0.03] p-6 sm:p-8">
            <p className="text-lg font-bold">{copy.left.label}</p>
            <ol className="mt-4 flex flex-col gap-2">
              {copy.left.items.map((it, i) => (
                <li key={it} className="flex items-center gap-3 text-ink/80">
                  <span className={`text-xs text-sea ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                  {it}
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="flex items-center justify-center bg-sea px-4 py-3 text-white md:py-0" aria-hidden="true">
            <span className="text-2xl md:hidden">↓</span>
            <span className="hidden text-2xl md:block"><DirArrow /></span>
          </div>
          <Reveal className="reveal-x bg-ink p-6 text-white sm:p-8">
            <p className="text-lg font-bold">{copy.right.label}</p>
            <ol className="mt-4 flex flex-col gap-2">
              {copy.right.items.map((it, i) => (
                <li key={it} className="flex items-center gap-3 text-white/85">
                  <span className={`text-xs ${AMBER} ${mono}`}>{String(i + 5).padStart(2, "0")}</span>
                  {it}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="mt-12 max-w-3xl">
          <h3 className="text-xl font-bold">{copy.why.heading}</h3>
          <p className="mt-2 text-ink/75">{copy.why.body}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Stages({ copy }: { copy: BahDmmCopy["stages"] }) {
  return (
    <section aria-labelledby="stages-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="stages-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.intro}</p>
        <ArrivalStages copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Landing({ copy }: { copy: BahDmmCopy }) {
  const l = copy.landing;
  const m = copy.meet;
  return (
    <section aria-labelledby="landing-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className={`${label} text-sea`}>{l.eyebrow}</p>
            <h2 id="landing-heading" className={h2}>{l.heading}</h2>
            <p className="mt-6 text-6xl font-bold text-sea">{l.answer}</p>
            <p className="mt-4 text-ink/80 lg:text-lg lg:leading-relaxed">{l.body}</p>
          </div>
          {/* Two phases: the airport part is yours, then the car */}
          <div className="self-center">
            <p className="text-sm font-bold text-sea">{l.youLabel}</p>
            <ol className="mt-2 flex flex-wrap gap-1.5">
              {l.you.map((s) => <li key={s} className="rounded-md border border-dashed border-sea/50 px-3 py-1.5 text-sm">{s}</li>)}
            </ol>
            <p className="mt-6 text-sm font-bold">{l.carLabel}</p>
            <ol className="mt-2 flex flex-wrap gap-1.5">
              {l.car.map((s, i) => <Reveal as="li" key={s} delay={i * 60} className="rounded-md bg-ink px-3 py-1.5 text-sm text-white">{s}</Reveal>)}
            </ol>
          </div>
        </div>

        {/* Meet and greet, with the one real photo of a pickup */}
        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="relative aspect-[16/11] overflow-hidden rounded-xl">
            <Image src="/hero/slide-chauffeur.webp" alt={m.imageAlt} fill sizes="(min-width: 1024px) 560px, 100vw" quality={70} className="object-cover object-[60%_center]" />
          </div>
          <div>
            <p className={`${label} text-sea`}>{m.eyebrow}</p>
            <h2 className={h2}>{m.heading}</h2>
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {m.points.map((pt, i) => (
                <Reveal key={pt.title} delay={(i % 2) * 90}>
                  <dt className="font-bold">{pt.title}</dt>
                  <dd className="mt-1 text-[0.95rem] text-ink/75">{pt.body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Status({ copy }: { copy: BahDmmCopy["status"] }) {
  return (
    <section aria-labelledby="status-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="status-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 text-slate">{copy.intro}</p>
        <StatusBoard copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Distance({ copy }: { copy: BahDmmCopy }) {
  const d = copy.distance;
  const c = copy.causeway;
  return (
    <section aria-labelledby="distance-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{d.eyebrow}</p>
        <h2 id="distance-heading" className={h2}>{d.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-ink/10 rtl:md:divide-x-reverse">
          <Reveal className="md:pe-10">
            <p className={`text-6xl font-bold tracking-tight lg:text-7xl ${mono}`}>{d.km}</p>
            <p className="mt-2 text-slate">{d.kmLabel}</p>
          </Reveal>
          <Reveal delay={150} className="md:ps-10">
            <p className={`text-6xl font-bold tracking-tight lg:text-7xl ${mono}`}>{d.time}</p>
            <p className="mt-2 font-semibold text-sea">{d.timeLabel}</p>
          </Reveal>
        </div>
        <ol className="mt-10 flex flex-col gap-1 sm:flex-row" dir="ltr">
          {d.parts.map((pt, i) => (
            <Reveal as="li" key={pt} delay={i * 70} className={`flex items-center rounded-md px-3 py-3 text-sm font-semibold sm:flex-1 sm:justify-center sm:text-center ${i === 2 ? "bg-sea text-white" : i === 1 || i === 3 ? "bg-ink text-white" : "bg-ink/[0.05]"}`}>
              <span dir="auto">{pt}</span>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-ink/80 lg:text-lg">{d.body}</p>
      </div>

      {/* The causeway */}
      <div className="relative isolate mt-20 overflow-hidden bg-ink py-16 text-white lg:py-24">
        <Image src="/hero/slide-causeway.webp" alt={c.imageAlt} fill sizes="100vw" quality={70} className="-z-10 object-cover object-[50%_60%] opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30 rtl:bg-gradient-to-l" aria-hidden="true" />
        <div className={wrap}>
          <p className={`${label} ${AMBER}`}>{c.eyebrow}</p>
          <h2 className={`${h2} max-w-2xl`}>{c.heading}</h2>
          <p className="mt-4 max-w-xl text-white/80 lg:text-lg">{c.body}</p>
          <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold">
            {c.flow.map((f, i) => (
              <li key={f} className="flex items-center gap-2">
                <span className={`rounded-md px-3 py-1.5 ${i === 1 ? "bg-sea" : "bg-white/15 backdrop-blur"}`}>{f}</span>
                {i < c.flow.length - 1 && <span className={AMBER}><DirArrow /></span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Space({ copy, fares, p }: { copy: BahDmmCopy["space"]; fares: Record<string, number | undefined>; p: P }) {
  return (
    <section aria-labelledby="space-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="space-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/75">{copy.intro}</p>
        <SpaceTool copy={copy} fares={fares} />
        <Link href={p("/fleet")} className="mt-4 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.fleetLink} <DirArrow /></Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function OneCar({ copy, p }: { copy: BahDmmCopy["oneCar"]; p: P }) {
  return (
    <section aria-labelledby="onecar-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="onecar-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-dashed border-ink/25 p-6 sm:p-8">
            <p className="font-bold text-slate">{copy.without.label}</p>
            <ol className="mt-4 flex flex-col gap-2">
              {copy.without.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-ink/60" style={{ marginInlineStart: `${[0, 12, 4, 16, 8][i]}px` }}>
                  <span className="h-2 w-2 rounded-full bg-ink/25" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl bg-ink p-6 text-white sm:p-8">
            <p className="font-bold">{copy.with.label}</p>
            <ol className="mt-6 flex flex-wrap items-center gap-2">
              {copy.with.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="rounded-md bg-white px-3 py-2 text-sm font-bold text-ink">{s}</span>
                  {i < copy.with.steps.length - 1 && <span className="h-px w-8 bg-[#f5c451]" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h3 className="mt-16 text-2xl font-bold">{copy.compareHeading}</h3>
        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-ink/10 ring-1 ring-ink/10 md:grid-cols-2">
          {[copy.normal, copy.thisRoute].map((c, i) => (
            <div key={c.label} className={`p-6 sm:p-8 ${i === 1 ? "bg-sea/[0.07]" : "bg-white"}`}>
              <p className="font-bold">{c.label}</p>
              <ol className={`mt-3 flex flex-wrap items-center gap-1.5 text-sm ${mono}`}>
                {c.route.map((r, j) => (
                  <li key={r} className="flex items-center gap-1.5">
                    <span className={j === c.route.length - 1 ? "font-bold text-sea" : ""}>{r}</span>
                    {j < c.route.length - 1 && <span className="text-slate"><DirArrow /></span>}
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-ink/75">{c.body}</p>
              {i === 0 && (
                <Link href={p("/airport-transfers")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.airportLink} <DirArrow /></Link>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate">
          {copy.khobar}{" "}
          <Link href={p("/taxi-bahrain-to-khobar")} className="font-semibold text-sea hover:underline">{copy.khobarLink} <DirArrow /></Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Destination({ copy }: { copy: BahDmmCopy["destination"] }) {
  return (
    <section aria-labelledby="dest-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="dest-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 text-ink/75">{copy.intro}</p>
        <DestinationPicker copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Who({ copy, p }: { copy: BahDmmCopy["who"]; p: P }) {
  const b = copy.business;
  const f = copy.family;
  return (
    <section aria-label={`${b.heading} / ${f.heading}`} className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16`}>
        <Reveal>
          <p className={`${label} text-sea`}>{b.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold lg:text-[2rem]">{b.heading}</h2>
          <p className="mt-4 text-ink/80">{b.body}</p>
          <p className="mt-3 text-sm text-slate">{b.note}</p>
          <Link href={p("/corporate-accounts")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">{b.link} <DirArrow /></Link>
        </Reveal>
        <Reveal delay={120} className="lg:border-s lg:border-ink/10 lg:ps-16">
          <p className={`${label} text-sea`}>{f.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold lg:text-[2rem]">{f.heading}</h2>
          <p className="mt-4 text-ink/80">{f.body}</p>
          <Link href={p("/family-van-transfer")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">{f.link} <DirArrow /></Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Roles({ copy, p }: { copy: BahDmmCopy; p: P }) {
  const t = copy.timing;
  const r = copy.roles;
  const inc = copy.included;
  return (
    <section aria-labelledby="roles-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        {/* When to book */}
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} ${AMBER}`}>{t.eyebrow}</p>
            <h2 className={h2}>{t.heading}</h2>
          </div>
          <div className="self-end">
            <p className="text-white/80">{t.body}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.cases.map((c) => <li key={c} className="rounded-md border border-white/20 px-3 py-1.5 text-sm">{c}</li>)}
            </ul>
            <p className="mt-4 text-sm text-white/55">{t.note}</p>
          </div>
        </div>

        {/* Roles */}
        <div className="mt-14">
          <p className={`${label} ${AMBER}`}>{r.eyebrow}</p>
          <h2 id="roles-heading" className={`${h2} max-w-3xl`}>{r.heading}</h2>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-2">
            <div className="bg-[#111] p-6 sm:p-8">
              <p className="font-bold text-sea">{r.youLabel}</p>
              <ul className="mt-3 flex flex-col gap-2">{r.you.map((x) => <li key={x} className="text-white/85">{x}</li>)}</ul>
            </div>
            <div className="bg-[#111] p-6 sm:p-8">
              <p className={`font-bold ${AMBER}`}>{r.usLabel}</p>
              <ul className="mt-3 flex flex-col gap-2">{r.us.map((x) => <li key={x} className="text-white/85">{x}</li>)}</ul>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm text-white/60">{r.note}</p>
          <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="mt-1 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">{r.link} <DirArrow /></Link>
        </div>

        {/* Included: one strip */}
        <div className="mt-14 border-t border-white/10 pt-12">
          <p className={`${label} ${AMBER}`}>{inc.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold lg:text-[2rem]">{inc.heading}</h2>
          <ol className="mt-6 flex flex-wrap items-center gap-2">
            {inc.yes.map((y, i) => (
              <Reveal as="li" key={y} delay={i * 60} className="flex items-center gap-2">
                <span className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-ink">{y}</span>
                {i < inc.yes.length - 1 && <span className="text-white/30" aria-hidden="true">+</span>}
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 text-sm font-bold text-white/60">{inc.noHeading}</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/60">
            {inc.no.map((n) => <li key={n}>× {n}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pricing({ copy, figures, p }: { copy: BahDmmCopy; figures: BahDmmFigures; p: P }) {
  const pr = copy.pricing;
  const order = ["sedan", "van", "suv", "luxury"] as const;
  return (
    <section aria-labelledby="bp-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{pr.eyebrow}</p>
          <h2 id="bp-heading" className={h2}>{pr.heading}</h2>
          {/* Fares as departure-board rows */}
          <div className="mt-8 overflow-hidden rounded-xl bg-[#111] text-white">
            {order.map((k, i) => {
              const f = figures.fares[k];
              if (!f) return null;
              return (
                <Reveal key={k} delay={i * 90} className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] px-5 py-4 last:border-b-0">
                  <span className="font-semibold">{pr.names[k]}</span>
                  <span className={mono}>
                    <span className="text-xs text-white/45">{pr.from} </span>
                    <span className={`text-2xl font-bold ${AMBER}`} dir="ltr">BHD {f.bhd}</span>
                    <span className="text-sm text-white/45" dir="ltr"> / SAR {f.sar}</span>
                  </span>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-4 text-ink/80">{pr.note}</p>
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
        <div className="self-center">
          <h3 className="text-xl font-bold">{pr.whyHeading}</h3>
          <ol className="mt-4 border-t border-ink/10">
            {pr.why.map((w, i) => (
              <Reveal as="li" key={w} delay={i * 60} className="flex items-center gap-4 border-b border-ink/10 py-3">
                <span className={`text-xs text-sea ${mono}`}>{i === 0 ? "" : "+"}</span>
                {w}
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Flow({ copy, p }: { copy: BahDmmCopy["flow"]; p: P }) {
  const msg = copy.customer.join("\n");
  return (
    <section aria-labelledby="flow-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="flow-heading" className={h2}>{copy.heading}</h2>
          {/* Boarding-pass style strips */}
          <ol className="mt-8 flex flex-col gap-2">
            {copy.steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 70} className="grid grid-cols-[3.5rem_1fr] overflow-hidden rounded-lg bg-white ring-1 ring-ink/10">
                <span className={`flex items-center justify-center border-e border-dashed border-ink/20 text-sm font-bold ${mono} ${i >= 5 ? "bg-ink text-[#f5c451]" : "text-sea"}`}>{s.n}</span>
                <span className="px-4 py-3">
                  <span className="font-bold">{s.title}</span>
                  <span className="ms-2 text-sm text-slate">{s.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
          <p className="mt-6 text-sm text-slate">
            {copy.returnNote}{" "}
            <Link href={p("/taxi-dammam-to-bahrain")} className="font-semibold text-sea hover:underline">{copy.returnLink} <DirArrow /></Link>
          </p>
        </div>
        <figure className="self-center rounded-2xl bg-[#e5ddd5] p-4 sm:p-5">
          <figcaption className={`mb-3 text-center text-[10px] font-semibold uppercase tracking-wide text-ink/50 ${mono} rtl:normal-case`}>{copy.previewTag}</figcaption>
          <div className="ms-auto max-w-[88%] rounded-lg rounded-se-none bg-[#dcf8c6] p-3.5 text-[0.93rem] leading-relaxed text-ink shadow-sm rtl:rounded-se-lg rtl:rounded-ss-none">
            {copy.customer.map((l, i) => (
              <Reveal as="p" key={i} delay={i * 200} className={i === 0 ? "" : "text-ink/75"}>{l}</Reveal>
            ))}
          </div>
          <Reveal delay={copy.customer.length * 200 + 400} className="mt-3 max-w-[80%] rounded-lg rounded-ss-none bg-white p-3.5 text-[0.93rem] text-ink shadow-sm rtl:rounded-ss-lg rtl:rounded-se-none">
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

function Faqs({ copy }: { copy: BahDmmCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="bfaq-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="bfaq-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: BahDmmCopy["final"]; message: string }) {
  return (
    <section aria-labelledby="bfinal-heading" className="bg-[#111] py-20 text-white lg:py-28">
      <div className={wrap}>
        <p className={`text-sm font-bold uppercase tracking-[0.3em] ${AMBER} ${mono} rtl:normal-case rtl:tracking-normal`} dir="ltr">BAH ✈ ━━ DMM</p>
        <h2 id="bfinal-heading" className="mt-5 max-w-2xl text-[2.2rem] font-bold leading-tight lg:text-[3.4rem]">{copy.heading}</h2>
        <p className="mt-5 max-w-xl text-lg text-white/75">{copy.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`#${PLAN}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-[#f5c451] px-7 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-[#f8d27a]">
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
    </section>
  );
}

/** BAH→Dammam mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: BahDmmCopy["sticky"]; message: string }) {
  return (
    <div
      data-page-sticky
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.5fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a href={`#${PLAN}`} className="flex items-center justify-center bg-[#f5c451] px-3 text-center text-sm font-bold text-ink">
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
