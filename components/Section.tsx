import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  variant = "default",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  variant?: "default" | "heritage";
}) {
  const surface =
    variant === "heritage"
      ? "border-heritage/20 bg-gradient-to-br from-heritage/10 via-paper to-paper dark:from-heritage/20 dark:via-ink dark:to-ink dark:border-heritage/30"
      : "border-sand bg-paper dark:border-ink/20 dark:bg-ink/50";

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={`rounded-3xl border p-7 shadow-sm sm:p-10 ${surface}`}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-heritage">{eyebrow}</p>
      ) : null}
      <h2
        id={id ? `${id}-heading` : undefined}
        className="mt-2 font-display text-2xl font-semibold text-ink dark:text-paper sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted dark:text-paper/70 sm:text-base">
        {children}
      </div>
    </section>
  );
}
