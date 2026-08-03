import type { Metadata } from "next";
import "../globals.css";

/**
 * /track-booking lives outside app/[locale]/**, so this is its own
 * independent root layout (same pattern as app/admin/layout.tsx and
 * app/driver/layout.tsx).
 */
export const metadata: Metadata = {
  title: "Track Your Booking | Taxi Bahrain to Dammam",
  robots: { index: false, follow: false },
};

export default function TrackBookingRootLayout({
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
