"use client";

import { useId, useState } from "react";
import type { HourlyCopy } from "@/content/hourly";

const mono = "font-[family-name:var(--font-mono)]";
const pad = (h: number) => `${String(h).padStart(2, "0")}:00`;

/**
 * A 24-hour dial: pick when the day starts and roughly when it ends, and the
 * arc shows the window you'd be booking. It's a planning aid only; the
 * actual minimum block and fare are confirmed by the team.
 */
export function DayWindow({ copy }: { copy: HourlyCopy["hours"] }) {
  const id = useId();
  const [start, setStart] = useState(9);
  const [finish, setFinish] = useState(17);
  const [crossing, setCrossing] = useState(false);
  const hours = Math.max(1, finish - start);

  const setS = (v: number) => {
    setStart(v);
    if (finish <= v) setFinish(Math.min(23, v + 1));
  };

  const select =
    "h-12 w-full rounded-md border border-ink/15 bg-white px-3 text-base outline-none transition-colors focus:border-sea sm:text-sm";

  return (
    <div className="grid grid-cols-1 items-center gap-8 rounded-xl bg-white p-6 ring-1 ring-ink/10 sm:grid-cols-[auto_1fr] sm:p-8">
      <figure className="mx-auto" aria-label={copy.clockLabel}>
        <svg viewBox="0 0 200 200" className="h-52 w-52 sm:h-60 sm:w-60" role="img" aria-label={`${copy.window}: ${pad(start)}–${pad(finish)}`}>
          {/* Hour ticks */}
          {Array.from({ length: 24 }).map((_, h) => {
            const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
            const r1 = h % 6 === 0 ? 70 : 74;
            return (
              <line
                key={h}
                x1={100 + Math.cos(a) * r1}
                y1={100 + Math.sin(a) * r1}
                x2={100 + Math.cos(a) * 78}
                y2={100 + Math.sin(a) * 78}
                stroke="currentColor"
                strokeWidth={h % 6 === 0 ? 2 : 1}
                className="text-ink/25"
              />
            );
          })}
          {[0, 6, 12, 18].map((h) => {
            const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
            return (
              <text key={h} x={100 + Math.cos(a) * 58} y={100 + Math.sin(a) * 58 + 4} textAnchor="middle" className={`fill-slate text-[10px] ${mono}`}>
                {String(h).padStart(2, "0")}
              </text>
            );
          })}
          <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="10" className="text-ink/[0.06]" />
          {/* The booking window */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            pathLength={24}
            strokeDasharray={`${hours} 24`}
            strokeDashoffset={-start}
            transform="rotate(-90 100 100)"
            className="text-sea transition-[stroke-dasharray,stroke-dashoffset] duration-500 ease-out"
          />
          <text x="100" y="98" textAnchor="middle" className={`fill-ink text-[30px] font-bold ${mono}`}>
            {hours}
          </text>
          <text x="100" y="118" textAnchor="middle" className="fill-slate text-[11px]">
            {copy.hoursUnit}
          </text>
        </svg>
      </figure>

      <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-start`} className="text-sm font-medium text-ink/80">{copy.start}</label>
            <select id={`${id}-start`} value={start} onChange={(e) => setS(Number(e.target.value))} className={`${select} ${mono}`}>
              {Array.from({ length: 18 }, (_, i) => i + 5).map((h) => (
                <option key={h} value={h}>{pad(h)}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-finish`} className="text-sm font-medium text-ink/80">{copy.finish}</label>
            <select id={`${id}-finish`} value={finish} onChange={(e) => setFinish(Number(e.target.value))} className={`${select} ${mono}`}>
              {Array.from({ length: 23 - start }, (_, i) => start + 1 + i).map((h) => (
                <option key={h} value={h}>{pad(h)}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium">
          <input type="checkbox" checked={crossing} onChange={(e) => setCrossing(e.target.checked)} className="h-5 w-5 accent-[var(--color-sea)]" />
          {copy.crossing}
        </label>

        <p className="mt-4 rounded-md bg-ink/[0.04] px-4 py-3 text-[0.95rem]" aria-live="polite">
          <span className="font-semibold">{copy.window}:</span>{" "}
          <span className={mono} dir="ltr">{pad(start)}–{pad(finish)}</span> · {hours} {copy.hoursUnit}
          {crossing && <span className="mt-1 block text-sm text-sea">{copy.crossingNote}</span>}
        </p>
      </div>
    </div>
  );
}
