import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog/mdx-components";
import type { Locale } from "@/lib/locale";

const POSTS_DIRS: Record<Locale, string> = {
  en: join(process.cwd(), "content", "posts"),
  ar: join(process.cwd(), "content", "posts-ar"),
};

export type PostFrontmatter = {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  heroKeyword: string;
  relatedRoutes: string[];
  relatedPosts: string[];
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

function readPostFile(slug: string, locale: Locale): string {
  return readFileSync(join(POSTS_DIRS[locale], `${slug}.mdx`), "utf8");
}

export function getPostSlugs(locale: Locale = "en"): string[] {
  return readdirSync(POSTS_DIRS[locale])
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPostsMeta(locale: Locale = "en"): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => {
      const raw = readPostFile(slug, locale);
      const { data, content } = matter(raw);
      const frontmatter = data as PostFrontmatter;
      return {
        ...frontmatter,
        slug,
        readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
      };
    })
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

export async function getCompiledPost(slug: string, locale: Locale = "en") {
  const raw = readPostFile(slug, locale);
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source: raw,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });
  const { data: rawData } = matter(raw);
  return {
    content,
    frontmatter,
    readingMinutes: Math.max(1, Math.round(readingTime(matter(raw).content).minutes)),
    rawData: rawData as PostFrontmatter,
  };
}
