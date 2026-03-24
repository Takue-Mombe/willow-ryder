import { checkAdminAccess } from "@/lib/admin-access";
import { fallbackBlogPosts, fallbackJourneys, fallbackProjects, fallbackServices, fallbackSiteSettings, fallbackTestimonials } from "@/lib/fallback-data";
import { attachBlogPostMedia, attachProjectMedia, attachServiceMedia, getFeaturedMedia } from "@/lib/media-library";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BlogPost, JourneyTheme, Project, Service, SiteSettings, Testimonial, TitledItem } from "@/lib/types";

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => String(item)).filter(Boolean)
    : [];
}

function asTitledItems(value: unknown, fallbackItems: TitledItem[]) {
  if (!Array.isArray(value)) {
    return fallbackItems;
  }

  const items = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;

      return {
        title: String(record.title ?? "").trim(),
        description: String(record.description ?? "").trim(),
      };
    })
    .filter((item): item is TitledItem => Boolean(item?.title && item.description));

  return items.length ? items : fallbackItems;
}

function sortByOrder<T extends { sortOrder: number }>(items: T[]) {
  return [...items].sort((left, right) => left.sortOrder - right.sortOrder);
}

function sortByPublishedDate(posts: BlogPost[]) {
  return [...posts].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

function mergeCollections<T>(
  fallbackItems: T[],
  liveItems: T[],
  getKey: (item: T) => string,
) {
  const merged = new Map<string, T>();

  fallbackItems.forEach((item) => {
    merged.set(getKey(item), item);
  });

  liveItems.forEach((item) => {
    merged.set(getKey(item), item);
  });

  return [...merged.values()];
}

function mapSiteSettings(row: Record<string, unknown>): SiteSettings {
  return {
    id: String(row.id ?? fallbackSiteSettings.id),
    businessName: String(row.business_name ?? fallbackSiteSettings.businessName),
    businessTagline: String(
      row.business_tagline ?? fallbackSiteSettings.businessTagline,
    ),
    businessDescription: String(
      row.business_description ?? fallbackSiteSettings.businessDescription,
    ),
    phone: String(row.phone ?? fallbackSiteSettings.phone),
    whatsapp: String(row.whatsapp ?? fallbackSiteSettings.whatsapp),
    email: String(row.email ?? fallbackSiteSettings.email),
    streetAddress: String(
      row.street_address ?? fallbackSiteSettings.streetAddress,
    ),
    addressLocality: String(
      row.address_locality ?? fallbackSiteSettings.addressLocality,
    ),
    addressRegion: String(
      row.address_region ?? fallbackSiteSettings.addressRegion,
    ),
    addressCountry: String(
      row.address_country ?? fallbackSiteSettings.addressCountry,
    ),
    websiteUrl: String(row.website_url ?? fallbackSiteSettings.websiteUrl),
    foundedYear: String(row.founded_year ?? fallbackSiteSettings.foundedYear),
    heroEyebrow: String(row.hero_eyebrow ?? fallbackSiteSettings.heroEyebrow),
    heroTitlePrefix: String(
      row.hero_title_prefix ?? fallbackSiteSettings.heroTitlePrefix,
    ),
    heroTitleEmphasis: String(
      row.hero_title_emphasis ?? fallbackSiteSettings.heroTitleEmphasis,
    ),
    heroTitleSuffix: String(
      row.hero_title_suffix ?? fallbackSiteSettings.heroTitleSuffix,
    ),
    heroDescription: String(
      row.hero_description ?? fallbackSiteSettings.heroDescription,
    ),
    heroQuote: String(row.hero_quote ?? fallbackSiteSettings.heroQuote),
    heroLocationText: String(
      row.hero_location_text ?? fallbackSiteSettings.heroLocationText,
    ),
    heroMediaUrl: String(
      row.hero_media_url ?? fallbackSiteSettings.heroMediaUrl,
    ),
    primaryCtaLabel: String(
      row.primary_cta_label ?? fallbackSiteSettings.primaryCtaLabel,
    ),
    primaryCtaHref: String(
      row.primary_cta_href ?? fallbackSiteSettings.primaryCtaHref,
    ),
    secondaryCtaLabel: String(
      row.secondary_cta_label ?? fallbackSiteSettings.secondaryCtaLabel,
    ),
    secondaryCtaHref: String(
      row.secondary_cta_href ?? fallbackSiteSettings.secondaryCtaHref,
    ),
    yearsCrafting: String(
      row.years_crafting ?? fallbackSiteSettings.yearsCrafting,
    ),
    projectsCompleted: String(
      row.projects_completed ?? fallbackSiteSettings.projectsCompleted,
    ),
    clientRating: String(
      row.client_rating ?? fallbackSiteSettings.clientRating,
    ),
    servicesSectionTitle: String(
      row.services_section_title ?? fallbackSiteSettings.servicesSectionTitle,
    ),
    servicesSectionSubtitle: String(
      row.services_section_subtitle ?? fallbackSiteSettings.servicesSectionSubtitle,
    ),
    servicesSectionCtaLabel: String(
      row.services_section_cta_label ?? fallbackSiteSettings.servicesSectionCtaLabel,
    ),
    servicesSectionCtaHref: String(
      row.services_section_cta_href ?? fallbackSiteSettings.servicesSectionCtaHref,
    ),
    portfolioSectionTitle: String(
      row.portfolio_section_title ?? fallbackSiteSettings.portfolioSectionTitle,
    ),
    portfolioSectionSubtitle: String(
      row.portfolio_section_subtitle ?? fallbackSiteSettings.portfolioSectionSubtitle,
    ),
    portfolioSectionCtaLabel: String(
      row.portfolio_section_cta_label ?? fallbackSiteSettings.portfolioSectionCtaLabel,
    ),
    portfolioSectionCtaHref: String(
      row.portfolio_section_cta_href ?? fallbackSiteSettings.portfolioSectionCtaHref,
    ),
    aboutSectionTitle: String(
      row.about_section_title ?? fallbackSiteSettings.aboutSectionTitle,
    ),
    aboutMediaUrl: String(
      row.about_media_url ?? fallbackSiteSettings.aboutMediaUrl,
    ),
    aboutValues: asTitledItems(
      row.about_values,
      fallbackSiteSettings.aboutValues,
    ),
    studioFilmTitle: String(
      row.studio_film_title ?? fallbackSiteSettings.studioFilmTitle,
    ),
    studioFilmDescription: String(
      row.studio_film_description ?? fallbackSiteSettings.studioFilmDescription,
    ),
    storyMediaUrl: String(
      row.story_media_url ?? fallbackSiteSettings.storyMediaUrl,
    ),
    processSectionTitle: String(
      row.process_section_title ?? fallbackSiteSettings.processSectionTitle,
    ),
    processSectionSubtitle: String(
      row.process_section_subtitle ?? fallbackSiteSettings.processSectionSubtitle,
    ),
    processSteps: asTitledItems(
      row.process_steps,
      fallbackSiteSettings.processSteps,
    ),
    testimonialsSectionTitle: String(
      row.testimonials_section_title ?? fallbackSiteSettings.testimonialsSectionTitle,
    ),
    testimonialsSectionSubtitle: String(
      row.testimonials_section_subtitle ?? fallbackSiteSettings.testimonialsSectionSubtitle,
    ),
    testimonialsRatingLabel: String(
      row.testimonials_rating_label ?? fallbackSiteSettings.testimonialsRatingLabel,
    ),
    testimonialsPrimaryCtaLabel: String(
      row.testimonials_primary_cta_label ??
        fallbackSiteSettings.testimonialsPrimaryCtaLabel,
    ),
    testimonialsPrimaryCtaHref: String(
      row.testimonials_primary_cta_href ??
        fallbackSiteSettings.testimonialsPrimaryCtaHref,
    ),
    blogSectionTitle: String(
      row.blog_section_title ?? fallbackSiteSettings.blogSectionTitle,
    ),
    blogSectionSubtitle: String(
      row.blog_section_subtitle ?? fallbackSiteSettings.blogSectionSubtitle,
    ),
    blogSectionCtaLabel: String(
      row.blog_section_cta_label ?? fallbackSiteSettings.blogSectionCtaLabel,
    ),
    blogSectionCtaHref: String(
      row.blog_section_cta_href ?? fallbackSiteSettings.blogSectionCtaHref,
    ),
    contactSectionTitle: String(
      row.contact_section_title ?? fallbackSiteSettings.contactSectionTitle,
    ),
    marqueeItems: asStringArray(
      row.marquee_items ?? fallbackSiteSettings.marqueeItems,
    ),
    aboutStory: String(row.about_story ?? fallbackSiteSettings.aboutStory),
    aboutStorySecondary: String(
      row.about_story_secondary ?? fallbackSiteSettings.aboutStorySecondary,
    ),
    aboutStoryTertiary: String(
      row.about_story_tertiary ?? fallbackSiteSettings.aboutStoryTertiary,
    ),
    contactIntro: String(
      row.contact_intro ?? fallbackSiteSettings.contactIntro,
    ),
    seoDefaultTitle: String(
      row.seo_default_title ?? fallbackSiteSettings.seoDefaultTitle,
    ),
    seoDefaultDescription: String(
      row.seo_default_description ?? fallbackSiteSettings.seoDefaultDescription,
    ),
    seoKeywords: asStringArray(
      row.seo_keywords ?? fallbackSiteSettings.seoKeywords,
    ),
    ogImageUrl: String(row.og_image_url ?? fallbackSiteSettings.ogImageUrl),
  };
}

function mapService(row: Record<string, unknown>): Service {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    shortDescription: String(row.short_description ?? ""),
    fullDescription: String(row.full_description ?? ""),
    icon: String(row.icon ?? "✦"),
    category: String(row.category ?? "Carpentry"),
    imageUrl: String(row.image_url ?? ""),
    bullets: asStringArray(row.bullets),
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order ?? 0),
    seoTitle: String(row.seo_title ?? row.title ?? ""),
    seoDescription: String(row.seo_description ?? row.short_description ?? ""),
  };
}

