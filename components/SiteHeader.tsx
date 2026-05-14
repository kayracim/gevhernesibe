import Link from "next/link";
import type { Locale } from "@/lib/locale";
import type { Messages } from "@/lib/i18n";
import { withLocale } from "@/lib/paths";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

type Nav = Messages["nav"];

export function SiteHeader({
  locale,
  nav,
}: {
  locale: Locale;
  nav: Nav;
}) {
  const links: { href: string; label: string }[] = [
    { href: withLocale(locale, "/"), label: nav.home },
    { href: withLocale(locale, "/tarih-ve-miras"), label: nav.history },
    { href: withLocale(locale, "/hastane"), label: nav.hospital },
    { href: withLocale(locale, "/cozum-hikayeleri"), label: nav.cases },
    { href: withLocale(locale, "/uluslararasi"), label: nav.international },
    { href: withLocale(locale, "/kaynakca"), label: nav.bibliography },
    { href: withLocale(locale, "/iletisim"), label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={withLocale(locale, "/")}
          className="group flex min-w-0 flex-col leading-tight"
        >
          <span className="font-display text-base font-semibold text-ink sm:text-lg">
            Gevher Nesibe
          </span>
          <span className="truncate text-xs text-ink-muted sm:text-sm">
            {locale === "tr" ? "Tıp Tarihi ve Bilim Mirası" : "History of Medicine & Science Heritage"}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex lg:flex-wrap lg:justify-end"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-ink-muted transition hover:bg-sand/70 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <Link
            href={withLocale(locale, "/iletisim")}
            className="hidden rounded-full bg-heritage px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-heritage-dark sm:inline-flex"
          >
            {nav.cta}
          </Link>
        </div>
      </div>

      <nav
        aria-label="Primary mobile"
        className="border-t border-sand/80 px-2 pb-3 pt-2 lg:hidden"
      >
        <div className="mx-auto flex max-w-content flex-wrap gap-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-xs text-ink-muted transition hover:bg-sand/70 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
