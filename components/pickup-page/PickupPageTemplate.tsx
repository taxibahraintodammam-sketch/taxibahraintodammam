import Link from "next/link";
import type { PickupArea } from "@/content/pickup-areas";
import { ROUTE_FARES, fareWithSar } from "@/content/fares";
import { ROUTES } from "@/content/routes";
import { ROUTES_AR } from "@/content/routes.ar";
import { withSlash } from "@/lib/url";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { RelatedLinksSection } from "@/components/route-page/RelatedLinksSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary, fillTemplate, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export function PickupPageTemplate({
  area,
  locale = "en",
  dict = getDictionary(locale),
}: {
  area: PickupArea;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const prefix = locale === "ar" ? "/ar" : "";
  const heading = fillTemplate(dict.taxiPickupIn, { name: area.name });
  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: heading, path: `${prefix}/pickup/${area.slug}` },
  ];

  const routes = locale === "ar" ? ROUTES_AR : ROUTES;
  const dammamRoute = routes.find((r) => r.slug === "taxi-bahrain-to-dammam");
  const khobarRoute = routes.find((r) => r.slug === "taxi-bahrain-to-khobar");
  const dammamFare = ROUTE_FARES["taxi-bahrain-to-dammam"]?.[0];
  const khobarFare = ROUTE_FARES["taxi-bahrain-to-khobar"]?.[0];

  return (
    <>
      <SchemaScript
        data={serviceSchema({
          path: `${prefix}/pickup/${area.slug}`,
          name: `Taxi Pickup in ${area.name}`,
          description: area.metaDescription,
          serviceType: "Cross-border taxi pickup",
          areaServed: [area.name],
          minPriceBhd: dammamFare?.bhd ?? 22,
        })}
      />
      {area.faqs.length > 0 && <SchemaScript data={faqPageSchema(area.faqs)} />}
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="border-b border-ink/10 bg-white pb-16 pt-8 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-brass">{dict.pickupAreaEyebrow}</p>
            <h1 className="mt-3 text-[2rem] font-bold leading-tight text-ink lg:text-[2.75rem]">
              {heading}
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate lg:text-lg">{area.intro[0]}</p>
            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="eyebrow text-slate">{dict.typicalTimeToCauseway}</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-ink">
                {area.causewayTimeLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-[820px] px-5 lg:px-10">
          <div className="flex flex-col gap-4">
            {area.intro.slice(1).map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-ink/85">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-10">
            {area.sections.map((section) => (
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

      <section aria-label="Fares from this area" className="bg-white py-12">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">
            {fillTemplate(dict.popularRoutesFrom, { name: area.name })}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={withSlash(`${prefix}/taxi-bahrain-to-dammam`)}
              className="rounded-input border border-ink/10 px-4 py-2 text-sm font-medium text-sea hover:border-sea"
            >
              {dict.toLabel} {dammamRoute?.to} {dammamFare && `— BHD ${fareWithSar(dammamFare).bhd}`}
            </Link>
            <Link
              href={withSlash(`${prefix}/taxi-bahrain-to-khobar`)}
              className="rounded-input border border-ink/10 px-4 py-2 text-sm font-medium text-sea hover:border-sea"
            >
              {dict.toLabel} {khobarRoute?.to} {khobarFare && `— BHD ${fareWithSar(khobarFare).bhd}`}
            </Link>
            <Link
              href={withSlash(`${prefix}/fares`)}
              className="rounded-input border border-ink/10 px-4 py-2 text-sm font-medium text-sea hover:border-sea"
            >
              {dict.seeAllRoutes}
            </Link>
          </div>
        </div>
      </section>

      <RelatedLinksSection slugs={area.related} dict={dict} locale={locale} />

      {area.faqs.length > 0 && (
        <FaqSection
          faqs={area.faqs}
          heading={fillTemplate(dict.faqsForHeading, { name: heading })}
          dict={dict}
          locale={locale}
        />
      )}
      <CtaBand dict={dict} />
    </>
  );
}
