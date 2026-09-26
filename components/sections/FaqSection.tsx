import Link from "next/link";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DirArrow } from "@/components/ui/DirArrow";
import { withSlash } from "@/lib/url";
import { getDictionary, type Dictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/locale";

export function FaqSection({
  faqs,
  heading,
  dict = getDictionary("en"),
  locale = "en",
}: {
  faqs: { question: string; answer: string }[];
  heading?: string;
  dict?: Dictionary;
  locale?: Locale;
}) {
  const faqsPath = locale === "ar" ? "/ar/faqs/" : "/faqs/";

  return (
    <section aria-label={dict.frequentlyAskedQuestions} className="bg-white py-16 lg:py-20">
      {/* Heading beside the questions on wide screens, so the accordion doesn't sit in half an empty page. */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-2xl font-bold leading-tight text-ink lg:text-3xl">
            {heading ?? dict.frequentlyAskedQuestions}
          </h2>
          <Link href={withSlash(faqsPath)} className="mt-3 inline-block py-1 text-sm font-semibold text-sea hover:underline">
            {dict.readAllFaqs} <DirArrow />
          </Link>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
