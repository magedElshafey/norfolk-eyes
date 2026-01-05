import React, { useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getYouTubeEmbed,
  getYouTubeId,
  getYouTubeThumb,
} from "@/features/home/components/patient-education/utils/youtube";
import { Procedure } from "../../types/ProcedureList.types";
import { FiPlay, FiX, FiExternalLink } from "react-icons/fi";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
  easeOut,
} from "framer-motion";
import ImageGalleryModal from "./ImageGalleryModal";

interface Props {
  procedure: Procedure;
}

const ProcedureMedia: React.FC<Props> = ({ procedure }) => {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const titleId = useId();
  const { t } = useTranslation();

  const videoUrl = procedure?.assets?.video?.url || "";
  const hasVideo = !!videoUrl;
  const hasImages = !!procedure?.assets?.images?.length;

  const parsed = useMemo(() => {
    const id = getYouTubeId(videoUrl);
    const thumb = id ? getYouTubeThumb(id, "hq") : null;
    const embed = id ? getYouTubeEmbed(id, true) : null;
    return { id, thumb, embed };
  }, [videoUrl]);

  if (!hasVideo && !hasImages) return null;

  const onOpen = () => {
    if (parsed.id) {
      setOpen(true);
      return;
    }
    if (videoUrl) window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  const images = procedure.assets?.images?.map((i) => i.url) ?? [];
  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-label={t("Procedure.media", "Educational images and video")}
        className="
          rounded-2xl bg-[var(--bg-surface)]
          border border-[var(--border-subtle)]
          p-4 md:p-5 space-y-4
        "
      >
        <header>
          <h2 className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
            {t("See how the procedure works")}
          </h2>
          <p className="text-xs md:text-sm text-[color:var(--section-muted-color)]">
            {t("Short animations and images to help you visualise each step.")}
          </p>
        </header>

        {hasVideo && (
          <>
            <button
              type="button"
              onClick={onOpen}
              aria-labelledby={titleId}
              className="group aspect-video rounded-xl overflow-hidden bg-black w-full"
            >
              <div className="relative w-full h-full bg-black/10 overflow-hidden">
                {parsed?.thumb ? (
                  <img
                    src={parsed.thumb}
                    alt={procedure?.name}
                    loading="lazy"
                    className="w-full h-full object-cover scale-[1.01] group-hover:scale-[1.04] transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-[11px] text-[color:var(--section-muted-color)]">
                    {t("No preview")}
                  </div>
                )}

                <div
                  className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="
                      inline-flex items-center justify-center
                      h-10 w-10 rounded-full
                      bg-[color:var(--card-bg)]
                      text-[color:var(--accent)]
                      shadow-md
                      ring-1 ring-black/5
                      group-hover:scale-[1.06]
                      transition-transform
                    "
                  >
                    <FiPlay aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>

            <AnimatePresence>
              {open && parsed.embed ? (
                <m.div
                  className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-[2px] p-4 md:p-6"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : { duration: 0.16, ease: easeOut }
                  }
                  role="dialog"
                  aria-modal="true"
                  aria-label={procedure.name}
                  onMouseDown={(e) => {
                    if (e.target === e.currentTarget) setOpen(false);
                  }}
                >
                  <m.div
                    className="
                      mx-auto w-full max-w-4xl
                      rounded-2xl overflow-hidden
                      bg-[color:var(--card-bg)]
                      border border-[color:var(--card-border)]
                      shadow-xl
                    "
                    initial={
                      shouldReduceMotion
                        ? false
                        : { y: 18, scale: 0.98, opacity: 0 }
                    }
                    animate={
                      shouldReduceMotion
                        ? { y: 0, scale: 1, opacity: 1 }
                        : { y: 0, scale: 1, opacity: 1 }
                    }
                    exit={
                      shouldReduceMotion
                        ? { y: 12, scale: 0.99, opacity: 0 }
                        : { y: 18, scale: 0.98, opacity: 0 }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : { duration: 0.18, ease: easeOut }
                    }
                  >
                    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[color:var(--card-border)]">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-[color:var(--section-title-color)] truncate">
                          {procedure.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            inline-flex items-center gap-1.5
                            text-[11px] font-medium
                            px-2.5 py-1.5 rounded-lg
                            border border-[color:var(--card-border)]
                            text-[color:var(--section-title-color)]
                            hover:bg-black/5
                          "
                        >
                          <FiExternalLink aria-hidden="true" />
                          {t("Open on YouTube")}
                        </a>

                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="
                            inline-flex items-center justify-center
                            h-9 w-9 rounded-xl
                            border border-[color:var(--card-border)]
                            text-[color:var(--section-title-color)]
                            hover:bg-black/5
                          "
                          aria-label="Close"
                        >
                          <FiX aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="relative w-full bg-black">
                      <div className="aspect-video w-full">
                        <iframe
                          className="w-full h-full"
                          src={parsed.embed}
                          title={procedure.name}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </m.div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </>
        )}

        {hasImages && (
          <div className="grid gap-2 grid-cols-2">
            {images.map((url, index) => (
              <button
                key={url}
                type="button"
                onClick={() => {
                  setActiveImage(index);
                  setGalleryOpen(true);
                }}
                className="
          relative rounded-xl overflow-hidden
          bg-[var(--bg-subtle)]
          border border-[var(--border-subtle)]
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
        "
              >
                <img
                  src={url}
                  alt={procedure.name}
                  className="w-full h-full max-h-40 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}
      </section>
      <ImageGalleryModal
        open={galleryOpen}
        images={images}
        activeIndex={activeImage}
        onChange={setActiveImage}
        onClose={() => setGalleryOpen(false)}
        label={procedure.name}
      />
    </LazyMotion>
  );
};

export default ProcedureMedia;
