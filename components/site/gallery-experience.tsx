"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MediaFrame } from "@/components/site/media-frame";
import type { JourneyTheme, Project, StudioAsset } from "@/lib/types";

type GalleryExperienceProps = {
  journeys: JourneyTheme[];
  projects: Project[];
  archiveAssets: StudioAsset[];
  journeyPreviewAssets: Record<string, StudioAsset>;
};

const galleryFilterLabels: Record<string, string> = {
  all: "All Work",
  epoxy: "Epoxy Floors",
  carpentry: "Carpentry",
  interiors: "Interiors",
  workshop: "Workshop",
  detail: "Close-Ups",
};

const galleryFilterOrder = ["all", "epoxy", "carpentry", "interiors", "workshop", "detail"];

export function GalleryExperience({
  journeys,
  projects,
  archiveAssets,
  journeyPreviewAssets,
}: GalleryExperienceProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeJourneyKey, setActiveJourneyKey] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const filters = useMemo(
    () =>
      galleryFilterOrder.filter(
        (filter) =>
          filter === "all" ||
          archiveAssets.some((asset) => asset.category.toLowerCase() === filter),
      ),
    [archiveAssets],
  );

  const filteredAssets = useMemo(() => {
    if (selectedFilter === "all") {
      return archiveAssets;
    }

    return archiveAssets.filter((asset) => asset.category.toLowerCase() === selectedFilter);
  }, [archiveAssets, selectedFilter]);

  const activeJourney = journeys.find((journey) => journey.key === activeJourneyKey) ?? null;
  const lightboxAsset = lightboxIndex !== null ? filteredAssets[lightboxIndex] : null;

  function openJourney(key: string) {
    setActiveJourneyKey(key);
    setActiveStep(0);
  }

  function closeJourney() {
    setActiveJourneyKey(null);
    setActiveStep(0);
  }

  function nextJourneyStep() {
    if (!activeJourney) {
      return;
    }

    setActiveStep((step) => Math.min(step + 1, activeJourney.steps.length - 1));
  }

  function prevJourneyStep() {
    setActiveStep((step) => Math.max(step - 1, 0));
  }

  function nextLightboxProject() {
    setLightboxIndex((index) => {
      if (index === null) {
        return 0;
      }

      return (index + 1) % filteredAssets.length;
    });
  }

  function prevLightboxProject() {
    setLightboxIndex((index) => {
      if (index === null) {
        return 0;
      }

      return (index - 1 + filteredAssets.length) % filteredAssets.length;
    });
  }

  return (
    <>
      <section className="gallery-header shell">
        <Link className="gallery-header__back" href="/">
          ← Back to Home
        </Link>
        <span className="section-label">Interactive Gallery</span>
        <h1 className="gallery-header__title">
          Step inside the <em>making.</em>
        </h1>
        <p className="gallery-header__text">
          Choose a craft theme to walk through the process, then browse a living
          archive of our Victoria Falls studio work - from lodge interiors and
          custom furniture to epoxy and hardwood flooring.
        </p>
      </section>

      <section className="gallery-themes shell" id="themes">
        {journeys.map((journey) => (
          <button
            className="theme-card"
            key={journey.key}
            onClick={() => openJourney(journey.key)}
            type="button"
          >
            <MediaFrame
              asset={journeyPreviewAssets[journey.key] ?? null}
              autoPlay={journeyPreviewAssets[journey.key]?.kind === "video"}
              className="theme-card__art"
              loop={journeyPreviewAssets[journey.key]?.kind === "video"}
              muted
              preload="auto"
            />
            <div className="theme-card__body">
              <div className="theme-card__number">{journey.number}</div>
              <h2>{journey.label}</h2>
              <p>{journey.description}</p>
              <span className="theme-card__cta">Begin Journey →</span>
            </div>
          </button>
        ))}
      </section>

      <section className="gallery-wall">
        <div className="shell">
          <div className="section-intro section-intro--split gallery-wall__intro">
            <div>
              <span className="section-label section-label--light">Studio Work</span>
              <h2 className="section-title section-title--light">
                Every project. <em>Every detail.</em>
              </h2>
            </div>
            <p className="gallery-wall__copy">
              A living record of floors poured, furniture built, and rooms transformed
              across Victoria Falls and Zimbabwe.
            </p>
          </div>

          <div className="gallery-filters" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                className={`gallery-filter${selectedFilter === filter ? " is-active" : ""}`}
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                type="button"
              >
                {galleryFilterLabels[filter] ?? filter}
              </button>
            ))}
          </div>

          <div className="masonry-grid">
            {filteredAssets.map((asset, index) => (
              <button
                className="masonry-card"
                key={asset.id}
                onClick={() => setLightboxIndex(index)}
                type="button"
              >
                <MediaFrame asset={asset} autoPlay={asset.kind === "video"} className="masonry-card__art" loop={asset.kind === "video"} muted />
                <div className="masonry-card__overlay">
                  <span>
                    {galleryFilterLabels[asset.category] ?? asset.category}
                    {asset.kind === "video" ? " · video" : ""}
                  </span>
                  <strong>{asset.title}</strong>
                </div>
              </button>
            ))}
          </div>

          <div className="gallery-projects-ribbon">
            {projects.slice(0, 5).map((project) => (
              <div className="gallery-projects-ribbon__item" key={project.id}>
                <span>{project.category}</span>
                <strong>{project.title}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxAsset ? (
        <div className="gallery-modal" role="dialog" aria-modal="true">
          <div className="gallery-modal__backdrop" onClick={() => setLightboxIndex(null)} />
          <div className="gallery-modal__panel">
            <button className="gallery-modal__close" onClick={() => setLightboxIndex(null)} type="button">
              ✕
            </button>
            <MediaFrame
              asset={lightboxAsset}
              autoPlay={lightboxAsset.kind === "video"}
              className="gallery-modal__art"
              controls={lightboxAsset.kind === "video"}
              loop={lightboxAsset.kind === "video"}
              muted={lightboxAsset.kind !== "video" ? true : false}
              preload="auto"
            />
            <div className="gallery-modal__content">
              <span>
                {galleryFilterLabels[lightboxAsset.category] ?? lightboxAsset.category}
                {lightboxAsset.kind === "video" ? " · motion capture" : " · still archive"}
              </span>
              <h3>{lightboxAsset.title}</h3>
              <p>
                Studio archive media pulled directly from the public library so every
                visual file is now represented on the site.
              </p>
              <div className="gallery-modal__actions">
                <button className="button button--ghost" onClick={prevLightboxProject} type="button">
                  ← Previous
                </button>
                <button className="button button--ghost" onClick={nextLightboxProject} type="button">
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activeJourney ? (
        <div className="journey-modal" role="dialog" aria-modal="true">
          <div className="journey-modal__header">
            <div>
              <p className="journey-modal__eyebrow">{activeJourney.label}</p>
              <h3>
                Stage {activeStep + 1} of {activeJourney.steps.length}
              </h3>
            </div>
            <button className="journey-modal__close" onClick={closeJourney} type="button">
              ✕
            </button>
          </div>

          <div className="journey-modal__body">
            <div className="journey-modal__visual">
              <MediaFrame
                asset={journeyPreviewAssets[activeJourney.key] ?? null}
                autoPlay={journeyPreviewAssets[activeJourney.key]?.kind === "video"}
                className="journey-modal__visual-media"
                loop={journeyPreviewAssets[activeJourney.key]?.kind === "video"}
                muted
                preload="auto"
              />
              <div className="journey-modal__counter">
                {String(activeStep + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="journey-modal__content">
              <p className="journey-modal__phase">{activeJourney.steps[activeStep].phase}</p>
              <h4>{activeJourney.steps[activeStep].title}</h4>
              <p>{activeJourney.steps[activeStep].body}</p>
              <div className="journey-modal__details">
                {activeJourney.steps[activeStep].details.map((detail) => (
                  <div className="journey-modal__detail" key={detail}>
                    <span />
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
              <blockquote>{activeJourney.steps[activeStep].quote}</blockquote>

              <div className="journey-modal__nav">
                <button className="button button--ghost" disabled={activeStep === 0} onClick={prevJourneyStep} type="button">
                  ← Prev
                </button>
                <button
                  className="button button--primary"
                  disabled={activeStep === activeJourney.steps.length - 1}
                  onClick={nextJourneyStep}
                  type="button"
                >
                  Next →
                </button>
              </div>

              <div className="journey-modal__dots">
                {activeJourney.steps.map((step, index) => (
                  <button
                    aria-label={`Go to ${step.phase}`}
                    className={`journey-modal__dot${index === activeStep ? " is-active" : ""}`}
                    key={step.phase}
                    onClick={() => setActiveStep(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
