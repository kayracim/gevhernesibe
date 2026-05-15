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
      
      <Section id="kaynak-listesi" title={locale === "tr" ? "Akademik Referanslar" : "Academic References"}>
        <ul className="list-disc space-y-4 pl-5 text-lg leading-relaxed text-ink dark:text-paper/70">
          {p.bibliography?.map((item) => (
            <li key={item} className="pl-2">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="muze-notu" variant="heritage" title={locale === "tr" ? "Müze Bilgisi" : "Museum Information"}>
        <p className="leading-relaxed dark:text-paper/70">
          {locale === "tr" 
            ? "Bu projede kullanılan teknik bilgiler ve görseller, Kayseri Selçuklu Uygarlığı Müzesi'ndeki teşhir üniteleri ve tıp tarihi arşivlerinden derlenmiştir. Daha fazla bilgi için Kayseri'deki Gevher Nesibe Külliyesi'ni ziyaret edebilirsiniz."
            : "The technical information and visuals used in this project were compiled from the exhibition units and medical history archives at the Kayseri Seljuk Civilization Museum. For more information, you can visit the Gevher Nesibe Complex in Kayseri."}
        </p>
      </Section>
    </div>
  );
}
