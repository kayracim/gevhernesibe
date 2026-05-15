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

      {/* Bunları Biliyor Muydunuz? Section */}
      <section className="grid gap-6 md:grid-cols-2">
        {dict.didYouKnow.items.map((item: any, i: number) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl border border-accent/20 bg-accent/5 p-8 transition-all hover:bg-accent/10 dark:border-accent/30 dark:bg-accent/10">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <span className="text-2xl">💡</span>
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
              </div>
              <p className="leading-relaxed text-ink-muted dark:text-paper/70">{item.body}</p>
            </div>
            {/* Decorative background element */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-all group-hover:bg-accent/20"></div>
          </div>
        ))}
      </section>

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

      {/* Scientific Analysis Section */}
      <Section id="bilimsel-analiz" title={dict.scienceAnalysis.title}>
        <div className="grid gap-12 lg:grid-cols-3">
          {dict.scienceAnalysis.sections.map((s: any) => (
            <div key={s.id} className="space-y-6">
              <h3 className="font-display text-xl font-bold text-heritage dark:text-heritage/90">{s.title}</h3>
              <p className="text-sm font-medium italic text-ink-muted dark:text-paper/60">{s.intro}</p>
              
              <div className="rounded-2xl bg-paper/50 p-6 shadow-sm border border-sand dark:bg-ink/40 dark:border-paper/5">
                <p className="text-sm font-bold text-heritage/70 uppercase tracking-wider">{locale === "tr" ? "DETAYLI AÇIKLAMA" : "DETAILED EXPLANATION"}</p>
                <p className="mt-2 text-sm leading-relaxed dark:text-paper/80">{s.explanation}</p>
              </div>

              <div className="rounded-2xl bg-clinical/5 p-6 border-l-4 border-clinical">
                <p className="text-xs font-bold text-clinical uppercase tracking-wider">{locale === "tr" ? "BİLİMSEL İLİŞKİ (TARİH)" : "SCIENTIFIC RELATION (HISTORY)"}</p>
                <p className="mt-2 text-sm leading-relaxed text-clinical-dark dark:text-clinical/80">{s.scientificRelation}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-ink text-paper p-8 shadow-card dark:bg-paper/5 dark:border dark:border-paper/10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <h3 className="font-display text-2xl font-bold text-accent">{dict.scienceAnalysis.conclusion.title}</h3>
              <p className="text-lg leading-relaxed text-paper/80">{dict.scienceAnalysis.conclusion.body}</p>
              
              <ul className="space-y-4">
                {dict.scienceAnalysis.conclusion.points.map((point: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold mt-0.5">✓</span>
                    <span className="text-sm text-paper/70 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              
              <p className="pt-4 font-medium italic text-accent/90 border-t border-paper/10">
                {dict.scienceAnalysis.conclusion.final}
              </p>
            </div>
            
            <div className="flex-shrink-0 lg:w-1/3">
              <div className="overflow-hidden rounded-2xl border-4 border-accent/20 shadow-xl">
                <img 
                  src="/images/bilgi1.png" 
                  alt="Bilimsel Analiz Görseli" 
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
