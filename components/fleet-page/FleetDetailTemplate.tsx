import Link from "next/link";
import type { FleetVehicle } from "@/content/fleet";
import { minFareForVehicleClass } from "@/content/fares";
import { resolveRelatedLink } from "@/lib/related-links";
import { withSlash } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary, fillTemplate, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export function FleetDetailTemplate({
  vehicle,
  locale = "en",
  dict = getDictionary(locale),
}: {
  vehicle: FleetVehicle;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const prefix = locale === "ar" ? "/ar" : "";
  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: dict.fleetCrumb, path: `${prefix}/fleet` },
    { name: vehicle.name, path: `${prefix}/fleet/${vehicle.slug}` },
  ];

  return (
    <>
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/fleet/${vehicle.slug}`,
          name: vehicle.name,
          description: vehicle.metaDescription,
          serviceType: "Vehicle hire",
          areaServed: ["Bahrain", "Saudi Arabia"],
          minPriceBhd: minFareForVehicleClass(vehicle.vehicle) ?? 0,
        })}
      />
      {vehicle.faqs.length > 0 && <SchemaScript data={faqPageSchema(vehicle.faqs)} />}
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="border-b border-ink/10 bg-white pb-16 pt-8 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-brass">{dict.fleetEyebrow}</p>
            <h1 className="mt-3 text-[2rem] font-bold leading-tight text-ink lg:text-[2.75rem]">
              {vehicle.name}
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate lg:text-lg">{vehicle.intro[0]}</p>
            <dl className="mt-8 grid grid-cols-2 gap-3 border-t border-ink/10 pt-6 sm:gap-6">
              <div className="min-w-0">
                <dt className="truncate text-[10px] font-bold uppercase tracking-wide text-slate">
                  {dict.passengersLabel}
                </dt>
                <dd className="mt-1 truncate text-lg font-bold text-ink">{vehicle.passengers}</dd>
              </div>
              <div className="min-w-0">
                <dt className="truncate text-[10px] font-bold uppercase tracking-wide text-slate">
                  {dict.luggageLabel}
                </dt>
                <dd className="mt-1 truncate text-lg font-bold text-ink">{vehicle.luggage}</dd>
              </div>
            </dl>
          </div>
          <div className="flex items-center">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-[820px] px-5 lg:px-10">
          <div className="flex flex-col gap-4">
            {vehicle.intro.slice(1).map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-ink/85">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-10">
            {vehicle.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-ink lg:text-2xl">{section.heading}</h2>
                <div className="mt-3 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base leading-relaxed text-ink/85">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Commonly booked with this vehicle" className="bg-white py-12">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">
            {dict.commonlyBookedFor}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {vehicle.commonRoutes.map((slug) => {
              const { label, href } = resolveRelatedLink(slug, locale);
              return (
                <li key={slug}>
                  <Link
                    href={withSlash(href)}
                    className="rounded-input border border-ink/10 px-4 py-2 text-sm font-medium text-sea hover:border-sea"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {vehicle.faqs.length > 0 && (
        <FaqSection
          faqs={vehicle.faqs}
          heading={fillTemplate(dict.faqsForHeading, { name: vehicle.name })}
          dict={dict}
          locale={locale}
        />
      )}
      <CtaBand dict={dict} />
    </>
  );
}
