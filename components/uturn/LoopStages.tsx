"use client";

import { useState } from "react";
import type { UturnCopy } from "@/content/uturn";

const mono = "font-[family-name:var(--font-mono)]";

/**
 * The nine stages drawn as an actual U: out along the top (Bahrain → Saudi),
 * the turn on the right, back along the bottom (Saudi → Bahrain). Phones get
 * the same stages as a vertical list. Checkpoint stages are marked.
 */
export function LoopStages({ copy }: { copy: UturnCopy["journey"] }) {
  const [active, setActive] = useState(0);
  const s = copy.stages;
  const stage = s[active];
  const top = [0, 1, 2, 3];
  const bottom = [8, 7, 6, 5];

  const node = (i: number) => {
    const st = s[i];
    const on = i === active;
    const check = st.kind === "check";
    return (
      <button
        key={st.n}
        type="button"
        onClick={() => setActive(i)}
        aria-pressed={on}
        className="group flex flex-col items-center gap-2 px-1 text-center"
      >
        <span
          className={`relative z-10 flex h-10 w-10 items-center justify-center text-xs transition-all duration-300 ${mono} ${check ? "rounded-md" : "rounded-full"} ${
            on ? "scale-110 bg-sea text-white shadow-[0_0_0_6px_rgba(6,85,255,0.15)]" : check ? "border-2 border-ink bg-white text-ink group-hover:border-sea" : "bg-ink text-white group-hover:bg-sea"
          }`}
        >
          {st.n}
        </span>
        <span className={`text-sm font-bold leading-tight transition-colors ${on ? "text-sea" : "text-ink group-hover:text-sea"}`} dir="auto">{st.name}</span>
        {check && <span className="text-[10px] font-semibold uppercase tracking-wide text-slate rtl:normal-case">{copy.checkpoint}</span>}
      </button>
    );
  };

  const detail = (
    <div key={stage.n} className="ledger-row rounded-xl bg-ink p-5 text-white sm:p-6" aria-live="polite">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`text-sm text-brass-lit ${mono}`}>{stage.n}</span>
        <p className="text-lg font-bold">{stage.name}</p>
        {stage.kind === "check" && <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-semibold">{copy.checkpoint}</span>}
      </div>
      <p className="mt-2 text-white/80">{stage.body}</p>
      <p className="mt-3 text-sm text-white/55">
        {copy.whoLabel}: <span className="font-semibold text-white">{stage.who}</span>
      </p>
    </div>
  );

  return (
    <div className="mt-12">
      {/* Desktop: the U */}
      <div className="hidden lg:block">
        <div className="relative pe-28" dir="ltr">
          {/* Lines: top lane, bottom lane, and the bend joining them */}
          <span className="absolute left-[12.5%] right-28 top-5 h-0.5 bg-ink/15" aria-hidden="true" />
          <span className="absolute bottom-[4.25rem] left-[12.5%] right-28 h-0.5 bg-ink/15" aria-hidden="true" />
          <span className="absolute bottom-[4.25rem] right-10 top-5 w-[4.5rem] rounded-e-full border-2 border-s-0 border-ink/15" aria-hidden="true" />
          <div className="grid grid-cols-4">{top.map(node)}</div>
          <div className="h-16" />
          <div className="grid grid-cols-4">{bottom.map(node)}</div>
          {/* The turn sits on the bend */}
          <div className="absolute right-0 top-1/2 w-28 -translate-y-1/2">{node(4)}</div>
          {/* Direction hints */}
          <span className="absolute left-0 top-3 text-slate" aria-hidden="true">→</span>
          <span className="absolute bottom-[3.75rem] left-0 text-slate" aria-hidden="true">←</span>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">{detail}</div>
      </div>

      {/* Phones: vertical, opens in place */}
      <ol className="lg:hidden">
        {s.map((st, i) => {
          const on = i === active;
          const check = st.kind === "check";
          return (
            <li key={st.n} className="relative grid grid-cols-[2.5rem_1fr] gap-3 pb-5 last:pb-0">
              {i < s.length - 1 && <span className={`absolute bottom-0 start-[19px] top-10 w-0.5 ${st.kind === "turn" || i === 3 ? "bg-sea" : "bg-ink/15"}`} aria-hidden="true" />}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={on}
                aria-label={st.name}
                className={`relative z-10 flex h-10 w-10 items-center justify-center text-xs ${mono} ${check ? "rounded-md" : "rounded-full"} ${on ? "bg-sea text-white" : check ? "border-2 border-ink bg-white" : "bg-ink text-white"}`}
              >
                {st.kind === "turn" ? "↺" : st.n}
              </button>
              <div className="pt-1.5">
                <button type="button" onClick={() => setActive(i)} className={`text-start font-bold ${on ? "text-sea" : ""}`}>
                  {st.name}
                  {check && <span className="ms-2 text-[10px] font-semibold uppercase tracking-wide text-slate rtl:normal-case">{copy.checkpoint}</span>}
                </button>
                {on && <div className="mt-3">{detail}</div>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
