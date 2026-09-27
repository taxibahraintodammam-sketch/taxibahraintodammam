"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { UmrahCopy, UmrahMode } from "@/content/umrah";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const ADULTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
const CHILDREN = ["0", "1", "2", "3", "4", "5", "6+"];
const BAGS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12+"];

/**
 * The Umrah booking checklist as a form. Composes a WhatsApp message only —
 * no account, no payment. Links elsewhere on the page to #plan-road or
 * #plan-fly preselect the travel option.
 */
export function UmrahPlanner({ copy, modes }: { copy: UmrahCopy["planner"]; modes: UmrahCopy["modes"]["options"] }) {
  const id = useId();
  const [mode, setMode] = useState<UmrahMode>("road");
  const [pickup, setPickup] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [bags, setBags] = useState("2");
  const [hotel, setHotel] = useState("");
  const [trip, setTrip] = useState<"oneWay" | "return">("oneWay");
  const [returnDate, setReturnDate] = useState("");
  const [vehicle, setVehicle] = useState(copy.vehicleOptions[0]);
  const [meeqat, setMeeqat] = useState(copy.meeqatOptions[2]);

  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === "#plan-fly") setMode("fly");
      else if (window.location.hash === "#plan-road") setMode("road");
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const fly = mode === "fly";
  const or = (v: string) => v.trim() || copy.notSet;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = [
      copy.messageIntro,
      `${copy.mode} ${modes[mode].title}`,
      `${fly ? copy.pickupFly : copy.pickup}: ${or(pickup)}`,
      `${fly ? copy.dateFly : copy.date}: ${or(date)}`,
      `${fly ? copy.timeFly : copy.time}: ${or(time)}`,
      `${copy.adults}: ${adults}`,
      `${copy.children}: ${children}`,
      `${copy.bags}: ${bags}`,
      `${copy.hotel}: ${or(hotel)}`,
      `${copy.trip}: ${trip === "return" ? copy.returnTrip : copy.oneWay}`,
      trip === "return" ? `${copy.returnDate}: ${or(returnDate)}` : null,
      `${copy.vehicle}: ${vehicle}`,
      `${copy.meeqat} ${meeqat}`,
    ].filter(Boolean);
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-12 w-full rounded-input border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors focus:border-sea sm:text-sm";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="rounded-card bg-white p-5 text-ink shadow-elevation sm:p-7">
      <fieldset>
        <legend className="text-sm font-semibold">{copy.mode}</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["road", "fly"] as const).map((m) => (
            <label key={m} className="relative">
              <input type="radio" name={`${id}-mode`} value={m} checked={mode === m} onChange={() => setMode(m)} className="peer sr-only" />
              <span className="flex min-h-12 cursor-pointer items-center justify-center rounded-input border border-ink/15 px-3 py-2 text-center text-sm font-semibold text-slate transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass-lit">
                {modes[m].title}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={fly ? copy.pickupFly : copy.pickup} htmlFor={`${id}-pickup`} wide>
          <input id={`${id}-pickup`} value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder={fly ? copy.pickupFlyPlaceholder : copy.pickupPlaceholder} className={field} />
        </Field>
        <Field label={fly ? copy.dateFly : copy.date} htmlFor={`${id}-date`}>
          <input id={`${id}-date`} type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${field} [color-scheme:light]`} />
        </Field>
        <Field label={fly ? copy.timeFly : copy.time} htmlFor={`${id}-time`}>
          <input id={`${id}-time`} type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${field} [color-scheme:light]`} />
        </Field>

        <div className="grid grid-cols-3 items-end gap-3 sm:col-span-2">
          <Field label={copy.adults} htmlFor={`${id}-adults`}>
            <select id={`${id}-adults`} value={adults} onChange={(e) => setAdults(e.target.value)} className={field}>
              {ADULTS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label={copy.children} htmlFor={`${id}-children`}>
            <select id={`${id}-children`} value={children} onChange={(e) => setChildren(e.target.value)} className={field}>
              {CHILDREN.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label={copy.bags} htmlFor={`${id}-bags`}>
            <select id={`${id}-bags`} value={bags} onChange={(e) => setBags(e.target.value)} className={field}>
              {BAGS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
        </div>

        <Field label={copy.hotel} htmlFor={`${id}-hotel`} wide>
          <input id={`${id}-hotel`} value={hotel} onChange={(e) => setHotel(e.target.value)} placeholder={copy.hotelPlaceholder} className={field} />
        </Field>

        <fieldset className="sm:col-span-2">
          <legend className="mb-1.5 text-sm font-medium">{copy.trip}</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["oneWay", "return"] as const).map((v) => (
              <label key={v} className="relative">
                <input type="radio" name={`${id}-trip`} checked={trip === v} onChange={() => setTrip(v)} className="peer sr-only" />
                <span className="flex h-11 cursor-pointer items-center justify-center rounded-input border border-ink/15 text-sm font-semibold text-slate transition-colors peer-checked:border-sea peer-checked:bg-sea/[0.06] peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brass-lit">
                  {v === "return" ? copy.returnTrip : copy.oneWay}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {trip === "return" && (
          <Field label={copy.returnDate} htmlFor={`${id}-return`} wide>
            <input id={`${id}-return`} type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={`${field} [color-scheme:light]`} />
          </Field>
        )}

        <Field label={copy.vehicle} htmlFor={`${id}-vehicle`}>
          <select id={`${id}-vehicle`} value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={field}>
            {copy.vehicleOptions.map((v) => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label={copy.meeqat} htmlFor={`${id}-meeqat`}>
          <select id={`${id}-meeqat`} value={meeqat} onChange={(e) => setMeeqat(e.target.value)} className={field}>
            {copy.meeqatOptions.map((v) => <option key={v}>{v}</option>)}
          </select>
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
