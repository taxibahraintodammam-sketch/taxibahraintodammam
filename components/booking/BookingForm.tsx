"use client";

import { useId } from "react";
import {
  Circle, MapPin, CalendarDays, Users, ArrowLeft, ArrowRight,
  CheckCircle2, MessageCircle, RotateCcw, Briefcase, Car,
} from "lucide-react";
import { useBookingFlow } from "@/hooks/useBookingFlow";
import { vehicles } from "@/lib/supabase";
import { FROM_TO_OPTIONS } from "@/components/ui/QuoteForm";
import type { Locale } from "@/lib/locale";

const COUNTRY_CODES = [
  { code: "+973", label: "Bahrain" },
  { code: "+966", label: "Saudi Arabia" },
  { code: "+974", label: "Qatar" },
  { code: "+965", label: "Kuwait" },
  { code: "+971", label: "UAE" },
  { code: "+968", label: "Oman" },
];

const COPY: Record<Locale, {
  stepLabels: string[];
  pickup: string; dropoff: string; date: string; time: string;
  roundTrip: string; returnDate: string; passengers: string; note: string;
  notePlaceholder: string; next: string; back: string;
  chooseVehicle: string; passengersShort: string; luggageShort: string;
  fitsWarning: (n: number) => string;
  fullName: string; email: string; phone: string; submit: string; submitting: string;
  successTitle: string; successBody: string; refLabel: string;
  whatsappFollowUp: string; bookAnother: string;
  sameLocationError: string;
}> = {
  en: {
    stepLabels: ["Trip Details", "Choose Vehicle", "Your Details", "Done"],
    pickup: "Pickup Location",
    dropoff: "Destination",
    date: "Pickup Date",
    time: "Pickup Time",
    roundTrip: "This is a round trip",
    returnDate: "Return Date",
    passengers: "Passengers",
    note: "Preferred time note (optional)",
    notePlaceholder: "e.g. flexible within 30 minutes",
    next: "Next",
    back: "Back",
    chooseVehicle: "Choose Your Vehicle",
    passengersShort: "Pax",
    luggageShort: "Bags",
    fitsWarning: (n) => `Fits up to ${n} passengers`,
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    submit: "Request Booking",
    submitting: "Sending...",
    successTitle: "Request received!",
    successBody: "Our team will confirm your fixed, all-inclusive fare on WhatsApp or email shortly — no payment needed now.",
    refLabel: "Reference",
    whatsappFollowUp: "Message us on WhatsApp",
    bookAnother: "Book another transfer",
    sameLocationError: "Pickup and destination can't be the same.",
  },
  ar: {
    stepLabels: ["تفاصيل الرحلة", "اختر المركبة", "بياناتك", "تم"],
    pickup: "مكان الانطلاق",
    dropoff: "الوجهة",
    date: "تاريخ الانطلاق",
    time: "وقت الانطلاق",
    roundTrip: "هذه رحلة ذهاب وعودة",
    returnDate: "تاريخ العودة",
    passengers: "عدد الركاب",
    note: "ملاحظة حول الوقت المفضل (اختياري)",
    notePlaceholder: "مثال: مرن خلال 30 دقيقة",
    next: "التالي",
    back: "رجوع",
    chooseVehicle: "اختر مركبتك",
    passengersShort: "راكب",
    luggageShort: "حقيبة",
    fitsWarning: (n) => `تتسع حتى ${n} راكبًا`,
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    submit: "طلب الحجز",
    submitting: "جارٍ الإرسال...",
    successTitle: "تم استلام طلبك!",
    successBody: "سيؤكد فريقنا سعرك الثابت الشامل عبر واتساب أو البريد الإلكتروني قريبًا — لا حاجة للدفع الآن.",
    refLabel: "الرقم المرجعي",
    whatsappFollowUp: "راسلنا عبر واتساب",
    bookAnother: "احجز رحلة أخرى",
    sameLocationError: "لا يمكن أن يكون مكان الانطلاق والوجهة نفس المكان.",
  },
};

