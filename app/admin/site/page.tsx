import { AdminShell, SiteSettingsSection } from "@/components/admin/sections";
import { getStudioArchiveAssets } from "@/lib/media-library";
import { getAdminContext, getMediaAssetRecords, getSiteSettings } from "@/lib/site-data";

type SiteAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SiteAdminPage({ searchParams }: SiteAdminPageProps) {
  const adminContext = await getAdminContext();
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const [siteSettings, archiveAssets, mediaAssets] = await Promise.all([
    getSiteSettings(),
    getStudioArchiveAssets(),
    getMediaAssetRecords(),
  ]);

  return (
    <AdminShell
      description="Update brand identity, section copy, SEO defaults, contact details, and logo assets."
      email={adminContext.email}
      status={status}
      title="Site settings."
    >
      <SiteSettingsSection archiveAssets={archiveAssets} mediaAssets={mediaAssets} siteSettings={siteSettings} />
    </AdminShell>
  );
}
