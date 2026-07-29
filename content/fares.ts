import { sarFromBhd } from "@/content/business";

/**
 * PLACEHOLDER FARES. Every bhd value below is a placeholder the site owner
 * must confirm before launch — search "FILL_ME_FARE" to find every one.
 * These are NOT real quoted prices; they exist so the page templates have
 * something structurally correct to render during development.
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
  bhd: number; // FILL_ME_FARE
};

export const ROUTE_FARES: Record<string, RouteFare[]> = {
  "taxi-bahrain-to-dammam": [
    { vehicle: "sedan", bhd: 25 },
    { vehicle: "suv", bhd: 35 },
    { vehicle: "van", bhd: 45 },
    { vehicle: "luxury", bhd: 60 },
  ],
  "taxi-dammam-to-bahrain": [
    { vehicle: "sedan", bhd: 25 },
    { vehicle: "suv", bhd: 35 },
    { vehicle: "van", bhd: 45 },
    { vehicle: "luxury", bhd: 60 },
  ],
  "bahrain-to-dammam-airport-taxi": [
    { vehicle: "sedan", bhd: 27 },
    { vehicle: "suv", bhd: 37 },
    { vehicle: "van", bhd: 47 },
    { vehicle: "luxury", bhd: 62 },
  ],
  "dammam-airport-to-bahrain-taxi": [
    { vehicle: "sedan", bhd: 27 },
    { vehicle: "suv", bhd: 37 },
    { vehicle: "van", bhd: 47 },
    { vehicle: "luxury", bhd: 62 },
  ],
  "bahrain-airport-to-dammam-taxi": [
    { vehicle: "sedan", bhd: 27 },
    { vehicle: "suv", bhd: 37 },
    { vehicle: "van", bhd: 47 },
    { vehicle: "luxury", bhd: 62 },
  ],
  "taxi-bahrain-to-khobar": [
    { vehicle: "sedan", bhd: 22 },
    { vehicle: "suv", bhd: 32 },
    { vehicle: "van", bhd: 42 },
    { vehicle: "luxury", bhd: 55 },
  ],
  "taxi-khobar-to-bahrain": [
    { vehicle: "sedan", bhd: 22 },
    { vehicle: "suv", bhd: 32 },
    { vehicle: "van", bhd: 42 },
    { vehicle: "luxury", bhd: 55 },
  ],
  "taxi-bahrain-to-riyadh": [
    { vehicle: "sedan", bhd: 75 },
    { vehicle: "suv", bhd: 95 },
    { vehicle: "van", bhd: 115 },
    { vehicle: "luxury", bhd: 145 },
  ],
  "taxi-bahrain-to-jubail": [
    { vehicle: "sedan", bhd: 32 },
    { vehicle: "suv", bhd: 42 },
    { vehicle: "van", bhd: 52 },
    { vehicle: "luxury", bhd: 68 },
  ],
  "taxi-bahrain-to-al-ahsa-hofuf": [
    { vehicle: "sedan", bhd: 40 },
    { vehicle: "suv", bhd: 52 },
    { vehicle: "van", bhd: 64 },
    { vehicle: "luxury", bhd: 82 },
  ],
  "taxi-bahrain-to-ras-tanura": [
    { vehicle: "sedan", bhd: 35 },
    { vehicle: "suv", bhd: 45 },
    { vehicle: "van", bhd: 55 },
    { vehicle: "luxury", bhd: 72 },
  ],
  "taxi-bahrain-to-abqaiq": [
    { vehicle: "sedan", bhd: 33 },
    { vehicle: "suv", bhd: 43 },
    { vehicle: "van", bhd: 53 },
    { vehicle: "luxury", bhd: 70 },
  ],
  "taxi-bahrain-to-qatif": [
    { vehicle: "sedan", bhd: 27 },
    { vehicle: "suv", bhd: 37 },
    { vehicle: "van", bhd: 47 },
    { vehicle: "luxury", bhd: 61 },
  ],
  "visa-u-turn-service": [
    { vehicle: "sedan", bhd: 45 },
    { vehicle: "suv", bhd: 60 },
    { vehicle: "van", bhd: 75 },
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
