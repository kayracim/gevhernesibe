import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { InteractiveInstruments } from "@/components/InteractiveInstruments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  return {
    title: locale === "tr" ? "Cerrahi Aletler" : "Surgical Instruments",
    alternates: { languages: { tr: "/tr/cerrahi-aletler/", en: "/en/cerrahi-aletler/" } },
  };
}

export default async function SurgicalInstrumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;

  return (
    <div className="space-y-12">
      <PageIntro
        title={locale === "tr" ? "Cerrahi Aletler" : "Surgical Instruments"}
        subtitle={
          locale === "tr"
            ? "Gevher Nesibe Şifahanesinde Kullanılan Cerrahi Mühendislik ve Aletler"
            : "Surgical Engineering and Instruments Used in Gevher Nesibe Shifahane"
        }
      />

      <div className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper/85">
        <p>
          {locale === "tr"
            ? "Gevher Nesibe Darüşşifası'nda Selçuklu döneminde tıp eğitimi ve tedaviler en üst düzey cerrahi standartlarda yapılırdı. Müzede sergilenen ve orijinal el yazmalarından derlenen 13. yüzyıla ait cerrahi aletler; neşterlerden penslere, kemik testerelerinden dağlama aletlerine kadar geniş bir yelpazeyi kapsar."
            : "In the Gevher Nesibe Shifahane, medical education and treatments during the Seljuk era were carried out at the highest surgical standards. The 13th-century surgical instruments exhibited in the museum, compiled from original manuscripts, cover a wide range from scalpels to forceps, bone saws, and cauterization tools."}
        </p>
      </div>

      <Section
        id="cerrahi-aletler-interaktif"
        title={locale === "tr" ? "Selçuklu Cerrahi Aletleri Sergisi" : "Seljuk Surgical Instruments Exhibit"}
      >
        <InteractiveInstruments locale={locale} />
      </Section>
    </div>
  );
}
