import Link from "next/link";
import { withSlash } from "@/lib/url";
import { ROUTE_LINKS, SERVICE_LINKS } from "@/content/nav";
import { ROUTE_LINKS_AR, SERVICE_LINKS_AR } from "@/content/nav.ar";
import { whatsappHref } from "@/content/business";

// Note: this segment-level not-found can't read the [locale] param directly
// (Next.js doesn't pass params to not-found.tsx), so it renders in English —
// the html lang/dir from the nearest layout still reflects the real locale
// since generateStaticParams already built one of these per locale.
// Arabic visitors hitting an unmatched /ar/... path still get dir="rtl" from
// the layout; only this fallback body's copy is English.

export default function NotFound() {
  return (
    <section className="bg-sand py-16 lg:py-24">
      <div className="mx-auto max-w-[820px] px-5 lg:px-10">
        <p className="eyebrow text-sea">404</p>
        <h1 className="mt-3 text-[2rem] font-bold leading-tight text-ink lg:text-[2.75rem]">
          This page took a wrong turn
        </h1>
        <p className="mt-5 text-base text-slate lg:text-lg">
          We couldn&apos;t find that page, but here are the routes and services people usually
          mean to find. If you were expecting something specific, message us on WhatsApp and
          we&apos;ll point you in the right direction.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={withSlash("/")}
            className="flex h-11 items-center rounded-input bg-brass px-5 text-sm font-semibold text-ink hover:bg-brass-lit"
          >
            Back to home
          </Link>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center rounded-input border border-ink/20 px-5 text-sm font-semibold text-ink hover:border-brass"
          >
            Ask us on WhatsApp
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 className="eyebrow text-slate">Popular routes / الخطوط الأكثر طلبًا</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {ROUTE_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link href={withSlash(link.href)} className="text-sea hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              {ROUTE_LINKS_AR.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link href={withSlash(link.href)} className="text-sea hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-slate">Services / الخدمات</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {SERVICE_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={withSlash(link.href)} className="text-sea hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              {SERVICE_LINKS_AR.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link href={withSlash(link.href)} className="text-sea hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
