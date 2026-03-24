import { AdminOverview, AdminShell } from "@/components/admin/sections";
import { buildMetadata } from "@/lib/seo";
import {
  getAdminContext,
  getBlogPosts,
  getMediaAssetRecords,
  getProjects,
  getServices,
  getSiteSettings,
  getTeamMembers,
  getTestimonials,
} from "@/lib/site-data";

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: `CMS Dashboard | ${siteSettings.businessName}`,
    description: "Protected content editing dashboard for the Winmore Creations website.",
    path: "/admin",
  });
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const adminContext = await getAdminContext();
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;

  const [services, projects, blogPosts, testimonials, teamMembers, mediaAssets] = await Promise.all([
    getServices(),
    getProjects(),
    getBlogPosts(),
    getTestimonials(),
    getTeamMembers(),
    getMediaAssetRecords(),
  ]);

  return (
    <AdminShell
      description="Choose a section below to edit the site without scrolling through a single long dashboard."
      email={adminContext.email}
      status={status}
      title="Studio content control."
    >
      <AdminOverview
        blogPosts={blogPosts}
        mediaAssets={mediaAssets}
        projects={projects}
        services={services}
        teamMembers={teamMembers}
        testimonials={testimonials}
      />
    </AdminShell>
  );
}
