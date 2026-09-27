"use client";

import { useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import { VEHICLE_LABEL, type VehicleClass } from "@/content/fares";
import { DMM_HERO } from "@/content/dmm-departure";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const VEHICLES: VehicleClass[] = ["sedan", "suv", "van", "luxury"];

function buildMessage(f: {
  date: string;
  time: string;
  airline: string;
  flightNo: string;
  address: string;
  passengers: string;
  luggage: string;
  vehicle: VehicleClass;
}) {
  return [
    DMM_HERO.messageIntro,
    `Flight date: ${f.date || "to confirm"}`,
    `Departure time: ${f.time || "to confirm"}`,
    `Airline: ${f.airline || "to confirm"}`,
    `Flight number: ${f.flightNo || "to confirm"}`,
    `Bahrain pickup address: ${f.address || "to confirm"}`,
    `Passengers: ${f.passengers}`,
    `Large suitcases: ${f.luggage}`,
    `Vehicle: ${VEHICLE_LABEL[f.vehicle]}`,
  ].join("\n");
}

/** The signature hero: a departure-board readout tied to the flight time the
 * visitor types, above the "Build My Airport Transfer" form. No booking is
 * actually calculated here — the board just mirrors what was typed. */
export function FlightHero() {
  const id = useId();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [airline, setAirline] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [address, setAddress] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [luggage, setLuggage] = useState("2");
  const [vehicle, setVehicle] = useState<VehicleClass>("sedan");

  const message = useMemo(
    () => buildMessage({ date, time, airline, flightNo, address, passengers, luggage, vehicle }),
    [date, time, airline, flightNo, address, passengers, luggage, vehicle]
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="border-b border-ink/10 bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-10 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-brass-lit">{DMM_HERO.eyebrow}</p>
            <h1 className="mt-3 text-[2rem] font-bold leading-tight lg:text-[2.9rem]">{DMM_HERO.heading}</h1>
            <p className="mt-5 max-w-xl text-white/75 lg:text-lg">{DMM_HERO.sub}</p>

            {/* Departure-board readout: mirrors the time typed into the form. */}
            <div
              dir="ltr"
              className="mt-8 w-full max-w-md rounded-card border border-white/15 bg-black/40 p-5 font-[family-name:var(--font-mono)]"
              aria-live="polite"
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/50">
                <span>{DMM_HERO.boardAirport}</span>
                <span>{DMM_HERO.boardCaption}</span>
              </div>
              <p className="mt-3 text-5xl font-extrabold tabular-nums text-brass-lit sm:text-6xl">
                {time || "--:--"}
              </p>
              <p className="mt-2 text-xs text-white/45">{date || DMM_HERO.boardHint}</p>
              <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-white/10 pt-4 text-[11px] font-semibold uppercase tracking-wide text-white/60">
                {DMM_HERO.chainLabels.map((label, i) => (
                  <li key={label} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">{"→"}</span>}
                    <span className={i === DMM_HERO.chainLabels.length - 1 ? "text-brass-lit" : undefined}>{label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <form
            id="build-transfer"
            onSubmit={onSubmit}
            aria-label={DMM_HERO.formHeading}
            className="scroll-mt-20 rounded-card bg-white p-6 text-ink shadow-elevation sm:p-8"
          >
            <h2 className="text-lg font-bold">{DMM_HERO.formHeading}</h2>

            <fieldset className="mt-5 border-t border-ink/10 pt-5">
              <legend className="text-xs font-bold uppercase tracking-wide text-slate">{DMM_HERO.steps.flight.label}</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Field label={DMM_HERO.steps.flight.date} htmlFor={`${id}-date`}>
                  <input id={`${id}-date`} type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
                </Field>
                <Field label={DMM_HERO.steps.flight.time} htmlFor={`${id}-time`}>
                  <input id={`${id}-time`} type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${inputClass} [color-scheme:light]`} />
                </Field>
                <Field label={DMM_HERO.steps.flight.airline} htmlFor={`${id}-airline`}>
                  <input id={`${id}-airline`} type="text" value={airline} onChange={(e) => setAirline(e.target.value)} placeholder="e.g. Gulf Air" className={inputClass} />
                </Field>
                <Field label={DMM_HERO.steps.flight.flightNo} htmlFor={`${id}-flightno`}>
                  <input id={`${id}-flightno`} type="text" value={flightNo} onChange={(e) => setFlightNo(e.target.value)} placeholder="e.g. GF150" className={inputClass} />
                </Field>
              </div>
            </fieldset>

            <fieldset className="mt-5 border-t border-ink/10 pt-5">
              <legend className="text-xs font-bold uppercase tracking-wide text-slate">{DMM_HERO.steps.pickup.label}</legend>
              <Field label={DMM_HERO.steps.pickup.address} htmlFor={`${id}-address`} className="mt-3">
                <input id={`${id}-address`} type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Juffair, near the Gulf Hotel" className={inputClass} />
              </Field>
            </fieldset>

            <fieldset className="mt-5 border-t border-ink/10 pt-5">
              <legend className="text-xs font-bold uppercase tracking-wide text-slate">{DMM_HERO.steps.who.label}</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Field label={DMM_HERO.steps.who.passengers} htmlFor={`${id}-pax`}>
                  <select id={`${id}-pax`} value={passengers} onChange={(e) => setPassengers(e.target.value)} className={inputClass}>
                    {["1", "2", "3", "4", "5", "6", "7"].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Field>
                <Field label={DMM_HERO.steps.who.luggage} htmlFor={`${id}-bags`}>
                  <select id={`${id}-bags`} value={luggage} onChange={(e) => setLuggage(e.target.value)} className={inputClass}>
                    {["0", "1", "2", "3", "4", "5", "6+"].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </fieldset>

            <fieldset className="mt-5 border-t border-ink/10 pt-5">
              <legend className="text-xs font-bold uppercase tracking-wide text-slate">{DMM_HERO.steps.vehicle.label}</legend>
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

            <button
              type="submit"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-input bg-brass px-6 text-base font-bold text-ink hover:bg-brass-lit"
              data-analytics="whatsapp_click"
            >
              {DMM_HERO.primaryCta}
            </button>
            <a
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-input border border-ink/15 px-6 text-sm font-semibold text-ink hover:border-sea"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-4 w-4" color="currentColor" />
              {DMM_HERO.secondaryCta}
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "h-11 w-full rounded-input border border-ink/15 bg-white px-3 text-sm text-ink outline-none focus:border-sea";

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={htmlFor} className="text-xs font-medium text-slate">
        {label}
      </label>
      {children}
    </div>
  );
}
