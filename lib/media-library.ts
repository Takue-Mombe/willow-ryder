import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import type { BlogPost, FeaturedMedia, Project, Service, SiteSettings, StudioAsset, StudioAssetKind } from "@/lib/types";

const publicRoot = path.join(process.cwd(), "public");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
const videoExtensions = new Set([".mp4", ".webm", ".mov", ".avi"]);

const projectMediaMap: Record<string, string> = {
  "riverstone-lodge-interior-redesign": "/interior design/IMG_6641.jpg",
  "cascade-epoxy-floor": "/epoxy_flooring.jpg",
  "teak-executive-desk": "/carpentry/IMG_1112.jpg",
  "hardwood-dining-set": "/carpentry/IMG_5418.jpg",
  "zambezi-cafe-fit-out": "/interior design/IMG_5759.jpg",
  "mosi-home-kitchen-cabinetry": "/interior design/IMG_6633.jpg",
  "smoke-that-thunders-boardroom": "/interior design/IMG_6500.jpg",
  "rainforest-hardwood-installation": "/interior design/IMG_3715.jpg",
};

const blogMediaMap: Record<string, string> = {
  "epoxy-vs-hardwood-victoria-falls-home": "/epoxy_flooring.jpg",
  "bring-natural-wood-into-modern-interiors": "/carpentry/IMG_5310.jpg",
  "why-zimbabwean-timber-is-among-africas-finest": "/carpentry/IMG_6583.jpg",
  "custom-furniture-for-lodges-in-victoria-falls": "/interior design/IMG_5759.jpg",
};

const serviceMediaMap: Record<string, string> = {
  "interior-design": "/interior design/IMG_4593.jpg",
  "flooring-solutions": "/epoxy_flooring.jpg",
  "bespoke-carpentry": "/carpentry/IMG_6859.jpg",
  "kitchen-and-cabinetry": "/interior design/IMG_6633.jpg",
  "commercial-fit-outs": "/interior design/IMG_6500.jpg",
  "repairs-and-restoration": "/carpentry/IMG_2001.jpg",
};

const journeyPreviewMap: Record<string, string> = {
  epoxy: "/epoxy.mp4",
  hardwood: "/IMG_5519.jpg",
  carpentry: "/carpentry/IMG_7137.jpg",
  interior: "/interior design/IMG_6541.jpg",
};

function getKind(extension: string): StudioAssetKind | null {
  const normalized = extension.toLowerCase();

  if (imageExtensions.has(normalized)) {
    return "image";
  }

  if (videoExtensions.has(normalized)) {
    return "video";
  }

  return null;
}

function toPublicUrl(relativePath: string) {
  return `/${relativePath.split(path.sep).join("/")}`;
}

function toCategory(url: string) {
  const lower = url.toLowerCase();

  if (lower.includes("epoxy") || /^\/e\d+\.jpg$/i.test(url)) {
    return "epoxy";
  }

  if (lower.includes("/videos/")) {
    return "workshop";
  }

  if (lower.includes("/imagery/")) {
    return "detail";
  }

  if (lower.includes("interior design")) {
    return "interiors";
  }

  if (lower.includes("carpentry")) {
    return "carpentry";
  }

  if (lower.includes("img_")) {
    return "detail";
  }

  return "workshop";
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getBaseTitle(url: string, category: string) {
  const fileName = path.basename(url, path.extname(url));
  const match = fileName.match(/^img[_-]?(\d+)$/i);

  if (fileName === "epoxy_flooring") {
    return "Epoxy Flooring Feature";
  }

  if (fileName === "epoxy") {
    return "Epoxy Pour Reel";
  }

  if (/^e\d+$/i.test(fileName)) {
    return `Epoxy Detail ${fileName.slice(1)}`;
  }

  if (match) {
    return `${titleCase(category)} ${match[1]}`;
  }

  return titleCase(fileName.replace(/[_-]+/g, " "));
}

function createAsset(src: string): StudioAsset {
  const extension = path.extname(src);
  const kind = getKind(extension) ?? "image";
  const category = toCategory(src);
  const title = getBaseTitle(src, category);
  const poster =
    kind === "video"
      ? src === "/epoxy.mp4"
        ? "/epoxy_flooring.jpg"
        : "/IMG_5519.jpg"
      : undefined;

  return {
    id: src,
    src,
    fileName: path.basename(src),
    title,
    alt: `${title} - ${titleCase(category)} work by Winmore Creations`,
    kind,
    category,
    poster,
  };
}

async function walkDirectory(currentDirectory: string): Promise<string[]> {
  const entries = await readdir(currentDirectory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(currentDirectory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(fullPath)));
      continue;
    }

    const relativePath = path.relative(publicRoot, fullPath);
    const fileExtension = path.extname(relativePath);

    if (getKind(fileExtension)) {
      files.push(toPublicUrl(relativePath));
    }
  }

  return files;
}

