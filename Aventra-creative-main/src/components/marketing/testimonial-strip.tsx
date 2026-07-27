"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Sujal understood our booking flow better than agencies we'd paid three times as much. Direct bookings are up significantly since launch.",
    name: "Rohit Sharma",
    role: "Owner, Yashraj Palace",
    initials: "RS",
  },
  {
    quote:
      "Clear communication, fast turnaround, and the SEO work actually moved rankings — not just a checklist we never saw results from.",
    name: "Aditi Verma",
    role: "Founder, Shubham Traders",
    initials: "AV",
  },
  {
    quote:
      "Our site finally looks like the business we actually are. Every revision came back faster than we expected.",
    name: "Pooja Soni",
    role: "Marketing Lead, Avdhut Visuals",
    initials: "PS",
  },
];

export function TestimonialStrip() {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--surface)] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="label-mono text-[var(--primary)]">
          What clients say
        </span>
        <h2
          className="mt-3 max-w-xl font-[family-name:var(--font-space-grotesk)] font-semibold tracking-tight text-[var(--ink)]"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
        >
          Trusted by businesses that needed real results.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex h-full flex-col rounded-[1.4rem] border border-[var(--line)] bg-[var(--bg-elevated)] p-7 shadow-[var(--shadow-sm)]"
            >
              <div className="flex gap-0.5 text-[var(--primary)]">
                <span className="sr-only">Rated 5 out of 5 stars</span>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--ink)]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-soft)] text-xs font-medium text-[var(--primary)]">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-medium text-[var(--ink)]">
                    {t.name}
                  </div>
                  <div className="text-xs text-[var(--ink-muted)]">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
