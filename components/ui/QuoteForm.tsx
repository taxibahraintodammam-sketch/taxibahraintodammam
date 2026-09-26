"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Circle, MapPin, CalendarDays, Users, Car, Search } from "lucide-react";
import { whatsappHref } from "@/content/business";
import { localeFromPathname, type Locale } from "@/lib/locale";

export const FROM_TO_OPTIONS = [
  "Bahrain (Manama / Juffair / Seef / Riffa / Muharraq)",
  "Dammam",
  "Khobar",
  "Dhahran",
  "Dammam Airport (DMM)",
  "Bahrain Airport (BAH)",
  "Jubail",
  "Al Ahsa / Hofuf",
  "Riyadh",
  "Ras Tanura",
  "Qatif",
  "Abqaiq",
];

// Same order as FROM_TO_OPTIONS.
const FROM_TO_OPTIONS_AR = [
  "البحرين (المنامة / الجفير / السيف / الرفاع / المحرق)",
  "الدمام",
  "الخبر",
  "الظهران",
  "مطار الدمام (DMM)",
  "مطار البحرين (BAH)",
  "الجبيل",
  "الأحساء / الهفوف",
  "الرياض",
  "رأس تنورة",
  "القطيف",
  "بقيق",
];

const VEHICLES: Record<Locale, string[]> = {
  en: ["Sedan (1–3 passengers)", "SUV (1–4 passengers)", "Van (up to 7 passengers)", "Luxury Sedan", "30-Seat Coaster Bus"],
  ar: ["سيدان (1–3 ركاب)", "دفع رباعي (1–4 ركاب)", "فان (حتى 7 ركاب)", "سيدان فاخرة", "حافلة كوستر 30 مقعدًا"],
};

const PASSENGERS = ["1", "2", "3", "4", "5", "6", "7+"];

const TEXT: Record<
  Locale,
  {
    from: string;
    to: string;
    pickup: string;
    dateTime: string;
    passengers: string;
    vehicle: string;
    submitPill: string;
    submitCard: string;
    formLabel: string;
    sameError: string;
    intro: string;
    notSet: string;
    hint: string;
  }
> = {
  en: {
    from: "From",
    to: "To",
    pickup: "Pickup",
    dateTime: "Date & time",
    passengers: "Passengers",
    vehicle: "Vehicle",
    submitPill: "Get my fare",
    submitCard: "Get my fare on WhatsApp",
    formLabel: "Get a fare quote on WhatsApp",
    sameError: "Pickup and destination are the same. Choose where you're going.",
    intro: "Hi, I'd like a fare quote:",
    notSet: "to confirm",
    hint: "Opens WhatsApp with your trip filled in. We reply with a fixed fare before you travel.",
  },
  ar: {
    from: "من",
    to: "إلى",
    pickup: "الاستلام",
    dateTime: "التاريخ والوقت",
    passengers: "عدد الركاب",
    vehicle: "السيارة",
    submitPill: "احصل على السعر",
    submitCard: "احصل على السعر عبر واتساب",
    formLabel: "احصل على عرض سعر عبر واتساب",
    sameError: "مكان الاستلام والوجهة متطابقان. اختر وجهتك.",
    intro: "مرحبًا، أرغب في معرفة السعر:",
    notSet: "يُحدَّد لاحقًا",
    hint: "يفتح واتساب مع تفاصيل رحلتك، ونرد بسعر ثابت قبل السفر.",
  },
};

function useQuoteFormState(locale: Locale) {
  const places = locale === "ar" ? FROM_TO_OPTIONS_AR : FROM_TO_OPTIONS;
  const t = TEXT[locale];
  const [from, setFrom] = useState(places[0]);
  const [to, setTo] = useState(places[1]);
  const [dateTime, setDateTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [vehicle, setVehicle] = useState(VEHICLES[locale][0]);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (from === to) {
      setError(t.sameError);
      return;
    }
    setError("");
    const message = [
      t.intro,
      `${t.from}: ${from}`,
      `${t.to}: ${to}`,
      `${t.dateTime}: ${dateTime ? dateTime.replace("T", " ") : t.notSet}`,
      `${t.passengers}: ${passengers}`,
      `${t.vehicle}: ${vehicle}`,
    ].join("\n");
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  }

  return { places, t, from, setFrom, to, setTo, dateTime, setDateTime, passengers, setPassengers, vehicle, setVehicle, error, setError, handleSubmit };
}

