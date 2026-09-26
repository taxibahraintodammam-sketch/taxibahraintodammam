"use client";

import { useId, useState, type FormEvent } from "react";
import { whatsappHref } from "@/content/business";
import { cn } from "@/lib/utils";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export type JubailFareOption = {
  vehicle: "sedan" | "suv" | "van" | "luxury";
  label: string;
  seats: number;
  bhd: number;
  sar: number;
};

const DESTINATIONS = [
  "Jubail Industrial City (plant / office gate)",
  "Royal Commission residential district",
  "Jubail city (Al Balad)",
  "A hotel in Jubail",
  "Jubail II / northern industrial zone",
  "Somewhere else in Jubail",
];

const PASSENGER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

/**
 * The Jubail page's booking widget. Deliberately not the shared QuoteForm:
 * origin and destination are fixed, so the panel asks for the details that
 * actually change a Jubail quote (exact pickup, which part of Jubail,
 * vehicle, return leg) and shows the published starting fare live. Like
 * QuoteForm, it only composes a WhatsApp message — no account, no payment.
 */
export function JubailFarePanel({ options, id }: { options: JubailFareOption[]; id?: string }) {
  const formId = useId();
  const [trip, setTrip] = useState<"one-way" | "return">("one-way");
  const [vehicle, setVehicle] = useState(options[0].vehicle);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [returnWhen, setReturnWhen] = useState("");

  const selected = options.find((o) => o.vehicle === vehicle) ?? options[0];
  const headcount = passengers === "8+" ? 8 : Number(passengers);
  const fits = options.find((o) => o.seats >= headcount);
  const tooSmall = headcount > selected.seats;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = [
      `Hi, I'd like a fare for a ${trip === "return" ? "return" : "one-way"} taxi from Bahrain to Jubail.`,
      `Pickup in Bahrain: ${pickup.trim() || "(to confirm)"}`,
      `Jubail destination: ${destination}`,
      `Date: ${date || "(to confirm)"}`,
      `Pickup time: ${time || "(to confirm)"}`,
      `Passengers: ${passengers}`,
      `Vehicle: ${selected.label}`,
      trip === "return" ? `Return: ${returnWhen.trim() || "(to confirm)"}` : undefined,
    ].filter(Boolean);
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "h-12 w-full rounded-input border border-ink/15 bg-white px-3 text-base text-ink outline-none transition-colors focus:border-sea sm:text-sm";

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      aria-label="Get your Bahrain to Jubail fare on WhatsApp"
      className="scroll-mt-24 overflow-hidden rounded-card bg-white text-ink shadow-elevation"
    >
      {/* Live starting fare for the selected vehicle */}
      <div className="flex items-end justify-between gap-4 border-b border-ink/10 px-5 pb-4 pt-5 sm:px-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate">Your Jubail fare</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[1.75rem] font-extrabold leading-none" aria-live="polite">
            <span className="text-base font-semibold text-slate">from </span>BHD {selected.bhd}
          </p>
        </div>
        <p className="pb-0.5 text-right text-sm text-slate">
          SAR {selected.sar}
          <span className="block text-xs">{trip === "return" ? "one-way base · return quoted in chat" : "one-way · toll included"}</span>
        </p>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 sm:px-6">
        {/* One-way / return */}
        <fieldset>
          <legend className="sr-only">Trip type</legend>
          <div className="grid grid-cols-2 rounded-input bg-ink/[0.06] p-1">
            {(["one-way", "return"] as const).map((value) => (
              <label key={value} className="relative">
                <input
                  type="radio"
                  name={`${formId}-trip`}
                  value={value}
                  checked={trip === value}
                  onChange={() => setTrip(value)}
                  className="peer sr-only"
                />
                <span className="flex h-10 cursor-pointer items-center justify-center rounded-[8px] text-sm font-semibold text-slate transition-colors peer-checked:bg-white peer-checked:text-ink peer-checked:shadow-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brass-lit">
                  {value === "one-way" ? "One-way" : "Return trip"}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Vehicle */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Vehicle</legend>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <label key={option.vehicle} className="relative">
                <input
                  type="radio"
                  name={`${formId}-vehicle`}
                  value={option.vehicle}
                  checked={vehicle === option.vehicle}
                  onChange={() => setVehicle(option.vehicle)}
                  className="peer sr-only"
                />
                <span className="flex min-h-[60px] cursor-pointer flex-col justify-center rounded-input border border-ink/15 px-3 py-2 transition-colors hover:border-ink/30 peer-checked:border-sea peer-checked:bg-sea/[0.05] peer-checked:ring-1 peer-checked:ring-sea peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brass-lit">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold">{option.label}</span>
                    <span className="text-xs font-semibold text-slate">BHD {option.bhd}</span>
                  </span>
                  <span className="text-xs text-slate">Up to {option.seats} passengers</span>
                </span>
              </label>
            ))}
          </div>
          {tooSmall && fits && (
            <p className="mt-2 text-xs font-medium text-sea" role="status">
              {headcount} passengers won&rsquo;t fit in a {selected.label.toLowerCase()}. The {fits.label.toLowerCase()} takes everyone.
            </p>
          )}
          {tooSmall && !fits && (
            <p className="mt-2 text-xs font-medium text-sea" role="status">
              For 8 or more, we&rsquo;ll suggest several vehicles or a coaster on WhatsApp.
            </p>
          )}
        </fieldset>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor={`${formId}-pickup`} className="text-sm font-medium">
              Pickup in Bahrain
            </label>
            <input
              id={`${formId}-pickup`}
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Hotel, area or address, e.g. Juffair"
              autoComplete="street-address"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor={`${formId}-destination`} className="text-sm font-medium">
              Where in Jubail?
            </label>
            <select
              id={`${formId}-destination`}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={fieldClass}
            >
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${formId}-date`} className="text-sm font-medium">
              Date
            </label>
            <input
              id={`${formId}-date`}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={cn(fieldClass, "[color-scheme:light]")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${formId}-time`} className="text-sm font-medium">
                Pickup time
              </label>
              <input
                id={`${formId}-time`}
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={cn(fieldClass, "[color-scheme:light]")}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${formId}-passengers`} className="text-sm font-medium">
                People
              </label>
              <select
                id={`${formId}-passengers`}
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className={fieldClass}
              >
                {PASSENGER_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {trip === "return" && (
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor={`${formId}-return`} className="text-sm font-medium">
                Coming back when?
              </label>
              <input
                id={`${formId}-return`}
                type="text"
                value={returnWhen}
                onChange={(e) => setReturnWhen(e.target.value)}
                placeholder="e.g. same day 6pm, or 14 Oct morning"
                className={fieldClass}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="flex h-[52px] items-center justify-center gap-2 rounded-input bg-brass px-6 text-base font-bold text-ink transition-colors hover:bg-brass-lit"
          data-analytics="whatsapp_click"
        >
          <WhatsAppIcon className="h-5 w-5" color="currentColor" />
          Get my Jubail fare
        </button>
        <p className="-mt-2 text-center text-xs text-slate">
          Opens WhatsApp with your details. We reply with the exact fixed fare. No account or payment needed.
        </p>
      </div>
    </form>
  );
}
