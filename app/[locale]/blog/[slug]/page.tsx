import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostSlugs, getCompiledPost, getAllPostsMeta } from "@/lib/posts";
import { absoluteUrl } from "@/lib/url";
import { BlogPostBody } from "@/components/blog/BlogPostBody";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  if (!getPostSlugs(locale).includes(slug)) return {};
  const { rawData } = await getCompiledPost(slug, locale);
  const enPath = `/blog/${slug}`;
  const arPath = `/ar/blog/${slug}`;
  const path = locale === "ar" ? arPath : enPath;
  return {
    title: rawData.title,
    description: rawData.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl(enPath),
        "ar-BH": absoluteUrl(arPath),
        "x-default": absoluteUrl(enPath),
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "ar" ? "ar_BH" : "en_BH",
      siteName: "Taxi Bahrain to Dammam",
      url: absoluteUrl(path),
      title: rawData.title,
      description: rawData.description,
    },
    twitter: { card: "summary_large_image", title: rawData.title, description: rawData.description },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  if (!getPostSlugs(locale).includes(slug)) notFound();

  const { content, rawData, readingMinutes } = await getCompiledPost(slug, locale);
  const allPosts = getAllPostsMeta(locale);
  const relatedPosts = allPosts.filter((p) => rawData.relatedPosts?.includes(p.slug));

  return (
    <BlogPostBody
      slug={slug}
      rawData={rawData}
      content={content}
      readingMinutes={readingMinutes}
      relatedPosts={relatedPosts}
      locale={locale}
    />
  );
}
