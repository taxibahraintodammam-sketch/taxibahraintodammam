"use client";

import { useState } from "react";
import type { RiyadhCopy } from "@/content/riyadh";

const mono = "font-[family-name:var(--font-mono)]";
type Key = "sedan" | "suv" | "van" | "luxury";

/**
 * Three quick answers → the class the published capacities point to.
 * A visual guide only; the fare message says the vehicle is confirmed later.
 */
function pick(people: number, luggage: number, trip: number): Key {
  if (people === 2) return "van"; // 5–7
  if (people === 1) return luggage === 2 ? "van" : "suv"; // 4
  if (trip === 2 && luggage < 2) return "luxury"; // executive, 1–3
  if (trip === 3 && luggage === 2) return "van"; // group with heavy bags
  if (luggage === 2 || (trip === 0 && luggage === 1)) return "suv";
  return "sedan";
}

export function VehicleFit({ copy, fares }: { copy: RiyadhCopy["vehicle"]; fares: Partial<Record<Key, number>> }) {
  const t = copy.tool;
  const [people, setPeople] = useState(0);
  const [luggage, setLuggage] = useState(1);
  const [trip, setTrip] = useState(1);
  const fit = pick(people, luggage, trip);

  const questions = [
    { label: t.q1, options: t.q1Options, value: people, set: setPeople },
    { label: t.q2, options: t.q2Options, value: luggage, set: setLuggage },
    { label: t.q3, options: t.q3Options, value: trip, set: setTrip },
  ];

  return (
    <div className="mt-12 overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
      <div className="grid grid-cols-1 gap-6 border-b border-ink/10 p-5 sm:p-7 lg:grid-cols-3">
        <p className="text-lg font-bold lg:col-span-3">{t.heading}</p>
        {questions.map((q) => (
          <fieldset key={q.label}>
            <legend className="text-sm font-semibold text-slate">{q.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={q.value === i}
                  onClick={() => q.set(i)}
                  className={`min-h-11 rounded-md px-4 text-sm font-semibold transition-colors ${
                    q.value === i ? "bg-ink text-white" : "bg-ink/[0.04] text-ink hover:bg-ink/[0.09]"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        {copy.classes.map((c) => {
          const on = c.key === fit;
          const fare = fares[c.key as Key];
          return (
            <li
              key={c.key}
              className={`relative flex flex-col border-ink/10 p-5 transition-colors duration-300 sm:p-6 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-e lg:border-b-0 lg:[&:not(:last-child)]:border-e ${
                on ? "bg-ink text-white" : ""
              }`}
            >
              {on && <span className="mb-2 inline-flex w-fit rounded-full bg-brass-lit px-2.5 py-0.5 text-xs font-bold text-ink">{t.likely}</span>}
              <p className="text-xl font-bold">{c.name}</p>
              <p className={`mt-1 text-sm ${mono} ${on ? "text-white/60" : "text-slate"}`}>{c.cap}</p>
              <p className={`mt-3 text-[0.95rem] ${on ? "text-white/80" : "text-ink/75"}`}>{c.fit}</p>
              {fare !== undefined && (
                <p className={`mt-auto pt-4 text-sm ${mono} ${on ? "text-brass-lit" : "text-slate"}`}>
                  {t.from} <span dir="ltr">BHD {fare}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <p className="border-t border-ink/10 bg-ink/[0.02] px-5 py-3 text-sm text-slate sm:px-7">{t.note}</p>
    </div>
  );
}