function mapProject(row: Record<string, unknown>): Project {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    summary: String(row.summary ?? ""),
    description: String(row.description ?? ""),
    category: String(row.category ?? "Project"),
    location: String(row.location ?? "Victoria Falls"),
    year: String(row.year ?? "2025"),
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order ?? 0),
    challenge: String(row.challenge ?? ""),
    solution: String(row.solution ?? ""),
    imageUrl: String(row.image_url ?? ""),
    palette: asStringArray(row.palette),
    materials: asStringArray(row.materials),
    metrics: asStringArray(row.metrics),
    seoTitle: String(row.seo_title ?? row.title ?? ""),
    seoDescription: String(row.seo_description ?? row.summary ?? ""),
  };
}

function mapTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    id: String(row.id),
    name: String(row.name),
    role: String(row.role ?? "Client"),
    company: String(row.company ?? ""),
    location: String(row.location ?? "Zimbabwe"),
    quote: String(row.quote ?? ""),
    rating: Number(row.rating ?? 5),
    sortOrder: Number(row.sort_order ?? 0),
  };
}

function mapBlogPost(row: Record<string, unknown>): BlogPost {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    category: String(row.category ?? "Insights"),
    readTime: String(row.read_time ?? "4 min read"),
    featured: Boolean(row.featured),
    publishedAt: String(row.published_at ?? new Date().toISOString()),
    coverAccent: String(row.cover_accent ?? "#C4956A"),
    coverImageUrl: String(row.cover_image_url ?? ""),
    seoTitle: String(row.seo_title ?? row.title ?? ""),
    seoDescription: String(row.seo_description ?? row.excerpt ?? ""),
  };
}

