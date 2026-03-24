"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { checkAdminAccess } from "@/lib/admin-access";
import { normalizePhoneValue } from "@/lib/contact";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function splitLines(value: FormDataEntryValue | null) {
  return text(value)
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitTitledLines(value: FormDataEntryValue | null) {
  return text(value)
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [title, ...rest] = item.split("::");

      return {
        title: title?.trim() ?? "",
        description: rest.join("::").trim(),
      };
    })
    .filter((item) => item.title && item.description);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return extension ? `.${extension}` : "";
}

function getAssetKind(fileName: string) {
  const extension = getFileExtension(fileName);
  return [".mp4", ".webm", ".mov", ".avi"].includes(extension) ? "video" : "image";
}

function getStorageFileName(fileName: string) {
  const extension = getFileExtension(fileName);
  const base = fileName.replace(extension, "");
  return `${slugify(base) || "asset"}-${Date.now()}${extension || ".jpg"}`;
}

async function uploadAndPersistMediaAsset({
  alt,
  supabase,
  category,
  file,
  sortOrder,
  title,
}: {
  alt?: string;
  supabase: Awaited<ReturnType<typeof requireAdminClient>>;
  category: string;
  file: File;
  sortOrder?: number;
  title: string;
}) {
  const kind = getAssetKind(file.name);
  const storageFileName = getStorageFileName(file.name);
  const storagePath = `${slugify(category) || "workshop"}/${storageFileName}`;
  const { error: uploadError } = await supabase.storage
    .from("media-assets")
    .upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrlData } = supabase.storage.from("media-assets").getPublicUrl(storagePath);

  await supabase.from("media_assets").insert({
    title: title || file.name,
    alt: alt || title || file.name,
    src: publicUrlData.publicUrl,
    storage_path: storagePath,
    kind,
    category,
    source: "database",
    sort_order: sortOrder ?? 0,
  });

  return publicUrlData.publicUrl;
}

async function resolveMediaField({
  supabase,
  formData,
  valueField,
  fileField,
  category,
  title,
}: {
  supabase: Awaited<ReturnType<typeof requireAdminClient>>;
  formData: FormData;
  valueField: string;
  fileField: string;
  category: string;
  title: string;
}) {
  const file = formData.get(fileField);

  if (file instanceof File && file.size > 0) {
    return uploadAndPersistMediaAsset({
      supabase,
      category,
      file,
      sortOrder: 0,
      title,
    });
  }

  return text(formData.get(valueField));
}

async function requireAdminClient() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const isAdmin = await checkAdminAccess(supabase, user);

  if (!isAdmin) {
    throw new Error("You are signed in, but this account is not an admin user.");
  }

  return supabase;
}

function revalidatePublicSite(paths: string[]) {
  ["/", "/about", "/blog", "/contact", "/gallery", "/portfolio", "/services", ...paths].forEach(
    (path) => revalidatePath(path),
  );
}

