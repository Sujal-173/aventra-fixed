import type { Metadata } from 'next'
import { PageCta } from '@/components/marketing/page-cta'
import { PageHeader } from '@/components/marketing/page-header'
import { PortfolioGrid } from '@/components/marketing/portfolio-grid'
import { PROJECTS } from '@/lib/data/projects'
import { fetchProjects } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Browse founder-led case studies and premium digital work from Aventra Creative — websites, SEO, and brand systems built to drive growth.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Our Portfolio | Aventra Creative',
    description:
      'Websites, e-commerce, SEO, and branding projects built by Aventra Creative for businesses that want more than a standard site.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
}

export default async function PortfolioPage() {
  const projects = await fetchProjects(PROJECTS)
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Our portfolio"
        description="Browse curated case studies for websites, e-commerce, SEO, and brand systems created to move businesses forward."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Portfolio' }]}
      />
      <PortfolioGrid projects={projects} />
      <PageCta
        title="Got a digital project to launch?"
        description="We turn business goals into polished websites, conversion pathways and growth systems."
      />
    </>
  )
}
