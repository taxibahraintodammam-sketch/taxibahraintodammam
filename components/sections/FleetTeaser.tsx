import Link from "next/link";
import { FLEET } from "@/content/fleet";
import { FLEET_AR } from "@/content/fleet.ar";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";

export function FleetTeaser({ locale = "en" }: { locale?: Locale }) {
  const fleet = locale === "ar" ? FLEET_AR : FLEET;
  const prefix = locale === "ar" ? "/ar" : "";
  const eyebrow = locale === "ar" ? "الأسطول" : "Fleet";
  const heading = locale === "ar" ? "مركبة لكل حجم مجموعة" : "A vehicle for every party size";

  return (
    <section aria-label="Our fleet" className="bg-sand py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-ink lg:text-3xl">{heading}</h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {fleet.map((vehicle) => (
            <Link
              key={vehicle.slug}
              href={withSlash(`${prefix}/fleet/${vehicle.slug}`)}
              className="flex flex-col rounded-card border border-ink/10 bg-white p-5 shadow-elevation hover:border-brass"
            >
              <span className="text-sm font-semibold text-ink">{vehicle.name}</span>
              <span className="mt-1 text-xs text-slate">{vehicle.tagline}</span>
              <div className="mt-4 flex flex-col gap-1 border-t border-ink/10 pt-3 text-xs text-slate">
                <span>{vehicle.passengers}</span>
                <span>{vehicle.luggage}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
