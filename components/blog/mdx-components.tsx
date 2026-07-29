import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { withSlash } from "@/lib/url";

function MdxLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <a {...props}>{children}</a>;
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={withSlash(href)} className="font-medium text-sea underline hover:text-ink">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-sea underline hover:text-ink"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="mt-10 text-xl font-bold text-ink lg:text-2xl">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="mt-8 text-lg font-bold text-ink">{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="mt-4 text-base leading-relaxed text-ink/85">{children}</p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="mt-4 flex flex-col gap-2 ps-5 text-base leading-relaxed text-ink/85 [list-style:disc]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="mt-4 flex flex-col gap-2 ps-5 text-base leading-relaxed text-ink/85 [list-style:decimal]">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => <li className="ps-1">{children}</li>,
  a: MdxLink,
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="mt-6 border-s-4 border-brass ps-4 text-base italic text-ink/70">
      {children}
    </blockquote>
  ),
};
