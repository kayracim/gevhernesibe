import Link from "next/link";
import type { Locale } from "@/lib/locale";
import type { Messages } from "@/lib/i18n";
import { withLocale } from "@/lib/paths";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    { href: withLocale(locale, "/cerrahi-aletler"), label: nav.instruments },
    { href: withLocale(locale, "/sanal-tur"), label: nav.virtualTour },
    { href: withLocale(locale, "/bunu-biliyor-muydunuz"), label: nav.didYouKnow },
    { href: withLocale(locale, "/uluslararasi"), label: nav.international },
    { href: withLocale(locale, "/kaynakca"), label: nav.bibliography },
    { href: withLocale(locale, "/iletisim"), label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand/80 bg-paper/85 backdrop-blur-md dark:border-ink/20 dark:bg-ink/85">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={withLocale(locale, "/")}
          className="group flex min-w-0 flex-col leading-tight"
        >
          <span className="font-display text-base font-semibold text-ink dark:text-paper sm:text-lg">
            Gevher Nesibe
          </span>
          <span className="truncate text-xs text-ink-muted dark:text-paper/60 sm:text-sm">
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
              className="rounded-full px-3 py-2 text-sm text-ink-muted transition hover:bg-sand/70 hover:text-ink dark:text-paper/70 dark:hover:bg-paper/10 dark:hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher locale={locale} />
          <Link
            href={withLocale(locale, "/iletisim")}
            className="hidden btn-hover-effect rounded-full bg-heritage px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-heritage-dark sm:inline-flex"
          >
            {nav.cta}
          </Link>
        </div>
      </div>

      <nav
        aria-label="Primary mobile"
        className="overflow-x-auto border-t border-sand/80 px-4 py-2 lg:hidden scrollbar-hide"
      >
        <div className="flex w-max items-center gap-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full bg-sand/40 px-4 py-2 text-[11px] font-medium text-ink-muted transition active:scale-95 active:bg-sand/60 dark:bg-paper/10 dark:text-paper/70 dark:active:bg-paper/20"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
