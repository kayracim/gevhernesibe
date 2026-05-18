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
    title: dict.didYouKnow.title,
    alternates: { languages: { tr: "/tr/bunu-biliyor-muydunuz/", en: "/en/bunu-biliyor-muydunuz/" } },
  };
}

export default async function DidYouKnowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = dict.didYouKnow;

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle || (locale === "tr" ? "800 Yıllık Tıp Tarihinin Şaşırtıcı Gerçekleri" : "Surprising Facts from 800 Years of Medical History")} />
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper">{p.intro || (locale === "tr" ? "Gevher Nesibe Şifahanesi ve Selçuklu tıp dünyası hakkında tarihin tozlu sayfalarında kalmış, bugünün modern bilimini bile hayrete düşüren ilginç gerçekleri keşfedin." : "Discover fascinating facts about the Gevher Nesibe Healing House and the Seljuk medical world.")}</p>

      <section className="grid gap-8 md:grid-cols-2">
        {p.items.map((item: { title: string; body: string }, i: number) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl border border-accent/20 bg-accent/5 p-8 shadow-sm transition-all hover:bg-accent/10 hover:shadow-md dark:border-accent/30 dark:bg-accent/10">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <span className="text-3xl drop-shadow-sm">💡</span>
                <h3 className="font-display text-xl font-bold text-ink dark:text-paper">{item.title}</h3>
              </div>
              <p className="leading-relaxed text-ink-muted dark:text-paper/80 text-base">{item.body}</p>
            </div>
            {/* Decorative background element */}
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-all group-hover:bg-accent/20 dark:bg-accent/20"></div>
          </div>
        ))}
      </section>
    </div>
  );
}
