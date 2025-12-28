import React, { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { Reviews } from "../../types/successStories.types";
import i18n from "@/lib/i18n/i18n";

type Props = { story: Reviews };

const SuccessStoryCard: React.FC<Props> = ({ story }) => {
  const shouldReduceMotion = useReducedMotion();

  const hoverTransition: TargetAndTransition | undefined = shouldReduceMotion
    ? undefined
    : {
        y: -4,
        scale: 1.01,
        transition: { type: "spring", stiffness: 260, damping: 24 },
      };

  const stars = story.rating ?? 5;
  const fullStars = Math.floor(stars);
  const halfStar = stars - fullStars >= 0.5;

  const initials =
    story.user_name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const content = story.content ?? "";

  const ariaLabel = useMemo(() => {
    const name = story.user_name ?? "User";
    const title = story.title ?? "Review";
    return `${name} – ${title}`;
  }, [story.user_name, story.title]);

  return (
    <motion.article
      dir={i18n.dir()}
      className="
        relative w-full
        h-[240px] md:h-[260px]  /* ✅ ارتفاع ثابت */
        rounded-3xl
        bg-[var(--card-bg)]
        border border-[var(--card-border)]
        shadow-sm
        overflow-hidden
        backdrop-blur
        px-4 py-4 md:px-5 md:py-5
        flex flex-col
        focus-within:ring-2
        focus-within:ring-[color:var(--focus-ring)]
        focus-within:ring-offset-2
        focus-within:ring-offset-[color:var(--bg-subtle)]
      "
      aria-label={ariaLabel}
      aria-roledescription="Patient success story card"
      whileHover={hoverTransition}
    >
      {/* Header */}
      <header className="flex items-start gap-3 mb-3 shrink-0">
        <div
          className="
            h-10 w-10 md:h-11 md:w-11
            rounded-full
            bg-[color:var(--accent-soft-bg)]
            border border-[color:var(--accent-soft)]
            flex items-center justify-center
            text-[11px] md:text-xs font-semibold
            text-[color:var(--accent)]
            shrink-0
          "
          aria-hidden="true"
        >
          {initials}
        </div>

        <div className="flex-1 space-y-0.5 min-w-0">
          <p className="text-xs md:text-sm font-semibold text-[color:var(--section-title-color)] truncate">
            {story.user_name}
          </p>
          <p className="text-[11px] text-[color:var(--section-muted-color)] truncate">
            {story.title}
          </p>

          <div className="flex items-center gap-1 text-[10px]">
            <div className="flex items-center gap-0.5 text-[color:var(--accent)]">
              {Array.from({ length: fullStars }).map((_, i) => (
                <span key={i} aria-hidden="true">
                  ★
                </span>
              ))}
              {halfStar && <span aria-hidden="true">☆</span>}
            </div>
            <span className="text-[color:var(--section-muted-color)]">
              {story.rating}/5
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="relative flex-1 min-h-0">
        {/* Quote mark */}
        <div
          className="
            absolute -left-1 -top-1
            text-3xl
            text-[color:var(--accent)]
            opacity-15
            select-none
          "
          aria-hidden="true"
        >
          “
        </div>

        {/* ✅ نفس المساحة ثابتة: collapsed = clamp, expanded = scroll */}
        <div className="h-full pl-3">
          <p
            className={[
              "text-xs h-full overflow-auto pr-1 md:text-sm text-[color:var(--section-muted-color)]",
            ].join(" ")}
          >
            {`“${content}”`}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default React.memo(SuccessStoryCard);
