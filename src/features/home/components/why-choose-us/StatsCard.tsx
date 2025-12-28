import React, { useEffect, useRef, useId } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

type StatCardProps = {
  defaultLabel: string;

  defaultDescription: string;
  suffix?: string;
  target: number;
  trigger: boolean;
  isHome?: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
  defaultLabel,
  defaultDescription,
  target,
  trigger,
  suffix,
  isHome = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const hasAnimatedRef = useRef(false);
  const descriptionId = useId();

  useEffect(() => {
    if (!trigger || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;

    if (shouldReduceMotion) {
      count.set(target);
      return;
    }

    const controls = animate(count, target, {
      duration: 1.2,
      ease: "easeOut",
    });

    return () => {
      controls.stop();
    };
  }, [trigger, shouldReduceMotion, count, target]);

  const enableHover = !shouldReduceMotion;

  return (
    <motion.div
      className="
        rounded-2xl
        bg-[var(--card-bg)]
        border border-[var(--card-border)]
        shadow-sm
        px-4 py-4 md:px-5 md:py-5
        flex flex-col gap-2
      "
      role="group"
      aria-label={defaultLabel}
      aria-describedby={descriptionId}
      whileHover={enableHover ? { y: -2 } : undefined}
      transition={
        enableHover
          ? { type: "spring", stiffness: 260, damping: 24 }
          : undefined
      }
    >
      {/* label فوق الرقم – accent واضح في كل الباليتس و الـ contrast modes */}
      <div className="text-[color:var(--accent)] text-xs font-semibold tracking-[0.16em] uppercase">
        {defaultLabel}
      </div>

      <div className="flex items-baseline gap-1">
        <span
          className="
      text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl
      font-bold
      text-[color:var(--section-title-color)]
      flex items-baseline
    "
          aria-live="polite"
        >
          {shouldReduceMotion ? target : <motion.span>{rounded}</motion.span>}

          {/* Suffix */}
          {suffix && (
            <span
              className="
          ml-1
          text-base
          font-semibold
           text-[color:var(--section-title-color)]
          opacity-80
        "
              aria-hidden="true"
            >
              {suffix}
            </span>
          )}
        </span>
      </div>
      {isHome && (
        <p
          id={descriptionId}
          className="text-xs md:text-sm text-[color:var(--text-muted)]"
        >
          {defaultDescription}
        </p>
      )}
    </motion.div>
  );
};

export default StatCard;
