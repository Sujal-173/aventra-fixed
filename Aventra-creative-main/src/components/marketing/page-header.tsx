import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: { name: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] pb-16 pt-32 lg:pb-20 lg:pt-36">
      <div
        className="pointer-events-none absolute -top-32 left-1/3 -z-0 h-[420px] w-[420px] rounded-full opacity-20 blur-[110px]"
        style={{ background: "var(--primary)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-[var(--ink-faint)]"
        >
          {crumbs.map((c, i) => (
            <span key={c.name} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {c.href ? (
                <Link
                  href={c.href}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {c.name}
                </Link>
              ) : (
                <span className="text-[var(--ink)] font-medium">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
        <span className="label-mono mt-6 block text-[var(--primary-glow)]">
          {eyebrow}
        </span>
        <h1
          className="mt-3 max-w-2xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight text-[var(--ink)]"
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--ink-muted)]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
