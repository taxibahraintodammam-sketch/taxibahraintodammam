"use client";

import { useState } from "react";
import Link from "next/link";
import { withSlash } from "@/lib/url";
import { PICKUP_AREAS } from "@/content/pickup-areas";
import { DB_DESTINATION } from "@/content/dammam-bahrain";

/** A journey-planning interface, not a set of city landing pages: picking a
 * destination only ever surfaces a note or a link to a page that already
 * exists — it never fabricates a new one. */
export function DestinationSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const option = DB_DESTINATION.options.find((o) => o.label === selected);

  const note =
    option?.kind === "airport"
      ? DB_DESTINATION.airportNote
      : option?.kind === "office"
        ? DB_DESTINATION.officeNote
        : option?.kind === "hotel"
          ? DB_DESTINATION.hotelNote
          : option
            ? DB_DESTINATION.genericNote
            : null;

  const pickupHref = option && "pickupSlug" in option && option.pickupSlug ? `/pickup/${option.pickupSlug}` : null;
  const isMatched = PICKUP_AREAS.some((a) => pickupHref?.endsWith(a.slug));

  return (
    <div className="rounded-card border border-ink/10 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {DB_DESTINATION.options.map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => setSelected(o.label)}
            aria-pressed={selected === o.label}
            className={`rounded-input border px-3.5 py-2 text-sm font-semibold ${
              selected === o.label ? "border-sea bg-sea/10 text-sea" : "border-ink/15 text-ink/70 hover:border-ink/30"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {note && (
        <div className="mt-5 rounded-card bg-ink/[0.04] p-4" aria-live="polite">
          <p className="text-sm text-ink/80">{note}</p>
          {pickupHref && isMatched && (
            <Link href={withSlash(pickupHref)} className="mt-2 inline-block text-sm font-semibold text-sea hover:underline">
              More about {selected}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
