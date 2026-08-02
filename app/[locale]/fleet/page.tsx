import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, withSlash } from "@/lib/url";
import { FLEET } from "@/content/fleet";
import { FLEET_AR } from "@/content/fleet.ar";
import { breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const COPY: Record<
  Locale,
  { title: string; description: string; heading: string; body: string; passengers: string; luggage: string; bestFor: string }
> = {
  en: {
    title: "Our Fleet | Sedans, SUVs, Vans, Luxury & Coach | Bahrain–Saudi Arabia",
    description:
      "Choose your vehicle for the Bahrain–Saudi Arabia causeway crossing: sedan, SUV, van, luxury Mercedes S-Class, or 30-seat coaster bus. Fixed fares, licensed drivers.",
    heading: "A licensed vehicle for every party size",
    body: "Every vehicle in our fleet runs the same fixed-fare, tolls-included pricing across every route on the Bahrain–Saudi Arabia corridor. Choose by passenger count, luggage, and the standard of vehicle you want for the trip.",
    passengers: "Passengers",
    luggage: "Luggage",
    bestFor: "Best for",
  },
  ar: {
    title: "أسطولنا | سيدان، دفع رباعي، فان، فاخرة، وحافلة | البحرين–السعودية",
    description:
      "اختر مركبتك لعبور البحرين–السعودية: سيدان، دفع رباعي، فان، مرسيدس الفئة S الفاخرة، أو حافلة 30 مقعدًا. أسعار ثابتة، سائقون مرخّصون.",
    heading: "مركبة مرخّصة لكل حجم مجموعة",
    body: "تعمل كل مركبة في أسطولنا بنفس هيكل السعر الثابت الشامل للرسوم عبر كل خط على ممر البحرين–السعودية. اختر حسب عدد الركاب، والأمتعة، ومستوى المركبة الذي تريده للرحلة.",
    passengers: "الركاب",
    luggage: "الأمتعة",
    bestFor: "الأنسب لـ",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/fleet" : "/fleet";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/fleet"),
        "ar-BH": absoluteUrl("/ar/fleet"),
        "x-default": absoluteUrl("/fleet"),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_BH" : "en_BH",
      siteName: "Taxi Bahrain to Dammam",
      url: absoluteUrl(path),
      title: copy.title,
      description: copy.description,
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function FleetHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const fleet = locale === "ar" ? FLEET_AR : FLEET;

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: dict.fleetCrumb, path: `${prefix}/fleet` },
  ];

  return (
    <>
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="border-b border-ink/10 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <p className="eyebrow text-brass">{dict.fleetCrumb}</p>
          <h1 className="mt-3 max-w-2xl text-[2rem] font-bold leading-tight text-ink lg:text-[2.75rem]">
            {copy.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate lg:text-lg">{copy.body}</p>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={withSlash(`${prefix}/fleet/${vehicle.slug}`)}
                className="flex flex-col rounded-card border border-ink/10 bg-white p-6 shadow-elevation hover:border-brass"
              >
                <span className="text-lg font-semibold text-ink">{vehicle.name}</span>
                <span className="mt-2 text-sm text-slate">{vehicle.tagline}</span>
                <div className="mt-5 flex flex-col gap-1.5 border-t border-ink/10 pt-4 text-sm text-slate">
                  <span>
                    <strong className="text-ink">{copy.passengers}:</strong> {vehicle.passengers}
                  </span>
                  <span>
                    <strong className="text-ink">{copy.luggage}:</strong> {vehicle.luggage}
                  </span>
                  <span>
                    <strong className="text-ink">{copy.bestFor}:</strong> {vehicle.bestFor}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand dict={dict} />
    </>
  );
}
