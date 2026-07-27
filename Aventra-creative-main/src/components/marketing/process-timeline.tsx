"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    tag: "discovery",
    title: "Discovery",
    desc: "We understand your business, goals, and requirements.",
  },
  {
    n: "02",
    tag: "strategy",
    title: "Strategy",
    desc: "We plan the best strategy for your project and audience.",
  },
  {
    n: "03",
    tag: "design",
    title: "Design",
    desc: "We create modern, user-friendly designs built around your brand.",
  },
  {
    n: "04",
    tag: "development",
    title: "Development",
    desc: "We build fast, secure, and scalable solutions.",
  },
  {
    n: "05",
    tag: "testing",
    title: "Testing",
    desc: "We test everything for performance, bugs, and accessibility.",
  },
  {
    n: "06",
    tag: "launch",
    title: "Launch",
    desc: "We deploy your project to the world, monitored and ready.",
  },
  {
    n: "07",
    tag: "support",
    title: "Support",
    desc: "We provide ongoing support and updates after launch.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="bg-[var(--bg)] pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* role="list" on <ol> and role="listitem" on <li> (WCAG 1.3.1) */}
        <ol role="list" className="relative">
          <div
            className="absolute left-[27px] top-2 bottom-2 w-px bg-[var(--line)]"
            aria-hidden="true"
          />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              role="listitem"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              <span
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-glow), var(--primary-deep))",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
                aria-hidden="true"
              >
                {s.n}
              </span>
              <div className="pt-2">
                <span className="label-mono text-[var(--ink-faint)]">
                  feat({s.tag})
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
                  {s.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
