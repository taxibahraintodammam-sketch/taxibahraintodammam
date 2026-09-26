import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteAccept } from "@/components/booking/QuoteAccept";
import type { Locale } from "@/lib/locale";

export const dynamic = "force-static";

// Kept here, not in the client component: a server page can't read plain
// values exported from a "use client" module (they arrive as references).
const QUOTE_ACCEPT_HEADING: Record<Locale, string> = {
  en: "Accept your quote",
  ar: "قبول عرض السعر",
};

// Reached only from the link in a quote email; personal to one booking, so
// keep it out of search results.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return {
    title: QUOTE_ACCEPT_HEADING[locale],
    robots: { index: false, follow: false },
  };
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-xl px-5">
        <h1 className="text-[2rem] font-bold leading-tight text-ink">{QUOTE_ACCEPT_HEADING[locale]}</h1>
        <div className="mt-6">
          {/* useSearchParams needs a Suspense boundary on a static page. */}
          <Suspense fallback={null}>
            <QuoteAccept locale={locale} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
