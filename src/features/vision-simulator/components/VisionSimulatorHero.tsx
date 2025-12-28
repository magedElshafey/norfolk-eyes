import { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
import MainBtn from "@/common/components/buttons/MainBtn";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionEnding from "@/common/components/sections/SectionEnding";
import VisionHeroImage from "./VisionHeroImage";
import SectionDetails from "@/common/components/sections/SectionDetails";

const VisionSimulatorHero: FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 18 };
  const animate = { opacity: 1, y: 0 };
  const details = [
    "VisionHero.detail1", // حط النصوص في i18n
    "VisionHero.detail2",
    "VisionHero.detail3",
  ];

  return (
    <motion.section
      aria-label={t(
        "VisionHero.ariaLabel",
        "Vision simulator introduction section"
      )}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
      bg-[var(--bg-surface)]
        border-b border-[var(--border-subtle)]
         "
    >
      {/* soft background gradient */}

      <div className="containerr py-8 md:py-10 lg:py-12 relative z-10">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] items-center">
          {/* Text content */}
          <div className="space-y-3 md:space-y-4">
            <SectionIntro title="VisionHero.intro" />
            <SectionTitle text="HeroVision.sectionTitle" />
            <SectionDescription description="VisionHero.description" />

            <ul className="flex flex-wrap gap-2 text-xs">
              {details.map((item, index) => (
                <SectionDetails
                  key={index}
                  item={item}
                  bullets="◦"
                  childrenClassName="
                    inline-flex items-center gap-1
                    rounded-full
                    bg-[color:var(--chip-bg,#ffffffcc)]
                    border border-[color:var(--chip-border,rgba(209,213,219,0.7))]
                    px-3 py-1
                  "
                />
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2">
              <MainBtn
                variant="solid"
                theme="secondary"
                text="VisionHero.start"
                showArrow={false}
                onClick={() => {
                  document
                    .querySelector("#vision-simulator")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              />

              <BookConsultationButton />
            </div>

            <SectionEnding text="VisionHero.disclaimer" />
          </div>

          <VisionHeroImage
            image="/images/vision-hero.webp"
            title={t(
              "VisionHero.alt",
              "Split-screen view of night driving before and after cataract surgery"
            )}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default VisionSimulatorHero;
