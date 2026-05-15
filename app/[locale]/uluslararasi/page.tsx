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
            <p className="text-lg font-medium text-heritage">{s.activity.theme}</p>
            <p className="mt-4 leading-relaxed text-ink-muted">{s.activity.purpose}</p>
          </Section>

          <Section id="maarif" title={locale === "tr" ? "Maarif Modeli Entegrasyonu" : "Maarif Model Integration"}>
            <p className="leading-relaxed text-ink-muted italic">{s.activity.maarif}</p>
          </Section>
        </div>

        <div className="rounded-3xl border-2 border-clinical bg-clinical-soft/20 p-8 shadow-card">
          <div className="flex items-center gap-3 text-clinical">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clinical text-white font-bold">2</span>
            <h2 className="font-display text-2xl font-bold">{s.durak2.title}</h2>
          </div>
          
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-clinical/70">
                {locale === "tr" ? "GÖREV" : "MISSION"}
              </p>
              <p className="mt-2 text-xl font-medium text-ink">&quot;{s.durak2.mission}&quot;</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-clinical/70">
                {locale === "tr" ? "İNCELEME" : "EXAMINATION"}
              </p>
              <p className="leading-relaxed text-ink-muted">{s.durak2.description}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-clinical/70">
                {locale === "tr" ? "ADIMLAR" : "STEPS"}
              </p>
              <ul className="list-disc pl-5 text-sm text-ink-muted">
                {s.durak2.tasks.map((task: string) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="rounded-xl border border-clinical/20 bg-white/50 px-4 py-2 dark:bg-ink/50">
                <p className="text-[10px] font-bold text-clinical uppercase">{locale === "tr" ? "STEM Bağlantısı" : "STEM Connection"}</p>
                <p className="text-sm font-semibold">{s.durak2.stemLink}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section id="surec" title={s.process.title}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.process.steps.map((step, index) => (
            <div key={step} className="relative rounded-2xl border border-sand bg-paper p-6 shadow-sm">
              <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-heritage text-sm font-bold text-white shadow-lift">
                {index + 1}
              </span>
              <p className="mt-2 font-semibold text-ink">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="rounded-3xl border border-heritage/20 bg-heritage-soft/20 p-8 text-center">
        <p className="font-display text-xl text-heritage">{s.durak2.maarifModel}</p>
      </div>
    </div>
  );
}
