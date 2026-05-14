import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { withLocale } from "@/lib/paths";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { PosterGridPlaceholder } from "@/components/PosterGridPlaceholder";
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
    title: dict.brand.full,
    description: dict.brand.tagline,
    alternates: {
      canonical: `/${locale}/`,
      languages: { tr: "/tr/", en: "/en/" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const h = dict.home;

  const historicalImages: { src: string; alt: string }[] = [];

  return (
    <div className="space-y-16 lg:space-y-20">
      <section className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="space-y-6 lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-heritage">
            {h.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink dark:text-paper text-balance sm:text-5xl lg:text-6xl">
            {h.hero.title}
          </h1>
          <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper/70 sm:text-xl">
            {h.hero.lead}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={withLocale(locale, "/hastane")}
              className="inline-flex items-center justify-center rounded-full bg-heritage px-6 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-heritage-dark"
            >
              {h.hero.ctaPrimary}
            </Link>
            <Link
              href={withLocale(locale, "/cozum-hikayeleri")}
              className="inline-flex items-center justify-center rounded-full border border-sand bg-paper px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-heritage/40"
            >
              {h.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-sand bg-gradient-to-br from-paper via-clinical-soft/40 to-sand p-6 shadow-card dark:border-ink/20 dark:from-ink dark:via-clinical-soft/10 dark:to-ink sm:p-8">
            <p className="font-display text-lg text-ink dark:text-paper">{dict.brand.tagline}</p>
            <ul className="mt-6 space-y-4 text-sm text-ink-muted dark:text-paper/70">
              {h.pillars.items.map((item) => (
                <li key={item.title} className="rounded-2xl border border-sand/80 bg-paper/70 p-4 dark:border-ink/30 dark:bg-ink/60">
                  <p className="font-semibold text-ink dark:text-paper">{item.title}</p>
                  <p className="mt-2 leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <VideoPlaceholder
        title={h.video.title}
        note={h.video.note}
        badge={h.video.badge}
        emptyState={h.video.emptyState}
      />

      <PosterGridPlaceholder
        title={h.posters.title}
        note={h.posters.note}
        slotLabel={h.posters.slotLabel}
        images={[]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Section id="kaynakca-cta" variant="heritage" title={dict.nav.bibliography || "Kaynakça"}>
          <p>
            {locale === "tr" 
              ? "Bu çalışmada kullanılan akademik kaynaklar, müze kayıtları ve tıp tarihi arşivlerine buradan ulaşabilirsiniz."
              : "Access the academic sources, museum records, and medical history archives used in this study here."}
          </p>
          <div className="pt-2">
            <Link
              className="inline-flex text-sm font-semibold text-heritage underline-offset-4 hover:underline"
              href={withLocale(locale, "/kaynakca")}
            >
              {locale === "tr" ? "Kaynakça sayfasına git" : "Go to bibliography page"}
            </Link>
          </div>
        </Section>

        <Section id="uluslararasi-cta" title={locale === "tr" ? "Yolculuk planı" : "Plan your visit"}>
          <p>
            {locale === "tr"
              ? "Kayseri’ye uzaktan gelen hastalar için adım adım bir çerçeve hazırladık."
              : "We prepared a simple step-by-step frame for patients traveling to Kayseri."}
          </p>
          <Link
            href={withLocale(locale, "/uluslararasi")}
            className="inline-flex w-fit rounded-full bg-clinical px-5 py-2 text-sm font-semibold text-white transition hover:opacity-95"
          >
            {dict.nav.international}
          </Link>
        </Section>
      </div>
    </div>
  );
}

