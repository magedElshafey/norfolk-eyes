import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  easeOut,
} from "framer-motion";

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

  const details = useMemo(
    () => ["VisionHero.detail1", "VisionHero.detail2", "VisionHero.detail3"],
    []
  );

  const initial = shouldReduceMotion ? false : { opacity: 0, y: 18 };
  const animate = { opacity: 1, y: 0 };
  const transition = shouldReduceMotion
    ? undefined
    : { duration: 0.5, ease: easeOut };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        aria-label={t(
          "VisionHero.ariaLabel",
          "Vision simulator introduction section"
        )}
        initial={initial}
        animate={animate}
        transition={transition}
        className="
          bg-[var(--bg-surface)]
          border-b border-[var(--border-subtle)]
        "
      >
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
                      ?.scrollIntoView({
                        behavior: shouldReduceMotion ? "auto" : "smooth",
                      });
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
      </m.section>
    </LazyMotion>
  );
};

export default VisionSimulatorHero;
