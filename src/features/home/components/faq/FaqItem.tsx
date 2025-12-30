import React, { useId, useMemo, useCallback, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

export type FaqItemProps = {
  answer: string;
  question: string;
  index: number;
};

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FaqItem: React.FC<FaqItemProps> = ({ answer, question, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const panelId = useId();
  const buttonId = useId();

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const contentVariants = useMemo(
    () => ({
      closed: {
        gridTemplateRows: "0fr",
        opacity: 0,
      },
      open: {
        gridTemplateRows: "1fr",
        opacity: 1,
      },
    }),
    []
  );

  // ✅ avoid union warnings: always pass a transition object
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: EASE_OUT };

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="
          rounded-2xl
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          shadow-sm
          overflow-hidden
        "
      >
        <dt>
          <button
            id={buttonId}
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="
              w-full
              flex items-start justify-between gap-3
              px-4 md:px-5 py-3.5 md:py-4
              text-left
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[color:var(--focus-ring)]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[color:var(--bg-subtle)]
            "
          >
            <div className="flex gap-3">
              <div
                aria-hidden="true"
                className="
                  mt-0.5
                  flex h-6 w-6 items-center justify-center
                  rounded-full
                  bg-[color:var(--btn-main-bg)]
                  text-[11px] font-semibold
                  text-[color:var(--btn-main-text)]
                "
              >
                {index + 1}
              </div>
              <span className="text-sm md:text-base font-semibold text-[color:var(--text-main)]">
                {question}
              </span>
            </div>

            <span
              aria-hidden="true"
              className="
                mt-0.5
                inline-flex h-6 w-6 items-center justify-center
                rounded-full
                border border-[var(--card-border)]
                bg-[var(--card-bg)]
                text-xs font-semibold text-[color:var(--text-main)]
              "
            >
              {open ? "−" : "+"}
            </span>
          </button>
        </dt>

        {/* ✅ Smooth & cheap animation (no height:auto) */}
        <m.div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={contentVariants}
          transition={transition}
          className="grid px-4 md:px-5"
          style={{ willChange: "grid-template-rows, opacity" }}
        >
          <div className="overflow-hidden">
            <p className="pt-1.5 pb-4 md:pb-5 text-xs md:text-sm text-[color:var(--text-muted)]">
              {answer}
            </p>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
};

export default React.memo(FaqItem);
