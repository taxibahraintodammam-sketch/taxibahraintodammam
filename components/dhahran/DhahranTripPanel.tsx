"use client";

import { useId, useState, type FormEvent } from "react";
import { whatsappHref } from "@/content/business";
import type { DhahranCopy } from "@/content/dhahran";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const PASSENGERS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

/**
 * Compact "trip request" for the Dhahran page, styled as a ticket stub.
 * Like the site's other quote widgets it only composes a WhatsApp message;
 * there's no Dhahran fare to show, so it asks for exactly what a quote needs.
 */
export function DhahranTripPanel({ copy, id }: { copy: DhahranCopy["panel"]; id?: string }) {
  const formId = useId();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState(copy.destinationOptions[0]);
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [trip, setTrip] = useState<"oneWay" | "return">("oneWay");

  function buildMessage() {
    return [
      copy.messageIntro,
      `${copy.pickup}: ${pickup.trim() || copy.toConfirm}`,
      `${copy.destination}: ${destination}`,
      `${copy.date}: ${date || copy.toConfirm}`,
      `${copy.passengers}: ${passengers}`,
      `${copy.journey}: ${trip === "return" ? copy.return : copy.oneWay}`,
    ].join("\n");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappHref(buildMessage()), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-12 w-full rounded-input border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors focus:border-sea sm:text-sm";

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      aria-label={copy.title}
      className="relative scroll-mt-24 rounded-card border border-ink/10 bg-white shadow-elevation"
    >
      {/* Ticket header: the route itself */}
      <div className="px-5 pb-5 pt-5 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate">{copy.title}</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="font-[family-name:var(--font-display)] text-xl font-extrabold">{copy.from}</span>
          <span className="relative h-px flex-1 border-t-2 border-dashed border-sea/40" aria-hidden="true">
            <span className="absolute -top-[5px] end-0 h-2 w-2 rounded-full bg-sea" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-sea">{copy.to}</span>
        </div>
      </div>

      {/* Perforation with punched notches */}
      <div className="relative" aria-hidden="true">
        <div className="mx-5 border-t-2 border-dashed border-ink/10" />
        <span className="absolute -start-[11px] -top-[10px] h-5 w-5 rounded-full border border-ink/10 bg-[color-mix(in_srgb,var(--ink)_3.5%,var(--white))] [clip-path:inset(0_0_0_50%)] rtl:[clip-path:inset(0_50%_0_0)]" />
        <span className="absolute -end-[11px] -top-[10px] h-5 w-5 rounded-full border border-ink/10 bg-[color-mix(in_srgb,var(--ink)_3.5%,var(--white))] [clip-path:inset(0_50%_0_0)] rtl:[clip-path:inset(0_0_0_50%)]" />
      </div>

      <div className="flex flex-col gap-4 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-pickup`} className="text-sm font-medium">
            {copy.pickup}
          </label>
          <input
            id={`${formId}-pickup`}
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder={copy.pickupPlaceholder}
            className={field}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-destination`} className="text-sm font-medium">
            {copy.destination}
          </label>
          <select id={`${formId}-destination`} value={destination} onChange={(e) => setDestination(e.target.value)} className={field}>
            {copy.destinationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-[1fr_7rem] gap-3">
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={`${formId}-date`} className="text-sm font-medium">
              {copy.date}
            </label>
            <input
              id={`${formId}-date`}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${field} [color-scheme:light]`}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${formId}-passengers`} className="text-sm font-medium">
              {copy.passengers}
            </label>
            <select id={`${formId}-passengers`} value={passengers} onChange={(e) => setPassengers(e.target.value)} className={field}>
              {PASSENGERS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium">{copy.journey}</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["oneWay", "return"] as const).map((value) => (
              <label key={value} className="relative">
                <input
                  type="radio"
                  name={`${formId}-trip`}
                  value={value}
                  checked={trip === value}
                  onChange={() => setTrip(value)}
                  className="peer sr-only"
                />
                <span className="flex h-11 cursor-pointer items-center justify-center rounded-input border border-ink/15 text-sm font-semibold text-slate transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass-lit">
                  {value === "return" ? copy.return : copy.oneWay}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-1 flex h-[52px] items-center justify-center gap-2 rounded-input bg-brass px-6 text-base font-bold text-ink transition-colors hover:bg-brass-lit"
          data-analytics="whatsapp_click"
        >
          {copy.submit}
        </button>
        <a
          href={whatsappHref(copy.messageIntro)}
          target="_blank"
          rel="noopener noreferrer"
          className="-mt-1 flex h-11 items-center justify-center gap-2 rounded-input text-sm font-semibold text-ink hover:text-sea"
          data-analytics="whatsapp_click"
        >
          <WhatsAppIcon className="h-4 w-4" color="currentColor" />
          {copy.secondary}
        </a>
        <p className="-mt-2 text-center text-xs text-slate">{copy.note}</p>
      </div>
    </form>
  );
}
