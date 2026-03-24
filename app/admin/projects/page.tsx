import { AdminShell, ProjectsSection } from "@/components/admin/sections";
import { getStudioArchiveAssets } from "@/lib/media-library";
import { getAdminContext, getMediaAssetRecords, getProjects } from "@/lib/site-data";

type ProjectsAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProjectsAdminPage({ searchParams }: ProjectsAdminPageProps) {
  const adminContext = await getAdminContext();
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const [projects, archiveAssets, mediaAssets] = await Promise.all([
    getProjects(),
    getStudioArchiveAssets(),
    getMediaAssetRecords(),
  ]);

  return (
    <AdminShell
      description="Manage portfolio entries and featured project visuals from a dedicated screen."
      email={adminContext.email}
      status={status}
      title="Projects."
    >
      <ProjectsSection archiveAssets={archiveAssets} mediaAssets={mediaAssets} projects={projects} />
    </AdminShell>
  );
}
