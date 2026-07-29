import { schemaJson } from "@/lib/schema";

export function SchemaScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaJson(data) }}
    />
  );
}
