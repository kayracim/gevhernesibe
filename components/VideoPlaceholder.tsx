export function VideoPlaceholder({
  title,
  note,
  badge,
  emptyState,
}: {
  title: string;
  note: string;
  badge: string;
  emptyState: string;
}) {
  return (
    <section aria-labelledby="intro-video-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="intro-video-heading" className="font-display text-2xl text-ink sm:text-3xl">
          {title}
        </h2>
        <span className="rounded-full border border-accent/40 bg-accent-soft/40 px-3 py-1 text-xs font-semibold text-ink">
          {badge}
        </span>
      </div>
      <p className="max-w-measure text-sm leading-relaxed text-ink-muted">{note}</p>

      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-heritage/35 bg-clinical-soft/40 shadow-card">
        <div className="aspect-video w-full bg-gradient-to-br from-clinical-soft via-paper to-sand">
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
            <div
              aria-hidden
              className="grid h-16 w-16 place-items-center rounded-full border border-heritage/30 bg-paper shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-heritage" fill="currentColor">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </div>
            <p className="max-w-md text-sm text-ink-muted">{emptyState}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
