import Link from "next/link";
import {
  ROUTE_FARES,
  VEHICLE_LABEL,
  VEHICLE_LABEL_AR,
  VEHICLE_CAPACITY,
  VEHICLE_CAPACITY_AR,
  fareWithSar,
} from "@/content/fares";
import { getDictionary, type Dictionary } from "@/content/dictionary";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";

export function FareTableTeaser({
  locale = "en",
  dict = getDictionary(locale),
}: {
  locale?: Locale;
  dict?: Dictionary;
}) {
  const fares = ROUTE_FARES["taxi-bahrain-to-dammam"].map(fareWithSar);
  const vehicleLabel = locale === "ar" ? VEHICLE_LABEL_AR : VEHICLE_LABEL;
  const vehicleCapacity = locale === "ar" ? VEHICLE_CAPACITY_AR : VEHICLE_CAPACITY;
  const prefix = locale === "ar" ? "/ar" : "";
  const heading = locale === "ar" ? "البحرين ⇄ الدمام، ابتداءً من" : "Bahrain ⇄ Dammam, starting from";
  const seeAll =
    locale === "ar"
      ? "شاهد جدول الأسعار الكامل لكل الخطوط ←"
      : "See the full fare table for every route →";

  return (
    <section aria-label="Bahrain to Dammam fare table" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-sea">{dict.faresEyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold text-ink lg:text-3xl">{heading}</h2>
          </div>
          <Link
            href={withSlash(`${prefix}/fares/`)}
            className="text-sm font-semibold text-sea hover:underline"
          >
            {seeAll}
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto rounded-card border border-ink/10">
          <table className="w-full min-w-[560px] border-collapse text-start text-sm">
            <thead>
              <tr className="border-b-2 border-ink text-ink">
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
