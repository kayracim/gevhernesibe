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
    title: dict.stem.title,
    alternates: { languages: { tr: "/tr/uluslararasi/", en: "/en/uluslararasi/" } },
  };
}

export default async function StemProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const s = dict.stem;

  return (
    <div className="space-y-12">
      <PageIntro title={s.title} subtitle={s.subtitle} />
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Section id="tema" title={locale === "tr" ? "Etkinlik Teması" : "Activity Theme"}>
            <p className="text-lg font-medium text-heritage dark:text-heritage/90">{s.activity.theme}</p>
            <p className="mt-4 leading-relaxed text-ink-muted dark:text-paper/70">{s.activity.purpose}</p>
          </Section>

          <Section id="maarif" title={locale === "tr" ? "Maarif Modeli Entegrasyonu" : "Maarif Model Integration"}>
            <p className="leading-relaxed text-ink-muted dark:text-paper/60 italic">{s.activity.maarif}</p>
          </Section>
        </div>

        <div className="rounded-3xl border-2 border-clinical bg-clinical-soft/20 p-8 shadow-card dark:border-clinical/30 dark:bg-clinical/10">
          <div className="flex items-center gap-3 text-clinical dark:text-clinical/90">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clinical text-white font-bold shadow-sm">2</span>
            <h2 className="font-display text-2xl font-bold">{s.durak2.title}</h2>
          </div>
          
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-clinical/70 dark:text-clinical/60">
                {s.durak2.reportTitle}
              </p>
              <p className="mt-2 text-xl font-medium text-ink dark:text-paper">&quot;{s.durak2.mission}&quot;</p>
            </div>

            <div className="space-y-4 rounded-2xl bg-white/40 p-5 dark:bg-paper/5 border border-sand/30 dark:border-paper/5">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-clinical/60 dark:text-clinical/50">
                  {locale === "tr" ? "Tedavi Yöntemleri" : "Treatment Methods"}
                </p>
                <p className="text-sm leading-relaxed text-ink-muted dark:text-paper/70">{s.durak2.details.methods}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-clinical/60 dark:text-clinical/50">
                  {locale === "tr" ? "Bilimsel Temel" : "Scientific Basis"}
                </p>
                <p className="text-sm leading-relaxed text-ink-muted dark:text-paper/70">{s.durak2.details.science}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-clinical/60 dark:text-clinical/50">
                  {locale === "tr" ? "Modern Bağlantı" : "Modern Connection"}
                </p>
                <p className="text-sm leading-relaxed text-ink-muted dark:text-paper/70">{s.durak2.details.connection}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-clinical/70 dark:text-clinical/50">
                {locale === "tr" ? "ÖZET BİLGİLER" : "SUMMARY POINTS"}
              </p>
              <ul className="list-disc pl-5 text-sm text-ink-muted dark:text-paper/60">
                {s.durak2.tasks.map((task: string) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="rounded-xl border border-clinical/20 bg-white/50 px-4 py-2 dark:border-clinical/30 dark:bg-white/5">
                <p className="text-[10px] font-bold text-clinical uppercase dark:text-clinical/80">{locale === "tr" ? "STEM Bağlantısı" : "STEM Connection"}</p>
                <p className="text-sm font-semibold dark:text-paper">{s.durak2.stemLink}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="rounded-3xl border border-heritage/20 bg-heritage-soft/20 p-8 text-center sm:p-12 dark:border-heritage/30 dark:bg-heritage/5">
        <h3 className="font-display text-2xl font-bold text-heritage dark:text-heritage/90">{s.conclusion.title}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted dark:text-paper/70">
          {s.conclusion.body}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-heritage/60">
          <span className="h-px w-8 bg-heritage/20"></span>
          SIRIUS PROJECT
          <span className="h-px w-8 bg-heritage/20"></span>
        </div>
      </div>
    </div>
  );
}
