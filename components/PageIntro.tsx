export function PageIntro({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="space-y-4 border-b border-sand pb-10 dark:border-ink/20">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink dark:text-paper text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-measure text-lg leading-relaxed text-ink-muted dark:text-paper">{subtitle}</p>
    </header>
  );
}
