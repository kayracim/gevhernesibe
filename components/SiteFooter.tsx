import Link from "next/link";
import type { Locale } from "@/lib/locale";
import type { Messages } from "@/lib/i18n";
import { withLocale } from "@/lib/paths";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Messages["footer"];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand bg-ink text-paper">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <p className="font-display text-lg font-semibold">{dict.disclaimerTitle}</p>
          <p className="text-sm leading-relaxed text-paper/85">{dict.disclaimer}</p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-sm">
            <Link className="underline-offset-4 hover:underline" href={withLocale(locale, "/tarih-ve-miras")}>
              {locale === "tr" ? "Tarih" : "History"}
            </Link>
            <span className="text-paper/40">·</span>
            <Link className="underline-offset-4 hover:underline" href={withLocale(locale, "/cozum-hikayeleri")}>
              {locale === "tr" ? "Hikâyeler" : "Stories"}
            </Link>
            <span className="text-paper/40">·</span>
            <Link className="underline-offset-4 hover:underline" href={withLocale(locale, "/iletisim")}>
              {locale === "tr" ? "İletişim" : "Contact"}
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <p className="text-sm text-paper/70">{dict.rights.replace("{year}", String(year))}</p>
          <p className="text-xs text-paper/55">
            {locale === "tr"
              ? "Bu vitrin örnek senaryolar içerir; tıbbi iddia değildir."
              : "This showcase includes example scenarios; not a medical claim."}
          </p>
        </div>
      </div>
    </footer>
  );
}
