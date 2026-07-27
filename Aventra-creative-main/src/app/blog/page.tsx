import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/page-header";
import { PageCta } from "@/components/marketing/page-cta";
import { sanityImageUrl } from "@/lib/sanity/image";
import { POSTS } from "@/lib/data/posts";
import { fetchPosts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, insights and strategies on web development, SEO, branding, and digital marketing — from the Aventra Creative team. India-based agency, publishing worldwide.",
  alternates: { canonical: "/blog" },
  keywords: [
    "web development tips",
    "SEO strategies India",
    "digital marketing insights",
    "website design blog",
    "Aventra Creative blog",
  ],
  openGraph: {
    title: "Blog | Aventra Creative",
    description:
      "Tips, insights and strategies on web development, SEO, and digital marketing from Aventra Creative.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default async function BlogPage() {
  const [featured, ...rest] = await fetchPosts(POSTS);
  const featuredImageUrl = sanityImageUrl(featured.mainImageUrl, { width: 1200 });

  return (
    <>
      <PageHeader
        eyebrow="Our Blog"
        title="Insights, Tips & Strategies."
        description="Stay updated with the latest trends, tips, and insights on web design, development, and SEO."
        crumbs={[{ name: "Home", href: "/" }, { name: "Blog" }]}
      />

      <section className="bg-[var(--bg)] pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              {featuredImageUrl ? (
                <Image
                  src={featuredImageUrl}
                  alt={featured.mainImageAlt ?? featured.title}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: featured.gradient }}
                />
              )}
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="label-mono text-[var(--primary)]">
                {featured.category} · Featured
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[var(--ink)] transition-colors group-hover:text-[var(--primary)]">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-3 text-xs text-[var(--ink-faint)]">
                <span>{featured.author}</span>
                <span>·</span>
                <span>
                  {new Date(featured.date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {rest.map((p) => {
              const thumbUrl = sanityImageUrl(p.mainImageUrl, {
                width: 128,
                height: 128,
              });
              return (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card group flex items-center gap-5 p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/30"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  {thumbUrl ? (
                    <Image
                      src={thumbUrl}
                      alt={p.mainImageAlt ?? p.title}
                      fill
                      unoptimized
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      style={{ background: p.gradient }}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="label-mono text-[var(--primary)]">
                    {p.category}
                  </span>
                  <h3 className="mt-1 truncate font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--primary)]">
                    {p.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--ink-faint)]">
                    <span>
                      {new Date(p.date).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                </div>
                <span className="hidden shrink-0 text-sm font-semibold text-[var(--primary)] sm:block">
                  Read More →
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
