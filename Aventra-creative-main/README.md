# Aventra Creative

The source for the Aventra Creative agency website. It is a TypeScript and Next.js App Router application with Sanity-powered content, Resend-backed enquiries, and an embedded Sanity Studio.

## Stack

- Next.js 16, React 19, and TypeScript
- Tailwind CSS 4 and component-level Framer Motion / GSAP animation
- Sanity CMS with an embedded Studio at `/studio`
- Zod validation and React Hook Form
- Resend for contact, career, and newsletter email flows
- Cloudinary utilities for media delivery

## Getting started

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The local Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Environment variables

Copy `.env.example` to `.env.local` and provide values for the integrations you enable.

| Group | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public site URL used for SEO metadata and sitemaps. |
| `NEXT_PUBLIC_CONTACT_*` and social URLs | Public contact details and social links. |
| `NEXT_PUBLIC_SANITY_*`, `SANITY_*` | Sanity project, dataset, API version, and optional read token. |
| `RESEND_*`, `CONTACT_EMAIL` | Sending address, contact recipient, and newsletter audience. |

Never commit `.env.local` or production credentials.

## Commands

```bash
npm run dev         # Start the development server
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript without emitting files
npm run build       # Create a production build
npm run check       # Run lint and build together
npm run start       # Serve a production build
```

## Project structure

```text
src/
  app/            # Pages, route handlers, metadata, sitemap, robots
  components/     # Marketing, UI, email, and career components
  lib/            # Data, integrations, validation, and shared utilities
  sanity/         # Sanity client, schemas, and Studio configuration
sanity/           # Sanity CLI configuration and project documentation
public/images/    # Local public image assets
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for routing, content, and integration details.

## Deployment

1. Add the production values from `.env.example` to your hosting provider.
2. Verify the domain configured in `RESEND_FROM_EMAIL` in Resend.
3. Add the deployed domain and `http://localhost:3000` to Sanity CORS origins.
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain.
5. Run `npm run check` before deploying.

