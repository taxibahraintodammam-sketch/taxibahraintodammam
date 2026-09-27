"use client";

import { useState } from "react";
import type { SuvCopy } from "@/content/suv";

type ClassKey = "sedan" | "suv" | "van";
const ORDER: ClassKey[] = ["sedan", "suv", "van"];
/** Published capacities (content/fares.ts VEHICLE_CAPACITY). */
const CAP: Record<ClassKey, { people: number; bags: number }> = {
  sedan: { people: 3, bags: 2 },
  suv: { people: 4, bags: 3 },
  van: { people: 7, bags: 6 },
};
const MAX_PEOPLE = 8;
const MAX_BAGS = 8;

const fitsIn = (k: ClassKey, p: number, b: number) => p <= CAP[k].people && b <= CAP[k].bags;

/**
 * A visual guide, not a calculator: it only compares the party against the
 * published capacities and points at the smallest class that covers it.
 */
export function VehicleChooser({ copy }: { copy: SuvCopy["compare"] }) {
  const [people, setPeople] = useState(2);
  const [bags, setBags] = useState(3);
  const pick = ORDER.find((k) => fitsIn(k, people, bags));

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-ink/[0.04] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[1fr_1fr_1.4fr] lg:items-center">
        <Stepper label={copy.passengers} value={people} min={1} max={MAX_PEOPLE} onChange={setPeople} less={copy.less} more={copy.more} />
        <Stepper label={copy.bags} value={bags} min={0} max={MAX_BAGS} onChange={setBags} less={copy.less} more={copy.more} />
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold text-slate">{copy.presetsLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {copy.presets.map((pr) => {
              const on = pr.passengers === people && pr.bags === bags;
              return (
                <li key={pr.label}>
                  <button
                    type="button"
                    onClick={() => {
                      setPeople(pr.passengers);
                      setBags(pr.bags);
                    }}
                    aria-pressed={on}
                    className={`min-h-10 rounded-full px-3.5 py-2 text-sm transition-colors ${on ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/40"}`}
                  >
                    {pr.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.15fr_1fr]" aria-live="polite">
        {ORDER.map((k) => {
          const c = copy.classes[k];
          const ok = fitsIn(k, people, bags);
          const chosen = k === pick;
          const verdict = chosen ? (k === "sedan" ? copy.verdicts.fits : copy.verdicts.better) : ok ? null : copy.verdicts.over;
          return (
            <li
              key={k}
              className={`relative flex flex-col rounded-lg p-5 transition-all duration-300 sm:p-6 ${
                chosen ? "bg-ink text-white shadow-elevation md:-translate-y-1" : ok ? "bg-white ring-1 ring-ink/15" : "bg-white/60 text-ink/55 ring-1 ring-ink/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <p className={`mt-0.5 text-sm ${chosen ? "text-white/60" : "text-slate"}`}>{c.model}</p>
                </div>
                {verdict && (
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                      chosen ? "bg-brass-lit text-ink" : "bg-danger/10 text-danger"
                    }`}
                  >
                    {verdict}
                  </span>
                )}
              </div>

              {/* Seats and bags against capacity */}
              <div className="mt-5 flex flex-col gap-2.5" aria-hidden="true">
                <Dots used={people} cap={CAP[k].people} chosen={chosen} shape="seat" />
                <Dots used={bags} cap={CAP[k].bags} chosen={chosen} shape="bag" />
              </div>

              <dl className={`mt-5 flex flex-col gap-1 border-t pt-4 text-sm ${chosen ? "border-white/15" : "border-ink/10"}`}>
                <dt className="sr-only">{copy.passengers}</dt>
                <dd>{c.passengers}</dd>
                <dt className="sr-only">{copy.bags}</dt>
                <dd>{c.bags}</dd>
                <dd className={chosen ? "text-white/70" : "text-slate"}>{c.cabin}</dd>
              </dl>
              <p className={`mt-auto pt-4 text-sm font-semibold ${chosen ? "text-brass-lit" : ""}`}>{c.best}</p>
            </li>
          );
        })}
      </ul>

      {!pick && <p className="mt-4 rounded-md bg-danger/10 px-4 py-3 text-sm font-semibold text-danger">{copy.verdicts.talk}</p>}
    </div>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  less,
  more,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  less: string;
  more: string;
}) {
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-md bg-white text-xl font-semibold ring-1 ring-ink/15 transition-colors hover:ring-ink/40 disabled:opacity-35";
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-semibold">{label}</span>
      <span className="flex items-center gap-2">
        <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`${label}: ${less}`}>
          −
        </button>
        <output className="w-8 text-center font-[family-name:var(--font-mono)] text-xl font-bold" aria-live="polite">
          {value}
        </output>
        <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`${label}: ${more}`}>
          +
        </button>
      </span>
    </div>
  );
}

/** Capacity slots: filled up to what's needed, red for anything beyond capacity. */
function Dots({ used, cap, chosen, shape }: { used: number; cap: number; chosen: boolean; shape: "seat" | "bag" }) {
  const total = Math.max(cap, used);
  const size = shape === "seat" ? "h-3.5 w-3.5 rounded-full" : "h-4 w-3 rounded-[3px]";
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const over = i >= cap;
        const filled = i < used;
        const cls = over
          ? "bg-danger"
          : filled
            ? chosen
              ? "bg-brass-lit"
              : "bg-ink/70"
            : chosen
              ? "ring-1 ring-inset ring-white/30"
              : "ring-1 ring-inset ring-ink/20";
        return <span key={i} className={`${size} ${cls} transition-colors duration-300`} />;
      })}
    </span>
  );
}
