import { FC, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionEnding from "@/common/components/sections/SectionEnding";
import MainBtn from "@/common/components/buttons/MainBtn";
import ProcedureMainCard from "@/features/producers/components/card/ProcedureMainCard";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetProcedure from "../../api/useGetProcedure";

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

const OurMainProceduresSection: FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });

  const queryResult = useGetProcedure();

  const initial = shouldReduceMotion ? false : { opacity: 0, y: 18 };
  const animate = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : inView
    ? { opacity: 1, y: 0 }
    : undefined;

  const transition: Transition | undefined = shouldReduceMotion
    ? undefined
    : { duration: 0.5, ease: EASE_OUT };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={sectionRef}
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {queryResult?.data?.is_active ? (
          <section
            aria-labelledby="our-main-procedures-heading"
            className="
              bg-[var(--bg-subtle)]
              border-b border-[var(--border-subtle)]
              py-10 md:py-14 lg:py-16
            "
          >
            <div className="containerr">
              <FetchHandler
                queryResult={queryResult}
                skeletonType="procedure-section-home"
              >
                <div className="space-y-6 md:space-y-8">
                  {/* Header row */}
                  <div className="max-w-3xl space-y-3">
                    <SectionIntro
                      title={queryResult?.data?.section?.intro || ""}
                    />
                    <SectionTitle
                      as="h2"
                      id="our-main-procedures-heading"
                      text={queryResult?.data?.section?.heading || ""}
                    />
                    <SectionDescription
                      description={
                        queryResult?.data?.section?.description || ""
                      }
                    />
                  </div>

                  {/* Cards grid */}
                  <div
                    className="
                      grid gap-4 md:gap-5
                      sm:grid-cols-2
                      xl:grid-cols-4
                    "
                    role="list"
                    aria-label={t(
                      "HomeProcedures.listAria",
                      "Main eye procedures offered at this clinic"
                    )}
                  >
                    {queryResult?.data?.procedures?.length > 1 &&
                      queryResult?.data?.procedures
                        ?.slice(0, 4)
                        .map((item, index) => (
                          <ProcedureMainCard
                            key={item?.id}
                            item={item}
                            index={index}
                            trigger={inView}
                          />
                        ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <SectionEnding
                      text={queryResult?.data?.section?.ending || ""}
                    />

                    <Link to="/procedures">
                      <MainBtn text="View all" theme="secondary" />
                    </Link>
                  </div>
                </div>
              </FetchHandler>
            </div>
          </section>
        ) : null}
      </m.div>
    </LazyMotion>
  );
};

export default OurMainProceduresSection;
