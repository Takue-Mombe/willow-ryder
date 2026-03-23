# Winmore Creations

Premium `Next.js` portfolio and CMS starter for a Victoria Falls carpentry studio.

## Stack

- `Next.js 16` App Router + TypeScript
- `Supabase` for auth, database, storage-ready content, and protected CMS
- Server-rendered SEO pages for services, projects, blog posts, and local discovery

## What is included

- Grounded editorial homepage inspired by the supplied visual references
- Interactive gallery page with craft journeys and filtered project wall
- Public pages for `About`, `Services`, `Portfolio`, `Blog`, and `Contact`
- Dynamic SEO pages for each service, project, and article
- Protected `/admin` dashboard for editing site settings, services, projects, posts, and testimonials
- Contact form wired to save inquiries to Supabase
- `robots.txt`, `sitemap.xml`, manifest, metadata, structured data, and an Open Graph image route

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Add your Supabase values to `.env.local`.

4. Run the schema in `supabase/schema.sql` inside the Supabase SQL editor.

5. Start the app:

```bash
pnpm dev
```

## Supabase setup

After creating your first auth user, add that user to `public.admin_users`:

```sql
insert into public.admin_users (user_id)
values ('your-auth-user-uuid');
```

Then sign in at `/login` and manage content at `/admin`.

## Notes

- The project ships with rich fallback content so the site works even before Supabase is connected.
- Once Supabase is configured, the public site reads database content and the CMS writes back to the same tables.
- Placeholder brand/contact details can be replaced entirely from the admin dashboard.
