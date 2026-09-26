import { Fragment, type ReactNode } from "react";
import type { RouteContent } from "@/content/routes";
import { lowestFare } from "@/content/fares";
import { tripSchema, serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { routeIntent, type RouteIntent } from "@/lib/route-intent";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RouteHero } from "@/components/route-page/RouteHero";
import { CausewayStrip } from "@/components/sections/CausewayStrip";
import { RouteFareSection } from "@/components/route-page/RouteFareSection";
import { RouteBody } from "@/components/route-page/RouteBody";
import { VehicleOptionsSection } from "@/components/route-page/VehicleOptionsSection";
import { PickupAreasSection } from "@/components/route-page/PickupAreasSection";
import { ArrivalFlow, DepartureModule, LongHaulPlan, IndustrialPlan } from "@/components/route-page/RouteModules";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedLinksSection } from "@/components/route-page/RelatedLinksSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary, fillTemplate, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

type Block =
  | "crossing"
  | "fare"
  | "body"
  | "vehicles"
  | "pickups"
  | "arrival"
  | "departure"
  | "longHaul"
  | "industrial";

/**
 * Section order per intent. Shared building blocks, but each kind of trip
 * leads with what that traveller needs first:
 * - core: the flagship corridor keeps the full picture, incl. the pickup-area index.
 * - city: short hops lead with price; no duplicate 12-area pickup grid.
 * - return: Saudi-side trips show the crossing in the right order, then fare.
 * - airportArrival / airportDeparture: the flight comes first.
 * - longHaul: planning the drive matters before price.
 * - industrial: fare, then the rotation/site practicalities.
 */
const LAYOUT: Record<RouteIntent, Block[]> = {
  core: ["crossing", "fare", "body", "vehicles", "pickups"],
  city: ["fare", "body", "crossing", "vehicles"],
  return: ["crossing", "fare", "body", "vehicles"],
  airportArrival: ["arrival", "fare", "crossing", "body", "vehicles"],
  airportDeparture: ["departure", "fare", "body", "crossing", "vehicles"],
  longHaul: ["longHaul", "fare", "body", "vehicles"],
  industrial: ["fare", "industrial", "body", "crossing", "vehicles"],
};

export function RoutePageTemplate({
  route,
  locale = "en",
  dict = getDictionary(locale),
}: {
  route: RouteContent;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const fare = lowestFare(route.slug);
  const prefix = locale === "ar" ? "/ar" : "";
  const intent = routeIntent(route.slug);

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: dict.causewayHubName, path: `${prefix}/king-fahd-causeway-taxi` },
    {
      name: fillTemplate(dict.taxiFromTo, { from: route.from, to: route.to }),
      path: `${prefix}/${route.slug}`,
    },
  ];

  const blocks: Record<Block, () => ReactNode> = {
    crossing: () => (
      <CausewayStrip
        fromLabel={`${dict.pickupPrefix} ${route.from}`}
        toLabel={`${dict.dropoffPrefix} ${route.to}`}
        heading={fillTemplate(dict.routeDurationHeading, {
          from: route.from,
          to: route.to,
          duration: route.durationLabel,
        })}
        locale={locale}
        reverse={route.fromCountry === "Saudi Arabia"}
      />
    ),
    fare: () => <RouteFareSection route={route} dict={dict} locale={locale} />,
    body: () => <RouteBody route={route} />,
    vehicles: () => <VehicleOptionsSection vehicles={route.vehicles} dict={dict} locale={locale} />,
    pickups: () => (
      <PickupAreasSection areas={route.pickupAreas} fromLabel={route.from} dict={dict} locale={locale} />
    ),
    arrival: () => <ArrivalFlow locale={locale} />,
    departure: () => <DepartureModule locale={locale} />,
    longHaul: () => <LongHaulPlan route={route} locale={locale} />,
    industrial: () => <IndustrialPlan locale={locale} />,
  };

  return (
    <>
      <SchemaScript
        data={tripSchema({
          path: `${prefix}/${route.slug}`,
          name: `Taxi from ${route.from} to ${route.to}`,
          fromName: route.from,
          toName: route.to,
          minPriceBhd: fare?.bhd ?? 0,
        })}
      />
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${route.slug}`,
          name: `Taxi from ${route.from} to ${route.to}`,
          description: route.metaDescription,
          serviceType: "Cross-border taxi transfer",
          areaServed: [route.from, route.to],
          minPriceBhd: fare?.bhd ?? 0,
        })}
      />
      {route.faqs.length > 0 && <SchemaScript data={faqPageSchema(route.faqs)} />}
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <RouteHero route={route} dict={dict} locale={locale} />
      {LAYOUT[intent].map((block) => (
        <Fragment key={block}>{blocks[block]()}</Fragment>
      ))}
      {route.faqs.length > 0 && (
        <FaqSection
          faqs={route.faqs}
          heading={fillTemplate(dict.faqsForHeading, {
            name: `${route.from} → ${route.to}`,
          })}
          dict={dict}
          locale={locale}
        />
      )}
      <RelatedLinksSection slugs={route.related} dict={dict} locale={locale} />
      <CtaBand dict={dict} />
    </>
  );
}
