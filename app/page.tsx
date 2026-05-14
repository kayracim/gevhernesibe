"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tr/");
  }, [router]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-paper px-6 text-center text-ink-muted">
      <p className="font-display text-lg text-ink">Yönlendiriliyor…</p>
      <p className="text-sm">Redirecting to Turkish…</p>
      <p className="max-w-measure text-sm">
        <Link className="text-clinical underline-offset-4 hover:underline" href="/tr/">
          Türkçe siteye git
        </Link>
        {" · "}
        <Link className="text-clinical underline-offset-4 hover:underline" href="/en/">
          Go to English site
        </Link>
      </p>
    </div>
  );
}
