import Link from "next/link";
import {
  COMPANY_LINKS,
  ROUTE_LINKS,
  SERVICE_LINKS,
  PICKUP_LINKS,
  LEGAL_LINKS,
  type NavLink,
} from "@/content/nav";
import {
  COMPANY_LINKS_AR,
  ROUTE_LINKS_AR,
  SERVICE_LINKS_AR,
  PICKUP_LINKS_AR,
  LEGAL_LINKS_AR,
} from "@/content/nav.ar";
import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import { withSlash } from "@/lib/url";
import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

function FooterColumn({ heading, links }: { heading: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="eyebrow mb-4 text-slate">{heading}</h2>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={withSlash(link.href)} className="text-sm text-ink/75 hover:text-brass">
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

  return (
    <footer className="border-t border-ink/10 bg-white text-ink">
      <div className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <span className="font-[family-name:var(--font-display)] text-xl font-bold">
              {BUSINESS.brandName}
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">{dict.footerTagline}</p>
            <p className="eyebrow mt-4 text-brass">{dict.footerLicensedLine}</p>
            <p className="mt-2 text-sm text-slate">{dict.footerAvailable}</p>
            <div className="mt-5 flex flex-col gap-2">
              <a href={telHref()} className="text-sm font-medium text-ink hover:text-brass">
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink hover:text-brass"
              >
                {dict.whatsappCta}
              </a>
            </div>
          </div>

          <FooterColumn
            heading={dict.footerCompanyHeading}
            links={isAr ? COMPANY_LINKS_AR : COMPANY_LINKS}
          />
          <FooterColumn
            heading={dict.footerRoutesHeading}
            links={isAr ? ROUTE_LINKS_AR : ROUTE_LINKS}
          />
          <FooterColumn
            heading={dict.footerServicesHeading}
            links={isAr ? SERVICE_LINKS_AR : SERVICE_LINKS}
          />
          <FooterColumn
            heading={dict.footerPickupHeading}
            links={isAr ? PICKUP_LINKS_AR : PICKUP_LINKS}
          />
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6">
          <FooterColumn
            heading={dict.footerLegalHeading}
            links={isAr ? LEGAL_LINKS_AR : LEGAL_LINKS}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-slate">
          <p>
            © {year} {BUSINESS.brandName}. {dict.footerRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
