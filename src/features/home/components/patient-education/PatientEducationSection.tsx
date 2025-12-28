import { FC, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionEnding from "@/common/components/sections/SectionEnding";
import GuideArticleCard from "./GuideArticleCard";
import EducationVideosRow from "./EducationVideosRow";
import { Link } from "react-router-dom";
import MainBtn from "@/common/components/buttons/MainBtn";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetEducationSystem from "../../api/useGetEducationSystem";
const PatientEducationSection: FC = () => {
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
  const queryResult = useGetEducationSystem({
    page: "home",
  });
  return (
    <>
      {queryResult?.data?.is_active ? (
        <section
          aria-labelledby="patient-education-heading"
          className="
      bg-[var(--bg-surface)]
        border-b border-[var(--border-subtle)]
      "
        >
          <motion.div
            ref={ref}
            initial={initial}
            animate={inView ? animate : initial}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="containerr py-10 md:py-14 lg:py-16 space-y-8 md:space-y-10"
          >
            <FetchHandler
              queryResult={queryResult}
              skeletonType="patient-education-home-section"
            >
              {/* Header */}
              <div className="space-y-2 md:space-y-3">
                <SectionIntro title={queryResult?.data?.section?.intro || ""} />
                <SectionTitle
                  as="h2"
                  id="patient-education-heading"
                  text={queryResult?.data?.section?.heading || ""}
                />
                <SectionDescription
                  description={queryResult?.data?.section?.description || ""}
                />
                <SectionEnding
                  text={queryResult?.data?.section?.ending || ""}
                />
              </div>

              {/* Stories + Guides (stack on mobile / 2-cols on lg) */}

              <section
                aria-labelledby="guides-articles-heading"
                className="
              rounded-3xl
              bg-[var(--card-bg)]
              border border-[var(--card-border)]
              shadow-sm
              p-4 md:p-5 lg:p-6 space-y-6
            "
              >
                {queryResult?.data &&
                  queryResult?.data?.articles?.length > 0 && (
                    <>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div>
                          <h3
                            id="guides-articles-heading"
                            className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]"
                          >
                            {t("Eye health guides & articles")}
                          </h3>
                          <p className="text-[11px] md:text-xs text-[color:var(--text-muted)]">
                            {t(
                              "Clear explanations written in patient-friendly language."
                            )}
                          </p>
                        </div>

                        <Link
                          className="hidden md:block"
                          to="/patient-education"
                        >
                          <MainBtn theme="secondary" text="View all articles" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                        {queryResult?.data?.articles
                          .slice(0, 3)
                          .map((article, idx) => (
                            <GuideArticleCard
                              key={article.id}
                              article={article}
                              index={idx}
                            />
                          ))}
                      </div>
                    </>
                  )}
                {queryResult?.data &&
                  queryResult?.data?.section?.videos?.length > 0 && (
                    <EducationVideosRow
                      videos={queryResult?.data?.section?.videos}
                      isHome={true}
                    />
                  )}

                {/* Mobile CTA */}
                <div className="mt-4 md:hidden">
                  <Link to="/patient-education">
                    <MainBtn theme="secondary" text="View all guides" />
                  </Link>
                </div>
              </section>
            </FetchHandler>
          </motion.div>
        </section>
      ) : null}
    </>
  );
};

export default PatientEducationSection;
