/**
 * What a visitor to each route page is actually trying to do. The route
 * template uses this to choose its section order and intent-specific module,
 * so routes with different purposes don't render as the same page with a
 * different city name.
 */
export type RouteIntent =
  | "core" // the flagship corridor run
  | "city" // short Eastern Province city trips
  | "return" // Saudi → Bahrain
  | "airportArrival" // landing, then crossing
  | "airportDeparture" // crossing to catch a flight
  | "longHaul" // multi-hour trips inland
  | "industrial"; // rotation / site travel up the coast

const INTENTS: Record<string, RouteIntent> = {
  "taxi-bahrain-to-dammam": "core",
  "taxi-bahrain-to-khobar": "city",
  "taxi-bahrain-to-qatif": "city",
  "taxi-dammam-to-bahrain": "return",
  "taxi-khobar-to-bahrain": "return",
  "bahrain-airport-to-dammam-taxi": "airportArrival",
  "dammam-airport-to-bahrain-taxi": "airportArrival",
  "bahrain-to-dammam-airport-taxi": "airportDeparture",
  "taxi-bahrain-to-riyadh": "longHaul",
  "taxi-bahrain-to-al-ahsa-hofuf": "longHaul",
  "taxi-bahrain-to-ras-tanura": "industrial",
  "taxi-bahrain-to-abqaiq": "industrial",
  // English Jubail has its own bespoke page; this governs the Arabic one.
  "taxi-bahrain-to-jubail": "industrial",
};

export function routeIntent(slug: string): RouteIntent {
  return INTENTS[slug] ?? "city";
}
