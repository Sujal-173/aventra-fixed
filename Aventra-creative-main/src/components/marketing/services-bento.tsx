"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Palette,
  Search,
  ShoppingBag,
  Megaphone,
  Wrench,
} from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    name: "Web Development",
    desc: "Fast, custom-built websites and applications on modern frameworks — no bloated page builders.",
    href: "/services/web-development",
    span: "lg:col-span-2 lg:row-span-2",
    dark: true,
  },
  {
    icon: Search,
    name: "SEO & Optimization",
    desc: "Technical SEO and content strategy that compounds — ranked and measured, not guessed at.",
    href: "/services/seo",
    span: "lg:col-span-1",
  },
  {
    icon: ShoppingBag,
    name: "E-commerce",
    desc: "Stores engineered around checkout conversion, not just catalog design.",
    href: "/services/e-commerce",
    span: "lg:col-span-1",
  },
  {
    icon: Palette,
    name: "Branding & Design",
    desc: "Identity systems that hold up across every surface your business shows up on.",
    href: "/services/branding",
    span: "lg:col-span-1",
  },
  {
    icon: Megaphone,
    name: "Digital Marketing",
    desc: "Campaigns tied to pipeline, not vanity impressions.",
    href: "/services/digital-marketing",
    span: "lg:col-span-1",
  },
  {
    icon: Wrench,
    name: "Maintenance & Support",
    desc: "Your site stays fast, secure, and current after launch — someone is watching it.",
    href: "/services/maintenance",
    span: "lg:col-span-2",
  },
];

export function ServicesBento() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="label-mono text-[var(--primary)]">What we do</span>
          <h2
            className="mt-3 max-w-xl font-[family-name:var(--font-space-grotesk)] font-semibold tracking-tight text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Full-stack digital work, under one roof.
          </h2>
        </div>
        <Link
          href="/services"
          className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--ink)]"
        >
          All services
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[220px]">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={s.span}
          >
            <Link
              href={s.href}
              className={
                "group flex h-full flex-col justify-between rounded-2xl border p-7 transition-colors " +
                (s.dark
                  ? "border-transparent bg-[var(--bg-dark)] text-white hover:bg-[#151517]"
                  : "border-[var(--line)] bg-[var(--bg-elevated)] hover:border-[var(--primary)]/40 hover:bg-[var(--surface)]")
              }
            >
              <div className="flex items-start justify-between">
                <div
                  className={
                    "flex h-11 w-11 items-center justify-center rounded-xl " +
                    (s.dark
                      ? "bg-[rgba(255,255,255,0.12)]"
                      : "bg-[var(--primary-soft)]")
                  }
                >
                  <s.icon
                    className={
                      "h-5 w-5 " +
                      (s.dark ? "text-white" : "text-[var(--primary)]")
                    }
                  />
                </div>
                <ArrowUpRight
                  className={
                    "h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 " +
                    (s.dark ? "text-white" : "text-[var(--ink)]")
                  }
                />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-medium">
                  {s.name}
                </h3>
                <p
                  className={
                    "mt-2 text-sm leading-relaxed " +
                    (s.dark
                      ? "text-[var(--ink-muted)]"
                      : "text-[var(--ink-muted)]")
                  }
                >
                  {s.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
