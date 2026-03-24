import { AdminShell, TeamSection } from "@/components/admin/sections";
import { getStudioArchiveAssets } from "@/lib/media-library";
import { getAdminContext, getMediaAssetRecords, getTeamMembers } from "@/lib/site-data";

type TeamAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TeamAdminPage({ searchParams }: TeamAdminPageProps) {
  const adminContext = await getAdminContext();
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const [teamMembers, archiveAssets, mediaAssets] = await Promise.all([
    getTeamMembers(),
    getStudioArchiveAssets(),
    getMediaAssetRecords(),
  ]);

  return (
    <AdminShell
      description="Control the leadership profiles shown on the public site."
      email={adminContext.email}
      status={status}
      title="Team profiles."
    >
      <TeamSection archiveAssets={archiveAssets} mediaAssets={mediaAssets} teamMembers={teamMembers} />
    </AdminShell>
  );
}
