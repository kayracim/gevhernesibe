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

// Custom SVG Logo Components for each tool
const CanvaLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="url(#canvaGrad)" />
    <path d="M6 14.5c2.5-3 5.5-3.5 8-.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="canvaGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00c4cc" />
        <stop offset="100%" stopColor="#7d2ae8" />
      </linearGradient>
    </defs>
  </svg>
);

const PadletLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#ff4081" />
    <circle cx="8" cy="10" r="3" fill="white" />
    <circle cx="16" cy="14" r="3" fill="white" />
    <circle cx="12" cy="7" r="2" fill="white" opacity="0.8" />
  </svg>
);

const AndroidStudioLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#3ddc84" />
    <path d="M7 9l4 3-4 3m10-6l-4 3 4 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FirebaseLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#1e293b" />
    <path d="M12 4L5 15.5l7 4.5 7-4.5L12 4z" fill="#ffa000" />
    <path d="M12 4l-5 8.5 5 2.5 5-2.5L12 4z" fill="#ffca28" />
    <path d="M12 9l-3 5.5 3 1.5 3-1.5-3-5.5z" fill="#f57c00" />
  </svg>
);

const AntigravityLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#6366f1" />
    <circle cx="12" cy="12" r="5" fill="white" />
    <ellipse cx="12" cy="12" rx="8" ry="2.2" stroke="white" strokeWidth="1.2" transform="rotate(-20 12 12)" />
  </svg>
);

const CursorLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#090d16" />
    <path d="M8 6l9.5 5.5-4 1.5 3.5 5-1.8 1.2-3.5-5-3.7 2.8V6z" fill="#00e5ff" />
  </svg>
);

const GeminiLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#1a73e8" />
    <path d="M12 5l1.6 4.4L18 11l-4.4 1.6L12 17l-1.6-4.4L6 11l4.4-1.6L12 5z" fill="white" />
    <path d="M7 6l0.8 2.2L10 9l-2.2 0.8L7 12l-0.8-2.2L4 9l2.2-0.8L7 6z" fill="white" opacity="0.7" />
  </svg>
);

const NextjsLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="black" />
    <path d="M17.5 17.5L10.5 8.2v9.3H9V6.5h1.7l7 9.3V6.5h1.5v11h-1.7z" fill="white" />
  </svg>
);

const TailwindLogo = () => (
  <svg className="w-6 h-6 shrink-0 shadow-sm rounded-md" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#0f172a" />
    <path d="M12 7.5c-2.4 0-3.6 1.2-3.6 3.6s1.2 3.6 3.6 3.6 3.6-1.2 3.6-3.6-1.2-3.6-3.6-3.6zm0 4.8c-1.2 0-1.8-.6-1.8-1.8s.6-1.8 1.8-1.8 1.8.6 1.8 1.8-.6 1.8-1.8 1.8z" fill="#38bdf8" />
    <path d="M15 11.5c-1.6 0-2.4.8-2.4 2.4s.8 2.4 2.4 2.4 2.4-.8 2.4-2.4-.8-2.4-2.4-2.4zm0 3.2c-.8 0-1.2-.4-1.2-1.2s.4-1.2 1.2-1.2 1.2.4 1.2 1.2-.4 1.2-1.2 1.2z" fill="#38bdf8" opacity="0.8" />
  </svg>
);

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
        <div className="grid gap-6 md:grid-cols-2">
          {/* Web 2.0 Card */}
          <div className="space-y-4 rounded-2xl bg-paper/55 p-6 shadow-sm border border-sand dark:bg-ink/60 dark:border-paper/10">
            <h3 className="font-display text-lg font-bold text-heritage dark:text-heritage/90 border-b border-sand/40 pb-2 dark:border-paper/5">
              {locale === "tr" ? "Web 2.0 & Yayıncılık Araçları" : "Web 2.0 & Publishing Tools"}
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <CanvaLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Canva</span>
              </li>
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <PadletLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Padlet</span>
              </li>
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <AndroidStudioLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Android Studio</span>
              </li>
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <FirebaseLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Firebase Hosting</span>
              </li>
            </ul>
          </div>

          {/* Web 3.0 & Framework Card */}
          <div className="space-y-4 rounded-2xl bg-paper/55 p-6 shadow-sm border border-sand dark:bg-ink/60 dark:border-paper/10">
            <h3 className="font-display text-lg font-bold text-clinical dark:text-clinical/90 border-b border-sand/40 pb-2 dark:border-paper/5">
              {locale === "tr" ? "Web 3.0 & Yazılım Geliştirme" : "Web 3.0 & Framework Tools"}
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <AntigravityLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Antigravity AI</span>
              </li>
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <CursorLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Cursor Editor</span>
              </li>
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <GeminiLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Gemini 3.5 AI</span>
              </li>
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <NextjsLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Next.js React</span>
              </li>
              <li className="flex items-center gap-3 bg-white/70 p-3 rounded-xl border border-sand/30 shadow-sm dark:bg-ink/40 dark:border-paper/5 transition hover:scale-102">
                <TailwindLogo />
                <span className="font-semibold text-xs text-ink dark:text-paper">Tailwind CSS</span>
              </li>
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
