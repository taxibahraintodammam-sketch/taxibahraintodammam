"use client";

import { useId, useMemo, useState } from "react";
import { whatsappHref } from "@/content/business";
import { DMM_CALCULATOR } from "@/content/dmm-departure";

type FlightType = (typeof DMM_CALCULATOR.flightTypes)[number]["value"];

// Airport-side buffer: an international departure needs meaningfully more
// terminal time than a regional one. Mid-points of the ranges named on this
// page (2.5-3h international; a shorter regional allowance).
const AIRPORT_BUFFER_MIN: Record<FlightType, number> = { international: 165, regional: 105 };
const DRIVE_MIN_MIN = 80;
const DRIVE_MAX_MIN = 100;
const BORDER_UNCERTAINTY_MIN = 20;

function minutesToClock(totalMinutes: number): { clock: string; dayBefore: boolean } {
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped - h * 60;
  const q = m - (m % 5);
  return { clock: `${String(h).padStart(2, "0")}:${String(q).padStart(2, "0")}`, dayBefore: totalMinutes < 0 };
}

function computeWindow(flightTime: string, flightType: FlightType) {
  const match = /^(\d{2}):(\d{2})$/.exec(flightTime);
  if (!match) return null;
  const flightMinutes = Number(match[1]) * 60 + Number(match[2]);
  const airportBuffer = AIRPORT_BUFFER_MIN[flightType];
  const comfortable = minutesToClock(flightMinutes - airportBuffer - DRIVE_MAX_MIN - BORDER_UNCERTAINTY_MIN);
  const tightest = minutesToClock(flightMinutes - airportBuffer - DRIVE_MIN_MIN);
  return { comfortable, tightest };
}

/** A planning aid, not a booking engine: shows a range built from the page's
 * own published figures, then hands off to a human confirmation on WhatsApp. */
export function PlanningCalculator() {
  const id = useId();
  const [flightTime, setFlightTime] = useState("");
  const [flightType, setFlightType] = useState<FlightType>("international");
  const [pickup, setPickup] = useState("");
  const [passengers, setPassengers] = useState("2");

  const window_ = useMemo(() => computeWindow(flightTime, flightType), [flightTime, flightType]);

  const message = [
    "Hi, I'd like help planning a Bahrain to Dammam Airport pickup.",
    `Flight departure time: ${flightTime || "to confirm"}`,
    `Flight type: ${flightType === "international" ? "International" : "Regional / domestic"}`,
    `Pickup area: ${pickup || "to confirm"}`,
    `Passengers: ${passengers}`,
  ].join("\n");

  return (
    <div className="rounded-card border border-ink/10 bg-white p-6 shadow-elevation sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-time`} className="text-sm font-medium text-ink">
            {DMM_CALCULATOR.labels.flightTime}
          </label>
          <input
            id={`${id}-time`}
            type="time"
            value={flightTime}
            onChange={(e) => setFlightTime(e.target.value)}
            className="h-11 rounded-input border border-ink/15 px-3 text-sm outline-none [color-scheme:light] focus:border-sea"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-type`} className="text-sm font-medium text-ink">
            {DMM_CALCULATOR.labels.flightType}
          </label>
          <select
            id={`${id}-type`}
            value={flightType}
            onChange={(e) => setFlightType(e.target.value as FlightType)}
            className="h-11 rounded-input border border-ink/15 px-3 text-sm outline-none focus:border-sea"
          >
            {DMM_CALCULATOR.flightTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-pickup`} className="text-sm font-medium text-ink">
            {DMM_CALCULATOR.labels.pickup}
          </label>
          <input
            id={`${id}-pickup`}
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Manama"
            className="h-11 rounded-input border border-ink/15 px-3 text-sm outline-none focus:border-sea"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-pax`} className="text-sm font-medium text-ink">
            {DMM_CALCULATOR.labels.passengers}
          </label>
          <select
            id={`${id}-pax`}
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="h-11 rounded-input border border-ink/15 px-3 text-sm outline-none focus:border-sea"
          >
            {["1", "2", "3", "4", "5", "6", "7"].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 border-t border-ink/10 pt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate">
          {DMM_CALCULATOR.breakdown.map((b) => b.label).join(" + ")}
        </p>

        <p className="mt-4 text-sm font-semibold text-slate" aria-live="polite">
          {DMM_CALCULATOR.resultLabel}
        </p>
        {window_ ? (
          <p dir="ltr" className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink sm:text-3xl">
            {window_.comfortable.clock}
            {window_.comfortable.dayBefore ? " (day before)" : ""} &ndash; {window_.tightest.clock}
            {window_.tightest.dayBefore ? " (day before)" : ""}
          </p>
        ) : (
          <p className="mt-1 text-sm text-slate">Enter your flight time above to see a planning window.</p>
        )}
        <p className="mt-3 text-xs text-slate">{DMM_CALCULATOR.resultCaveat}</p>
      </div>

      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex h-12 items-center justify-center rounded-input bg-brass px-5 text-sm font-bold text-ink hover:bg-brass-lit"
        data-analytics="whatsapp_click"
      >
        {DMM_CALCULATOR.cta}
      </a>
    </div>
  );
}
