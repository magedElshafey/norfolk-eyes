import React from "react";
import { Link } from "react-router-dom";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { Articles } from "@/features/blogs/types/blog.types";
import { useTranslation } from "react-i18next";

type Props = {
  article: Articles;
  index: number;
};

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const GuideArticleCard: React.FC<Props> = ({ article, index }) => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };

  const animate = { opacity: 1, y: 0 };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.35,
        ease: EASE_OUT,
        delay: 0.05 * index,
      };

  // ✅ دايمًا object (no union)
  const whileHover = shouldReduceMotion ? { y: 0 } : { y: -3 };

  return (
    <LazyMotion features={domAnimation}>
      <m.article
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={whileHover}
        className="
          group relative
          rounded-2xl
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          shadow-sm
          overflow-hidden
          focus-within:ring-2
          focus-within:ring-[color:var(--focus-ring)]
          focus-within:ring-offset-2
          focus-within:ring-offset-[color:var(--bg-subtle)]
          transition-[border-color,box-shadow]
          group-hover:border-[color:var(--accent)]
          group-hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]
        "
      >
        {/* glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            z-0
          "
        >
          <div
            className="
              absolute -right-16 top-1/2 -translate-y-1/2
              h-40 w-40 rounded-full
              bg-[color:var(--accent-soft-bg)]
              blur-3xl
            "
          />
        </div>

        {/* accent strip */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 top-0 h-[2px]
            bg-[var(--accent)]
            opacity-70
            group-hover:opacity-100
            transition-opacity duration-300
          "
        />

        <Link
          to={`/patient-education/${article?.slug}`}
          className="
            relative z-10
            flex gap-3 md:gap-4
            p-4 md:p-5
            focus:outline-none
          "
          aria-label={article?.title}
        >
          <div className="flex-1 space-y-2">
            {article?.category && (
              <p
                className="
                  inline-flex items-center gap-1
                  rounded-full px-2.5 py-1
                  text-[10px] font-semibold tracking-[0.16em] uppercase
                  bg-[color:var(--accent-soft-bg)]
                  text-[color:var(--accent)]
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                {article.category.name}
              </p>
            )}

            <h3 className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
              {article.title}
            </h3>

            <p className="text-xs text-[color:var(--text-muted)] line-clamp-3">
              {article.description?.substring(0, 120)}
              {article.description?.length > 120 ? "..." : ""}
            </p>

            <div className="flex items-center justify-between pt-1 text-[11px] text-[color:var(--text-soft)]">
              <span>
                {article.reading_time} {t("minutes")}
              </span>

              <span
                aria-hidden="true"
                className="
                  inline-flex items-center gap-1
                  text-[color:var(--accent)]
                  transition-all duration-200
                  group-hover:gap-1.5
                  group-hover:translate-x-0.5
                "
              >
                {t("Read article")}
                <span>{i18n.language === "ar" ? "←" : "→"}</span>
              </span>
            </div>
          </div>
        </Link>
      </m.article>
    </LazyMotion>
  );
};

export default React.memo(GuideArticleCard);
