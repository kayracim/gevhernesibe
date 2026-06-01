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
    <div className="space-y-16">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper">{p.intro}</p>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6 space-y-6">
          <Section id="inceleme" title={p.bulletsTitle}>
            <div className="overflow-hidden rounded-3xl bg-paper/5 shadow-card dark:bg-ink/20">
              <ImageLightbox src="/images/tarihsel.png" alt={p.bulletsTitle} />
            </div>
          </Section>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <Section id="gorev" variant="heritage" title={p.taskTitle}>
            <p className="text-lg font-medium text-ink dark:text-paper">{p.task}</p>
            <p className="text-sm dark:text-paper/60 mt-2">{p.taskHint}</p>
          </Section>
        </div>
      </div>

      {/* Tarihsel Fotoğraf Galerisi */}
      <Section id="galeri" title={locale === "tr" ? "Külliyeden Tarihsel Kareler" : "Historical Views of the Complex"}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2 overflow-hidden rounded-2xl bg-paper/30 p-3 border border-sand/50 dark:bg-ink/40 dark:border-ink/20">
            <ImageLightbox 
              src="/images/historical/img_1.png" 
              alt={locale === "tr" ? "Şifahane Taç Kapısı" : "Sifahane Portal"} 
            />
            <p className="text-center text-xs font-semibold text-ink-muted dark:text-paper/50 pt-1">
              {locale === "tr" ? "Şifahane Giriş Taç Kapısı" : "Sifahane Monumental Entrance"}
            </p>
          </div>

          <div className="space-y-2 overflow-hidden rounded-2xl bg-paper/30 p-3 border border-sand/50 dark:bg-ink/40 dark:border-ink/20">
            <ImageLightbox 
              src="/images/historical/img_2.png" 
              alt={locale === "tr" ? "Medrese Avlusu" : "Madrasah Courtyard"} 
            />
            <p className="text-center text-xs font-semibold text-ink-muted dark:text-paper/50 pt-1">
              {locale === "tr" ? "Çifte Medrese İç Avlusu" : "Double Madrasah Courtyard"}
            </p>
          </div>

          <div className="space-y-2 overflow-hidden rounded-2xl bg-paper/30 p-3 border border-sand/50 dark:bg-ink/40 dark:border-ink/20">
            <ImageLightbox 
              src="/images/historical/img_3.png" 
              alt={locale === "tr" ? "Tonozlu Koridorlar" : "Vaulted Corridors"} 
            />
            <p className="text-center text-xs font-semibold text-ink-muted dark:text-paper/50 pt-1">
              {locale === "tr" ? "Akustik Tonozlu Koridorlar" : "Acoustic Vaulted Corridors"}
            </p>
          </div>
        </div>
      </Section>

      <div className="grid gap-8 lg:grid-cols-2">
        <Section id="stem" title={p.stemTitle}>
          <p className="leading-relaxed">{p.stem}</p>
        </Section>

        <Section id="kopru" title={p.bridgeTitle}>
          <p className="leading-relaxed">{p.bridge}</p>
        </Section>
      </div>

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

