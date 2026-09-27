"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { HomeCopy } from "@/content/home";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { DirArrow } from "@/components/ui/DirArrow";

const mono = "font-[family-name:var(--font-mono)]";
const openWa = (msg: string) => window.open(whatsappHref(msg), "_blank", "noopener,noreferrer");

/* ------------------------------------------------------------------ */
/* Plan your trip: direction → destination → pickup → when → who → car */

export function TripPlanner({ copy }: { copy: HomeCopy["planner"] }) {
  const id = useId();
  const [dir, setDir] = useState(0);
  const [dest, setDest] = useState<string | null>(null);
  const [other, setOther] = useState("");
  const [v, setV] = useState({ pickup: "", date: "", time: "", passengers: "" });
  const [vehicle, setVehicle] = useState(copy.vehicles[0]);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((x) => ({ ...x, [k]: e.target.value }));
  const or = (x: string) => x.trim() || copy.notSet;
  const options = dir === 0 ? copy.toSaudi : copy.toBahrain;
  const destination = dest === copy.other ? other : dest ?? "";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    openWa(
      [
        copy.messageIntro,
        `${copy.direction}: ${copy.directions[dir]}`,
        `${copy.destination} ${or(destination)}`,
        `${copy.pickup}: ${or(v.pickup)}`,
        `${copy.date}: ${or(v.date)} ${v.time}`.trim(),
        `${copy.passengers}: ${or(v.passengers)}`,
        `${copy.vehicle}: ${vehicle}`,
      ].join("\n")
    );
  }

  const field =
    "h-12 w-full rounded-md border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-sea sm:text-sm";
  const lbl = "text-sm font-semibold text-ink/80";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="flex flex-col gap-4">
      {/* 1 · Direction */}
      <div role="radiogroup" aria-label={copy.direction} className="grid grid-cols-2 gap-1 rounded-lg bg-ink/[0.05] p-1">
        {copy.directions.map((d, i) => (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={dir === i}
            onClick={() => {
              setDir(i);
              setDest(null);
            }}
            className={`min-h-11 rounded-md px-2 text-sm font-bold transition-colors ${dir === i ? "bg-ink text-white" : "text-ink/70 hover:text-ink"}`}
          >
            <span dir="auto">{d}</span>
          </button>
        ))}
      </div>

      {/* 2 · Destination, contextual to the direction */}
      <fieldset>
        <legend className={lbl}>{copy.destination}</legend>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[...options, copy.other].map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={dest === o}
              onClick={() => setDest(o)}
              className={`min-h-10 rounded-full px-3.5 text-sm font-semibold transition-colors ${dest === o ? "bg-sea text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/40"}`}
            >
              {o}
            </button>
          ))}
        </div>
        {dest === copy.other && (
          <input aria-label={copy.otherPlaceholder} value={other} onChange={(e) => setOther(e.target.value)} placeholder={copy.otherPlaceholder} className={`${field} mt-2`} autoFocus />
        )}
      </fieldset>

      {/* 3–6 */}
      <Field label={copy.pickup} htmlFor={`${id}-pickup`} lbl={lbl}>
        <input id={`${id}-pickup`} value={v.pickup} onChange={set("pickup")} placeholder={dir === 0 ? copy.pickupBh : copy.pickupSa} className={field} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={copy.date} htmlFor={`${id}-date`} lbl={lbl}>
          <input id={`${id}-date`} type="date" value={v.date} onChange={set("date")} className={field} />
        </Field>
        <Field label={copy.time} htmlFor={`${id}-time`} lbl={lbl}>
          <input id={`${id}-time`} type="time" value={v.time} onChange={set("time")} className={field} />
        </Field>
        <Field label={copy.passengers} htmlFor={`${id}-pax`} lbl={lbl}>
          <input id={`${id}-pax`} inputMode="numeric" value={v.passengers} onChange={set("passengers")} className={field} />
        </Field>
        <Field label={copy.vehicle} htmlFor={`${id}-veh`} lbl={lbl}>
          <select id={`${id}-veh`} value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={field}>
            {copy.vehicles.map((x) => <option key={x}>{x}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.5fr_1fr]">
        <button type="submit" className="flex h-[52px] items-center justify-center gap-2 rounded-md bg-brass px-5 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit" data-analytics="whatsapp_click">
          {copy.submit}
        </button>
        <a href={whatsappHref(copy.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="flex h-[52px] items-center justify-center gap-2 rounded-md border border-ink/20 px-4 font-semibold text-ink transition-colors hover:border-ink/50" data-analytics="whatsapp_click">
          <WhatsAppIcon className="h-5 w-5" color="currentColor" />
          {copy.whatsapp}
        </a>
      </div>
      <p className="text-xs text-slate">{copy.micro}</p>
    </form>
  );
}

function Field({ label, htmlFor, lbl, children }: { label: string; htmlFor: string; lbl: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={htmlFor} className={lbl}>{label}</label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The corridor network: one trunk, branches on the Saudi side          */

export type HomeBranch = { key: string; name: string; km: number; time: string; fare?: number; href: string; group: "near" | "airport" | "east" | "long" };

export function NetworkMap({ copy, branches }: { copy: HomeCopy["network"]; branches: HomeBranch[] }) {
  const [active, setActive] = useState(1); // Dammam by default
  const b = branches[active];
  const maxKm = Math.max(...branches.map((x) => x.km));
  const n = branches.length;
  const geom = branches.map((br, i) => ({ x: 470 + (br.km / maxKm) * 470, y: 40 + i * (340 / (n - 1)) }));
  const groups = ["near", "airport", "east", "long"] as const;

  return (
    <div className="mt-10">
      {/* Desktop diagram */}
      <figure className="hidden md:block">
        <svg viewBox="0 0 1000 420" className="w-full" style={{ direction: "ltr" }} aria-hidden="true">
          {/* Trunk */}
          <line x1="30" y1="210" x2="390" y2="210" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
          <line x1="180" y1="210" x2="320" y2="210" stroke="var(--color-sea)" strokeWidth="8" strokeLinecap="round" />
          {[
            { x: 30, t: copy.trunk[0] },
            { x: 130, t: copy.trunk[1] },
            { x: 250, t: copy.trunk[2] },
            { x: 390, t: copy.trunk[3] },
          ].map((nd, i) => (
            <g key={nd.t}>
              <circle cx={nd.x} cy="210" r={i === 0 ? 9 : 7} fill={i === 2 ? "var(--color-sea)" : "currentColor"} />
              <text x={nd.x} y={i % 2 ? 244 : 186} textAnchor={i === 0 ? "start" : "middle"} className="fill-current text-[14px] font-semibold">{nd.t}</text>
            </g>
          ))}
          {/* Branches */}
          {branches.map((br, i) => {
            const on = i === active;
            const g = geom[i];
            return (
              <g key={br.key} className="cursor-pointer" onClick={() => setActive(i)}>
                <path
                  d={`M 390 210 C 430 210, 430 ${g.y}, 470 ${g.y} L ${g.x} ${g.y}`}
                  fill="none"
                  stroke={on ? "var(--color-sea)" : "currentColor"}
                  strokeOpacity={on ? 1 : 0.18}
                  strokeWidth={on ? 5 : 2.5}
                  className="transition-all duration-300"
                />
                <circle cx={g.x} cy={g.y} r={on ? 8 : 5} fill={on ? "var(--color-sea)" : "currentColor"} fillOpacity={on ? 1 : 0.4} className="transition-all duration-300" />
                <text x={g.x - 12} y={g.y - 10} textAnchor="end" className={`fill-current text-[14px] ${on ? "font-bold" : "opacity-60"}`}>{br.name}</text>
              </g>
            );
          })}
        </svg>
        <figcaption className="text-end text-[11px] text-slate">{copy.diagram}</figcaption>
      </figure>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        {/* Grouped selector */}
        <div className="flex flex-col gap-4">
          {groups.map((g) => (
            <div key={g}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate rtl:normal-case">{copy.groups[g]}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {branches.map((br, i) =>
                  br.group === g ? (
                    <button
                      key={br.key}
                      type="button"
                      aria-pressed={i === active}
                      onClick={() => setActive(i)}
                      className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${i === active ? "bg-sea text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/40"}`}
                    >
                      {br.name}
                    </button>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected route */}
        <div key={b.key} className="ledger-row self-start rounded-xl bg-ink p-6 text-white" aria-live="polite">
          <p className="text-sm text-white/55">{copy.trunk[0]} →</p>
          <p className="mt-1 text-3xl font-bold">{b.name}</p>
          <p className={`mt-2 text-sm text-white/65 ${mono}`} dir="auto">~{b.km} {copy.km} · {b.time} {copy.typical}</p>
          {/* The shared crossing, then this branch */}
          <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-white/10" dir="ltr">
            <span className="h-full bg-sea" style={{ width: `${(25 / maxKm) * 100}%` }} />
            <span className="h-full bg-brass-lit" style={{ width: `${((b.km - 25) / maxKm) * 100}%` }} />
          </div>
          {b.fare !== undefined && (
            <p className={`mt-5 ${mono}`}>
              <span className="text-sm text-white/55">{copy.from} </span>
              <span className="text-2xl font-bold" dir="ltr">BHD {b.fare}</span>
              <span className="text-sm text-white/55"> · {copy.sedan}</span>
            </p>
          )}
          <Link href={b.href} className="mt-5 inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-bold text-ink transition-colors hover:bg-brass-lit">
            {copy.view} <span className="ms-2"><DirArrow /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Which vehicle fits your trip?                                         */

export function VehicleFinder({ copy }: { copy: HomeCopy["vehicles"] }) {
  const [people, setPeople] = useState(2);
  const [bags, setBags] = useState(2);
  const [style, setStyle] = useState(0);
  const fit = copy.classes.filter((c) => c.key !== "luxury").find((c) => people <= c.people && bags <= c.bags);
  const exec = style === 3 && people <= 3 && bags <= 2;
  const pick = exec ? "luxury" : fit?.key;

  const pills = (label: string, opts: string[], value: number, setter: (n: number) => void) => (
    <fieldset>
      <legend className="text-sm font-semibold text-slate">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {opts.map((o, i) => (
          <button key={o} type="button" aria-pressed={value === i} onClick={() => setter(i)} className={`min-h-11 min-w-11 rounded-md px-3 text-sm font-semibold transition-colors ${value === i ? "bg-ink text-white" : "bg-white ring-1 ring-ink/15 hover:ring-ink/40"}`}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      <div className="flex flex-col gap-6">
        {pills(copy.q1, ["1", "2", "3", "4", "5", "6", "7"], people - 1, (i) => setPeople(i + 1))}
        {pills(copy.q2, ["0", "1", "2", "3", "4", "5", "6+"], bags, setBags)}
        {pills(copy.q3, copy.styles, style, setStyle)}
      </div>
      <div>
        <ul className="flex flex-col gap-2" aria-live="polite">
          {copy.classes.map((c) => {
            const on = c.key === pick;
            return (
              <li key={c.key} className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg px-5 py-4 transition-colors duration-300 ${on ? "bg-ink text-white" : "bg-white ring-1 ring-ink/10"}`}>
                <div>
                  <p className="flex flex-wrap items-center gap-2 text-lg font-bold">
                    {c.name}
                    {on && <span className="rounded-full bg-brass-lit px-2 py-0.5 text-[11px] font-bold text-ink">{copy.likely}</span>}
                  </p>
                  <p className={`text-sm ${on ? "text-white/60" : "text-slate"}`}>{c.model}</p>
                </div>
                {/* Seats and bag slots */}
                <div className="flex flex-col items-end gap-1" aria-hidden="true">
                  <span className="flex gap-0.5">{Array.from({ length: c.people }).map((_, i) => <span key={i} className={`h-2.5 w-2.5 rounded-full ${i < people ? (on ? "bg-brass-lit" : "bg-ink/70") : on ? "bg-white/20" : "bg-ink/10"}`} />)}</span>
                  <span className="flex gap-0.5">{Array.from({ length: c.bags }).map((_, i) => <span key={i} className={`h-3.5 w-2.5 rounded-[2px] ${i < bags ? (on ? "bg-brass-lit" : "bg-ink/70") : on ? "bg-white/20" : "bg-ink/10"}`} />)}</span>
                  <span className={`text-[11px] ${on ? "text-white/55" : "text-slate"}`}>{c.cap}</span>
                </div>
              </li>
            );
          })}
        </ul>
        {!pick && <p className="mt-3 rounded-md bg-danger/10 px-4 py-3 text-sm font-semibold text-danger">{copy.over}</p>}
        <a href={whatsappHref(copy.notSureMessage)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 py-2 text-sm font-semibold text-sea hover:underline" data-analytics="whatsapp_click">
          <WhatsAppIcon className="h-4 w-4" color="currentColor" />
          {copy.notSure}
        </a>
      </div>
    </div>
  );
}
