"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { SuvCopy } from "@/content/suv";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** "Tell us what you're carrying": writes the SUV fare request into WhatsApp. */
export function SuvRequest({ copy }: { copy: SuvCopy["booking"] }) {
  const id = useId();
  const f = copy.fields;
  const [v, setV] = useState({ pickup: "", destination: "", date: "", time: "", passengers: "", bags: "", hand: "", special: "" });
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
      `${f.bags}: ${or(v.bags)}`,
      `${f.hand}: ${or(v.hand)}`,
      `${f.special}: ${or(v.special)}`,
      `${f.vehicle}: ${copy.vehicleValue}`,
    ];
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-12 w-full rounded-md border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-sea sm:text-sm";
  const small = `${field} font-[family-name:var(--font-mono)]`;

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Field label={f.pickup} htmlFor={`${id}-pickup`} span="col-span-2">
        <input id={`${id}-pickup`} value={v.pickup} onChange={set("pickup")} placeholder={f.pickupPlaceholder} className={field} />
      </Field>
      <Field label={f.destination} htmlFor={`${id}-destination`} span="col-span-2">
        <input id={`${id}-destination`} value={v.destination} onChange={set("destination")} placeholder={f.destinationPlaceholder} className={field} />
      </Field>
      <Field label={f.date} htmlFor={`${id}-date`} span="col-span-1 sm:col-span-2">
        <input id={`${id}-date`} type="date" value={v.date} onChange={set("date")} className={field} />
      </Field>
      <Field label={f.time} htmlFor={`${id}-time`} span="col-span-1 sm:col-span-2">
        <input id={`${id}-time`} type="time" value={v.time} onChange={set("time")} className={field} />
      </Field>
      <Field label={f.passengers} htmlFor={`${id}-passengers`}>
        <input id={`${id}-passengers`} inputMode="numeric" value={v.passengers} onChange={set("passengers")} placeholder="1–4" className={small} />
      </Field>
      <Field label={f.bags} htmlFor={`${id}-bags`}>
        <input id={`${id}-bags`} inputMode="numeric" value={v.bags} onChange={set("bags")} placeholder="0–3" className={small} />
      </Field>
      <Field label={f.hand} htmlFor={`${id}-hand`} span="col-span-2">
        <input id={`${id}-hand`} value={v.hand} onChange={set("hand")} className={field} />
      </Field>
      <Field label={f.special} htmlFor={`${id}-special`} span="col-span-2 sm:col-span-3">
        <input id={`${id}-special`} value={v.special} onChange={set("special")} placeholder={f.specialPlaceholder} className={field} />
      </Field>
      <Field label={f.vehicle} htmlFor={`${id}-vehicle`}>
        <input id={`${id}-vehicle`} value={copy.vehicleValue} readOnly className={`${field} bg-ink/[0.04] font-semibold`} />
      </Field>
      <button
        type="submit"
        className="col-span-2 mt-2 flex h-[52px] items-center justify-center gap-2 rounded-md bg-ink px-6 text-base font-bold text-white transition-colors hover:bg-ink-soft sm:col-span-4"
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
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink/80">
        {label}
      </label>
      {children}
    </div>
  );
}
