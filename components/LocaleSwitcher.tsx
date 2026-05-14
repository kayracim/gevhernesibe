"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";

function pathWithoutLocale(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  const stripped = trimmed.replace(/^\/(tr|en)/, "") || "/";
  if (stripped === "" || stripped === "/") return "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

function withLocalePrefix(locale: Locale, rest: string) {
  if (rest === "/" || rest === "") return `/${locale}/`;
  const normalized = rest.startsWith("/") ? rest : `/${rest}`;
  return `/${locale}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const rest = pathWithoutLocale(pathname);
  const trHref = withLocalePrefix("tr", rest);
  const enHref = withLocalePrefix("en", rest);

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-full border border-sand bg-paper p-1 shadow-sm"
    >
      <Link
        href={trHref}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition sm:text-sm ${
          locale === "tr" ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
        }`}
        hrefLang="tr"
        lang="tr"
      >
        TR
      </Link>
      <Link
        href={enHref}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition sm:text-sm ${
          locale === "en" ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
        }`}
        hrefLang="en"
        lang="en"
      >
        EN
      </Link>
    </div>
  );
}
