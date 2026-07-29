import Link from "next/link";
import { PRIMARY_NAV } from "@/content/nav";
import { PRIMARY_NAV_AR } from "@/content/nav.ar";
import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";
import { MobileNav } from "@/components/ui/MobileNav";

export function Header({ dict, locale = "en" }: { dict: Dictionary; locale?: Locale }) {
  const navLinks = locale === "ar" ? PRIMARY_NAV_AR : PRIMARY_NAV;
  const homeHref = locale === "ar" ? "/ar/" : "/";
  const bookNowHref = locale === "ar" ? "/ar/booking/" : "/booking/";

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-white/10 bg-ink/95 text-white backdrop-blur supports-[backdrop-filter]:bg-ink/85">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-5 lg:px-10">
        <Link href={withSlash(homeHref)} className="flex min-w-0 flex-col justify-center">
          <span className="truncate font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
            {BUSINESS.brandName}
          </span>
          <span className="eyebrow hidden text-brass-lit md:block">{dict.eyebrow}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={withSlash(link.href)}
                  className="text-sm font-medium text-white/85 hover:text-brass-lit"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref()}
            className="text-sm font-medium text-white/85 hover:text-brass-lit"
            data-analytics="call_click"
          >
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center rounded-input bg-brass px-5 text-sm font-semibold text-ink hover:bg-brass-lit"
            data-analytics="whatsapp_click"
          >
            {dict.bookNowCta}
          </a>
        </div>

        <MobileNav
          links={navLinks}
          openLabel={dict.menuOpen}
          closeLabel={dict.menuClose}
          bookNowLabel={dict.bookNowCta}
          bookNowHref={bookNowHref}
        />
      </div>
    </header>
  );
}
