"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { CausewayCopy } from "@/content/causeway";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { DirArrow } from "@/components/ui/DirArrow";
import { BridgeSvg, BRIDGE_X } from "@/components/causeway/BridgeSvg";

const mono = "font-[family-name:var(--font-mono)]";
const openWa = (msg: string) => window.open(whatsappHref(msg), "_blank", "noopener,noreferrer");

/* ------------------------------------------------------------------ */
/* Plan your crossing: six numbered steps, direction first              */

export function CrossingPlanner({ copy }: { copy: CausewayCopy["plan"] }) {
  const id = useId();
  const s = copy.steps;
  const [dir, setDir] = useState(0);
  const [v, setV] = useState({ pickup: "", destination: "", date: "", time: "", passengers: "" });
  const [vehicle, setVehicle] = useState(copy.vehicles[0]);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((x) => ({ ...x, [k]: e.target.value }));
  const or = (x: string) => x.trim() || copy.notSet;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    openWa(
      [
        copy.messageIntro,
        `${s.direction}: ${copy.directions[dir]}`,
        `${s.pickup}: ${or(v.pickup)}`,
        `${s.destination}: ${or(v.destination)}`,
        `${s.when}: ${or(`${v.date} ${v.time}`)}`,
        `${s.passengers}: ${or(v.passengers)}`,
        `${s.vehicle}: ${vehicle}`,
      ].join("\n")
    );
  }

  const field =
    "h-12 w-full rounded-md border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-sea sm:text-sm";
  const row = (n: number, title: string, htmlFor: string | undefined, body: ReactNode) => (
    <li className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-ink/10 py-4 sm:grid-cols-[2.25rem_9rem_1fr] sm:items-center">
      <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-white ${mono}`}>{n}</span>
      {htmlFor ? (
        <label htmlFor={htmlFor} className="self-center font-semibold">{title}</label>
      ) : (
        <span className="self-center font-semibold" id={`${id}-dir-l`}>{title}</span>
      )}
      <div className="col-span-2 sm:col-span-1">{body}</div>
    </li>
  );

  return (
    <form onSubmit={submit} aria-label={s.direction}>
      <ol>
        {row(1, s.direction, undefined,
          <div role="radiogroup" aria-labelledby={`${id}-dir-l`} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {copy.directions.map((d, i) => (
              <button key={d} type="button" role="radio" aria-checked={dir === i} onClick={() => setDir(i)} className={`min-h-12 rounded-md px-4 text-sm font-bold transition-colors ${dir === i ? "bg-sea text-white" : "bg-ink/[0.05] hover:bg-ink/[0.1]"}`}>
                <span dir="auto">{d}</span>
              </button>
            ))}
          </div>
        )}
        {row(2, s.pickup, `${id}-pickup`, <input id={`${id}-pickup`} value={v.pickup} onChange={set("pickup")} placeholder={copy.pickupPlaceholder} className={field} />)}
        {row(3, s.destination, `${id}-dest`, <input id={`${id}-dest`} value={v.destination} onChange={set("destination")} placeholder={copy.destinationPlaceholder} className={field} />)}
        {row(4, s.when, `${id}-date`,
          <div className="grid grid-cols-2 gap-2">
            <input id={`${id}-date`} type="date" value={v.date} onChange={set("date")} className={field} />
            <input aria-label={s.when} type="time" value={v.time} onChange={set("time")} className={field} />
          </div>
        )}
        {row(5, s.passengers, `${id}-pax`, <input id={`${id}-pax`} inputMode="numeric" value={v.passengers} onChange={set("passengers")} className={field} />)}
        {row(6, s.vehicle, `${id}-veh`,
          <select id={`${id}-veh`} value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={field}>
            {copy.vehicles.map((x) => <option key={x}>{x}</option>)}
          </select>
        )}
      </ol>
      <button type="submit" className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-md bg-ink px-6 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft" data-analytics="whatsapp_click">
        <WhatsAppIcon className="h-5 w-5" color="currentColor" />
        {copy.submit}
      </button>
      <p className="mt-3 text-xs text-slate">{copy.note}</p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* The crossing: direction toggle, bridge, five stages                   */

export function CrossingJourney({ copy, labels }: { copy: CausewayCopy["journey"]; labels: Parameters<typeof BridgeSvg>[0]["labels"] }) {
  const [dir, setDir] = useState(0);
  const [stage, setStage] = useState(0);
  const stages = dir === 0 ? copy.stagesBhSa : copy.stagesSaBh;
  // Marker positions for Bahrain → Saudi; mirrored for the other way.
  const ltr = [BRIDGE_X.shoreA, BRIDGE_X.postA, 500, BRIDGE_X.postB, BRIDGE_X.shoreB];
  const x = dir === 0 ? ltr[stage] : 1000 - ltr[stage];

  return (
    <div className="mt-10">
      <div role="group" aria-label={copy.heading} className="inline-flex rounded-full bg-white/10 p-1">
        {copy.toggle.map((t, i) => (
          <button key={t} type="button" aria-pressed={dir === i} onClick={() => { setDir(i); setStage(0); }} className={`min-h-11 rounded-full px-5 text-sm font-bold transition-colors ${dir === i ? "bg-white text-ink" : "text-white/75 hover:text-white"}`}>
            <span dir="auto">{t}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-white">
        <BridgeSvg labels={labels} markerX={x} glow={stage === 2} />
      </div>

      <ol key={dir} className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-5" aria-live="polite">
        {stages.map((s, i) => {
          const on = i === stage;
          const check = i === 1 || i === 3;
          return (
            <li key={s.n} className="ledger-row" style={{ animationDelay: `${i * 90}ms` }}>
              <button
                type="button"
                onClick={() => setStage(i)}
                aria-pressed={on}
                className={`flex h-full w-full flex-col rounded-lg p-4 text-start transition-colors ${on ? "bg-white text-ink" : "bg-white/[0.06] text-white hover:bg-white/[0.12]"}`}
              >
                <span className="flex items-center gap-2">
                  <span className={`text-xs ${mono} ${on ? "text-sea" : "text-brass-lit"}`}>{s.n}</span>
                  {check && <span className={`h-2 w-2 rounded-sm border ${on ? "border-ink" : "border-white/60"}`} aria-hidden="true" />}
                </span>
                <span className="mt-2 font-bold">{s.title}</span>
                <span className={`mt-1 text-sm ${on ? "text-ink/75" : "text-white/60"}`}>{s.body}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-5 text-sm text-white/55">{copy.driverNote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tell us about your group                                              */

export function GroupTool({ copy }: { copy: CausewayCopy["vehicle"] }) {
  const t = copy.tool;
  const [people, setPeople] = useState(2);
  const [bags, setBags] = useState(2);
  const [type, setType] = useState(0);
  const fit = copy.classes.filter((c) => c.key !== "luxury").find((c) => people <= c.people && bags <= c.bags);
  const executive = type === 2 && people <= 3 && bags <= 2;

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
    <div className="mt-10 overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
      <div className="grid grid-cols-1 gap-5 border-b border-ink/10 p-5 sm:p-7 lg:grid-cols-3">
        <p className="text-lg font-bold lg:col-span-3">{t.heading}</p>
        {pills(t.q1, ["1", "2", "3", "4", "5", "6", "7"], people - 1, (i) => setPeople(i + 1))}
        {pills(t.q2, ["0", "1", "2", "3", "4", "5", "6+"], bags, setBags)}
        {pills(t.q3, t.types, type, setType)}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        {copy.classes.map((c) => {
          const on = c.key === fit?.key || (executive && c.key === "luxury");
          return (
            <li key={c.key} className={`flex flex-col border-ink/10 p-5 transition-colors duration-300 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-e lg:border-b-0 lg:[&:not(:last-child)]:border-e ${on ? "bg-ink text-white" : ""}`}>
              {on && <span className="mb-2 w-fit rounded-full bg-brass-lit px-2.5 py-0.5 text-xs font-bold text-ink">{t.likely}</span>}
              <p className="text-xl font-bold">{c.name}</p>
              <p className={`mt-1 text-sm ${on ? "text-white/60" : "text-slate"}`}>{c.cap}</p>
              <p className={`mt-3 text-sm ${on ? "text-white/85" : "text-ink/75"}`}>{c.best}</p>
            </li>
          );
        })}
      </ul>
      {!fit && <p className="border-t border-ink/10 bg-danger/10 px-5 py-3 text-sm font-semibold text-danger">{t.over}</p>}
      <p className="border-t border-ink/10 bg-ink/[0.02] px-5 py-3 text-sm text-slate sm:px-7">{t.note}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Where are you going? The shared trunk, then one branch                */

export type Branch = { name: string; km: number; time: string; href: string };

export function RouteBranches({ copy, branches }: { copy: CausewayCopy["routes"]; branches: Branch[] }) {
  const [active, setActive] = useState(0);
  const max = Math.max(...branches.map((b) => b.km));
  const other = active === branches.length;
  const b = branches[active];

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div>
        <p className="text-sm font-semibold text-slate">{copy.select}</p>
        <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-0 lg:border-s-2 lg:border-ink/10">
          {[...branches.map((x) => x.name), copy.other].map((name, i) => (
            <li key={name}>
              <button
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors lg:-ms-0.5 lg:w-full lg:rounded-none lg:border-s-2 lg:px-5 lg:text-start lg:text-base ${
                  i === active ? "bg-ink text-white lg:border-sea lg:bg-transparent lg:text-sea" : "bg-white ring-1 ring-ink/15 lg:border-transparent lg:bg-transparent lg:ring-0 lg:hover:text-sea"
                }`}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div key={active} className="ledger-row self-start rounded-xl bg-white p-6 ring-1 ring-ink/10 sm:p-8" aria-live="polite">
        {other ? (
          <>
            <p className="text-2xl font-bold">{copy.other}</p>
            <p className="mt-2 text-ink/75">{copy.otherBody}</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">{b.name}</p>
            <p className={`mt-1 text-sm text-slate ${mono}`} dir="auto">~{b.km} {copy.km} · {b.time} {copy.typical}</p>
            {/* Shared trunk (the crossing) then this branch's share of the road */}
            <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-ink/[0.06]" dir="ltr">
              <span className="h-full bg-sea" style={{ width: `${(25 / max) * 100}%` }} />
              <span className="h-full bg-ink transition-all duration-500" style={{ width: `${((b.km - 25) / max) * 100}%` }} />
            </div>
            <p className="mt-3 text-[0.95rem] text-ink/75">{b.km <= 140 ? copy.near : copy.far}</p>
            <Link href={b.href} className="mt-4 inline-block py-2 text-sm font-semibold text-sea hover:underline">
              {copy.open} <DirArrow />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Before you cross                                                       */

export function CrossChecklist({ copy }: { copy: CausewayCopy["book"]["checklist"] }) {
  const [done, setDone] = useState<boolean[]>(() => copy.items.map(() => false));
  const count = done.filter(Boolean).length;
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full rounded-full bg-sea transition-all duration-300" style={{ width: `${(count / copy.items.length) * 100}%` }} />
        </div>
        <span className={`text-sm text-slate ${mono}`} aria-live="polite">{count}/{copy.items.length} {copy.progress}</span>
      </div>
      <ul className="mt-4 flex flex-col gap-1.5">
        {copy.items.map((it, i) => (
          <li key={it}>
            <label className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors ${done[i] ? "bg-sea/10" : "hover:bg-ink/[0.04]"}`}>
              <input type="checkbox" checked={done[i]} onChange={() => setDone((d) => d.map((x, j) => (j === i ? !x : x)))} className="h-5 w-5 shrink-0 accent-[var(--color-sea)]" />
              <span className={done[i] ? "text-ink/55 line-through decoration-ink/30" : ""}>{it}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
