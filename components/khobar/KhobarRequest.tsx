"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { KhobarCopy } from "@/content/khobar";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** Address-first Khobar request: pickup and destination lead, the rest follows. */
export function KhobarRequest({ copy, secondaryMessage }: { copy: KhobarCopy["booking"]; secondaryMessage: string }) {
  const id = useId();
  const f = copy.fields;
  const [v, setV] = useState({ pickup: "", destination: "", date: "", time: "", passengers: "", luggage: "" });
  const [vehicle, setVehicle] = useState(copy.vehicles[0]);
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
    ];
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-12 w-full rounded-md border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-sea sm:text-sm";
  const big =
    "h-14 w-full rounded-md border-2 border-ink/15 bg-white ps-11 pe-3 text-base font-semibold text-ink outline-none transition-colors placeholder:font-normal placeholder:text-ink/35 focus:border-sea";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="flex flex-col gap-4">
      {/* The two addresses, joined by a line */}
      <div className="relative flex flex-col gap-3">
        <span className="absolute bottom-7 start-[21px] top-7 w-0.5 bg-ink/15" aria-hidden="true" />
        <Addr label={f.pickup} htmlFor={`${id}-pickup`} dot="bg-white border-2 border-ink">
          <input id={`${id}-pickup`} value={v.pickup} onChange={set("pickup")} placeholder={f.pickupPlaceholder} autoComplete="street-address" className={big} />
        </Addr>
        <Addr label={f.destination} htmlFor={`${id}-destination`} dot="bg-sea">
          <input id={`${id}-destination`} value={v.destination} onChange={set("destination")} placeholder={f.destinationPlaceholder} className={big} />
        </Addr>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
          <input id={`${id}-luggage`} value={v.luggage} onChange={set("luggage")} placeholder={f.luggagePlaceholder} className={field} />
        </Field>
        <Field label={f.vehicle} htmlFor={`${id}-vehicle`} wide>
          <select id={`${id}-vehicle`} value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={field}>
            {copy.vehicles.map((x) => <option key={x}>{x}</option>)}
          </select>
        </Field>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-[1.5fr_1fr]">
        <button
          type="submit"
          className="flex h-[52px] items-center justify-center gap-2 rounded-md bg-ink px-6 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-soft"
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

function Addr({ label, htmlFor, dot, children }: { label: string; htmlFor: string; dot: string; children: ReactNode }) {
  return (
    <div className="relative">
      <label htmlFor={htmlFor} className="sr-only">
        {label}
      </label>
      <span className={`pointer-events-none absolute start-4 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full ${dot}`} aria-hidden="true" />
      <span className="pointer-events-none absolute -top-2 start-9 z-10 bg-white px-1.5 text-[11px] font-semibold text-slate" aria-hidden="true">{label}</span>
      {children}
    </div>
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
