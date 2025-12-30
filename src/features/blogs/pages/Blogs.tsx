import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useTranslation } from "react-i18next";

import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionTitle from "@/common/components/sections/SectionTitle";

import GuideArticleCard from "@/features/home/components/patient-education/GuideArticleCard";
import EducationVideosRow from "@/features/home/components/patient-education/EducationVideosRow";
import useGetEducationSystem from "@/features/home/api/useGetEducationSystem";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Blogs = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const inView = useInView(sectionRef, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });

  const headingId = "blogs-heading";
  const queryResult = useGetEducationSystem();

  /* ----------------------------- Motion config ----------------------------- */
  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };
  const animate = shouldReduceMotion || inView ? { opacity: 1, y: 0 } : initial;

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: EASE_OUT };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        aria-label={t("Blogs.ariaLabel", "Eye health guides & articles")}
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {queryResult?.data?.is_active ? (
          <main
            aria-labelledby={headingId}
            className="
              bg-[var(--bg-page)]
              border-b border-softGray/70
            "
          >
            <section className="containerr py-10 md:py-16 lg:py-20">
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
                      description={
                        queryResult?.data?.section?.description || ""
                      }
                    />
                  </header>

                  {/* Articles grid */}
                  {queryResult?.data?.articles &&
                    queryResult.data.articles.length > 0 && (
                      <section
                        aria-label={t("Blogs.listLabel", "Articles list")}
                        className="
                          grid grid-cols-1
                          md:grid-cols-2
                          xl:grid-cols-3
                          gap-4 md:gap-5 lg:gap-6
                        "
                      >
                        {queryResult.data.articles.map((article, idx) => (
                          <GuideArticleCard
                            key={article.id}
                            article={article}
                            index={idx}
                          />
                        ))}
                      </section>
                    )}

                  {/* Videos */}
                  {queryResult?.data?.section?.videos &&
                    queryResult.data.section.videos.length > 0 && (
                      <section
                        aria-label={t(
                          "Blogs.videosLabel",
                          "Educational videos"
                        )}
                        className="
                          bg-[var(--bg-surface)]
                          border-b border-[var(--border-subtle)]
                          p-2
                        "
                      >
                        <EducationVideosRow
                          videos={queryResult.data.section.videos}
                          isHome={false}
                        />
                      </section>
                    )}
                </div>
              </FetchHandler>
            </section>
          </main>
        ) : null}
      </m.section>
    </LazyMotion>
  );
};

export default Blogs;
