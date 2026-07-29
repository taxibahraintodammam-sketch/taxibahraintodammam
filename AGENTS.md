# taxibahraintodammam.com

Next.js 15 (App Router) + TypeScript + Tailwind v4. Pinned to `next@15.5.22`
deliberately (create-next-app defaults to Next 16; do not upgrade without
re-reading the whole build spec — trailingSlash, redirects, and the header
config in `next.config.ts` are load-bearing for SEO).

Key rules:
- Every internal href must end with `/` (`trailingSlash: true`). Use
  `withSlash()` / `absoluteUrl()` from `lib/url.ts`. Run
  `node scripts/check-slashes.mjs` before committing.
- Marketing pages are Server Components with `export const dynamic = "force-static"`.
  Only leaf interactive widgets (booking form, WhatsApp bar, mobile nav, FAQ
  accordion, fare calculator) are Client Components.
- Content lives in typed files under `content/`, not hardcoded in page files.
- Real business facts (phone, WhatsApp, licence number, address) are
  placeholders in `content/business.ts` marked `FILL_ME` until the owner
  supplies them.
