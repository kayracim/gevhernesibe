import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.historyPage.title,
    alternates: { languages: { tr: "/tr/tarih-ve-miras/", en: "/en/tarih-ve-miras/" } },
  };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = dict.historyPage;

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper/70">{p.intro}</p>

      <Section id="inceleme" title={p.bulletsTitle}>
        <ul className="list-disc space-y-3 pl-5">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section id="gorev" variant="heritage" title={p.taskTitle}>
        <p className="text-lg font-medium text-ink dark:text-paper">{p.task}</p>
        <p className="text-sm dark:text-paper/60">{p.taskHint}</p>
      </Section>

      <Section id="stem" title={p.stemTitle}>
        <p>{p.stem}</p>
      </Section>

      <Section id="kopru" title={p.bridgeTitle}>
        <p>{p.bridge}</p>
      </Section>

      {p.bibliography && (
        <Section id="kaynakca" title={p.bibliographyTitle}>
          <ul className="list-disc space-y-2 pl-5 text-sm text-ink-muted dark:text-paper/60">
            {p.bibliography.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
