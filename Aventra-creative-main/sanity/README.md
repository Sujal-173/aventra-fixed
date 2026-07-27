# Sanity setup

Create a Sanity project and add these server-only variables to `.env.local` and your deployment environment:

```env
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_TOKEN=optional-read-token
```

Create `service`, `project`, and `post` documents whose fields match the TypeScript types in `src/lib/data`. The fetch helpers in `src/lib/sanity/queries.ts` query those document types and safely fall back to the local content arrays while the dataset is empty or unavailable.

When migrating a page, use `fetchServices(SERVICES)`, `fetchProjects(PROJECTS)`, or `fetchPosts(POSTS)` in its server component. This keeps existing content live while making CMS content available immediately after publishing.
