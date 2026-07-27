import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { PageCta } from "@/components/marketing/page-cta";
import { SERVICES } from "@/lib/data/services";
import { fetchServices } from "@/lib/sanity/queries";

const ICONS = {
  code: Code2,
  search: Search,
  palette: Palette,
  megaphone: Megaphone,
  wrench: Wrench,
  "shopping-bag": ShoppingBag,
};

export const metadata: Metadata = {
  title: "Services",
  description:
    "Powerful digital solutions to grow your business online — web development, SEO, branding, e-commerce, digital marketing, and maintenance.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await fetchServices(SERVICES);
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Digital Services That Drive Your Business Forward."
        description="We offer end-to-end digital services to help your brand stand out, grow faster, and achieve real results."
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
      />

      <section className="bg-[var(--bg)] pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Code2;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="card group flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:shadow-[0_12px_30px_rgba(67,56,202,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${s.color}1f` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: s.color }} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[var(--ink-faint)] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h2 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--primary)] transition-colors">
                    {s.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {s.shortDesc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-4">
                    {s.technology.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="label-mono rounded-full border border-[var(--line)] px-2.5 py-1 text-[10px] text-[var(--ink-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <PageCta
        title="Have a Project in Mind?"
        description="Let's create something extraordinary together."
        buttonText="Start a Project"
      />
    </>
  );
}
