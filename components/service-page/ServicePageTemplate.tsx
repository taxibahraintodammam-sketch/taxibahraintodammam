import type { ServiceContent } from "@/content/services";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { ServiceBody } from "@/components/service-page/ServiceBody";
import { VehicleOptionsSection } from "@/components/route-page/VehicleOptionsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedLinksSection } from "@/components/route-page/RelatedLinksSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary, fillTemplate, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export function ServicePageTemplate({
  service,
  locale = "en",
  dict = getDictionary(locale),
}: {
  service: ServiceContent;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const prefix = locale === "ar" ? "/ar" : "";
  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: service.name, path: `${prefix}/${service.slug}` },
  ];

  return (
    <>
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/${service.slug}`,
          name: service.name,
          description: service.metaDescription,
          serviceType: service.name,
          areaServed: ["Bahrain", "Saudi Arabia"],
          minPriceBhd: service.minPriceBhd,
        })}
      />
      {service.faqs.length > 0 && <SchemaScript data={faqPageSchema(service.faqs)} />}
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />
      <ServiceHero service={service} dict={dict} />
      <ServiceBody service={service} dict={dict} />
      <VehicleOptionsSection vehicles={service.vehicles} dict={dict} locale={locale} />
      {service.faqs.length > 0 && (
        <FaqSection
          faqs={service.faqs}
          heading={fillTemplate(dict.faqsForHeading, { name: service.name })}
          dict={dict}
          locale={locale}
        />
      )}
      <RelatedLinksSection slugs={service.related} dict={dict} locale={locale} />
      <CtaBand dict={dict} />
    </>
  );
}
