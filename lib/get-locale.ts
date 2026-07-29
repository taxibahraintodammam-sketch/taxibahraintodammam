import { headers } from "next/headers";
import { localeFromPathname, type Locale } from "@/lib/locale";

/** Any Server Component can call this independently — no prop drilling needed. */
export async function getRequestLocale(): Promise<Locale> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  return localeFromPathname(pathname);
}
