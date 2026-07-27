import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Aventra Creative's terms and conditions covering project engagement, payment milestones, and intellectual property handoff.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        crumbs={[{ name: "Home", href: "/" }, { name: "Terms & Conditions" }]}
      />

      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto max-w-3xl space-y-10 px-6 text-[15px] leading-8 text-[var(--ink-muted)] lg:px-8">
          <div>
            <p className="text-[var(--ink-faint)]">
              <strong>Last Updated:</strong> July 2026
            </p>
            <p className="mt-4">
              Welcome to Aventra Creative. These Terms & Conditions govern your
              use of our website and the professional services we provide. By
              accessing this website or engaging our services, you acknowledge
              that you have read, understood, and agree to be bound by these
              Terms. If you do not agree with any part of these Terms, please
              refrain from using our website or services
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              1. Services
            </h2>
            <p>
              Aventra Creative provides professional digital services including
              website development, custom web applications, e-commerce
              solutions, UI/UX design, branding, search engine optimization
              (SEO), website maintenance, consulting, and digital marketing. The
              scope, timeline, pricing, and deliverables for each project will
              be clearly outlined in an approved proposal or agreement.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              2. Project Agreement
            </h2>
            <p>
              Every project begins after written approval of the proposal and
              any required advance payment. Changes requested after project
              approval may be considered additional work and may result in
              revised timelines and pricing.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              3. Payments
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Project pricing is agreed upon before work begins.</li>
              <li>
                Advance payments may be required before project initiation.
              </li>
              <li>
                Remaining payments are due according to agreed milestones.
              </li>
              <li>Late payments may delay project delivery.</li>
              <li>
                All payments are non-refundable once work has commenced unless
                otherwise agreed in writing.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              4. Client Responsibilities
            </h2>
            <p>
              Clients are responsible for providing accurate content, images,
              branding assets, credentials, and timely feedback. Delays in
              providing required materials may impact project timelines.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              5. Revisions
            </h2>
            <p>
              Revision rounds included with the project are defined in the
              proposal. Additional revisions beyond the agreed scope may incur
              additional charges.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              6. Intellectual Property
            </h2>
            <p>
              Upon full payment, ownership of the final approved deliverables
              transfers to the client unless otherwise specified. Aventra
              Creative retains ownership of proprietary tools, frameworks,
              reusable components, templates, and internal development
              methodologies used during project execution.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              7. Third-Party Services
            </h2>
            <p>
              Projects may integrate third-party platforms such as hosting
              providers, payment gateways, analytics tools, CMS platforms, or
              APIs. Aventra Creative is not responsible for outages, pricing
              changes, or policy changes made by these third-party providers.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              8. Website Maintenance
            </h2>
            <p>
              Ongoing maintenance services are provided only if included in the
              project or covered under a separate maintenance agreement. Clients
              remain responsible for renewing domains, hosting, and third-party
              subscriptions unless explicitly managed by Aventra Creative.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              9. Limitation of Liability
            </h2>
            <p>
              Aventra Creative shall not be liable for indirect, incidental, or
              consequential damages arising from the use of our services,
              including loss of revenue, business interruption, or data loss.
              Our total liability is limited to the amount paid by the client
              for the specific project.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              10. Cancellation
            </h2>
            <p>
              Either party may terminate a project by written notice. The client
              is responsible for payment of all completed work and expenses
              incurred up to the cancellation date.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              11. Privacy
            </h2>
            <p>
              Personal information collected through our website or during
              project discussions is handled in accordance with our Privacy
              Policy and is used only for providing our services and improving
              customer experience.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              12. Changes to These Terms
            </h2>
            <p>
              Aventra Creative reserves the right to update these Terms &
              Conditions at any time. Updates become effective immediately upon
              publication on this page.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)] font-[family-name:var(--font-space-grotesk)]">
              13. Contact
            </h2>
            <p>
              If you have any questions regarding these Terms & Conditions,
              please contact us through our Contact page or email us at{" "}
              <a
                className="font-medium text-[var(--primary-glow)] hover:underline"
                href="mailto:hello@aventracreative.com"
              >
                hello@aventracreative.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
