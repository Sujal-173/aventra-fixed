"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 8, suffix: "+", label: "Happy clients" },
  { value: 10, suffix: "+", label: "Projects completed" },
  { value: 1, suffix: "+", label: "Years in business" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--bg)]/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-mono text-[var(--primary)]">Proof in motion</p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold tracking-tight text-[var(--ink)]">
              Results that feel as good as they perform.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]">
            We combine sharp strategy, strong visuals, and reliable delivery so
            every launch feels intentional.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--bg-elevated)]/80 p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight text-[var(--ink)] lg:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-[var(--ink-muted)]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
