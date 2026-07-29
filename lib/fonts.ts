import { Sora, Inter, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

/**
 * next/font/google downloads and self-hosts these at build time — there is
 * no runtime request to fonts.googleapis.com and no <link> tag to Google.
 */

export const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const FONT_VARIABLES = `${sora.variable} ${inter.variable} ${plexMono.variable} ${plexArabic.variable}`;
