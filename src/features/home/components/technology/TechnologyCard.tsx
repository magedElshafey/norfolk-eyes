import React, { useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
import { normalizeTags } from "@/utils/normalizeTags";

type Props = {
  item: {
    title: string;
    description: string[];
    tags?: string;
    ending?: string;
  };
};

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

const TechnologyCard: React.FC<Props> = ({ item }) => {
  const shouldReduceMotion = useReducedMotion();

  const description = useMemo(
    () => normalizeTags(item?.description),
    [item?.description]
  );

  const cardVariants: Variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      };
    }

    return {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: EASE_OUT },
      },
    };
  }, [shouldReduceMotion]);

  return (
    <LazyMotion features={domAnimation}>
      <m.article
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          rounded-3xl
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          shadow-sm
          overflow-hidden
          p-4 md:p-5
          flex flex-col gap-3
          backdrop-blur
          focus-within:ring-2
          focus-within:ring-[color:var(--focus-ring)]
          focus-within:ring-offset-2
          focus-within:ring-offset-[color:var(--bg-subtle)]
          group
        "
        role="group"
        aria-label={item?.title}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -4,
                boxShadow: "0 18px 30px rgba(15,23,42,0.16)",
                transition: { type: "spring", stiffness: 260, damping: 24 },
              }
        }
      >
        {/* glow strip */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-[var(--accent)]"
        />

        {/* Label pill */}
        {item?.tags ? (
          <div
            className="
              inline-flex items-center gap-2
              text-[10px] font-semibold uppercase tracking-[0.16em]
              text-[color:var(--accent)]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
            {item.tags}
          </div>
        ) : null}

        {/* Title */}
        <h3 className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
          {item?.title}
        </h3>

        {/* Bullet points */}
        {description?.length ? (
          <ul className="space-y-1.5 text-xs md:text-sm text-[color:var(--text-muted)]">
            {description.map((d, index) => (
              <li key={index}>• {d}</li>
            ))}
          </ul>
        ) : null}

        {/* Badge */}
        {item?.ending ? (
          <p
            className="
              mt-2 inline-flex items-center rounded-full
              px-3 py-1 text-[10px] font-medium
              bg-[color:var(--accent-soft-bg)]
              text-[color:var(--accent)]
            "
          >
            {item.ending}
          </p>
        ) : null}
      </m.article>
    </LazyMotion>
  );
};

export default React.memo(TechnologyCard);
