import Link from "next/link";
import {
  COMPANY_LINKS,
  FOOTER_ROUTE_LINKS,
  SERVICE_LINKS,
  SUPPORT_LINKS,
  FOOTER_LEGAL_LINKS,
  type NavLink,
} from "@/content/nav";
import {
  COMPANY_LINKS_AR,
  FOOTER_ROUTE_LINKS_AR,
  SERVICE_LINKS_AR,
  SUPPORT_LINKS_AR,
  FOOTER_LEGAL_LINKS_AR,
} from "@/content/nav.ar";
import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";

function FooterColumn({ heading, links }: { heading: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{heading}</h2>
      <ul className="mt-3 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={withSlash(link.href)} className="inline-block py-1.5 text-sm text-slate transition-colors hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ dict, locale = "en" }: { dict: Dictionary; locale?: Locale }) {
  const year = new Date().getFullYear();
  const isAr = locale === "ar";

  // Bottom padding clears the fixed mobile action bar, which would otherwise cover the last footer row.
  return (
    <footer id="site-footer" className="border-t border-ink/10 bg-ink/[0.025] pb-[var(--sticky-bar-height)] text-ink lg:pb-0">
      <div className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <p className="font-[family-name:var(--font-display)] text-lg font-bold">{BUSINESS.brandName}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate">{dict.footerTagline}</p>
            <dl className="mt-5 flex flex-col gap-1 text-sm">
              <div className="flex gap-2">
                <dt className="sr-only">{dict.callNow}</dt>
                <dd>
                  <a href={telHref()} dir="ltr" className="font-semibold hover:text-sea" data-analytics="call_click">
                    {BUSINESS.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">{dict.whatsappCta}</dt>
                <dd>
                  <a
                    href={whatsappHref(dict.whatsappDefaultMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sea hover:underline"
                    data-analytics="whatsapp_click"
                  >
                    {dict.ctaWhatsappButton}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a href={`mailto:${BUSINESS.email}`} className="text-slate hover:text-ink">
                    {BUSINESS.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-slate">{dict.footerAvailable}</p>
          </div>

          <FooterColumn heading={dict.footerServicesHeading} links={isAr ? SERVICE_LINKS_AR : SERVICE_LINKS} />
          <FooterColumn heading={dict.footerRoutesHeading} links={isAr ? FOOTER_ROUTE_LINKS_AR : FOOTER_ROUTE_LINKS} />
          <FooterColumn heading={dict.footerCompanyHeading} links={isAr ? COMPANY_LINKS_AR : COMPANY_LINKS} />
          <FooterColumn heading={dict.footerSupportHeading} links={isAr ? SUPPORT_LINKS_AR : SUPPORT_LINKS} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-6 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS.brandName}. {dict.footerRightsReserved}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {(isAr ? FOOTER_LEGAL_LINKS_AR : FOOTER_LEGAL_LINKS).map((link) => (
              <Link key={link.href} href={withSlash(link.href)} className="py-1 hover:text-ink">
                {link.label}
              </Link>
            ))}
            <LanguageSwitch
              label={dict.languageSwitchLabel}
              className="rounded-pill border border-ink/15 px-3 py-1.5 font-semibold text-ink hover:border-ink/40"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
