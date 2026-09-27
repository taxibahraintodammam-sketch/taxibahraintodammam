"use client";

import { useState } from "react";
import { DMM_SCENARIOS } from "@/content/dmm-departure";

type Tab = "flight" | "road";

/** Two delay types with two different fixes; a tab keeps both visible-on-demand
 * without duplicating the explanation in a way that competes for attention. */
export function ScenarioToggle() {
  const [tab, setTab] = useState<Tab>("flight");
  const panel = tab === "flight" ? DMM_SCENARIOS.flightDelay : DMM_SCENARIOS.roadDelay;

  return (
    <div className="rounded-card border border-ink/10 bg-white p-6 sm:p-8">
      <div role="tablist" aria-label="Delay scenario" className="flex gap-2">
        {(["flight", "road"] as const).map((t) => {
          const label = t === "flight" ? DMM_SCENARIOS.flightDelay.title : DMM_SCENARIOS.roadDelay.title;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-input px-4 py-2 text-sm font-semibold ${
                tab === t ? "bg-ink text-white" : "border border-ink/15 text-ink/70 hover:border-ink/30"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-5">
        <p className="text-ink/85">{panel.body}</p>
        <ol className="mt-4 flex flex-col gap-2">
          {panel.steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-sm text-ink/80">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sea/10 text-xs font-bold text-sea">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
