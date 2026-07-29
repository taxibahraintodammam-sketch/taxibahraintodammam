import { SITE_URL } from "@/content/business";

/**
 * Every internal href on this site must end with a trailing slash
 * (see next.config.ts trailingSlash: true). Route every internal
 * <Link href> and canonical/schema URL through this helper so the
 * rule can never silently regress.
 */
export function withSlash(path: string): string {
  if (path === "") return "/";
  // Leave protocol-relative / external / non-path hrefs untouched.
  if (
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//")
  ) {
    return path;
  }

  const [pathAndSlash, hash] = path.split("#");
  const [pathname, query] = pathAndSlash.split("?");

  const withTrailing = pathname.endsWith("/") ? pathname : `${pathname}/`;

  let result = withTrailing;
  if (query) result += `?${query}`;
  if (hash) result += `#${hash}`;
  return result;
}

/** Absolute canonical URL for metadata/schema, always with a trailing slash. */
export function absoluteUrl(path: string): string {
  const relative = withSlash(path.startsWith("/") ? path : `/${path}`);
  return `${SITE_URL}${relative}`;
}

export function localizedPath(path: string, locale: "en" | "ar"): string {
  const clean = withSlash(path);
  if (locale === "en") return clean;
  return withSlash(`/ar${clean}`);
}
