"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { withSlash } from "@/lib/url";

/**
 * Links to the same page in the other language. Every page under
 * app/[locale] exists in both, so the counterpart is just the path with /ar
 * added or removed. English URLs are rewritten onto /en internally
 * (middleware.ts), so an /en prefix is stripped too.
 */
export function counterpartPath(pathname: string): string {
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return withSlash(pathname.slice(3) || "/");
  const english = pathname === "/en" || pathname.startsWith("/en/") ? pathname.slice(3) || "/" : pathname;
  return withSlash(`/ar${english === "/" ? "" : english}`);
}

export function LanguageSwitch({ label, className = "" }: { label: string; className?: string }) {
  const pathname = usePathname() ?? "/";
  const toArabic = !(pathname === "/ar" || pathname.startsWith("/ar/"));
  return (
    <Link
      href={counterpartPath(pathname)}
      hrefLang={toArabic ? "ar" : "en"}
      lang={toArabic ? "ar" : "en"}
      className={className}
    >
      {label}
    </Link>
  );
}
