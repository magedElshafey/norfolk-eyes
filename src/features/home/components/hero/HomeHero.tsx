// src/features/home/components/HomeHero.tsx
import { FC } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import MainBtn from "@/common/components/buttons/MainBtn";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import HeroImage from "./HeroImage";
import SectionEnding from "@/common/components/sections/SectionEnding";
import SectionDetails from "@/common/components/sections/SectionDetails";
import useHero from "../../api/useHero";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const HomeHero: FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const sectionAnimation = { opacity: 1, y: 0 };
  const sectionInitial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };

  const queryRueslt = useHero();
  return (
    <>
      {queryRueslt?.data?.is_active ? (
        <motion.section
          aria-label="Doctor main hero"
          initial={sectionInitial}
          animate={sectionAnimation}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
        bg-[var(--bg-surface)]
        border-b border-[var(--border-subtle)]
      "
        >
          <div className="containerr py-10 md:py-16 lg:py-20">
            <FetchHandler queryResult={queryRueslt} skeletonType="hero">
              {queryRueslt?.data?.is_active && (
                <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
                  {/* Doctor image side */}
                  <HeroImage
                    image={
                      queryRueslt?.data?.section?.image ||
                      "/images/home-hero.webp"
                    }
                  />
                  {/* Text side */}
                  <div className="space-y-4 md:space-y-6">
                    <SectionIntro
                      title={queryRueslt?.data?.section.intro || ""}
                    />
                    <SectionTitle
                      text={queryRueslt?.data?.section.heading || ""}
                    />

                    <SectionDescription
                      description={queryRueslt?.data?.section.description || ""}
                    />

                    <ul className="flex flex-col gap-1.5 text-xs md:text-sm">
                      {queryRueslt?.data?.section.details?.map(
                        (item, index) => (
                          <SectionDetails key={index} item={item} bullets="•" />
                        )
                      )}
                    </ul>

                    <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2">
                      <BookConsultationButton />
                      <MainBtn hasIcon={true} theme="secondary">
                        <Link to="/vision-simulator">
                          {t("try vision simulator")}
                        </Link>
                      </MainBtn>
                      <MainBtn hasIcon={false} theme="outline">
                        <Link to="/about">{t("about us")}</Link>
                      </MainBtn>
                    </div>

                    <SectionEnding
                      text={queryRueslt?.data?.section.ending || ""}
                    />
                  </div>
                </div>
              )}
            </FetchHandler>
          </div>
        </motion.section>
      ) : null}
    </>
  );
};

export default HomeHero;
