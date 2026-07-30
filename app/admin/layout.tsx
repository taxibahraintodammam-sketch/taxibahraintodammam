import type { Metadata } from "next";
import "../globals.css";
import { AdminShell } from "@/components/admin/AdminShell";

/**
 * /admin lives outside app/[locale]/**, so this is its own independent
 * root layout (Next.js supports multiple root layouts as long as there's
 * no shared app/layout.tsx above them — each top-level segment that isn't
 * nested under another layout can define its own <html>/<body>). The
 * interactive sidebar/shell logic lives in components/admin/AdminShell.tsx
 * so this file can stay a Server Component and export metadata.
 */
export const metadata: Metadata = {
  title: "Admin | Taxi Bahrain to Dammam",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
