import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { PageIntro } from "@/components/PageIntro";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { cases } from "@/content/cases";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.casesPage.title,
    alternates: { languages: { tr: "/tr/cozum-hikayeleri/", en: "/en/cozum-hikayeleri/" } },
  };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = dict.casesPage;

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper">{p.intro}</p>

      <CaseStudyExplorer
        locale={locale}
        items={cases}
        exampleLabel={p.filterExample}
        labels={{
          all: p.filterAll,
          imaging: p.filterImaging,
          lab: p.filterLab,
          care: p.filterCare,
        }}
      />
    </div>
  );
}
