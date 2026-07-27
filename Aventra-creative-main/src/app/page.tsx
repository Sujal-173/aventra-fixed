import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { TechStrip } from "@/components/marketing/tech-strip";
import { CoreServices } from "@/components/marketing/core-services";
import { MiniStatsBar } from "@/components/marketing/mini-stats-bar";
import { FeaturedWork } from "@/components/marketing/featured-work";
import { ProcessTeaser } from "@/components/marketing/process-teaser";
import { TestimonialStrip } from "@/components/marketing/testimonial-strip";
import { CtaSection } from "@/components/marketing/cta-section";
import { SERVICES } from "@/lib/data/services";
import { PROJECTS } from "@/lib/data/projects";
import { fetchProjects, fetchServices } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Aventra Creative — We Build Digital Experiences",
  description:
    "Aventra Creative builds premium websites, SEO, and growth systems that help businesses attract, engage, and convert customers.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [services, projects] = await Promise.all([
    fetchServices(SERVICES),
    fetchProjects(PROJECTS),
  ]);
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const featuredForHome = featured.length ? featured : projects.slice(0, 4);
  return (
    <>
      <Hero />
      <TechStrip />
      <CoreServices services={services} />
      <div className="mx-auto -mt-6 max-w-7xl px-6 pb-6 lg:px-8">
        <MiniStatsBar />
      </div>
      <FeaturedWork projects={featuredForHome} />
      {/* ProcessTeaser: shows our build-log workflow between work and testimonials */}
      <ProcessTeaser />
      <TestimonialStrip />
      {/* CtaSection: dark-bg CTA block — replaces the lighter PageCta */}
      <CtaSection />
    </>
  );
}
