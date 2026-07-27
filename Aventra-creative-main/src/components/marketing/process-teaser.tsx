"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STEPS = [
  { tag: "discovery", msg: "define scope, goals, audience" },
  { tag: "strategy", msg: "map sitemap, content, conversion path" },
  { tag: "design", msg: "wireframe → high-fidelity UI" },
  { tag: "development", msg: "build, integrate, test" },
  { tag: "launch", msg: "deploy, monitor, hand off" },
];

export function ProcessTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="label-mono text-[var(--primary)]">How we work</span>
          <h2
            className="mt-3 font-[family-name:var(--font-space-grotesk)] font-semibold tracking-tight text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            A process that reads like a build log — because it is one.
          </h2>
          <p className="mt-5 max-w-md text-[var(--ink-muted)]">
            Every project ships in the open: a real timeline, real checkpoints,
            nothing vague between kickoff and launch.
          </p>
          <Link
            href="/process"
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)]"
          >
            See the full process
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="relative rounded-[1.6rem] border border-[var(--line)] bg-[var(--bg-elevated)]/90 p-2 shadow-[var(--shadow-md)]">
          <div className="rounded-[1.25rem] bg-[var(--bg-dark)] p-6">
            <div className="label-mono flex items-center justify-between text-[var(--ink-faint)]">
              <span>aventra — process.log</span>
              <span className="text-[var(--success)]">● live</span>
            </div>
            <div className="relative mt-5 space-y-0">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-800" />
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.tag}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative flex items-start gap-4 py-3"
                >
                  <span className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--primary)] bg-[var(--bg-dark)]" />
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] leading-relaxed">
                    <span className="text-[var(--primary)]">feat</span>
                    <span className="text-[var(--ink-faint)]">({s.tag}): </span>
                    <span className="text-[var(--ink-muted)]">{s.msg}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
