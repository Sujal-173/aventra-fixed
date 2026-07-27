import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageCta } from "@/components/marketing/page-cta";
import { PROJECTS } from "@/lib/data/projects";
import { fetchProjects } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  return (await fetchProjects(PROJECTS)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await fetchProjects(PROJECTS)).find(
    (item) => item.slug === slug,
  );
  if (!project) return {};
  return {
    title: project.name,
    description: project.overview,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await fetchProjects(PROJECTS);
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    about: project.industry,
    creator: { "@type": "Organization", name: "Aventra Creative" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aventracreative.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: "https://aventracreative.com/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `https://aventracreative.com/portfolio/${project.slug}`,
      },
    ],
  };

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-[var(--bg)] pb-6 pt-36 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-[var(--ink-faint)]"
          >
            <Link
              href="/"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/portfolio"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-[var(--ink-muted)]">{project.name}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <span className="label-mono text-[var(--primary)]">
                {project.industry}
              </span>
              <h1
                className="mt-3 font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight text-[var(--ink)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                {project.name}
              </h1>
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Visit project <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div
              className="w-full h-64 sm:h-[420px] lg:h-[520px] bg-[var(--bg-elevated)]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="hidden absolute left-6 bottom-6 max-w-2xl">
              <div className="rounded-[2rem] bg-black/50 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <span className="label-mono text-[var(--primary)]">
                  {project.industry}
                </span>
                <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-5xl font-bold text-white">
                  {project.name}
                </h1>
                <p className="mt-3 text-base text-white/85">
                  {project.overview}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--primary-deep)]"
                    >
                      Visit project <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/90">
                    {project.year}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/90">
                    {project.result}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/85"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-[2rem] bg-[var(--surface)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.1)] ">
            <span className="label-mono text-[var(--primary)]">
              {project.industry}
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
              {project.name}
            </h1>
            <p className="mt-3 text-sm text-[var(--ink-muted)]">
              {project.overview}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--primary-deep)]"
                >
                  Visit project <ArrowRight className="h-4 w-4" />
                </a>
              )}
              <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--ink)]">
                {project.year}
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--ink)]">
                {project.result}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--ink-muted)]"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8">
              <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
                Challenge
              </h2>
              <p className="text-[15px] leading-relaxed text-[var(--ink-muted)]">
                {project.challenge}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8">
              <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
                Solution
              </h2>
              <p className="text-[15px] leading-relaxed text-[var(--ink)]">
                {project.solutionText}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8">
              <h2 className="mb-3 text-2xl font-semibold text-[var(--ink)]">
                Key Features
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((f) => (
                  <div
                    key={f}
                    className="rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)]"
                  >
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
              <h3 className="mb-2 text-sm font-semibold text-[var(--ink)]">
                Project Details
              </h3>
              <ul className="text-sm text-[var(--ink-muted)] space-y-2">
                <li>
                  <strong className="text-[var(--ink)]">Client:</strong>{" "}
                  {project.client}
                </li>
                <li>
                  <strong className="text-[var(--ink)]">Category:</strong>{" "}
                  {project.category}
                </li>
                <li>
                  <strong className="text-[var(--ink)]">Year:</strong>{" "}
                  {project.year}
                </li>
                <li>
                  <strong className="text-[var(--ink)]">Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
              <h3 className="mb-2 text-sm font-semibold text-[var(--ink)]">
                Result
              </h3>
              <p className="text-sm text-[var(--ink-muted)]">
                {project.result}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
            Key Features
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.keyFeatures.map((f) => (
              <div
                key={f}
                className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4 text-center text-sm text-[var(--ink)] font-medium"
              >
                {f}
              </div>
            ))}
          </div>

          <h2 className="mt-14 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
            Technologies Used
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="label-mono rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-[var(--ink-muted)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-14 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--success)]" />
            <p className="text-sm text-[var(--ink-muted)]">
              <span className="font-medium text-[var(--ink)]">Result: </span>
              {project.result}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)]">
            Related Projects
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={
                      p.coverImageUrl
                        ? {
                            backgroundImage: `url(${p.coverImageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : { background: p.gradient }
                    }
                  />
                </div>
                <h3 className="mt-3 flex items-center gap-1.5 font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--primary)] transition-colors">
                  {p.name}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title="Ready for a project like this?"
        description="Share your brief and we’ll recommend the most effective web or growth solution for your business."
      />
    </>
  );
}

