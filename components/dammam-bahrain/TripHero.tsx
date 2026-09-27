"use client";

import { useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import { VEHICLE_LABEL, type VehicleClass } from "@/content/fares";
import { DB_HERO } from "@/content/dammam-bahrain";

const VEHICLES: VehicleClass[] = ["sedan", "suv", "van", "luxury"];

function buildMessage(f: {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  vehicle: VehicleClass;
  reason: string;
}) {
  return [
    DB_HERO.messageIntro,
    `Pickup location in Dammam: ${f.pickup || "to confirm"}`,
    `Bahrain destination: ${f.destination || "to confirm"}`,
    `Date: ${f.date || "to confirm"}`,
    `Pickup time: ${f.time || "to confirm"}`,
    `Passengers: ${f.passengers}`,
    `Large bags: ${f.luggage}`,
    `Vehicle: ${VEHICLE_LABEL[f.vehicle]}`,
    `Why travelling: ${f.reason || "not specified"}`,
  ].join("\n");
}

/** Hero with a static "route so far" strip (not live GPS) and a booking form
 * that hands off to a real WhatsApp conversation — there is no backend
 * fare engine here. */
export function TripHero() {
  const id = useId();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [luggage, setLuggage] = useState("2");
  const [vehicle, setVehicle] = useState<VehicleClass>("sedan");
  const [reason, setReason] = useState("");

  const message = useMemo(
    () => buildMessage({ pickup, destination, date, time, passengers, luggage, vehicle, reason }),
    [pickup, destination, date, time, passengers, luggage, vehicle, reason]
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-10 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-brass">{DB_HERO.eyebrow}</p>
            <h1 className="mt-3 text-[2rem] font-bold leading-tight text-ink lg:text-[2.9rem]">{DB_HERO.heading}</h1>
            <p className="mt-5 max-w-xl text-slate lg:text-lg">{DB_HERO.sub}</p>

            {/* Route strip: a planning label, explicitly not live tracking. */}
            <div dir="ltr" className="mt-10">
              <p className="eyebrow text-slate">{DB_HERO.routeCaption}</p>
              <div className="relative mt-4 h-3">
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink/10" aria-hidden="true" />
                <span
                  className="route-draw absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-sea"
                  style={{ animationDuration: "2.6s" }}
                  aria-hidden="true"
                />
                <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-ink" aria-hidden="true" />
                <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-sea" aria-hidden="true" />
              </div>
              <ol className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs font-semibold text-ink/70">
                {DB_HERO.routeLabels.map((label, i) => (
                  <li key={label} className={i === 0 || i === DB_HERO.routeLabels.length - 1 ? "font-bold text-ink" : undefined}>
                    {label}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <form
            id="build-trip"
            onSubmit={onSubmit}
            aria-label={DB_HERO.formHeading}
            className="scroll-mt-20 rounded-card border border-ink/10 bg-white p-6 shadow-elevation sm:p-8"
          >
            <h2 className="text-lg font-bold text-ink">{DB_HERO.formHeading}</h2>

            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-ink/10 pt-5 sm:grid-cols-2">
              <Field label={DB_HERO.fields.pickup} htmlFor={`${id}-pickup`}>
                <input id={`${id}-pickup`} type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="e.g. Dammam Corniche" className={inputClass} />
              </Field>
              <Field label={DB_HERO.fields.destination} htmlFor={`${id}-dest`}>
                <input id={`${id}-dest`} type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Juffair, Bahrain" className={inputClass} />
              </Field>
              <Field label={DB_HERO.fields.date} htmlFor={`${id}-date`}>
                <input id={`${id}-date`} type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
              </Field>
              <Field label={DB_HERO.fields.time} htmlFor={`${id}-time`}>
                <input id={`${id}-time`} type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${inputClass} [color-scheme:light]`} />
              </Field>
              <Field label={DB_HERO.fields.passengers} htmlFor={`${id}-pax`}>
                <select id={`${id}-pax`} value={passengers} onChange={(e) => setPassengers(e.target.value)} className={inputClass}>
                  {["1", "2", "3", "4", "5", "6", "7"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </Field>
              <Field label={DB_HERO.fields.luggage} htmlFor={`${id}-bags`}>
                <select id={`${id}-bags`} value={luggage} onChange={(e) => setLuggage(e.target.value)} className={inputClass}>
                  {["0", "1", "2", "3", "4", "5", "6+"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </Field>
            </div>

            <fieldset className="mt-4 border-t border-ink/10 pt-4">
              <legend className="text-xs font-bold uppercase tracking-wide text-slate">{DB_HERO.fields.vehicle}</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {VEHICLES.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVehicle(v)}
                    aria-pressed={vehicle === v}
                    className={`rounded-input border px-2 py-2 text-xs font-semibold ${
                      vehicle === v ? "border-sea bg-sea/10 text-sea" : "border-ink/15 text-ink/70 hover:border-ink/30"
                    }`}
                  >
                    {VEHICLE_LABEL[v]}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-4 border-t border-ink/10 pt-4">
              <legend className="text-xs font-bold uppercase tracking-wide text-slate">{DB_HERO.fields.reason}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {DB_HERO.reasons.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReason(r)}
                    aria-pressed={reason === r}
                    className={`rounded-input border px-3 py-1.5 text-xs font-semibold ${
                      reason === r ? "border-sea bg-sea/10 text-sea" : "border-ink/15 text-ink/70 hover:border-ink/30"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-input bg-brass px-6 text-base font-bold text-ink hover:bg-brass-lit"
              data-analytics="whatsapp_click"
            >
              {DB_HERO.primaryCta}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "h-11 w-full rounded-input border border-ink/15 bg-white px-3 text-sm text-ink outline-none focus:border-sea";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-xs font-medium text-slate">
        {label}
      </label>
      {children}
    </div>
  );
}
