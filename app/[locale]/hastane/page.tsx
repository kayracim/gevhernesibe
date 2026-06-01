import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { ImageLightbox } from "@/components/ImageLightbox";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.hospitalPage.title,
    alternates: { languages: { tr: "/tr/hastane/", en: "/en/hastane/" } },
  };
}

export default async function HospitalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = dict.hospitalPage;

  return (
    <div className="space-y-16">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="space-y-8 lg:col-span-7">
          <p className="text-lg leading-relaxed text-ink-muted dark:text-paper">{p.intro}</p>
          
          <div className="space-y-8">
            {p.sections.map((s, index) => (
              <Section key={s.title} title={s.title}>
                <p className="dark:text-paper/70 leading-relaxed">{s.body}</p>
                {/* Embedded miniature image under Gıyasiye section */}
                {index === 1 && (
                  <div className="mt-6 overflow-hidden rounded-2xl bg-paper/5 shadow-card dark:bg-ink/20">
                    <ImageLightbox 
                      src="/images/historical/miniature.png" 
                      alt={locale === "tr" ? "Selçuklu Tıp Dersi Minyatürü" : "Seljuk Medical Lesson Miniature"} 
                    />
                    <p className="p-3 text-center text-xs text-ink-muted dark:text-paper/40 font-medium">
                      {locale === "tr" 
                        ? "Selçuklu döneminde medresede hekim ve talebelerin usta-çırak eğitimini gösteren minyatür."
                        : "Miniature depicting the master-apprentice medical training in the Seljuk madrasah."}
                    </p>
                  </div>
                )}
              </Section>
            ))}
          </div>
        </div>

        {/* Right side: Architectural Visual Showcase */}
        <aside className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl border border-sand bg-gradient-to-br from-paper to-sand/40 p-6 shadow-card dark:border-ink/20 dark:from-ink dark:to-ink/50 sm:p-8">
            <h3 className="font-display text-xl font-bold text-ink dark:text-paper mb-4">
              {locale === "tr" ? "Çifte Medrese Mimari Planı" : "Double Madrasah Architectural Plan"}
            </h3>
            
            <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-sm border border-sand/50 dark:bg-ink">
              <ImageLightbox 
                src="/images/historical/architecture.png" 
                alt={locale === "tr" ? "Gevher Nesibe Çifte Medrese Planı" : "Gevher Nesibe Double Madrasah Plan"} 
              />
            </div>
            
            <p className="mt-4 text-xs leading-relaxed text-ink-muted dark:text-paper/60">
              {locale === "tr" 
                ? "Şifahane ve Medrese'nin birleşik yapısını (Çifte Medrese) gösteren 1206 tarihli orijinal Selçuklu mimari tasarım çizimi."
                : "Original Seljuk architectural design drawing showing the combined structure of the Hospital and Madrasah (Double Madrasah) dating back to 1206."}
            </p>
          </div>
        </aside>
      </div>

      <aside className="rounded-3xl border border-dashed border-heritage/35 bg-heritage/5 p-6 text-sm leading-relaxed text-ink-muted dark:text-paper/60 dark:bg-heritage/10 sm:p-8">
        {p.disclaimer}
      </aside>
    </div>
  );
}

