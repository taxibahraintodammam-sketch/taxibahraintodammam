"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { UturnCopy } from "@/content/uturn";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { DirArrow } from "@/components/ui/DirArrow";

const mono = "font-[family-name:var(--font-mono)]";
const openWa = (msg: string) => window.open(whatsappHref(msg), "_blank", "noopener,noreferrer");

/* ------------------------------------------------------------------ */
/* Hero: "Plan my U-turn" → structured WhatsApp message                */

export function PlanForm({ copy }: { copy: UturnCopy["plan"] }) {
  const id = useId();
  const f = copy.fields;
  const [v, setV] = useState({ pickup: "", date: "", time: "", passengers: "" });
  const [vehicle, setVehicle] = useState(copy.vehicles[0]);
  const [stay, setStay] = useState(copy.stays[0]);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));
  const or = (x: string) => x.trim() || copy.notSet;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    openWa(
      [
        copy.messageIntro,
        `${f.pickup}: ${or(v.pickup)}`,
        `${f.date}: ${or(v.date)}`,
        `${f.time}: ${or(v.time)}`,
        `${f.passengers}: ${or(v.passengers)}`,
        `${f.vehicle}: ${vehicle}`,
        `${f.stay}: ${stay}`,
      ].join("\n")
    );
  }

  const field =
    "h-12 w-full rounded-md border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-sea sm:text-sm";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="grid grid-cols-2 gap-3.5">
      <Field label={f.pickup} htmlFor={`${id}-pickup`} wide>
        <input id={`${id}-pickup`} value={v.pickup} onChange={set("pickup")} placeholder={f.pickupPlaceholder} className={field} />
      </Field>
      <Field label={f.date} htmlFor={`${id}-date`}>
        <input id={`${id}-date`} type="date" value={v.date} onChange={set("date")} className={field} />
      </Field>
      <Field label={f.time} htmlFor={`${id}-time`}>
        <input id={`${id}-time`} type="time" value={v.time} onChange={set("time")} className={field} />
      </Field>
      <Field label={f.passengers} htmlFor={`${id}-passengers`}>
        <input id={`${id}-passengers`} inputMode="numeric" value={v.passengers} onChange={set("passengers")} className={field} />
      </Field>
      <Field label={f.vehicle} htmlFor={`${id}-vehicle`}>
        <select id={`${id}-vehicle`} value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={field}>
          {copy.vehicles.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <fieldset className="col-span-2">
        <legend className="text-sm font-medium text-ink/80">{f.stay}</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {copy.stays.map((s) => (
            <label key={s} className={`flex min-h-11 cursor-pointer items-center rounded-md px-3 py-2 text-sm transition-colors ${stay === s ? "bg-ink text-white" : "bg-ink/[0.04] hover:bg-ink/[0.08]"}`}>
              <input type="radio" name={`${id}-stay`} value={s} checked={stay === s} onChange={() => setStay(s)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        className="col-span-2 mt-1 flex h-[52px] items-center justify-center gap-2 rounded-md bg-brass px-6 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon className="h-5 w-5" color="currentColor" />
        {copy.submit}
      </button>
      <p className="col-span-2 text-xs text-slate">{copy.note}</p>
    </form>
  );
}

function Field({ label, htmlFor, wide, children }: { label: string; htmlFor: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${wide ? "col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink/80">{label}</label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Saudi-side stay selector                                             */

export function StayChooser({ copy, planHref, hourlyHref }: { copy: UturnCopy["stay"]; planHref: string; hourlyHref: string }) {
  const [active, setActive] = useState(0);
  const opt = copy.options[active];
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <div role="radiogroup" aria-label={copy.heading} className="flex flex-col gap-2">
        {copy.options.map((o, i) => (
          <button
            key={o.key}
            type="button"
            role="radio"
            aria-checked={i === active}
            onClick={() => setActive(i)}
            className={`flex min-h-14 items-center gap-4 rounded-lg px-5 text-start font-semibold transition-colors ${i === active ? "bg-ink text-white" : "bg-white ring-1 ring-ink/15 hover:ring-ink/40"}`}
          >
            <span className={`text-sm ${mono} ${i === active ? "text-brass-lit" : "text-slate"}`}>{o.key.toUpperCase()}</span>
            {o.label}
          </button>
        ))}
      </div>
      <div key={opt.key} className="ledger-row flex flex-col rounded-xl bg-white p-6 ring-1 ring-ink/10 sm:p-8" aria-live="polite">
        {/* How far the car goes on the Saudi side: a longer loop for a longer stay */}
        <svg viewBox="0 0 240 60" className="h-12 w-48 text-sea" aria-hidden="true" style={{ direction: "ltr" }}>
          <path d="M10 20 H 150" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" fill="none" />
          <path d="M10 44 H 150" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" fill="none" />
          <path d={`M150 20 H ${150 + active * 25} A 12 12 0 0 1 ${150 + active * 25} 44 H 150`} stroke="currentColor" strokeWidth="3" fill="none" className="transition-all duration-500" />
        </svg>
        <p className="mt-4 text-xl font-bold">{opt.label}</p>
        <p className="mt-2 text-ink/80">{opt.body}</p>
        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-6 text-sm font-semibold">
          <a href={planHref} className="py-2 text-sea hover:underline">{copy.cta} <DirArrow /></a>
          {opt.key === "d" && <Link href={hourlyHref} className="py-2 text-sea hover:underline">{copy.hourly} <DirArrow /></Link>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vehicle: three classes + "not sure?" people/bags counter             */

export function VehicleCounter({ copy, fares }: { copy: UturnCopy["vehicle"]; fares: Record<string, number | undefined> }) {
  const [people, setPeople] = useState(1);
  const [bags, setBags] = useState(1);
  const pick = copy.classes.find((c) => people <= c.people && bags <= c.bags);

  const step = (label: string, value: number, set: (n: number) => void, max: number) => (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-semibold">{label}</span>
      <span className="flex items-center gap-2">
        <button type="button" onClick={() => set(Math.max(label === copy.passengers ? 1 : 0, value - 1))} className="h-11 w-11 rounded-md bg-white text-xl ring-1 ring-ink/15 hover:ring-ink/40" aria-label={`${label} −`}>−</button>
        <output className={`w-7 text-center text-xl font-bold ${mono}`}>{value}</output>
        <button type="button" onClick={() => set(Math.min(max, value + 1))} className="h-11 w-11 rounded-md bg-white text-xl ring-1 ring-ink/15 hover:ring-ink/40" aria-label={`${label} +`}>+</button>
      </span>
    </div>
  );

  return (
    <div className="mt-10">
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-ink/10 ring-1 ring-ink/10 md:grid-cols-3">
        {copy.classes.map((c) => {
          const on = pick?.key === c.key;
          const fare = fares[c.key];
          return (
            <li key={c.key} className={`flex flex-col p-6 transition-colors duration-300 ${on ? "bg-ink text-white" : "bg-white"}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-2xl font-bold">{c.name}</p>
                {on && <span className="rounded-full bg-brass-lit px-2.5 py-0.5 text-xs font-bold text-ink">{copy.recommend}</span>}
              </div>
              <p className={`mt-1 text-sm ${on ? "text-white/60" : "text-slate"}`}>{c.model}</p>
              {/* Seats and bag slots at a glance */}
              <div className="mt-4 flex flex-col gap-2" aria-hidden="true">
                <span className="flex gap-1">{Array.from({ length: c.people }).map((_, i) => <span key={i} className={`h-3 w-3 rounded-full ${i < people ? (on ? "bg-brass-lit" : "bg-ink/70") : on ? "ring-1 ring-inset ring-white/30" : "ring-1 ring-inset ring-ink/20"}`} />)}</span>
                <span className="flex gap-1">{Array.from({ length: c.bags }).map((_, i) => <span key={i} className={`h-4 w-3 rounded-[3px] ${i < bags ? (on ? "bg-brass-lit" : "bg-ink/70") : on ? "ring-1 ring-inset ring-white/30" : "ring-1 ring-inset ring-ink/20"}`} />)}</span>
              </div>
              <ul className={`mt-4 flex flex-col gap-1 text-sm ${on ? "text-white/85" : "text-ink/80"}`}>
                {c.best.map((b) => <li key={b}>{b}</li>)}
              </ul>
              {fare !== undefined && (
                <p className={`mt-auto pt-5 ${mono} ${on ? "text-brass-lit" : "text-slate"}`}>
                  <span className="text-sm">{copy.from} </span>
                  <span className="text-xl font-bold" dir="ltr">BHD {fare}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-ink/[0.04] p-5 sm:grid-cols-[auto_1fr_1fr] sm:items-center sm:gap-8">
        <p className="font-bold">{copy.notSure}</p>
        {step(copy.passengers, people, setPeople, 9)}
        {step(copy.bags, bags, setBags, 9)}
      </div>
      {!pick && <p className="mt-3 rounded-md bg-danger/10 px-4 py-3 text-sm font-semibold text-danger" role="status">{copy.tooMany}</p>}
      <p className="mt-4 text-sm text-slate">{copy.luggageNote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Which journey are you booking?                                       */

/** hrefs: resolved (locale + trailing slash) links, one per option; "" for none. */
export function JourneyChooser({ copy, hrefs }: { copy: UturnCopy["which"]; hrefs: string[] }) {
  const [active, setActive] = useState(0);
  const opt = copy.options[active];
  return (
    <div className="mt-10">
      <div role="group" aria-label={copy.heading} className="flex flex-wrap gap-2">
        {copy.options.map((o, i) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${i === active ? "bg-white text-ink" : "bg-white/10 text-white hover:bg-white/20"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div key={opt.key} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12" aria-live="polite">
        <ol className="flex flex-wrap items-center gap-y-3">
          {opt.route.map((r, i) => {
            const ends = i === 0 || i === opt.route.length - 1;
            return (
              <li key={`${r}-${i}`} className="ledger-row flex items-center" style={{ animationDelay: `${i * 120}ms` }}>
                <span className={`rounded-md px-3.5 py-2 text-sm font-bold ${ends ? "bg-white text-ink" : "bg-white/10"}`}>{r}</span>
                {i < opt.route.length - 1 && <span className="mx-2 h-px w-6 bg-brass-lit sm:w-10" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
        <div>
          <p className="text-white/80">{opt.body}</p>
          {hrefs[active] && (
            <Link href={hrefs[active]} className="mt-2 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">
              {copy.linkLabel} <DirArrow />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pickup: location first                                               */

export function PickupSender({ copy }: { copy: UturnCopy["pickup"] }) {
  const id = useId();
  const [loc, setLoc] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        openWa(`${copy.message} ${loc.trim()}`);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor={`${id}-loc`} className="sr-only">{copy.label}</label>
      <input
        id={`${id}-loc`}
        value={loc}
        onChange={(e) => setLoc(e.target.value)}
        placeholder={copy.placeholder}
        className="h-14 min-w-0 flex-1 rounded-md border-2 border-ink/15 bg-white px-4 text-base font-semibold outline-none placeholder:font-normal placeholder:text-ink/35 focus:border-sea"
      />
      <button type="submit" className="flex h-14 items-center justify-center gap-2 rounded-md bg-ink px-6 font-bold text-white transition-colors hover:bg-ink-soft" data-analytics="whatsapp_click">
        <WhatsAppIcon className="h-5 w-5" color="currentColor" />
        {copy.submit}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Before-you-book checklist (kept on the page only)                   */

export function PrepChecklist({ copy, planHref }: { copy: UturnCopy["checklist"]; planHref: string }) {
  const [done, setDone] = useState<boolean[]>(() => copy.items.map(() => false));
  const count = done.filter(Boolean).length;
  const all = count === copy.items.length;
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full rounded-full bg-sea transition-all duration-300" style={{ width: `${(count / copy.items.length) * 100}%` }} />
        </div>
        <span className={`text-sm text-slate ${mono}`} aria-live="polite">{count}/{copy.items.length} {copy.progress}</span>
      </div>
      <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {copy.items.map((it, i) => (
          <li key={it}>
            <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 transition-colors ${done[i] ? "bg-sea/10" : "bg-white ring-1 ring-ink/10 hover:ring-ink/30"}`}>
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone((d) => d.map((x, j) => (j === i ? !x : x)))}
                className="h-5 w-5 shrink-0 accent-[var(--color-sea)]"
              />
              <span className={done[i] ? "text-ink/60 line-through decoration-ink/30" : ""}>{it}</span>
            </label>
          </li>
        ))}
      </ul>
      <a
        href={planHref}
        className={`mt-5 inline-flex h-12 items-center rounded-md px-6 font-bold transition-colors ${all ? "bg-ink text-white hover:bg-ink-soft" : "bg-ink/[0.06] text-ink/60"}`}
      >
        {copy.done} <span className="ms-2"><DirArrow /></span>
      </a>
    </div>
  );
}
