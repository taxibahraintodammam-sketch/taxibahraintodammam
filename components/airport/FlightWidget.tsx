"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { AirportCopy } from "@/content/airport";
import WhatsAppIcon from "@/components/WhatsAppIcon";

type Dir = "arriving" | "departing";
const PAX = ["1", "2", "3", "4", "5", "6", "7", "8+"];
const BAGS = ["0", "1", "2", "3", "4", "5", "6", "7+"];

/**
 * Flight-card style trip widget. Arriving and departing ask for different
 * things (a landing + destination vs. a pickup + departure), which is the
 * point: the message we receive already reads like an airport booking.
 */
export function FlightWidget({ copy, id }: { copy: AirportCopy["widget"]; id?: string }) {
  const uid = useId();
  const [dir, setDir] = useState<Dir>("arriving");
  const [airport, setAirport] = useState(copy.airports[0]);
  const [flight, setFlight] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [pax, setPax] = useState("2");
  const [bags, setBags] = useState("2");
  const arriving = dir === "arriving";
  const or = (v: string) => v.trim() || copy.notSet;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lines = [
      copy.intro[dir],
      `${copy.airport}: ${airport}`,
      `${copy.flight}: ${or(flight)}`,
      `${copy.date}: ${or(date)}`,
      `${arriving ? copy.timeArriving : copy.timeDeparting}: ${or(time)}`,
      `${arriving ? copy.destination : copy.pickup}: ${or(place)}`,
      `${copy.passengers}: ${pax}`,
      `${copy.bags}: ${bags}`,
    ];
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-11 w-full rounded-input border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors focus:border-sea sm:text-sm";

  return (
    <form id={id} onSubmit={submit} aria-label={copy.title} className="scroll-mt-24 overflow-hidden rounded-[20px] bg-white text-ink shadow-elevation">
      {/* Header strip: direction toggle */}
      <div className="flex flex-col gap-2 bg-ink/[0.04] px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-slate rtl:tracking-normal">{copy.title}</p>
        <fieldset className="grid grid-cols-2 rounded-full bg-white p-0.5 ring-1 ring-ink/10">
          <legend className="sr-only">{copy.title}</legend>
          {(["arriving", "departing"] as const).map((d) => (
            <label key={d} className="relative">
              <input type="radio" name={`${uid}-dir`} checked={dir === d} onChange={() => setDir(d)} className="peer sr-only" />
              <span className="flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-semibold text-slate transition-colors peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brass-lit">
                {d === "arriving" ? `↓ ${copy.arriving}` : `↑ ${copy.departing}`}
              </span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-5 py-5 sm:px-6">
        <Field label={copy.airport} htmlFor={`${uid}-airport`} wide>
          <select id={`${uid}-airport`} value={airport} onChange={(e) => setAirport(e.target.value)} className={field}>
            {copy.airports.map((a) => <option key={a}>{a}</option>)}
          </select>
        </Field>
        <Field label={copy.flight} htmlFor={`${uid}-flight`}>
          <input id={`${uid}-flight`} value={flight} onChange={(e) => setFlight(e.target.value.toUpperCase())} placeholder={copy.flightPlaceholder} autoCapitalize="characters" className={`${field} font-[family-name:var(--font-mono)] uppercase placeholder:normal-case placeholder:font-[family-name:var(--font-body)]`} />
        </Field>
        <Field label={copy.date} htmlFor={`${uid}-date`} half>
          <input id={`${uid}-date`} type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${field} [color-scheme:light]`} />
        </Field>
        <Field label={arriving ? copy.timeArriving : copy.timeDeparting} htmlFor={`${uid}-time`} half>
          <input id={`${uid}-time`} type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${field} [color-scheme:light]`} />
        </Field>
        <div className="col-span-2 grid grid-cols-2 items-end gap-3 sm:col-span-1">
          <Field label={copy.passengers} htmlFor={`${uid}-pax`} half>
            <select id={`${uid}-pax`} value={pax} onChange={(e) => setPax(e.target.value)} className={field}>
              {PAX.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label={copy.bags} htmlFor={`${uid}-bags`} half>
            <select id={`${uid}-bags`} value={bags} onChange={(e) => setBags(e.target.value)} className={field}>
              {BAGS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
        </div>
        <Field label={arriving ? copy.destination : copy.pickup} htmlFor={`${uid}-place`} wide>
          <input
            id={`${uid}-place`}
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder={arriving ? copy.destinationPlaceholder : copy.pickupPlaceholder}
            className={field}
          />
        </Field>
      </div>

      {/* Perforation, like a boarding pass tear-off */}
      <div className="mx-5 border-t-2 border-dashed border-ink/10 sm:mx-6" aria-hidden="true" />
      <div className="px-5 py-5 sm:px-6">
        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-input bg-brass px-6 text-base font-bold text-ink transition-colors hover:bg-brass-lit"
          data-analytics="whatsapp_click"
        >
          <WhatsAppIcon className="h-5 w-5" color="currentColor" />
          {copy.submit}
        </button>
        <p className="mt-2 text-center text-xs text-slate">{copy.note}</p>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, wide, half, children }: { label: string; htmlFor: string; wide?: boolean; half?: boolean; children: ReactNode }) {
  const span = wide ? "col-span-2" : half ? "col-span-1" : "col-span-2 sm:col-span-1";
  return (
    <div className={`flex min-w-0 flex-col gap-1 ${span}`}>
      <label htmlFor={htmlFor} className="text-[11px] font-bold uppercase tracking-wide text-slate rtl:normal-case">
        {label}
      </label>
      {children}
    </div>
  );
}
