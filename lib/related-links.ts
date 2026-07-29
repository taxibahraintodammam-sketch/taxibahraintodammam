import { ROUTES } from "@/content/routes";
import { ROUTES_AR } from "@/content/routes.ar";
import type { Locale } from "@/lib/locale";

const EXTRA_LABELS: Record<string, string> = {
  "king-fahd-causeway-taxi": "King Fahd Causeway Taxi Hub",
  "airport-transfers": "Airport Transfers",
  "corporate-accounts": "Corporate Accounts",
  "hourly-chauffeur-hire": "Hourly Chauffeur Hire",
  "family-van-transfer": "Family Van Transfer",
  "vip-luxury-transfer": "VIP Luxury Transfer",
  "wheelchair-accessible-transfer": "Wheelchair Accessible Transfer",
  "visa-u-turn-service": "Visa U-Turn Service",
  fares: "Fare Table",
  fleet: "Our Fleet",
  booking: "Book Now",
  about: "About Us",
  contact: "Contact",
};

const EXTRA_LABELS_AR: Record<string, string> = {
  "king-fahd-causeway-taxi": "مركز تاكسي جسر الملك فهد",
  "airport-transfers": "نقل المطار",
  "corporate-accounts": "الحسابات المؤسسية",
  "hourly-chauffeur-hire": "استئجار شوفير بالساعة",
  "family-van-transfer": "نقل فان عائلي",
  "vip-luxury-transfer": "نقل فاخر لكبار الشخصيات",
  "wheelchair-accessible-transfer": "نقل لذوي الاحتياجات الخاصة",
  "visa-u-turn-service": "خدمة الخروج والعودة (فيزا U-turn)",
  fares: "جدول الأسعار",
  fleet: "أسطولنا",
  booking: "احجز الآن",
  about: "من نحن",
  contact: "تواصل معنا",
};

export function resolveRelatedLink(
  slug: string,
  locale: Locale = "en",
): { label: string; href: string } {
  const routes = locale === "ar" ? ROUTES_AR : ROUTES;
  const route = routes.find((r) => r.slug === slug);
  const prefix = locale === "ar" ? "/ar" : "";

  if (route) {
    return { label: `${route.from} → ${route.to}`, href: `${prefix}/${slug}/` };
  }
  const labels = locale === "ar" ? EXTRA_LABELS_AR : EXTRA_LABELS;
  return { label: labels[slug] ?? slug, href: `${prefix}/${slug}/` };
}
