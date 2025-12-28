import { FC, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import AffiliationSlider from "./AffiliationSlider";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetAboutSection from "../../api/useGetAboutSection";
const AboutAffiliationsPreviewSection: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const queryResult = useGetAboutSection();
  const inView = useInView(ref, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {queryResult?.data?.is_active ? (
        <section
          aria-labelledby="about-affiliations-heading"
          className="
       bg-[var(--bg-surface)]
        border-b border-[var(--border-subtle)]
      "
        >
          <div className="containerr py-6">
            <FetchHandler queryResult={queryResult} skeletonType="about-home">
              <AffiliationSlider
                items={queryResult?.data?.affiliations || []}
              />
            </FetchHandler>
          </div>
        </section>
      ) : null}
    </motion.div>
  );
};

export default AboutAffiliationsPreviewSection;
