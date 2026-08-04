/**
 * Single source of truth for facts the site owner must confirm before launch.
 * Every value below is a clearly marked placeholder. Search this repo for
 * "FILL_ME" to find every place a placeholder is consumed.
 */

export const SITE_URL = "https://taxibahraintodammam.com";

export const BUSINESS = {
  legalName: "Taxi Bahrain to Dammam", // FILL_ME: confirm registered trade name
  brandName: "Taxi Bahrain to Dammam",
  founderName: "Fahed Irshad",
  founderExperienceYears: 15,
  phoneDisplay: "+973 3501 4335",
  phoneE164: "+97335014335",
  whatsappE164: "97335014335",
  email: "booking@taxibahraintodammam.com", // FILL_ME: confirm live inbox
  licenceNumber: "FILL_ME — Bahrain/Saudi transport licence number", // FILL_ME
  foundedYear: 2018, // FILL_ME: confirm year operations began
  addressLine: "FILL_ME — building/road/block number, Manama, Kingdom of Bahrain",
  addressLocality: "Manama",
  addressCountry: "BH",
  geo: {
    lat: 26.4437565,
    lng: 50.6530925,
  },
  hours: "24 hours a day, 7 days a week",
  sameAs: [
    // FILL_ME: add real social profile URLs, or remove the field entirely
  ] as string[],
} as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi, I'd like a fare quote for a taxi from Bahrain to Dammam.";

export function whatsappHref(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${BUSINESS.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function telHref(): string {
  return `tel:${BUSINESS.phoneE164}`;
}

export const CURRENCY = {
  primary: "BHD",
  secondary: "SAR",
} as const;

/**
 * Approximate BHD -> SAR conversion used only to render the secondary
 * currency figure alongside a BHD "starting from" fare.
 * FILL_ME: confirm the peg/rate the business wants to quote (fixed pegs are
 * BHD 1 = SAR ~9.94 at the standing USD pegs of both currencies).
 */
export const BHD_TO_SAR_RATE = 9.94;

export function sarFromBhd(bhd: number): number {
  return Math.round(bhd * BHD_TO_SAR_RATE);
}

export const FARE_DISCLAIMER =
  "Final fare depends on pickup point, timing and vehicle. Confirm on WhatsApp before departure.";

export const IMMIGRATION_DISCLAIMER =
  "Passengers are responsible for their own travel documents and complete their own immigration formalities at each border post. We do not guarantee entry decisions, visa outcomes, or flight connections.";
