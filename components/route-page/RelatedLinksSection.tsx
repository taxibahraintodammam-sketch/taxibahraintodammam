import Link from "next/link";
import { resolveRelatedLink } from "@/lib/related-links";
import { withSlash } from "@/lib/url";
import { getDictionary, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export function RelatedLinksSection({
  slugs,
  dict = getDictionary("en"),
  locale = "en",
}: {
  slugs: string[];
  dict?: Dictionary;
  locale?: Locale;
}) {
  if (slugs.length === 0) return null;

  return (
    <section aria-label="Related routes and services" className="bg-white py-12">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">
          {dict.youMightAlsoNeed}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {slugs.map((slug) => {
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
  );
}
