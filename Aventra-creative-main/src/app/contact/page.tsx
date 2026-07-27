import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Aventra Creative to discuss your next website, SEO, or brand initiative.",
  alternates: { canonical: "/contact" },
};

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@aventracreative.com";
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 98765 43210";
const WHATSAPP_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/919876543210";

const contactChannels = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: "mailto:" + CONTACT_EMAIL,
  },
  {
    icon: MessageCircle,
    label: "Phone / WhatsApp",
    value: PHONE_NUMBER,
    href: WHATSAPP_LINK,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Indore, Madhya Pradesh, India",
    href: "https://maps.google.com/?q=Indore",
  },
];

const nextSteps = [
  {
    step: "01",
    title: "Share your goals",
    description: "Tell us what you're building and where it's stuck.",
  },
  {
    step: "02",
    title: "We scope the fit",
    description: "A short call to align on the right approach and budget.",
  },
  {
    step: "03",
    title: "You get a proposal",
    description: "A clear plan with timeline, deliverables, and cost.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Build Something Amazing Together."
        description="Have a project in mind? Let's discuss how we can help your business grow."
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
      />

      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          {/* Left column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-[1.35rem] border border-[var(--line)] bg-[var(--bg-elevated)] px-5 py-3">
              <Clock className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
              <p className="text-sm text-[var(--ink-faint)]">
                We typically reply within{" "}
                <span className="font-medium text-[var(--ink)]">one business day</span>.
              </p>
            </div>

            {contactChannels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-start gap-4 rounded-[1.35rem] border border-[var(--line)] bg-[var(--bg-elevated)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:shadow-[0_12px_35px_rgba(67,56,202,0.08)]"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: "var(--primary-soft)" }}
                >
                  <c.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                </span>
                <div>
                  <div className="label-mono text-[var(--ink-faint)]">{c.label}</div>
                  <div className="mt-1 text-sm font-medium text-[var(--ink)]">
                    {c.value}
                  </div>
                </div>
              </a>
            ))}

            <div className="overflow-hidden rounded-[1.35rem] border border-[var(--line)] bg-[var(--bg-elevated)]">
              <iframe
                title="Aventra Creative location"
                src="https://maps.google.com/maps?q=Indore,Madhya%20Pradesh,India&t=&z=11&ie=UTF8&iwloc=&output=embed"
                className="h-56 w-full grayscale contrast-[1.05]"
                loading="lazy"
              />
            </div>

            {/* What happens next */}
            <div className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--bg-elevated)] p-6">
              <div className="label-mono mb-4 text-[var(--ink-faint)]">
                What happens next
              </div>
              <ol className="space-y-4">
                {nextSteps.map((s) => (
                  <li key={s.step} className="flex items-start gap-4">
                    <span
                      className="mt-0.5 shrink-0 text-xs font-semibold tabular-nums"
                      style={{ color: "var(--primary)" }}
                    >
                      {s.step}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-[var(--ink)]">
                        {s.title}
                      </div>
                      <div className="mt-0.5 text-sm text-[var(--ink-faint)]">
                        {s.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right column */}
          <div className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--bg-elevated)] p-8 shadow-[0_20px_60px_rgba(67,56,202,0.08)]">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
