import React from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

interface HeroImageProps {
  image: string;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HeroImage: React.FC<HeroImageProps> = ({ image }) => {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.96 };

  const animate = { opacity: 1, scale: 1 };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE_OUT, delay: 0.1 };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={initial}
        animate={animate}
        transition={transition}
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
            decoding="async"
            className="w-full h-full max-h-[360px] object-cover"
          />
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default React.memo(HeroImage);
