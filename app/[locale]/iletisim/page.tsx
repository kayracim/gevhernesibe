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
        <div className="overflow-hidden rounded-2xl border border-sand shadow-sm dark:border-ink/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3113.1118225574514!2d35.4832560765955!3d38.72671565715975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152b120f2b322a3d%3A0xc6646cc262502691!2sSel%C3%A7uklu%20Uygarl%C4%B1%C4%9F%C4%B1%20M%C3%BCzesi!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Gevher Nesibe Müzesi Harita"
            className="grayscale-[0.2] transition-all duration-500 hover:grayscale-0"
          ></iframe>
        </div>
      </Section>

      <aside className="rounded-3xl border border-heritage/30 bg-heritage/10 p-6 text-sm font-semibold text-heritage-dark sm:p-8">
        {p.emergency}
      </aside>
    </div>
  );
}