export function QuoteForm({ variant = "card" }: { variant?: "card" | "pill" }) {
  const formId = useId();
  const locale = localeFromPathname(usePathname() ?? "/");
  const s = useQuoteFormState(locale);
  const { t } = s;
  const errorId = `${formId}-error`;
  const onPlace = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    s.setError("");
  };

  const errorNote = s.error ? (
    <p id={errorId} role="alert" className="text-sm font-medium text-danger">
      {s.error}
    </p>
  ) : null;

  if (variant === "pill") {
    return (
      <div>
        <form
          onSubmit={s.handleSubmit}
          aria-label={t.formLabel}
          aria-describedby={s.error ? errorId : undefined}
          className="flex flex-col divide-y divide-ink/10 overflow-hidden rounded-[20px] bg-white text-ink shadow-elevation md:h-[76px] md:flex-row md:divide-x md:divide-y-0 md:rounded-pill rtl:md:divide-x-reverse"
        >
          <PillField icon={Circle} label={t.from} htmlFor={`${formId}-from`}>
            <select id={`${formId}-from`} value={s.from} onChange={(e) => onPlace(s.setFrom)(e.target.value)} className="w-full truncate bg-transparent text-base font-semibold text-ink outline-none md:text-sm">
              {s.places.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </PillField>

          <PillField icon={MapPin} label={t.to} htmlFor={`${formId}-to`}>
            <select id={`${formId}-to`} value={s.to} onChange={(e) => onPlace(s.setTo)(e.target.value)} className="w-full truncate bg-transparent text-base font-semibold text-ink outline-none md:text-sm">
              {s.places.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </PillField>

          <PillField icon={CalendarDays} label={t.pickup} htmlFor={`${formId}-datetime`}>
            <input
              id={`${formId}-datetime`}
              type="datetime-local"
              value={s.dateTime}
              onChange={(e) => s.setDateTime(e.target.value)}
              className="w-full bg-transparent text-base font-semibold text-ink outline-none [color-scheme:light] md:text-sm"
            />
          </PillField>

          {/* Passengers and vehicle share a row on phones: two short choices, one line. */}
          <div className="grid grid-cols-2 divide-x divide-ink/10 md:contents rtl:divide-x-reverse">
            <PillField icon={Users} label={t.passengers} htmlFor={`${formId}-passengers`} shrink>
              <select id={`${formId}-passengers`} value={s.passengers} onChange={(e) => s.setPassengers(e.target.value)} className="w-full bg-transparent text-base font-semibold text-ink outline-none md:text-sm">
                {PASSENGERS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </PillField>

            <PillField icon={Car} label={t.vehicle} htmlFor={`${formId}-vehicle`}>
              <select id={`${formId}-vehicle`} value={s.vehicle} onChange={(e) => s.setVehicle(e.target.value)} className="w-full truncate bg-transparent text-base font-semibold text-ink outline-none md:text-sm">
                {VEHICLES[locale].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </PillField>
          </div>

          <button
            type="submit"
            className="flex shrink-0 items-center justify-center gap-2 bg-brass px-8 py-4 text-base font-bold text-ink transition-colors hover:bg-brass-lit md:py-0 md:text-sm"
            data-analytics="whatsapp_click"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            {t.submitPill}
          </button>
        </form>
        {errorNote && <div className="mt-3 rounded-input bg-white px-4 py-2">{errorNote}</div>}
      </div>
    );
  }

  const field = "h-12 rounded-input border border-slate/30 bg-white px-3 text-base text-ink transition-colors focus:border-sea focus:outline-none sm:text-sm";

  return (
    <form
      onSubmit={s.handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-card border border-ink/10 bg-white p-5 shadow-elevation sm:grid-cols-2 lg:p-6"
      aria-label={t.formLabel}
      aria-describedby={s.error ? errorId : undefined}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-from`} className="text-sm font-medium text-ink">
          {t.from}
        </label>
        <select id={`${formId}-from`} value={s.from} onChange={(e) => onPlace(s.setFrom)(e.target.value)} className={field}>
          {s.places.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-to`} className="text-sm font-medium text-ink">
          {t.to}
        </label>
        <select id={`${formId}-to`} value={s.to} onChange={(e) => onPlace(s.setTo)(e.target.value)} className={field}>
          {s.places.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-datetime`} className="text-sm font-medium text-ink">
          {t.dateTime}
        </label>
        <input
          id={`${formId}-datetime`}
          type="datetime-local"
          value={s.dateTime}
          onChange={(e) => s.setDateTime(e.target.value)}
          className={`${field} [color-scheme:light]`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-passengers`} className="text-sm font-medium text-ink">
          {t.passengers}
        </label>
        <select id={`${formId}-passengers`} value={s.passengers} onChange={(e) => s.setPassengers(e.target.value)} className={field}>
          {PASSENGERS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor={`${formId}-vehicle`} className="text-sm font-medium text-ink">
          {t.vehicle}
        </label>
        <select id={`${formId}-vehicle`} value={s.vehicle} onChange={(e) => s.setVehicle(e.target.value)} className={field}>
          {VEHICLES[locale].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {errorNote && <div className="sm:col-span-2">{errorNote}</div>}

      <button
        type="submit"
        className="flex h-12 items-center justify-center rounded-input bg-brass px-6 text-base font-semibold text-ink transition-colors hover:bg-brass-lit sm:col-span-2"
        data-analytics="whatsapp_click"
      >
        {t.submitCard}
      </button>
      <p className="-mt-1 text-center text-xs text-slate sm:col-span-2">{t.hint}</p>
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
        <label htmlFor={htmlFor} className="block text-[11px] font-bold uppercase tracking-wide text-slate rtl:normal-case">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}
