import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface VisionHeroImageProps {
  image: string;
  title: string;
}

const VisionHeroImage: React.FC<VisionHeroImageProps> = ({ image, title }) => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isRTL = i18n.language === "ar";

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, x: isRTL ? -22 : 22 }
      }
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
      className="relative max-w-md mx-auto w-full"
    >
      {/* main preview card */}
      <div
        className="
          relative rounded-3xl
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          shadow-[var(--card-shadow)]
          overflow-hidden
        "
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full max-h-[340px] object-cover"
        />

        {/* small tabs imitation on top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div
            className="
              inline-flex gap-1
              rounded-full px-1 py-1 text-[10px]
              bg-[color:var(--vision-tabs-bg,rgba(0,0,0,0.4))]
              text-[color:var(--vision-tabs-text,#ffffff)]
            "
            aria-hidden="true"
          >
            <span
              className="
                px-2 py-0.5 rounded-full
                bg-[color:var(--vision-tabs-active-bg,#ffffff)]
                text-[color:var(--accent)]
                font-semibold
              "
            >
              {t("VisionHero.tabNight", "Night driving")}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-transparent">
              {t("VisionHero.tabReading", "Reading")}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-transparent">
              {t("VisionHero.tabEveryday", "Everyday vision")}
            </span>
          </div>

          <span
            className="
              rounded-full
              bg-[color:var(--vision-pill-bg,rgba(0,0,0,0.45))]
              text-[10px]
              text-[color:var(--vision-pill-text,#ffffff)]
              px-2 py-0.5
            "
          >
            {t("VisionHero.pill", "Sample view")}
          </span>
        </div>

        {/* bottom caption */}
        <div
          className="
            absolute bottom-0 inset-x-0
            bg-gradient-to-t from-[color:var(--vision-caption-bg-from,rgba(0,0,0,0.78))]
            via-[color:var(--vision-caption-bg-via,rgba(0,0,0,0.35))]
            to-transparent
            p-4
            flex flex-wrap items-center justify-between gap-2
          "
        >
          <p className="text-[11px] text-[color:var(--vision-caption-text,#F9FAFB)] max-w-[70%]">
            {t(
              "VisionHero.caption",
              "Example simulation. Not every eye will experience vision in the same way."
            )}
          </p>
          <span
            className="
              inline-flex items-center rounded-full
              bg-[color:var(--vision-badge-bg,#ffffff)]
              px-3 py-1 text-[11px] font-semibold
              text-[color:var(--accent)]
            "
          >
            {t("VisionHero.badge", "Interactive demo")}
          </span>
        </div>
      </div>

      {/* floating info card */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute -bottom-5 right-3"
      >
        <div
          className="
            rounded-2xl
            bg-[color:var(--card-bg)]
            border border-[var(--card-border)]
            shadow-[var(--card-shadow)]
            px-3 py-2.5 text-[11px] min-w-[190px]
          "
        >
          <p className="font-semibold text-[color:var(--section-title-color)] mb-0.5">
            {t("VisionHero.floatTitle", "Compare lenses in seconds")}
          </p>
          <p className="text-[10px] text-[color:var(--section-muted-color)]">
            {t(
              "VisionHero.floatBody",
              "Switch between standard monofocal and advanced trifocal options."
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VisionHeroImage;
