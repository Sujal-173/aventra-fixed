import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to collaborate with Aventra Creative on premium web, SEO, and brand projects.",
  alternates: { canonical: "/careers/apply" },
  openGraph: {
    title: "Apply | Aventra Creative",
    description:
      "Submit your profile, portfolio, and availability to join our project team.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

const EXPECTATIONS = [
  "A portfolio with real, shipped work",
  "Clear, timely communication with the team",
  "Comfort working directly with clients when needed",
  "Honest availability — we plan projects around it",
];

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join us"
        title="Apply to collaborate"
        description="Share your portfolio, experience, and availability to join our freelance or internship project team."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
          { name: "Apply" },
        ]}
      />

      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          {/* Left column */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
                What we look for
              </h2>
              <ul className="mt-5 space-y-3.5">
                {EXPECTATIONS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: "var(--primary)" }}
                    />
                    <span className="text-sm leading-relaxed text-[var(--ink-muted)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7">
              <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
                Applications are reviewed on a rolling basis. If your profile
                fits a current or upcoming project, we&apos;ll follow up to
                schedule a short call — usually within a few business days.
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}