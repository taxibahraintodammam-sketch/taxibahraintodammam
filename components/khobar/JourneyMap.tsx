"use client";

import { useState } from "react";
import type { KhobarCopy } from "@/content/khobar";

const mono = "font-[family-name:var(--font-mono)]";

/**
 * The five stages as one continuous line (horizontal on desktop, vertical on
 * phones). Selecting a stage shows who does what there. The causeway stretch
 * is drawn longer and in sea blue, since it's the one physical crossing.
 */
export function JourneyMap({ copy }: { copy: KhobarCopy["map"] }) {
  const [active, setActive] = useState(0);
  const stage = copy.stages[active];
  const last = copy.stages.length - 1;

  const detail = (s: typeof stage) => (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-lg bg-white p-4 ring-1 ring-ink/10">
        <dt className="text-xs font-bold uppercase tracking-wide text-sea rtl:normal-case">{copy.you}</dt>
        <dd className="mt-1.5 text-[0.95rem] text-ink/85">{s.you}</dd>
      </div>
      <div className="rounded-lg bg-ink p-4 text-white">
        <dt className="text-xs font-bold uppercase tracking-wide text-brass-lit rtl:normal-case">{copy.driver}</dt>
        <dd className="mt-1.5 text-[0.95rem] text-white/85">{s.driver}</dd>
      </div>
    </dl>
  );

  return (
    <div className="mt-12">
      {/* Desktop: one horizontal line, geography left (Bahrain) to right (Khobar) */}
      <div className="hidden lg:block" dir="ltr">
        <div className="relative grid grid-cols-[1fr_1fr_1.8fr_1fr_1fr]">
          <span className="absolute left-[10%] right-[10%] top-[15px] h-1 rounded-full bg-ink/10" aria-hidden="true" />
          <span className="absolute left-[38%] right-[38%] top-[13px] h-2 rounded-full bg-[repeating-linear-gradient(90deg,var(--color-sea)_0_14px,rgba(6,85,255,0.35)_14px_22px)]" aria-hidden="true" />
          {copy.stages.map((s, i) => (
            <div key={s.key} className="flex flex-col items-center text-center" dir="auto">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={s.name}
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  i === active ? "scale-110 border-sea bg-sea text-white shadow-[0_0_0_6px_rgba(6,85,255,0.15)]" : i === 0 || i === last ? "border-ink bg-ink text-white" : "border-ink/30 bg-white text-ink hover:border-sea"
                }`}
              >
                <span className={`text-xs ${mono}`}>{i + 1}</span>
              </button>
              <button type="button" onClick={() => setActive(i)} className={`mt-4 px-2 text-base font-bold transition-colors ${i === active ? "text-sea" : "text-ink hover:text-sea"}`}>
                {s.name}
              </button>
              <span className="mt-1 px-2 text-sm text-slate">{s.where}</span>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl" aria-live="polite">
          {detail(stage)}
        </div>
      </div>

      {/* Phones: vertical line; the selected stage opens in place */}
      <ol className="lg:hidden">
        {copy.stages.map((s, i) => {
          const on = i === active;
          const causeway = s.key === "causeway";
          return (
            <li key={s.key} className="relative grid grid-cols-[2rem_1fr] gap-4 pb-6 last:pb-0">
              {i < last && (
                <span
                  className={`absolute bottom-0 start-[15px] top-8 ${causeway ? "w-1.5 -translate-x-[2px] rounded-full bg-sea rtl:translate-x-[2px]" : "w-0.5 bg-ink/15"}`}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={on}
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs transition-colors ${mono} ${
                  on ? "border-sea bg-sea text-white" : i === 0 || i === last ? "border-ink bg-ink text-white" : "border-ink/30 bg-white"
                }`}
                aria-label={s.name}
              >
                {i + 1}
              </button>
              <div>
                <button type="button" onClick={() => setActive(i)} className={`min-h-8 text-start text-lg font-bold ${on ? "text-sea" : ""}`}>
                  {s.name}
                </button>
                <p className="text-sm text-slate">{s.where}</p>
                {on && <div className="mt-4">{detail(s)}</div>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
