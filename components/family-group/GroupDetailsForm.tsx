"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { FamilyGroupCopy } from "@/content/family-group";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const COUNTS = (from: number, to: number, last: string) => [...Array.from({ length: to - from + 1 }, (_, i) => String(from + i)), last];

/** The group booking checklist, as a form that writes the WhatsApp message. */
export function GroupDetailsForm({ copy }: { copy: FamilyGroupCopy["checklist"] }) {
  const id = useId();
  const f = copy.fields;
  const [v, setV] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    adults: "2",
    children: "0",
    large: "2",
    cabin: "2",
    extra: "",
  });
  const [trip, setTrip] = useState<"oneWay" | "return">("oneWay");
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));
  const or = (x: string) => x.trim() || copy.notSet;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = [
      copy.messageIntro,
      `${f.pickup}: ${or(v.pickup)}`,
      `${f.destination}: ${or(v.destination)}`,
      `${f.date}: ${or(v.date)}`,
      `${f.time}: ${or(v.time)}`,
      `${f.adults}: ${v.adults}`,
      `${f.children}: ${v.children}`,
      `${f.large}: ${v.large}`,
      `${f.cabin}: ${v.cabin}`,
      `${f.trip}: ${trip === "return" ? f.returnTrip : f.oneWay}`,
      v.extra.trim() ? `${f.extraPickups}: ${v.extra.trim()}` : null,
    ].filter(Boolean);
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-12 w-full rounded-input border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors focus:border-sea sm:text-sm";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="rounded-card bg-white p-5 text-ink shadow-elevation sm:p-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={f.pickup} htmlFor={`${id}-pickup`}>
          <input id={`${id}-pickup`} value={v.pickup} onChange={set("pickup")} className={field} />
        </Field>
        <Field label={f.destination} htmlFor={`${id}-dest`}>
          <input id={`${id}-dest`} value={v.destination} onChange={set("destination")} className={field} />
        </Field>
        <Field label={f.date} htmlFor={`${id}-date`}>
          <input id={`${id}-date`} type="date" value={v.date} onChange={set("date")} className={`${field} [color-scheme:light]`} />
        </Field>
        <Field label={f.time} htmlFor={`${id}-time`}>
          <input id={`${id}-time`} type="time" value={v.time} onChange={set("time")} className={`${field} [color-scheme:light]`} />
        </Field>

        <div className="grid grid-cols-2 items-end gap-3 sm:col-span-2 sm:grid-cols-4">
          <Field label={f.adults} htmlFor={`${id}-adults`}>
            <select id={`${id}-adults`} value={v.adults} onChange={set("adults")} className={field}>
              {COUNTS(1, 12, "13+").map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label={f.children} htmlFor={`${id}-children`}>
            <select id={`${id}-children`} value={v.children} onChange={set("children")} className={field}>
              {COUNTS(0, 8, "9+").map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label={f.large} htmlFor={`${id}-large`}>
            <select id={`${id}-large`} value={v.large} onChange={set("large")} className={field}>
              {COUNTS(0, 12, "13+").map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label={f.cabin} htmlFor={`${id}-cabin`}>
            <select id={`${id}-cabin`} value={v.cabin} onChange={set("cabin")} className={field}>
              {COUNTS(0, 12, "13+").map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="mb-1.5 text-sm font-medium">{f.trip}</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["oneWay", "return"] as const).map((t) => (
              <label key={t} className="relative">
                <input type="radio" name={`${id}-trip`} checked={trip === t} onChange={() => setTrip(t)} className="peer sr-only" />
                <span className="flex h-11 cursor-pointer items-center justify-center rounded-input border border-ink/15 text-sm font-semibold text-slate transition-colors peer-checked:border-sea peer-checked:bg-sea/[0.07] peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brass-lit">
                  {t === "return" ? f.returnTrip : f.oneWay}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field label={f.extraPickups} htmlFor={`${id}-extra`} wide>
          <input id={`${id}-extra`} value={v.extra} onChange={set("extra")} placeholder={f.extraPlaceholder} className={field} />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-input bg-brass px-6 text-base font-bold text-ink transition-colors hover:bg-brass-lit"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon className="h-5 w-5" color="currentColor" />
        {copy.submit}
      </button>
      <p className="mt-2 text-center text-xs text-slate">{copy.note}</p>
    </form>
  );
}

function Field({ label, htmlFor, wide, children }: { label: string; htmlFor: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
