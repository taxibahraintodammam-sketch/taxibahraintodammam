import { sarFromBhd } from "@/content/business";

/**
 * Fares below are benchmarked against published 2026 rates from competing
 * Bahrain–Saudi causeway operators (Noorha Transport, Target Transportation,
 * Taxi Service KSA and others), converted from their SAR "starting from"
 * sedan price at BHD_TO_SAR_RATE, then scaled to van/SUV/luxury using the
 * ~1.0 / 1.125 / 1.35 / 1.6x ratio observed across those operators' own
 * vehicle-tier pricing. Qatif and Abqaiq had no published competitor rate,
 * so they're interpolated from the distance-vs-price curve of the routes
 * that do. These are a competitive starting point, not this business's
 * actual costs/margins — the owner should still confirm each figure covers
 * fuel, driver time and toll for their fleet before publishing live.
 */

export type VehicleClass = "sedan" | "suv" | "van" | "luxury" | "bus";

export const VEHICLE_LABEL: Record<VehicleClass, string> = {
  sedan: "Sedan",
  suv: "SUV",
  van: "Van (up to 7)",
  luxury: "Luxury Sedan",
  bus: "30-Seat Coaster",
};

export const VEHICLE_LABEL_AR: Record<VehicleClass, string> = {
  sedan: "سيدان",
  suv: "دفع رباعي",
  van: "فان (حتى 7 ركاب)",
  luxury: "سيدان فاخرة",
  bus: "حافلة 30 مقعدًا",
};

export const VEHICLE_CAPACITY: Record<VehicleClass, string> = {
  sedan: "1–3 passengers, 2 large bags",
  suv: "1–4 passengers, 3 large bags",
  van: "1–7 passengers, 6 large bags",
  luxury: "1–3 passengers, 2 large bags",
  bus: "up to 30 passengers",
};

export const VEHICLE_CAPACITY_AR: Record<VehicleClass, string> = {
  sedan: "1–3 ركاب، حقيبتان كبيرتان",
  suv: "1–4 ركاب، 3 حقائب كبيرة",
  van: "1–7 ركاب، 6 حقائب كبيرة",
  luxury: "1–3 ركاب، حقيبتان كبيرتان",
  bus: "حتى 30 راكبًا",
};

export type RouteFare = {
  vehicle: VehicleClass;
  bhd: number;
};

export const ROUTE_FARES: Record<string, RouteFare[]> = {
  "taxi-bahrain-to-dammam": [
    { vehicle: "sedan", bhd: 40 },
    { vehicle: "van", bhd: 45 },
    { vehicle: "suv", bhd: 54 },
    { vehicle: "luxury", bhd: 64 },
  ],
  "taxi-dammam-to-bahrain": [
    { vehicle: "sedan", bhd: 40 },
    { vehicle: "van", bhd: 45 },
    { vehicle: "suv", bhd: 54 },
    { vehicle: "luxury", bhd: 64 },
  ],
  "bahrain-to-dammam-airport-taxi": [
    { vehicle: "sedan", bhd: 46 },
    { vehicle: "van", bhd: 52 },
    { vehicle: "suv", bhd: 62 },
    { vehicle: "luxury", bhd: 74 },
  ],
  "dammam-airport-to-bahrain-taxi": [
    { vehicle: "sedan", bhd: 46 },
    { vehicle: "van", bhd: 52 },
    { vehicle: "suv", bhd: 62 },
    { vehicle: "luxury", bhd: 74 },
  ],
  "bahrain-airport-to-dammam-taxi": [
    { vehicle: "sedan", bhd: 46 },
    { vehicle: "van", bhd: 52 },
    { vehicle: "suv", bhd: 62 },
    { vehicle: "luxury", bhd: 74 },
  ],
  "taxi-bahrain-to-khobar": [
    { vehicle: "sedan", bhd: 35 },
    { vehicle: "van", bhd: 40 },
    { vehicle: "suv", bhd: 48 },
    { vehicle: "luxury", bhd: 56 },
  ],
  "taxi-khobar-to-bahrain": [
    { vehicle: "sedan", bhd: 35 },
    { vehicle: "van", bhd: 40 },
    { vehicle: "suv", bhd: 48 },
    { vehicle: "luxury", bhd: 56 },
  ],
  "taxi-bahrain-to-riyadh": [
    { vehicle: "sedan", bhd: 171 },
    { vehicle: "van", bhd: 192 },
    { vehicle: "suv", bhd: 231 },
    { vehicle: "luxury", bhd: 274 },
  ],
  "taxi-bahrain-to-jubail": [
    { vehicle: "sedan", bhd: 70 },
    { vehicle: "van", bhd: 79 },
    { vehicle: "suv", bhd: 95 },
    { vehicle: "luxury", bhd: 113 },
  ],
  "taxi-bahrain-to-al-ahsa-hofuf": [
    { vehicle: "sedan", bhd: 75 },
    { vehicle: "van", bhd: 85 },
    { vehicle: "suv", bhd: 102 },
    { vehicle: "luxury", bhd: 121 },
  ],
  "taxi-bahrain-to-ras-tanura": [
    { vehicle: "sedan", bhd: 55 },
    { vehicle: "van", bhd: 62 },
    { vehicle: "suv", bhd: 75 },
    { vehicle: "luxury", bhd: 89 },
  ],
  "taxi-bahrain-to-abqaiq": [
    { vehicle: "sedan", bhd: 50 },
    { vehicle: "van", bhd: 57 },
    { vehicle: "suv", bhd: 68 },
    { vehicle: "luxury", bhd: 80 },
  ],
  "taxi-bahrain-to-qatif": [
    { vehicle: "sedan", bhd: 42 },
    { vehicle: "van", bhd: 48 },
    { vehicle: "suv", bhd: 57 },
    { vehicle: "luxury", bhd: 68 },
  ],
  "visa-u-turn-service": [
    { vehicle: "sedan", bhd: 45 },
    { vehicle: "van", bhd: 51 },
    { vehicle: "suv", bhd: 61 },
  ],
};

export function lowestFare(slug: string): RouteFare | undefined {
  const fares = ROUTE_FARES[slug];
  if (!fares || fares.length === 0) return undefined;
  return fares.reduce((min, f) => (f.bhd < min.bhd ? f : min), fares[0]);
}

export function fareWithSar(fare: RouteFare) {
  return { ...fare, sar: sarFromBhd(fare.bhd) };
}
