import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { normalizeTags } from "@/utils/normalizeTags";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { BaseProcedure } from "../../types/ProcedureList.types";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

type Props = {
  item: BaseProcedure;
  index: number;
  trigger: boolean;
  isHome?: boolean;
};

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

const ProcedureMainCard: React.FC<Props> = ({
  item,
  index,
  trigger,
  isHome = true,
}) => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const tags = useMemo(() => normalizeTags(item?.tags), [item?.tags]);

  const initial: TargetAndTransition =
    shouldReduceMotion || !trigger
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 18 };

  const animate: TargetAndTransition = { opacity: 1, y: 0 };

  // ✅ Enter transition فقط (واحد)
  const enterTransition: Transition | undefined =
    shouldReduceMotion || !trigger
      ? undefined
      : { duration: 0.35, ease: EASE_OUT, delay: index * 0.03 };

  const hoverEnabled = !shouldReduceMotion;

  return (
    <LazyMotion features={domAnimation}>
      <m.li
        role="listitem"
        initial={shouldReduceMotion ? false : initial}
        animate={animate}
        transition={enterTransition}
        className="
          group relative
          rounded-2xl
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          px-4 py-3 md:px-5 md:py-4
          flex flex-col
          overflow-hidden
          backdrop-blur-md
          shadow-[0_10px_30px_rgba(15,23,42,0.06)]
          transition-[box-shadow,transform] duration-200
          min-h-[190px]
        "
        // ✅ hover transition جوّا whileHover (من غير transition prop إضافي)
        whileHover={
          hoverEnabled
            ? {
                y: -4,
                transition: { type: "spring", stiffness: 260, damping: 24 },
              }
            : undefined
        }
        whileTap={hoverEnabled ? { scale: 0.99 } : undefined}
      >
        {/* ================= HOVER DECORATION (BACKGROUND ONLY) ================= */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -top-24 -right-24
            h-80 w-80
            rounded-full
            bg-[color:var(--accent-soft-bg)]
            opacity-0
            blur-3xl
            group-hover:opacity-100
            transition-opacity duration-300
            z-0
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -top-10 -right-10
            h-32 w-32
            rounded-full
            bg-[color:var(--accent-soft-bg)]
            opacity-0
            blur-2xl
            group-hover:opacity-100
            transition-opacity duration-300 delay-75
            z-0
          "
        />

        {/* ================= CONTENT ================= */}
        <div className="relative z-10 flex h-full flex-col gap-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
                {item?.name}
              </h3>

              {!isHome && tags?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        inline-flex items-center rounded-full
                        px-2 py-0.5
                        text-[10px] font-medium
                        bg-[color:var(--accent-soft-bg)]
                        text-[color:var(--accent)]
                      "
                    >
                      {t(`ProceduresPage.tag.${tag}`, tag.toUpperCase())}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span
              aria-hidden="true"
              className="
                mt-1 inline-flex h-8 w-8 items-center justify-center
                rounded-full
                border border-[color:var(--accent)]
                bg-[color:var(--accent-soft-bg)]
                text-[color:var(--accent)]
                text-xs font-semibold
                transition-transform duration-200
                group-hover:scale-105 group-hover:-rotate-6
              "
            >
              {i18n.language === "en" ? "→" : "←"}
            </span>
          </div>

          {/* Description */}
          <div className="flex-1">
            <div className="!text-[11px] md:!text-sm !text-[color:var(--text-muted)] leading-relaxed">
              <HtmlConverter html={item?.description} />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-end text-[10px] md:text-[11px]">
            <Link
              to={`/procedures/${item.slug}`}
              className="
                inline-flex items-center gap-1 font-semibold
                text-[color:var(--accent)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[color:var(--focus-ring)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[color:var(--bg-subtle)]
                transition-transform duration-200
                group-hover:translate-x-0.5
              "
            >
              <span>{t("View procedure")}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </m.li>
    </LazyMotion>
  );
};

export default React.memo(ProcedureMainCard);