export async function saveSiteSettingsAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const id = text(formData.get("id"));
  const businessName = text(formData.get("business_name"));

  const [logoUrl, heroMediaUrl, aboutMediaUrl, storyMediaUrl, ogImageUrl] = await Promise.all([
    resolveMediaField({
      supabase,
      formData,
      valueField: "logo_url",
      fileField: "logo_url_file",
      category: "branding",
      title: `${businessName} logo`,
    }),
    resolveMediaField({
      supabase,
      formData,
      valueField: "hero_media_url",
      fileField: "hero_media_url_file",
      category: "hero",
      title: `${businessName} hero media`,
    }),
    resolveMediaField({
      supabase,
      formData,
      valueField: "about_media_url",
      fileField: "about_media_url_file",
      category: "about",
      title: `${businessName} about media`,
    }),
    resolveMediaField({
      supabase,
      formData,
      valueField: "story_media_url",
      fileField: "story_media_url_file",
      category: "story",
      title: `${businessName} story media`,
    }),
    resolveMediaField({
      supabase,
      formData,
      valueField: "og_image_url",
      fileField: "og_image_url_file",
      category: "seo",
      title: `${businessName} open graph image`,
    }),
  ]);

  const payload = {
    id: id || undefined,
    business_name: businessName,
    logo_url: logoUrl || "/logo/logo.jpeg",
    business_tagline: text(formData.get("business_tagline")),
    business_description: text(formData.get("business_description")),
    phone: normalizePhoneValue(text(formData.get("phone"))),
    whatsapp: normalizePhoneValue(text(formData.get("whatsapp"))),
    email: text(formData.get("email")),
    street_address: text(formData.get("street_address")),
    address_locality: text(formData.get("address_locality")),
    address_region: text(formData.get("address_region")),
    address_country: text(formData.get("address_country")) || "ZW",
    website_url: text(formData.get("website_url")),
    founded_year: text(formData.get("founded_year")),
    hero_eyebrow: text(formData.get("hero_eyebrow")),
    hero_title_prefix: text(formData.get("hero_title_prefix")),
    hero_title_emphasis: text(formData.get("hero_title_emphasis")),
    hero_title_suffix: text(formData.get("hero_title_suffix")),
    hero_description: text(formData.get("hero_description")),
    hero_quote: text(formData.get("hero_quote")),
    hero_location_text: text(formData.get("hero_location_text")),
    hero_media_url: heroMediaUrl,
    primary_cta_label: text(formData.get("primary_cta_label")),
    primary_cta_href: text(formData.get("primary_cta_href")),
    secondary_cta_label: text(formData.get("secondary_cta_label")),
    secondary_cta_href: text(formData.get("secondary_cta_href")),
    years_crafting: text(formData.get("years_crafting")),
    projects_completed: text(formData.get("projects_completed")),
    client_rating: text(formData.get("client_rating")),
    services_section_title: text(formData.get("services_section_title")),
    services_section_subtitle: text(formData.get("services_section_subtitle")),
    services_section_cta_label: text(formData.get("services_section_cta_label")),
    services_section_cta_href: text(formData.get("services_section_cta_href")),
    portfolio_section_title: text(formData.get("portfolio_section_title")),
    portfolio_section_subtitle: text(formData.get("portfolio_section_subtitle")),
    portfolio_section_cta_label: text(formData.get("portfolio_section_cta_label")),
    portfolio_section_cta_href: text(formData.get("portfolio_section_cta_href")),
    about_section_title: text(formData.get("about_section_title")),
    about_media_url: aboutMediaUrl,
    about_values: splitTitledLines(formData.get("about_values")),
    team_section_title: text(formData.get("team_section_title")),
    team_section_subtitle: text(formData.get("team_section_subtitle")),
    studio_film_title: text(formData.get("studio_film_title")),
    studio_film_description: text(formData.get("studio_film_description")),
    story_media_url: storyMediaUrl,
    process_section_title: text(formData.get("process_section_title")),
    process_section_subtitle: text(formData.get("process_section_subtitle")),
    process_steps: splitTitledLines(formData.get("process_steps")),
    testimonials_section_title: text(formData.get("testimonials_section_title")),
    testimonials_section_subtitle: text(formData.get("testimonials_section_subtitle")),
    testimonials_rating_label: text(formData.get("testimonials_rating_label")),
    testimonials_primary_cta_label: text(formData.get("testimonials_primary_cta_label")),
    testimonials_primary_cta_href: text(formData.get("testimonials_primary_cta_href")),
    blog_section_title: text(formData.get("blog_section_title")),
    blog_section_subtitle: text(formData.get("blog_section_subtitle")),
    blog_section_cta_label: text(formData.get("blog_section_cta_label")),
    blog_section_cta_href: text(formData.get("blog_section_cta_href")),
    contact_section_title: text(formData.get("contact_section_title")),
    marquee_items: splitLines(formData.get("marquee_items")),
    about_story: text(formData.get("about_story")),
    about_story_secondary: text(formData.get("about_story_secondary")),
    about_story_tertiary: text(formData.get("about_story_tertiary")),
    contact_intro: text(formData.get("contact_intro")),
    seo_default_title: text(formData.get("seo_default_title")),
    seo_default_description: text(formData.get("seo_default_description")),
    seo_keywords: splitLines(formData.get("seo_keywords")),
    og_image_url: ogImageUrl,
  };

  await supabase.from("site_settings").upsert(payload);
  revalidatePublicSite([]);
  redirect("/admin/site?status=site-settings-saved");
}

export async function saveServiceAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const title = text(formData.get("title"));
  const slug = text(formData.get("slug")) || slugify(title);
  const imageUrl = await resolveMediaField({
    supabase,
    formData,
    valueField: "image_url",
    fileField: "image_url_file",
    category: "services",
    title: `${title} service image`,
  });

  const payload = {
    id: text(formData.get("id")) || undefined,
    slug,
    title,
    short_description: text(formData.get("short_description")),
    full_description: text(formData.get("full_description")),
    icon: text(formData.get("icon")) || "✦",
    category: text(formData.get("category")),
    image_url: imageUrl,
    bullets: splitLines(formData.get("bullets")),
    featured: formData.get("featured") === "on",
    sort_order: Number(text(formData.get("sort_order")) || "0"),
    seo_title: text(formData.get("seo_title")),
    seo_description: text(formData.get("seo_description")),
  };

  await supabase.from("services").upsert(payload);
  revalidatePublicSite([`/services/${slug}`]);
  redirect("/admin/services?status=service-saved");
}

export async function deleteServiceAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const id = text(formData.get("id"));

  await supabase.from("services").delete().eq("id", id);
  revalidatePublicSite([]);
  redirect("/admin/services?status=service-deleted");
}

