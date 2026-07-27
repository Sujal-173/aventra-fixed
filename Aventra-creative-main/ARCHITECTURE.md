# Aventra Creative — Architecture

## Overview

Aventra Creative is a Next.js App Router website for a creative agency. The application combines statically defined marketing content with Sanity CMS content, route-based SEO metadata, and server-side API handlers for enquiries and newsletter subscriptions.

## Application layers

```text
Browser
  └─ Next.js pages and marketing components
       ├─ Local data modules for services, projects, and posts
       ├─ Sanity client and GROQ queries for CMS content
       └─ Form components
            └─ Next.js API routes
                 └─ Zod validation → Resend email/contact APIs
```

### Routes

| Area | Routes |
| --- | --- |
| Marketing | `/`, `/about`, `/services`, `/process`, `/pricing`, `/portfolio`, `/contact`, `/faq`, `/careers` |
| Detail pages | `/services/[slug]`, `/portfolio/[slug]`, `/blog/[slug]` |
| Supporting pages | `/blog`, `/careers/apply`, `/privacy`, `/terms`, `/studio` |
| APIs | `/api/contact`, `/api/careers`, `/api/newsletter` |
| SEO | `sitemap.ts`, `robots.ts`, route-level metadata |

## Source organization

```text
src/app/                    Route segments, route handlers, global layout
src/components/marketing/   Reusable page sections and navigation
src/components/careers/     Career application UI
src/components/emails/      React Email templates
src/components/ui/          Reusable UI primitives
src/lib/data/               Local fallback/service/project/post data
src/lib/sanity/             Sanity client and GROQ queries
src/lib/validations/        Shared Zod schemas for API validation
src/sanity/                 Studio utilities, schemas, and structure
schemaTypes/                Sanity schema entry point
```

## Content and CMS

Sanity is configured through `sanity.config.ts` and the schemas under `src/sanity/schemaTypes`. The frontend accesses CMS content through `src/lib/sanity/client.ts` and `src/lib/sanity/queries.ts`. Local data modules provide stable content for pages that do not require CMS data.

The embedded Studio is served under `/studio`; Sanity's API endpoint is available under `/api/studio/[[...tool]]`.

## Forms and email

Client form components submit to Next.js route handlers. Every handler validates incoming data using Zod before using Resend:

- `contact/route.ts` sends contact enquiries.
- `careers/route.ts` processes career applications.
- `newsletter/route.ts` adds subscribers to the configured Resend audience.

All secrets remain server-only in `.env.local` or the deployment platform's environment settings.

## Styling and motion

Global styles and design tokens live in `src/app/globals.css`. The site uses Tailwind CSS alongside component styling. Framer Motion supports component interactions, while GSAP is available for scroll-driven sequences. Font packages provide Inter, Space Grotesk, and JetBrains Mono.

## SEO and operations

`layout.tsx` establishes shared metadata and document structure. `sitemap.ts` builds the site sitemap and `robots.ts` controls crawler access. `NEXT_PUBLIC_SITE_URL` must be configured with the production canonical URL so generated SEO URLs are correct.

## Boundaries

- Public configuration may use `NEXT_PUBLIC_*` variables.
- Resend keys and optional Sanity API tokens must remain server-only.
- Build output in `.next/` and installed packages in `node_modules/` are intentionally ignored by Git.
- New API routes should validate input at the boundary and keep integration code in `src/lib/` when it is reusable.
