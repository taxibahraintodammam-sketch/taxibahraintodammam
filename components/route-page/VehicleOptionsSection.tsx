import Link from "next/link";
import { FLEET } from "@/content/fleet";
import { FLEET_AR } from "@/content/fleet.ar";
import type { VehicleClass } from "@/content/fares";
import { withSlash } from "@/lib/url";
import { getDictionary, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export function VehicleOptionsSection({
  vehicles,
  dict = getDictionary("en"),
  locale = "en",
}: {
  vehicles: VehicleClass[];
  dict?: Dictionary;
  locale?: Locale;
}) {
  const fleet = locale === "ar" ? FLEET_AR : FLEET;
  const options = fleet.filter((v) => vehicles.includes(v.vehicle));
  if (options.length === 0) return null;

  const fleetPath = locale === "ar" ? "/ar/fleet" : "/fleet";

  return (
    <section aria-label={dict.vehicleOptionsEyebrow} className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{dict.vehicleOptionsEyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-ink lg:text-3xl">{dict.chooseYourVehicle}</h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((vehicle) => (
            <Link
              key={vehicle.slug}
              href={withSlash(`${fleetPath}/${vehicle.slug}`)}
              className="flex flex-col rounded-card border border-ink/10 bg-ink/5 p-5 hover:border-brass"
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
