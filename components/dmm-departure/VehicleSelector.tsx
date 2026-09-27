"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { withSlash } from "@/lib/url";
import { VEHICLE_LABEL, VEHICLE_CAPACITY, type VehicleClass } from "@/content/fares";
import { FLEET } from "@/content/fleet";
import { DMM_VEHICLE_SELECTOR } from "@/content/dmm-departure";
import { DirArrow } from "@/components/ui/DirArrow";

type TripStyle = (typeof DMM_VEHICLE_SELECTOR.tripStyles)[number]["value"];

/** Recommendation follows the published capacities in content/fares.ts
 * directly — no invented boot dimensions or seat counts. */
function recommend(passengers: number, bags: number, style: TripStyle): VehicleClass {
  if (style === "executive" && passengers <= 3 && bags <= 2) return "luxury";
  if (passengers <= 3 && bags <= 2) return "sedan";
  if (passengers <= 4 && bags <= 3) return "suv";
  return "van";
}

export function VehicleSelector() {
  const [passengers, setPassengers] = useState(2);
  const [bags, setBags] = useState(2);
  const [style, setStyle] = useState<TripStyle>("solo");

  const vehicle = useMemo(() => recommend(passengers, bags, style), [passengers, bags, style]);
  const fleetVehicle = FLEET.find((v) => v.vehicle === vehicle);

  return (
    <div className="rounded-card border border-ink/10 bg-white p-6 shadow-elevation sm:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-ink">Passengers</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DMM_VEHICLE_SELECTOR.passengerOptions.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPassengers(n)}
                aria-pressed={passengers === n}
                className={`h-9 w-9 rounded-input border text-sm font-semibold ${
                  passengers === n ? "border-sea bg-sea/10 text-sea" : "border-ink/15 text-ink/70 hover:border-ink/30"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Large suitcases</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DMM_VEHICLE_SELECTOR.bagOptions.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setBags(n)}
                aria-pressed={bags === n}
                className={`h-9 w-9 rounded-input border text-sm font-semibold ${
                  bags === n ? "border-sea bg-sea/10 text-sea" : "border-ink/15 text-ink/70 hover:border-ink/30"
                }`}
              >
                {n === 6 ? "6+" : n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Trip style</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DMM_VEHICLE_SELECTOR.tripStyles.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStyle(s.value)}
                aria-pressed={style === s.value}
                className={`rounded-input border px-2.5 py-1.5 text-xs font-semibold ${
                  style === s.value ? "border-sea bg-sea/10 text-sea" : "border-ink/15 text-ink/70 hover:border-ink/30"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-card bg-ink p-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brass-lit">{DMM_VEHICLE_SELECTOR.recommendLabel}</p>
          <p className="mt-1 text-2xl font-bold">{VEHICLE_LABEL[vehicle]}</p>
          <p className="mt-1 text-sm text-white/60">{VEHICLE_CAPACITY[vehicle]}</p>
        </div>
        {fleetVehicle && (
          <Link
            href={withSlash(`/fleet/${fleetVehicle.slug}`)}
            className="inline-flex shrink-0 items-center gap-1 py-1 text-sm font-semibold text-brass-lit hover:underline"
          >
            {fleetVehicle.name} <DirArrow />
          </Link>
        )}
      </div>
    </div>
  );
}
