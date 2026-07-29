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
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold text-ink lg:text-3xl">
            {heading ?? dict.frequentlyAskedQuestions}
          </h2>
          <Link href={withSlash(faqsPath)} className="text-sm font-semibold text-sea hover:underline">
            {dict.readAllFaqs} <DirArrow />
          </Link>
        </div>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