export default function BookingForm({ locale }: { locale: Locale }) {
  const formId = useId();
  const t = COPY[locale];
  const flow = useBookingFlow();

  const step1Valid =
    !!flow.pickup && !!flow.dropoff && flow.pickup !== flow.dropoff && !!flow.date && !!flow.time;
  const step3Valid = !!flow.customerName.trim() && !!flow.customerEmail.trim() && !!flow.customerPhone.trim();

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-card border border-ink/10 bg-white p-5 shadow-elevation lg:p-6">
      {/* Step indicator */}
      {flow.step <= 3 && (
        <div className="mb-6 flex items-center gap-2">
          {t.stepLabels.slice(0, 3).map((label, i) => {
            const n = i + 1;
            const active = flow.step === n;
            const done = flow.step > n;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done ? "bg-brass text-ink" : active ? "border-2 border-brass text-ink" : "border border-ink/15 text-slate"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : n}
                </div>
                <span className={`hidden text-xs font-semibold sm:block ${active ? "text-ink" : "text-slate"}`}>
                  {label}
                </span>
                {n < 3 && <div className="h-px flex-1 bg-ink/10" />}
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- Step 1: Trip details ---------- */}
      {flow.step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-ink">
                <Circle className="h-3.5 w-3.5 text-slate" /> {t.pickup}
              </label>
              <select
                value={flow.pickup}
                onChange={(e) => flow.setPickup(e.target.value)}
                className="h-11 w-full rounded-input border border-slate/30 px-3 text-sm text-ink"
              >
                <option value="">—</option>
                {FROM_TO_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-ink">
                <MapPin className="h-3.5 w-3.5 text-slate" /> {t.dropoff}
              </label>
              <select
                value={flow.dropoff}
                onChange={(e) => flow.setDropoff(e.target.value)}
                className="h-11 w-full rounded-input border border-slate/30 px-3 text-sm text-ink"
              >
                <option value="">—</option>
                {FROM_TO_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            {flow.pickup && flow.dropoff && flow.pickup === flow.dropoff && (
              <p className="sm:col-span-2 text-xs font-medium text-red-600">{t.sameLocationError}</p>
            )}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-ink">
                <CalendarDays className="h-3.5 w-3.5 text-slate" /> {t.date}
              </label>
              <input
                type="date"
                min={today}
                value={flow.date}
                onChange={(e) => flow.setDate(e.target.value)}
                className="h-11 w-full rounded-input border border-slate/30 px-3 text-sm text-ink"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-ink">{t.time}</label>
              <input
                type="time"
                value={flow.time}
                onChange={(e) => flow.setTime(e.target.value)}
                className="h-11 w-full rounded-input border border-slate/30 px-3 text-sm text-ink"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={flow.isRoundTrip}
              onChange={(e) => flow.setIsRoundTrip(e.target.checked)}
              className="h-4 w-4 rounded border-slate/40"
            />
            {t.roundTrip}
          </label>
          {flow.isRoundTrip && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-ink">{t.returnDate}</label>
              <input
                type="date"
                min={flow.date || today}
                value={flow.returnDate}
                onChange={(e) => flow.setReturnDate(e.target.value)}
                className="h-11 w-full max-w-xs rounded-input border border-slate/30 px-3 text-sm text-ink"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-ink">
              <Users className="h-3.5 w-3.5 text-slate" /> {t.passengers}
            </label>
            <input
              type="number"
              min={1}
              max={25}
              value={flow.passengers}
              onChange={(e) => flow.setPassengers(Math.max(1, Math.min(25, Number(e.target.value) || 1)))}
              className="h-11 w-24 rounded-input border border-slate/30 px-3 text-sm text-ink"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-ink">{t.note}</label>
            <input
              type="text"
              value={flow.preferredTimeNote}
              onChange={(e) => flow.setPreferredTimeNote(e.target.value)}
              placeholder={t.notePlaceholder}
              className="h-11 w-full rounded-input border border-slate/30 px-3 text-sm text-ink"
            />
          </div>

          <button
            type="button"
            disabled={!step1Valid}
            onClick={() => flow.setStep(2)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-input bg-brass text-base font-semibold text-ink hover:bg-brass-lit disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.next} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ---------- Step 2: Vehicle ---------- */}
      {flow.step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ink">{t.chooseVehicle}</h3>
          <div className="grid max-h-[420px] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
            {vehicles.map((v) => {
              const selected = flow.selectedVehicle?.name === v.name;
              const fits = v.passengers >= flow.passengers;
              return (
                <button
                  type="button"
                  key={v.name}
                  onClick={() => flow.setSelectedVehicle(v)}
                  className={`flex items-start gap-3 rounded-input border p-3 text-left transition-colors ${
                    selected ? "border-brass bg-brass/10" : "border-slate/20 hover:border-brass/50"
                  } ${!fits ? "opacity-60" : ""}`}
                >
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-sand">
                    <Car className="h-6 w-6 text-slate" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{v.name}</p>
                    <p className="mt-0.5 flex items-center gap-2 text-xs text-slate">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {v.passengers} {t.passengersShort}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {v.luggage} {t.luggageShort}</span>
                    </p>
                    {!fits && <p className="mt-1 text-[11px] font-medium text-amber-600">{t.fitsWarning(v.passengers)}</p>}
                  </div>
                  {selected && <CheckCircle2 className="h-5 w-5 shrink-0 text-brass" />}
                </button>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={flow.handleBack}
              className="flex h-12 items-center justify-center gap-2 rounded-input border border-ink/20 px-6 text-sm font-semibold text-ink hover:border-brass hover:text-brass"
            >
              <ArrowLeft className="h-4 w-4" /> {t.back}
            </button>
            <button
              type="button"
              disabled={!flow.selectedVehicle}
              onClick={() => flow.setStep(3)}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-input bg-brass text-base font-semibold text-ink hover:bg-brass-lit disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.next} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ---------- Step 3: Customer details ---------- */}
      {flow.step === 3 && (
        <form
          onSubmit={flow.handleSubmitBooking}
          className="space-y-4"
          aria-label={t.stepLabels[2]}
        >
          <div className="space-y-1.5">
            <label htmlFor={`${formId}-name`} className="text-sm font-medium text-ink">{t.fullName}</label>
            <input
              id={`${formId}-name`}
              type="text"
              required
              value={flow.customerName}
              onChange={(e) => flow.setCustomerName(e.target.value)}
              className="h-11 w-full rounded-input border border-slate/30 px-3 text-sm text-ink"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor={`${formId}-email`} className="text-sm font-medium text-ink">{t.email}</label>
            <input
              id={`${formId}-email`}
              type="email"
              required
              value={flow.customerEmail}
              onChange={(e) => flow.setCustomerEmail(e.target.value)}
              className="h-11 w-full rounded-input border border-slate/30 px-3 text-sm text-ink"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor={`${formId}-phone`} className="text-sm font-medium text-ink">{t.phone}</label>
            <div className="flex gap-2">
              <select
                value={flow.countryCode}
                onChange={(e) => flow.setCountryCode(e.target.value)}
                className="h-11 w-28 shrink-0 rounded-input border border-slate/30 px-2 text-sm text-ink"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
              <input
                id={`${formId}-phone`}
                type="tel"
                required
                value={flow.customerPhone}
                onChange={(e) => flow.setCustomerPhone(e.target.value)}
                className="h-11 w-full rounded-input border border-slate/30 px-3 text-sm text-ink"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={flow.handleBack}
              className="flex h-12 items-center justify-center gap-2 rounded-input border border-ink/20 px-6 text-sm font-semibold text-ink hover:border-brass hover:text-brass"
            >
              <ArrowLeft className="h-4 w-4" /> {t.back}
            </button>
            <button
              type="submit"
              disabled={!step3Valid || flow.loading}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-input bg-brass text-base font-semibold text-ink hover:bg-brass-lit disabled:cursor-not-allowed disabled:opacity-40"
            >
              {flow.loading ? t.submitting : t.submit}
            </button>
          </div>
        </form>
      )}

      {/* ---------- Step 4: Confirmation ---------- */}
      {flow.step === 4 && (
        <div className="space-y-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brass/20">
            <CheckCircle2 className="h-7 w-7 text-brass" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">{t.successTitle}</h3>
            <p className="mt-2 text-sm text-slate">{t.successBody}</p>
            {flow.lastBookingId && (
              <p className="mt-3 text-xs font-mono text-slate">
                {t.refLabel}: {flow.lastBookingId.slice(0, 8).toUpperCase()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={flow.sendWhatsAppAgain}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-input bg-brass text-sm font-semibold text-ink hover:bg-brass-lit"
            >
              <MessageCircle className="h-4 w-4" /> {t.whatsappFollowUp}
            </button>
            <button
              type="button"
              onClick={flow.resetForm}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-input border border-ink/20 text-sm font-semibold text-ink hover:border-brass hover:text-brass"
            >
              <RotateCcw className="h-4 w-4" /> {t.bookAnother}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
