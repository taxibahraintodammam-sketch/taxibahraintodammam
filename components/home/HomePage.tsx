import Image from "next/image";
import Link from "next/link";
import type { HomeCopy } from "@/content/home";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { TripPlanner, NetworkMap, VehicleFinder, type HomeBranch } from "@/components/home/HomeWidgets";

type Fare = { bhd: number; sar: number };
export type HomeFigures = {
  branches: HomeBranch[];
  dammamFares: Record<"sedan" | "van" | "suv" | "luxury", Fare | undefined>;
  long: { name: string; km: number; time: string; href: string }[];
};

type P = (path: string) => string;
const PLAN = "plan-trip";
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.7rem]";
const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";

export function HomePage({ copy, locale, figures }: { copy: HomeCopy; locale: Locale; figures: HomeFigures }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  const wa = copy.planner.whatsappMessage;
  return (
    <>
      <Hero copy={copy} />
      <Trust copy={copy.trust} />
      <Network copy={copy.network} branches={figures.branches} p={p} />
      <Purpose copy={copy.purpose} p={p} />
      <Airports copy={copy.airports} p={p} />
      <Vehicles copy={copy.vehicles} p={p} />
      <Crossing copy={copy.crossing} p={p} />
      <Fares copy={copy.fares} fares={figures.dammamFares} p={p} />
      <Long copy={copy.long} items={figures.long} />
      <Corporate copy={copy.corporate} p={p} />
      <Story copy={copy.story} p={p} />
      <Book copy={copy.book} p={p} />
      <Faqs copy={copy.faq} p={p} />
      <Final copy={copy.final} message={wa} p={p} />
      <StickyBar copy={copy.sticky} message={wa} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: HomeCopy }) {
  const h = copy.hero;
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image src="/hero/slide-causeway.webp" alt={h.imageAlt} fill priority sizes="100vw" quality={80} className="-z-10 object-cover object-[35%_60%]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/75 via-ink/55 to-ink lg:bg-gradient-to-r lg:from-ink lg:via-ink/70 lg:to-ink/20 rtl:lg:bg-gradient-to-l" aria-hidden="true" />
      <div className={`${wrap} grid grid-cols-1 gap-10 pb-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-12 lg:pt-16`}>
        <div className="flex flex-col">
          <p className={`${label} text-brass-lit`}>{h.eyebrow}</p>
          <h1 className="mt-4 text-[2.4rem] font-bold leading-[1.04] sm:text-[3.4rem] lg:text-[4.1rem]">{h.heading}</h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{h.sub}</p>

          {/* The corridor: one line, one car making the crossing */}
          <div className="mt-auto hidden pt-12 lg:block" dir="ltr">
            <div className="flex justify-between text-sm font-bold">
              <span dir="auto">{h.shoreA}</span>
              <span className="text-brass-lit" dir="auto">{h.causeway}</span>
              <span dir="auto">{h.shoreB}</span>
            </div>
            <div className="relative mt-3 h-3">
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/20" aria-hidden="true" />
              <span className="absolute left-[32%] right-[32%] top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-sea" aria-hidden="true" />
              <span className="khobar-drive absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass-lit shadow-[0_0_0_5px_rgba(96,165,250,0.25)]" aria-hidden="true" />
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-white/45">{h.corridor}</p>
          </div>
        </div>

        <div id={PLAN} className="scroll-mt-24 self-start rounded-xl bg-white p-5 text-ink shadow-elevation sm:p-7">
          <h2 className="text-xl font-bold">{copy.planner.heading}</h2>
          <div className="mt-4">
            <TripPlanner copy={copy.planner} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Trust({ copy }: { copy: HomeCopy["trust"] }) {
  return (
    <section aria-label={copy.map((t) => t.title).join(", ")} className="border-b border-ink/10 bg-white">
      <ul className={`${wrap} grid grid-cols-2 divide-ink/10 py-2 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x rtl:lg:divide-x-reverse`}>
        {copy.map((t) => (
          <li key={t.title} className="px-2 py-4 lg:px-4">
            <p className="text-sm font-bold">{t.title}</p>
            <p className="text-xs text-slate">{t.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Network({ copy, branches, p }: { copy: HomeCopy["network"]; branches: HomeBranch[]; p: P }) {
  return (
    <section aria-labelledby="net-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} text-sea`}>{copy.eyebrow}</p>
            <h2 id="net-heading" className={`${h2} lg:text-[3.1rem]`}>{copy.heading}</h2>
          </div>
          <p className="self-end text-ink/80 lg:text-lg">{copy.intro}</p>
        </div>
        <NetworkMap copy={copy} branches={branches} />
        <div className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-bold">{copy.returnLabel}:</span>
            {copy.returnLinks.map((r) => (
              <Link key={r.slug} href={p(`/${r.slug}`)} className="py-1.5 font-semibold text-sea hover:underline">{r.label}</Link>
            ))}
          </p>
          <Link href={p("/king-fahd-causeway-taxi")} className="shrink-0 py-2 text-sm font-semibold text-sea hover:underline">{copy.hubLink} <DirArrow /></Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Seven reasons to cross, each with its own small visual rather than one card template. */
function PurposeGlyph({ k }: { k: string }) {
  const common = "h-10 w-10";
  switch (k) {
    case "airport":
      return <span className={`${mono} text-2xl font-bold tracking-widest text-[#f5c451]`} aria-hidden="true">BAH·DMM</span>;
    case "family":
      return (
        <span className="flex items-end gap-1" aria-hidden="true">
          {[5, 5, 3.5, 3].map((s, i) => <span key={i} className="rounded-full bg-current" style={{ width: `${s * 4}px`, height: `${s * 4}px` }} />)}
          {[0, 1, 2].map((i) => <span key={`b${i}`} className="h-6 w-4 rounded-[3px] bg-sea" />)}
        </span>
      );
    case "business":
      return <span className="text-3xl" aria-hidden="true">⟶</span>;
    case "weekend":
      return <span className="block h-10 w-10 rounded-full bg-[radial-gradient(circle,#f5d9a8_0%,#d99a55_60%,transparent_62%)]" aria-hidden="true" />;
    case "uturn":
      return (
        <svg viewBox="0 0 48 32" className={common} aria-hidden="true">
          <path d="M4 8 H32 A12 12 0 0 1 32 24 H4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "hourly":
      return (
        <svg viewBox="0 0 40 40" className={common} aria-hidden="true">
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M20 10v10l7 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <span className="grid grid-cols-4 gap-1" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => <span key={i} className="h-2.5 w-2.5 rounded-sm bg-current" />)}
        </span>
      );
  }
}

function Purpose({ copy, p }: { copy: HomeCopy["purpose"]; p: P }) {
  const tone: Record<string, string> = {
    airport: "bg-[#111] text-white lg:col-span-2",
    family: "bg-sea/[0.08]",
    business: "bg-ink text-white",
    weekend: "bg-[#f7efe3]",
    uturn: "bg-white ring-1 ring-ink/15",
    hourly: "bg-sea text-white",
    group: "bg-ink/[0.05]",
  };
  return (
    <section aria-labelledby="purpose-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="purpose-heading" className={h2}>{copy.heading}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((it, i) => (
            <Reveal as="li" key={it.key} delay={(i % 4) * 70} className={`rounded-xl ${tone[it.key]}`}>
              <Link href={p(it.href)} className="group flex h-full min-h-44 flex-col p-6">
                <PurposeGlyph k={it.key} />
                <p className="mt-auto pt-6 text-xs font-bold uppercase tracking-wider opacity-60 rtl:normal-case">{it.label}</p>
                <p className="mt-1 text-xl font-bold leading-snug">“{it.line}”</p>
                <p className="mt-1.5 text-sm opacity-75">{it.body}</p>
                <span className="mt-3 text-sm font-semibold opacity-80 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"><DirArrow /></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Airports({ copy, p }: { copy: HomeCopy["airports"]; p: P }) {
  return (
    <section aria-labelledby="air-heading" className="bg-[#111] py-16 text-white lg:py-24">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} text-[#f5c451]`}>{copy.eyebrow}</p>
            <h2 id="air-heading" className={h2}>{copy.heading}</h2>
          </div>
          <p className="self-end text-white/70 lg:text-lg">{copy.body}</p>
        </div>
        {/* Two airports as departure-board panels */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {copy.boards.map((b, i) => (
            <Reveal key={b.code} delay={i * 150} className="overflow-hidden rounded-lg border border-white/10 bg-black/40">
              <div className="flex items-baseline justify-between gap-3 border-b border-white/10 px-5 py-4">
                <span className={`text-4xl font-bold tracking-widest text-[#f5c451] ${mono}`}>{b.code}</span>
                <span className="text-end text-sm text-white/60">{b.name}</span>
              </div>
              <ul className={mono}>
                {b.routes.map((r) => (
                  <li key={r.slug} className="border-b border-white/[0.06] last:border-b-0">
                    <Link href={p(`/${r.slug}`)} className="group flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-white/[0.04]">
                      <span className="text-lg font-bold group-hover:text-[#f5c451]" dir="auto">{r.label}</span>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-xs uppercase tracking-wider text-white/70 rtl:normal-case">{r.status}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-white/55">{copy.note}</span>
          <Link href={p("/airport-transfers")} className="py-2 font-semibold text-[#f5c451] hover:underline">{copy.link} <DirArrow /></Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Vehicles({ copy, p }: { copy: HomeCopy["vehicles"]; p: P }) {
  return (
    <section aria-labelledby="veh-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="veh-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/75">{copy.intro}</p>
        <VehicleFinder copy={copy} />
        <Link href={p("/fleet")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.fleet} <DirArrow /></Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Crossing({ copy, p }: { copy: HomeCopy["crossing"]; p: P }) {
  return (
    <section aria-labelledby="cross-heading" className="relative isolate overflow-hidden bg-ink py-16 text-white lg:py-28">
      <Image src="/hero/slide-chauffeur.webp" alt="" fill sizes="100vw" quality={60} className="-z-10 object-cover object-[70%_center] opacity-15" />
      <div className={wrap}>
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h2 id="cross-heading" className={`${h2} max-w-3xl lg:text-[3.1rem]`}>{copy.heading}</h2>

        {/* Five stages on one road */}
        <ol className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-4" dir="ltr">
          <span className="absolute left-0 right-0 top-4 hidden h-0.5 bg-white/15 md:block" aria-hidden="true">
            <span className="route-draw absolute inset-0 bg-brass-lit" style={{ animationDuration: "4s", transformOrigin: "left center" }} />
          </span>
          {copy.stages.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 120} className="relative flex gap-4 md:block">
              <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold ${mono} ${i === 1 || i === 3 ? "rounded-md border-2 border-white bg-ink" : i === 2 ? "rounded-full bg-sea" : "rounded-full bg-white text-ink"}`}>{s.n}</span>
              <div className="md:mt-4" dir="auto">
                <p className="font-bold">{s.title}</p>
                <p className="mt-1 text-sm text-white/60">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className={`text-[5.5rem] font-bold leading-none lg:text-[8rem] ${mono}`} dir="ltr">{copy.km}</p>
            <p className="mt-2 text-lg font-semibold text-brass-lit">{copy.kmLabel}</p>
            <p className="mt-4 text-2xl font-bold">{copy.kmLine}</p>
          </Reveal>
          <div className="self-end">
            <p className="text-white/75 lg:text-lg">{copy.reality}</p>
            <Link href={p("/king-fahd-causeway-taxi")} className="mt-4 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">{copy.link} <DirArrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Fares({ copy, fares, p }: { copy: HomeCopy["fares"]; fares: HomeFigures["dammamFares"]; p: P }) {
  const order = ["sedan", "van", "suv", "luxury"] as const;
  return (
    <section aria-labelledby="fares-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="fares-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-6 text-sm font-bold text-slate" dir="auto">{copy.route}</p>
          <dl className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink/10 ring-1 ring-ink/10">
            {order.map((k, i) => {
              const f = fares[k];
              if (!f) return null;
              return (
                <Reveal key={k} delay={i * 80} className="bg-white p-5">
                  <dt className="text-sm text-slate">{copy.names[k]}</dt>
                  <dd className={`mt-1 ${mono}`}>
                    <span className="text-xs text-slate">{copy.from} </span>
                    <span className="text-2xl font-bold" dir="ltr">BHD {f.bhd}</span>
                    <span className="block text-xs text-slate" dir="ltr">SAR {f.sar}</span>
                  </dd>
                </Reveal>
              );
            })}
          </dl>
          <p className="mt-4 text-sm text-ink/75">{copy.note}</p>
          <Link href={p("/fares")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.all} <DirArrow /></Link>
        </div>
        <div className="self-center rounded-xl bg-ink/[0.04] p-6 sm:p-8">
          <p className="text-sm font-bold">{copy.partsLabel}</p>
          <ol className="mt-4 flex flex-col gap-2">
            {copy.parts.map((x, i) => (
              <Reveal as="li" key={x} delay={i * 90} className="flex items-center gap-3">
                <span className={`w-4 text-center text-sm text-sea ${mono}`}>{i ? "+" : ""}</span>
                <span className="font-semibold">{x}</span>
              </Reveal>
            ))}
          </ol>
          <p className="mt-5 border-t border-ink/15 pt-4 font-bold text-sea">= {copy.confirmed}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Long({ copy, items }: { copy: HomeCopy["long"]; items: HomeFigures["long"] }) {
  const max = Math.max(...items.map((i) => i.km));
  return (
    <section aria-labelledby="long-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="long-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80">{copy.body}</p>
        </div>
        <ul className="flex flex-col gap-5 self-center">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="group block">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-lg font-bold group-hover:text-sea">{it.name} <DirArrow /></span>
                  <span className={`text-sm text-slate ${mono}`} dir="auto">~{it.km} {copy.km} · {it.time}</span>
                </span>
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-ink/[0.07]" dir="ltr">
                  <Reveal className="h-full">
                    <span className="block h-2 rounded-full bg-ink transition-colors group-hover:bg-sea" style={{ width: `${(it.km / max) * 100}%` }} />
                  </Reveal>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Corporate({ copy, p }: { copy: HomeCopy["corporate"]; p: P }) {
  return (
    <section aria-labelledby="corp-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-10 rounded-2xl bg-ink p-6 text-white sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-14">
          <div>
            <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
            <h2 id="corp-heading" className={h2}>{copy.heading}</h2>
            <p className="mt-4 text-white/75 lg:text-lg">{copy.body}</p>
            <Link href={p("/corporate-accounts")} className="mt-6 inline-flex h-12 items-center rounded-md bg-white px-6 font-bold text-ink transition-colors hover:bg-brass-lit">{copy.link} <span className="ms-2"><DirArrow /></span></Link>
          </div>
          {/* A week of recurring trips, drawn as a small schedule */}
          <ul className="self-center border-t border-white/15">
            {copy.uses.map((u, i) => (
              <Reveal as="li" key={u} delay={i * 70} className="flex items-center justify-between gap-4 border-b border-white/15 py-3.5">
                <span>{u}</span>
                <span className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, d) => <span key={d} className={`h-2 w-2 rounded-sm ${(d + i) % 2 === 0 ? "bg-brass-lit" : "bg-white/15"}`} />)}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { ...copy.hourly, href: p("/hourly-chauffeur-hire"), glyph: "hourly" },
            { ...copy.uturn, href: p("/visa-u-turn-service"), glyph: "uturn" },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="group flex gap-5 rounded-xl p-6 ring-1 ring-ink/10 transition-colors hover:ring-ink/30">
              <span className="shrink-0 text-sea"><PurposeGlyph k={x.glyph} /></span>
              <span>
                <span className="block text-lg font-bold">{x.heading}</span>
                <span className="mt-1 block text-[0.95rem] text-ink/75">{x.body}</span>
                <span className="mt-2 inline-block text-sm font-semibold text-sea group-hover:underline">{x.link} <DirArrow /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Story({ copy, p }: { copy: HomeCopy["story"]; p: P }) {
  return (
    <section aria-labelledby="story-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="story-heading" className={`${h2} lg:text-[3rem]`}>{copy.heading}</h2>
          {copy.body.map((b, i) => (
            <p key={i} className={`mt-5 lg:text-lg lg:leading-relaxed ${i === 0 ? "font-semibold text-ink" : "text-ink/75"}`}>{b}</p>
          ))}
          <Link href={p("/about")} className="mt-3 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.link} <DirArrow /></Link>
        </div>
        <div className="self-center">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink/10 ring-1 ring-ink/10">
            <div className="bg-white p-5">
              <p className="text-sm font-bold text-sea">{copy.doHeading}</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-[0.95rem]">{copy.do.map((x) => <li key={x}>✓ {x}</li>)}</ul>
            </div>
            <div className="bg-white p-5">
              <p className="text-sm font-bold text-slate">{copy.dontHeading}</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-[0.95rem] text-slate">{copy.dont.map((x) => <li key={x}>× {x}</li>)}</ul>
            </div>
          </div>
          <p className="mt-5 border-s-2 border-sea ps-4 text-[0.95rem] font-semibold text-ink/85">{copy.line}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Book({ copy, p }: { copy: HomeCopy["book"]; p: P }) {
  const msg = copy.customer.join("\n");
  return (
    <section aria-labelledby="book-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="book-heading" className={`${h2} lg:text-[3rem]`}>{copy.heading}</h2>
          <ol className="mt-10">
            {copy.steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 110} className="relative grid grid-cols-[3rem_1fr] gap-4 pb-7 last:pb-0">
                {i < copy.steps.length - 1 && <span className="absolute bottom-0 start-[19px] top-10 w-0.5 bg-ink/10" aria-hidden="true" />}
                <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${mono} ${i === 2 ? "bg-sea text-white" : "bg-ink text-white"}`}>{s.n}</span>
                <div className="pt-1.5">
                  <p className="text-lg font-bold">{s.title}</p>
                  <p className="mt-0.5 text-ink/70">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Link href={p("/booking")} className="mt-6 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.bookingLink} <DirArrow /></Link>
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
          <a href={whatsappHref(msg)} target="_blank" rel="noopener noreferrer" className="mt-5 flex h-12 items-center justify-center gap-2 rounded-md bg-[#25d366] font-bold text-ink transition-colors hover:bg-[#1fbd5b]" data-analytics="whatsapp_click">
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.send}
          </a>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy, p }: { copy: HomeCopy["faq"]; p: P }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="hfaq-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="hfaq-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
        <Link href={p("/faqs")} className="mt-6 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.all} <DirArrow /></Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message, p }: { copy: HomeCopy["final"]; message: string; p: P }) {
  return (
    <section aria-labelledby="hfinal-heading" className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
      <Image src="/hero/slide-causeway.webp" alt="" fill sizes="100vw" quality={60} className="-z-10 object-cover object-[50%_60%] opacity-25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40" aria-hidden="true" />
      <div className={`${wrap} text-center`}>
        <h2 id="hfinal-heading" className="text-[2.6rem] font-bold leading-tight lg:text-[4rem]">{copy.heading}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">{copy.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={`#${PLAN}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-brass px-7 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit">{copy.primary}</a>
          <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/25 px-6 text-base font-semibold transition-colors hover:border-white/60" data-analytics="whatsapp_click">
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.secondary}
          </a>
        </div>
        <Link href={p("/king-fahd-causeway-taxi")} className="mt-5 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">{copy.routes} <DirArrow /></Link>
      </div>
    </section>
  );
}

/** Homepage mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: HomeCopy["sticky"]; message: string }) {
  return (
    <div data-page-sticky className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.6fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden" style={{ height: "var(--sticky-bar-height)" }}>
      <a href={`#${PLAN}`} className="flex items-center justify-center bg-brass px-3 text-center text-sm font-bold text-ink">{copy.primary}</a>
      <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm font-semibold text-ink" data-analytics="whatsapp_click">
        <WhatsAppIcon className="h-4 w-4" color="currentColor" />
        {copy.whatsapp}
      </a>
    </div>
  );
}
