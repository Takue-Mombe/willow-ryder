import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { getProjects, getServices, getSiteSettings } from "@/lib/site-data";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `About ${siteSettings.businessName}`,
    description:
      "Learn the story behind Winmore Creations, the Victoria Falls studio behind bespoke carpentry, interior design, custom furniture, and luxury flooring projects across Zimbabwe.",
    path: "/about",
    keywords: ["about Winmore Creations", "Victoria Falls carpentry studio"],
  });
}

export default async function AboutPage() {
  const [siteSettings, services, projects] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProjects(),
  ]);

  return (
    <main className="content-page shell">
      <section className="detail-hero">
        <span className="section-label">About The Studio</span>
        <h1 className="detail-hero__title">
          Built in Victoria Falls. Designed to <em>travel far.</em>
        </h1>
        <p className="detail-hero__copy">{siteSettings.businessDescription}</p>
      </section>

      <section className="narrative-grid">
        <div className="narrative-card narrative-card--art">
          <div className="art-surface" style={{ ["--surface-start" as string]: "#2C1A0E", ["--surface-middle" as string]: "#8A5E3B", ["--surface-end" as string]: "#E8D5BB" }}>
            <div className="art-surface__grain" />
            <div className="art-surface__glow" />
          </div>
          <div className="narrative-card__badge">{siteSettings.yearsCrafting}</div>
        </div>

        <div className="narrative-card">
          <h2>Why the studio exists</h2>
          <p>{siteSettings.aboutStory}</p>
          <p>{siteSettings.aboutStorySecondary}</p>
          <p>{siteSettings.aboutStoryTertiary}</p>
        </div>
      </section>

      <section className="mini-stats">
        <article>
          <strong>{siteSettings.yearsCrafting}</strong>
          <span>Years shaping projects with studio-level detail</span>
        </article>
        <article>
          <strong>{siteSettings.projectsCompleted}</strong>
          <span>Projects delivered for homes, lodges, retail, and offices</span>
        </article>
        <article>
          <strong>{projects.length}</strong>
          <span>Live project stories on the site and ready for growth</span>
        </article>
      </section>

      <section className="content-slab">
        <div className="section-intro section-intro--split">
          <div>
            <span className="section-label">What Makes The Work Different</span>
            <h2 className="section-title">Minimal, warm, exacting.</h2>
          </div>
          <p className="section-subtitle">
            We design with restraint, build with precision, and finish with the kind
            of patience that makes a space feel expensive without ever feeling forced.
          </p>
        </div>

        <div className="cards-grid cards-grid--three">
          <article className="info-card">
            <h3>Craft-led strategy</h3>
            <p>
              Every project begins with how the space should perform, feel, and age -
              not just how it should look on launch day.
            </p>
          </article>
          <article className="info-card">
            <h3>Zimbabwean material identity</h3>
            <p>
              We lean into regional timber, grounded palettes, and a sense of place so
              the finished work feels local without feeling expected.
            </p>
          </article>
          <article className="info-card">
            <h3>Detail that scales</h3>
            <p>
              Whether the brief is a single desk or a lodge reception, the same rigor
              runs through the making.
            </p>
          </article>
        </div>
      </section>

      <section className="content-slab">
        <div className="section-intro section-intro--split">
          <div>
            <span className="section-label">Studio Scope</span>
            <h2 className="section-title">From joinery to full spatial atmosphere.</h2>
          </div>
          <Link className="button button--secondary" href="/services">
            Explore All Services
          </Link>
        </div>

        <div className="cards-grid cards-grid--three">
          {services.slice(0, 6).map((service) => (
            <article className="info-card" key={service.id}>
              <span className="info-card__eyebrow">{service.category}</span>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
