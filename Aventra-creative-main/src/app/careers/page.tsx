import type { Metadata } from "next";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { PageCta } from "@/components/marketing/page-cta";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Aventra Creative — freelance collaborations, internships, and future opportunities.",
  alternates: { canonical: "/careers" },
};

const TRACKS = [
  {
    icon: Users,
    title: "Freelancers",
    desc: "For designers and developers who want project-based collaboration on real client work.",
  },
  {
    icon: GraduationCap,
    title: "Internships",
    desc: "Hands-on experience shipping production websites — not busywork, real client projects.",
  },
  {
    icon: Briefcase,
    title: "Future opportunities",
    desc: "As Aventra grows, full-time roles will open first to people already in our network.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Send your portfolio",
    desc: "Tell us what track fits and share work you're proud of.",
  },
  {
    step: "02",
    title: "Have a short call",
    desc: "15 minutes to talk about fit, availability, and rates.",
  },
  {
    step: "03",
    title: "Start on a trial project",
    desc: "A small, paid piece of real client work — no unpaid tests.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join us"
        title="Careers & collaborations"
        description="Work directly with a founder-led digital studio on high-impact website, SEO, and brand projects."
        crumbs={[{ name: "Home", href: "/" }, { name: "Careers" }]}
      />

      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8">
            <p className="text-[15px] leading-relaxed text-[var(--ink-muted)]">
              Aventra Creative is a founder-led studio where every project gets
              direct attention from strategy to delivery. We&apos;re looking for
              collaborators who deliver dependable work, communicate clearly, and
              care about launching results.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TRACKS.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[0_4px_15px_rgba(67,56,202,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:shadow-[0_12px_35px_rgba(67,56,202,0.06)]"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: "var(--primary-soft)" }}
                >
                  <t.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>

          {/* How to apply */}
          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
              How to apply
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {PROCESS.map((p) => (
                <div key={p.step} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 shrink-0 text-xs font-semibold tabular-nums"
                    style={{ color: "var(--primary)" }}
                  >
                    {p.step}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-[var(--ink)]">
                      {p.title}
                    </div>
                    <div className="mt-0.5 text-sm leading-relaxed text-[var(--ink-muted)]">
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title="Think you can add value?"
        description="Send your portfolio and tell us how you help ambitious clients grow."
        buttonText="Apply now"
        href="/careers/apply"
      />
    </>
  );
}
