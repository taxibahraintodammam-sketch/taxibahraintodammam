import Image from "next/image";
import Link from "next/link";
import type { SuvCopy } from "@/content/suv";
import { ROUTE_FARES } from "@/content/fares";
import { sarFromBhd, whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { VehicleChooser } from "@/components/suv/VehicleChooser";
import { SuvRequest } from "@/components/suv/SuvRequest";

type P = (path: string) => string;
const REQUEST = "suv-request";
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.7rem]";
const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";

export function SuvPage({ copy, locale }: { copy: SuvCopy; locale: Locale }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  return (
    <>
      <Hero copy={copy.hero} />
      <Need copy={copy.need} />
      <Compare copy={copy.compare} />
      <Fits copy={copy.fits} />
      <Scenarios copy={copy.scenarios} />
      <Journey copy={copy.journey} p={p} />
      <Feel copy={copy.feel} />
      <Identity copy={copy.identity} />
      <Alternatives copy={copy.alternatives} p={p} />
      <Airport copy={copy.airport} p={p} />
      <Routes copy={copy.routes} p={p} />
      <Pricing copy={copy.pricing} p={p} />
      <Booking copy={copy} p={p} />
      <Documents copy={copy.documents} p={p} />
      <Faqs copy={copy.faq} />
      <Final copy={copy.final} message={copy.hero.secondaryMessage} />
      <StickyBar copy={copy.sticky} message={copy.hero.secondaryMessage} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy }: { copy: SuvCopy["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* Phones: the photo sits above the copy. Desktop: full-bleed behind it. */}
      <div className="relative h-[62vw] max-h-[460px] min-h-[240px] overflow-hidden lg:absolute lg:inset-0 lg:-z-10 lg:h-auto lg:max-h-none">
        <div className="suv-parallax absolute inset-0">
          <Image
            src="/hero/slide-chauffeur.webp"
            alt={copy.imageAlt}
            fill
            priority
            sizes="100vw"
            quality={80}
            className="suv-settle object-cover object-[72%_center] lg:object-[center_40%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/75 lg:to-ink/5 rtl:lg:bg-gradient-to-l" aria-hidden="true" />
      </div>

      <div className={`${wrap} relative pb-12 lg:flex lg:min-h-[640px] lg:flex-col lg:justify-end lg:pb-16 lg:pt-28`}>
        <p className={`${label} -mt-6 text-brass-lit lg:mt-0`}>{copy.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[2.35rem] font-bold leading-[1.05] sm:text-6xl lg:text-[4.3rem]">{copy.heading}</h1>
        <p className="mt-5 max-w-xl text-lg text-white/75">{copy.sub}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`#${REQUEST}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-brass px-7 text-base font-bold text-ink transition-colors hover:bg-brass-lit">
            {copy.primary}
          </a>
          <a
            href={whatsappHref(copy.secondaryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/25 bg-white/5 px-6 text-base font-semibold backdrop-blur transition-colors hover:border-white/60"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.secondary}
          </a>
        </div>

        {/* Spec strip: arrives one value at a time */}
        <div className="mt-12 grid max-w-3xl grid-cols-2 border-t border-white/15 sm:grid-cols-4">
          {copy.specs.map((s, i) => (
            <div key={s.label} className="ledger-row border-b border-white/10 py-4 pe-4 sm:border-b-0" style={{ animationDelay: `${400 + i * 180}ms` }}>
              <p className={`text-3xl font-bold text-white ${mono}`}><span dir="ltr">{s.value}</span></p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/55 rtl:normal-case rtl:tracking-normal">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Route line: drawn once, segment by segment */}
        <div className="mt-8 flex max-w-3xl items-center gap-3 text-xs font-semibold text-white/70 sm:text-sm" aria-label={copy.route.join(" → ")}>
          {copy.route.map((r, i) => (
            <span key={r} className="contents">
              <span className="shrink-0">{r}</span>
              {i < copy.route.length - 1 && (
                <span className="relative h-px flex-1 bg-white/15" aria-hidden="true">
                  <span className="route-draw absolute inset-0 bg-brass-lit" style={{ animationDelay: `${1100 + i * 600}ms` }} />
                </span>
              )}
            </span>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/45">{copy.imageNote}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Need({ copy }: { copy: SuvCopy["need"] }) {
  return (
    <section aria-labelledby="need-heading" className="bg-white py-16 lg:py-28">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="need-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-6 text-xl leading-relaxed text-ink/85">{copy.lead}</p>
          <p className="mt-4 text-slate">{copy.body}</p>
          <div className="mt-10 rounded-lg border border-ink/15 p-5">
            <h3 className="font-bold text-slate">{copy.sedanHeading}</h3>
            <ul className="mt-3 flex flex-col gap-1.5">
              {copy.sedan.map((s) => (
                <li key={s} className="flex gap-2.5 text-[0.95rem] text-ink/80">
                  <span className="text-slate" aria-hidden="true">–</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">{copy.triggersHeading}</h3>
          <ul className="mt-4 border-t border-ink/10">
            {copy.triggers.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 50} className="flex items-baseline gap-4 border-b border-ink/10 py-3.5 text-lg">
                <span className={`w-6 shrink-0 text-xs text-sea ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
                {t}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Compare({ copy }: { copy: SuvCopy["compare"] }) {
  return (
    <section aria-labelledby="compare-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="compare-heading" className={`${h2} max-w-3xl`}>{copy.heading}</h2>
        <p className="mt-4 max-w-2xl text-slate">{copy.intro}</p>
        <VehicleChooser copy={copy} />
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          {copy.rules.map((r) => (
            <p key={r} className="border-s-2 border-sea ps-4 font-semibold">{r}</p>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate">{copy.disclaimer}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Fits({ copy }: { copy: SuvCopy["fits"] }) {
  return (
    <section aria-labelledby="fits-heading" className="bg-white py-16 lg:py-28">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="fits-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-5 text-ink/80 lg:text-lg">{copy.body}</p>
          <p className="mt-6 rounded-lg bg-ink/[0.04] p-5 text-[0.95rem] text-ink/80">{copy.caveat}</p>
        </div>

        {/* Boot, illustrated: three cases slide in, cabin bags follow */}
        <figure>
          <div className="relative rounded-2xl border-2 border-ink bg-ink/[0.02] p-5 sm:p-8">
            <p className={`mb-7 text-[11px] text-slate ${mono}`}>{copy.bootLabel}</p>
            <div className="grid grid-cols-3 items-end gap-3 sm:gap-4">
              {copy.items.map((it, i) => (
                <Reveal key={i} delay={i * 180} className="reveal-x">
                  <div className="relative mx-auto flex h-40 w-full max-w-[120px] flex-col items-center justify-end rounded-xl bg-ink pb-3 text-white sm:h-52">
                    <span className="absolute -top-3 h-3 w-10 rounded-t-md border-2 border-b-0 border-ink" aria-hidden="true" />
                    <span className="absolute inset-y-6 start-1/2 w-px bg-white/15" aria-hidden="true" />
                    <span className={`relative text-2xl font-bold ${mono}`}>{i + 1}</span>
                    <span className="relative mt-1 px-1 text-center text-[11px] leading-tight text-white/65">{it}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={640} className="mt-5 flex items-center gap-3 border-t border-dashed border-ink/25 pt-5">
              <span className="text-2xl font-bold text-sea" aria-hidden="true">+</span>
              <span className="flex items-end gap-1.5" aria-hidden="true">
                <span className="h-8 w-7 rounded-md bg-sea/80" />
                <span className="h-6 w-8 rounded-md bg-sea/50" />
                <span className="h-7 w-5 rounded-md bg-sea/30" />
              </span>
              <span className="text-sm font-semibold">{copy.plus}</span>
            </Reveal>
          </div>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Scenarios({ copy }: { copy: SuvCopy["scenarios"] }) {
  return (
    <section aria-labelledby="scenarios-heading" className="bg-ink py-16 text-white lg:py-28">
      <div className={wrap}>
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h2 id="scenarios-heading" className={h2}>{copy.heading}</h2>
        <ol className="mt-12">
          {copy.items.map((s) => (
            <Reveal
              as="li"
              key={s.key}
              className="grid grid-cols-1 gap-4 border-t border-white/15 py-8 lg:grid-cols-[6rem_0.9fr_1.1fr] lg:gap-10 lg:py-10"
            >
              <span className={`text-4xl font-bold text-brass-lit/80 lg:text-5xl ${mono}`}>{s.key}</span>
              <div>
                <h3 className="text-2xl font-bold">{s.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.manifest.map((m) => (
                    <li key={m} className={`rounded-md border border-white/20 px-2.5 py-1 text-xs text-white/80 ${mono}`} dir="auto">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-white/70 lg:text-[1.05rem] lg:leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Journey({ copy, p }: { copy: SuvCopy["journey"]; p: P }) {
  return (
    <section aria-labelledby="journey-heading" className="bg-white py-16 lg:py-28">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className={`${label} text-sea`}>{copy.eyebrow}</p>
            <h2 id="journey-heading" className={h2}>{copy.heading}</h2>
          </div>
          <p className="self-end text-ink/80 lg:text-lg">{copy.body}</p>
        </div>

        {/* Door to door: vertical on phones, a single line on desktop */}
        <div className="relative mt-14">
          <div className="absolute start-0 end-0 top-[9px] hidden h-0.5 overflow-hidden bg-ink/10 lg:block" dir="ltr" aria-hidden="true">
            <span className="corridor-run absolute top-0 h-full w-1/5 bg-sea" />
          </div>
          <ol className="grid grid-cols-1 gap-0 lg:grid-cols-5 lg:gap-6">
            {copy.stops.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 110} className="relative grid grid-cols-[1.25rem_1fr] gap-4 pb-7 last:pb-0 lg:block lg:pb-0">
                {i < copy.stops.length - 1 && <span className="absolute bottom-0 start-[9px] top-5 w-0.5 bg-ink/10 lg:hidden" aria-hidden="true" />}
                <span
                  className={`relative z-10 mt-0.5 block h-5 w-5 rounded-full border-2 ${i === 0 || i === copy.stops.length - 1 ? "border-ink bg-ink" : "border-sea bg-white"}`}
                  aria-hidden="true"
                />
                <div className="lg:mt-5">
                  <h3 className="font-bold leading-snug">{s.name}</h3>
                  <p className="mt-1 text-sm text-slate">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-slate">{copy.note}</p>
          <Link href={p("/king-fahd-causeway-taxi")} className="shrink-0 py-2.5 text-sm font-semibold text-sea hover:underline">
            {copy.links.causeway} <DirArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Feel({ copy }: { copy: SuvCopy["feel"] }) {
  return (
    <section aria-labelledby="feel-heading" className="bg-sea/[0.05] py-16 lg:py-28">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="feel-heading" className={h2}>{copy.heading}</h2>
        <blockquote className="mt-10 max-w-4xl text-[1.6rem] font-semibold leading-snug text-ink sm:text-3xl lg:text-[2.4rem]">
          <span className="text-sea" aria-hidden="true">“</span>
          {copy.quote}
          <span className="text-sea" aria-hidden="true">”</span>
        </blockquote>
        <dl className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {copy.points.map((pt, i) => (
            <Reveal key={pt.title} delay={(i % 3) * 90}>
              <dt className="flex items-center gap-3 font-bold">
                <span className="h-px w-6 bg-sea" aria-hidden="true" />
                {pt.title}
              </dt>
              <dd className="mt-2 text-[0.95rem] text-ink/75">{pt.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Identity({ copy }: { copy: SuvCopy["identity"] }) {
  return (
    <section aria-labelledby="identity-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="identity-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80 lg:text-lg">{copy.body}</p>
        </div>
        <div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            {copy.vehicles.map((v, i) => (
              <span key={v.name} className="contents">
                <div className="rounded-lg border-2 border-ink px-4 py-6 text-center sm:px-6 sm:py-8">
                  <p className="text-lg font-bold leading-tight sm:text-2xl" dir="auto">{v.name}</p>
                  <p className="mt-1.5 text-xs text-slate sm:text-sm">{v.note}</p>
                </div>
                {i === 0 && <span className={`text-sm text-slate ${mono}`} aria-hidden="true">/</span>}
              </span>
            ))}
          </div>
          <p className="mt-5 rounded-lg bg-brass/15 p-5 text-[0.95rem] text-ink/85">{copy.tahoe}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Alternatives({ copy, p }: { copy: SuvCopy["alternatives"]; p: P }) {
  const duels = [copy.van, copy.luxury];
  return (
    <section aria-labelledby="alt-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="alt-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {duels.map((d) => (
            <Reveal as="article" key={d.title} className="flex flex-col rounded-lg bg-white p-6 ring-1 ring-ink/10 sm:p-8">
              <h3 className="text-xl font-bold">{d.title}</h3>
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-ink/10 ring-1 ring-ink/10">
                <div className="bg-ink p-4 text-white">
                  <p className="text-sm font-bold text-brass-lit">SUV</p>
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                    {d.suv.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
                <div className="bg-white p-4">
                  <p className="text-sm font-bold text-slate">{d.otherName}</p>
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink/80">
                    {d.other.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-[0.95rem] text-ink/80">{d.verdict}</p>
              <Link href={p(`/fleet/${d.slug}`)} className="mt-auto pb-1 pt-4 text-sm font-semibold text-sea hover:underline">
                {d.link} <DirArrow />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Airport({ copy, p }: { copy: SuvCopy["airport"]; p: P }) {
  const links = [
    { href: p("/airport-transfers"), label: copy.links.hub },
    { href: p("/bahrain-airport-to-dammam-taxi"), label: copy.links.bahToDmm },
    { href: p("/dammam-airport-to-bahrain-taxi"), label: copy.links.dmmToBah },
  ];
  return (
    <section aria-labelledby="airport-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="airport-heading" className={h2}>{copy.heading}</h2>
          <p className="mt-4 text-ink/80 lg:text-lg">{copy.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {copy.items.map((it, i) => (
              <Reveal as="li" key={it} delay={i * 70} className="rounded-full bg-ink/[0.05] px-3.5 py-1.5 text-sm font-medium">
                {it}
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-slate">{copy.airports}</p>
        </div>
        <ul className="self-center border-t border-ink/10">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex items-center justify-between gap-4 border-b border-ink/10 py-5 text-lg font-semibold transition-colors hover:text-sea">
                {l.label}
                <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"><DirArrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Routes({ copy, p }: { copy: SuvCopy["routes"]; p: P }) {
  return (
    <section aria-labelledby="routes-heading" className="bg-ink py-16 text-white lg:py-24">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
            <h2 id="routes-heading" className={h2}>{copy.heading}</h2>
          </div>
          <p className="self-end text-white/70 lg:text-lg">{copy.body}</p>
        </div>

        {/* One line out of Bahrain, stops along it: vertical on phones, horizontal on desktop */}
        <div className="relative mt-12">
          <span className="absolute bottom-2 start-[9px] top-2 w-0.5 bg-white/15 lg:bottom-auto lg:end-0 lg:start-0 lg:top-[9px] lg:h-0.5 lg:w-auto" aria-hidden="true" />
          <ol className="relative flex flex-col gap-6 lg:flex-row lg:gap-4">
            <li className="flex items-center gap-4 lg:block lg:flex-1">
              <span className="block h-5 w-5 rounded-full bg-brass-lit ring-4 ring-ink" aria-hidden="true" />
              <span className="text-xl font-bold lg:mt-4 lg:block">{copy.origin}</span>
            </li>
            {copy.stops.map((s) => (
              <li key={s.slug} className="lg:flex-1">
                <Link href={p(`/${s.slug}`)} className="group flex min-h-11 items-center gap-4 lg:block lg:min-h-0">
                  <span className="block h-5 w-5 rounded-full border-2 border-white/50 bg-ink ring-4 ring-ink transition-colors group-hover:border-brass-lit group-hover:bg-brass-lit" aria-hidden="true" />
                  <span className="font-semibold transition-colors group-hover:text-brass-lit lg:mt-4 lg:block">
                    {s.name} <span className="text-white/40"><DirArrow /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 text-sm text-white/60">
          {copy.back}{" "}
          <Link href={p("/taxi-dammam-to-bahrain")} className="font-semibold text-brass-lit hover:underline">
            {copy.backLink}
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pricing({ copy, p }: { copy: SuvCopy["pricing"]; p: P }) {
  const rows = copy.rows
    .map((r) => ({ ...r, bhd: ROUTE_FARES[r.slug]?.find((f) => f.vehicle === "suv")?.bhd }))
    .filter((r): r is typeof r & { bhd: number } => r.bhd !== undefined);
  return (
    <section aria-labelledby="pricing-heading" className="bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="pricing-heading" className={h2}>{copy.heading}</h2>
          <ul className="mt-8 border-t-2 border-ink">
            {rows.map((r) => (
              <li key={r.slug}>
                <Link href={p(`/${r.slug}`)} className="group grid grid-cols-1 gap-1 border-b border-ink/10 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                  <span className="font-semibold group-hover:text-sea" dir="auto">{r.label}</span>
                  <span className={`${mono}`}>
                    <span className="text-sm text-slate">{copy.from} </span>
                    <span className="text-2xl font-bold">BHD {r.bhd}</span>
                    <span className="text-sm text-slate"> / SAR {sarFromBhd(r.bhd).toLocaleString("en-US")}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-ink/80">{copy.note}</p>
          <Link href={p("/fares")} className="mt-3 inline-block py-2.5 text-sm font-semibold text-sea hover:underline">
            {copy.allFares} <DirArrow />
          </Link>
        </div>
        <div className="self-center rounded-lg bg-ink/[0.04] p-6">
          <h3 className="font-bold">{copy.factorsHeading}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {copy.factors.map((f) => (
              <li key={f} className="rounded-md bg-white px-3 py-1.5 text-sm ring-1 ring-ink/10">{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Booking({ copy, p }: { copy: SuvCopy; p: P }) {
  const pr = copy.prepare;
  const b = copy.booking;
  return (
    <section id={REQUEST} aria-labelledby="request-heading" className="scroll-mt-20 bg-ink/[0.035] py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{pr.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold leading-tight lg:text-[2rem]">{pr.heading}</h2>
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {pr.items.map((it) => (
              <li key={it} className="flex items-center gap-3 text-[0.95rem]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-sea text-[11px] text-sea" aria-hidden="true">✓</span>
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-s-2 border-sea ps-4 text-sm text-ink/80">{pr.note}</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-elevation ring-1 ring-ink/10 sm:p-8">
          <p className={`${label} text-sea`}>{b.eyebrow}</p>
          <h2 id="request-heading" className={h2}>{b.heading}</h2>
          <p className="mt-3 text-slate">{b.body}</p>
          <div className="mt-7">
            <SuvRequest copy={b} />
          </div>
          <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a href={whatsappHref(copy.hero.secondaryMessage)} target="_blank" rel="noopener noreferrer" className="py-1 text-sea hover:underline" data-analytics="whatsapp_click">
              {b.orWhatsapp} <DirArrow />
            </a>
            <Link href={p("/booking")} className="py-1 text-sea hover:underline">
              {b.fullBooking} <DirArrow />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Documents({ copy, p }: { copy: SuvCopy["documents"]; p: P }) {
  return (
    <section aria-labelledby="docs-heading" className="bg-white py-16 lg:py-20">
      <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="docs-heading" className="mt-3 text-2xl font-bold leading-tight lg:text-[2rem]">{copy.heading}</h2>
          <p className="mt-4 text-sm text-slate">{copy.note}</p>
          <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="mt-3 inline-block py-2.5 text-sm font-semibold text-sea hover:underline">
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

function Faqs({ copy }: { copy: SuvCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="suv-faq-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="suv-faq-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: SuvCopy["final"]; message: string }) {
  return (
    <section aria-labelledby="final-heading" className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
      <Image src="/hero/slide-chauffeur.webp" alt="" fill sizes="100vw" quality={60} className="-z-10 object-cover object-[80%_center] opacity-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/60 rtl:bg-gradient-to-l" aria-hidden="true" />
      <div className={wrap}>
        <h2 id="final-heading" className="max-w-2xl text-[2.2rem] font-bold leading-tight lg:text-[3.4rem]">{copy.heading}</h2>
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
        <p className={`mt-6 text-sm text-white/55 ${mono}`}>{copy.reassurance}</p>
      </div>
    </section>
  );
}

/** SUV mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: SuvCopy["sticky"]; message: string }) {
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
