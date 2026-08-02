import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, withSlash } from "@/lib/url";
import { ROUTES } from "@/content/routes";
import { ROUTES_AR } from "@/content/routes.ar";
import {
  ROUTE_FARES,
  VEHICLE_LABEL,
  VEHICLE_LABEL_AR,
  fareWithSar,
} from "@/content/fares";
import { getDictionary } from "@/content/dictionary";
import { breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const COPY: Record<Locale, { title: string; description: string; eyebrow: string; heading: string; body: string; viewDetails: string }> = {
  en: {
    title: "Fare Table | All Routes, All Vehicles | Bahrain–Saudi Arabia",
    description:
      "Every route and vehicle class between Bahrain and Saudi Arabia, one fixed fare table. Tolls included, quoted in BHD and SAR. Confirm your fare on WhatsApp.",
    eyebrow: "Fares",
    heading: "Every route, every vehicle, one fixed fare table",
    body: "All fares below are starting prices, all-inclusive with the causeway toll built in. Your exact fare is confirmed on WhatsApp against your real pickup point, date, and vehicle before you travel.",
    viewDetails: "View route details →",
  },
  ar: {
    title: "جدول الأسعار | كل الخطوط، كل المركبات | البحرين–السعودية",
    description:
      "كل خط ومركبة بين البحرين والسعودية في جدول أسعار ثابت واحد. الرسوم مشمولة، بالدينار والريال. أكّد سعرك عبر واتساب.",
    eyebrow: "الأسعار",
    heading: "كل خط، كل مركبة، جدول سعر ثابت واحد",
    body: "كل الأسعار أدناه هي أسعار ابتدائية شاملة برسوم الجسر. يُؤكَّد سعرك الدقيق عبر واتساب وفق نقطة استلامك الفعلية وتاريخك ومركبتك قبل السفر.",
    viewDetails: "عرض تفاصيل الخط ←",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/fares" : "/fares";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/fares"),
        "ar-BH": absoluteUrl("/ar/fares"),
        "x-default": absoluteUrl("/fares"),
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

export default async function FaresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const routes = locale === "ar" ? ROUTES_AR : ROUTES;
  const vehicleLabel = locale === "ar" ? VEHICLE_LABEL_AR : VEHICLE_LABEL;

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: copy.eyebrow, path: `${prefix}/fares` },
  ];

  return (
    <>
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="border-b border-ink/10 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <p className="eyebrow text-brass">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-[2rem] font-bold leading-tight text-ink lg:text-[2.75rem]">
            {copy.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate lg:text-lg">{copy.body}</p>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <div className="flex flex-col gap-8">
            {routes.map((route) => {
              const fares = (ROUTE_FARES[route.slug] ?? []).map(fareWithSar);
              if (fares.length === 0) return null;
              return (
                <div key={route.slug} className="rounded-card border border-ink/10 bg-white p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-bold text-ink">
                      {route.from} ⇄ {route.to}
                    </h2>
                    <Link
                      href={withSlash(`${prefix}/${route.slug}`)}
                      className="text-sm font-semibold text-sea hover:underline"
                    >
                      {copy.viewDetails}
                    </Link>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[420px] border-collapse text-start text-sm">
                      <thead>
                        <tr className="border-b border-ink/10 text-slate">
                          <th className="py-2 pe-4 font-medium">{dict.vehicleHeader}</th>
                          <th className="py-2 font-medium">{dict.startingFareHeader}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fares.map((fare) => (
                          <tr key={fare.vehicle} className="border-b border-ink/5 last:border-0">
                            <td className="py-2 pe-4 text-ink">{vehicleLabel[fare.vehicle]}</td>
                            <td className="py-2 font-[family-name:var(--font-display)] font-bold text-ink">
                              BHD {fare.bhd}{" "}
                              <span className="font-normal text-slate">/ SAR {fare.sar}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-slate">{dict.fareDisclaimer}</p>
        </div>
      </section>

      <CtaBand dict={dict} />
    </>
  );
}
