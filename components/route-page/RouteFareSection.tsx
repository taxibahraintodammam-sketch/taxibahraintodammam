import {
  ROUTE_FARES,
  VEHICLE_LABEL,
  VEHICLE_LABEL_AR,
  VEHICLE_CAPACITY,
  VEHICLE_CAPACITY_AR,
  fareWithSar,
} from "@/content/fares";
import { getDictionary, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";
import type { RouteContent } from "@/content/routes";

export function RouteFareSection({
  route,
  dict = getDictionary("en"),
  locale = "en",
}: {
  route: RouteContent;
  dict?: Dictionary;
  locale?: Locale;
}) {
  const vehicleLabel = locale === "ar" ? VEHICLE_LABEL_AR : VEHICLE_LABEL;
  const vehicleCapacity = locale === "ar" ? VEHICLE_CAPACITY_AR : VEHICLE_CAPACITY;
  const fares = (ROUTE_FARES[route.slug] ?? []).map(fareWithSar);
  if (fares.length === 0) return null;

  return (
    <section aria-label={`${route.from} to ${route.to} fare table`} className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{dict.faresEyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-ink lg:text-3xl">
          {route.from} ⇄ {route.to}, {dict.startingFrom}
        </h2>

        <div className="mt-8 overflow-x-auto rounded-card border border-ink/10">
          <table className="w-full min-w-[560px] border-collapse text-start text-sm">
            <thead>
              <tr className="bg-ink text-white">
                <th className="px-4 py-3 font-semibold">{dict.vehicleHeader}</th>
                <th className="px-4 py-3 font-semibold">{dict.capacityHeader}</th>
                <th className="px-4 py-3 font-semibold">{dict.startingFareHeader}</th>
              </tr>
            </thead>
            <tbody>
              {fares.map((fare, index) => (
                <tr key={fare.vehicle} className={index % 2 === 1 ? "bg-ink/5" : undefined}>
                  <td className="px-4 py-3 font-medium text-ink">{vehicleLabel[fare.vehicle]}</td>
                  <td className="px-4 py-3 text-slate">{vehicleCapacity[fare.vehicle]}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-display)] font-bold text-ink">
                    BHD {fare.bhd} <span className="text-slate font-normal">/ SAR {fare.sar}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-slate">{dict.fareDisclaimer}</p>
      </div>
    </section>
  );
}
