import type { ReactNode } from "react";
import Link from "next/link";
import { withSlash } from "@/lib/url";
import { resolveRelatedLink } from "@/lib/related-links";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { BUSINESS } from "@/content/business";
import { getDictionary, fillTemplate, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";
import type { PostFrontmatter, PostMeta } from "@/lib/posts";

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogPostBody({
  slug,
  rawData,
  content,
  readingMinutes,
  relatedPosts,
  locale = "en",
  dict = getDictionary(locale),
}: {
  slug: string;
  rawData: PostFrontmatter;
  content: ReactNode;
  readingMinutes: number;
  relatedPosts: PostMeta[];
  locale?: Locale;
  dict?: Dictionary;
}) {
  const prefix = locale === "ar" ? "/ar" : "";
  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: locale === "ar" ? "المدونة" : "Blog", path: `${prefix}/blog` },
    { name: rawData.title, path: `${prefix}/blog/${slug}` },
  ];

  return (
    <>
      <SchemaScript
        data={articleSchema({
          path: `${prefix}/blog/${slug}`,
          headline: rawData.title,
          description: rawData.description,
          datePublished: rawData.datePublished,
          dateModified: rawData.dateModified,
          image: "/opengraph-image",
        })}
      />
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <article className="bg-sand py-14 lg:py-20">
        <div className="mx-auto max-w-[720px] px-5 lg:px-10">
          <p className="eyebrow text-sea">{dict.guideEyebrow}</p>
          <h1 className="mt-3 text-[1.75rem] font-bold leading-tight text-ink lg:text-[2.5rem]">
            {rawData.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 border-b border-ink/10 pb-6 text-sm text-slate">
            <span>
              {dict.byAuthorPrefix} {rawData.author}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {dict.publishedPrefix} {formatDate(rawData.datePublished, locale)}
            </span>
            {rawData.dateModified !== rawData.datePublished && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {dict.updatedPrefix} {formatDate(rawData.dateModified, locale)}
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>
              {readingMinutes} {dict.minReadSuffix}
            </span>
          </div>

          <div className="mt-2">{content}</div>

          <div className="mt-12 rounded-card border border-ink/10 bg-white p-6">
            <p className="eyebrow text-sea">{dict.writtenByLabel}</p>
            <p className="mt-2 font-semibold text-ink">{rawData.author}</p>
            <p className="mt-2 text-sm text-slate">
              {fillTemplate(dict.editorialTeamBlurb, { brand: BUSINESS.brandName })}
            </p>
          </div>

          {rawData.relatedRoutes?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">
                {dict.relatedRoutesServicesHeading}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-3">
                {rawData.relatedRoutes.map((routeSlug) => {
                  const { label, href } = resolveRelatedLink(routeSlug, locale);
                  return (
                    <li key={routeSlug}>
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
          )}

          {relatedPosts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">
                {dict.relatedGuidesHeading}
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {relatedPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={withSlash(`${prefix}/blog/${post.slug}`)}
                      className="font-medium text-sea hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <CtaBand dict={dict} />
    </>
  );
}
