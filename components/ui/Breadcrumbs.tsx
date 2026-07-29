import Link from "next/link";
import { withSlash } from "@/lib/url";

export type Crumb = {
  name: string;
  path: string;
};

/** Visible breadcrumbs — must match the BreadcrumbList schema exactly. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-ink/10 bg-white">
      <ol className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-1.5 px-5 py-3 text-xs text-slate lg:px-10">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {index > 0 && (
              <span aria-hidden="true" className="text-slate/50">
                /
              </span>
            )}
            {index === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-ink">
                {item.name}
              </span>
            ) : (
              <Link href={withSlash(item.path)} className="hover:text-sea hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
