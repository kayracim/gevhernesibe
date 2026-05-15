import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { PageIntro } from "@/components/PageIntro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  
  return {
    title: dict.virtualTourPage.title,
    alternates: { languages: { tr: "/tr/sanal-tur/", en: "/en/sanal-tur/" } },
  };
}

export default async function VirtualTourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = dict.virtualTourPage;

  // Kayseri Selçuklu Uygarlığı Müzesi (Gevher Nesibe) Google Maps Embed Link
  // Not: Tam bir "Street View" (Sokak Görünümü) için Google Haritalar'dan "Harita Yerleştir"
  // seçeneğiyle alınan pb= parametresi kullanılmalıdır. Şu anki konum müzenin yerini gösterir.
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.111956165243!2d35.4832560765955!3d38.72671565715975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152b1216d7a41285%3A0x6b1cc8c11e2f9d66!2sSel%C3%A7uklu%20Uygarl%C4%B1%C4%9F%C4%B1%20M%C3%BCzesi!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str";

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper">{p.intro}</p>

      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-4 border-sand/30 bg-sand/10 shadow-card dark:border-ink/20 dark:bg-ink/50 sm:aspect-[21/9]">
        <iframe
          src={mapEmbedUrl}
          title={p.title}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        
        {/* Placeholder if iframe fails or is loading */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-4 text-ink-muted dark:text-paper/60">
          <svg className="h-8 w-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-medium">{p.loading}</span>
        </div>
      </div>
    </div>
  );
}
