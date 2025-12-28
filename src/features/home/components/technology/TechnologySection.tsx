import { FC, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  type Variants,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionEnding from "@/common/components/sections/SectionEnding";
import TechnologyCard from "./TechnologyCard";
import useGetDoctorTechnology from "../../api/useGetDoctorTechnology";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const TechnologySection: FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    margin: "-120px 0px -120px 0px",
    once: true,
  });
  const queryResult = useGetDoctorTechnology();
  const containerVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      };

  return (
    <section
      aria-labelledby="clinic-technology-heading"
      className="
       bg-[var(--bg-page)]
        border-b border-[var(--border-subtle)]
      "
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative containerr py-10 md:py-14 lg:py-16 space-y-8"
      >
        <FetchHandler queryResult={queryResult} skeletonType="modern-tech">
          {/* header row */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
            <div className="space-y-2 md:space-y-3">
              <SectionIntro title={queryResult?.data?.intro || ""} />
              <SectionTitle
                as="h2"
                id="clinic-technology-heading"
                text={queryResult?.data?.heading || ""}
              />
              <SectionDescription
                description={queryResult?.data?.description || ""}
              />
              <SectionEnding text={queryResult?.data?.ending || ""} />
            </div>

            {/* highlight card */}
            <div
              className="
              rounded-3xl
              bg-[var(--card-bg)]
              border border-[var(--card-border)]
              shadow-sm
              p-4 md:p-5
              flex flex-col gap-3
            "
              aria-label={t(
                "Technology.highlightAria",
                "Overview of how technology supports your treatment"
              )}
            >
              <p className="text-xs md:text-sm font-semibold text-[color:var(--section-title-color)]">
                {t("How technology fits into your visit")}
              </p>
              <ol className="space-y-1.5 text-[11px] md:text-xs text-[color:var(--text-muted)]">
                {queryResult?.data &&
                  queryResult?.data?.details?.length > 0 &&
                  queryResult?.data?.details?.map((item, index) => (
                    <li key={index}>
                      {++index}. {item}
                    </li>
                  ))}
              </ol>
            </div>
          </div>

          {/* cards grid */}
          {queryResult?.data && queryResult?.data?.cards?.length > 0 && (
            <div
              className="
            grid gap-4 md:gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
              aria-label={t(
                "Technology.gridAria",
                "Types of technology used in the clinic"
              )}
            >
              {queryResult?.data?.cards.map((item, index) => (
                <TechnologyCard key={index} item={item} />
              ))}
            </div>
          )}
        </FetchHandler>
      </motion.div>
    </section>
  );
};

export default TechnologySection;
