"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { BahDmmCopy } from "@/content/bah-dammam";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const mono = "font-[family-name:var(--font-mono)]";
const openWa = (msg: string) => window.open(whatsappHref(msg), "_blank", "noopener,noreferrer");

/* ------------------------------------------------------------------ */
/* Hero planner: flight first, then the Dammam end                      */

export function ArrivalPlanner({ copy }: { copy: BahDmmCopy["planner"] }) {
  const id = useId();
  const f = copy.fields;
  const [v, setV] = useState({ flight: "", date: "", time: "", passengers: "", luggage: "", destination: "" });
  const [type, setType] = useState(copy.types[0]);
  const [vehicle, setVehicle] = useState(copy.vehicles[0]);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));
  const or = (x: string) => x.trim() || copy.notSet;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    openWa(
      [
        copy.messageIntro,
        `${f.flight}: ${or(v.flight)}`,
        `${f.date}: ${or(v.date)}`,
        `${f.time}: ${or(v.time)}`,
        `${f.passengers}: ${or(v.passengers)}`,
        `${f.luggage}: ${or(v.luggage)}`,
        `${f.destination}: ${or(v.destination)} (${type})`,
        `${f.vehicle}: ${vehicle}`,
      ].join("\n")
    );
  }

  const field =
    "h-12 w-full rounded-md border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-sea sm:text-sm";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="grid grid-cols-2 gap-3.5">
      <Field label={f.flight} htmlFor={`${id}-flight`} wide>
        <input id={`${id}-flight`} value={v.flight} onChange={set("flight")} placeholder={f.flightPlaceholder} autoCapitalize="characters" className={`${field} ${mono} uppercase`} />
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
      <Field label={f.luggage} htmlFor={`${id}-luggage`}>
        <input id={`${id}-luggage`} inputMode="numeric" value={v.luggage} onChange={set("luggage")} className={field} />
      </Field>
      <Field label={f.destination} htmlFor={`${id}-destination`} wide>
        <input id={`${id}-destination`} value={v.destination} onChange={set("destination")} placeholder={f.destinationPlaceholder} className={field} />
      </Field>
      <Field label={f.type} htmlFor={`${id}-type`}>
        <select id={`${id}-type`} value={type} onChange={(e) => setType(e.target.value)} className={field}>
          {copy.types.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <Field label={f.vehicle} htmlFor={`${id}-vehicle`}>
        <select id={`${id}-vehicle`} value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={field}>
          {copy.vehicles.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <button
        type="submit"
        className="col-span-2 mt-1 flex h-[52px] items-center justify-center gap-2 rounded-md bg-ink px-6 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft"
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
/* Arrival stages: the stage in the middle of the screen becomes active */

export function ArrivalStages({ copy }: { copy: BahDmmCopy["stages"] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const n = copy.items.length;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const airportEnd = copy.items.findIndex((s) => s.phase !== "airport");
  const pct = (i: number) => (i / (n - 1)) * 100;

  return (
    <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
      {/* The rail: airport part, then road part, with the marker at the active stage */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <div className="relative h-[460px] w-full">
            <span className="absolute bottom-0 start-[7px] top-0 w-0.5 bg-ink/10" aria-hidden="true" />
            <span className="absolute start-[7px] top-0 w-0.5 bg-[repeating-linear-gradient(180deg,var(--color-sea)_0_6px,transparent_6px_10px)]" style={{ height: `${pct(airportEnd)}%` }} aria-hidden="true" />
            <span className="absolute start-[7px] w-0.5 bg-ink transition-all duration-500" style={{ top: `${pct(airportEnd)}%`, height: `${Math.max(0, pct(active) - pct(airportEnd))}%` }} aria-hidden="true" />
            {copy.items.map((s, i) => (
              <span
                key={s.n}
                className={`absolute start-0 flex -translate-y-1/2 items-center gap-3 text-sm transition-colors duration-300 ${i === active ? "font-bold text-ink" : "text-slate"}`}
                style={{ top: `${pct(i)}%` }}
              >
                <span className={`block h-4 w-4 rounded-full border-2 transition-all duration-300 ${i <= active ? "border-ink bg-ink" : "border-ink/25 bg-white"} ${i === active ? "scale-125" : ""}`} aria-hidden="true" />
                {s.title}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-1.5 text-xs text-slate">
            <span className="flex items-center gap-2"><span className="h-3 w-0.5 bg-sea" aria-hidden="true" />{copy.before}</span>
            <span className="flex items-center gap-2"><span className="h-3 w-0.5 bg-ink" aria-hidden="true" />{copy.after}</span>
          </div>
        </div>
      </div>

      <ol className="flex flex-col">
        {copy.items.map((s, i) => {
          const on = i === active;
          const airport = s.phase === "airport";
          return (
            <li
              key={s.n}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`border-t py-8 transition-opacity duration-500 lg:min-h-[240px] lg:py-12 ${on ? "border-ink opacity-100" : "border-ink/10 lg:opacity-40"}`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm ${mono} ${airport ? "text-sea" : "text-slate"}`}>{s.n}</span>
                <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${airport ? "bg-sea/10 text-sea" : s.phase === "meet" ? "bg-brass-lit/20 text-ink" : "bg-ink/[0.06] text-ink/70"}`}>
                  {airport ? copy.before : s.phase === "meet" ? copy.meet : copy.after}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-bold lg:text-[2.2rem]">{s.title}</h3>
              <p className="mt-2 max-w-xl text-ink/75 lg:text-lg">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flight status board: on time / delayed / early                      */

export function StatusBoard({ copy }: { copy: BahDmmCopy["status"] }) {
  const [active, setActive] = useState(1);
  const c = copy.cases[active];
  const changed = c.actual !== c.scheduled;
  const cell = (text: string, tone: string) => (
    <span className={`inline-flex gap-0.5 ${mono}`} dir="ltr">
      {text.split("").map((ch, i) => (
        <span key={i} className={`flex h-9 w-6 items-center justify-center rounded-[3px] bg-white/[0.07] text-lg font-bold sm:h-10 sm:w-7 ${tone}`}>{ch}</span>
      ))}
    </span>
  );
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
      <div>
        <div role="group" aria-label={copy.heading} className="inline-flex rounded-full bg-ink/[0.06] p-1">
          {copy.tabs.map((t, i) => (
            <button key={t} type="button" aria-pressed={i === active} onClick={() => setActive(i)} className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${i === active ? "bg-ink text-white" : "text-ink/70 hover:text-ink"}`}>
              {t}
            </button>
          ))}
        </div>
        <div key={active} className="mt-5 overflow-hidden rounded-xl bg-[#111] p-5 text-white sm:p-6" aria-live="polite">
          <dl className="flex flex-col gap-4">
            <div className="ledger-row flex flex-wrap items-center justify-between gap-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-white/50 rtl:normal-case">{copy.labels.scheduled}</dt>
              <dd>{cell(c.scheduled, "text-white/60")}</dd>
            </div>
            <div className="ledger-row flex flex-wrap items-center justify-between gap-3" style={{ animationDelay: "150ms" }}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-white/50 rtl:normal-case">{copy.labels.actual}</dt>
              <dd className="flex items-center gap-3">
                <span className={`rounded px-2 py-0.5 text-xs font-bold ${changed ? "bg-[#f5c451] text-ink" : "bg-success/80 text-white"}`}>{c.flag}</span>
                {cell(c.actual, changed ? "text-[#f5c451]" : "text-white")}
              </dd>
            </div>
            <div className="ledger-row flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4" style={{ animationDelay: "300ms" }}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-white/50 rtl:normal-case">{copy.labels.driver}</dt>
              <dd className="font-semibold text-brass-lit">{c.driver}</dd>
            </div>
          </dl>
        </div>
        <p className="mt-3 text-xs text-slate">{copy.note}</p>
      </div>
      <p key={`b-${active}`} className="ledger-row self-center text-lg leading-relaxed text-ink/85">{c.body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* How much space do you actually need?                                 */

export function SpaceTool({ copy, fares }: { copy: BahDmmCopy["space"]; fares: Record<string, number | undefined> }) {
  const [people, setPeople] = useState(2);
  const [bags, setBags] = useState(2);
  const [type, setType] = useState(1);
  const fit = copy.classes.filter((c) => c.key !== "luxury").find((c) => people <= c.people && bags <= c.bags);
  const executive = type === 3 && people <= 3 && bags <= 2; // "Business"

  const pills = (label: string, opts: string[], value: number, set: (n: number) => void) => (
    <fieldset>
      <legend className="text-sm font-semibold text-slate">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {opts.map((o, i) => (
          <button key={o} type="button" aria-pressed={value === i} onClick={() => set(i)} className={`min-h-11 min-w-11 rounded-md px-3 text-sm font-semibold transition-colors ${value === i ? "bg-ink text-white" : "bg-white ring-1 ring-ink/15 hover:ring-ink/40"}`}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div className="flex flex-col gap-6">
        {pills(copy.q1, ["1", "2", "3", "4", "5", "6", "7"], people - 1, (i) => setPeople(i + 1))}
        {pills(copy.q2, ["0", "1", "2", "3", "4", "5", "6+"], bags, setBags)}
        {pills(copy.q3, copy.types, type, setType)}
        {/* The bags, drawn */}
        <div className="flex flex-wrap items-end gap-1.5" aria-hidden="true">
          {Array.from({ length: people }).map((_, i) => <span key={`p${i}`} className="h-5 w-5 rounded-full bg-ink" />)}
          <span className="mx-2 text-slate">+</span>
          {Array.from({ length: bags }).map((_, i) => <span key={`b${i}`} className="ledger-row h-8 w-5 rounded-[4px] bg-sea" style={{ animationDelay: `${i * 60}ms` }} />)}
        </div>
      </div>
      <ul className="flex flex-col gap-2" aria-live="polite">
        {copy.classes.map((c) => {
          const on = c.key === fit?.key || (executive && c.key === "luxury");
          const fare = fares[c.key];
          return (
            <li key={c.key} className={`flex flex-wrap items-center justify-between gap-3 rounded-lg px-5 py-4 transition-colors duration-300 ${on ? "bg-ink text-white" : "bg-white ring-1 ring-ink/10"}`}>
              <div>
                <p className="flex items-center gap-2 text-lg font-bold">
                  {c.name}
                  {on && <span className="rounded-full bg-brass-lit px-2 py-0.5 text-[11px] font-bold text-ink">{copy.suggested}</span>}
                </p>
                <p className={`text-sm ${on ? "text-white/60" : "text-slate"}`}>{c.cap}</p>
              </div>
              {fare !== undefined && (
                <p className={`text-sm ${mono} ${on ? "text-brass-lit" : "text-slate"}`}>
                  {copy.from} <span className="text-lg font-bold" dir="ltr">BHD {fare}</span>
                </p>
              )}
            </li>
          );
        })}
        {!fit && <li className="rounded-md bg-danger/10 px-4 py-3 text-sm font-semibold text-danger">{copy.over}</li>}
        <li className="pt-2 text-sm text-slate">{copy.note}</li>
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Where are you going after the causeway?                              */

export function DestinationPicker({ copy }: { copy: BahDmmCopy["destination"] }) {
  const id = useId();
  const [type, setType] = useState(0);
  const [name, setName] = useState("");
  return (
    <div className="mt-8">
      <div role="radiogroup" aria-label={copy.heading} className="flex flex-wrap gap-2">
        {copy.options.map((o, i) => (
          <button key={o} type="button" role="radio" aria-checked={i === type} onClick={() => setType(i)} className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-all ${i === type ? "bg-sea text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/40"}`}>
            {o}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          openWa(`${copy.message}: ${copy.options[type]}${name.trim() ? ` — ${name.trim()}` : ""}`);
        }}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor={`${id}-dest`} className="sr-only">{copy.label}</label>
        <input id={`${id}-dest`} value={name} onChange={(e) => setName(e.target.value)} placeholder={`${copy.options[type]}: ${copy.placeholder}`} className="h-14 min-w-0 flex-1 rounded-md border-2 border-ink/15 bg-white px-4 text-base font-semibold outline-none placeholder:font-normal placeholder:text-ink/35 focus:border-sea" />
        <button type="submit" className="flex h-14 items-center justify-center gap-2 rounded-md bg-ink px-6 font-bold text-white transition-colors hover:bg-ink-soft" data-analytics="whatsapp_click">
          <WhatsAppIcon className="h-5 w-5" color="currentColor" />
          {copy.send}
        </button>
      </form>
    </div>
  );
}
