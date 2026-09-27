"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { HourlyCopy } from "@/content/hourly";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** "Build your day": writes the hourly schedule into a WhatsApp message. */
export function DayRequest({ copy }: { copy: HourlyCopy["build"] }) {
  const id = useId();
  const f = copy.fields;
  const [v, setV] = useState({ date: "", start: "", hours: "", pickup: "", destinations: "", stops: "", passengers: "", luggage: "" });
  const [vehicle, setVehicle] = useState(copy.vehicles[0]);
  const [crossing, setCrossing] = useState(copy.crossingOptions[0]);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));
  const or = (x: string) => x.trim() || copy.notSet;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lines = [
      copy.messageIntro,
      `${f.date}: ${or(v.date)}`,
      `${f.start}: ${or(v.start)}`,
      `${f.hours}: ${or(v.hours)}`,
      `${f.pickup}: ${or(v.pickup)}`,
      `${f.destinations}: ${or(v.destinations)}`,
      `${f.stops}: ${or(v.stops)}`,
      `${f.passengers}: ${or(v.passengers)}`,
      `${f.luggage}: ${or(v.luggage)}`,
      `${f.vehicle}: ${vehicle}`,
      `${f.crossing}: ${crossing}`,
      copy.messageOutro,
    ];
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-12 w-full rounded-md border border-white/15 bg-white/[0.06] px-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-brass-lit sm:text-sm [color-scheme:dark]";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <Field label={f.date} htmlFor={`${id}-date`}>
        <input id={`${id}-date`} type="date" value={v.date} onChange={set("date")} className={field} />
      </Field>
      <Field label={f.start} htmlFor={`${id}-start`}>
        <input id={`${id}-start`} type="time" value={v.start} onChange={set("start")} className={field} />
      </Field>
      <Field label={f.hours} htmlFor={`${id}-hours`} span="col-span-2 sm:col-span-1">
        <input id={`${id}-hours`} inputMode="numeric" value={v.hours} onChange={set("hours")} placeholder={f.hoursPlaceholder} className={field} />
      </Field>
      <Field label={f.pickup} htmlFor={`${id}-pickup`} span="col-span-2 sm:col-span-3">
        <input id={`${id}-pickup`} value={v.pickup} onChange={set("pickup")} placeholder={f.pickupPlaceholder} className={field} />
      </Field>
      <Field label={f.destinations} htmlFor={`${id}-destinations`} span="col-span-2">
        <input id={`${id}-destinations`} value={v.destinations} onChange={set("destinations")} placeholder={f.destinationsPlaceholder} className={field} />
      </Field>
      <Field label={f.stops} htmlFor={`${id}-stops`} span="col-span-2 sm:col-span-1">
        <input id={`${id}-stops`} inputMode="numeric" value={v.stops} onChange={set("stops")} className={field} />
      </Field>
      <Field label={f.passengers} htmlFor={`${id}-passengers`}>
        <input id={`${id}-passengers`} inputMode="numeric" value={v.passengers} onChange={set("passengers")} className={field} />
      </Field>
      <Field label={f.luggage} htmlFor={`${id}-luggage`} span="col-span-1 sm:col-span-2">
        <input id={`${id}-luggage`} value={v.luggage} onChange={set("luggage")} placeholder={f.luggagePlaceholder} className={field} />
      </Field>
      <Field label={f.vehicle} htmlFor={`${id}-vehicle`}>
        <select id={`${id}-vehicle`} value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={`${field} [&>option]:text-ink`}>
          {copy.vehicles.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <Field label={f.crossing} htmlFor={`${id}-crossing`} span="col-span-1 sm:col-span-2">
        <select id={`${id}-crossing`} value={crossing} onChange={(e) => setCrossing(e.target.value)} className={`${field} [&>option]:text-ink`}>
          {copy.crossingOptions.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <button
        type="submit"
        className="col-span-2 mt-2 flex h-[52px] items-center justify-center gap-2 rounded-md bg-brass px-6 text-base font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brass-lit sm:col-span-3"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon className="h-5 w-5" color="currentColor" />
        {copy.submit}
      </button>
    </form>
  );
}

function Field({ label, htmlFor, span = "col-span-1", children }: { label: string; htmlFor: string; span?: string; children: ReactNode }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${span}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
    </div>
  );
}
