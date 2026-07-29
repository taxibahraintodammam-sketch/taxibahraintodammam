import { getRoute } from "@/content/routes";
import { getRouteAr } from "@/content/routes.ar";
import { buildRouteMetadata } from "@/lib/route-metadata";
import { RoutePageTemplate } from "@/components/route-page/RoutePageTemplate";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

function getContent(locale: Locale) {
  return locale === "ar" ? getRouteAr("bahrain-airport-to-dammam-taxi")! : getRoute("bahrain-airport-to-dammam-taxi")!;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  return buildRouteMetadata(getContent(locale), locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  return <RoutePageTemplate route={getContent(locale)} locale={locale} />;
}
