export interface CityEntry {
  name: string;
}

// This site's real coverage area (Bahrain <-> Dammam/Khobar/Eastern Province)
// lives in content/routes.ts and content/pickup-areas.ts, which already power
// their own sitemap entries via app/sitemap.ts. This map is only consulted by
// the legacy /api/sitemaps/sitemap-locations route and stays empty until that
// route is repointed at this project's own location data.
export const cities: Record<string, CityEntry> = {};
