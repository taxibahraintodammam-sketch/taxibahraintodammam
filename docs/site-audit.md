# Site audit: programmatic patterns, UX and trust

Audit date: 2026-09-26. Scope: every page under `app/[locale]/**` (EN + AR), the
content files in `content/`, and the shared templates in `components/`.

## How the site is built

| Template | Pages | Notes |
|---|---|---|
| `RoutePageTemplate` | 12 route pages + Arabic Jubail | Was one fixed section order for every route. Now intent-driven (see below). |
| `ServicePageTemplate` | 7 service pages | Hero + generic quote form + prose body + vehicle cards + FAQ + related + CTA. |
| `PickupPageTemplate` | 12 `/pickup/*` pages | Same layout for all 12. |
| `FleetDetailTemplate` | 5 `/fleet/*` pages | Same layout, no vehicle photography. |
| Bespoke | Home, Jubail (EN), Dhahran, Causeway hub, Fares, Fleet index, Booking, Contact, About, FAQs, Reviews, Blog | |

## What the measurements showed

- **Copy is not spun.** After swapping city names, almost no sentences are
  shared between route pages (0–6 of ~25–39 per page), so each page's text was
  written individually.
- **The architecture was the factory pattern.** All 12 template route pages
  rendered the same section sequence. 12 of 13 routes carry a "What's Included
  and What Isn't" section, 11 carry "Documents and Border Process" and 11 carry
  "Choosing Your Vehicle". The facts in those sections are site-wide policy
  restated in different words on every page.
- **The homepage linked every route as an identical card** (13 cards), which
  reads as a directory of keyword pages.

## Categories

**A. Strong, unique, useful.** Keep them as they are.
- Jubail (EN, bespoke), Dhahran (EN + AR, bespoke), King Fahd Causeway hub,
  Fares, Booking, Contact, FAQs, blog guides (documents, U-turn, crossing
  times, DMM terminal guide, cost explainer).

**B. Useful but too templated.** Improved in this pass; see the next phase for the rest.
- Routes: Bahrain→Dammam, Dammam→Bahrain, Khobar, Khobar→Bahrain, Qatif,
  Riyadh, Al Ahsa/Hofuf, Ras Tanura, Abqaiq, BAH→Dammam, Bahrain→DMM,
  DMM→Bahrain.
- Services: Airport Transfers, Corporate Accounts, Hourly Chauffeur, Family
  Van, VIP Luxury, Wheelchair Accessible, Visa U-Turn.

**C. Thin or repetitive.**
- Pickup pages: 213–317 words each. 11 of 12 use a "Landmarks we collect
  from" section with the same shape. Isa Town, Hamad Town, Sitra, Budaiya and
  Adliya (213–244 words) have the least to say that differs from "we pick up
  anywhere in Bahrain".

**D. Near-duplicate intent.** These are recommendations only; nothing was changed.
- `/pickup/bahrain-airport/`, `/bahrain-airport-to-dammam-taxi/` and
  `/airport-transfers/` all answer "I'm landing at BAH". Recommendation: keep
  the route page as the answer, and make the pickup page a short pointer to
  it, or 301 it after checking its traffic in Search Console.
- `/taxi-khobar-to-bahrain/` vs `/taxi-dammam-to-bahrain/`: same return
  journey from neighbouring cities. Both are legitimate searches; keep both,
  but don't expand them further with generic copy.

**E. Administrative / legal.** Privacy, Terms, Cancellation & Refund. These are fine.

**F. Needs major UX redesign (next phases).**
- Fleet detail pages: no real vehicle photos, and all five share one layout.
- Pickup pages: see C.
- Service pages: the body is still prose. This pass added a service-specific
  flow, but the hero and generic quote form are still shared.

## Changes made in this pass

1. **Route pages are intent-driven** (`lib/route-intent.ts`,
   `RoutePageTemplate`). Each intent has its own section order and module:
   - *airportArrival* (BAH→Dammam, DMM→Bahrain): the flight-tracking arrival
     sequence comes first.
   - *airportDeparture* (Bahrain→DMM): a pickup-time planner that works back
     from the flight time, using the page's own guidance (2.5–3 h at the
     terminal plus an 80–100 min drive).
   - *longHaul* (Riyadh, Al Ahsa): a planning sheet with departure time, rest
     stops, vehicle and return, all taken from those pages' own content.
   - *industrial* (Ras Tanura, Abqaiq, AR Jubail): rotation dates, compound
     drop-off, the site-access caveat and the corporate account.
   - *city* / *return*: lead with price. The 12-link Bahrain pickup grid now
     appears only on the flagship Bahrain→Dammam page instead of 9 pages.
2. **Bug fix:** the causeway diagram showed Bahrain immigration first on
   Saudi→Bahrain trips. It now reverses (`CausewayStrip reverse`).
3. **Bug fix:** fare tables on every route page and the homepage pushed the
   price column off-screen on phones. Capacity now folds under the vehicle
   name, so the price is always visible.
4. **Homepage:** the 13 identical route cards are replaced by `HomeRoutes`: a
   featured Bahrain ⇄ Dammam block plus routes grouped by purpose (flights,
   Eastern Province, work/rotation, long journeys). The full index stays on
   the Causeway hub, where it belongs.
5. **Service pages:** each service has its own flow (`content/service-flows.ts`),
   drawn either as a sequence (airport, U-turn, corporate, hourly) or as a
   checklist (family van, VIP, wheelchair), in EN + AR.
6. **Wheelchair page** no longer shows the standard van card. The page's own
   copy says the accessible vehicle is a different specification.

## Trust issues the owner must resolve

These can't be fixed in code without inventing facts:

- `content/business.ts` still has `FILL_ME` for the licence number, street
  address, legal trade name and founding year. Meanwhile the header, trust
  strip and FAQ state "Licensed cross-border operator". Either publish the
  licence number or soften the claim.
- `content/fares.ts` says the fares are benchmarked from competitors and
  "the owner should still confirm each figure". Confirm them before relying on
  them in ads.
- Imagery: the only photos are two hero slides, and `hero-slides.ts` shows
  they were AI-generated (a sedan on the causeway, a chauffeur with an SUV).
  They're used on the homepage and the Jubail hero. Replace them with real
  photos of your vehicles and drivers as soon as possible. Real fleet photos
  would be the single biggest trust upgrade to the fleet pages.
- Reviews: `/reviews/` loads from the database. It wasn't audited for content.

## Recommended next phases (not done)

1. **Consolidate the repeated policy sections.** Replace the per-route prose
   "What's Included" and "Documents" sections with one compact shared panel,
   and keep only the route-specific exceptions (e.g. compound access, flight
   tickets). This needs a coordinated EN + AR content edit.
2. **Global mobile WhatsApp button:** `StickyActionBar` always sends the
   Bahrain→Dammam message, even on Riyadh or Jubail pages. Make it
   route-aware.
3. **Bespoke pages for the flagship:** Bahrain→Dammam deserves the same
   treatment Jubail and Dhahran got.
4. **Pickup pages:** trim the five thinnest to concise pickup notes (hotel
   access, typical passengers) rather than padding them. Decide on
   `/pickup/bahrain-airport/` (see D).
5. **Fleet pages:** a decision-first layout (who it suits, what fits, what
   doesn't) once real photos exist.
