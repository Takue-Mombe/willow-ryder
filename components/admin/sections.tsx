import Link from "next/link";

import {
  deleteMediaAssetAction,
  deletePostAction,
  deleteProjectAction,
  deleteServiceAction,
  deleteTeamMemberAction,
  deleteTestimonialAction,
  savePostAction,
  saveProjectAction,
  saveServiceAction,
  saveSiteSettingsAction,
  saveTeamMemberAction,
  saveTestimonialAction,
  uploadMediaAssetAction,
} from "@/app/admin/actions";
import { LogoutButton } from "@/components/auth/logout-button";
import { MediaFrame } from "@/components/site/media-frame";
import type {
  BlogPost,
  MediaAssetRecord,
  Project,
  Service,
  SiteSettings,
  StudioAsset,
  TeamMember,
  Testimonial,
  TitledItem,
} from "@/lib/types";

type AdminShellProps = {
  children: React.ReactNode;
  email: string | null;
  status?: string;
  title: string;
  description: string;
};

type SharedAdminData = {
  archiveAssets: StudioAsset[];
  mediaAssets: MediaAssetRecord[];
};

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/site", label: "Site" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

function joinLines(items: string[]) {
  return items.join("\n");
}

function joinTitledLines(items: TitledItem[]) {
  return items.map((item) => `${item.title} :: ${item.description}`).join("\n");
}

export function StatusBanner({ status }: { status?: string }) {
  if (!status) {
    return null;
  }

  return <p className="admin-status">Saved: {status.replaceAll("-", " ")}</p>;
}

