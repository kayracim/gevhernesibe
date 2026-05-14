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
    title: dict.contactPage.title,
    alternates: { languages: { tr: "/tr/iletisim/", en: "/en/iletisim/" } },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = dict.contactPage;

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted">{p.intro}</p>

      <Section id="kanallar" title={p.channelsTitle}>
        <ul className="list-disc space-y-3 pl-5">
          {p.channels.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section id="harita" title={p.mapTitle}>
        <div className="rounded-2xl border-2 border-dashed border-sand bg-sand/40 p-10 text-center text-sm text-ink-muted">
          {p.mapPlaceholder}
        </div>
      </Section>

      <aside className="rounded-3xl border border-heritage/30 bg-heritage/10 p-6 text-sm font-semibold text-heritage-dark sm:p-8">
        {p.emergency}
      </aside>
    </div>
  );
}
