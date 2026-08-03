import { ROUTES } from "@/content/routes";
import { ROUTE_FARES, type VehicleClass } from "@/content/fares";

export type VehicleType =
    | "Mercedes S-Class"
    | "BMW 7 Series"
    | "GMC Yukon XL / Denali"
    | "Hyundai Staria VIP"
    | "Mercedes Sprinter"
    | "Toyota Hiace"
    | "Toyota Coaster"
    | "Toyota Camry"
    | "Hyundai Starex"
    | "Luxurious Bus";

export interface RoutePricing {
    [key: string]: { // key is vehicle name
        price: number;
    }
}

// This business's actual fleet vehicle names (VEHICLE_OPTIONS in
// admin/bookings) mapped to the fare-tier class published on the live rate
// cards (content/fares.ts), so the admin Pricing page can never drift from
// what customers are actually quoted on the site.
const VEHICLE_CLASS_MAP: Record<VehicleType, VehicleClass> = {
    "Toyota Camry": "sedan",
    "Hyundai Starex": "van",
    "Toyota Hiace": "van",
    "Mercedes Sprinter": "van",
    "GMC Yukon XL / Denali": "suv",
    "Hyundai Staria VIP": "suv",
    "Mercedes S-Class": "luxury",
    "BMW 7 Series": "luxury",
    "Toyota Coaster": "bus",
    "Luxurious Bus": "bus",
};

// Turns a real city/airport name (content/routes.ts "from"/"to" values) into
// a stable slug fragment — e.g. "Dammam Airport (DMM)" -> "dammam-airport".
function slugifyLocation(name: string): string {
    return name
        .toLowerCase()
        .replace(/\(.*?\)/g, "")
        .replace(/international/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function routeKeyFor(a: string, b: string): string {
    return [slugifyLocation(a), slugifyLocation(b)].sort().join("-");
}

// Every real pickup/destination name used across the live route pages —
// "Bahrain", "Dammam Airport (DMM)", "Al Ahsa / Hofuf", etc.
export const LOCATIONS: string[] = Array.from(
    new Set(ROUTES.flatMap((r) => [r.from, r.to]))
);

// Longest names first, so "Dammam Airport (DMM)" matches before the plain
// "Dammam" substring it contains.
const LOCATIONS_BY_LENGTH = [...LOCATIONS].sort((a, b) => b.length - a.length);

export function normalizeLocation(loc: string): string | null {
    if (!loc) return null;
    const lower = loc.toLowerCase();
    for (const city of LOCATIONS_BY_LENGTH) {
        if (lower.includes(city.toLowerCase())) {
            return city;
        }
    }
    return null;
}

// Built once from content/fares.ts — the same BHD figures shown on the
// public site's fare tables — keyed by real route (not the old
// Jeddah/Makkah/Madinah placeholder data from the template this project
// started from).
export const PRICING_RULES: { [route: string]: RoutePricing } = (() => {
    const rules: { [route: string]: RoutePricing } = {};
    for (const route of ROUTES) {
        const fares = ROUTE_FARES[route.slug];
        if (!fares) continue;
        const key = routeKeyFor(route.from, route.to);
        const vehicles: RoutePricing = rules[key] || {};
        for (const [vehicleName, vehicleClass] of Object.entries(VEHICLE_CLASS_MAP)) {
            const fare = fares.find((f) => f.vehicle === vehicleClass);
            if (fare) vehicles[vehicleName] = { price: fare.bhd };
        }
        rules[key] = vehicles;
    }
    return rules;
})();

// content/fares.ts prices are BHD (this business's real quoting currency —
// see content/business.ts CURRENCY.primary).
export const PRICING_CURRENCY = "BHD";

// Same key format used to build PRICING_RULES (and what's saved to/read from
// the Supabase pricing_rules table) — shared here so any caller resolving a
// custom saved price can match against it instead of re-deriving its own key.
export function getRouteKey(from: string, to: string): string | null {
    const loc1 = normalizeLocation(from);
    const loc2 = normalizeLocation(to);
    if (!loc1 || !loc2) return null;
    return routeKeyFor(loc1, loc2);
}

export function getPrice(from: string, to: string, vehicle: string, isRoundTrip: boolean = false): number | null {
    const routeKey = getRouteKey(from, to);
    if (!routeKey || !vehicle) return null;

    const rules = PRICING_RULES[routeKey];
    if (!rules) return null;

    // Find vehicle with flexible matching
    const vehicleKey = Object.keys(rules).find(key =>
        key.toLowerCase().includes(vehicle.toLowerCase()) ||
        vehicle.toLowerCase().includes(key.toLowerCase())
    );

    if (vehicleKey && rules[vehicleKey]) {
        const basePrice = rules[vehicleKey].price;
        return isRoundTrip ? basePrice * 2 : basePrice;
    }

    return null;
}
