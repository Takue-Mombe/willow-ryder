import Link from "next/link";

import { MediaFrame, toImageAsset } from "@/components/site/media-frame";
import { buildMetadata } from "@/lib/seo";
import { getProjects, getSiteSettings } from "@/lib/site-data";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `Portfolio | ${siteSettings.businessName}`,
    description:
      "Browse interior design, bespoke carpentry, flooring, and commercial fit-out projects by Winmore Creations in Victoria Falls, Hwange, Bulawayo, Harare, and across Zimbabwe.",
    path: "/portfolio",
    keywords: ["portfolio carpentry Victoria Falls", "interior design projects Zimbabwe"],
  });
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="content-page shell">
      <section className="detail-hero">
        <span className="section-label">Portfolio</span>
        <h1 className="detail-hero__title">
          Projects shaped with <em>intention.</em>
        </h1>
        <p className="detail-hero__copy">
          Interiors, floors, cabinetry, and custom furniture commissions built for
          hospitality, residential, and commercial clients who want the work to feel
          singular.
        </p>
      </section>

      <section className="cards-grid cards-grid--three">
        {projects.map((project) => (
          <article className="portfolio-listing-card" key={project.id}>
            <MediaFrame
              asset={project.imageUrl ? toImageAsset(project.imageUrl, project.title, project.category.toLowerCase()) : null}
              className="portfolio-listing-card__art"
            />
            <div className="portfolio-listing-card__body">
              <span className="info-card__eyebrow">
                {project.category} · {project.location}
              </span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <Link className="button button--secondary" href={`/portfolio/${project.slug}`}>
                Read Project Story
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
