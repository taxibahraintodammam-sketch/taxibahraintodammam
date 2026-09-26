import Link from "next/link";
import { PRIMARY_NAV } from "@/content/nav";
import { PRIMARY_NAV_AR } from "@/content/nav.ar";
import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";
import { MobileNav } from "@/components/ui/MobileNav";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";

export function Header({ dict, locale = "en" }: { dict: Dictionary; locale?: Locale }) {
  const navLinks = locale === "ar" ? PRIMARY_NAV_AR : PRIMARY_NAV;
  const homeHref = locale === "ar" ? "/ar/" : "/";
  const bookNowHref = locale === "ar" ? "/ar/booking/" : "/booking/";

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-ink/10 bg-white/95 text-ink backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-5 lg:px-10">
        <Link href={withSlash(homeHref)} className="min-w-0 truncate font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
          {BUSINESS.brandName}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={withSlash(link.href)}
                  className="rounded-input px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink/[0.04] hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch label={dict.languageSwitchLabel} className="text-sm font-medium text-ink/70 hover:text-ink" />
          <a
            href={telHref()}
            dir="ltr"
            className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink"
            data-analytics="call_click"
          >
            <PhoneIcon />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={whatsappHref(dict.whatsappDefaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center rounded-input bg-brass px-5 text-sm font-semibold text-ink transition-colors hover:bg-brass-lit"
            data-analytics="whatsapp_click"
          >
            {dict.bookNowCta}
          </a>
        </div>

        <MobileNav
          links={navLinks}
          openLabel={dict.menuOpen}
          closeLabel={dict.menuClose}
          bookNowLabel={dict.getFareCta}
          bookNowHref={bookNowHref}
          languageLabel={dict.languageSwitchLabel}
          phoneDisplay={BUSINESS.phoneDisplay}
          phoneHref={telHref()}
        />
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5c0-.6.4-1 1-1h3l2 5-2 1a9 9 0 0 0 5 5l1-2 5 2v3c0 .6-.4 1-1 1A15 15 0 0 1 4 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
