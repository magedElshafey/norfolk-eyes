// // import React, { memo, useEffect, useMemo, useState } from "react";
// // import { Star } from "lucide-react";
// // import { motion, useReducedMotion } from "framer-motion";

// // type Props = {
// //   value: number; // 0..5
// //   onChange: (v: number) => void;
// //   disabled?: boolean;
// //   size?: "sm" | "md" | "lg";
// //   className?: string;
// //   ariaLabel?: string;
// //   dir?: "ltr" | "rtl"; // ✅ direction to control stagger order
// // };

// // const sizeMap = {
// //   sm: { box: "h-10 w-10", icon: 18 },
// //   md: { box: "h-12 w-12", icon: 20 },
// //   lg: { box: "h-14 w-14", icon: 22 },
// // };

// // function clamp(v: number, min: number, max: number) {
// //   return Math.min(max, Math.max(min, v));
// // }

// // const StarRating: React.FC<Props> = ({
// //   value,
// //   onChange,
// //   disabled,
// //   size = "md",
// //   className,
// //   ariaLabel = "rating",
// //   dir = "ltr",
// // }) => {
// //   const reduceMotion = useReducedMotion();
// //   const [hover, setHover] = useState<number>(0);
// //   const [mounted, setMounted] = useState(false);

// //   useEffect(() => {
// //     // trigger the stagger once
// //     setMounted(true);
// //   }, []);

// //   const { box, icon } = sizeMap[size];
// //   const active = hover || value;

// //   const order = useMemo(() => {
// //     // controls fade order:
// //     // ltr => 1..5
// //     // rtl => 5..1
// //     return dir === "rtl" ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5];
// //   }, [dir]);

// //   const indexMap = useMemo(() => {
// //     // star value -> index in order (for delay)
// //     const m = new Map<number, number>();
// //     order.forEach((v, idx) => m.set(v, idx));
// //     return m;
// //   }, [order]);

// //   const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
// //     if (disabled) return;

// //     const key = e.key;
// //     if (
// //       ![
// //         "ArrowLeft",
// //         "ArrowRight",
// //         "ArrowUp",
// //         "ArrowDown",
// //         "Home",
// //         "End",
// //         "Enter",
// //         " ",
// //       ].includes(key)
// //     )
// //       return;

// //     e.preventDefault();

// //     if (key === "Enter" || key === " ") {
// //       if (hover) onChange(hover);
// //       return;
// //     }

// //     let next = value || 1;

// //     // ArrowLeft means “previous visually”
// //     // In RTL, previous visually is +1 (because right-to-left)
// //     const isPrev = key === "ArrowLeft" || key === "ArrowDown";
// //     const isNext = key === "ArrowRight" || key === "ArrowUp";

// //     if (isPrev) next = clamp((value || 1) + (dir === "rtl" ? 1 : -1), 1, 5);
// //     if (isNext) next = clamp((value || 0) + (dir === "rtl" ? -1 : 1), 1, 5);

// //     if (key === "Home") next = dir === "rtl" ? 5 : 1;
// //     if (key === "End") next = dir === "rtl" ? 1 : 5;

// //     onChange(next);
// //   };

// //   return (
// //     <div
// //       role="radiogroup"
// //       aria-label={ariaLabel}
// //       aria-disabled={disabled ? true : undefined}
// //       className={`flex items-center gap-2 ${className ?? ""}`}
// //       onMouseLeave={() => setHover(0)}
// //       onKeyDown={onKeyDown}
// //     >
// //       {Array.from({ length: 5 }).map((_, i) => {
// //         const v = i + 1;
// //         const isOn = v <= active;

// //         const delayIndex = indexMap.get(v) ?? i;
// //         const delay = reduceMotion || !mounted ? 0 : delayIndex * 0.05; // ✅ tiny stagger

