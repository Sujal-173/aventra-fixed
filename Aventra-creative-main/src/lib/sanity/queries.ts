import { sanityFetch } from "./client";
import type { Service } from "@/lib/data/services";
import type { Project } from "@/lib/data/projects";
import type { Post } from "@/lib/data/posts";

const servicesQuery = '*[_type == "service" && defined(slug.current)] | order(name asc) { "slug": slug.current, name, shortDesc, color, icon, problem, solution, benefits, features, technology, timeline, deliverables, faq }';
const projectsQuery = '*[_type == "project" && defined(slug.current)] | order(coalesce(orderRank, 999) asc, year desc) { "slug": slug.current, name, client, industry, category, services, year, result, overview, gradient, challenge, solutionText, keyFeatures, technologies, "coverImageUrl": coverImage.asset->url, "coverImageAlt": coverImage.alt, projectUrl, featured, orderRank }';
const postsQuery = '*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, date) desc) { "slug": slug.current, title, excerpt, "category": coalesce(category->title, category), "date": coalesce(publishedAt, date), "readTime": coalesce(readTime, "5 min read"), "author": coalesce(author->name, author), gradient, "mainImageUrl": mainImage.asset->url, "mainImageAlt": coalesce(mainImage.alt, title), "mainImageDimensions": mainImage.asset->metadata.dimensions, "body": coalesce(body[]{ ..., _type == "image" => { "imageUrl": asset->url, "imageDimensions": asset->metadata.dimensions } }, content), "seoTitle": seo.title, "seoDescription": seo.description }';

export const fetchServices = (fallback: Service[]) => sanityFetch<Service[]>(servicesQuery, fallback);
export const fetchProjects = (fallback: Project[]) => sanityFetch<Project[]>(projectsQuery, fallback);
export const fetchPosts = (fallback: Post[]) => sanityFetch<Post[]>(postsQuery, fallback);
