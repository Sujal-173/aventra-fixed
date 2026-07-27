"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Wrench,
} from "lucide-react";
import type { Service } from "@/lib/data/services";

const icons = {
  code: Code2,
  search: Search,
  palette: Palette,
  megaphone: Megaphone,
  wrench: Wrench,
  "shopping-bag": ShoppingBag,
};

export function CoreServices({ services }: { services: Service[] }) {
  return (
    <section className="bg-[var(--bg)] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label-mono text-[var(--primary)]">What we do</span>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-[var(--ink)] lg:text-4xl">
              Services built to move your business forward.
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-relaxed text-[var(--ink-muted)]">
            From launch-ready websites to growth systems that keep converting,
            we shape each engagement around your real goals.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service, index) => {
            const Icon = icons[service.icon] ?? Code2;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-[var(--line)] bg-[var(--bg-elevated)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-[0_20px_60px_rgba(67,56,202,0.08)]"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${service.color}1f` }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: service.color }}
                    />
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--ink-muted)]">
                    {service.shortDesc}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                    Explore {service.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Link
          href="/services"
          className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--primary)]"
        >
          View All Services{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
