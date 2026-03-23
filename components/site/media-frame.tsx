import Image from "next/image";

import type { StudioAsset } from "@/lib/types";

export function toImageAsset(src: string, title: string, category: string): StudioAsset {
  return {
    id: `${category}-${title}-${src}`,
    src,
    fileName: src.split("/").at(-1) ?? src,
    title,
    alt: `${title} - ${category} work by Winmore Creations`,
    kind: "image",
    category,
  };
}

type MediaFrameProps = {
  asset: StudioAsset | null;
  alt?: string;
  autoPlay?: boolean;
  className?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
};

export function MediaFrame({
  asset,
  alt,
  autoPlay = false,
  className,
  controls = false,
  loop = false,
  muted = true,
  playsInline = true,
  preload = "metadata",
}: MediaFrameProps) {
  const classes = ["media-frame", className].filter(Boolean).join(" ");

  if (!asset) {
    return <div className={["media-frame", "media-frame--empty", className].filter(Boolean).join(" ")} />;
  }

  if (asset.kind === "video") {
    return (
      <div className={classes}>
        <video
          autoPlay={autoPlay}
          className="media-frame__asset"
          controls={controls}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          poster={asset.poster ? encodeURI(asset.poster) : undefined}
          preload={preload}
        >
          <source src={encodeURI(asset.src)} />
        </video>
      </div>
    );
  }

  return (
    <div className={classes}>
      <Image
        alt={alt ?? asset.alt}
        className="media-frame__asset"
        fill
        sizes="(max-width: 820px) 100vw, 50vw"
        src={encodeURI(asset.src)}
      />
    </div>
  );
}
