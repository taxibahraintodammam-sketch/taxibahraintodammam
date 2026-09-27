"use client";

import { useState } from "react";
import { whatsappHref } from "@/content/business";
import type { FamilyGroupCopy } from "@/content/family-group";
import WhatsAppIcon from "@/components/WhatsAppIcon";

type Result = "sedan" | "suv" | "van" | "several";

// Stated fleet capacities (content/fleet.ts): sedan 3 people / 2 large bags,
// SUV 4 / 3, van 7 / 6. Hand luggage is included in those, so one cabin bag
// per passenger is free; extra cabin bags count as half a large case, and a
// stroller or bulky item as a whole one.
export function suggestVehicle(passengers: number, large: number, cabin: number, extras: number): Result {
  const load = large + extras + Math.max(0, cabin - passengers) * 0.5;
  if (passengers <= 3 && load <= 2) return "sedan";
  if (passengers <= 4 && load <= 3) return "suv";
  if (passengers <= 7 && load <= 6) return "van";
  return "several";
}

export function LuggageCalculator({ copy }: { copy: FamilyGroupCopy["luggage"]["calc"] }) {
  const [passengers, setPassengers] = useState(4);
  const [large, setLarge] = useState(2);
  const [cabin, setCabin] = useState(2);
  const [extras, setExtras] = useState(0);
  const result = suggestVehicle(passengers, large, cabin, extras);

  const message = copy.message
    .replace("{p}", String(passengers))
    .replace("{l}", String(large))
    .replace("{c}", String(cabin))
    .replace("{x}", String(extras));

  return (
    <div className="rounded-card bg-white p-5 shadow-elevation sm:p-7">
      <p className="text-sm font-semibold text-slate">{copy.title}</p>
      <div className="mt-4 divide-y divide-ink/10">
        <Stepper label={copy.passengers} value={passengers} min={1} max={30} onChange={setPassengers} />
        <Stepper label={copy.large} value={large} min={0} max={30} onChange={setLarge} />
        <Stepper label={copy.cabin} value={cabin} min={0} max={30} onChange={setCabin} />
        <Stepper label={copy.extras} hint={copy.extrasHint} value={extras} min={0} max={10} onChange={setExtras} />
      </div>

      <div className="mt-5 rounded-input bg-sea/[0.07] p-4" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wide text-sea rtl:normal-case">{copy.resultLead}</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink">{copy.results[result]}</p>
        <p className="mt-1 text-xs text-slate">{copy.disclaimer}</p>
      </div>

      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex h-12 items-center justify-center gap-2 rounded-input border border-ink/20 px-5 text-sm font-semibold text-ink transition-colors hover:border-sea hover:text-sea"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon className="h-4 w-4" color="currentColor" />
        {copy.cta}
      </a>
    </div>
  );
}

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-lg font-semibold text-ink transition-colors hover:border-ink/40 disabled:cursor-not-allowed disabled:opacity-30";
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="font-medium text-ink">{label}</p>
        {hint && <p className="text-xs text-slate">{hint}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3" role="group" aria-label={label}>
        <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`${label} −1`}>
          −
        </button>
        <output className="w-7 text-center font-[family-name:var(--font-display)] text-lg font-bold tabular-nums" aria-live="polite">
          {value}
        </output>
        <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`${label} +1`}>
          +
        </button>
      </div>
    </div>
  );
}
