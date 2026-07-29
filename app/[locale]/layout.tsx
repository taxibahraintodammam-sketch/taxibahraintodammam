import type { Metadata, Viewport } from "next";
import "../globals.css";
import { FONT_VARIABLES } from "@/lib/fonts";
import type { Locale } from "@/lib/locale";
import { getDictionary } from "@/content/dictionary";
import { SITE_URL } from "@/content/business";
import { SkipLink } from "@/components/ui/SkipLink";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { StickyActionBar } from "@/components/ui/StickyActionBar";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Taxi Bahrain to Dammam | Fixed Fare Causeway Transfer 24/7",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1b2b",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${FONT_VARIABLES} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand text-ink">
        <SkipLink label={dict.skipToContent} />
        <Header dict={dict} locale={locale} />
        <main id="main-content" className="flex-1 pb-[var(--sticky-bar-height)] lg:pb-0">
          {children}
        </main>
        <Footer dict={dict} locale={locale} />
        <StickyActionBar dict={dict} locale={locale} />
      </body>
    </html>
  );
}
