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
    title: dict.historyPage.bibliographyTitle,
    alternates: { languages: { tr: "/tr/kaynakca/", en: "/en/bibliography/" } },
  };
}

export default async function BibliographyPage({
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
      <PageIntro 
        title={p.bibliographyTitle} 
        subtitle={locale === "tr" ? "Çalışmada yararlanılan temel kaynaklar ve akademik referanslar." : "Key sources and academic references used in this study."} 
      />

      <Section id="web-araclari" title={locale === "tr" ? "Kullanılan Dijital Araçlar" : "Digital Tools Used"}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3 rounded-2xl bg-paper/55 p-6 shadow-sm border border-sand dark:bg-ink/60 dark:border-paper/10">
            <h3 className="font-display text-lg font-bold text-heritage dark:text-heritage/90">
              {locale === "tr" ? "Web 2.0 Araçları" : "Web 2.0 Tools"}
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-base text-ink-muted dark:text-paper/70">
              <li>Canva</li>
              <li>Padlet</li>
              <li>NotebookLM</li>
              <li>Mentimeter</li>
              <li>Kahoot</li>
              <li>Google Forms</li>
            </ul>
          </div>
          <div className="space-y-3 rounded-2xl bg-paper/55 p-6 shadow-sm border border-sand dark:bg-ink/60 dark:border-paper/10">
            <h3 className="font-display text-lg font-bold text-clinical dark:text-clinical/90">
              {locale === "tr" ? "Web 3.0 Araçları" : "Web 3.0 Tools"}
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-base text-ink-muted dark:text-paper/70">
              <li>ChatGPT</li>
              <li>Gemini</li>
            </ul>
          </div>
        </div>
      </Section>
      
      <Section id="kaynak-listesi" title={locale === "tr" ? "Akademik Referanslar" : "Academic References"}>
        <ul className="list-disc space-y-4 pl-5 text-lg leading-relaxed text-ink dark:text-paper">
          {p.bibliography?.map((item) => (
            <li key={item} className="pl-2">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="muze-notu" variant="heritage" title={locale === "tr" ? "Müze Bilgisi" : "Museum Information"}>
        <p className="leading-relaxed dark:text-paper">
          {locale === "tr" 
            ? "Bu projede kullanılan teknik bilgiler ve görseller, Kayseri Selçuklu Uygarlığı Müzesi'ndeki teşhir üniteleri ve tıp tarihi arşivlerinden derlenmiştir. Daha fazla bilgi için Kayseri'deki Gevher Nesibe Külliyesi'ni ziyaret edebilirsiniz."
            : "The technical information and visuals used in this project were compiled from the exhibition units and medical history archives at the Kayseri Seljuk Civilization Museum. For more information, you can visit the Gevher Nesibe Complex in Kayseri."}
        </p>
      </Section>
    </div>
  );
}
