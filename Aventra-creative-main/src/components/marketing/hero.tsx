"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Gauge, Star, Users, Layers } from "lucide-react";
import Link from "next/link";

/**
 * HeroButton
 * Plain CSS hover/active states instead of mousemove-tracked springs —
 * same "lift" feel, but no per-pixel JS on every pointer move.
 */
function HeroButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={
        "transition-transform duration-200 ease-out will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
        className
      }
    >
      {children}
    </Link>
  );
}

// One motion node per line (not per word) — three staggered lines instead
// of ~a dozen animated spans, for the same reveal effect at a fraction of
// the animation work.
const lineVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedLine({
  text,
  delay = 0,
  gradient = false,
}: {
  text: string;
  delay?: number;
  gradient?: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        initial="hidden"
        animate="visible"
        variants={lineVariants}
        transition={{ delay }}
        className="inline-block"
        style={
          gradient
            ? {
                backgroundImage:
                  "linear-gradient(135deg, var(--primary), var(--primary-glow))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }
            : undefined
        }
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--bg)] pb-20 pt-32 lg:pb-28 lg:pt-40">
      {/* Static decorative glows — dropped the scroll-linked parallax so
          this section adds zero scroll-listener overhead. */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 -z-0 h-[560px] w-[560px] rounded-full opacity-[0.10] blur-[110px]"
        style={{ background: "var(--primary)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-10 -z-0 h-[460px] w-[460px] rounded-full opacity-[0.08] blur-[110px]"
        style={{ background: "var(--accent-blue)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-1.5 text-[13px] font-medium text-[var(--ink-muted)] shadow-[var(--shadow-sm)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              </span>
              Creative Digital Agency
            </motion.p>

            <h1
              className="font-[family-name:var(--font-space-grotesk)] font-bold leading-[1.02] tracking-tight text-[var(--ink)]"
              style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.2rem)" }}
            >
              <AnimatedLine text="Building Digital" delay={0.1} />
              <AnimatedLine text="Experiences That Drive" delay={0.2} />
              <AnimatedLine text="Growth" delay={0.32} gradient />
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--ink-muted)]"
            >
              We design and develop high-performance websites that look
              premium, rank higher, and convert visitors into customers.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <HeroButton
                href="/contact"
                className="group flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_var(--primary)] hover:bg-[var(--primary-deep)]"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </HeroButton>
              <HeroButton
                href="/portfolio"
                className="group flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-6 py-3.5 text-sm font-semibold text-[var(--ink)] shadow-[var(--shadow-sm)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                View Our Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </HeroButton>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <div className="flex -space-x-2.5">
                {[0, 1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--bg)] text-[11px] font-semibold text-white"
                    style={{
                      background: `linear-gradient(135deg, var(--primary-glow), var(--accent-blue))`,
                      opacity: 1 - n * 0.1,
                    }}
                  >
                    {/* {String.fromCharCode(65 + n)} */}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star
                      key={n}
                      className="h-3.5 w-3.5 fill-[var(--primary)] text-[var(--primary)]"
                    />
                  ))}
                  <span className="ml-1.5 text-[13px] font-semibold text-[var(--ink)]">5.0</span>
                </div>
                <p className="text-[12px] text-[var(--ink-muted)]">
                  Trusted by 10+ businesses
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <HeroPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Signature hero visual: a single, self-contained panel — an abstract
// brand-gradient artwork on top with a real in-flow metrics row underneath.
// Deliberately avoids scattered floating badges (they clip into the panel
// content at smaller widths); everything here sits in normal document flow.
function HeroPanel() {
  const metrics = [
    { icon: Gauge, value: "95+", label: "PageSpeed" },
    { icon: Layers, value: "10+", label: "Projects" },
    { icon: Users, value: "100%", label: "Satisfaction" },
  ];

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] opacity-25 blur-3xl"
        style={{
          background: "linear-gradient(135deg, var(--primary-glow), var(--accent-blue))",
        }}
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]">
        {/* Minimal browser affordance — just enough to read as "a website",
            without the dotted-chrome cliché */}
        <div className="flex items-center border-b border-[var(--line)] bg-[var(--surface)] px-5 py-3">
          <div className="mx-auto flex items-center gap-2 rounded-full bg-[var(--bg)] px-4 py-1 text-[11px] text-[var(--ink-faint)]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--success)" }} />
            aventracreative.com
          </div>
        </div>

        {/* Abstract brand artwork — mesh gradient + fine dot grid, standing
            in for a product screenshot without pretending to be one */}
        <div
          className="relative flex aspect-[16/12] items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 100% at 15% 10%, var(--primary-glow) 0%, transparent 55%), radial-gradient(100% 90% at 90% 90%, var(--accent-blue) 0%, transparent 50%), var(--surface)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(var(--ink-faint) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(circle at center, black 0%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 75%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <div className="relative h-14 w-14 drop-shadow-[0_8px_20px_rgba(67,56,202,0.35)]">
              <Image src="/images/logo-icon.png" alt="" fill className="object-contain" />
            </div>
            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[12px] font-medium text-gray backdrop-blur-sm">
              Building brands that perform
            </span>
          </div>
        </div>

        {/* In-flow metrics row — no absolute positioning, so it can never
            overlap the artwork above at any viewport width */}
        <div className="grid grid-cols-3 divide-x divide-[var(--line)] border-t border-[var(--line)]">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1 px-3 py-5 text-center">
              <m.icon className="h-4 w-4" style={{ color: "var(--primary)" }} />
              <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[var(--ink)]">
                {m.value}
              </span>
              <span className="text-[11px] text-[var(--ink-faint)]">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