export async function saveProjectAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const title = text(formData.get("title"));
  const slug = text(formData.get("slug")) || slugify(title);
  const imageUrl = await resolveMediaField({
    supabase,
    formData,
    valueField: "image_url",
    fileField: "image_url_file",
    category: "projects",
    title: `${title} project image`,
  });

  const payload = {
    id: text(formData.get("id")) || undefined,
    slug,
    title,
    summary: text(formData.get("summary")),
    description: text(formData.get("description")),
    category: text(formData.get("category")),
    location: text(formData.get("location")),
    year: text(formData.get("year")),
    featured: formData.get("featured") === "on",
    sort_order: Number(text(formData.get("sort_order")) || "0"),
    challenge: text(formData.get("challenge")),
    solution: text(formData.get("solution")),
    image_url: imageUrl,
    palette: splitLines(formData.get("palette")),
    materials: splitLines(formData.get("materials")),
    metrics: splitLines(formData.get("metrics")),
    seo_title: text(formData.get("seo_title")),
    seo_description: text(formData.get("seo_description")),
  };

  await supabase.from("projects").upsert(payload);
  revalidatePublicSite([`/portfolio/${slug}`]);
  redirect("/admin/projects?status=project-saved");
}

export async function deleteProjectAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const id = text(formData.get("id"));

  await supabase.from("projects").delete().eq("id", id);
  revalidatePublicSite([]);
  redirect("/admin/projects?status=project-deleted");
}

export async function savePostAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const title = text(formData.get("title"));
  const slug = text(formData.get("slug")) || slugify(title);
  const coverImageUrl = await resolveMediaField({
    supabase,
    formData,
    valueField: "cover_image_url",
    fileField: "cover_image_url_file",
    category: "blog",
    title: `${title} cover image`,
  });

  const payload = {
    id: text(formData.get("id")) || undefined,
    slug,
    title,
    excerpt: text(formData.get("excerpt")),
    content: text(formData.get("content")),
    category: text(formData.get("category")),
    read_time: text(formData.get("read_time")),
    featured: formData.get("featured") === "on",
    published_at: text(formData.get("published_at")),
    cover_accent: text(formData.get("cover_accent")),
    cover_image_url: coverImageUrl,
    seo_title: text(formData.get("seo_title")),
    seo_description: text(formData.get("seo_description")),
  };

  await supabase.from("blog_posts").upsert(payload);
  revalidatePublicSite([`/blog/${slug}`]);
  redirect("/admin/blog?status=post-saved");
}

export async function deletePostAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const id = text(formData.get("id"));

  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePublicSite([]);
  redirect("/admin/blog?status=post-deleted");
}

export async function saveTestimonialAction(formData: FormData) {
  const supabase = await requireAdminClient();

  const payload = {
    id: text(formData.get("id")) || undefined,
    name: text(formData.get("name")),
    role: text(formData.get("role")),
    company: text(formData.get("company")),
    location: text(formData.get("location")),
    quote: text(formData.get("quote")),
    rating: Number(text(formData.get("rating")) || "5"),
    sort_order: Number(text(formData.get("sort_order")) || "0"),
  };

  await supabase.from("testimonials").upsert(payload);
  revalidatePublicSite([]);
  redirect("/admin/testimonials?status=testimonial-saved");
}

export async function deleteTestimonialAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const id = text(formData.get("id"));

  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePublicSite([]);
  redirect("/admin/testimonials?status=testimonial-deleted");
}

export async function saveTeamMemberAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const name = text(formData.get("name"));
  const photoUrl = await resolveMediaField({
    supabase,
    formData,
    valueField: "photo_url",
    fileField: "photo_url_file",
    category: "team",
    title: `${name} profile photo`,
  });

  const payload = {
    id: text(formData.get("id")) || undefined,
    name,
    role: text(formData.get("role")),
    phone: normalizePhoneValue(text(formData.get("phone"))),
    email: text(formData.get("email")),
    photo_url: photoUrl,
    sort_order: Number(text(formData.get("sort_order")) || "0"),
  };

  await supabase.from("team_members").upsert(payload);
  revalidatePublicSite(["/about", "/contact"]);
  redirect("/admin/team?status=team-member-saved");
}

export async function deleteTeamMemberAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const id = text(formData.get("id"));

  await supabase.from("team_members").delete().eq("id", id);
  revalidatePublicSite(["/about", "/contact"]);
  redirect("/admin/team?status=team-member-deleted");
}

export async function uploadMediaAssetAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const title = text(formData.get("title"));
  const alt = text(formData.get("alt"));
  const category = text(formData.get("category")) || "workshop";
  const sortOrder = Number(text(formData.get("sort_order")) || "0");
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Please choose a file to upload.");
  }

  await uploadAndPersistMediaAsset({
    alt,
    supabase,
    category,
    file,
    sortOrder,
    title: title || alt || file.name,
  });

  revalidatePublicSite([]);
  redirect("/admin/media?status=media-uploaded");
}

export async function deleteMediaAssetAction(formData: FormData) {
  const supabase = await requireAdminClient();
  const id = text(formData.get("id"));
  const storagePath = text(formData.get("storage_path"));

  if (storagePath) {
    await supabase.storage.from("media-assets").remove([storagePath]);
  }

  await supabase.from("media_assets").delete().eq("id", id);
  revalidatePublicSite([]);
  redirect("/admin/media?status=media-deleted");
}
