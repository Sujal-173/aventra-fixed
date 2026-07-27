"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, type Project } from "@/lib/data/projects";

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered =
    active === "All"
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <section className="bg-[var(--bg)] pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-mono text-[var(--primary)]">Our Work</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              Work That Speaks For Itself.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
              Browse curated case studies for websites, e-commerce, branding, and SEO built to move businesses forward.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={
                  "rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer min-h-[44px] " +
                  (active === category
                    ? "border-transparent bg-[var(--primary)] text-white"
                    : "border-[var(--line)] text-[var(--ink-muted)] hover:border-[var(--primary)] hover:text-[var(--ink)]")
                }
                aria-pressed={active === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <motion.article
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--bg-elevated)] shadow-[0_20px_60px_rgba(67,56,202,0.1)]"
            >
              <Link href={`/portfolio/${project.slug}`} className="block">
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={
                      project.coverImageUrl
                        ? {
                            backgroundImage: `url(${project.coverImageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : { background: project.gradient }
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/90">
                    {project.category}
                  </div>
                  <div className="absolute left-5 bottom-5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-lg shadow-black/10">
                    {project.result}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-faint)]">
                    <span>{project.year}</span>
                    <span>·</span>
                    <span>{project.industry}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--primary)]">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)] line-clamp-3">
                    {project.overview}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-[11px] font-medium text-[var(--ink-muted)]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--primary)]">
                    <span className="uppercase tracking-[0.24em]">View case study</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
