import { useRef } from "react";
import {
  useReducedMotion,
  motion,
  useInView,
  type TargetAndTransition,
} from "framer-motion";
import { useTranslation } from "react-i18next";

import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionTitle from "@/common/components/sections/SectionTitle";

import GuideArticleCard from "@/features/home/components/patient-education/GuideArticleCard";
import EducationVideosRow from "@/features/home/components/patient-education/EducationVideosRow";
import useGetEducationSystem from "@/features/home/api/useGetEducationSystem";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const Blogs = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const inView = useInView(sectionRef, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });

  // ✅ ثابتين في الشكل علشان ما يحصلش TS union غريب
  const base: TargetAndTransition = { opacity: 1, y: 0 };
  const initial: TargetAndTransition = shouldReduceMotion
    ? base
    : { opacity: 0, y: 24 };
  const animate: TargetAndTransition = base;

  // 🧠 فلترة حسب الـ category

  const headingId = "blogs-heading";
  const queryResult = useGetEducationSystem();
  return (
    <>
      {queryResult?.data?.is_active ? (
        <main
          aria-labelledby={headingId}
          className="
        bg-[var(--bg-page)]
        border-b border-softGray/70
      "
        >
          <motion.section
            ref={sectionRef}
            aria-label={t("Blogs.ariaLabel", "Eye health guides & articles")}
            initial={initial}
            animate={inView ? animate : initial}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="containerr py-10 md:py-16 lg:py-20"
          >
            <FetchHandler
              queryResult={queryResult}
              skeletonType="patient-education-home-section"
            >
              <div className="space-y-6 md:space-y-8">
                {/* Header */}
                <header className="space-y-3 max-w-3xl">
                  <SectionTitle
                    as="h1"
                    id={headingId}
                    text={queryResult?.data?.section?.heading || ""}
                  />
                  <SectionDescription
                    description={queryResult?.data?.section?.description || ""}
                  />
                </header>

                {/* Articles grid */}
                {queryResult?.data &&
                  queryResult?.data?.articles &&
                  queryResult?.data?.articles?.length > 0 && (
                    <section
                      aria-label={t("Blogs.listLabel", "Articles list")}
                      className="
              grid grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-4 md:gap-5 lg:gap-6
            "
                    >
                      {queryResult?.data?.articles?.map((article, idx) => (
                        <GuideArticleCard
                          key={article.id}
                          article={article}
                          index={idx}
                        />
                      ))}
                    </section>
                  )}
                {queryResult?.data &&
                  queryResult?.data?.section &&
                  queryResult?.data?.section?.videos &&
                  queryResult?.data?.section?.videos?.length > 0 && (
                    <section
                      aria-label={t("Blogs.listLabel", "Articles list")}
                      className="
            bg-[var(--bg-surface)]
        border-b border-[var(--border-subtle)] p-2
            "
                    >
                      <EducationVideosRow
                        videos={queryResult?.data?.section?.videos}
                      />
                    </section>
                  )}
              </div>
            </FetchHandler>
          </motion.section>
        </main>
      ) : null}
    </>
  );
};

export default Blogs;
