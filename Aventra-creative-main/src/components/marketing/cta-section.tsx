import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--bg-dark)] px-8 py-20 text-center text-white sm:px-16 shadow-[var(--shadow-lg)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(500px circle at 20% 20%, rgba(109,40,217,0.35), transparent 60%), radial-gradient(500px circle at 80% 80%, rgba(37,99,235,0.25), transparent 60%)",
          }}
        />
        <div className="relative">
          <span className="label-mono text-[var(--primary)]">
            Ready to collaborate
          </span>
          <h2
            className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-space-grotesk)] font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Your competitors already have a website. Give yours a reason to win.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[var(--ink-muted)]">
            Share your business goals and we’ll recommend how to turn your digital presence into a growth engine.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--bg-elevated)] px-7 py-3.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--primary)] hover:text-white"
          >
            Book a consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
