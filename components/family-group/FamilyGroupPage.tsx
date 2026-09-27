import Link from "next/link";
import type { FamilyGroupCopy } from "@/content/family-group";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { LuggageCalculator } from "@/components/family-group/LuggageCalculator";
import { GroupDetailsForm } from "@/components/family-group/GroupDetailsForm";

type P = (path: string) => string;
const FORM = "group-details";
const label = "text-xs font-bold uppercase tracking-[0.12em] rtl:normal-case rtl:tracking-normal";

export function FamilyGroupPage({ copy, locale }: { copy: FamilyGroupCopy; locale: Locale }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  return (
    <>
      <Hero copy={copy.hero} />
      <Problem copy={copy.problem} />
      <Sizes copy={copy.sizes} p={p} />
      <Luggage copy={copy.luggage} />
      <Trips copy={copy.trips} />
      <Journey copy={copy.journey} p={p} />
      <Pickups copy={copy.pickups} />
      <Routes copy={copy.routes} />
      <Airport copy={copy.airport} />
      <ChildrenShopping copy={copy} />
      <IncludedPricing copy={copy} />
      <Scenarios copy={copy.scenarios} />
      <Checklist copy={copy.checklist} />
      <Faqs copy={copy.faq} />
      <Final copy={copy.final} message={copy.hero.secondaryMessage} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: FamilyGroupCopy["hero"] }) {
  return (
    <section className="bg-sea/[0.05]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 pb-14 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-20 lg:pt-16">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h1 className="mt-4 text-[2.2rem] font-bold leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">{copy.heading}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink/75">{copy.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`#${FORM}`} className="flex h-12 items-center justify-center rounded-input bg-brass px-7 text-base font-bold text-ink transition-colors hover:bg-brass-lit">
              {copy.primary}
            </a>
            <a
              href={whatsappHref(copy.secondaryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-input border border-ink/20 bg-white px-6 text-base font-semibold text-ink hover:border-sea hover:text-sea"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-5 w-5" color="currentColor" />
              {copy.secondary}
            </a>
          </div>
        </div>

        {/* Group snapshot: what the booking is built around, not a form */}
        <aside aria-label={copy.snapshotTitle} className="rounded-[28px] bg-white p-6 shadow-elevation sm:p-8">
          <p className="text-sm font-semibold text-slate">{copy.snapshotTitle}</p>
          <SeatRow />
          <dl className="mt-5 divide-y divide-ink/10">
            {copy.snapshot.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-sm text-slate">{s.label}</dt>
                <dd className="text-end text-[0.95rem] font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

/** Seven seats in one vehicle: a quiet picture of "everyone together". */
function SeatRow() {
  return (
    <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i} className="h-7 flex-1 rounded-t-[10px] rounded-b-md bg-sea/80" style={{ opacity: 1 - i * 0.07 }} />
      ))}
      <span className="ms-1 h-7 w-8 rounded-md border-2 border-dashed border-sea/50" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Problem({ copy }: { copy: FamilyGroupCopy["problem"] }) {
  return (
    <section aria-labelledby="problem-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="problem-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
          <p className="mt-4 text-lg text-slate">{copy.intro}</p>
          <ul className="mt-8 flex flex-col gap-3">
            {copy.items.map((it) => (
              <li key={it} className="flex gap-3 text-[1.02rem] text-ink/85">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate/60" aria-hidden="true" />
                {it}
              </li>
            ))}
          </ul>
        </div>

        {/* Two taxis vs one vehicle */}
        <div className="flex flex-col justify-center gap-4">
          <div className="rounded-card border border-dashed border-ink/20 p-6">
            <p className="font-bold text-slate">{copy.twoCars.title}</p>
            <div className="mt-3 flex gap-2" aria-hidden="true">
              <span className="h-9 w-16 rounded-lg bg-ink/15" />
              <span className="h-9 w-16 rounded-lg bg-ink/15" />
            </div>
            <ul className="mt-4 flex flex-col gap-1 text-sm text-slate">
              {copy.twoCars.lines.map((l) => <li key={l}>✕ {l}</li>)}
            </ul>
          </div>
          <div className="rounded-card bg-ink p-6 text-white">
            <p className="font-bold">{copy.oneVan.title}</p>
            <div className="mt-3" aria-hidden="true">
              <span className="block h-9 w-36 rounded-lg bg-brass-lit" />
            </div>
            <ul className="mt-4 flex flex-col gap-1 text-sm text-white/80">
              {copy.oneVan.lines.map((l) => <li key={l}>✓ {l}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Sizes({ copy, p }: { copy: FamilyGroupCopy["sizes"]; p: P }) {
  return (
    <section aria-labelledby="sizes-heading" className="bg-ink/[0.03] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="sizes-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.intro}</p>

        <ol className="mt-10 flex flex-col gap-3">
          {copy.rows.map((r) => (
            <li key={r.people} className="grid grid-cols-1 gap-4 rounded-card bg-white p-5 sm:grid-cols-[13rem_1fr] sm:items-center sm:p-6 lg:grid-cols-[13rem_1fr_1fr]">
              <div>
                <p className="text-sm font-semibold text-slate">{r.people}</p>
                {/* One dot per seat; the last row shows "more than a van" */}
                <p className="mt-2 flex flex-wrap gap-1" aria-hidden="true">
                  {Array.from({ length: Math.min(r.seats, 7) }).map((_, i) => (
                    <span key={i} className="h-3 w-3 rounded-full bg-sea" />
                  ))}
                  {r.seats > 7 && <span className="text-xs font-bold leading-3 text-sea">+</span>}
                </p>
              </div>
              <div>
                <Link href={p(`/fleet/${r.slug}`)} className="text-xl font-bold text-ink hover:text-sea">
                  {r.vehicle}
                </Link>
                <p className="mt-1 text-sm text-slate">
                  <span className="font-semibold text-ink/80">{copy.bagsLabel}: </span>
                  {r.bags}
                </p>
              </div>
              <p className="text-sm text-slate sm:col-span-2 lg:col-span-1">
                <span className="font-semibold text-ink/80">{copy.bestLabel}: </span>
                {r.best}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-slate">{copy.note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Luggage({ copy }: { copy: FamilyGroupCopy["luggage"] }) {
  return (
    <section aria-labelledby="luggage-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="luggage-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {copy.kinds.map((k) => (
              <li key={k} className="rounded-full bg-ink/[0.05] px-3.5 py-1.5 text-sm text-ink/80">
                {k}
              </li>
            ))}
          </ul>
        </div>
        <LuggageCalculator copy={copy.calc} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Trips({ copy }: { copy: FamilyGroupCopy["trips"] }) {
  return (
    <section aria-labelledby="trips-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="trips-heading" className="mt-3 max-w-2xl text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((t) => (
            <article key={t.title} className="border-t-2 border-ink pt-4">
              <h3 className="text-lg font-bold">{t.title}</h3>
              <p className="mt-2 text-[0.95rem] text-slate">{t.body}</p>
              {t.link && (
                <Link href={withSlash(t.link.href)} className="mt-2 inline-block py-1 text-sm font-semibold text-sea hover:underline">
                  {t.link.label} <DirArrow />
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

function Journey({ copy, p }: { copy: FamilyGroupCopy["journey"]; p: P }) {
  const last = copy.stops.length - 1;
  return (
    <section aria-labelledby="fg-journey-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="fg-journey-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>

        {/* One continuous road; the vehicle never changes along it. */}
        <div className="relative mt-12">
          <div className="absolute bottom-2 start-[11px] top-2 w-1.5 rounded-full bg-ink/[0.08] md:bottom-auto md:end-0 md:start-0 md:top-[9px] md:h-1.5 md:w-auto" aria-hidden="true" />
          <div className="absolute bottom-2 start-[11px] top-2 w-1.5 rounded-full bg-gradient-to-b from-sea/40 to-sea md:bottom-auto md:end-0 md:start-0 md:top-[9px] md:h-1.5 md:w-auto md:bg-gradient-to-r rtl:md:bg-gradient-to-l" aria-hidden="true" />
          <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-3">
            {copy.stops.map((s, i) => (
              <li key={s} className="flex items-center gap-4 md:flex-col md:items-start md:gap-4">
                <span
                  className={`relative z-10 block h-6 w-7 shrink-0 rounded-full border-4 border-white shadow ${i === 0 || i === last ? "bg-ink" : "bg-sea"}`}
                  aria-hidden="true"
                />
                <p className={`font-semibold ${i === 0 || i === last ? "text-ink" : "text-ink/75"}`}>{s}</p>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-3 border-t border-ink/10 pt-8 md:grid-cols-2">
          {copy.notes.map((n) => (
            <li key={n} className="flex gap-3 text-[0.95rem] text-ink/85">
              <Tick />
              {n}
            </li>
          ))}
        </ul>
        <Link href={p("/king-fahd-causeway-taxi")} className="mt-5 inline-block py-1 text-sm font-semibold text-sea hover:underline">
          {copy.causewayLink} <DirArrow />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pickups({ copy }: { copy: FamilyGroupCopy["pickups"] }) {
  return (
    <section aria-labelledby="pickups-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
          <h2 id="pickups-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
          <p className="mt-4 text-white/75 lg:text-lg">{copy.body}</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {copy.rules.map((r) => (
              <li key={r} className="flex gap-3 text-[0.95rem] text-white/85">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-lit" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <ul className="grid grid-cols-1 gap-3 self-center sm:grid-cols-2">
          {copy.examples.map((e, i) => (
            <li key={e} className="rounded-card border border-white/15 p-5">
              <p className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-brass-lit" />
                <span className="h-px w-6 bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-brass-lit" />
                {i === 3 && (
                  <>
                    <span className="h-px w-6 bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-brass-lit" />
                  </>
                )}
              </p>
              <p className="mt-3 font-semibold">{e}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Routes({ copy }: { copy: FamilyGroupCopy["routes"] }) {
  return (
    <section aria-labelledby="fg-routes-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="fg-routes-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {copy.items.map((r) => (
            <li key={r.route} className="border-b border-ink/10 py-5">
              {r.href ? (
                <Link href={withSlash(r.href)} className="group inline-flex items-center gap-2 text-lg font-bold text-ink hover:text-sea">
                  <span dir="auto">{r.route}</span>
                  <span className="text-sea transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                    <DirArrow />
                  </span>
                </Link>
              ) : (
                <p className="text-lg font-bold">{r.route}</p>
              )}
              <p className="mt-1 text-[0.95rem] text-slate">{r.body}</p>
            </li>
          ))}
        </ul>
        <a
          href={whatsappHref(copy.askMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-input border border-ink/20 px-5 text-sm font-semibold hover:border-sea hover:text-sea"
          data-analytics="whatsapp_click"
        >
          <WhatsAppIcon className="h-4 w-4" color="currentColor" />
          {copy.ask}
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Airport({ copy }: { copy: FamilyGroupCopy["airport"] }) {
  return (
    <section aria-labelledby="fg-airport-heading" className="bg-ink/[0.03] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="fg-airport-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.body}</p>
          <ul className="mt-6 flex flex-col">
            {copy.directions.map((d) => (
              <li key={d.href}>
                <Link href={withSlash(d.href)} className="flex min-h-12 items-center justify-between border-b border-ink/10 py-3 font-semibold hover:text-sea">
                  <span dir="auto">{d.label}</span>
                  <DirArrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="self-start rounded-card bg-white p-6 sm:p-8">
          <h3 className="text-sm font-bold uppercase tracking-wide rtl:normal-case">{copy.sendHeading}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {copy.send.map((s) => (
              <li key={s} className="flex gap-3 text-[0.95rem]">
                <Tick />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ChildrenShopping({ copy }: { copy: FamilyGroupCopy }) {
  const panels = [
    { data: copy.children, tone: "bg-sea/[0.07]" },
    { data: copy.shopping, tone: "bg-ink/[0.04]" },
  ];
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-5 lg:grid-cols-2 lg:px-10">
        {panels.map(({ data, tone }) => (
          <article key={data.heading} className={`rounded-[28px] p-7 sm:p-10 ${tone}`}>
            <h2 className="text-2xl font-bold leading-tight lg:text-[1.9rem]">{data.heading}</h2>
            <p className="mt-3 text-slate">{data.body}</p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {data.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[0.95rem] text-ink/85">
                  <Tick />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function IncludedPricing({ copy }: { copy: FamilyGroupCopy }) {
  const inc = copy.included;
  return (
    <section aria-labelledby="included-heading" className="bg-ink/[0.03] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{inc.eyebrow}</p>
        <h2 id="included-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{inc.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-card bg-white p-6 sm:p-8">
            <h3 className="font-bold">{inc.yesHeading}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {inc.yes.map((y) => (
                <li key={y} className="flex gap-3 text-[0.95rem]">
                  <Tick />
                  {y}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-ink/15 p-6 sm:p-8">
            <h3 className="font-bold text-slate">{inc.noHeading}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {inc.no.map((n) => (
                <li key={n} className="flex gap-3 text-[0.95rem] text-slate">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-slate" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold">{copy.pricing.heading}</h3>
            <p className="mt-3 text-slate">{copy.pricing.body}</p>
          </div>
          <div>
            <ul className="flex flex-wrap gap-2">
              {copy.pricing.factors.map((f) => (
                <li key={f} className="rounded-full border border-ink/15 bg-white px-3.5 py-2 text-sm">
                  {f}
                </li>
              ))}
            </ul>
            <a href={`#${FORM}`} className="mt-6 inline-flex h-12 items-center justify-center rounded-input bg-ink px-6 text-sm font-bold text-white hover:bg-ink-soft">
              {copy.checklist.submit}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Scenarios({ copy }: { copy: FamilyGroupCopy["scenarios"] }) {
  return (
    <section aria-labelledby="scenarios-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="scenarios-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {copy.items.map((s) => (
            <article key={s.title} className="flex flex-col rounded-card border border-ink/10 p-6">
              <span className="self-start rounded-md bg-ink/[0.06] px-2 py-0.5 text-xs font-semibold text-slate">{copy.tag}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm font-medium text-sea" dir="auto">{s.route}</p>
              <p className="mt-3 text-[0.95rem] text-slate">{s.body}</p>
              <p className="mt-5 border-t border-ink/10 pt-3 text-sm font-semibold lg:mt-auto">→ {s.vehicle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Checklist({ copy }: { copy: FamilyGroupCopy["checklist"] }) {
  const fields = copy.fields;
  const items = [fields.pickup, fields.destination, fields.date, fields.time, fields.adults, fields.children, fields.large, fields.cabin, `${fields.oneWay} / ${fields.returnTrip}`, fields.extraPickups];
  return (
    <section id={FORM} aria-labelledby="checklist-heading" className="scroll-mt-20 bg-sea/[0.06] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="checklist-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
          <p className="mt-4 text-slate">{copy.intro}</p>
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {items.map((i) => (
              <li key={i} className="flex items-center gap-2 text-[0.95rem]">
                <Tick />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <GroupDetailsForm copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy }: { copy: FamilyGroupCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="fg-faq-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="fg-faq-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.5rem]">{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: FamilyGroupCopy["final"]; message: string }) {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="rounded-[32px] bg-ink px-6 py-12 text-center text-white sm:px-12 lg:py-16">
          <h2 className="text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75 lg:text-lg">{copy.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={`#${FORM}`} className="flex h-12 items-center justify-center rounded-input bg-brass px-7 text-base font-bold text-ink hover:bg-brass-lit">
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
          <p className="mt-5 text-sm text-white/55">{copy.reassurance}</p>
        </div>
      </div>
    </section>
  );
}

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-sea" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
