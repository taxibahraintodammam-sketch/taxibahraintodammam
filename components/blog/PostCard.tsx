import Link from "next/link";
import { withSlash } from "@/lib/url";
import type { PostMeta } from "@/lib/posts";
import type { Locale } from "@/lib/locale";

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post, locale = "en" }: { post: PostMeta; locale?: Locale }) {
  const prefix = locale === "ar" ? "/ar" : "";
  return (
    <Link
      href={withSlash(`${prefix}/blog/${post.slug}`)}
      className="flex flex-col rounded-card border border-ink/10 bg-white p-6 shadow-elevation hover:border-brass"
    >
      <span className="eyebrow text-sea">{formatDate(post.datePublished, locale)}</span>
      <h2 className="mt-2 text-lg font-bold text-ink">{post.title}</h2>
      <p className="mt-2 text-sm text-slate">{post.description}</p>
      <span className="mt-4 text-xs text-slate">
        {locale === "ar" ? `${post.readingMinutes} دقيقة قراءة` : `${post.readingMinutes} min read`}
      </span>
    </Link>
  );
}
