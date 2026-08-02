import type { ReactNode } from "react";
import { breadcrumbSchema } from "@/lib/schema";
import { SchemaScript } from "@/components/schema/SchemaScript";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Locale } from "@/lib/locale";

export function LegalPageLayout({
  title,
  lastUpdated,
  path,
  locale = "en",
  children,
}: {
  title: string;
  lastUpdated: string;
  path: string;
  locale?: Locale;
  children: ReactNode;
}) {
  const prefix = locale === "ar" ? "/ar" : "";
  const breadcrumbItems = [
    { name: locale === "ar" ? "الرئيسية" : "Home", path: `${prefix}/` },
    { name: title, path: `${prefix}${path}` },
  ];
  const lastUpdatedLabel = locale === "ar" ? "آخر تحديث" : "Last updated";

  return (
    <>
      <SchemaScript data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="border-b border-ink/10 bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-[820px] px-5 lg:px-10">
          <h1 className="text-[1.75rem] font-bold leading-tight text-ink lg:text-[2.5rem]">
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate">
            {lastUpdatedLabel}: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-20">
        <div className="mx-auto flex max-w-[820px] flex-col gap-8 px-5 lg:px-10">{children}</div>
      </section>
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-ink lg:text-2xl">{heading}</h2>
      <div className="mt-3 flex flex-col gap-4 text-base leading-relaxed text-ink/85">
        {children}
      </div>
    </div>
  );
}
