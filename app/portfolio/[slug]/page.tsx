import Link from "next/link";
import { notFound } from "next/navigation";

import { MediaFrame, toImageAsset } from "@/components/site/media-frame";
import { buildMetadata } from "@/lib/seo";
import { getProjectBySlug, getProjects, getSiteSettings } from "@/lib/site-data";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const siteSettings = await getSiteSettings();

  if (!project) {
    return buildMetadata({
      title: `Project Not Found | ${siteSettings.businessName}`,
      description: siteSettings.seoDefaultDescription,
      path: "/portfolio",
    });
  }

  return buildMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/portfolio/${project.slug}`,
    keywords: [project.title, project.category, project.location],
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProjectBySlug(slug), getProjects()]);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug)
    .filter((item) => item.category === project.category)
    .slice(0, 3);

  return (
    <main className="content-page shell">
      <section className="detail-hero">
        <span className="section-label">
          {project.category} · {project.location}
        </span>
        <h1 className="detail-hero__title">
          {project.title} - crafted to <em>hold attention.</em>
        </h1>
        <p className="detail-hero__copy">{project.summary}</p>
      </section>

      <section className="project-showcase">
        <MediaFrame
          asset={project.imageUrl ? toImageAsset(project.imageUrl, project.title, project.category.toLowerCase()) : null}
          className="project-showcase__visual"
        />

        <div className="project-showcase__copy">
          <div className="info-card">
            <span className="info-card__eyebrow">Project story</span>
            <p>{project.description}</p>
          </div>
          <div className="info-card">
            <span className="info-card__eyebrow">Challenge</span>
            <p>{project.challenge}</p>
          </div>
          <div className="info-card">
            <span className="info-card__eyebrow">Solution</span>
            <p>{project.solution}</p>
          </div>
        </div>
      </section>

      <section className="detail-layout">
        <article className="detail-panel">
          <h2>Materials</h2>
          <ul className="detail-list">
            {project.materials.map((material) => (
              <li key={material}>{material}</li>
            ))}
          </ul>
        </article>

        <article className="detail-panel">
          <h2>Project highlights</h2>
          <ul className="detail-list">
            {project.metrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </article>
      </section>

      {relatedProjects.length ? (
        <section className="content-slab">
          <div className="section-intro section-intro--split">
            <div>
              <span className="section-label">More Work</span>
              <h2 className="section-title">Related projects in this category.</h2>
            </div>
            <Link className="button button--secondary" href="/portfolio">
              Open Portfolio
            </Link>
          </div>

          <div className="cards-grid cards-grid--three">
            {relatedProjects.map((item) => (
              <article className="info-card" key={item.id}>
                <span className="info-card__eyebrow">{item.location}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <Link href={`/portfolio/${item.slug}`}>Read project →</Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
