"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Circle, MapPin, CalendarDays, Users, Car, Search } from "lucide-react";
import { BUSINESS } from "@/content/business";

const FROM_TO_OPTIONS = [
  "Bahrain (Manama / Juffair / Seef / Riffa / Muharraq)",
  "Dammam",
  "Khobar",
  "Dammam Airport (DMM)",
  "Bahrain Airport (BAH)",
  "Jubail",
  "Al Ahsa / Hofuf",
  "Riyadh",
  "Ras Tanura",
  "Qatif",
  "Abqaiq",
];

const VEHICLE_OPTIONS = [
  "Sedan (1–3 passengers)",
  "SUV (1–4 passengers)",
  "Van (up to 7 passengers)",
  "Luxury Sedan",
  "30-Seat Coaster Bus",
];

function useQuoteFormState() {
  const [from, setFrom] = useState(FROM_TO_OPTIONS[0]);
  const [to, setTo] = useState(FROM_TO_OPTIONS[1]);
  const [dateTime, setDateTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [vehicle, setVehicle] = useState(VEHICLE_OPTIONS[0]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = [
      "Hi, I'd like a fare quote:",
      `From: ${from}`,
      `To: ${to}`,
      dateTime ? `Date/time: ${dateTime}` : undefined,
      `Passengers: ${passengers}`,
      `Vehicle: ${vehicle}`,
    ].filter(Boolean);
    const message = lines.join("\n");
    const url = `https://wa.me/${BUSINESS.whatsappE164}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return { from, setFrom, to, setTo, dateTime, setDateTime, passengers, setPassengers, vehicle, setVehicle, handleSubmit };
}

export function QuoteForm({ variant = "card" }: { variant?: "card" | "pill" }) {
  const formId = useId();
  const { from, setFrom, to, setTo, dateTime, setDateTime, passengers, setPassengers, vehicle, setVehicle, handleSubmit } =
    useQuoteFormState();

  if (variant === "pill") {
    return (
      <form
        onSubmit={handleSubmit}
        aria-label="Get a fare quote on WhatsApp"
        className="flex flex-col divide-y divide-ink/10 overflow-hidden rounded-[28px] bg-white shadow-elevation md:h-[76px] md:flex-row md:divide-x md:divide-y-0 md:rounded-pill"
      >
        <PillField icon={Circle} label="From" htmlFor={`${formId}-from`}>
          <select
            id={`${formId}-from`}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full truncate bg-transparent text-sm font-bold text-ink outline-none"
          >
            {FROM_TO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </PillField>

        <PillField icon={MapPin} label="To" htmlFor={`${formId}-to`}>
          <select
            id={`${formId}-to`}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full truncate bg-transparent text-sm font-bold text-ink outline-none"
          >
            {FROM_TO_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </PillField>

        <PillField icon={CalendarDays} label="Pickup" htmlFor={`${formId}-datetime`}>
          <input
            id={`${formId}-datetime`}
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-ink outline-none [color-scheme:light]"
          />
        </PillField>

        <PillField icon={Users} label="Passengers" htmlFor={`${formId}-passengers`} shrink>
          <select
            id={`${formId}-passengers`}
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-ink outline-none"
          >
            {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </PillField>

        <PillField icon={Car} label="Vehicle" htmlFor={`${formId}-vehicle`}>
          <select
            id={`${formId}-vehicle`}
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full truncate bg-transparent text-sm font-bold text-ink outline-none"
          >
            {VEHICLE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </PillField>

        <button
          type="submit"
          className="flex shrink-0 items-center justify-center gap-2 bg-brass px-8 py-4 text-sm font-bold text-ink transition-colors hover:bg-brass-lit md:py-0"
          data-analytics="whatsapp_click"
        >
          <Search className="h-4 w-4" />
          Get my fare
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-card bg-white p-5 shadow-elevation sm:grid-cols-2 lg:p-6"
      aria-label="Get a fare quote on WhatsApp"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-from`} className="text-sm font-medium text-ink">
          From
        </label>
        <select
          id={`${formId}-from`}
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="h-11 rounded-input border border-slate/30 px-3 text-sm text-ink"
        >
          {FROM_TO_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-to`} className="text-sm font-medium text-ink">
          To
        </label>
        <select
          id={`${formId}-to`}
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="h-11 rounded-input border border-slate/30 px-3 text-sm text-ink"
        >
          {FROM_TO_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-datetime`} className="text-sm font-medium text-ink">
          Date &amp; time
        </label>
        <input
          id={`${formId}-datetime`}
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="h-11 rounded-input border border-slate/30 px-3 text-sm text-ink"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-passengers`} className="text-sm font-medium text-ink">
          Passengers
        </label>
        <select
          id={`${formId}-passengers`}
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="h-11 rounded-input border border-slate/30 px-3 text-sm text-ink"
        >
          {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor={`${formId}-vehicle`} className="text-sm font-medium text-ink">
          Vehicle
        </label>
        <select
          id={`${formId}-vehicle`}
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="h-11 rounded-input border border-slate/30 px-3 text-sm text-ink"
        >
          {VEHICLE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="flex h-12 items-center justify-center rounded-input bg-brass px-6 text-base font-semibold text-ink hover:bg-brass-lit sm:col-span-2"
        data-analytics="whatsapp_click"
      >
        Get my fare on WhatsApp
      </button>
    </form>
  );
}

function PillField({
  icon: Icon,
  label,
  htmlFor,
  shrink,
  children,
}: {
  icon: typeof Circle;
  label: string;
  htmlFor: string;
  shrink?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 items-center gap-2.5 px-5 py-3 md:py-0 ${shrink ? "md:w-[132px] md:shrink-0" : "flex-1"}`}>
      <Icon className="h-4 w-4 shrink-0 text-slate" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <label htmlFor={htmlFor} className="block text-[10px] font-bold uppercase tracking-wide text-slate">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
