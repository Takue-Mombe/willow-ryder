import { AdminShell, MediaLibrarySection } from "@/components/admin/sections";
import { getStudioArchiveAssets } from "@/lib/media-library";
import { getAdminContext, getMediaAssetRecords } from "@/lib/site-data";

type MediaAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MediaAdminPage({ searchParams }: MediaAdminPageProps) {
  const adminContext = await getAdminContext();
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const [archiveAssets, mediaAssets] = await Promise.all([
    getStudioArchiveAssets(),
    getMediaAssetRecords(),
  ]);

  return (
    <AdminShell
      description="Upload to Supabase Storage and browse every asset available to the CMS."
      email={adminContext.email}
      status={status}
      title="Media library."
    >
      <MediaLibrarySection archiveAssets={archiveAssets} mediaAssets={mediaAssets} />
    </AdminShell>
  );
}
