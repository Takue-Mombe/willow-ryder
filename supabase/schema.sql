create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key,
  business_name text not null,
  business_tagline text not null,
  business_description text not null,
  phone text not null,
  whatsapp text not null,
  email text not null,
  street_address text not null,
  address_locality text not null,
  address_region text not null,
  address_country text not null default 'ZW',
  website_url text not null,
  founded_year text not null,
  hero_eyebrow text not null,
  hero_title_prefix text not null,
  hero_title_emphasis text not null,
  hero_title_suffix text not null,
  hero_description text not null,
  primary_cta_label text not null,
  primary_cta_href text not null,
  secondary_cta_label text not null,
  secondary_cta_href text not null,
  years_crafting text not null,
  projects_completed text not null,
  client_rating text not null,
  marquee_items jsonb not null default '[]'::jsonb,
  about_story text not null,
  about_story_secondary text not null,
  about_story_tertiary text not null,
  contact_intro text not null,
  seo_default_title text not null,
  seo_default_description text not null,
  seo_keywords text[] not null default '{}',
  og_image_url text not null default '/opengraph-image',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  full_description text not null,
  icon text not null default '✦',
  category text not null,
  bullets jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  sort_order integer not null default 0,
  seo_title text not null,
  seo_description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  description text not null,
  category text not null,
  location text not null,
  year text not null,
  featured boolean not null default false,
  sort_order integer not null default 0,
  challenge text not null,
  solution text not null,
  image_url text not null default '',
  palette jsonb not null default '[]'::jsonb,
  materials jsonb not null default '[]'::jsonb,
  metrics jsonb not null default '[]'::jsonb,
  seo_title text not null,
  seo_description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  company text not null,
  location text not null,
  quote text not null,
  rating integer not null default 5,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  read_time text not null,
  featured boolean not null default false,
  published_at date not null default current_date,
  cover_accent text not null default '#C4956A',
  seo_title text not null,
  seo_description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null default '',
  service text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.inquiries enable row level security;

create or replace function public.is_admin(user_uuid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = user_uuid
  );
$$;

drop policy if exists "Admins can read admin_users" on public.admin_users;
create policy "Admins can read admin_users"
on public.admin_users
for select
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage services" on public.services;
create policy "Admins can manage services"
on public.services
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read services" on public.services;
create policy "Public can read services"
on public.services
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects"
on public.projects
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
on public.projects
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage testimonials" on public.testimonials;
create policy "Admins can manage testimonials"
on public.testimonials
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read testimonials" on public.testimonials;
create policy "Public can read testimonials"
on public.testimonials
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage blog posts" on public.blog_posts;
create policy "Admins can manage blog posts"
on public.blog_posts
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read blog posts" on public.blog_posts;
create policy "Public can read blog posts"
on public.blog_posts
for select
to anon, authenticated
using (true);

drop policy if exists "Public can submit inquiries" on public.inquiries;
create policy "Public can submit inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries"
on public.inquiries
for select
to authenticated
using (public.is_admin(auth.uid()));

insert into public.site_settings (
  id,
  business_name,
  business_tagline,
  business_description,
  phone,
  whatsapp,
  email,
  street_address,
  address_locality,
  address_region,
  address_country,
  website_url,
  founded_year,
  hero_eyebrow,
  hero_title_prefix,
  hero_title_emphasis,
  hero_title_suffix,
  hero_description,
  primary_cta_label,
  primary_cta_href,
  secondary_cta_label,
  secondary_cta_href,
  years_crafting,
  projects_completed,
  client_rating,
  marquee_items,
  about_story,
  about_story_secondary,
  about_story_tertiary,
  contact_intro,
  seo_default_title,
  seo_default_description,
  seo_keywords,
  og_image_url
) values (
  'site-settings-default',
  'Winmore Creations',
  'Bespoke carpentry, interior design, and luxury flooring in Victoria Falls, Zimbabwe.',
  'Winmore Creations is a Victoria Falls studio shaping spaces through bespoke carpentry, custom furniture, interior design, epoxy flooring, and wooden flooring for homes, lodges, offices, and hospitality brands across Zimbabwe.',
  '+263 78 000 0000',
  '+263 78 000 0000',
  'hello@winmorecreations.co.zw',
  'Victoria Falls',
  'Victoria Falls',
  'Matabeleland North',
  'ZW',
  'https://winmorecreations.co.zw',
  '2016',
  'Carpentry · Flooring · Interiors — Victoria Falls',
  'Craft that',
  'defines',
  'a space.',
  'Bespoke carpentry, luxury epoxy and wooden flooring, and transformative interior design - handcrafted in the heart of Victoria Falls for clients ready to build spaces with character.',
  'View Our Work',
  '/portfolio',
  'Free Consultation',
  '/contact',
  '8+',
  '200+',
  '4.9★',
  '["Bespoke Carpentry", "Epoxy Flooring", "Hardwood Floors", "Interior Design", "Custom Furniture", "Victoria Falls", "Zimbabwe Craftsmanship", "Commercial Fit-Outs"]'::jsonb,
  'Winmore Creations was born from a simple conviction: that the spaces we inhabit shape the lives we live. Founded in the Smoke That Thunders, our studio blends the raw beauty of the Zambezi with precision craftsmanship passed down through generations.',
  'From a small workshop on the edge of town, we have grown into a trusted Victoria Falls carpentry and interior design studio serving homeowners, lodges, restaurants, and offices across Zimbabwe with the same care whether the brief is a single chair or a full commercial fit-out.',
  'Every joint, every finish, every colour choice is made with intention. We do not do cookie-cutter. We do your space, done right.',
  'Ready to transform your space? Tell us about your project and we will get back to you within 24 hours with ideas, timelines, and a no-obligation quote.',
  'Winmore Creations | Bespoke Carpentry, Interior Design & Flooring in Victoria Falls, Zimbabwe',
  'Winmore Creations is Victoria Falls'' premium carpentry and interior design studio. We craft bespoke furniture, epoxy floors, wooden floors, custom desks, chairs, and full interior transformations across Zimbabwe.',
  array[
    'carpentry Victoria Falls',
    'interior design Victoria Falls Zimbabwe',
    'epoxy flooring Victoria Falls',
    'wooden flooring Zimbabwe',
    'bespoke furniture Zimbabwe'
  ],
  '/opengraph-image'
) on conflict (id) do nothing;
