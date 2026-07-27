import type {MetadataRoute} from 'next'
import {POSTS} from '@/lib/data/posts'
import {PROJECTS} from '@/lib/data/projects'
import {SERVICES} from '@/lib/data/services'
import {fetchPosts, fetchProjects, fetchServices} from '@/lib/sanity/queries'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aventracreative.com'

// CMS entries appear in search engines within an hour while still working before content is imported.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, posts] = await Promise.all([
    fetchServices(SERVICES),
    fetchProjects(PROJECTS),
    fetchPosts(POSTS),
  ])
  const now = new Date()
  const staticRoutes = ['', '/services', '/portfolio', '/about', '/process', '/pricing', '/blog', '/contact', '/faq', '/careers', '/privacy', '/terms']
    .map((route) => ({url: `${base}${route}`, lastModified: now}))

  return [
    ...staticRoutes,
    ...services.map((service) => ({url: `${base}/services/${service.slug}`, lastModified: now})),
    ...projects.map((project) => ({url: `${base}/portfolio/${project.slug}`, lastModified: now})),
    ...posts.map((post) => ({url: `${base}/blog/${post.slug}`, lastModified: new Date(post.date)})),
  ]
}
