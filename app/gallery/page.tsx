import { GalleryExperience } from "@/components/site/gallery-experience";
import { getJourneyPreviewAssets, getStudioArchiveAssets } from "@/lib/media-library";
import { buildMetadata } from "@/lib/seo";
import { getJourneyThemes, getProjects, getSiteSettings } from "@/lib/site-data";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `Gallery & Craft Journeys | ${siteSettings.businessName}`,
    description:
      "Explore Winmore Creations' interactive gallery of bespoke carpentry, epoxy floors, hardwood installations, and interior transformations across Victoria Falls and Zimbabwe.",
    path: "/gallery",
    keywords: [
      "carpentry portfolio Victoria Falls",
      "epoxy flooring gallery Zimbabwe",
      "interior design projects Victoria Falls",
    ],
  });
}

export default async function GalleryPage() {
  const [projects, archiveAssets, journeyPreviewAssets] = await Promise.all([
    getProjects(),
    getStudioArchiveAssets(),
    getJourneyPreviewAssets(),
  ]);
  const journeys = getJourneyThemes();

  return (
    <main className="gallery-page">
      <GalleryExperience
        archiveAssets={archiveAssets}
        journeyPreviewAssets={journeyPreviewAssets}
        journeys={journeys}
        projects={projects}
      />
      <section className="shell gallery-cta">
        <div>
          <span className="section-label">Need something custom?</span>
          <h2 className="section-title">Bring your next project to the studio.</h2>
        </div>
        <a className="button button--primary" href="/contact">
          Start a Conversation
        </a>
      </section>
    </main>
  );
}
