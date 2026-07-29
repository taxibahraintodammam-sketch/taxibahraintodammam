export type Locale = "en" | "ar";

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};
