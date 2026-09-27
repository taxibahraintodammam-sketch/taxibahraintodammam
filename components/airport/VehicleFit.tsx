"use client";

import { useState } from "react";
import type { AirportCopy } from "@/content/airport";

// Stated fleet capacities (content/fleet.ts / fares.ts VEHICLE_CAPACITY).
const CAP: Record<string, { people: number; bags: number }> = {
  sedan: { people: 3, bags: 2 },
  suv: { people: 4, bags: 3 },
  van: { people: 7, bags: 6 },
  luxury: { people: 3, bags: 2 },
};

/**
 * "Passengers + suitcases = right vehicle": pick the group, and every
 * vehicle that genuinely fits lights up. Uses only the published capacities,
 * so it never suggests squeezing more into a car than it's meant to carry.
 */
export function VehicleFit({ copy }: { copy: AirportCopy["luggage"] }) {
  const [people, setPeople] = useState(2);
  const [bags, setBags] = useState(2);
  const fits = (v: string) => people <= CAP[v].people && bags <= CAP[v].bags;
  const anyFit = copy.rows.some((r) => fits(r.vehicle));

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Picker label={copy.passengers} value={people} options={[1, 2, 3, 4, 5, 6, 7, 8]} onChange={setPeople} />
        <Picker label={copy.suitcases} value={bags} options={[0, 1, 2, 3, 4, 5, 6, 7]} onChange={setBags} />
      </div>

      <ul className="mt-6 flex flex-col gap-2" aria-live="polite">
        {copy.rows.map((r) => {
          const ok = fits(r.vehicle);
          return (
            <li
              key={r.vehicle}
              className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-input border px-4 py-3 transition-colors sm:grid-cols-[9rem_1fr_auto] ${
                ok ? "border-sea bg-sea/[0.06]" : "border-ink/10 opacity-55"
              }`}
            >
              <span className="font-bold">{r.name}</span>
              <span className="col-span-2 row-start-2 text-sm text-slate sm:col-span-1 sm:row-start-auto">
                {r.people} · {r.bags}
                <span className="hidden text-ink/60 lg:inline"> — {r.note}</span>
              </span>
              <span className={`text-sm font-bold ${ok ? "text-sea" : "text-transparent"}`} aria-hidden={!ok}>
                ✓ {copy.match}
              </span>
            </li>
          );
        })}
      </ul>
      {!anyFit && (
        <p role="status" className="mt-4 rounded-input bg-ink p-4 text-sm text-white">
          {copy.tooBig}
        </p>
      )}
    </div>
  );
}

function Picker({ label, value, options, onChange }: { label: string; value: number; options: number[]; onChange: (n: number) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((n) => {
          const text = n === options[options.length - 1] ? `${n}+` : String(n);
          return (
            <label key={n} className="relative">
              <input type="radio" name={label} checked={value === n} onChange={() => onChange(n)} className="peer sr-only" />
              <span className="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-input border border-ink/15 px-2 font-[family-name:var(--font-mono)] text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brass-lit">
                {text}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
