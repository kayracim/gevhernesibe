import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-heritage">404</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Sayfa bulunamadı / Not found</h1>
      <p className="mx-auto mt-4 max-w-measure text-ink-muted">
        Aradığınız rota yok veya henüz yayınlanmadı.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper" href="/tr/">
          Ana sayfa (TR)
        </Link>
        <Link
          className="rounded-full border border-sand px-5 py-2 text-sm font-semibold text-ink"
          href="/en/"
        >
          Home (EN)
        </Link>
      </div>
    </div>
  );
}
