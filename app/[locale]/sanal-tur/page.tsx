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

  // Kayseri Selçuklu Uygarlığı Müzesi (Gevher Nesibe) YouTube 360/VR Video Embed Link
  // Buraya istediğiniz YouTube videosunun embed linkini yerleştirebilirsiniz.
  // Örnek bir müze tanıtım videosu yer tutucu (placeholder) olarak eklenmiştir.
  const youtubeEmbedUrl = "https://www.youtube.com/embed/jZ_yTf-1h-E?si=xyz&autoplay=0&rel=0";

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper">{p.intro}</p>

      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-4 border-sand/30 bg-black shadow-card dark:border-ink/20">
        <iframe
          src={youtubeEmbedUrl}
          title={p.title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
        
        {/* Placeholder if iframe fails or is loading */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-4 text-white/60">
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
