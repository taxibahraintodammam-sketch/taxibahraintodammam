"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { RiyadhCopy } from "@/content/riyadh";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** Riyadh request: addresses first, then the trip details, written to WhatsApp. */
export function RiyadhRequest({ copy, secondaryMessage }: { copy: RiyadhCopy["booking"]; secondaryMessage: string }) {
  const id = useId();
  const f = copy.fields;
  const [v, setV] = useState({ pickup: "", destination: "", date: "", time: "", passengers: "", luggage: "", stops: "" });
  const [vehicle, setVehicle] = useState(copy.vehicles[0]);
  const [trip, setTrip] = useState(copy.trips[0]);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));
  const or = (x: string) => x.trim() || copy.notSet;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lines = [
      copy.messageIntro,
      `${f.pickup}: ${or(v.pickup)}`,
      `${f.destination}: ${or(v.destination)}`,
      `${f.date}: ${or(v.date)}`,
      `${f.time}: ${or(v.time)}`,
      `${f.passengers}: ${or(v.passengers)}`,
      `${f.luggage}: ${or(v.luggage)}`,
      `${f.vehicle}: ${vehicle}`,
      `${f.trip}: ${trip}`,
      `${f.stops}: ${or(v.stops)}`,
      copy.messageOutro,
    ];
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-12 w-full rounded-md border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-sea sm:text-sm";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="grid grid-cols-2 gap-4">
      <Field label={f.pickup} htmlFor={`${id}-pickup`} wide>
        <input id={`${id}-pickup`} value={v.pickup} onChange={set("pickup")} placeholder={f.pickupPlaceholder} className={field} />
      </Field>
      <Field label={f.destination} htmlFor={`${id}-destination`} wide>
        <input id={`${id}-destination`} value={v.destination} onChange={set("destination")} placeholder={f.destinationPlaceholder} className={field} />
      </Field>
      <Field label={f.date} htmlFor={`${id}-date`}>
        <input id={`${id}-date`} type="date" value={v.date} onChange={set("date")} className={field} />
      </Field>
      <Field label={f.time} htmlFor={`${id}-time`}>
        <input id={`${id}-time`} type="time" value={v.time} onChange={set("time")} className={field} />
      </Field>
      <Field label={f.passengers} htmlFor={`${id}-passengers`}>
        <input id={`${id}-passengers`} inputMode="numeric" value={v.passengers} onChange={set("passengers")} className={field} />
      </Field>
      <Field label={f.luggage} htmlFor={`${id}-luggage`}>
        <input id={`${id}-luggage`} inputMode="numeric" value={v.luggage} onChange={set("luggage")} className={field} />
      </Field>
      <Field label={f.vehicle} htmlFor={`${id}-vehicle`}>
        <select id={`${id}-vehicle`} value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={field}>
          {copy.vehicles.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <Field label={f.trip} htmlFor={`${id}-trip`}>
        <select id={`${id}-trip`} value={trip} onChange={(e) => setTrip(e.target.value)} className={field}>
          {copy.trips.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <Field label={f.stops} htmlFor={`${id}-stops`} wide>
        <input id={`${id}-stops`} value={v.stops} onChange={set("stops")} placeholder={f.stopsPlaceholder} className={field} />
      </Field>
      <div className="col-span-2 mt-2 grid grid-cols-1 gap-3 sm:grid-cols-[1.4fr_1fr]">
        <button
          type="submit"
          className="flex h-[52px] items-center justify-center rounded-md bg-ink px-6 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft"
          data-analytics="whatsapp_click"
        >
          {copy.submit}
        </button>
        <a
          href={whatsappHref(secondaryMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[52px] items-center justify-center gap-2 rounded-md border border-ink/20 px-5 font-semibold transition-colors hover:border-ink/50"
          data-analytics="whatsapp_click"
        >
          <WhatsAppIcon className="h-5 w-5" color="currentColor" />
          {copy.secondary}
        </a>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, wide, children }: { label: string; htmlFor: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${wide ? "col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink/80">
        {label}
      </label>
      {children}
    </div>
  );
}
