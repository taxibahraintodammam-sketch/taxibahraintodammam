import Link from "next/link";
import { ROUTES } from "@/content/routes";
import { ROUTES_AR } from "@/content/routes.ar";
import { lowestFare, fareWithSar } from "@/content/fares";
import { withSlash } from "@/lib/url";
import type { Locale } from "@/lib/locale";

export function RouteCardGrid({
  locale = "en",
  heading,
}: {
  locale?: Locale;
  heading?: string;
}) {
  const routes = locale === "ar" ? ROUTES_AR : ROUTES;
  const pathPrefix = locale === "ar" ? "/ar" : "";
  const defaultHeading =
    locale === "ar"
      ? "كل خطوط الممر بين البحرين والمنطقة الشرقية"
      : "Every corridor run between Bahrain and the Eastern Province";

  return (
    <section aria-label="Popular routes" className="bg-sand py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-sea">{locale === "ar" ? "الخطوط" : "Routes"}</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-bold text-ink lg:text-3xl">
          {heading ?? defaultHeading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => {
            const fare = lowestFare(route.slug);
            const withSar = fare ? fareWithSar(fare) : undefined;
            return (
              <Link
                key={route.slug}
                href={withSlash(`${pathPrefix}/${route.slug}`)}
                className="flex flex-col rounded-card border border-ink/10 bg-white p-5 shadow-elevation transition hover:border-brass"
              >
                <span dir="ltr" className="inline-block text-base font-semibold text-ink">
                  {route.from} → {route.to}
                </span>
                <span className="mt-1 text-sm text-slate">{route.shortBlurb}</span>
                <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
                  <span className="eyebrow text-slate">{route.durationLabel}</span>
                  {withSar && (
                    <span className="font-[family-name:var(--font-display)] text-sm font-bold text-ink">
                      {locale === "ar" ? "ابتداءً من" : "from"} BHD {withSar.bhd} / SAR {withSar.sar}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
