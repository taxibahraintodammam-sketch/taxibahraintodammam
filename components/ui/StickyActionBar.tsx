import Link from "next/link";
import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export function StickyActionBar({ dict, locale = "en" }: { dict: Dictionary; locale?: Locale }) {
  const bookNowHref = locale === "ar" ? "/ar/booking/" : "/booking/";
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-ink/10 bg-white shadow-elevation lg:hidden"
      style={{ height: "var(--sticky-bar-height)" }}
    >
      <a
        href={telHref()}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 border-r border-ink/10 text-ink"
        data-analytics="call_click"
      >
        <PhoneIcon />
        <span className="text-xs font-medium">{dict.callNow}</span>
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 border-r border-ink/10 bg-brass text-ink"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon />
        <span className="text-xs font-medium">{dict.whatsappCta}</span>
      </a>
      <Link
        href={withSlash(bookNowHref)}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 text-ink"
      >
        <FareIcon />
        <span className="text-xs font-medium">{dict.getFareCta}</span>
      </Link>
      <span className="sr-only" aria-live="polite">
        {BUSINESS.hours}
      </span>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5c0-.6.4-1 1-1h3l2 5-2 1a9 9 0 0 0 5 5l1-2 5 2v3c0 .6-.4 1-1 1A15 15 0 0 1 4 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 12a8 8 0 1 1-3.7-6.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M17 4.5A8 8 0 0 0 4.3 15.8L4 20l4.3-.9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 10c0 3 2 5 5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8M9.5 10a2 2 0 0 1 2-1.5h1a2 2 0 0 1 0 4h-1a2 2 0 0 0 0 4h1a2 2 0 0 0 2-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
