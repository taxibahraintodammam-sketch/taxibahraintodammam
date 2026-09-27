"use client";

import { useId, useState, type KeyboardEvent } from "react";
import type { HourlyCopy } from "@/content/hourly";

const mono = "font-[family-name:var(--font-mono)]";

/**
 * "What does your day look like?" — switches between example days. Each
 * switch remounts the timeline so its stops arrive one by one again (the
 * reduced-motion rule turns that into an instant swap).
 */
export function DaySelector({ copy }: { copy: HourlyCopy["selector"] }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const day = copy.days[active];

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    const n = copy.days.length;
    const rtl = document.documentElement.dir === "rtl";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const prev = rtl ? "ArrowRight" : "ArrowLeft";
    if (e.key !== next && e.key !== prev) return;
    e.preventDefault();
    const i = (active + (e.key === next ? 1 : -1) + n) % n;
    setActive(i);
    document.getElementById(`${id}-tab-${i}`)?.focus();
  }

  return (
    <div className="mt-10">
      <div role="tablist" aria-label={copy.heading} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">
        {copy.days.map((d, i) => (
          <button
            key={d.key}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
            className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors ${
              i === active ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/40"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="mt-6 overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-3 sm:px-7">
          <p className={`text-xs text-slate ${mono}`}>{copy.tag}</p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-sea/10 px-3 py-1 text-sea">
              {copy.vehicleLabel}: {day.vehicle}
            </span>
            {day.crosses && <span className="rounded-full bg-ink px-3 py-1 text-white">{copy.crossesLabel}</span>}
          </div>
        </div>

        {/* Stops with the waits between them: vertical on phones, one line on desktop */}
        <ol key={day.key} className="flex flex-col px-5 py-7 sm:px-7 lg:flex-row lg:items-start lg:py-10">
          {day.stops.map((s, i) => {
            const last = i === day.stops.length - 1;
            return (
              <li key={`${s.time}-${s.place}`} className={`ledger-row relative flex gap-4 lg:flex-col lg:gap-0 ${last ? "" : "lg:flex-1"}`} style={{ animationDelay: `${i * 120}ms` }}>
                {/* Node + connector */}
                <div className="relative flex flex-col items-center lg:w-full lg:flex-row">
                  <span className={`relative z-10 block h-4 w-4 shrink-0 rounded-full ${i === 0 || last ? "bg-ink" : "border-2 border-sea bg-white"}`} aria-hidden="true" />
                  {!last && <span className="w-0.5 flex-1 bg-ink/15 lg:h-0.5 lg:w-auto" aria-hidden="true" />}
                </div>
                <div className={`pb-6 lg:pe-4 lg:pb-0 lg:pt-4 ${last ? "pb-0" : ""}`}>
                  <p className={`text-sm text-slate ${mono}`}>{s.time}</p>
                  <p className="mt-0.5 text-lg font-bold leading-snug">{s.place}</p>
                  {!last && (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-2.5 py-1 text-xs font-medium text-ink/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-sea" aria-hidden="true" />
                      {copy.waits}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="border-t border-ink/10 bg-ink/[0.02] px-5 py-4 text-[0.95rem] text-ink/80 sm:px-7">{day.note}</p>
      </div>
    </div>
  );
}
