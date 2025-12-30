import React from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { Link } from "react-router-dom";
import { FiClipboard } from "react-icons/fi";

import SectionDetails from "@/common/components/sections/SectionDetails";
import MainBtn from "@/common/components/buttons/MainBtn";
import SectionEnding from "@/common/components/sections/SectionEnding";

type Props = {
  inView: boolean;
  data: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
    details: string[];
  };
};

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

const PreVisitFormCard: React.FC<Props> = ({ inView, data }) => {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion ? false : { opacity: 0, y: 16 };
  const animate = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : inView
    ? { opacity: 1, y: 0 }
    : undefined;

  const transition: Transition | undefined = shouldReduceMotion
    ? undefined
    : { duration: 0.45, ease: EASE_OUT, delay: 0.05 };

  return (
    <LazyMotion features={domAnimation}>
      <m.aside
        initial={initial}
        animate={animate}
        transition={transition}
        className="
          relative
          rounded-3xl
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          shadow-sm
          px-4 py-4 md:px-6 md:py-6
          overflow-hidden
        "
        aria-label={data?.heading}
      >
        {/* subtle gradient background */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -top-8 -right-12
            h-40 w-40
            rounded-full
            bg-gradient-to-br
            from-[color:var(--accent-soft)]
            via-transparent
            to-[color:var(--accent)]
            opacity-40
          "
        />

        <div className="relative space-y-3">
          <div
            className="
              inline-flex items-center gap-2
              rounded-full px-3 py-1
              text-[11px] font-semibold tracking-[0.16em] uppercase
              bg-[color:var(--accent-soft-bg)]
              text-[color:var(--accent)]
            "
          >
            <FiClipboard aria-hidden="true" />
            {data?.intro}
          </div>

          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[color:var(--section-title-color)]">
            {data?.heading}
          </h3>

          <p className="text-xs md:text-sm text-[color:var(--section-muted-color)]">
            {data?.description}
          </p>

          <ul className="space-y-0.5 text-[11px] md:text-xs text-[color:var(--section-muted-color)]">
            {data?.details?.map((item, index) => (
              <SectionDetails key={index} item={item} bullets="•" />
            ))}
          </ul>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/pre-visit">
              <MainBtn theme="main" text="Complete pre-visit form" />
            </Link>

            <SectionEnding text="Optional, but recommended for a smoother experience." />
          </div>
        </div>
      </m.aside>
    </LazyMotion>
  );
};

export default React.memo(PreVisitFormCard);