// //         return (
// //           <motion.button
// //             key={v}
// //             type="button"
// //             role="radio"
// //             aria-checked={value === v}
// //             aria-label={`${v} / 5`}
// //             disabled={disabled}
// //             onMouseEnter={() => setHover(v)}
// //             onFocus={() => setHover(v)}
// //             onBlur={() => setHover(0)}
// //             onClick={() => onChange(v)}
// //             className={`
// //               ${box}
// //               rounded-xl
// //               border
// //               transition-[transform,opacity,box-shadow]
// //               duration-150
// //               flex items-center justify-center
// //               focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--field-focus-border)]
// //               focus-visible:ring-offset-2
// //               ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
// //               ${
// //                 isOn
// //                   ? "border-transparent"
// //                   : "border-[color:var(--field-border)]"
// //               }
// //             `}
// //             style={{
// //               background: isOn
// //                 ? "var(--field-focus-border)"
// //                 : "var(--bg-surface)",
// //               willChange: "opacity", // ✅ helps avoid jank
// //             }}
// //             // ✅ Fade only (no y movement)
// //             initial={reduceMotion ? false : { opacity: 0 }}
// //             animate={reduceMotion ? undefined : { opacity: 1 }}
// //             transition={
// //               reduceMotion
// //                 ? undefined
// //                 : { duration: 0.18, delay, ease: [0.16, 1, 0.3, 1] }
// //             }
// //             title={`${v} / 5`}
// //           >
// //             <Star
// //               size={icon}
// //               className="transition"
// //               style={{
// //                 fill: isOn ? "#fff" : "transparent",
// //                 color: isOn ? "#fff" : "var(--text-soft)",
// //               }}
// //             />
// //           </motion.button>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default memo(StarRating);
// import React, { memo, useEffect, useMemo, useState } from "react";
// import { Star } from "lucide-react";
// import { motion, useReducedMotion } from "framer-motion";

// type Props = {
//   value: number; // 0..5
//   onChange: (v: number) => void;
//   disabled?: boolean;
//   size?: "sm" | "md" | "lg";
//   className?: string;
//   ariaLabel?: string;
//   dir?: "ltr" | "rtl";
// };

// const sizeMap = {
//   sm: { box: "h-10 w-10", icon: 18, scale: 1.25 },
//   md: { box: "h-12 w-12", icon: 20, scale: 1.35 },
//   lg: { box: "h-14 w-14", icon: 22, scale: 1.45 },
// };

// function clamp(v: number, min: number, max: number) {
//   return Math.min(max, Math.max(min, v));
// }

// const StarRating: React.FC<Props> = ({
//   value,
//   onChange,
//   disabled,
//   size = "md",
//   className,
//   ariaLabel = "rating",
//   dir = "ltr",
// }) => {
//   const reduceMotion = useReducedMotion();

//   const [hover, setHover] = useState<number>(0);
//   const [mounted, setMounted] = useState(false);
//   const [isSettled, setIsSettled] = useState(false);
//   const [selectedStar, setSelectedStar] = useState<number | null>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const { box, icon, scale } = sizeMap[size];
//   const active = hover || value;

//   const order = useMemo(
//     () => (dir === "rtl" ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5]),
//     [dir]
//   );

//   const indexMap = useMemo(() => {
//     const m = new Map<number, number>();
//     order.forEach((v, idx) => m.set(v, idx));
//     return m;
//   }, [order]);

//   const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
//     if (disabled) return;

//     const key = e.key;
//     if (
//       ![
//         "ArrowLeft",
//         "ArrowRight",
//         "ArrowUp",
//         "ArrowDown",
//         "Home",
//         "End",
//         "Enter",
//         " ",
//       ].includes(key)
//     )
//       return;

//     e.preventDefault();

//     if (key === "Enter" || key === " ") {
//       if (hover) {
//         onChange(hover);
//         setSelectedStar(hover);
//         setIsSettled(true);
//       }
//       return;
//     }

//     let next = value || 1;
//     const isPrev = key === "ArrowLeft" || key === "ArrowDown";
//     const isNext = key === "ArrowRight" || key === "ArrowUp";

//     if (isPrev) next = clamp((value || 1) + (dir === "rtl" ? 1 : -1), 1, 5);
//     if (isNext) next = clamp((value || 0) + (dir === "rtl" ? -1 : 1), 1, 5);

//     if (key === "Home") next = dir === "rtl" ? 5 : 1;
//     if (key === "End") next = dir === "rtl" ? 1 : 5;

//     onChange(next);
//     setSelectedStar(next);
//     setIsSettled(true);
//   };

//   return (
//     <div
//       role="radiogroup"
//       aria-label={ariaLabel}
//       aria-disabled={disabled ? true : undefined}
//       className={`flex items-center gap-2 ${className ?? ""}`}
//       onMouseLeave={() => setHover(0)}
//       onKeyDown={onKeyDown}
//     >
//       {Array.from({ length: 5 }).map((_, i) => {
//         const v = i + 1;
//         const isOn = v <= active;

//         const fadeIndex = indexMap.get(v) ?? i;
//         const fadeDelay = reduceMotion || !mounted ? 0 : fadeIndex * 0.05;

//         // ⭐ scale logic
//         let scaleDelay = 0;

//         if (!reduceMotion && isSettled) {
//           if (v === selectedStar) {
//             scaleDelay = 0; // ⭐ المختارة أولاً
//           } else {
//             scaleDelay = 0.06 + fadeIndex * 0.03; // باقي النجوم
//           }
//         }

