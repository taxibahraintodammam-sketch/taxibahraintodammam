import Image from "next/image";
import Link from "next/link";
import type { CausewayCopy } from "@/content/causeway";
import { whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { BridgeSvg } from "@/components/causeway/BridgeSvg";
import { CrossingPlanner, CrossingJourney, GroupTool, RouteBranches, CrossChecklist, type Branch } from "@/components/causeway/CausewayWidgets";

type P = (path: string) => string;
const PLAN = "plan-crossing";
const mono = "font-[family-name:var(--font-mono)]";
const label = "text-xs font-bold uppercase tracking-[0.14em] rtl:normal-case rtl:tracking-normal";
const h2 = "mt-3 text-[1.9rem] font-bold leading-tight lg:text-[2.7rem]";
const wrap = "mx-auto max-w-[1200px] px-5 lg:px-10";

export function CausewayPage({ copy, locale, branches }: { copy: CausewayCopy; locale: Locale; branches: Branch[] }) {
  const p: P = (path) => withSlash(locale === "ar" ? `/ar${path}` : path);
  const wa = copy.hero.secondaryMessage;
  const labels = { shoreA: copy.hero.shoreA, shoreB: copy.hero.shoreB, island: copy.hero.island, postA: copy.hero.postA, postB: copy.hero.postB };
  return (
    <>
      <Hero copy={copy.hero} labels={labels} />
      <Plan copy={copy.plan} />
      <Journey copy={copy.journey} labels={labels} />
      <Bridge copy={copy.bridge} />
      <Checkpoints copy={copy.checkpoints} p={p} />
      <Roles copy={copy.roles} p={p} />
      <Timing copy={copy.timing} />
      <OneVehicle copy={copy.oneVehicle} />
      <Vehicles copy={copy.vehicle} p={p} />
      <Routes copy={copy.routes} branches={branches} p={p} />
      <Fare copy={copy.fare} p={p} />
      <Book copy={copy.book} />
      <Walk copy={copy.walk} />
      <Faqs copy={copy.faq} />
      <Final copy={copy.final} message={wa} />
      <StickyBar copy={copy.sticky} message={wa} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ copy, labels }: { copy: CausewayCopy["hero"]; labels: Parameters<typeof BridgeSvg>[0]["labels"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image src="/hero/slide-causeway.webp" alt={copy.imageAlt} fill priority sizes="100vw" quality={80} className="-z-10 object-cover object-[50%_58%] opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" aria-hidden="true" />
      <div className={`${wrap} pb-12 pt-14 text-center lg:pb-16 lg:pt-24`}>
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-[2.5rem] font-bold leading-[1.02] sm:text-6xl lg:text-[5rem]">{copy.heading}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">{copy.sub}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={`#${PLAN}`} className="flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-brass px-7 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit">
            {copy.primary}
          </a>
          <a
            href={whatsappHref(copy.secondaryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/30 bg-ink/30 px-6 text-base font-semibold backdrop-blur transition-colors hover:border-white/60"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {copy.secondary}
          </a>
        </div>
        {/* The bridge, with one car crossing it once */}
        <figure className="mx-auto mt-14 max-w-5xl">
          <BridgeSvg labels={labels} animate />
          {/* Phones: the same route, readable */}
          <ol className="mt-5 flex flex-col items-center gap-1 text-sm font-semibold md:hidden">
            {[labels.shoreA, labels.postA, "King Fahd Causeway", labels.postB, labels.shoreB].map((s, i) => (
              <li key={s} className="flex flex-col items-center gap-1">
                <span className={i === 0 || i === 4 ? "text-base font-bold" : i === 2 ? "text-brass-lit" : "text-white/75"}>{i === 2 ? copy.causewayName : s}</span>
                {i < 4 && <span className="h-3 w-px bg-white/30" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <figcaption className="mt-2 flex flex-wrap justify-between gap-2 text-[11px] text-white/45">
            <span className="font-semibold uppercase tracking-wider text-brass-lit rtl:normal-case">{copy.label}</span>
            <span>{copy.illustration}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Plan({ copy }: { copy: CausewayCopy["plan"] }) {
  return (
    <section id={PLAN} aria-labelledby="plan-heading" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className={`${wrap} grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
        <div>
          <p className={`${label} text-sea`}>{copy.eyebrow}</p>
          <h2 id="plan-heading" className={h2}>{copy.heading}</h2>
        </div>
        <CrossingPlanner copy={copy} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Journey({ copy, labels }: { copy: CausewayCopy["journey"]; labels: Parameters<typeof BridgeSvg>[0]["labels"] }) {
  return (
    <section aria-labelledby="journey-heading" className="bg-ink py-16 text-white lg:py-28">
      <div className={wrap}>
        <p className={`${label} text-brass-lit`}>{copy.eyebrow}</p>
        <h2 id="journey-heading" className={`${h2} lg:text-[3.1rem]`}>{copy.heading}</h2>
        <p className="mt-3 max-w-2xl text-white/65">{copy.intro}</p>
        <CrossingJourney copy={copy} labels={labels} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Bridge({ copy }: { copy: CausewayCopy["bridge"] }) {
  return (
    <section aria-labelledby="bridge-heading" className="bg-white py-16 lg:py-28">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="bridge-heading" className={`${h2} max-w-3xl`}>{copy.heading}</h2>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className={`text-[7rem] font-bold leading-none tracking-tight lg:text-[10rem] ${mono}`}>
              {copy.km}
              <span className="ms-2 text-4xl lg:text-6xl">{copy.kmUnit}</span>
            </p>
            <p className="mt-2 text-lg font-semibold">{copy.kmLabel}</p>
            <p className="mt-1 text-lg text-sea">{copy.plus}</p>
            <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-ink/10 pt-6 text-sm sm:grid-cols-3">
              {copy.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-slate">{f.label}</dt>
                  <dd className="mt-0.5 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div>
            {copy.body.map((b, i) => (
              <p key={i} className={`${i ? "mt-4" : ""} text-lg leading-relaxed ${i === 0 ? "text-ink" : "text-ink/75"}`}>{b}</p>
            ))}
            <p className="mt-8 text-sm font-semibold text-slate">{copy.layersLabel}</p>
            <ol className="mt-3 flex flex-col gap-1" dir="ltr">
              {copy.layers.map((l, i) => (
                <Reveal
                  as="li"
                  key={l}
                  delay={i * 90}
                  className={`flex items-center rounded-md px-4 py-3 text-sm font-semibold ${i === 2 ? "bg-sea text-white" : i === 1 || i === 3 ? "bg-ink text-white" : "bg-ink/[0.05]"}`}
                  >
                  <span dir="auto">{l}</span>
                </Reveal>
              ))}
            </ol>
            <p className="mt-5 border-s-2 border-sea ps-4 font-bold">{copy.notSame}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Checkpoints({ copy, p }: { copy: CausewayCopy["checkpoints"]; p: P }) {
  return (
    <section aria-labelledby="cp-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="cp-heading" className={h2}>{copy.heading}</h2>
        {/* Each trip lights up the checkpoints it uses */}
        {/* Phones: one row per trip, the four checkpoints as marks */}
        <ul className="mt-8 flex flex-col gap-3 md:hidden">
          {copy.trips.map((t) => (
            <li key={t.label} className="rounded-lg bg-white p-4 ring-1 ring-ink/10">
              <p className="font-bold">{t.label}</p>
              <p className="mt-0.5 text-sm text-slate">{t.body}</p>
              <ol className="mt-3 grid grid-cols-4 gap-1 text-center text-[10px] font-semibold">
                {copy.items.map((c, i) => (
                  <li key={c.n} className={`rounded px-1 py-1.5 ${t.uses.includes(i) ? "bg-sea text-white" : "bg-ink/[0.04] text-ink/40"}`}>
                    {c.name}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
        <div className="mt-10 hidden md:block">
          <table className="w-full text-start text-sm">
            <thead>
              <tr>
                <th scope="col" className="w-1/3 pb-4 text-start" />
                {copy.items.map((c) => (
                  <th key={c.n} scope="col" className="pb-4 text-center">
                    <span className={`block text-3xl font-bold ${mono}`}>{c.n}</span>
                    <span className="mt-1 block text-xs font-semibold text-slate">{c.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copy.trips.map((t) => (
                <tr key={t.label} className="border-t border-ink/10">
                  <th scope="row" className="py-4 pe-4 text-start align-top font-normal">
                    <span className="block font-bold">{t.label}</span>
                    <span className="mt-0.5 block text-slate">{t.body}</span>
                  </th>
                  {copy.items.map((_, i) => (
                    <td key={i} className="py-4 text-center align-middle">
                      <span className={`mx-auto block h-4 w-4 rounded-sm ${t.uses.includes(i) ? "bg-sea" : "ring-1 ring-inset ring-ink/15"}`} aria-label={t.uses.includes(i) ? "✓" : "—"} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-slate">{copy.note}</p>
          <Link href={p("/visa-u-turn-service")} className="shrink-0 py-2 text-sm font-semibold text-sea hover:underline">{copy.uturnLink} <DirArrow /></Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Roles({ copy, p }: { copy: CausewayCopy["roles"]; p: P }) {
  const r = copy.reality;
  return (
    <section aria-labelledby="roles-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="roles-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-xl md:grid-cols-2">
          <Reveal className="reveal-xl bg-sea/[0.08] p-6 sm:p-10">
            <p className="text-2xl font-bold">{copy.youLabel}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {copy.you.map((x) => <li key={x} className="flex gap-3"><span className="text-sea" aria-hidden="true">●</span>{x}</li>)}
            </ul>
          </Reveal>
          <Reveal className="reveal-x bg-ink p-6 text-white sm:p-10">
            <p className="text-2xl font-bold">{copy.driverLabel}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {copy.driver.map((x) => <li key={x} className="flex gap-3"><span className="text-brass-lit" aria-hidden="true">✓</span>{x}</li>)}
            </ul>
          </Reveal>
        </div>
        <p className="mt-5 max-w-3xl text-ink/80">{copy.body}</p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="rounded-xl border-2 border-ink p-6 sm:p-8">
            <h3 className="text-2xl font-bold">{copy.visa.heading}</h3>
            <p className="mt-3 text-ink/80">{copy.visa.body}</p>
            <Link href={p("/blog/documents-required-bahrain-to-saudi-by-road")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.link} <DirArrow /></Link>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{r.heading}</h3>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-bold text-slate">{r.dontLabel}</p>
                <ul className="mt-2 flex flex-col gap-2">{r.dont.map((x) => <li key={x} className="text-ink/60"><span className="me-2" aria-hidden="true">×</span>{x}</li>)}</ul>
              </div>
              <div>
                <p className="text-sm font-bold text-sea">{r.doLabel}</p>
                <ul className="mt-2 flex flex-col gap-2">{r.do.map((x) => <li key={x} className="font-semibold"><span className="me-2 text-sea" aria-hidden="true">✓</span>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Timing({ copy }: { copy: CausewayCopy["timing"] }) {
  return (
    <section aria-labelledby="timing-heading" className="bg-sea/[0.05] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="timing-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-6 text-xl font-bold lg:text-2xl">{copy.reference}</p>
        <p className="mt-1 text-sea">{copy.referenceNote}</p>

        {/* Variability, not precision: widths only suggest "more" */}
        <div className="mt-8 flex flex-col gap-2">
          {copy.scale.map((s, i) => (
            <Reveal key={s.label} delay={i * 120} className="grid grid-cols-[6rem_1fr] items-center gap-4">
              <span className="font-bold">{s.label}</span>
              <span className="flex items-center gap-3">
                <span className={`h-3 rounded-full ${["w-1/4 bg-sea/50", "w-1/2 bg-sea", "w-5/6 bg-[repeating-linear-gradient(90deg,var(--color-sea)_0_10px,transparent_10px_14px)]"][i]}`} aria-hidden="true" />
                <span className="hidden text-sm text-slate sm:inline">{s.body}</span>
              </span>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate">{copy.causes}</p>

        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-ink/10 pt-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold">{copy.busyHeading}</h3>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {copy.busy.map((b, i) => (
                <li key={b.when} className={`rounded-lg p-4 ${i < 3 ? "bg-white ring-1 ring-ink/10" : "bg-ink/[0.04]"}`}>
                  <p className="font-bold">{b.when}</p>
                  <p className={`mt-1 text-sm ${i < 3 ? "text-sea" : "text-slate"}`}>{b.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink/75">{copy.busyNote}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{copy.clockHeading}</h3>
            <div className="mt-5 h-3 rounded-full bg-[linear-gradient(90deg,#0d0d0d_0%,#14213d_16%,#d99a55_30%,#f5d9a8_50%,#d99a55_72%,#14213d_86%,#0d0d0d_100%)]" aria-hidden="true" />
            <ol className={`mt-2 grid grid-cols-6 text-center text-[11px] text-slate sm:text-xs ${mono}`} dir="ltr">
              {copy.hours.map((h) => <li key={h}>{h}</li>)}
            </ol>
            <p className="mt-4 text-ink/80">{copy.clockBody}</p>
            <div className="mt-6 rounded-lg bg-ink p-5 text-white">
              <p className="font-bold">{copy.night.heading}</p>
              <p className="mt-1.5 text-sm text-white/75">{copy.night.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function OneVehicle({ copy }: { copy: CausewayCopy["oneVehicle"] }) {
  return (
    <section aria-labelledby="one-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="one-heading" className={h2}>{copy.heading}</h2>
        <p className="mt-4 max-w-3xl text-ink/80 lg:text-lg">{copy.body}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {copy.who.map((w) => <li key={w} className="rounded-md bg-ink/[0.05] px-3 py-1.5 text-sm">{w}</li>)}
        </ul>
        <div className="mt-10 grid grid-cols-1 gap-4">
          {[
            { l: copy.withoutLabel, s: copy.without, dark: false },
            { l: copy.withLabel, s: copy.with, dark: true },
          ].map((row) => (
            <Reveal key={row.l} className={`rounded-xl p-5 sm:p-6 ${row.dark ? "bg-ink text-white" : "border border-dashed border-ink/25"}`}>
              <p className={`text-sm font-bold ${row.dark ? "text-brass-lit" : "text-slate"}`}>{row.l}</p>
              <ol className="mt-4 flex flex-wrap items-center gap-2">
                {row.s.map((x, i) => (
                  <li key={`${x}-${i}`} className="flex items-center gap-2">
                    <span className={`rounded-md px-3 py-1.5 text-sm font-semibold ${row.dark ? "bg-white/10" : i === 2 || i === 3 ? "bg-danger/10 text-danger" : "bg-ink/[0.05] text-ink/70"}`}>{x}</span>
                    {i < row.s.length - 1 && (row.dark ? <span className="h-px w-6 bg-brass-lit" aria-hidden="true" /> : <span className="text-ink/30" aria-hidden="true">·</span>)}
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Vehicles({ copy, p }: { copy: CausewayCopy["vehicle"]; p: P }) {
  return (
    <section aria-labelledby="veh-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="veh-heading" className={h2}>{copy.heading}</h2>
        <GroupTool copy={copy} />
        <Link href={p("/fleet")} className="mt-3 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.fleet} <DirArrow /></Link>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h3 className="text-xl font-bold">{copy.family.heading}</h3>
            <p className="mt-2 text-ink/80">{copy.family.body}</p>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="text-xl font-bold">{copy.business.heading}</h3>
            <p className="mt-2 text-ink/80">{copy.business.body}</p>
            <Link href={p("/corporate-accounts")} className="mt-2 inline-block py-2 text-sm font-semibold text-sea hover:underline">{copy.business.link} <DirArrow /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Routes({ copy, branches, p }: { copy: CausewayCopy["routes"]; branches: Branch[]; p: P }) {
  const a = copy.airport;
  return (
    <section aria-labelledby="routes-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="routes-heading" className={h2}>{copy.heading}</h2>
        {/* The shared trunk */}
        <ol className="mt-8 flex flex-wrap items-center gap-2" dir="ltr">
          {copy.trunk.map((t, i) => (
            <li key={t} className="flex items-center gap-2">
              <span className={`rounded-md px-3.5 py-2 text-sm font-bold ${i === 2 ? "bg-sea text-white" : "bg-ink text-white"}`} dir="auto">{t}</span>
              <span className="h-0.5 w-6 bg-ink/30" aria-hidden="true" />
            </li>
          ))}
          <li className="text-sm font-semibold text-slate" aria-hidden="true">⋯</li>
        </ol>
        <p className="mt-4 max-w-2xl text-ink/80">{copy.intro}</p>
        <RouteBranches copy={copy} branches={branches} />
        <p className="mt-6 text-sm text-slate">
          {copy.reverse}{" "}
          <Link href={p("/taxi-dammam-to-bahrain")} className="font-semibold text-sea hover:underline">{copy.reverseLinks.dammam}</Link>
          {" · "}
          <Link href={p("/taxi-khobar-to-bahrain")} className="font-semibold text-sea hover:underline">{copy.reverseLinks.khobar}</Link>
        </p>

        {/* Airport timing */}
        <div className="mt-16 rounded-xl bg-ink p-6 text-white sm:p-10">
          <h3 className="text-2xl font-bold lg:text-[2rem]">{a.heading}</h3>
          <p className="mt-2 text-white/70">{a.body}</p>
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { ...a.toDmm, href: p("/bahrain-to-dammam-airport-taxi") },
              { ...a.fromBah, href: p("/bahrain-airport-to-dammam-taxi") },
            ].map((x) => (
              <Link key={x.href} href={x.href} className="group rounded-lg bg-white/[0.06] p-5 transition-colors hover:bg-white/[0.12]">
                <p className="font-bold group-hover:text-brass-lit">{x.label} <DirArrow /></p>
                <p className="mt-1 text-sm text-white/65">{x.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Fare({ copy, p }: { copy: CausewayCopy["fare"]; p: P }) {
  return (
    <section aria-labelledby="fare-heading" className="bg-ink/[0.035] py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="fare-heading" className={h2}>{copy.heading}</h2>
        {/* The fare, assembled piece by piece */}
        <ol className="mt-8 flex flex-wrap items-center gap-2">
          {copy.parts.map((x, i) => (
            <Reveal as="li" key={x} delay={i * 90} className="flex items-center gap-2">
              <span className={`rounded-md px-3.5 py-2 text-sm font-semibold ${i === 3 ? "bg-sea text-white" : "bg-white ring-1 ring-ink/10"}`}>{x}</span>
              <span className="text-ink/30" aria-hidden="true">{i < copy.parts.length - 1 ? "+" : "="}</span>
            </Reveal>
          ))}
          <Reveal as="li" delay={copy.parts.length * 90}>
            <span className="rounded-md bg-ink px-3.5 py-2 text-sm font-bold text-white">{copy.confirmed}</span>
          </Reveal>
        </ol>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-bold">{copy.dependsLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {copy.depends.map((d) => <li key={d} className="rounded-md bg-white px-3 py-1.5 text-sm ring-1 ring-ink/10">{d}</li>)}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href={`#${PLAN}`} className="inline-flex h-12 items-center rounded-md bg-ink px-6 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft">{copy.cta}</a>
              <Link href={p("/fares")} className="py-2 text-sm font-semibold text-sea hover:underline">{copy.allFares} <DirArrow /></Link>
            </div>
          </div>
          <div className="self-start rounded-xl border-2 border-sea bg-white p-6">
            <p className="text-xl font-bold">{copy.toll.heading}</p>
            <p className="mt-2 text-ink/80">{copy.toll.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Book({ copy }: { copy: CausewayCopy["book"] }) {
  const msg = copy.customer.join("\n");
  return (
    <section aria-labelledby="book-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="book-heading" className={h2}>{copy.heading}</h2>
        {/* Steps laid along a road line */}
        <ol className="relative mt-10 grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-3">
          <span className="absolute left-0 right-0 top-4 hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_14px,transparent_14px_24px)] opacity-20 md:block" aria-hidden="true" />
          {copy.steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90} className="relative">
              <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${mono} ${i === 4 ? "bg-sea text-white" : "bg-ink text-white"}`}>{s.n}</span>
              <p className="mt-3 font-bold">{s.title}</p>
              <p className="mt-1 text-sm text-slate">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold">{copy.checklist.heading}</h3>
            <div className="mt-5">
              <CrossChecklist copy={copy.checklist} />
            </div>
          </div>
          <figure className="self-start rounded-2xl bg-[#e5ddd5] p-4 sm:p-5">
            <figcaption className={`mb-3 text-center text-[10px] font-semibold uppercase tracking-wide text-ink/50 ${mono} rtl:normal-case`}>{copy.previewTag} · {copy.exampleOnly}</figcaption>
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
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Walk({ copy }: { copy: CausewayCopy["walk"] }) {
  return (
    <section aria-labelledby="walk-heading" className="bg-sea py-10 text-white">
      <div className={`${wrap} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
        <div>
          <h2 id="walk-heading" className="text-xl font-bold">{copy.heading}</h2>
          <p className="mt-1 text-white/85">{copy.body}</p>
        </div>
        <a href={`#${PLAN}`} className="shrink-0 py-2 font-semibold underline-offset-4 hover:underline">{copy.cta} <DirArrow /></a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ copy }: { copy: CausewayCopy["faq"] }) {
  const half = Math.ceil(copy.items.length / 2);
  return (
    <section aria-labelledby="cfaq-heading" className="bg-white py-16 lg:py-24">
      <div className={wrap}>
        <p className={`${label} text-sea`}>{copy.eyebrow}</p>
        <h2 id="cfaq-heading" className={h2}>{copy.heading}</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <FaqAccordion faqs={copy.items.slice(0, half)} />
          <FaqAccordion faqs={copy.items.slice(half)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Final({ copy, message }: { copy: CausewayCopy["final"]; message: string }) {
  return (
    <section aria-labelledby="cfinal-heading" className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
      <Image src="/hero/slide-causeway.webp" alt="" fill sizes="100vw" quality={60} className="-z-10 object-cover object-[50%_60%] opacity-25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40" aria-hidden="true" />
      <div className={`${wrap} text-center`}>
        <h2 id="cfinal-heading" className="mx-auto max-w-3xl text-[2.2rem] font-bold leading-tight lg:text-[3.4rem]">{copy.heading}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">{copy.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
    </section>
  );
}

/** Causeway mobile bar; replaces the site-wide one on this page (see globals.css). */
function StickyBar({ copy, message }: { copy: CausewayCopy["sticky"]; message: string }) {
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
