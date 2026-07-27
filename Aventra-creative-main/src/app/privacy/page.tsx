import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Aventra Creative's privacy policy covering data collection, cookies, and third-party processors.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
      />

      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto max-w-3xl space-y-10 px-6 text-[15px] leading-8 text-[var(--ink-muted)] lg:px-8">
          <div>
            <p className="text-[var(--ink-faint)]">
              <strong>Last Updated:</strong> July 2026
            </p>

            <p className="mt-4">
              Aventra Creative values your privacy. This Privacy Policy explains
              how we collect, use, store, and protect your personal information
              when you visit our website or use our services.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              1. Information We Collect
            </h2>

            <p>
              We may collect personal information that you voluntarily provide,
              including:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Company Name</li>
              <li>Project Requirements</li>
              <li>Any information submitted through our contact forms</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              2. Automatically Collected Information
            </h2>

            <p>
              When you browse our website, certain information may be collected
              automatically, including:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>IP Address</li>
              <li>Browser Type</li>
              <li>Device Information</li>
              <li>Operating System</li>
              <li>Pages Visited</li>
              <li>Time Spent on Website</li>
              <li>Referral Sources</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              3. How We Use Your Information
            </h2>

            <p>Your information may be used to:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Respond to enquiries</li>
              <li>Provide project quotations</li>
              <li>Deliver our services</li>
              <li>Improve our website</li>
              <li>Communicate project updates</li>
              <li>Provide customer support</li>
              <li>Improve user experience</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              4. Cookies
            </h2>

            <p>
              Our website may use cookies and similar technologies to improve
              website functionality, understand visitor behavior, and enhance
              your browsing experience. You may disable cookies through your
              browser settings if preferred.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              5. Third-Party Services
            </h2>

            <p>
              We may use trusted third-party services such as Google Analytics,
              Sanity CMS, Cloudinary, Resend, and hosting providers to operate
              our website and deliver our services. These providers may process
              information in accordance with their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              6. Data Security
            </h2>

            <p>
              We implement reasonable technical and organizational measures to
              protect your information against unauthorized access, alteration,
              disclosure, or destruction. However, no online transmission or
              storage system is completely secure.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              7. Data Sharing
            </h2>

            <p>
              Aventra Creative does not sell or rent your personal information.
              Information may only be shared when necessary to provide our
              services, comply with legal obligations, or protect our rights.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              8. Data Retention
            </h2>

            <p>
              We retain personal information only for as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce agreements.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              9. Your Rights
            </h2>

            <p>You may request to:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Withdraw consent where applicable</li>
              <li>Request information about how your data is processed</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              10. Children's Privacy
            </h2>

            <p>
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              11. Changes to this Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy periodically. Any changes will
              be published on this page together with the updated revision date.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
              12. Contact Us
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy or how we
              process your information, please contact us at{" "}
              <a
                href="mailto:hello@aventracreative.com"
                className="font-medium text-[var(--primary-glow)] hover:underline"
              >
                hello@aventracreative.com
              </a>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] p-6">
            <h3 className="mb-2 text-lg font-semibold text-[var(--ink)]">
              Privacy Commitment
            </h3>

            <p className="text-sm text-[var(--ink-muted)]">
              Aventra Creative is committed to protecting your privacy and
              handling your personal information responsibly. We only collect
              the information necessary to provide our services and improve your
              experience.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
