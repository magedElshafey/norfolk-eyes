import { FC, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionEnding from "@/common/components/sections/SectionEnding";
import VisitPrepItem from "./VisitPrepItem";
import PreVisitFormCard from "./PreVisitFormCard";
import useGetPrevistDetails from "../../api/useGetPrevistDetails";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const PreparingForVisitSection: FC = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const inView = useInView(ref, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };
  const animate = { opacity: 1, y: 0 };
  const queryResult = useGetPrevistDetails();
  return (
    <>
      {queryResult?.data?.is_active ? (
        <section
          aria-labelledby="preparing-visit-heading"
          className="
        bg-[var(--bg-subtle)]
        border-t border-b border-[var(--border-subtle)]
      "
        >
          <motion.div
            ref={ref}
            initial={initial}
            animate={inView ? animate : initial}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="containerr py-10 md:py-14 lg:py-16 space-y-8 md:space-y-10"
          >
            <FetchHandler queryResult={queryResult} skeletonType="pre-visit">
              {/* Header */}
              <div className="max-w-3xl space-y-2 md:space-y-3">
                <SectionIntro
                  title={queryResult?.data?.left_section?.intro || ""}
                />
                <SectionTitle
                  as="h2"
                  id="preparing-visit-heading"
                  text={queryResult?.data?.left_section?.heading || ""}
                />
                <SectionDescription
                  description={
                    queryResult?.data?.left_section?.description || ""
                  }
                />
                <SectionEnding
                  text={queryResult?.data?.left_section.ending || ""}
                />
              </div>

              {/* Info band + CTA card */}
              <div
                className="
            grid gap-8 lg:gap-10
            lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]
            items-start
          "
              >
                {/* Info band */}
                {queryResult?.data &&
                  queryResult?.data?.left_section &&
                  queryResult?.data?.left_section?.steps?.length > 0 && (
                    <section
                      aria-label={t(
                        "Checklist to prepare for your eye clinic visit"
                      )}
                      className="
              rounded-3xl
              bg-[var(--card-bg)]
              border border-[var(--card-border)]
              shadow-sm 
              p-4 md:p-5 lg:p-6
            "
                    >
                      <p className="text-xs md:text-sm font-semibold text-[color:var(--section-title-color)] mb-3">
                        {t("Before you arrive, it can help to:")}
                      </p>
                      {queryResult?.data?.left_section?.steps?.map(
                        (item, index) => (
                          <VisitPrepItem key={index} item={item} />
                        )
                      )}
                    </section>
                  )}

                {/* CTA Card */}
                {queryResult?.data?.right_section && (
                  <PreVisitFormCard
                    inView={inView}
                    data={queryResult?.data?.right_section}
                  />
                )}
              </div>
            </FetchHandler>
          </motion.div>
        </section>
      ) : null}
    </>
  );
};

export default PreparingForVisitSection;
