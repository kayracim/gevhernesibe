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
    title: dict.hospitalPage.title,
    alternates: { languages: { tr: "/tr/hastane/", en: "/en/hastane/" } },
  };
}

export default async function HospitalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = dict.hospitalPage;

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted">{p.intro}</p>

      <div className="grid gap-6 lg:grid-cols-3">
        {p.sections.map((s) => (
          <Section key={s.title} title={s.title}>
            <p>{s.body}</p>
          </Section>
        ))}
      </div>

      <aside className="rounded-3xl border border-dashed border-heritage/35 bg-heritage/5 p-6 text-sm leading-relaxed text-ink-muted sm:p-8">
        {p.disclaimer}
      </aside>
    </div>
  );
}
