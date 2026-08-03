import type { Metadata } from "next";
import "../globals.css";

/**
 * /driver lives outside app/[locale]/**, so this is its own independent
 * root layout (same pattern as app/admin/layout.tsx) — each top-level
 * segment that isn't nested under another layout can define its own
 * <html>/<body>.
 */
export const metadata: Metadata = {
  title: "Driver Portal | Taxi Bahrain to Dammam",
  robots: { index: false, follow: false },
};

export default function DriverRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
