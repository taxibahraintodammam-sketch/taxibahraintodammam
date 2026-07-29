import { notFound } from "next/navigation";
import { PICKUP_AREAS, getPickupArea } from "@/content/pickup-areas";
import { getPickupAreaAr } from "@/content/pickup-areas.ar";
import { buildPickupMetadata } from "@/lib/pickup-metadata";
import { PickupPageTemplate } from "@/components/pickup-page/PickupPageTemplate";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return PICKUP_AREAS.map((area) => ({ area: area.slug }));
}

function getContent(slug: string, locale: Locale) {
  return locale === "ar" ? getPickupAreaAr(slug) : getPickupArea(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; area: string }>;
}) {
  const { locale, area: slug } = (await params) as { locale: Locale; area: string };
  const area = getContent(slug, locale);
  if (!area) return {};
  return buildPickupMetadata(area, locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; area: string }>;
}) {
  const { locale, area: slug } = (await params) as { locale: Locale; area: string };
  const area = getContent(slug, locale);
  if (!area) notFound();
  return <PickupPageTemplate area={area} locale={locale} />;
}
