"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { whatsappHref } from "@/content/business";
import type { Locale } from "@/lib/locale";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const TEXT: Record<Locale, Record<string, string>> = {
  en: {
    heading: "Accept your quote",
    body: "Confirming locks in the quoted fare. We'll email your confirmation and our team will assign your driver.",
    ref: "Booking",
    accept: "Accept this quote",
    working: "Confirming…",
    done: "Your booking is confirmed. A confirmation email is on its way.",
    already: "This booking is already confirmed. Nothing else to do.",
    invalid: "This link is incomplete or has expired. Message us on WhatsApp and we'll confirm your booking.",
    notFound: "We couldn't find this booking. Message us on WhatsApp and we'll sort it out.",
    state: "This quote can no longer be accepted online. Message us on WhatsApp if you still want to travel.",
    error: "Something went wrong. Please try again, or message us on WhatsApp.",
    whatsapp: "Message us on WhatsApp",
  },
  ar: {
    heading: "قبول عرض السعر",
    body: "بالتأكيد يُثبَّت السعر المعروض. سنرسل لك تأكيدًا بالبريد وسيعيّن فريقنا السائق.",
    ref: "الحجز",
    accept: "قبول عرض السعر",
    working: "جارٍ التأكيد…",
    done: "تم تأكيد حجزك. رسالة التأكيد في طريقها إلى بريدك.",
    already: "هذا الحجز مؤكد بالفعل، ولا حاجة لأي إجراء آخر.",
    invalid: "الرابط غير مكتمل أو منتهي الصلاحية. راسلنا عبر واتساب وسنؤكد حجزك.",
    notFound: "لم نعثر على هذا الحجز. راسلنا عبر واتساب وسنتابع معك.",
    state: "لم يعد بالإمكان قبول هذا العرض عبر الإنترنت. راسلنا عبر واتساب إن كنت لا تزال ترغب في السفر.",
    error: "حدث خطأ. حاول مرة أخرى أو راسلنا عبر واتساب.",
    whatsapp: "راسلنا عبر واتساب",
  },
};

type State = "idle" | "working" | "done" | "already" | "notFound" | "state" | "error";

export function QuoteAccept({ locale }: { locale: Locale }) {
  const t = TEXT[locale];
  const id = useSearchParams()?.get("id") ?? "";
  const valid = UUID_RE.test(id);
  const [state, setState] = useState<State>("idle");
  const ref = valid ? `#${id.slice(0, 8).toUpperCase()}` : "";

  async function accept() {
    setState("working");
    try {
      const res = await fetch("/api/booking/accept-quote/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setState(data.alreadyConfirmed ? "already" : "done");
      else if (res.status === 404) setState("notFound");
      else if (res.status === 409) setState("state");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  const whatsapp = (
    <a
      href={whatsappHref(`${t.ref} ${ref}`.trim())}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex h-12 items-center justify-center rounded-input border border-ink/20 px-6 font-semibold text-ink hover:border-sea hover:text-sea"
      data-analytics="whatsapp_click"
    >
      {t.whatsapp}
    </a>
  );

  if (!valid) {
    return (
      <div role="alert">
        <p className="text-slate">{t.invalid}</p>
        {whatsapp}
      </div>
    );
  }

  const message =
    state === "done" ? t.done : state === "already" ? t.already : state === "notFound" ? t.notFound : state === "state" ? t.state : state === "error" ? t.error : null;
  const success = state === "done" || state === "already";

  return (
    <div>
      <p className="text-sm text-slate">
        {t.ref} <span className="font-[family-name:var(--font-mono)] text-ink">{ref}</span>
      </p>
      <p className="mt-3 text-slate">{t.body}</p>

      {!success && (
        <button
          type="button"
          onClick={accept}
          disabled={state === "working"}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-input bg-brass px-6 text-base font-bold text-ink transition-colors hover:bg-brass-lit disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {state === "working" ? t.working : t.accept}
        </button>
      )}

      {message && (
        <div role="status" aria-live="polite" className={`mt-6 rounded-input p-4 ${success ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
          <p className="font-medium">{message}</p>
        </div>
      )}
      {(state === "notFound" || state === "state" || state === "error") && whatsapp}
    </div>
  );
}

