"use client";

import { useEffect, useRef, useState } from "react";
import type { CorporateCopy } from "@/content/corporate";

const STEP_MS = 1700;

/**
 * An example trip request walking through its lifecycle
 * (request → confirmation → driver & vehicle → trip → record). It only
 * animates while on screen, pauses on hover, and shows the finished state
 * straight away for reduced-motion users. Purely illustrative.
 */
export function RequestLifecycle({ copy }: { copy: CorporateCopy["request"] }) {
  const last = copy.stages.length - 1;
  const [stage, setStage] = useState(last); // server + no-JS: completed state
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
    setStage(0);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!animate || !visible || paused) return;
    const t = setTimeout(() => setStage((s) => (s >= last ? 0 : s + 1)), stage === last ? STEP_MS * 2 : STEP_MS);
    return () => clearTimeout(t);
  }, [animate, visible, paused, stage, last]);

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
      {/* The request itself */}
      <div className="overflow-hidden rounded-lg border border-ink/15 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-ink/10 bg-ink/[0.03] px-5 py-3">
          <p className="text-xs font-semibold text-slate">{copy.tag}</p>
          <span
            className={`rounded-md px-2 py-0.5 font-[family-name:var(--font-mono)] text-[11px] font-semibold transition-colors duration-300 ${
              stage === last ? "bg-success/15 text-success" : "bg-sea/10 text-sea"
            }`}
            aria-live="polite"
          >
            {copy.stages[stage]}
          </span>
        </div>
        <dl className="divide-y divide-ink/[0.07]">
          {copy.fields.map((f) => (
            <div key={f.label} className="grid grid-cols-[8.5rem_1fr] gap-3 px-5 py-2.5 text-sm">
              <dt className="text-slate">{f.label}</dt>
              <dd className="font-medium text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The lifecycle it moves through */}
      <ol className="flex flex-col justify-center">
        {copy.stages.map((s, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <li key={s} className="relative grid grid-cols-[2.25rem_1fr] items-center gap-3 pb-5 last:pb-0">
              {i < copy.stages.length - 1 && (
                <span className={`absolute start-[17px] top-9 h-[calc(100%-2rem)] w-0.5 transition-colors duration-500 ${i < stage ? "bg-sea" : "bg-ink/10"}`} aria-hidden="true" />
              )}
              <span
                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full font-[family-name:var(--font-mono)] text-xs transition-all duration-500 ${
                  current ? "scale-110 bg-sea text-white shadow-[0_0_0_6px_rgba(6,85,255,0.12)]" : done ? "bg-ink text-white" : "border border-ink/15 bg-white text-slate"
                }`}
                aria-hidden="true"
              >
                {done ? "✓" : i + 1}
              </span>
              <span className={`font-semibold transition-colors duration-500 ${current ? "text-sea" : done ? "text-ink" : "text-slate"}`}>{s}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
