import { FC, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionEnding from "@/common/components/sections/SectionEnding";
import SectionDescription from "@/common/components/sections/SectionDescription";
import StatCard from "./StatsCard";

import useGetStatistics from "../../api/useGetStatistics";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";

const WhyChooseUsSection: FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const inView = useInView(sectionRef, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });
  const queryResult = useGetStatistics();
  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration: 0.5, ease: "easeOut" }}
      ref={sectionRef}
      aria-labelledby="why-choose-us-heading"
    >
      <FetchHandler queryResult={queryResult} skeletonType="stats">
        {queryResult?.data && queryResult?.data?.is_active ? (
          <section
            className="
        bg-[var(--bg-subtle)]
        border-y border-[var(--border-subtle)]
      "
          >
            <div className="containerr py-10 md:py-14 lg:py-16">
              <div
                className=" flex flex-col-reverse gap-10
    lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]
    items-start"
              >
                {/* Stats column */}
                <div
                  className="w-full
              grid gap-4
              sm:grid-cols-2
              auto-rows-fr
            "
                  aria-label={t(
                    "WhyChoose.statsAria",
                    "Clinic experience statistics"
                  )}
                >
                  {queryResult?.data?.section?.stats?.map((item, index) => (
                    <StatCard
                      key={index}
                      defaultLabel={item?.label}
                      defaultDescription={item?.description}
                      target={Number(item?.number)}
                      trigger={inView}
                      suffix={item?.suffix ? item?.suffix : ""}
                      isHome={true}
                    />
                  ))}
                </div>

                {/* Text column */}
                <div className="space-y-4 md:space-y-5">
                  <SectionIntro
                    title={queryResult?.data?.section?.intro || ""}
                  />

                  <SectionTitle
                    as="h2"
                    id="why-choose-us-heading"
                    text={queryResult?.data?.section?.heading || ""}
                  />

                  <SectionDescription
                    description={queryResult?.data?.section?.description || ""}
                  />

                  <SectionEnding
                    text={queryResult?.data?.section?.ending || ""}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </FetchHandler>
    </motion.div>
  );
};

export default WhyChooseUsSection;
