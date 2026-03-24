import { AdminShell, BlogSection } from "@/components/admin/sections";
import { getStudioArchiveAssets } from "@/lib/media-library";
import { getAdminContext, getBlogPosts, getMediaAssetRecords } from "@/lib/site-data";

type BlogAdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BlogAdminPage({ searchParams }: BlogAdminPageProps) {
  const adminContext = await getAdminContext();
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const [blogPosts, archiveAssets, mediaAssets] = await Promise.all([
    getBlogPosts(),
    getStudioArchiveAssets(),
    getMediaAssetRecords(),
  ]);

  return (
    <AdminShell
      description="Publish blog content separately from other CMS work."
      email={adminContext.email}
      status={status}
      title="Blog."
    >
      <BlogSection archiveAssets={archiveAssets} blogPosts={blogPosts} mediaAssets={mediaAssets} />
    </AdminShell>
  );
}