export function AdminShell({ children, email, status, title, description }: AdminShellProps) {
  return (
    <main className="admin-shell shell">
      <div className="admin-shell__header">
        <div>
          <span className="section-label">Protected CMS</span>
          <h1 className="section-title">{title}</h1>
          <p className="admin-shell__copy">
            {description} Signed in as {email ?? "admin"}.
          </p>
        </div>
        <LogoutButton />
      </div>

      <nav aria-label="Admin sections" className="admin-nav">
        {adminLinks.map((link) => (
          <Link className="admin-nav__link" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <StatusBanner status={status} />
      {children}
    </main>
  );
}

function MediaPickerField({
  assets,
  label,
  name,
  value,
}: {
  assets: StudioAsset[];
  label: string;
  name: string;
  value: string;
}) {
  const listId = `${name}-options`;

  return (
    <label>
      {label}
      <input defaultValue={value} list={listId} name={name} type="text" />
      <datalist id={listId}>
        {assets.map((asset) => (
          <option key={`${name}-${asset.id}`} value={asset.src} label={`${asset.title} (${asset.source ?? "public"})`} />
        ))}
      </datalist>
      <small className="admin-field-help">Choose an existing asset or paste any valid image/video URL.</small>
    </label>
  );
}

export function AdminOverview({
  blogPosts,
  mediaAssets,
  projects,
  services,
  teamMembers,
  testimonials,
}: {
  blogPosts: BlogPost[];
  mediaAssets: MediaAssetRecord[];
  projects: Project[];
  services: Service[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
}) {
  const cards = [
    { href: "/admin/site", label: "Site Settings", value: "Brand, SEO, about, contact" },
    { href: "/admin/team", label: "Team", value: `${teamMembers.length} team profiles` },
    { href: "/admin/media", label: "Media", value: `${mediaAssets.length} uploaded assets` },
    { href: "/admin/services", label: "Services", value: `${services.length} services` },
    { href: "/admin/projects", label: "Projects", value: `${projects.length} projects` },
    { href: "/admin/blog", label: "Blog", value: `${blogPosts.length} posts` },
    { href: "/admin/testimonials", label: "Testimonials", value: `${testimonials.length} reviews` },
  ];

  return (
    <section className="admin-panel">
      <div className="admin-panel__intro">
        <h2>Content Areas</h2>
        <p>Each section now has its own page so editing stays focused and easier to manage.</p>
      </div>

      <div className="admin-overview-grid">
        {cards.map((card) => (
          <Link className="admin-overview-card" href={card.href} key={card.href}>
            <strong>{card.label}</strong>
            <span>{card.value}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SiteSettingsSection({
  archiveAssets,
  siteSettings,
}: SharedAdminData & { siteSettings: SiteSettings }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel__intro">
        <h2>Site Settings</h2>
        <p>Business identity, homepage hero, About copy, contact details, SEO, and brand logo.</p>
      </div>

      <form action={saveSiteSettingsAction} className="admin-form admin-form--wide">
        <input name="id" type="hidden" value={siteSettings.id} />
        <div className="admin-grid admin-grid--two">
          <label>
            Business name
            <input defaultValue={siteSettings.businessName} name="business_name" type="text" />
          </label>
          <MediaPickerField assets={archiveAssets} label="Logo URL" name="logo_url" value={siteSettings.logoUrl} />
          <label>
            Website URL
            <input defaultValue={siteSettings.websiteUrl} name="website_url" type="text" />
          </label>
          <label>
            Phone
            <input defaultValue={siteSettings.phone} name="phone" type="text" />
          </label>
          <label>
            WhatsApp
            <input defaultValue={siteSettings.whatsapp} name="whatsapp" type="text" />
          </label>
          <label>
            Email
            <input defaultValue={siteSettings.email} name="email" type="email" />
          </label>
          <label>
            Founded year
            <input defaultValue={siteSettings.foundedYear} name="founded_year" type="text" />
          </label>
          <label>
            Street address
            <input defaultValue={siteSettings.streetAddress} name="street_address" type="text" />
          </label>
          <label>
            Locality
            <input defaultValue={siteSettings.addressLocality} name="address_locality" type="text" />
          </label>
          <label>
            Region
            <input defaultValue={siteSettings.addressRegion} name="address_region" type="text" />
          </label>
          <label>
            Country code
            <input defaultValue={siteSettings.addressCountry} name="address_country" type="text" />
          </label>
          <label>
            Hero prefix
            <input defaultValue={siteSettings.heroTitlePrefix} name="hero_title_prefix" type="text" />
          </label>
          <label>
            Hero emphasis
            <input defaultValue={siteSettings.heroTitleEmphasis} name="hero_title_emphasis" type="text" />
          </label>
          <label>
            Hero suffix
            <input defaultValue={siteSettings.heroTitleSuffix} name="hero_title_suffix" type="text" />
          </label>
          <label>
            Hero eyebrow
            <input defaultValue={siteSettings.heroEyebrow} name="hero_eyebrow" type="text" />
          </label>
          <MediaPickerField assets={archiveAssets} label="Hero media" name="hero_media_url" value={siteSettings.heroMediaUrl} />
          <label>
            Hero quote
            <input defaultValue={siteSettings.heroQuote} name="hero_quote" type="text" />
          </label>
          <label>
            Hero location label
            <input defaultValue={siteSettings.heroLocationText} name="hero_location_text" type="text" />
          </label>
          <label>
            Primary CTA label
            <input defaultValue={siteSettings.primaryCtaLabel} name="primary_cta_label" type="text" />
          </label>
          <label>
            Primary CTA href
            <input defaultValue={siteSettings.primaryCtaHref} name="primary_cta_href" type="text" />
          </label>
          <label>
            Secondary CTA label
            <input defaultValue={siteSettings.secondaryCtaLabel} name="secondary_cta_label" type="text" />
          </label>
          <label>
            Secondary CTA href
            <input defaultValue={siteSettings.secondaryCtaHref} name="secondary_cta_href" type="text" />
          </label>
          <label>
            Years crafting
            <input defaultValue={siteSettings.yearsCrafting} name="years_crafting" type="text" />
          </label>
          <label>
            Projects completed
            <input defaultValue={siteSettings.projectsCompleted} name="projects_completed" type="text" />
          </label>
          <label>
            Client rating
            <input defaultValue={siteSettings.clientRating} name="client_rating" type="text" />
          </label>
          <label>
            Services title
            <input defaultValue={siteSettings.servicesSectionTitle} name="services_section_title" type="text" />
          </label>
          <label>
            Services CTA label
            <input defaultValue={siteSettings.servicesSectionCtaLabel} name="services_section_cta_label" type="text" />
          </label>
          <label>
            Services CTA href
            <input defaultValue={siteSettings.servicesSectionCtaHref} name="services_section_cta_href" type="text" />
          </label>
          <label>
            Portfolio title
            <input defaultValue={siteSettings.portfolioSectionTitle} name="portfolio_section_title" type="text" />
          </label>
          <label>
            Portfolio CTA label
            <input defaultValue={siteSettings.portfolioSectionCtaLabel} name="portfolio_section_cta_label" type="text" />
          </label>
          <label>
            Portfolio CTA href
            <input defaultValue={siteSettings.portfolioSectionCtaHref} name="portfolio_section_cta_href" type="text" />
          </label>
          <label>
            About section title
            <input defaultValue={siteSettings.aboutSectionTitle} name="about_section_title" type="text" />
          </label>
          <MediaPickerField assets={archiveAssets} label="About media" name="about_media_url" value={siteSettings.aboutMediaUrl} />
          <label>
            Team section title
            <input defaultValue={siteSettings.teamSectionTitle} name="team_section_title" type="text" />
          </label>
          <label>
            Team section subtitle
            <input defaultValue={siteSettings.teamSectionSubtitle} name="team_section_subtitle" type="text" />
          </label>
          <label>
            Studio film title
            <input defaultValue={siteSettings.studioFilmTitle} name="studio_film_title" type="text" />
          </label>
          <MediaPickerField assets={archiveAssets} label="Story / film media" name="story_media_url" value={siteSettings.storyMediaUrl} />
          <label>
            Process title
            <input defaultValue={siteSettings.processSectionTitle} name="process_section_title" type="text" />
          </label>
          <label>
            Testimonials title
            <input defaultValue={siteSettings.testimonialsSectionTitle} name="testimonials_section_title" type="text" />
          </label>
          <label>
            Testimonials label
            <input defaultValue={siteSettings.testimonialsSectionSubtitle} name="testimonials_section_subtitle" type="text" />
          </label>
          <label>
            Testimonials rating label
            <input defaultValue={siteSettings.testimonialsRatingLabel} name="testimonials_rating_label" type="text" />
          </label>
          <label>
            Testimonials CTA label
            <input defaultValue={siteSettings.testimonialsPrimaryCtaLabel} name="testimonials_primary_cta_label" type="text" />
          </label>
          <label>
            Testimonials CTA href
            <input defaultValue={siteSettings.testimonialsPrimaryCtaHref} name="testimonials_primary_cta_href" type="text" />
          </label>
          <label>
            Blog section title
            <input defaultValue={siteSettings.blogSectionTitle} name="blog_section_title" type="text" />
          </label>
          <label>
            Blog CTA label
            <input defaultValue={siteSettings.blogSectionCtaLabel} name="blog_section_cta_label" type="text" />
          </label>
          <label>
            Blog CTA href
            <input defaultValue={siteSettings.blogSectionCtaHref} name="blog_section_cta_href" type="text" />
          </label>
          <label>
            Contact section title
            <input defaultValue={siteSettings.contactSectionTitle} name="contact_section_title" type="text" />
          </label>
          <MediaPickerField assets={archiveAssets} label="Open Graph image" name="og_image_url" value={siteSettings.ogImageUrl} />
        </div>

        <label>
          Business tagline
          <textarea defaultValue={siteSettings.businessTagline} name="business_tagline" rows={2} />
        </label>
        <label>
          Business description
          <textarea defaultValue={siteSettings.businessDescription} name="business_description" rows={4} />
        </label>
        <label>
          Hero description
          <textarea defaultValue={siteSettings.heroDescription} name="hero_description" rows={4} />
        </label>
        <label>
          Services section subtitle
          <textarea defaultValue={siteSettings.servicesSectionSubtitle} name="services_section_subtitle" rows={3} />
        </label>
        <label>
          Portfolio section subtitle
          <textarea defaultValue={siteSettings.portfolioSectionSubtitle} name="portfolio_section_subtitle" rows={3} />
        </label>
        <label>
          Marquee items (one per line)
          <textarea defaultValue={joinLines(siteSettings.marqueeItems)} name="marquee_items" rows={5} />
        </label>
        <label>
          About story
          <textarea defaultValue={siteSettings.aboutStory} name="about_story" rows={4} />
        </label>
        <label>
          About story secondary
          <textarea defaultValue={siteSettings.aboutStorySecondary} name="about_story_secondary" rows={4} />
        </label>
        <label>
          About story tertiary
          <textarea defaultValue={siteSettings.aboutStoryTertiary} name="about_story_tertiary" rows={3} />
        </label>
        <label>
          About values (`Title :: Description` per line)
          <textarea defaultValue={joinTitledLines(siteSettings.aboutValues)} name="about_values" rows={6} />
        </label>
        <label>
          Studio film description
          <textarea defaultValue={siteSettings.studioFilmDescription} name="studio_film_description" rows={4} />
        </label>
        <label>
          Process section subtitle
          <textarea defaultValue={siteSettings.processSectionSubtitle} name="process_section_subtitle" rows={3} />
        </label>
        <label>
          Process steps (`Title :: Description` per line)
          <textarea defaultValue={joinTitledLines(siteSettings.processSteps)} name="process_steps" rows={6} />
        </label>
        <label>
          Blog section subtitle
          <textarea defaultValue={siteSettings.blogSectionSubtitle} name="blog_section_subtitle" rows={3} />
        </label>
        <label>
          Contact intro
          <textarea defaultValue={siteSettings.contactIntro} name="contact_intro" rows={4} />
        </label>
        <label>
          Default SEO title
          <input defaultValue={siteSettings.seoDefaultTitle} name="seo_default_title" type="text" />
        </label>
        <label>
          Default SEO description
          <textarea defaultValue={siteSettings.seoDefaultDescription} name="seo_default_description" rows={3} />
        </label>
        <label>
          Default SEO keywords (one per line)
          <textarea defaultValue={joinLines(siteSettings.seoKeywords)} name="seo_keywords" rows={6} />
        </label>

        <button className="button button--primary" type="submit">
          Save Site Settings
        </button>
      </form>
    </section>
  );
}

export function TeamSection({ archiveAssets, teamMembers }: SharedAdminData & { teamMembers: TeamMember[] }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel__intro">
        <h2>Team</h2>
        <p>Manage leadership profiles shown on the About page and available for contact references.</p>
      </div>

      <details className="admin-item admin-item--create">
        <summary>Create team member</summary>
        <TeamMemberForm archiveAssets={archiveAssets} member={null} />
      </details>

      {teamMembers.map((member) => (
        <details className="admin-item" key={member.id}>
          <summary>
            <span>{member.name}</span>
            <small>{member.role}</small>
          </summary>
          <TeamMemberForm archiveAssets={archiveAssets} member={member} />
        </details>
      ))}
    </section>
  );
}

function TeamMemberForm({
  archiveAssets,
  member,
}: {
  archiveAssets: StudioAsset[];
  member: TeamMember | null;
}) {
  return (
    <div className="admin-item__body">
      <form action={saveTeamMemberAction} className="admin-form">
        <input name="id" type="hidden" value={member?.id ?? ""} />
        <div className="admin-grid admin-grid--two">
          <label>
            Name
            <input defaultValue={member?.name ?? ""} name="name" type="text" />
          </label>
          <label>
            Role
            <input defaultValue={member?.role ?? ""} name="role" type="text" />
          </label>
          <label>
            Phone
            <input defaultValue={member?.phone ?? ""} name="phone" type="text" />
          </label>
          <label>
            Email
            <input defaultValue={member?.email ?? ""} name="email" type="email" />
          </label>
          <MediaPickerField assets={archiveAssets} label="Photo" name="photo_url" value={member?.photoUrl ?? ""} />
          <label>
            Sort order
            <input defaultValue={member?.sortOrder ?? 0} name="sort_order" type="number" />
          </label>
        </div>

        <div className="admin-form__actions">
          <button className="button button--primary" type="submit">
            Save Team Member
          </button>
        </div>
      </form>

      {member ? (
        <form action={deleteTeamMemberAction}>
          <input name="id" type="hidden" value={member.id} />
          <button className="button button--ghost button--danger" type="submit">
            Delete Team Member
          </button>
        </form>
      ) : null}
    </div>
  );
}

export function MediaLibrarySection({ archiveAssets, mediaAssets }: SharedAdminData) {
  return (
    <section className="admin-panel">
      <div className="admin-panel__intro">
        <h2>Media Library</h2>
        <p>Upload new assets to Supabase Storage and use any public or uploaded asset in other admin forms.</p>
      </div>

      <form action={uploadMediaAssetAction} className="admin-form admin-form--wide" encType="multipart/form-data">
        <div className="admin-grid admin-grid--two">
          <label>
            Title
            <input name="title" type="text" />
          </label>
          <label>
            Alt text
            <input name="alt" type="text" />
          </label>
          <label>
            Category
            <input defaultValue="workshop" name="category" type="text" />
          </label>
          <label>
            Sort order
            <input defaultValue={0} name="sort_order" type="number" />
          </label>
          <label className="admin-file-input">
            Upload file
            <input accept="image/*,video/*" name="file" type="file" />
          </label>
        </div>

        <button className="button button--primary" type="submit">
          Upload Asset
        </button>
      </form>

      {mediaAssets.length ? (
        <div className="admin-media-grid admin-media-grid--uploads">
          {mediaAssets.map((asset) => (
            <article className="admin-media-card" key={asset.id}>
              <MediaFrame
                asset={archiveAssets.find((item) => item.src === asset.src) ?? null}
                autoPlay={asset.kind === "video"}
                className="admin-media-card__frame"
                controls={asset.kind === "video"}
                loop={asset.kind === "video"}
                muted
              />
              <div className="admin-media-card__body">
                <span>{asset.category} · uploaded</span>
                <strong>{asset.title}</strong>
                <code>{asset.src}</code>
              </div>
              <form action={deleteMediaAssetAction}>
                <input name="id" type="hidden" value={asset.id} />
                <input name="storage_path" type="hidden" value={asset.storagePath} />
                <button className="button button--ghost button--danger" type="submit">
                  Delete Asset
                </button>
              </form>
            </article>
          ))}
        </div>
      ) : null}

      <div className="admin-media-grid">
        {archiveAssets.map((asset) => (
          <article className="admin-media-card" key={asset.id}>
            <MediaFrame asset={asset} autoPlay={asset.kind === "video"} className="admin-media-card__frame" controls={asset.kind === "video"} loop={asset.kind === "video"} muted />
            <div className="admin-media-card__body">
              <span>{asset.category} · {asset.kind} · {asset.source ?? "public"}</span>
              <strong>{asset.title}</strong>
              <code>{asset.src}</code>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection({ archiveAssets, services }: SharedAdminData & { services: Service[] }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel__intro">
        <h2>Services</h2>
        <p>Edit service landing pages, homepage cards, and category SEO copy.</p>
      </div>

      <details className="admin-item admin-item--create">
        <summary>Create new service</summary>
        <ServiceForm archiveAssets={archiveAssets} service={null} />
      </details>

      {services.map((service) => (
        <details className="admin-item" key={service.id}>
          <summary>
            <span>{service.title}</span>
            <small>{service.slug}</small>
          </summary>
          <ServiceForm archiveAssets={archiveAssets} service={service} />
        </details>
      ))}
    </section>
  );
}

function ServiceForm({ archiveAssets, service }: { archiveAssets: StudioAsset[]; service: Service | null }) {
  return (
    <div className="admin-item__body">
      <form action={saveServiceAction} className="admin-form">
        <input name="id" type="hidden" value={service?.id ?? ""} />
        <div className="admin-grid admin-grid--two">
          <label>
            Title
            <input defaultValue={service?.title ?? ""} name="title" type="text" />
          </label>
          <label>
            Slug
            <input defaultValue={service?.slug ?? ""} name="slug" type="text" />
          </label>
          <label>
            Icon
            <input defaultValue={service?.icon ?? "✦"} name="icon" type="text" />
          </label>
          <label>
            Category
            <input defaultValue={service?.category ?? ""} name="category" type="text" />
          </label>
          <MediaPickerField assets={archiveAssets} label="Image" name="image_url" value={service?.imageUrl ?? ""} />
          <label>
            Sort order
            <input defaultValue={service?.sortOrder ?? 0} name="sort_order" type="number" />
          </label>
          <label className="admin-checkbox">
            <input defaultChecked={service?.featured ?? false} name="featured" type="checkbox" />
            Featured on homepage
          </label>
        </div>

        <label>
          Short description
          <textarea defaultValue={service?.shortDescription ?? ""} name="short_description" rows={3} />
        </label>
        <label>
          Full description
          <textarea defaultValue={service?.fullDescription ?? ""} name="full_description" rows={5} />
        </label>
        <label>
          Bullets (one per line)
          <textarea defaultValue={joinLines(service?.bullets ?? [])} name="bullets" rows={5} />
        </label>
        <label>
          SEO title
          <input defaultValue={service?.seoTitle ?? ""} name="seo_title" type="text" />
        </label>
        <label>
          SEO description
          <textarea defaultValue={service?.seoDescription ?? ""} name="seo_description" rows={3} />
        </label>

        <div className="admin-form__actions">
          <button className="button button--primary" type="submit">
            Save Service
          </button>
        </div>
      </form>

      {service ? (
        <form action={deleteServiceAction}>
          <input name="id" type="hidden" value={service.id} />
          <button className="button button--ghost button--danger" type="submit">
            Delete Service
          </button>
        </form>
      ) : null}
    </div>
  );
}

export function ProjectsSection({ archiveAssets, projects }: SharedAdminData & { projects: Project[] }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel__intro">
        <h2>Projects</h2>
        <p>Manage portfolio pages, gallery visuals, and featured homepage work.</p>
      </div>

      <details className="admin-item admin-item--create">
        <summary>Create new project</summary>
        <ProjectForm archiveAssets={archiveAssets} project={null} />
      </details>

      {projects.map((project) => (
        <details className="admin-item" key={project.id}>
          <summary>
            <span>{project.title}</span>
            <small>{project.category} · {project.location}</small>
          </summary>
          <ProjectForm archiveAssets={archiveAssets} project={project} />
        </details>
      ))}
    </section>
  );
}

function ProjectForm({ archiveAssets, project }: { archiveAssets: StudioAsset[]; project: Project | null }) {
  return (
    <div className="admin-item__body">
      <form action={saveProjectAction} className="admin-form">
        <input name="id" type="hidden" value={project?.id ?? ""} />
        <div className="admin-grid admin-grid--two">
          <label>
            Title
            <input defaultValue={project?.title ?? ""} name="title" type="text" />
          </label>
          <label>
            Slug
            <input defaultValue={project?.slug ?? ""} name="slug" type="text" />
          </label>
          <label>
            Category
            <input defaultValue={project?.category ?? ""} name="category" type="text" />
          </label>
          <label>
            Location
            <input defaultValue={project?.location ?? ""} name="location" type="text" />
          </label>
          <label>
            Year
            <input defaultValue={project?.year ?? ""} name="year" type="text" />
          </label>
          <MediaPickerField assets={archiveAssets} label="Image" name="image_url" value={project?.imageUrl ?? ""} />
          <label>
            Sort order
            <input defaultValue={project?.sortOrder ?? 0} name="sort_order" type="number" />
          </label>
          <label className="admin-checkbox">
            <input defaultChecked={project?.featured ?? false} name="featured" type="checkbox" />
            Featured project
          </label>
        </div>

        <label>
          Summary
          <textarea defaultValue={project?.summary ?? ""} name="summary" rows={3} />
        </label>
        <label>
          Description
          <textarea defaultValue={project?.description ?? ""} name="description" rows={6} />
        </label>
        <label>
          Challenge
          <textarea defaultValue={project?.challenge ?? ""} name="challenge" rows={3} />
        </label>
        <label>
          Solution
          <textarea defaultValue={project?.solution ?? ""} name="solution" rows={3} />
        </label>
        <label>
          Palette colours (one per line)
          <textarea defaultValue={joinLines(project?.palette ?? [])} name="palette" rows={4} />
        </label>
        <label>
          Materials (one per line)
          <textarea defaultValue={joinLines(project?.materials ?? [])} name="materials" rows={4} />
        </label>
        <label>
          Metrics (one per line)
          <textarea defaultValue={joinLines(project?.metrics ?? [])} name="metrics" rows={4} />
        </label>
        <label>
          SEO title
          <input defaultValue={project?.seoTitle ?? ""} name="seo_title" type="text" />
        </label>
        <label>
          SEO description
          <textarea defaultValue={project?.seoDescription ?? ""} name="seo_description" rows={3} />
        </label>

        <div className="admin-form__actions">
          <button className="button button--primary" type="submit">
            Save Project
          </button>
        </div>
      </form>

      {project ? (
        <form action={deleteProjectAction}>
          <input name="id" type="hidden" value={project.id} />
          <button className="button button--ghost button--danger" type="submit">
            Delete Project
          </button>
        </form>
      ) : null}
    </div>
  );
}

export function BlogSection({ archiveAssets, blogPosts }: SharedAdminData & { blogPosts: BlogPost[] }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel__intro">
        <h2>Blog Posts</h2>
        <p>Publish location-driven SEO articles and studio insights.</p>
      </div>

      <details className="admin-item admin-item--create">
        <summary>Create new article</summary>
        <PostForm archiveAssets={archiveAssets} post={null} />
      </details>

      {blogPosts.map((post) => (
        <details className="admin-item" key={post.id}>
          <summary>
            <span>{post.title}</span>
            <small>{post.publishedAt}</small>
          </summary>
          <PostForm archiveAssets={archiveAssets} post={post} />
        </details>
      ))}
    </section>
  );
}

function PostForm({ archiveAssets, post }: { archiveAssets: StudioAsset[]; post: BlogPost | null }) {
  return (
    <div className="admin-item__body">
      <form action={savePostAction} className="admin-form">
        <input name="id" type="hidden" value={post?.id ?? ""} />
        <div className="admin-grid admin-grid--two">
          <label>
            Title
            <input defaultValue={post?.title ?? ""} name="title" type="text" />
          </label>
          <label>
            Slug
            <input defaultValue={post?.slug ?? ""} name="slug" type="text" />
          </label>
          <label>
            Category
            <input defaultValue={post?.category ?? ""} name="category" type="text" />
          </label>
          <label>
            Read time
            <input defaultValue={post?.readTime ?? ""} name="read_time" type="text" />
          </label>
          <label>
            Published at
            <input defaultValue={post?.publishedAt ?? ""} name="published_at" type="date" />
          </label>
          <label>
            Cover accent
            <input defaultValue={post?.coverAccent ?? "#C4956A"} name="cover_accent" type="text" />
          </label>
          <MediaPickerField assets={archiveAssets} label="Cover image" name="cover_image_url" value={post?.coverImageUrl ?? ""} />
          <label className="admin-checkbox">
            <input defaultChecked={post?.featured ?? false} name="featured" type="checkbox" />
            Featured article
          </label>
        </div>

        <label>
          Excerpt
          <textarea defaultValue={post?.excerpt ?? ""} name="excerpt" rows={3} />
        </label>
        <label>
          Content
          <textarea defaultValue={post?.content ?? ""} name="content" rows={12} />
        </label>
        <label>
          SEO title
          <input defaultValue={post?.seoTitle ?? ""} name="seo_title" type="text" />
        </label>
        <label>
          SEO description
          <textarea defaultValue={post?.seoDescription ?? ""} name="seo_description" rows={3} />
        </label>

        <div className="admin-form__actions">
          <button className="button button--primary" type="submit">
            Save Article
          </button>
        </div>
      </form>

      {post ? (
        <form action={deletePostAction}>
          <input name="id" type="hidden" value={post.id} />
          <button className="button button--ghost button--danger" type="submit">
            Delete Article
          </button>
        </form>
      ) : null}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel__intro">
        <h2>Testimonials</h2>
        <p>Control the review section and local trust signals.</p>
      </div>

      <details className="admin-item admin-item--create">
        <summary>Create new testimonial</summary>
        <TestimonialForm testimonial={null} />
      </details>

      {testimonials.map((testimonial) => (
        <details className="admin-item" key={testimonial.id}>
          <summary>
            <span>{testimonial.name}</span>
            <small>{testimonial.company}</small>
          </summary>
          <TestimonialForm testimonial={testimonial} />
        </details>
      ))}
    </section>
  );
}

function TestimonialForm({ testimonial }: { testimonial: Testimonial | null }) {
  return (
    <div className="admin-item__body">
      <form action={saveTestimonialAction} className="admin-form">
        <input name="id" type="hidden" value={testimonial?.id ?? ""} />
        <div className="admin-grid admin-grid--two">
          <label>
            Name
            <input defaultValue={testimonial?.name ?? ""} name="name" type="text" />
          </label>
          <label>
            Role
            <input defaultValue={testimonial?.role ?? ""} name="role" type="text" />
          </label>
          <label>
            Company
            <input defaultValue={testimonial?.company ?? ""} name="company" type="text" />
          </label>
          <label>
            Location
            <input defaultValue={testimonial?.location ?? ""} name="location" type="text" />
          </label>
          <label>
            Rating
            <input defaultValue={testimonial?.rating ?? 5} max={5} min={1} name="rating" type="number" />
          </label>
          <label>
            Sort order
            <input defaultValue={testimonial?.sortOrder ?? 0} name="sort_order" type="number" />
          </label>
        </div>

        <label>
          Quote
          <textarea defaultValue={testimonial?.quote ?? ""} name="quote" rows={5} />
        </label>

        <div className="admin-form__actions">
          <button className="button button--primary" type="submit">
            Save Testimonial
          </button>
        </div>
      </form>

      {testimonial ? (
        <form action={deleteTestimonialAction}>
          <input name="id" type="hidden" value={testimonial.id} />
          <button className="button button--ghost button--danger" type="submit">
            Delete Testimonial
          </button>
        </form>
      ) : null}
    </div>
  );
}
