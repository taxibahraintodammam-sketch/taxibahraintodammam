"use client";

import { useState } from "react";
import { MessageCircle, ClipboardList } from "lucide-react";
import { QuoteForm } from "@/components/ui/QuoteForm";
import BookingForm from "@/components/booking/BookingForm";
import type { Locale } from "@/lib/locale";

const COPY: Record<Locale, { whatsappTab: string; onlineTab: string }> = {
  en: { whatsappTab: "Quick WhatsApp Quote", onlineTab: "Book Online" },
  ar: { whatsappTab: "عرض سعر سريع عبر واتساب", onlineTab: "احجز عبر الإنترنت" },
};

export default function BookingTabs({ locale }: { locale: Locale }) {
  const [tab, setTab] = useState<"whatsapp" | "online">("whatsapp");
  const t = COPY[locale];

  return (
    <div>
      <div className="mb-4 inline-flex rounded-pill border border-ink/10 bg-white p-1 shadow-elevation">
        <button
          type="button"
          onClick={() => setTab("whatsapp")}
          className={`flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "whatsapp" ? "bg-brass text-ink" : "text-slate hover:text-ink"
          }`}
        >
          <MessageCircle className="h-4 w-4" /> {t.whatsappTab}
        </button>
        <button
          type="button"
          onClick={() => setTab("online")}
          className={`flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "online" ? "bg-brass text-ink" : "text-slate hover:text-ink"
          }`}
        >
          <ClipboardList className="h-4 w-4" /> {t.onlineTab}
        </button>
      </div>

      {tab === "whatsapp" ? <QuoteForm /> : <BookingForm locale={locale} />}
    </div>
  );
}
