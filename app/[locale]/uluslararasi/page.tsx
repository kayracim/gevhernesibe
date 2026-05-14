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
    title: dict.internationalPage.title,
    alternates: { languages: { tr: "/tr/uluslararasi/", en: "/en/uluslararasi/" } },
  };
}

export default async function InternationalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const p = dict.internationalPage;

  return (
    <div className="space-y-12">
      <PageIntro title={p.title} subtitle={p.subtitle} />
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted">{p.intro}</p>

      <Section id="adimlar" title={p.stepsTitle}>
        <ol className="list-decimal space-y-3 pl-5">
          {p.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>

      <Section id="sss" title={p.faqTitle}>
        <div className="space-y-6">
          {p.faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-sand bg-paper p-5">
              <p className="font-semibold text-ink">{f.q}</p>
              <p className="mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <aside className="rounded-3xl border border-sand bg-clinical-soft/30 p-6 text-sm leading-relaxed text-ink-muted sm:p-8">
        {p.disclaimer}
      </aside>
    </div>
  );
}
