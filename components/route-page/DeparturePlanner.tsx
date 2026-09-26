"use client";

import { useId, useState } from "react";
import { whatsappHref } from "@/content/business";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// Guidance published on the Bahrain → DMM page: reach the terminal 2.5–3 h
// before an international flight; the drive is 80–100 min. Use the cautious
// end of both.
const TERMINAL_BUFFER_MIN = 180;
const DRIVE_MAX_MIN = 100;

function suggestedPickup(time: string, dayBefore: string): string | null {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const total = Number(match[1]) * 60 + Number(match[2]) - TERMINAL_BUFFER_MIN - DRIVE_MAX_MIN;
  const wrapped = ((total % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped - h * 60;
  // Round down to the quarter hour: a suggestion, not a promise.
  const q = m - (m % 15);
  return `${String(h).padStart(2, "0")}:${String(q).padStart(2, "0")}${total < 0 ? ` (${dayBefore})` : ""}`;
}

export function DeparturePlanner({
  copy,
}: {
  copy: { dayBefore: string; flightLabel: string; resultLead: string; resultEmpty: string; caveat: string; cta: string; message: string };
}) {
  const id = useId();
  const [time, setTime] = useState("");
  const pickup = suggestedPickup(time, copy.dayBefore);

  return (
    <div className="rounded-card bg-white p-6 text-ink shadow-elevation sm:p-8">
      <label htmlFor={id} className="text-sm font-semibold">
        {copy.flightLabel}
      </label>
      <input
        id={id}
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="mt-2 h-12 w-full rounded-input border border-ink/15 px-3 text-base outline-none [color-scheme:light] focus:border-sea"
      />
      <p className="mt-5 min-h-[3.5rem]" aria-live="polite">
        {pickup ? (
          <>
            <span className="block text-sm text-slate">{copy.resultLead}</span>
            <span dir="ltr" className="font-[family-name:var(--font-display)] text-3xl font-extrabold">
              {pickup}
            </span>
          </>
        ) : (
          <span className="text-sm text-slate">{copy.resultEmpty}</span>
        )}
      </p>
      <p className="mt-3 text-xs text-slate">{copy.caveat}</p>
      <a
        href={whatsappHref(copy.message.replace("{time}", time || ""))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex h-12 items-center justify-center gap-2 rounded-input bg-brass px-5 text-sm font-bold text-ink hover:bg-brass-lit"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon className="h-4 w-4" color="currentColor" />
        {copy.cta}
      </a>
    </div>
  );
}
