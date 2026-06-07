import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";
import { PageIntro } from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { InteractiveInstruments } from "@/components/InteractiveInstruments";
import { MusicalInstruments } from "@/components/MusicalInstruments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  return {
    title:
      locale === "tr"
        ? "Enstrüman ve Cerrahi Aletler"
        : "Instruments & Surgical Tools",
    alternates: {
      languages: {
        tr: "/tr/cerrahi-aletler/",
        en: "/en/cerrahi-aletler/",
      },
    },
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
    <div className="space-y-16">
      <PageIntro
        title={
          locale === "tr"
            ? "Enstrüman ve Cerrahi Aletler"
            : "Instruments & Surgical Tools"
        }
        subtitle={
          locale === "tr"
            ? "Şifa; hem müziğin tınısında hem de cerrahın elindeydi"
            : "Healing lived both in the melody of music and the surgeon's hand"
        }
      />

      <div className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper/85">
        <p>
          {locale === "tr"
            ? "Gevher Nesibe Darüşşifası'nda şifa, iki büyük sanatın birlikteliğiyle sağlanırdı: Müzik enstrümanlarının makamsal gücü ile cerrahın elindeki hassas aletler. İbn-i Sina'ya göre ruh ve beden bir bütündür; bu yüzden bir ney sesi de bir neşter kadar tedavi edici olabilirdi."
            : "In Gevher Nesibe Shifahane, healing was achieved through the union of two great arts: the makam power of musical instruments and the precise tools in the surgeon's hand. According to Ibn Sina, soul and body are one; thus a ney sound could be as healing as a scalpel."}
        </p>
      </div>

      {/* 1. Müzik Enstrümanları */}
      <Section
        id="muzik-enstrumanlari"
        title={
          locale === "tr"
            ? "Şifahane Müzik Enstrümanları"
            : "Healing Music Instruments"
        }
      >
        <MusicalInstruments locale={locale} />
      </Section>

      {/* 2. Cerrahi Aletler */}
      <Section
        id="cerrahi-aletler-interaktif"
        title={
          locale === "tr"
            ? "Selçuklu Cerrahi Aletleri Sergisi"
            : "Seljuk Surgical Instruments Exhibit"
        }
      >
        <div className="mb-6 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/70">
          {locale === "tr"
            ? "Müzede sergilenen ve orijinal el yazmalarından derlenen 13. yüzyıla ait cerrahi aletler; neşterlerden penslere, kemik testerelerinden dağlama aletlerine kadar geniş bir yelpazeyi kapsar. Görsel üzerindeki noktalara tıklayarak her aletin ayrıntılarını öğrenebilirsiniz."
            : "The 13th-century surgical instruments exhibited in the museum, compiled from original manuscripts, cover a wide range from scalpels to forceps, bone saws, and cauterization tools. Click the dots on the image to learn details about each instrument."}
        </div>
        <InteractiveInstruments locale={locale} />
      </Section>
    </div>
  );
}
