import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { PageCta } from "@/components/marketing/page-cta";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { SERVICES } from "@/lib/data/services";
import { fetchServices } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  return (await fetchServices(SERVICES)).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = (await fetchServices(SERVICES)).find(
    (item) => item.slug === slug,
  );
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDesc,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = await fetchServices(SERVICES);
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDesc,
    provider: { "@type": "Organization", name: "Aventra Creative" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aventracreative.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://aventracreative.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `https://aventracreative.com/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="Service"
        title={service.name}
        description={service.shortDesc}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name },
        ]}
      />

      <section className="bg-[var(--bg)] pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8">
              <span className="label-mono text-[var(--ink-faint)]">
                The problem
              </span>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-muted)]">
                {service.problem}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary-soft)] p-8">
              <span className="label-mono" style={{ color: "var(--primary)" }}>
                Our approach
              </span>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink)]">
                {service.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
            What We Offer
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {service.features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6"
              >
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-[var(--ink)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-muted)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
              Benefits
            </h2>
            <ul className="mt-6 space-y-3">
              {service.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-[var(--ink-muted)]"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--primary)" }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
              Process & Timeline
            </h2>
            <div className="relative mt-6 space-y-0">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--line)]" />
              {service.timeline.map((t) => (
                <div
                  key={t.stage}
                  className="relative flex items-start gap-4 py-2.5"
                >
                  <span className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[var(--primary)] bg-[var(--bg)]" />
                  <p className="text-sm text-[var(--ink-muted)]">
                    <span className="font-medium text-[var(--ink)]">
                      {t.stage}
                    </span>{" "}
                    — {t.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
            Technology We Use
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {service.technology.map((t) => (
              <span
                key={t}
                className="label-mono rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-[var(--ink-muted)]"
              >
                {t}
              </span>
            ))}
          </div>

          <h2 className="mt-14 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
            Deliverables
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.deliverables.map((d) => (
              <div
                key={d}
                className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--ink-muted)]"
              >
                <Check
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--primary)" }}
                />
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
            Frequently Asked Questions
          </h2>
          <div className="mt-6">
            <FaqAccordion items={service.faq} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
            Other Services
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .slice(0, 4)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 text-sm text-[var(--ink-muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--ink)]"
                >
                  {s.name}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <PageCta
        title="Ready to move your project forward?"
        description="Book a conversation and we’ll outline the best digital solution for your business."
        buttonText="Book a consultation"
      />
    </>
  );
}
