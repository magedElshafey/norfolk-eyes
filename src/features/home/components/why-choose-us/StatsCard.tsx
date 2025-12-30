import React, { useEffect, useRef, useId } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
  type Transition,
} from "framer-motion";

type StatCardProps = {
  defaultLabel: string;
  defaultDescription: string;
  suffix?: string;
  target: number;
  trigger: boolean;
  isHome?: boolean;
};

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

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
      ease: EASE_OUT,
    });

    return () => {
      controls.stop();
    };
  }, [trigger, shouldReduceMotion, count, target]);

  const enableHover = !shouldReduceMotion;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
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
        {/* label فوق الرقم */}
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
            {shouldReduceMotion ? target : <m.span>{rounded}</m.span>}

            {/* Suffix */}
            {suffix ? (
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
            ) : null}
          </span>
        </div>

        {isHome ? (
          <p
            id={descriptionId}
            className="text-xs md:text-sm text-[color:var(--text-muted)]"
          >
            {defaultDescription}
          </p>
        ) : null}
      </m.div>
    </LazyMotion>
  );
};

export default StatCard;
