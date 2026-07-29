import { getService } from "@/content/services";
import { getServiceAr } from "@/content/services.ar";
import { buildServiceMetadata } from "@/lib/service-metadata";
import { ServicePageTemplate } from "@/components/service-page/ServicePageTemplate";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

function getContent(locale: Locale) {
  return locale === "ar" ? getServiceAr("visa-u-turn-service")! : getService("visa-u-turn-service")!;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  return buildServiceMetadata(getContent(locale), locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  return <ServicePageTemplate service={getContent(locale)} locale={locale} />;
}
