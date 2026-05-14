import type { Locale } from "./locale";

export function withLocale(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const trimmed = normalized.replace(/\/+$/, "");
  const suffix = trimmed === "" ? "/" : `${trimmed}/`;
  return `/${locale}${suffix}`;
}
