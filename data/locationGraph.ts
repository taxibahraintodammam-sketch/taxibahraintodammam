export interface RelatedLink {
  name: string;
  url: string;
  description: string;
}

// Not wired into any page on this site yet (see components/seo/RelatedLocations.tsx).
// Returns no links until this project's own location graph is defined.
export function getRelatedLocationLinks(_currentCity: string, _citySlug?: string): RelatedLink[] {
  return [];
}
