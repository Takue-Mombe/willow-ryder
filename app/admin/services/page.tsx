import { AdminShell, ServicesSection } from "@/components/admin/sections";
import { getStudioArchiveAssets } from "@/lib/media-library";
import { getAdminContext, getMediaAssetRecords, getServices } from "@/lib/site-data";

type ServicesAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ServicesAdminPage({ searchParams }: ServicesAdminPageProps) {
  const adminContext = await getAdminContext();
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const [services, archiveAssets, mediaAssets] = await Promise.all([
    getServices(),
    getStudioArchiveAssets(),
    getMediaAssetRecords(),
  ]);

  return (
    <AdminShell
      description="Edit service pages and choose artwork from local files or uploaded media."
      email={adminContext.email}
      status={status}
      title="Services."
    >
      <ServicesSection archiveAssets={archiveAssets} mediaAssets={mediaAssets} services={services} />
    </AdminShell>
  );
}
