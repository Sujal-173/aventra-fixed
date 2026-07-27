import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { PageCta } from "@/components/marketing/page-cta";
import { FaqAccordion } from "@/components/marketing/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to common questions about working with Aventra Creative.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    q: "How long does it take to build a website?",
    a: "Most business websites launch in 3-5 weeks depending on scope, content readiness, and how quickly feedback comes back to us.",
  },
  {
    q: "Will my website be SEO-friendly?",
    a: "Yes — every site we build starts with a technical SEO foundation: fast load times, proper structure, and clean metadata.",
  },
  {
    q: "Do you provide domain and hosting?",
    a: "We can set these up on your behalf, or work with domains and hosting you already own.",
  },
  {
    q: "Can I update my website myself?",
    a: "Yes — every site ships with CMS access and a short walkthrough so you can make text and image changes without a developer.",
  },
  {
    q: "Do you provide support after project completion?",
    a: "Every project includes 30 days of post-launch support. Ongoing maintenance is available as a monthly retainer.",
  },
  {
    q: "What is the payment process?",
    a: "Typically 50% upfront to begin work and 50% on completion before final handoff. Larger projects can be split into milestones.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Find answers to common questions."
        crumbs={[{ name: "Home", href: "/" }, { name: "FAQ" }]}
      />
      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FaqAccordion items={FAQS} />
        </div>
      </section>
      <PageCta
        title="Still Have Questions?"
        description="We're here to help you."
      />
    </>
  );
}
