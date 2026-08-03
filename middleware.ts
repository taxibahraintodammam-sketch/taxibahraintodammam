import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * The root layout must know the locale at BUILD time (via the [locale]
 * dynamic segment's params), not at request time — every page on this site
 * is `force-static`, so it's pre-rendered once during `next build` and
 * served as-is afterwards. A per-request mechanism (reading a header set
 * here, or cookies()) never re-runs for already-built static HTML, so it
 * silently produces the same (English) shell for every page, Arabic
 * included. Routing everything through app/[locale]/** and rewriting the
 * public English URLs (no /en/ prefix) onto the internal /en/... segment
 * is what makes params.locale correct at build time for every static page.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/ar")) {
    return NextResponse.next();
  }

  // /admin, /api, /driver and /track-booking live outside app/[locale]/**
  // (booking backend, driver self-service portal, and the public per-booking
  // status lookup) and must never be rewritten onto /en/...
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/driver") ||
    pathname.startsWith("/track-booking") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
