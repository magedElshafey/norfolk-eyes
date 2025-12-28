import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HeroImageProps {
  image: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ image }) => {
  const shouldReduceMotion = useReducedMotion();

  const imageInitial = shouldReduceMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.96 };

  const imageAnimate = { opacity: 1, scale: 1 };

  return (
    <motion.div
      initial={imageInitial}
      animate={imageAnimate}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
      className="
        relative
        max-w-md mx-auto w-full
      "
    >
      <div
        className="
          relative
          rounded-3xl
          bg-[var(--card-bg)]
          shadow-xl
          overflow-hidden
          border border-[var(--card-border)]
        "
      >
        <img
          src={image}
          alt="DR Anas Anjari"
          loading="lazy"
          className="w-full h-full max-h-[360px] object-cover"
        />

        {/* <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
          <p className="text-xs font-semibold text-white">{t(title)}</p>
          <p className="text-[11px] text-white/80">{t(description)}</p>
        </div> */}
      </div>
    </motion.div>
  );
};

export default React.memo(HeroImage);
