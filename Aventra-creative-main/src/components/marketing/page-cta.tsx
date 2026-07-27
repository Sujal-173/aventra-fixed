import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageCta({
  title = "Ready to move your project forward?",
  description = "Launch a refined digital experience backed by strategy, design, and measurable performance.",
  buttonText = "Get in touch",
  href = "/contact",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}) {
  return (
    <section className="bg-[var(--bg)] px-6 pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className="on-violet flex flex-col items-start justify-between gap-6 rounded-[1.75rem] px-8 py-10 sm:flex-row sm:items-center sm:px-12"
          style={{
            background:
              "linear-gradient(120deg, var(--primary-deep), var(--primary) 60%, var(--primary-glow))",
          }}
        >
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
              {title}
            </h2>
            <p className="mt-1.5 text-sm text-purple-100">{description}</p>
          </div>
          <Link
            href={href}
            className="
    group
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-full
    bg-[var(--bg-elevated)]
    px-7
    py-3.5
    font-semibold
    text-[var(--ink)]
    shadow-[var(--shadow-md)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-105
    hover:bg-[var(--surface)]
    active:scale-95
  "
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
