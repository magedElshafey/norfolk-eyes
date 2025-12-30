import React, { useMemo, useState, useId } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { FiPlay, FiX, FiExternalLink } from "react-icons/fi";
import { Videos } from "../../types/patientEducation.types";
import {
  getYouTubeEmbed,
  getYouTubeId,
  getYouTubeThumb,
} from "./utils/youtube";
import { useTranslation } from "react-i18next";

type Props = {
  video: Videos;
  index: number;
};

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const EducationVideoCard: React.FC<Props> = ({ video, index }) => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const parsed = useMemo(() => {
    const id = getYouTubeId(video?.url);
    const thumb = id ? getYouTubeThumb(id, "hq") : null;
    const embed = id ? getYouTubeEmbed(id, true) : null;
    return { id, thumb, embed };
  }, [video?.url]);

  /* ---------------- Motion configs (no unions) ---------------- */

  const cardInitial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };

  const cardAnimate = { opacity: 1, y: 0 };

  const cardTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: EASE_OUT, delay: 0.04 * index };

  const overlayTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: EASE_OUT };

  const modalInitial = shouldReduceMotion ? { opacity: 1 } : { opacity: 0 };

  const modalAnimate = { opacity: 1 };
  const modalExit = modalInitial;

  const panelInitial = shouldReduceMotion
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 0, y: 18, scale: 0.98 };

  const panelAnimate = { opacity: 1, y: 0, scale: 1 };
  const panelExit = panelInitial;

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: EASE_OUT };

  /* ---------------- Handlers ---------------- */

  const onOpen = () => {
    if (parsed.id) setOpen(true);
    else window.open(video?.url, "_blank", "noopener,noreferrer");
  };

  return (
    <LazyMotion features={domAnimation}>
      <>
        {/* Card */}
        <m.article
          initial={cardInitial}
          animate={cardAnimate}
          transition={cardTransition}
          className="
            group
            rounded-2xl
            bg-[var(--card-bg)]
            border border-[var(--card-border)]
            shadow-sm
            overflow-hidden
            flex
            focus-within:ring-2
            focus-within:ring-[color:var(--focus-ring)]
            focus-within:ring-offset-2
            focus-within:ring-offset-[color:var(--bg-subtle)]
            hover:shadow-md
            transition-shadow
          "
        >
          <button
            type="button"
            onClick={onOpen}
            className="flex items-stretch w-full text-start focus:outline-none"
            aria-labelledby={titleId}
          >
            {/* Thumb */}
            <div className="relative w-28 h-20 md:w-36 md:h-24 flex-shrink-0 bg-black/10 overflow-hidden">
              {parsed.thumb ? (
                <img
                  src={parsed.thumb}
                  alt={video?.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover scale-[1.01] group-hover:scale-[1.04] transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-[11px] text-[color:var(--section-muted-color)]">
                  {t("No preview")}
                </div>
              )}

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"
                aria-hidden="true"
              />

              {/* Play */}
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

            {/* Content */}
            <div className="flex-1 p-3 md:p-4">
              <h3
                id={titleId}
                className="mt-1 text-xs md:text-sm font-semibold text-[color:var(--section-title-color)] line-clamp-2"
              >
                {video.title}
              </h3>

              {video.description ? (
                <p className="mt-1 text-[11px] leading-relaxed text-[color:var(--text-muted)] line-clamp-2">
                  {video.description}
                </p>
              ) : null}
            </div>
          </button>
        </m.article>

        {/* Modal */}
        <AnimatePresence>
          {open && parsed.embed && (
            <m.div
              className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-[2px] p-4 md:p-6"
              initial={modalInitial}
              animate={modalAnimate}
              exit={modalExit}
              transition={overlayTransition}
              role="dialog"
              aria-modal="true"
              aria-label={video.title}
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
                initial={panelInitial}
                animate={panelAnimate}
                exit={panelExit}
                transition={panelTransition}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[color:var(--card-border)]">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                      {t("Navbar.patient education")}
                    </p>
                    <h4 className="text-sm font-semibold text-[color:var(--section-title-color)] truncate">
                      {video.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={video.url}
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

                {/* Video */}
                <div className="relative w-full bg-black">
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
                      src={parsed.embed}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Description */}
                {video.description ? (
                  <div className="px-4 py-3">
                    <p className="text-[12px] leading-relaxed text-[color:var(--section-muted-color)]">
                      {video.description}
                    </p>
                  </div>
                ) : null}
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </>
    </LazyMotion>
  );
};

export default React.memo(EducationVideoCard);
