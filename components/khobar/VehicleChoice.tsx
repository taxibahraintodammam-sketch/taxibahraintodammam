"use client";

import { useState } from "react";
import type { KhobarCopy } from "@/content/khobar";

const mono = "font-[family-name:var(--font-mono)]";

export type KhobarFare = { bhd: number; sar: number };

/** "What's coming with you?" — answer one question, see the class and its starting fare. */
export function VehicleChoice({ copy, fares }: { copy: KhobarCopy["vehicles"]; fares: Record<string, KhobarFare | undefined> }) {
  const [active, setActive] = useState(0);
  const opt = copy.options[active];
  const fare = fares[opt.key];

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div role="radiogroup" aria-label={copy.heading} className="flex flex-col gap-2.5">
        {copy.options.map((o, i) => {
          const on = i === active;
          return (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setActive(i)}
              className={`flex min-h-14 items-center justify-between gap-4 rounded-lg px-5 py-3.5 text-start transition-all duration-200 ${
                on ? "bg-ink text-white" : "bg-white ring-1 ring-ink/15 hover:ring-ink/40"
              }`}
            >
              <span className="font-semibold">{o.question}</span>
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${on ? "border-brass-lit" : "border-ink/25"}`} aria-hidden="true">
                {on && <span className="h-2.5 w-2.5 rounded-full bg-brass-lit" />}
              </span>
            </button>
          );
        })}
      </div>

      <div key={opt.key} className="ledger-row flex flex-col rounded-xl bg-white p-6 ring-1 ring-ink/10 sm:p-8" aria-live="polite">
        <p className="text-3xl font-bold">{opt.vehicle}</p>
        <p className={`mt-2 text-sm text-slate ${mono}`}>{opt.capacity}</p>
        <p className="mt-4 text-ink/80">{opt.note}</p>
        {fare && (
          <p className={`mt-auto border-t border-ink/10 pt-5 ${mono}`}>
            <span className="text-sm text-slate">{copy.from} </span>
            <span className="text-2xl font-bold" dir="ltr">BHD {fare.bhd}</span>
            <span className="text-sm text-slate" dir="ltr"> / SAR {fare.sar}</span>
          </p>
        )}
      </div>
    </div>
  );
}
