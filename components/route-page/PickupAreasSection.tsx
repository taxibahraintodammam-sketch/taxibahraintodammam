import Link from "next/link";
import { PICKUP_AREAS } from "@/content/pickup-areas";
import { PICKUP_AREAS_AR } from "@/content/pickup-areas.ar";
import { withSlash } from "@/lib/url";
import { getDictionary, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export function PickupAreasSection({
  areas,
  fromLabel,
  dict = getDictionary("en"),
  locale = "en",
}: {
  areas: string[];
  fromLabel: string;
  dict?: Dictionary;
  locale?: Locale;
}) {
  if (areas.length === 0) return null;

  const source = locale === "ar" ? PICKUP_AREAS_AR : PICKUP_AREAS;
  const pickupPath = locale === "ar" ? "/ar/pickup" : "/pickup";
  const links = source
    .filter((area) => areas.includes(area.slug))
    .map((area) => ({ label: area.name, href: `${pickupPath}/${area.slug}` }));

  return (
    <section aria-label={`${dict.pickupAreasWeCoverIn} ${fromLabel}`} className="bg-sand py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{dict.coverageEyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-ink lg:text-3xl">
          {dict.pickupAreasWeCoverIn} {fromLabel}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={withSlash(link.href)}
              className="rounded-input border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-brass"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
