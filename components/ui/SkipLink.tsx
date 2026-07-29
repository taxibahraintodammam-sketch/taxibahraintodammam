import { withSlash } from "@/lib/url";

export function SkipLink({ label }: { label: string }) {
  return (
    <a href={withSlash("#main-content")} className="skip-link">
      {label}
    </a>
  );
}
