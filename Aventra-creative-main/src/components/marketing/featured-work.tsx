"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-[var(--bg)] py-28 text-[var(--ink)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="label-mono text-[var(--primary)]">
              Selected work
            </span>
            <h2
              className="mt-3 max-w-xl font-[family-name:var(--font-space-grotesk)] font-semibold tracking-tight text-[var(--ink)]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Case studies for businesses that want a premium digital edge.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--primary)]"
          >
            Full portfolio{" "}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="lg:col-span-1"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)]"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
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

                {/* subtle dark gradient to ensure legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-mono text-white/75">
                      {project.industry}
                    </span>
                    <span className="text-xs font-medium rounded-full bg-[rgba(255,255,255,0.06)] px-3 py-1 text-white/80">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-semibold text-white leading-tight">
                    {project.name}
                  </h3>
                  <p className="mt-2 max-w-prose text-sm text-white/85 line-clamp-2 sm:line-clamp-3">
                    {project.overview}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(0,0,0,0.35)] px-3 py-1 text-xs text-white/90">
                      View case study
                    </span>
                    <span className="text-sm text-white/75">•</span>
                    <span className="text-sm text-white/75">
                      {project.result}
                    </span>
                  </div>
                </div>

                <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.12)] backdrop-blur">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
