import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.org"),
  title: {
    default: "Gevher Nesibe Hastanesi",
    template: "%s · Gevher Nesibe Hastanesi",
  },
  description:
    "Köklerden geleceğe: Gevher Nesibe mirasıyla modern, güvenilir ve insan odaklı sağlık hizmetleri.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Gevher Nesibe Hastanesi",
  },
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-dvh bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
