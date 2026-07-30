export interface RelatedRouteLink {
  name: string;
  url: string;
  description: string;
}

// Not wired into any page on this site yet (see components/seo/RelatedRoutes.tsx).
// This project's own cross-linking between routes lives in lib/related-links.ts.
export function getRelatedRoutes(_originSlug: string, _currentSlug: string): RelatedRouteLink[] {
  return [];
}