export async function getSiteSettings() {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return fallbackSiteSettings;
  }

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data ? mapSiteSettings(data) : fallbackSiteSettings;
}

export async function getServices() {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return attachServiceMedia(sortByOrder(fallbackServices));
  }

  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!data?.length) {
    return attachServiceMedia(sortByOrder(fallbackServices));
  }

  return attachServiceMedia(
    sortByOrder(
      mergeCollections(fallbackServices, data.map(mapService), (service) => service.slug),
    ),
  );
}

export async function getServiceBySlug(slug: string) {
  const services = await getServices();
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getProjects() {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return attachProjectMedia(sortByOrder(fallbackProjects));
  }

  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!data?.length) {
    return attachProjectMedia(sortByOrder(fallbackProjects));
  }

  return attachProjectMedia(
    sortByOrder(
      mergeCollections(fallbackProjects, data.map(mapProject), (project) => project.slug),
    ),
  );
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 5);
}

export async function getTestimonials() {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return sortByOrder(fallbackTestimonials);
  }

  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!data?.length) {
    return sortByOrder(fallbackTestimonials);
  }

  return sortByOrder(
    mergeCollections(
      fallbackTestimonials,
      data.map(mapTestimonial),
      (testimonial) => testimonial.id,
    ),
  );
}

export async function getBlogPosts() {
  const supabase = createSupabasePublicClient();

  if (!supabase) {
    return attachBlogPostMedia(sortByPublishedDate(fallbackBlogPosts));
  }

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (!data?.length) {
    return attachBlogPostMedia(sortByPublishedDate(fallbackBlogPosts));
  }

  return attachBlogPostMedia(
    sortByPublishedDate(
      mergeCollections(fallbackBlogPosts, data.map(mapBlogPost), (post) => post.slug),
    ),
  );
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getJourneyThemes(): JourneyTheme[] {
  return fallbackJourneys;
}

export async function getAdminContext() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      configured: false,
      isAuthenticated: false,
      isAdmin: false,
      userId: null as string | null,
      email: null as string | null,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      configured: true,
      isAuthenticated: false,
      isAdmin: false,
      userId: null as string | null,
      email: null as string | null,
    };
  }

  return {
    configured: true,
    isAuthenticated: true,
    isAdmin: await checkAdminAccess(supabase, user),
    userId: user.id,
    email: user.email ?? null,
  };
}

export async function getHomePageBundle() {
  const siteSettings = await getSiteSettings();
  const [services, featuredProjects, testimonials, blogPosts, featuredMedia] =
    await Promise.all([
      getServices(),
      getFeaturedProjects(),
      getTestimonials(),
      getBlogPosts(),
      getFeaturedMedia(siteSettings),
    ]);

  return {
    siteSettings,
    services,
    featuredProjects,
    testimonials,
    blogPosts: blogPosts.slice(0, 3),
    featuredMedia,
  };
}

export async function getAllPublicSlugs() {
  const [services, projects, blogPosts] = await Promise.all([
    getServices(),
    getProjects(),
    getBlogPosts(),
  ]);

  return {
    services: services.map((service) => service.slug),
    projects: projects.map((project) => project.slug),
    blogPosts: blogPosts.map((post) => post.slug),
  };
}
