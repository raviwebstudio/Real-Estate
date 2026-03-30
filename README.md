# Gurgaon Residences

Premium, scalable real estate platform for residential and luxury properties in Gurgaon, India.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- Sharp image processing

## Features

- Premium multi-page public site
- Dynamic property, project, builder, blog, and sector routes
- SEO landing pages for Gurgaon intent clusters
- XML sitemap, HTML sitemap, robots, metadata, and schema
- Lead capture with database storage
- Admin CMS for builders, projects, properties, blog posts, and leads
- Multi-image property uploads with WebP conversion and orientation-aware gallery layout

## Local setup

1. Install dependencies:
   `npm install`
2. Create the database:
   `npm run db:push`
3. Seed Gurgaon sample content:
   `npm run db:seed`
4. Start the app:
   `npm run dev`

## Admin access

- URL: `/admin/login`
- Default email: `admin@gurgaonresidences.com`
- Default password: `ChangeMe123!`

Update the values in `.env` before any real deployment.

## Production checks

- TypeScript: `npm run typecheck`
- Lint: `npm run lint`
- Production build: `npm run build`
