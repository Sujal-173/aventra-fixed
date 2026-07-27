import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Sparkles, Target } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { PageCta } from "@/components/marketing/page-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aventra Creative helps ambitious businesses launch websites and digital experiences that look premium and deliver measurable results.",
  alternates: { canonical: "/about" },
};

const JOURNEY = [
  {
    year: "2026",
    title: "Founded",
    detail: "Aventra Creative was founded with a vision to empower businesses online.",
  },
  // {
  //   year: "2022",
  //   title: "Growth",
  //   detail: "Expanded team and crafted stunning high-impact projects.",
  // },
  // {
  //   year: "2023",
  //   title: "Recognition",
  //   detail: "Trusted by 50+ brands across different industries.",
  // },
  // {
  //   year: "2024",
  //   title: "Scaling",
  //   detail: "Building better products and stronger client relationships.",
  // },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="We are a team of creatives, designers, and developers."
        description="We help ambitious brands build digital products that are beautiful, functional, and result-driven. Our mission is to empower businesses to grow through powerful digital solutions."
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
      />

      <section className="bg-[var(--bg)] pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="label-mono text-[var(--primary)]">My Story</span>
              <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)] lg:text-3xl">
                Sujal Patidar — Founder &amp; Full Stack Developer
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[var(--ink-muted)]">
                Aventra Creative was created to solve a simple but costly problem:
                businesses were investing in digital products that did not
                generate leads or sales. We focus on premium execution, clear
                messaging, and measurable outcomes.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-muted)]">
                Every project combines strategy, polished design, and modern
                engineering so your website becomes a reliable growth engine,
                not just another online brochure.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { v: "1+", l: "Years Experience" },
                  { v: "8+", l: "Clients Served" },
                  { v: "10+", l: "Projects Completed" },
                  { v: "98%", l: "Client Satisfaction" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="card p-4"
                  >
                    <div className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[var(--ink)]">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[11px] leading-tight text-[var(--ink-muted)]">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-md)]">
              <Image
                src="/images/founder-sujal.png"
                alt="Sujal Patidar, Founder & Full Stack Developer at Aventra Creative"
                fill
                sizes="(max-width: 1024px) 384px, 480px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "Deliver impactful digital solutions that drive growth.",
              },
              {
                icon: Compass,
                title: "Our Vision",
                desc: "To be a global creative agency known for excellence.",
              },
              {
                icon: Sparkles,
                title: "Our Values",
                desc: "Innovation, transparency, and client success.",
              },
            ].map((v) => (
              <div key={v.title} className="card p-7">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "var(--primary-soft)" }}
                >
                  <v.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="label-mono text-[var(--primary)]">Milestones</span>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)] lg:text-3xl">
            Our Journey
          </h2>

          <div className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-[9px] hidden h-px bg-[var(--line)] lg:block" />
            {JOURNEY.map((j) => (
              <div key={j.year} className="relative pl-6">
                <span
                  className="absolute left-0 top-1.5 h-3 w-3 rounded-full ring-4"
                  style={{
                    background: "var(--primary)",
                    boxShadow: "0 0 0 4px var(--bg)",
                  }}
                />
                <p className="text-sm font-bold text-[var(--primary)]">{j.year}</p>
                <h3 className="mt-1 font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-[var(--ink)]">
                  {j.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-muted)]">
                  {j.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title="Let's Build Something Amazing Together"
        description="Have a project in mind? Let's discuss how we can help your business grow."
        buttonText="Start a Project"
      />
    </>
  );
}
