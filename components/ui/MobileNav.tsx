"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { NavLink } from "@/content/nav";
import { withSlash } from "@/lib/url";

export function MobileNav({
  links,
  openLabel,
  closeLabel,
  bookNowLabel,
  bookNowHref,
}: {
  links: NavLink[];
  openLabel: string;
  closeLabel: string;
  bookNowLabel: string;
  bookNowHref: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-input border border-ink/15 text-ink"
      >
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id={panelId}
          className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t border-ink/10 bg-white px-5 py-6"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={withSlash(link.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-input px-3 py-3 text-lg text-ink/85 hover:bg-ink/5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={withSlash(bookNowHref)}
            onClick={() => setOpen(false)}
            className="mt-6 flex h-12 items-center justify-center rounded-input bg-brass px-6 font-medium text-ink"
          >
            {bookNowLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
