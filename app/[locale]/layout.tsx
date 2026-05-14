import type { ReactNode } from "react";
import { DM_Sans, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/locale";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

const sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

export async function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = await getDictionary(locale);

  return (
    <div className={`${display.variable} ${sans.variable} font-sans`}>
      <SetHtmlLang lang={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        {dict.skip}
      </a>
      <SiteHeader locale={locale} nav={dict.nav} />
      <main id="main" className="min-h-[60vh] bg-paper bg-grain-soft">
        <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {children}
        </div>
      </main>
      <SiteFooter locale={locale} dict={dict.footer} />
    </div>
  );
}
