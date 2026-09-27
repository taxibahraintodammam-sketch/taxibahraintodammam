"use client";

import { useEffect, useRef, useState } from "react";
import type { HourlyCopy } from "@/content/hourly";

type Mode = "transfer" | "hourly";

/**
 * Normal transfer vs hourly hire on one track. It starts on the transfer
 * and, the first time it scrolls into view, turns into the hourly version
 * by itself (unless the visitor has already chosen, or prefers reduced
 * motion). After that it's a plain two-way toggle.
 */
export function TransferVsHourly({ copy }: { copy: HourlyCopy["waits"] }) {
  const [mode, setMode] = useState<Mode>("transfer");
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("hourly");
      return;
    }
    let t: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t = setTimeout(() => {
          if (!touched.current) setMode("hourly");
        }, 1400);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (t) clearTimeout(t);
    };
  }, []);

  const choose = (m: Mode) => {
    touched.current = true;
    setMode(m);
  };
  const flow = mode === "hourly" ? copy.hourlyFlow : copy.transferFlow;

  return (
    <div ref={ref} className="rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white/60">{copy.compareLabel}</p>
        <div role="group" aria-label={copy.compareLabel} className="flex rounded-full bg-white/10 p-1">
          {(["transfer", "hourly"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => choose(m)}
              className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${mode === m ? "bg-white text-ink" : "text-white/75 hover:text-white"}`}
            >
              {copy.toggle[m]}
            </button>
          ))}
        </div>
      </div>

      <ol key={mode} className="mt-7 flex flex-col" aria-live="polite">
        {flow.map((step, i) => {
          const last = i === flow.length - 1;
          const isWait = step.kind === "wait";
          const isBreak = step.kind === "end" || step.kind === "rebook";
          return (
            <li key={`${mode}-${i}`} className="ledger-row relative flex items-center gap-4 pb-4 last:pb-0" style={{ animationDelay: `${i * 110}ms` }}>
              {!last && (
                <span
                  className={`absolute start-[9px] top-6 h-[calc(100%-0.75rem)] w-0.5 ${step.kind === "end" ? "border-s-2 border-dashed border-white/25 bg-transparent" : mode === "hourly" ? "bg-brass-lit" : "bg-white/25"}`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isWait ? "border-2 border-dashed border-brass-lit bg-ink" : isBreak ? "border-2 border-white/40 bg-ink" : "bg-white"
                }`}
                aria-hidden="true"
              >
                {step.kind === "end" && <span className="h-2 w-2 bg-white/60" />}
              </span>
              <span
                className={
                  isWait
                    ? "rounded-full bg-brass-lit/15 px-3 py-1 text-sm font-semibold text-brass-lit"
                    : step.kind === "rebook"
                      ? "rounded-md border border-dashed border-white/30 px-3 py-1.5 text-sm text-white/70"
                      : step.kind === "end"
                        ? "text-sm text-white/55"
                        : "font-semibold text-white"
                }
              >
                {step.text}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
