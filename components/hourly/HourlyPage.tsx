import Image from "next/image";
import Link from "next/link";
import type { HourlyCopy } from "@/content/hourly";
import { sarFromBhd, whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { DaySelector } from "@/components/hourly/DaySelector";
import { TransferVsHourly } from "@/components/hourly/TransferVsHourly";
import { DayWindow } from "@/components/hourly/DayWindow";
import { DayRequest } from "@/components/hourly/DayRequest";

type P = (path: string) => string;
const PLAN = "plan-your-day";
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.7rem]";
const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";

export function HourlyPage({ copy, locale, minPriceBhd }: { copy: HourlyCopy; locale: Locale; minPriceBhd?: number }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  const wa = copy.hero.secondaryMessage;
  return (
    <>
      <Hero copy={copy.hero} />
      <Decide copy={copy.decide} />
      <Selector copy={copy.selector} />
      <Waits copy={copy.waits} />
      <Kinds copy={copy.kinds} p={p} />
      <Causeway copy={copy.causeway} p={p} />
      <Hours copy={copy.hours} />
      <Overrun copy={copy.overrun} p={p} />
      <Vehicles copy={copy.vehicles} p={p} />
      <PricingIncluded copy={copy} minPriceBhd={minPriceBhd} />
      <Build copy={copy.build} p={p} />
      <Documents copy={copy.documents} p={p} />
      <Faqs copy={copy.faq} />
      <Final copy={copy.final} message={wa} />
      <StickyBar copy={copy.sticky} message={wa} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: HourlyCopy["hero"] }) {
  const n = copy.schedule.length;
  return (
    <section className="overflow-hidden border-b border-ink/10 bg-white">
      <div className={`${wrap} grid grid-cols-1 gap-10 pb-14 pt-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-14`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h1 className="mt-4 text-[2.6rem] font-bold leading-[1.02] text-ink sm:text-6xl lg:text-[4.4rem]">{copy.heading}</h1>
          <p className="mt-6 max-w-xl text-lg text-ink/70">{copy.sub}</p>
          <p className="mt-5 max-w-xl border-s-2 border-sea ps-4 font-semibold text-ink">{copy.promise}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`#${PLAN}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-ink px-7 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft">
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

        {/* Photo with the day laid over it */}
        <div className="relative lg:ps-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:aspect-[16/9] lg:aspect-[4/5]">
            <Image
              src="/hero/slide-chauffeur.webp"
              alt={copy.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              quality={80}
              className="object-cover object-[30%_center] lg:object-[34%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" aria-hidden="true" />
          </div>

          <figure className="relative mx-3 -mt-20 rounded-xl bg-ink p-5 text-white shadow-elevation sm:mx-8 sm:p-6 lg:absolute lg:-start-4 lg:bottom-8 lg:mx-0 lg:mt-0 lg:w-[330px]">
            <p className={`text-[11px] text-white/50 ${mono}`}>{copy.cardTitle}</p>
            <div className="relative mt-4">
              {/* The line draws down, then the vehicle marker travels along it */}
              <span className="absolute bottom-3 start-[5px] top-3 w-0.5 bg-white/10" aria-hidden="true" />
              <span className="day-line absolute bottom-3 start-[5px] top-3 w-0.5 bg-brass-lit" style={{ animationDelay: `${300 + n * 260}ms` }} aria-hidden="true" />
              <span className="absolute bottom-3 start-0 top-3 w-3" aria-hidden="true">
                <span className="day-marker absolute start-0 h-3 w-3 rounded-full bg-brass-lit shadow-[0_0_0_5px_rgba(96,165,250,0.25)]" style={{ animationDelay: `${900 + n * 260}ms` }} />
              </span>
              <ol className="relative flex flex-col gap-3.5">
                {copy.schedule.map((s, i) => (
                  <li key={s.time} className="ledger-row grid grid-cols-[0.75rem_3.25rem_1fr] items-center gap-3" style={{ animationDelay: `${300 + i * 260}ms` }}>
                    <span className="h-3 w-3 rounded-full border-2 border-white/40 bg-ink" aria-hidden="true" />
                    <span className={`text-sm text-white/60 ${mono}`}>{s.time}</span>
                    <span className="font-semibold">{s.place}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="ledger-row mt-5 border-t border-white/10 pt-4 text-sm font-semibold text-brass-lit" style={{ animationDelay: `${600 + n * 260}ms` }}>
              {copy.marker}
            </p>
            <figcaption className="mt-2 text-[11px] text-white/40">{copy.illustration}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Decide({ copy }: { copy: HourlyCopy["decide"] }) {
  return (
    <section aria-labelledby="decide-heading" className="bg-white py-16 lg:py-28">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className={`${label} text-sea`}>{copy.eyebrow}</p>
            <h2 id="decide-heading" className={h2}>{copy.heading}</h2>
          </div>
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-ink/80">
            {copy.story.map((s, i) => (
              <p key={i} className={i === 0 ? "font-semibold text-ink" : ""}>{s}</p>
            ))}
          </div>
        </div>

        {/* Two halves: the journey vs the time */}
        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-xl ring-1 ring-ink/10 md:grid-cols-2">
          {[copy.transfer, copy.hourly].map((side, i) => {
            const dark = i === 1;
            return (
              <Reveal key={side.label} delay={i * 120} className={`flex flex-col p-6 sm:p-10 ${dark ? "bg-ink text-white" : "bg-ink/[0.03]"}`}>
                <p className={`${label} ${dark ? "text-brass-lit" : "text-slate"}`}>{side.label}</p>
                <p className="mt-3 text-3xl font-bold leading-tight sm:text-[2.6rem]">{side.line}</p>
                <ul className="mt-8 flex flex-col gap-2.5">
                  {side.examples.map((ex) => (
                    <li key={ex} className={`rounded-md px-3 py-2 text-sm ${mono} ${dark ? "bg-white/[0.06] text-white/85" : "bg-white text-ink/75 ring-1 ring-ink/10"}`} dir="auto">
                      {ex}
                    </li>
                  ))}
                </ul>
                <p className={`mt-auto pt-8 text-[0.95rem] ${dark ? "text-white/65" : "text-slate"}`}>{side.note}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Selector({ copy }: { copy: HourlyCopy["selector"] }) {
  return (
    <section aria-labelledby="selector-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="selector-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-4 max-w-2xl text-slate">{copy.intro}</p>
        <DaySelector copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Waits({ copy }: { copy: HourlyCopy["waits"] }) {
  return (
    <section aria-labelledby="waits-heading" className="bg-ink py-16 text-white lg:py-28">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
          <h2 id="waits-heading" className={`${h2} lg:text-[3rem]`}>{copy.heading}</h2>
          <p className="mt-6 text-white/75 lg:text-lg">{copy.body}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {copy.situations.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 60} className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/85">
                {s}
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 border-s-2 border-brass-lit ps-4 text-sm text-white/65">{copy.limit}</p>
        </div>
        <div className="lg:pt-10">
          <TransferVsHourly copy={copy} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Kinds({ copy, p }: { copy: HourlyCopy["kinds"]; p: P }) {
  const ex = copy.executive;
  const fam = copy.family;
  const sight = copy.sightseeing;
  return (
    <>
      <section aria-labelledby="kinds-heading" className="bg-white pb-8 pt-16 lg:pb-12 lg:pt-28">
        <div className={wrap}>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="kinds-heading" className={h2}>{copy.heading}</h2>
          <div className="mt-12 border-t border-ink/10">
            {copy.compact.map((k) => (
              <Reveal key={k.title} className="grid grid-cols-1 gap-3 border-b border-ink/10 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <h3 className="text-2xl font-bold">{k.title}</h3>
                <div>
                  <p className="text-ink/80 lg:text-[1.05rem] lg:leading-relaxed">{k.body}</p>
                  {"link" in k && k.link && (
                    <Link href={p(k.link.href)} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">
                      {k.link.label} <DirArrow />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Executive: the schedule is the product */}
      <section aria-labelledby="exec-heading" className="bg-white py-10 lg:py-14">
        <div className={wrap}>
          <div className="grid grid-cols-1 gap-10 rounded-2xl bg-ink/[0.035] p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-14">
            <div>
              <p className={`${label} text-sea`}>{ex.eyebrow}</p>
              <h3 id="exec-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.3rem]">{ex.heading}</h3>
              <p className="mt-4 text-ink/80 lg:text-lg">{ex.body}</p>
              <p className="mt-6 text-[0.95rem] text-slate">{ex.luxury}</p>
              <Link href={p("/vip-luxury-transfer")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">
                {ex.link} <DirArrow />
              </Link>
            </div>
            <ul className="self-center border-t border-ink/15">
              {ex.uses.map((u, i) => (
                <Reveal as="li" key={u} delay={i * 70} className="flex items-baseline gap-4 border-b border-ink/15 py-3.5">
                  <span className={`text-xs text-sea ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg">{u}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Family: one chain of stops */}
      <section aria-labelledby="family-heading" className="bg-white py-10 lg:py-14">
        <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
          <div>
            <p className={`${label} text-sea`}>{fam.eyebrow}</p>
            <h3 id="family-heading" className="mt-3 text-[1.75rem] font-bold leading-tight lg:text-[2.3rem]">{fam.heading}</h3>
            <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
              {fam.route.map((r, i) => (
                <Reveal as="li" key={`${r}-${i}`} delay={i * 90} className="flex items-center gap-2">
                  <span className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${i === 0 || i === fam.route.length - 1 ? "bg-ink text-white" : "bg-sea/10 text-ink"}`}>{r}</span>
                  {i < fam.route.length - 1 && <span className="text-slate"><DirArrow /></span>}
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:pt-10">
            <p className="text-ink/80 lg:text-lg lg:leading-relaxed">{fam.body}</p>
            <p className="mt-5 rounded-lg bg-ink/[0.04] p-5 text-[0.95rem] text-ink/80">{fam.practical}</p>
            <Link href={p("/family-van-transfer")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">
              {fam.link} <DirArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Sightseeing: places, not a destination */}
      <section aria-labelledby="sight-heading" className="bg-white pb-16 pt-10 lg:pb-28 lg:pt-14">
        <div className={wrap}>
          <div className="border-t-2 border-ink pt-10">
            <p className={`${label} text-sea`}>{sight.eyebrow}</p>
            <h3 id="sight-heading" className="mt-3 max-w-3xl text-[2rem] font-bold leading-tight lg:text-[3rem]">{sight.heading}</h3>
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <p className="text-ink/80 lg:text-lg lg:leading-relaxed">{sight.body}</p>
                <p className="mt-4 text-sm text-slate">{sight.note}</p>
                <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
                  <Link href={p("/taxi-bahrain-to-al-ahsa-hofuf")} className="py-2 text-sea hover:underline">{sight.links.alahsa} <DirArrow /></Link>
                  <Link href={p("/blog/things-to-do-in-bahrain-weekend-from-dammam")} className="py-2 text-sea hover:underline">{sight.links.guide} <DirArrow /></Link>
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-lg bg-ink/10 ring-1 ring-ink/10">
                {sight.places.map((pl, i) => (
                  <Reveal as="li" key={pl} delay={i * 90} className="bg-white px-5 py-6">
                    <span className={`text-xs text-slate ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-1 block text-lg font-bold">{pl}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Causeway({ copy, p }: { copy: HourlyCopy["causeway"]; p: P }) {
  const ex = copy.example;
  return (
    <section aria-labelledby="causeway-heading" className="bg-ink py-16 text-white lg:py-28">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
            <h2 id="causeway-heading" className={`${h2} lg:text-[3rem]`}>{copy.heading}</h2>
            <p className="mt-5 text-white/75 lg:text-lg">{copy.body}</p>
            {/* Out and back */}
            <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold">
              {copy.flow.map((f, i) => (
                <li key={`${f}-${i}`} className="flex items-center gap-2">
                  <span className={`rounded-md px-3 py-1.5 ${i === 0 || i === copy.flow.length - 1 ? "bg-white text-ink" : "bg-white/10"}`}>{f}</span>
                  {i < copy.flow.length - 1 && <span className="text-brass-lit"><DirArrow /></span>}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-white/55">{copy.reverse}</p>
          </div>
          <div>
            <ul className="border-t border-white/15">
              {copy.conditions.map((c) => (
                <li key={c} className="flex gap-3 border-b border-white/15 py-3.5 text-white/85">
                  <span className="text-brass-lit" aria-hidden="true">·</span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-white/55">{copy.timing}</p>
            <Link href={p("/king-fahd-causeway-taxi")} className="mt-1 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">
              {copy.link} <DirArrow />
            </Link>
          </div>
        </div>

        {/* The example day as a ticket-style strip */}
        <figure className="mt-16 overflow-hidden rounded-xl bg-white text-ink">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-ink/20 px-5 py-4 sm:px-8">
            <h3 className="text-xl font-bold">{ex.heading}</h3>
            <p className={`rounded-md bg-ink/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate ${mono} rtl:normal-case`}>{ex.tag}</p>
          </div>
          <ol className="grid grid-cols-1 px-5 py-6 sm:px-8 lg:grid-cols-7 lg:gap-3 lg:py-8">
            {ex.stops.map((s, i) => (
              <Reveal as="li" key={s.time} delay={i * 80} className="relative flex gap-4 pb-5 last:pb-0 lg:block lg:pb-0">
                {i < ex.stops.length - 1 && (
                  <span className="absolute bottom-0 start-[5px] top-4 w-0.5 bg-ink/10 lg:bottom-auto lg:end-[-0.75rem] lg:start-4 lg:top-[5px] lg:h-0.5 lg:w-auto" aria-hidden="true" />
                )}
                <span className={`relative z-10 mt-1 block h-3 w-3 shrink-0 rounded-full lg:mt-0 ${i === 0 || i === ex.stops.length - 1 ? "bg-ink" : "bg-sea"}`} aria-hidden="true" />
                <div className="lg:mt-4">
                  <p className={`text-sm font-bold ${mono}`}>{s.time}</p>
                  <p className="mt-0.5 text-sm leading-snug text-ink/75">{s.place}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <figcaption className="border-t border-ink/10 bg-ink/[0.03] px-5 py-4 text-[0.95rem] text-ink/80 sm:px-8">{ex.point}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Hours({ copy }: { copy: HourlyCopy["hours"] }) {
  return (
    <section aria-labelledby="hours-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="hours-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80 lg:text-lg">{copy.intro}</p>
          <p className={`mt-6 flex flex-wrap items-center gap-2 text-sm ${mono}`}>
            {copy.formula.map((f, i) => (
              <span key={f} className="flex items-center gap-2">
                <span className={`rounded-md px-2.5 py-1.5 font-[family-name:var(--font-body)] ${i === copy.formula.length - 1 ? "bg-ink text-white" : "bg-white ring-1 ring-ink/10"}`}>{f}</span>
                {i < copy.formula.length - 2 && <span className="text-slate">+</span>}
                {i === copy.formula.length - 2 && <span className="text-slate">=</span>}
              </span>
            ))}
          </p>
          <ol className="mt-10 border-t border-ink/15">
            {copy.tiers.map((t, i) => (
              <li key={t.title} className="grid grid-cols-[3rem_1fr] items-center gap-3 border-b border-ink/15 py-4">
                {/* Bars grow with the length of the day; no hour figures implied */}
                <span className="flex h-6 items-end gap-0.5" aria-hidden="true">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <span key={j} className={`w-2 rounded-sm ${j <= i ? "bg-sea" : "bg-ink/10"}`} style={{ height: `${40 + j * 30}%` }} />
                  ))}
                </span>
                <span>
                  <span className="font-bold">{t.title}</span>
                  <span className="block text-sm text-slate">{t.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col justify-center gap-5">
          <DayWindow copy={copy} />
          <p className="border-s-2 border-sea ps-4 text-[0.95rem] font-semibold text-ink/85">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Overrun({ copy, p }: { copy: HourlyCopy["overrun"]; p: P }) {
  const e = copy.example;
  return (
    <section aria-labelledby="overrun-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="overrun-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80 lg:text-lg">{copy.body}</p>

          {/* 6 booked hours + 1 extra, drawn as blocks */}
          <figure className="mt-8 rounded-xl p-5 ring-1 ring-ink/10 sm:p-6">
            <p className={`text-[11px] font-semibold uppercase tracking-wide text-slate ${mono} rtl:normal-case`}>{e.tag}</p>
            <div className="mt-4 flex gap-1" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <Reveal key={i} delay={i * 90} className={`h-10 flex-1 rounded ${i < 6 ? "bg-ink" : "bg-[repeating-linear-gradient(45deg,var(--color-sea)_0_6px,transparent_6px_10px)] ring-1 ring-sea"}`}>
                  <span className="sr-only">{i + 1}</span>
                </Reveal>
              ))}
            </div>
            <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <div><dt className="text-slate">{e.booked}</dt><dd className="font-bold">{e.bookedValue}</dd></div>
              <div><dt className="text-slate">{e.actual}</dt><dd className="font-bold">{e.actualValue}</dd></div>
              <div><dt className="text-slate">{e.extra}</dt><dd className="font-bold text-sea">{e.extraValue}</dd></div>
            </dl>
          </figure>
        </div>
        <div className="self-center rounded-xl bg-ink/[0.04] p-6 sm:p-8">
          <h3 className="text-xl font-bold">{copy.earlyHeading}</h3>
          <p className="mt-3 text-ink/80">{copy.early}</p>
          <Link href={p("/cancellation-and-refund-policy")} className="mt-3 inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {copy.earlyLink} <DirArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Vehicles({ copy, p }: { copy: HourlyCopy["vehicles"]; p: P }) {
  return (
    <section aria-labelledby="vehicles-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="vehicles-heading" className={h2}>{copy.heading}</h2>
        <p className={`mt-6 flex flex-wrap items-center gap-2 text-sm`}>
          {copy.formula.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className="rounded-md bg-white px-3 py-1.5 ring-1 ring-ink/10">{f}</span>
              {i < copy.formula.length - 1 && <span className="text-slate">+</span>}
            </span>
          ))}
        </p>
        <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {copy.rows.map((r) => (
            <li key={r.slug}>
              <Link href={p(`/fleet/${r.slug}`)} className="group grid grid-cols-1 gap-1 py-5 sm:grid-cols-[10rem_11rem_1fr_auto] sm:items-center sm:gap-6">
                <span className="text-xl font-bold group-hover:text-sea">{r.name}</span>
                <span className={`text-sm text-slate ${mono}`}>{r.people}</span>
                <span className="text-[0.98rem] text-ink/80">{r.use}</span>
                <span className="hidden text-slate transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 sm:block"><DirArrow /></span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={p("/fleet")} className="mt-4 inline-block py-2 text-sm font-semibold text-sea hover:underline">
          {copy.fleet} <DirArrow />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function PricingIncluded({ copy, minPriceBhd }: { copy: HourlyCopy; minPriceBhd?: number }) {
  const pr = copy.pricing;
  const inc = copy.included;
  return (
    <section aria-labelledby="pricing-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className={`${label} text-sea`}>{pr.eyebrow}</p>
            <h2 id="pricing-heading" className={h2}>{pr.heading}</h2>
            <p className="mt-4 text-ink/80 lg:text-lg">{pr.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {pr.factors.map((f) => (
                <li key={f} className="rounded-md bg-ink/[0.04] px-3 py-1.5 text-sm">{f}</li>
              ))}
            </ul>
          </div>
          {minPriceBhd !== undefined && (
            <div className="self-end rounded-xl bg-ink p-6 text-white sm:p-8">
              <p className="text-sm text-white/60">{pr.fromLabel}</p>
              <p className={`mt-2 ${mono}`} dir="ltr">
                <span className="text-4xl font-bold">BHD {minPriceBhd}</span>
                <span className="text-white/55"> / SAR {sarFromBhd(minPriceBhd)}</span>
              </p>
              <a href={`#${PLAN}`} className="mt-6 flex h-12 items-center justify-center rounded-md bg-brass px-6 font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit">
                {pr.cta}
              </a>
            </div>
          )}
        </div>

        <div className="mt-16">
          <p className={`${label} text-sea`}>{inc.eyebrow}</p>
          <h3 className="mt-3 text-2xl font-bold lg:text-[2rem]">{inc.heading}</h3>
          <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-xl ring-1 ring-ink/10 md:grid-cols-[1.1fr_0.9fr]">
            <ul className="flex flex-col gap-3 bg-white p-6 sm:p-8">
              {inc.yes.map((y, i) => (
                <Reveal as="li" key={y} delay={i * 70} className="flex items-center gap-3 text-lg font-semibold">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sea text-xs text-white" aria-hidden="true">✓</span>
                  {y}
                </Reveal>
              ))}
            </ul>
            <div className="border-t border-ink/10 bg-ink/[0.03] p-6 sm:p-8 md:border-s md:border-t-0">
              <p className="text-sm font-bold text-slate">{inc.noHeading}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {inc.no.map((n) => (
                  <li key={n} className="flex gap-3 text-[0.95rem] text-slate">
                    <span aria-hidden="true">×</span>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-5 border-s-2 border-sea ps-4 text-[0.95rem] text-ink/85">{inc.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Build({ copy, p }: { copy: HourlyCopy["build"]; p: P }) {
  return (
    <section id={PLAN} aria-labelledby="build-heading" className="scroll-mt-20 bg-ink py-16 text-white lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
          <h2 id="build-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-3 text-white/70">{copy.body}</p>
          <div className="mt-8">
            <DayRequest copy={copy} />
          </div>
          <Link href={p("/booking")} className="mt-4 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">
            {copy.fullBooking} <DirArrow />
          </Link>
        </div>

        {/* What a useful request looks like */}
        <aside aria-labelledby="example-heading" className="self-start">
          <h3 id="example-heading" className="font-bold">{copy.exampleHeading}</h3>
          <div className="mt-4 rounded-2xl rounded-se-sm bg-[#dcf8c6] p-4 text-[0.95rem] leading-relaxed text-ink shadow-elevation rtl:rounded-se-2xl rtl:rounded-ss-sm">
            <p className={`mb-2 text-[10px] font-semibold uppercase tracking-wide text-ink/50 ${mono} rtl:normal-case`}>{copy.exampleTag}</p>
            {copy.example.map((l, i) => (
              <p key={i} className={i === 0 || i === copy.example.length - 1 ? "" : "text-ink/80"}>{l}</p>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/60">{copy.exampleNote}</p>
        </aside>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Documents({ copy, p }: { copy: HourlyCopy["documents"]; p: P }) {
  return (
    <section aria-labelledby="docs-heading" className="bg-white py-16 lg:py-20">
      <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="docs-heading" className="mt-3 text-2xl font-bold leading-tight lg:text-[2rem]">{copy.heading}</h2>
          <p className="mt-4 text-sm text-slate">{copy.note}</p>
          <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">
            {copy.link} <DirArrow />
          </Link>
        </div>
        <ul className="border-t border-ink/10">
          {copy.points.map((pt) => (
            <li key={pt} className="border-b border-ink/10 py-4 text-[0.98rem] text-ink/85">{pt}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy }: { copy: HourlyCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="hourly-faq-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="hourly-faq-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: HourlyCopy["final"]; message: string }) {
  return (
    <section aria-labelledby="final-heading" className="bg-white py-20 lg:py-28">
      <div className={`${wrap} text-center`}>
        {/* A small clock face as the closing mark */}
        <svg viewBox="0 0 48 48" className="mx-auto h-12 w-12 text-sea" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M24 12v12l8 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <h2 id="final-heading" className="mx-auto mt-6 max-w-3xl text-[2.2rem] font-bold leading-tight lg:text-[3.4rem]">{copy.heading}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink/70">{copy.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={`#${PLAN}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-ink px-7 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft">
            {copy.primary}
          </a>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-ink/20 px-6 text-base font-semibold transition-colors hover:border-ink/50"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.secondary}
          </a>
        </div>
        <p className={`mt-6 text-sm text-slate ${mono}`}>{copy.small}</p>
      </div>
    </section>
  );
}

/** Hourly mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: HourlyCopy["sticky"]; message: string }) {
  return (
    <div
      data-page-sticky
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.6fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a href={`#${PLAN}`} className="flex items-center justify-center bg-ink px-3 text-center text-sm font-bold text-white transition-colors active:bg-ink-soft">
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