//         return (
//           <motion.button
//             key={v}
//             type="button"
//             role="radio"
//             aria-checked={value === v}
//             aria-label={`${v} / 5`}
//             disabled={disabled}
//             onMouseEnter={() => setHover(v)}
//             onFocus={() => setHover(v)}
//             onBlur={() => setHover(0)}
//             onClick={() => {
//               onChange(v);
//               setSelectedStar(v);
//               setIsSettled(true);
//             }}
//             className={`
//               ${box}
//               rounded-xl
//               border
//               flex items-center justify-center
//               transition-[opacity,box-shadow]
//               duration-150
//               focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--field-focus-border)]
//               focus-visible:ring-offset-2
//               ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
//               ${
//                 isOn
//                   ? "border-transparent"
//                   : "border-[color:var(--field-border)]"
//               }
//             `}
//             style={{
//               background: isOn
//                 ? "var(--field-focus-border)"
//                 : "var(--bg-surface)",
//               willChange: "transform, opacity",
//             }}
//             initial={reduceMotion ? false : { opacity: 0, scale }}
//             animate={
//               reduceMotion
//                 ? undefined
//                 : {
//                     opacity: 1,
//                     scale: isSettled ? 1 : scale,
//                   }
//             }
//             transition={{
//               opacity: {
//                 duration: 0.18,
//                 delay: fadeDelay,
//                 ease: [0.16, 1, 0.3, 1],
//               },
//               scale: {
//                 type: "spring",
//                 stiffness: 260,
//                 damping: 20,
//                 mass: 0.6,
//                 delay: scaleDelay,
//               },
//             }}
//             title={`${v} / 5`}
//           >
//             <Star
//               size={icon}
//               className="transition"
//               style={{
//                 fill: isOn ? "#fff" : "transparent",
//                 color: isOn ? "#fff" : "var(--text-soft)",
//               }}
//             />
//           </motion.button>
//         );
//       })}
//     </div>
//   );
// };

// export default memo(StarRating);
import React, { memo, useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  onChange: (v: number) => void;
  onResetSignal?: number; // 🔑 trigger reset from parent
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  dir?: "ltr" | "rtl";
};

const sizeMap = {
  sm: { box: "h-10 w-10", icon: 18, initialScale: 1.25 },
  md: { box: "h-12 w-12", icon: 20, initialScale: 1.35 },
  lg: { box: "h-14 w-14", icon: 22, initialScale: 1.45 },
};

const StarRating: React.FC<Props> = ({
  value,
  onChange,
  onResetSignal,
  disabled,
  size = "md",
  ariaLabel = "rating",
  dir = "ltr",
}) => {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(0);
  const [settled, setSettled] = useState(false);

  // 🔁 Reset animation state
  useEffect(() => {
    setSettled(false);
    setHover(0);
  }, [onResetSignal]);

  const { box, icon, initialScale } = sizeMap[size];
  const active = hover || value;

  const order = useMemo(
    () => (dir === "rtl" ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5]),
    [dir]
  );

  const indexMap = useMemo(() => {
    const map = new Map<number, number>();
    order.forEach((v, i) => map.set(v, i));
    return map;
  }, [order]);

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex items-center gap-2"
      onMouseLeave={() => setHover(0)}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const v = i + 1;
        const isOn = v <= active;
        const delayIndex = indexMap.get(v) ?? i;

        return (
          <motion.button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            aria-label={`${v} / 5`}
            disabled={disabled}
            onMouseEnter={() => setHover(v)}
            onFocus={() => setHover(v)}
            onBlur={() => setHover(0)}
            onClick={() => {
              onChange(v);
              setSettled(true);
            }}
            className={`
              ${box}
              rounded-xl
              flex items-center justify-center
              border
              ${
                isOn
                  ? "border-transparent"
                  : "border-[color:var(--field-border)]"
              }
              ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            `}
            style={{
              background: isOn
                ? "var(--field-focus-border)"
                : "var(--bg-surface)",
            }}
            initial={reduceMotion ? false : { opacity: 0, scale: initialScale }}
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: settled ? 1 : initialScale,
                  }
            }
            transition={{
              opacity: {
                duration: 0.25,
                delay: delayIndex * 0.07, // 🧠 stagger typing-like
                ease: "easeOut",
              },
              scale: {
                type: "spring",
                stiffness: 260,
                damping: 20,
              },
            }}
          >
            <Star
              size={icon}
              style={{
                fill: isOn ? "#fff" : "transparent",
                color: isOn ? "#fff" : "var(--text-soft)",
              }}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default memo(StarRating);
