import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/url";
import { getAllPostsMeta } from "@/lib/posts";
import { breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

const COPY: Record<Locale, { title: string; description: string; heading: string; body: string; eyebrow: string }> = {
  en: {
    title: "Blog | Causeway Guides, Border Tips & Bahrain–Saudi Travel",
    description:
      "Guides on crossing the King Fahd Causeway, required documents, timing, costs, and travel between Bahrain and Saudi Arabia's Eastern Province.",
    eyebrow: "Blog",
    heading: "Guides for the Bahrain–Saudi Arabia crossing",
    body: "Practical, specific guides on the King Fahd Causeway crossing — documents, timing, cost, and what to expect on both sides of the border.",
  },
  ar: {
    title: "المدونة | أدلة الجسر ونصائح الحدود والسفر بين البحرين والسعودية",
    description:
      "أدلة حول عبور جسر الملك فهد، والمستندات المطلوبة، والتوقيت، والتكلفة، والسفر بين البحرين والمنطقة الشرقية السعودية.",
    eyebrow: "المدونة",
    heading: "أدلة لعبور البحرين–السعودية",
    body: "أدلة عملية ومحددة حول عبور جسر الملك فهد — المستندات، والتوقيت، والتكلفة، وما تتوقعه على جانبي الحدود.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const path = locale === "ar" ? "/ar/blog" : "/blog";
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-BH": absoluteUrl("/blog"),
        "ar-BH": absoluteUrl("/ar/blog"),
        "x-default": absoluteUrl("/blog"),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_BH" : "en_BH",
      siteName: "Taxi Bahrain to Dammam",
      url: absoluteUrl(path),
      title: copy.title,
      description: copy.description,
    },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const copy = COPY[locale];
  const dict = getDictionary(locale);
  const prefix = locale === "ar" ? "/ar" : "";
  const posts = getAllPostsMeta(locale);

  const breadcrumbItems = [
    { name: dict.homeCrumb, path: `${prefix}/` },
    { name: copy.eyebrow, path: `${prefix}/blog` },
  ];

  return (
    <>
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="border-b border-ink/10 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <p className="eyebrow text-brass">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-[2rem] font-bold leading-tight text-ink lg:text-[2.75rem]">
            {copy.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate lg:text-lg">{copy.body}</p>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
