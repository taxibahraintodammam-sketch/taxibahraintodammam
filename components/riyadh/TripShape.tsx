"use client";

import Link from "next/link";
import { useState } from "react";
import type { RiyadhCopy } from "@/content/riyadh";
import { DirArrow } from "@/components/ui/DirArrow";

/** One way / return / a day in Riyadh: the route redraws for each shape. */
export function TripShape({ copy, hourlyHref }: { copy: RiyadhCopy["shape"]; hourlyHref: string }) {
  const [active, setActive] = useState(0);
  const opt = copy.options[active];

  return (
    <div className="mt-10">
      <div role="group" aria-label={copy.heading} className="inline-flex max-w-full flex-wrap rounded-full bg-white/10 p-1">
        {copy.options.map((o, i) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${i === active ? "bg-white text-ink" : "text-white/75 hover:text-white"}`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div key={opt.key} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14" aria-live="polite">
        <div>
          {/* The route, redrawn stop by stop */}
          <ol className="flex flex-wrap items-center gap-y-3">
            {opt.route.map((r, i) => {
              const ends = i === 0 || i === opt.route.length - 1;
              return (
                <li key={`${r}-${i}`} className="ledger-row flex items-center" style={{ animationDelay: `${i * 140}ms` }}>
                  <span className={`rounded-md px-3.5 py-2 text-sm font-bold ${ends ? "bg-white text-ink" : "bg-white/10 text-white"}`}>{r}</span>
                  {i < opt.route.length - 1 && <span className="mx-2 h-px w-6 bg-brass-lit sm:w-10" aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-white/75">{opt.note}</p>
          {opt.key === "day" && (
            <Link href={hourlyHref} className="mt-2 inline-block py-2 text-sm font-semibold text-brass-lit hover:underline">
              {copy.link} <DirArrow />
            </Link>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-white/55">{copy.bestLabel}</p>
          <ul className="mt-3 border-t border-white/15">
            {opt.best.map((b, i) => (
              <li key={b} className="ledger-row border-b border-white/15 py-3 text-white/90" style={{ animationDelay: `${150 + i * 100}ms` }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
