import type { RouteContent } from "@/content/routes";
import { lowestFare } from "@/content/fares";
import { tripSchema, serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RouteHero } from "@/components/route-page/RouteHero";
import { CausewayStrip } from "@/components/sections/CausewayStrip";
import { RouteFareSection } from "@/components/route-page/RouteFareSection";
import { RouteBody } from "@/components/route-page/RouteBody";
import { VehicleOptionsSection } from "@/components/route-page/VehicleOptionsSection";
import { PickupAreasSection } from "@/components/route-page/PickupAreasSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedLinksSection } from "@/components/route-page/RelatedLinksSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary, fillTemplate, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

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

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: dict.causewayHubName, path: `${prefix}/king-fahd-causeway-taxi` },
    {
      name: fillTemplate(dict.taxiFromTo, { from: route.from, to: route.to }),
      path: `${prefix}/${route.slug}`,
    },
  ];

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
      <CausewayStrip
        fromLabel={`${dict.pickupPrefix} ${route.from}`}
        toLabel={`${dict.dropoffPrefix} ${route.to}`}
        heading={fillTemplate(dict.routeDurationHeading, {
          from: route.from,
          to: route.to,
          duration: route.durationLabel,
        })}
        locale={locale}
      />
      <RouteFareSection route={route} dict={dict} locale={locale} />
      <RouteBody route={route} />
      <VehicleOptionsSection vehicles={route.vehicles} dict={dict} locale={locale} />
      <PickupAreasSection
        areas={route.pickupAreas}
        fromLabel={route.from}
        dict={dict}
        locale={locale}
      />
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
