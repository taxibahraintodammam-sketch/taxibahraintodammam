import Link from "next/link";
import type { ReactNode } from "react";
import type { CorporateCopy } from "@/content/corporate";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { RequestLifecycle } from "@/components/corporate/RequestLifecycle";
import { CorporateEnquiry } from "@/components/corporate/CorporateEnquiry";

type P = (path: string) => string;
const ENQUIRY = "corporate-enquiry";
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]";

export function CorporatePage({ copy, locale }: { copy: CorporateCopy; locale: Locale }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  return (
    <>
      <Hero copy={copy.hero} />
      <Problem copy={copy.problem} />
      <BeforeAfter copy={copy.beforeAfter} />
      <Meaning copy={copy.meaning} />
      <Situations copy={copy.situations} />
      <Setup copy={copy.setup} />
      <Coordinator copy={copy.coordinator} />
      <Request copy={copy.request} />
      <Schedule copy={copy.schedule} />
      <Changes copy={copy.changes} />
      <Records copy={copy.records} projects={copy.projects} />
      <Vehicles copy={copy.vehicles} p={p} />
      <Border copy={copy.border} p={p} />
      <Prepare copy={copy.prepare} />
      <ScopePricing copy={copy} />
      <Scale copy={copy.scale} />
      <Faqs copy={copy.faq} />
      <Enquiry copy={copy.enquiry} />
      <StickyBar copy={copy.sticky} message={copy.enquiry.secondaryMessage} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: CorporateCopy["hero"] }) {
  return (
    <section className="border-b border-ink/10 bg-[linear-gradient(to_right,rgba(13,13,13,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,13,13,0.035)_1px,transparent_1px)] bg-[size:40px_40px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-24 lg:pt-16">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h1 className="mt-4 text-[2.15rem] font-bold leading-[1.1] text-ink sm:text-5xl lg:text-[3.3rem]">{copy.heading}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink/70">{copy.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`#${ENQUIRY}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-ink px-7 text-base font-bold text-white transition-colors hover:bg-ink-soft">
              {copy.primary}
            </a>
            <a
              href={whatsappHref(copy.secondaryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-ink/20 bg-white px-6 text-base font-semibold text-ink transition-colors hover:border-ink/50"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-5 w-5" color="currentColor" />
              {copy.secondary}
            </a>
          </div>
        </div>

        {/* Account ledger: rows arrive one by one (CSS only) */}
        <figure>
          <div className="overflow-hidden rounded-lg border border-ink/15 bg-white shadow-elevation">
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
              <p className={`text-xs text-slate ${mono}`}>{copy.ledgerTitle}</p>
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-sea" />
              </span>
            </div>
            <ol>
              {copy.ledger.map((row, i) => (
                <li
                  key={row.day}
                  className="ledger-row grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 border-b border-ink/[0.07] px-5 py-3.5 text-sm"
                  style={{ animationDelay: `${250 + i * 220}ms` }}
                >
                  <span className={`text-slate ${mono}`}>{row.day}</span>
                  <span className="font-semibold text-ink" dir="auto">{row.route}</span>
                  <span className="text-slate">{row.people}</span>
                </li>
              ))}
            </ol>
            <div className="ledger-row flex items-center justify-between bg-ink px-5 py-4 text-white" style={{ animationDelay: `${250 + copy.ledger.length * 220}ms` }}>
              <span className={`text-xs text-white/60 ${mono}`}>{copy.ledgerSummaryLabel}</span>
              <span className="font-semibold">{copy.ledgerSummary}</span>
            </div>
          </div>
          <figcaption className="mt-3 text-xs text-slate">{copy.illustration}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Problem({ copy }: { copy: CorporateCopy["problem"] }) {
  return (
    <section aria-labelledby="problem-heading" className="bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="problem-heading" className={`${h2} max-w-3xl`}>{copy.heading}</h2>
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <blockquote className="border-s-4 border-sea ps-6 text-xl leading-relaxed text-ink/85 lg:text-2xl">{copy.story}</blockquote>
          <ul className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
            {copy.items.map((it, i) => (
              <Reveal as="li" key={it} delay={i * 60} className="flex gap-3 py-2.5 text-[0.95rem] text-ink/80">
                <span className={`w-5 shrink-0 text-xs text-slate ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                {it}
              </Reveal>
            ))}
          </ul>
        </div>
        <p className="mt-12 text-2xl font-bold lg:text-3xl">{copy.turn}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BeforeAfter({ copy }: { copy: CorporateCopy["beforeAfter"] }) {
  return (
    <section aria-labelledby="ba-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="ba-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Before: scattered lines */}
          <div className="rounded-lg border border-dashed border-ink/25 bg-white/60 p-6 sm:p-8">
            <h3 className="font-bold text-slate">{copy.before.title}</h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {copy.before.rows.map((r, i) => (
                <Reveal as="li" key={r.who} delay={i * 90} className="flex items-center gap-3 text-sm">
                  <span className="w-24 shrink-0 font-semibold text-ink/70">{r.who}</span>
                  <span className="h-px flex-1 border-t border-dashed border-ink/25" style={{ transform: `rotate(${[2, -3, 4, -2, 3][i]}deg)` }} aria-hidden="true" />
                  <span className="shrink-0 text-slate">{r.what}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          {/* After: one clean chain */}
          <div className="rounded-lg bg-ink p-6 text-white sm:p-8">
            <h3 className="font-bold">{copy.after.title}</h3>
            <ol className="mt-5 flex flex-col">
              {copy.after.steps.map((s, i) => (
                <Reveal as="li" key={s} delay={i * 110} className="relative flex items-center gap-4 pb-4 last:pb-0">
                  {i < copy.after.steps.length - 1 && <span className="absolute bottom-0 start-[11px] top-7 w-0.5 bg-brass-lit/40" aria-hidden="true" />}
                  <span className="relative z-10 h-6 w-6 shrink-0 rounded-full border-2 border-brass-lit bg-ink" aria-hidden="true" />
                  <span className="font-semibold">{s}</span>
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

function Meaning({ copy }: { copy: CorporateCopy["meaning"] }) {
  return (
    <section aria-labelledby="meaning-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="meaning-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.body}</p>
          <div className="mt-8 rounded-lg bg-ink/[0.04] p-5">
            <h3 className="font-bold">{copy.notHeading}</h3>
            <ul className="mt-2 flex flex-col gap-1.5">
              {copy.not.map((n) => (
                <li key={n} className="flex gap-2 text-[0.95rem] text-ink/80">
                  <span aria-hidden="true" className="text-danger">×</span>
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate">{copy.note}</p>
          </div>
        </div>
        <ul className="self-center border-t border-ink/10">
          {copy.parts.map((part, i) => (
            <Reveal as="li" key={part} delay={i * 60} className="flex items-baseline gap-4 border-b border-ink/10 py-3.5">
              <span className={`text-xs text-sea ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[1.02rem]">{part}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const ICONS: Record<string, ReactNode> = {
  rotation: <path d="M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6M17 3v4h-4M7 21v-4h4" />,
  project: <path d="M9 4h6v3H9zM6 6h12v15H6zM9 11h6M9 15h4" />,
  airport: <path d="M3 14l18-7-6 13-3-6-9 0zM12 14l3-2" />,
  executive: <path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16" />,
  site: <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  contractor: <path d="M4 17h16M6 17a6 6 0 0 1 12 0M12 7V4M9 11l-1-3M15 11l1-3" />,
};

function Situations({ copy }: { copy: CorporateCopy["situations"] }) {
  return (
    <section aria-labelledby="situations-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h2 id="situations-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-white/65">{copy.intro}</p>
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((s, i) => (
            <Reveal as="article" key={s.title} delay={(i % 3) * 90} className="group border-t border-white/15 py-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-brass-lit transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true">
                {ICONS[s.icon]}
              </svg>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-white/65">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Setup({ copy }: { copy: CorporateCopy["setup"] }) {
  return (
    <section aria-labelledby="setup-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="setup-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-slate">{copy.intro}</p>
          <p className="mt-6 border-s-2 border-sea ps-4 text-sm text-ink/80">{copy.outro}</p>
        </div>
        {/* A "build your account" sheet: labelled fields rather than process cards */}
        <ol className="overflow-hidden rounded-lg border border-ink/15">
          {copy.steps.map((s, i) => (
            <Reveal as="li" key={s.key} delay={i * 80} className="grid grid-cols-[3rem_1fr] border-b border-ink/10 last:border-b-0">
              <span className={`flex items-start justify-center border-e border-ink/10 bg-ink/[0.03] pt-5 text-lg font-bold text-sea ${mono}`}>{s.key}</span>
              <div className="p-5">
                <h3 className="font-bold">{s.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <li key={it} className="rounded-md border border-ink/15 px-2.5 py-1.5 text-sm text-ink/80">{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Coordinator({ copy }: { copy: CorporateCopy["coordinator"] }) {
  return (
    <section aria-labelledby="coordinator-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="coordinator-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/75 lg:text-lg">{copy.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {copy.roles.map((r) => (
              <li key={r} className="rounded-md bg-white px-3 py-1.5 text-sm font-medium ring-1 ring-ink/10">{r}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate">{copy.note}</p>
        </div>
        {/* Four separate chat bubbles collapse into one */}
        <div className="flex flex-col gap-2">
          {copy.chaos.map((c, i) => (
            <Reveal key={c} delay={i * 100} className={`max-w-[80%] rounded-2xl rounded-ss-sm bg-white px-4 py-2.5 text-sm text-ink/70 ring-1 ring-ink/10 ${i % 2 ? "ms-8" : ""}`}>
              {c}
            </Reveal>
          ))}
          <Reveal delay={500} className="mt-3 self-end rounded-2xl rounded-se-sm bg-ink px-5 py-3.5 font-semibold text-white">
            {copy.calm}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Request({ copy }: { copy: CorporateCopy["request"] }) {
  return (
    <section aria-labelledby="request-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="request-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10">
          <RequestLifecycle copy={copy} />
        </div>
        <p className="mt-8 max-w-3xl text-slate">{copy.explain}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Schedule({ copy }: { copy: CorporateCopy["schedule"] }) {
  return (
    <section aria-labelledby="schedule-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="schedule-heading" className={h2}>{copy.heading}</h2>

        {/* Week grid */}
        <figure className="mt-10">
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-5">
            {copy.days.map((d, i) => (
              <Reveal as="li" key={d.day} delay={i * 80} className="flex items-center gap-4 bg-white p-4 sm:min-h-32 sm:flex-col sm:items-start sm:gap-3">
                <span className={`w-20 shrink-0 text-xs font-bold text-slate sm:w-auto ${mono}`}>{d.day}</span>
                <span className="rounded-md bg-sea/10 px-2.5 py-2 text-sm font-semibold text-ink" dir="auto">{d.route}</span>
              </Reveal>
            ))}
          </ol>
          <figcaption className="mt-2 text-xs text-slate">{copy.tag}</figcaption>
        </figure>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-slate">{copy.body}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {copy.patterns.map((pt) => (
                <li key={pt} className="flex items-center gap-2 text-[0.95rem]">
                  <span className="h-1.5 w-1.5 rounded-full bg-sea" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <p className="self-start rounded-lg border border-ink/15 bg-white p-5 text-sm text-ink/80">{copy.caveat}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Changes({ copy }: { copy: CorporateCopy["changes"] }) {
  return (
    <section aria-labelledby="changes-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="changes-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.body}</p>
        </div>
        <div>
          <ul className="flex flex-wrap gap-2">
            {copy.cases.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 50} className={`rounded-md border border-ink/15 px-3 py-2 text-sm ${mono}`}>
                <span className="text-sea">↻ </span>
                <span className="font-[family-name:var(--font-body)]">{c}</span>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <p className="rounded-lg bg-ink p-5 text-[0.95rem] text-white">{copy.how}</p>
            <p className="rounded-lg bg-ink/[0.04] p-5 text-[0.95rem] text-ink/80">{copy.impact}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Records({ copy, projects }: { copy: CorporateCopy["records"]; projects: CorporateCopy["projects"] }) {
  return (
    <section aria-labelledby="records-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
            <h2 id="records-heading" className={h2}>{copy.heading}</h2>
            <p className="mt-4 text-white/75 lg:text-lg">{copy.body}</p>
            <p className="mt-4 text-sm text-white/55">{copy.note}</p>
          </div>

          {/* Statement preview: no totals, no prices */}
          <figure>
            <div className="overflow-hidden rounded-lg bg-white text-ink">
              <p className={`border-b border-ink/10 px-5 py-3 text-xs font-semibold text-slate ${mono}`}>{copy.tableTitle}</p>
              {/* Phones: one small record per trip instead of a cramped 4-column table */}
              <ul className="divide-y divide-ink/[0.07] sm:hidden">
                {copy.rows.map((r) => (
                  <li key={r.join("|")} className="px-5 py-3.5">
                    <p className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold" dir="auto">{r[1]}</span>
                      <span className={`shrink-0 text-xs text-slate ${mono}`}>{r[2]}</span>
                    </p>
                    <p className={`mt-0.5 text-xs text-slate ${mono}`}>
                      {r[0]} · {r[3]}
                    </p>
                  </li>
                ))}
              </ul>
              <table className="hidden w-full text-start text-sm sm:table">
                <thead>
                  <tr className="border-b border-ink/10 text-xs text-slate">
                    {copy.columns.map((c) => (
                      <th key={c} scope="col" className="px-5 py-2.5 text-start font-semibold">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={mono}>
                  {copy.rows.map((r) => (
                    <tr key={r.join("|")} className="border-b border-ink/[0.07] last:border-b-0">
                      {r.map((cell, i) => (
                        <td key={i} className={`px-5 py-3 ${i === 1 ? "font-[family-name:var(--font-body)] font-semibold" : "text-ink/70"}`} dir="auto">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="mt-2 text-xs text-white/45">{copy.tag}</figcaption>
          </figure>
        </div>

        {/* Grouping by project/department */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h3 className="text-2xl font-bold">{projects.heading}</h3>
              <p className="mt-3 text-white/70">{projects.body}</p>
              <p className="mt-3 text-sm text-white/50">{projects.note}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {projects.groups.map((g, i) => (
                <Reveal key={g.name} delay={i * 80} className="rounded-lg border border-white/15 p-4">
                  <p className={`text-xs font-bold uppercase tracking-wide text-brass-lit ${mono} rtl:normal-case`}>{g.name}</p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {g.trips.map((t, j) => (
                      <li key={j} className="text-sm text-white/80" dir="auto">{t}</li>
                    ))}
                  </ul>
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

function Vehicles({ copy, p }: { copy: CorporateCopy["vehicles"]; p: P }) {
  return (
    <section aria-labelledby="corp-vehicles-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="corp-vehicles-heading" className={h2}>{copy.heading}</h2>
        {/* people + luggage + trip type = vehicle */}
        <p className={`mt-6 flex flex-wrap items-center gap-2 text-sm ${mono}`}>
          {copy.formula.map((f, i) => (
            <span key={f} className="flex items-center gap-2">
              <span className={`rounded-md px-3 py-1.5 ${i === copy.formula.length - 1 ? "bg-ink text-white" : "bg-ink/[0.05]"}`}>{f}</span>
              {i < copy.formula.length - 2 && <span className="text-slate">+</span>}
              {i === copy.formula.length - 2 && <span className="text-slate">=</span>}
            </span>
          ))}
        </p>
        <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {copy.rows.map((r) => (
            <li key={r.slug}>
              <Link href={p(`/fleet/${r.slug}`)} className="group grid grid-cols-1 gap-1 py-5 transition-colors sm:grid-cols-[12rem_10rem_1fr_auto] sm:items-center sm:gap-6">
                <span className="text-lg font-bold group-hover:text-sea">{r.name}</span>
                <span className={`text-sm text-slate ${mono}`}>{r.people}</span>
                <span className="text-[0.95rem] text-ink/80">{r.use}</span>
                <span className="hidden text-slate transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 sm:block"><DirArrow /></span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <Link href={p("/vip-luxury-transfer")} className="py-1 text-sea hover:underline">{copy.links.vip} <DirArrow /></Link>
          <Link href={p("/hourly-chauffeur-hire")} className="py-1 text-sea hover:underline">{copy.links.hourly} <DirArrow /></Link>
          <Link href={p("/fleet")} className="py-1 text-sea hover:underline">{copy.links.fleet} <DirArrow /></Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Border({ copy, p }: { copy: CorporateCopy["border"]; p: P }) {
  return (
    <section aria-labelledby="corp-border-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="corp-border-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.body}</p>
          {/* A thin animated corridor line: Bahrain → causeway → Saudi Arabia */}
          <div className="relative mt-8 h-1.5 overflow-hidden rounded-full bg-ink/10" dir="ltr" aria-hidden="true">
            <span className="corridor-run absolute top-0 h-full w-1/5 rounded-full bg-sea" />
          </div>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <Link href={p("/king-fahd-causeway-taxi")} className="py-1 text-sea hover:underline">{copy.links.causeway} <DirArrow /></Link>
            <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="py-1 text-sea hover:underline">{copy.links.documents} <DirArrow /></Link>
          </p>
        </div>
        <ul className="self-center border-t border-ink/10">
          {copy.points.map((pt) => (
            <li key={pt} className="border-b border-ink/10 py-4 text-[0.98rem] text-ink/85">{pt}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Prepare({ copy }: { copy: CorporateCopy["prepare"] }) {
  return (
    <section aria-labelledby="prepare-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="prepare-heading" className={h2}>{copy.heading}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((it) => (
            <li key={it} className="flex items-center gap-3 bg-white px-5 py-4 text-[0.95rem]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-sea text-[11px] text-sea" aria-hidden="true">✓</span>
              {it}
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-3xl">
          <h3 className="font-bold">{copy.unsureHeading}</h3>
          <p className="mt-1.5 text-slate">{copy.unsure}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ScopePricing({ copy }: { copy: CorporateCopy }) {
  const s = copy.scope;
  const pr = copy.pricing;
  return (
    <section aria-labelledby="scope-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{s.eyebrow}</p>
        <h2 id="scope-heading" className={h2}>{s.heading}</h2>
        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-lg ring-1 ring-ink/10 md:grid-cols-2">
          <div className="bg-white p-6 sm:p-8">
            <h3 className="font-bold">{s.yesHeading}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {s.yes.map((y) => (
                <li key={y} className="flex gap-3 text-[0.95rem]">
                  <span className="text-sea" aria-hidden="true">✓</span>
                  {y}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-ink/10 bg-ink/[0.02] p-6 sm:p-8 md:border-s md:border-t-0">
            <h3 className="font-bold text-slate">{s.noHeading}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {s.no.map((n) => (
                <li key={n} className="flex gap-3 text-[0.95rem] text-slate">
                  <span aria-hidden="true">–</span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className={`${label} text-sea`}>{pr.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-bold lg:text-[2rem]">{pr.heading}</h3>
            <p className="mt-3 text-slate">{pr.body}</p>
          </div>
          <div>
            <ul className={`flex flex-wrap gap-2 text-sm ${mono}`}>
              {pr.factors.map((f) => (
                <li key={f} className="rounded-md border border-ink/15 bg-white px-3 py-1.5">
                  <span className="font-[family-name:var(--font-body)]">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-s-2 border-sea ps-4 text-sm text-ink/80">{pr.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Scale({ copy }: { copy: CorporateCopy["scale"] }) {
  return (
    <section aria-labelledby="scale-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="scale-heading" className={h2}>{copy.heading}</h2>
        <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end">
          {copy.tiers.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 120}>
              {/* Bars grow with scale: a quiet visual, not a claim of numbers */}
              <div className="flex h-20 items-end gap-1" aria-hidden="true">
                {Array.from({ length: [3, 6, 11][i] }).map((_, j) => (
                  <span key={j} className="w-2.5 rounded-t-sm bg-sea" style={{ height: `${30 + ((j * 37) % 70)}%`, opacity: 0.35 + i * 0.25 }} />
                ))}
              </div>
              <div className="mt-4 border-t-2 border-ink pt-4">
                <h3 className="text-lg font-bold">{t.title}</h3>
                <p className="mt-1.5 text-[0.95rem] text-slate">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-ink/80">{copy.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy }: { copy: CorporateCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="corp-faq-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="corp-faq-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Enquiry({ copy }: { copy: CorporateCopy["enquiry"] }) {
  return (
    <section id={ENQUIRY} aria-labelledby="enquiry-heading" className="scroll-mt-20 bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
          <h2 id="enquiry-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-white/75 lg:text-lg">{copy.body}</p>
          <a
            href={whatsappHref(copy.secondaryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-md border border-white/25 px-6 text-sm font-semibold hover:border-white/60"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-4 w-4" color="currentColor" />
            {copy.secondary}
          </a>
          <p className="mt-6 text-sm text-white/55">{copy.noPortal}</p>
        </div>
        <CorporateEnquiry copy={copy} />
      </div>
    </section>
  );
}

/** Corporate mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: CorporateCopy["sticky"]; message: string }) {
  return (
    <div
      data-page-sticky
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.5fr_1fr] border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a href={`#${ENQUIRY}`} className="flex items-center justify-center bg-ink px-3 text-center text-sm font-bold text-white">
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
