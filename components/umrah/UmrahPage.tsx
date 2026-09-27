import Link from "next/link";
import type { UmrahCopy, UmrahMode } from "@/content/umrah";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { UmrahRouteMap } from "@/components/umrah/UmrahRouteMap";
import { UmrahPlanner } from "@/components/umrah/UmrahPlanner";

type P = (path: string) => string;

export function UmrahPage({ copy, locale }: { copy: UmrahCopy; locale: Locale }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  return (
    <>
      <Hero copy={copy} />
      <Modes copy={copy.modes} />
      <Journey copy={copy.journey} />
      <Family copy={copy.family} p={p} />
      <Planning copy={copy.planning} />
      <Border copy={copy.border} p={p} />
      <Dropoff copy={copy.dropoff} />
      <ReturnTrip copy={copy.returnTrip} />
      <Price copy={copy.price} />
      <Plan copy={copy} p={p} />
      <Faqs copy={copy.faq} p={p} />
    </>
  );
}

const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: UmrahCopy }) {
  const h = copy.hero;
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 pb-14 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-20 lg:pt-16">
        <div>
          <p className={`${eyebrow} text-brass-lit`}>{h.eyebrow}</p>
          <h1 className="mt-4 text-[2.2rem] font-bold leading-[1.1] sm:text-5xl lg:text-[3.25rem]">{h.heading}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">{h.sub}</p>
          <p className="mt-5 max-w-xl border-s-2 border-brass-lit/60 ps-4 text-sm text-white/65">{h.honesty}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#plan" className="flex h-12 items-center justify-center rounded-input bg-brass px-7 text-base font-bold text-ink transition-colors hover:bg-brass-lit">
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
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {h.facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brass-lit" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <UmrahRouteMap labels={h.map} className="rounded-card border border-white/10 bg-white/[0.03] p-4 sm:p-6" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Modes({ copy }: { copy: UmrahCopy["modes"] }) {
  const order: UmrahMode[] = ["road", "fly"];
  return (
    <section aria-labelledby="modes-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="modes-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.6rem]">{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.intro}</p>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {order.map((m) => {
            const o = copy.options[m];
            const road = m === "road";
            return (
              <article key={m} className={`flex flex-col rounded-card p-6 sm:p-8 ${road ? "bg-ink text-white" : "border border-ink/15 bg-white"}`}>
                <p className={`${eyebrow} ${road ? "text-brass-lit" : "text-sea"}`}>{o.label}</p>
                <h3 className="mt-2 text-2xl font-bold lg:text-3xl">{o.title}</h3>
                {/* The route in four stops */}
                <ol className={`mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium ${road ? "text-white/80" : "text-ink/80"}`}>
                  {o.route.map((stop, i) => (
                    <li key={stop} className="flex items-center gap-2">
                      {stop}
                      {i < o.route.length - 1 && (
                        <span className={road ? "text-brass-lit" : "text-sea"}>
                          <DirArrow />
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
                <p className={`mt-5 ${road ? "text-white/75" : "text-slate"}`}>{o.body}</p>
                <p className={`mt-6 text-xs font-bold uppercase tracking-wide rtl:normal-case ${road ? "text-white/60" : "text-slate"}`}>{copy.bestFor}</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {o.best.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[0.95rem]">
                      <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${road ? "bg-brass-lit" : "bg-sea"}`} aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className={`mt-6 text-sm ${road ? "text-white/60" : "rounded-input bg-sea/[0.06] p-3 text-ink/80"}`}>{o.note}</p>
                <a
                  href={`#plan-${m}`}
                  className={`mt-6 inline-flex h-12 items-center justify-center rounded-input px-6 text-sm font-bold transition-colors lg:mt-auto lg:self-start ${
                    road ? "bg-brass text-ink hover:bg-brass-lit" : "border border-ink/20 hover:border-sea hover:text-sea"
                  }`}
                >
                  {copy.plan}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Journey({ copy }: { copy: UmrahCopy["journey"] }) {
  const meeqatIndex = 4;
  return (
    <section aria-labelledby="journey-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="journey-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
        </div>
        <ol className="relative">
          {copy.steps.map((step, i) => {
            const last = i === copy.steps.length - 1;
            return (
              <li key={step.title} className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-8 last:pb-0">
                {!last && <span className="absolute bottom-0 start-[21px] top-11 w-px bg-ink/15" aria-hidden="true" />}
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-[family-name:var(--font-mono)] text-sm ${
                    last ? "bg-ink text-white" : "border border-ink/20 bg-white text-ink/70"
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="pt-2">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 text-slate">{step.body}</p>
                  {i === meeqatIndex && (
                    <p className="mt-3 rounded-input border border-sea/20 bg-white p-3 text-sm text-ink/80">{copy.meeqatNote}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Family({ copy, p }: { copy: UmrahCopy["family"]; p: P }) {
  return (
    <section aria-labelledby="family-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="family-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-slate">{copy.intro}</p>

        <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {copy.rows.map((r) => (
            <li key={r.who} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[1fr_1fr_1.3fr] sm:items-center sm:gap-6">
              <span className="font-semibold">{r.who}</span>
              <span>
                {r.slug ? (
                  <Link href={p(`/fleet/${r.slug}`)} className="text-lg font-bold text-sea hover:underline">
                    {r.vehicle}
                  </Link>
                ) : (
                  <span className="text-lg font-bold">{r.vehicle}</span>
                )}
              </span>
              <span className="text-sm text-slate">{r.note}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {copy.notes.map((n) => (
            <div key={n.title}>
              <h3 className="font-bold">{n.title}</h3>
              <p className="mt-1.5 text-[0.95rem] text-slate">{n.body}</p>
            </div>
          ))}
          <div className="rounded-card bg-ink/[0.035] p-5">
            <h3 className="font-bold">{copy.groupsHeading}</h3>
            <p className="mt-1.5 text-[0.95rem] text-slate">{copy.groupsBody}</p>
          </div>
        </div>

        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <Link href={p("/family-van-transfer")} className="py-1 text-sea hover:underline">{copy.links.familyVan} <DirArrow /></Link>
          <Link href={p("/vip-luxury-transfer")} className="py-1 text-sea hover:underline">{copy.links.vip} <DirArrow /></Link>
          <Link href={p("/wheelchair-accessible-transfer")} className="py-1 text-sea hover:underline">{copy.links.wheelchair} <DirArrow /></Link>
          <Link href={p("/fleet")} className="py-1 text-sea hover:underline">{copy.links.fleet} <DirArrow /></Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Planning({ copy }: { copy: UmrahCopy["planning"] }) {
  return (
    <section aria-labelledby="planning-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="max-w-3xl">
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="planning-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.body}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-card bg-white p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wide rtl:normal-case">{copy.tellUsHeading}</h3>
            <ol className="mt-4 flex flex-col gap-2.5">
              {copy.tellUs.map((t, i) => (
                <li key={t} className="flex gap-3 text-[0.95rem]">
                  <span className="w-5 shrink-0 font-[family-name:var(--font-mono)] text-sm text-sea">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-card bg-white p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wide rtl:normal-case">{copy.prepareHeading}</h3>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {copy.prepare.map((item) => (
                <div key={item.title}>
                  <dt className="flex items-center gap-2 font-semibold">
                    <Check />
                    {item.title}
                  </dt>
                  <dd className="mt-0.5 ps-6 text-sm text-slate">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Border({ copy, p }: { copy: UmrahCopy["border"]; p: P }) {
  const col = (heading: string, items: string[], dark: boolean) => (
    <div className={`rounded-card p-6 sm:p-8 ${dark ? "bg-ink text-white" : "border border-ink/15"}`}>
      <h3 className="text-lg font-bold">{heading}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((it) => (
          <li key={it} className={`flex gap-3 text-[0.95rem] ${dark ? "text-white/80" : "text-ink/85"}`}>
            <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-brass-lit" : "bg-sea"}`} aria-hidden="true" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section aria-labelledby="border-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
        <h2 id="border-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {col(copy.driverHeading, copy.driver, true)}
          {col(copy.youHeading, copy.you, false)}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-slate">{copy.note}</p>
        <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <Link href={p("/king-fahd-causeway-taxi")} className="py-1 text-sea hover:underline">{copy.causewayLink} <DirArrow /></Link>
          <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="py-1 text-sea hover:underline">{copy.documentsLink} <DirArrow /></Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Dropoff({ copy }: { copy: UmrahCopy["dropoff"] }) {
  return (
    <section aria-labelledby="dropoff-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className={`${eyebrow} text-brass-lit`}>{copy.eyebrow}</p>
        <h2 id="dropoff-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
        <p className="mt-4 max-w-2xl text-white/75">{copy.body}</p>
        <ol className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-0">
          {copy.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3 md:flex-col md:items-start md:gap-0 md:pe-6">
              <div className="flex items-center gap-3 md:w-full">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass-lit/60 font-[family-name:var(--font-mono)] text-sm text-brass-lit">{i + 1}</span>
                {i < copy.steps.length - 1 && <span className="hidden h-px flex-1 bg-white/20 md:block" aria-hidden="true" />}
              </div>
              <p className="font-semibold md:mt-4">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl rounded-input bg-white/[0.06] p-4 text-sm text-white/85">{copy.ask}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ReturnTrip({ copy }: { copy: UmrahCopy["returnTrip"] }) {
  return (
    <section aria-labelledby="return-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="return-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
          <p className="mt-4 text-sm text-slate">{copy.note}</p>
          <a
            href={whatsappHref(copy.ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-input bg-ink px-6 text-sm font-bold text-white hover:bg-ink-soft"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-4 w-4" color="currentColor" />
            {copy.cta}
          </a>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2">
          {copy.options.map((o, i) => (
            <div key={o.title} className="bg-white p-6 sm:p-8">
              <p className="font-[family-name:var(--font-mono)] text-xs text-sea">{i === 0 ? "A" : "B"}</p>
              <h3 className="mt-1 text-lg font-bold">{o.title}</h3>
              <p className="mt-2 text-[0.95rem] text-slate">{o.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Price({ copy }: { copy: UmrahCopy["price"] }) {
  return (
    <section aria-labelledby="price-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="price-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
          <p className="mt-4 text-slate lg:text-lg">{copy.body}</p>
          <p className="mt-4 text-sm text-ink/80">{copy.included}</p>
          <a href="#plan" className="mt-7 inline-flex h-12 items-center justify-center rounded-input bg-brass px-7 text-base font-bold text-ink transition-colors hover:bg-brass-lit">
            {copy.cta}
          </a>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide rtl:normal-case">{copy.dependsHeading}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {copy.depends.map((d) => (
              <li key={d} className="rounded-pill border border-ink/15 bg-white px-3.5 py-2 text-sm">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Plan({ copy, p }: { copy: UmrahCopy; p: P }) {
  const c = copy.planner;
  return (
    <section id="plan" aria-labelledby="plan-heading" className="scroll-mt-20 bg-ink py-16 text-white lg:py-24">
      {/* Targets for the "Plan this way" links; UmrahPlanner reads the hash to preselect the option. */}
      <span id="plan-road" className="block scroll-mt-20" aria-hidden="true" />
      <span id="plan-fly" className="block scroll-mt-20" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div>
          <p className={`${eyebrow} text-brass-lit`}>{c.eyebrow}</p>
          <h2 id="plan-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{c.heading}</h2>
          <p className="mt-4 text-white/75">{c.intro}</p>
          <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-white/60 rtl:normal-case">{c.confirmHeading}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.confirm.map((x) => (
              <li key={x} className="rounded-pill bg-white/10 px-3.5 py-1.5 text-sm">
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-white/60">
            {c.altLead}{" "}
            <Link href={p("/booking")} className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{c.altBooking}</Link>
            {" · "}
            <Link href={p("/contact")} className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{c.altContact}</Link>
          </p>
        </div>
        <UmrahPlanner copy={c} modes={copy.modes.options} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy, p }: { copy: UmrahCopy["faq"]; p: P }) {
  return (
    <section aria-labelledby="umrah-faq-heading" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className={`${eyebrow} text-sea`}>{copy.eyebrow}</p>
          <h2 id="umrah-faq-heading" className="mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.4rem]">{copy.heading}</h2>
          <Link href={p("/faqs")} className="mt-3 inline-block py-1 text-sm font-semibold text-sea hover:underline">
            {copy.allFaqs} <DirArrow />
          </Link>
        </div>
        <FaqAccordion faqs={copy.items} />
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-sea" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
