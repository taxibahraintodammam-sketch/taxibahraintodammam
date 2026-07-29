import { notFound } from "next/navigation";
import { FLEET, getFleetVehicle } from "@/content/fleet";
import { getFleetVehicleAr } from "@/content/fleet.ar";
import { buildFleetMetadata } from "@/lib/fleet-metadata";
import { FleetDetailTemplate } from "@/components/fleet-page/FleetDetailTemplate";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return FLEET.map((vehicle) => ({ vehicle: vehicle.slug }));
}

function getContent(slug: string, locale: Locale) {
  return locale === "ar" ? getFleetVehicleAr(slug) : getFleetVehicle(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; vehicle: string }>;
}) {
  const { locale, vehicle: slug } = (await params) as { locale: Locale; vehicle: string };
  const vehicle = getContent(slug, locale);
  if (!vehicle) return {};
  return buildFleetMetadata(vehicle, locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; vehicle: string }>;
}) {
  const { locale, vehicle: slug } = (await params) as { locale: Locale; vehicle: string };
  const vehicle = getContent(slug, locale);
  if (!vehicle) notFound();
  return <FleetDetailTemplate vehicle={vehicle} locale={locale} />;
}
