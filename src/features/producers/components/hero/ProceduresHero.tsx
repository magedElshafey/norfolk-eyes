import { FC } from "react";
// import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionEnding from "@/common/components/sections/SectionEnding";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetProcedureHero from "../../api/useGetProcedureHero";
const ProceduresHero: FC = () => {
  // const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };
  const queryResult = useGetProcedureHero();
  return (
    <>
      {queryResult?.data?.is_active ? (
        <motion.section
          aria-labelledby="procedures-hero-heading"
          className=" bg-[var(--mm-bg)] border-b border-softGray/50"
          initial={initial}
          animate={animate}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <FetchHandler
            queryResult={queryResult}
            skeletonType="procedure-intro"
          >
            <div className="containerr py-8 md:py-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
                {/* Text */}
                <div className="space-y-3 md:space-y-4">
                  <SectionIntro title={queryResult?.data?.intro || ""} />
                  <SectionTitle text={queryResult?.data?.heading || ""} />
                  <SectionDescription
                    description={queryResult?.data?.description || ""}
                  />
                  <SectionEnding text={queryResult?.data?.ending || ""} />
                </div>
              </div>
            </div>
          </FetchHandler>
        </motion.section>
      ) : null}
    </>
  );
};

export default ProceduresHero;