function categoryMatchesProject(category: string, projectCategory: string) {
  const project = projectCategory.toLowerCase();
  const supportMatch = category === "detail" || category === "workshop";

  if (project.includes("interior") || project.includes("commercial") || project.includes("cabinetry")) {
    return category === "interiors" || supportMatch;
  }

  if (project.includes("carpentry") || project.includes("furniture")) {
    return category === "carpentry" || supportMatch;
  }

  if (project.includes("floor")) {
    return category === "epoxy" || supportMatch;
  }

  return supportMatch;
}

function categoryMatchesPost(category: string, postCategory: string) {
  const post = postCategory.toLowerCase();

  if (post.includes("floor")) {
    return category === "epoxy";
  }

  if (post.includes("design")) {
    return category === "interiors";
  }

  if (post.includes("craft") || post.includes("timber") || post.includes("hospitality")) {
    return category === "carpentry" || category === "interiors";
  }

  return category === "detail" || category === "workshop";
}

export const getStudioArchiveAssets = cache(async () => {
  const files = await walkDirectory(publicRoot);

  return files
    .sort((left, right) => left.localeCompare(right))
    .map((src) => createAsset(src));
});

export const getFeaturedMedia = cache(async (siteSettings: SiteSettings): Promise<FeaturedMedia> => {
  const assets = await getStudioArchiveAssets();

  const find = (src: string) => assets.find((asset) => asset.src === src) ?? null;
  const firstVideo = assets.find((asset) => asset.kind === "video") ?? null;
  const firstImage = assets.find((asset) => asset.kind === "image") ?? null;

  return {
    heroVideo:
      find(siteSettings.heroMediaUrl) ??
      find("/epoxy.mp4") ??
      firstVideo,
    aboutImage:
      find(siteSettings.aboutMediaUrl) ??
      find("/interior design/IMG_5759.jpg") ??
      firstImage,
    storyVideo:
      find(siteSettings.storyMediaUrl) ??
      find("/videos/IMG_6785.mp4") ??
      firstVideo,
  };
});

export const getJourneyPreviewAssets = cache(async () => {
  const assets = await getStudioArchiveAssets();

  return Object.fromEntries(
    Object.entries(journeyPreviewMap).map(([key, src]) => [
      key,
      assets.find((asset) => asset.src === src) ?? createAsset(src),
    ]),
  ) as Record<string, StudioAsset>;
});

export async function attachProjectMedia(projects: Project[]) {
  const assets = await getStudioArchiveAssets();

  return projects.map((project) => {
    const explicit = project.imageUrl || projectMediaMap[project.slug];
    const fallback = assets.find((asset) => {
      if (asset.kind !== "image") {
        return false;
      }

      return categoryMatchesProject(asset.category, project.category);
    });

    return {
      ...project,
      imageUrl: explicit || fallback?.src || assets.find((asset) => asset.kind === "image")?.src || "",
    };
  });
}

export async function attachBlogPostMedia(posts: BlogPost[]) {
  const assets = await getStudioArchiveAssets();

  return posts.map((post) => {
    const explicit = post.coverImageUrl || blogMediaMap[post.slug];
    const fallback = assets.find(
      (asset) => asset.kind === "image" && categoryMatchesPost(asset.category, post.category),
    );

    return {
      ...post,
      coverImageUrl:
        explicit || fallback?.src || assets.find((asset) => asset.kind === "image")?.src || "",
    };
  });
}

export async function attachServiceMedia(services: Service[]) {
  const assets = await getStudioArchiveAssets();

  return services.map((service) => {
    const explicit = service.imageUrl || serviceMediaMap[service.slug];
    const fallback = assets.find(
      (asset) => asset.kind === "image" && categoryMatchesProject(asset.category, service.category),
    );

    return {
      ...service,
      imageUrl:
        explicit || fallback?.src || assets.find((asset) => asset.kind === "image")?.src || "",
    };
  });
}

export async function getServiceMediaAsset(slug: string) {
  const assets = await getStudioArchiveAssets();
  const src = serviceMediaMap[slug];

  if (!src) {
    return null;
  }

  return assets.find((asset) => asset.src === src) ?? createAsset(src);
}
