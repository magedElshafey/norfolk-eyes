// import React, { useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { normalizeTags } from "@/utils/normalizeTags";
// import {
//   motion,
//   useReducedMotion,
//   type TargetAndTransition,
// } from "framer-motion";
// import { BaseProcedure } from "../../types/ProcedureList.types";
// import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

// type Props = {
//   item: BaseProcedure;
//   index: number;
//   trigger: boolean;
//   isHome?: boolean;
// };

// const ProcedureMainCard: React.FC<Props> = ({
//   item,
//   index,
//   trigger,
//   isHome = true,
// }) => {
//   const { t, i18n } = useTranslation();
//   const shouldReduceMotion = useReducedMotion();
//   const initial =
//     shouldReduceMotion || !trigger
//       ? { opacity: 1, y: 0 }
//       : { opacity: 0, y: 18 };

//   const animate: TargetAndTransition = {
//     opacity: 1,
//     y: 0,
//     ...(shouldReduceMotion || !trigger
//       ? {}
//       : {
//           transition: {
//             duration: 0.35,
//             ease: "easeOut",
//             delay: index * 0.03,
//           },
//         }),
//   };

//   const enableHover = !shouldReduceMotion;

//   const tags = useMemo(() => normalizeTags(item?.tags), [item?.tags]);

//   return (
//     <motion.li
//       role="listitem"
//       initial={initial}
//       animate={animate}
//       className="
//         group relative
//         rounded-2xl
//         bg-[var(--card-bg)]
//         border border-[var(--card-border)]
//         px-4 py-3 md:px-5 md:py-4
//         flex flex-col gap-2
//         overflow-hidden
//         backdrop-blur-md
//         shadow-[0_10px_30px_rgba(15,23,42,0.06)]
//       "
//       whileHover={
//         enableHover
//           ? {
//               y: -3,
//             }
//           : undefined
//       }
//       transition={
//         enableHover
//           ? {
//               duration: 0.2,
//               ease: "easeOut",
//             }
//           : undefined
//       }
//     >
//       {/* subtle glass highlight – ديكور بس */}
//       <div
//         aria-hidden="true"
//         className="
//           pointer-events-none
//           absolute -top-10 -right-10 h-24 w-[50%]
//           rounded-full
//           bg-[color:var(--accent-soft-bg)]
//           opacity-0
//           blur-2xl
//           group-hover:opacity-100
//           transition-opacity duration-300
//         "
//       />

//       <div className="flex items-start justify-between gap-3">
//         <div className="space-y-1">
//           <h3 className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
//             {item?.name}
//           </h3>
//           {isHome
//             ? null
//             : tags?.length > 0 && (
//                 <div className="flex flex-wrap gap-1">
//                   {tags?.map((tag) => (
//                     <span
//                       key={tag}
//                       className="
//                     inline-flex items-center rounded-full
//                     px-2 py-0.5
//                     text-[10px] font-medium
//                     bg-[color:var(--accent-soft-bg)]
//                     text-[color:var(--accent)]
//                   "
//                     >
//                       {t(`ProceduresPage.tag.${tag}`, tag.toUpperCase())}
//                     </span>
//                   ))}
//                 </div>
//               )}
//         </div>

//         <span
//           aria-hidden="true"
//           className="
//             mt-1 inline-flex h-8 w-8 items-center justify-center
//             rounded-[50%]
//             border border-[color:var(--accent)]
//             bg-[color:var(--accent-soft-bg)]
//             text-[color:var(--accent)]
//             text-xs font-semibold
//           "
//         >
//           {i18n.language === "en" ? "→" : "←"}
//         </span>
//       </div>
//       <div className="!text-[11px] md:text-sm! !text-[color:var(--text-muted)] leading-relaxed">
//         <HtmlConverter html={item?.description} />
//       </div>
//       <div className="mt-1 flex items-center justify-end gap-2 text-[10px] md:text-[11px]">
//         <Link
//           to={`/procedures/${item.slug}`}
//           className="
//             inline-flex items-center gap-1 font-semibold
//             text-[color:var(--accent)]
//             focus:outline-none
//             focus-visible:ring-2
//             focus-visible:ring-[color:var(--focus-ring)]
//             focus-visible:ring-offset-2
//             focus-visible:ring-offset-[color:var(--bg-subtle)]
//           "
//         >
//           <span>{t("View procedure")}</span>
//           <span aria-hidden="true">↗</span>
//         </Link>
//       </div>
//     </motion.li>
//   );
// };

// export default React.memo(ProcedureMainCard);
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { normalizeTags } from "@/utils/normalizeTags";
import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { BaseProcedure } from "../../types/ProcedureList.types";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

type Props = {
  item: BaseProcedure;
  index: number;
  trigger: boolean;
  isHome?: boolean;
};

const ProcedureMainCard: React.FC<Props> = ({
  item,
  index,
  trigger,
  isHome = true,
}) => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const initial =
    shouldReduceMotion || !trigger
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 18 };

  const animate: TargetAndTransition = {
    opacity: 1,
    y: 0,
    ...(shouldReduceMotion || !trigger
      ? {}
      : {
          transition: {
            duration: 0.35,
            ease: "easeOut",
            delay: index * 0.03,
          },
        }),
  };

  const enableHover = !shouldReduceMotion;
  const tags = useMemo(() => normalizeTags(item?.tags), [item?.tags]);

  return (
    <motion.li
      role="listitem"
      initial={initial}
      animate={animate}
      className="
        group relative
        rounded-2xl
        bg-[var(--card-bg)]
        border border-[var(--card-border)]
        px-4 py-3 md:px-5 md:py-4
        flex flex-col
        overflow-hidden
        backdrop-blur-md
        shadow-[0_10px_30px_rgba(15,23,42,0.06)]
        transition-[box-shadow,transform] duration-200
        min-h-[190px]
      "
      whileHover={
        enableHover
          ? {
              y: -4,
            }
          : undefined
      }
      transition={enableHover ? { duration: 0.2, ease: "easeOut" } : undefined}
    >
      {/* ================= HOVER DECORATION (STRONGER – BACKGROUND ONLY) ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -top-24 -right-24
          h-80 w-80
          rounded-full
          bg-[color:var(--accent-soft-bg)]
          opacity-0
          blur-3xl
          group-hover:opacity-100
          transition-opacity duration-300
          z-0
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -top-10 -right-10
          h-32 w-32
          rounded-full
          bg-[color:var(--accent-soft-bg)]
          opacity-0
          blur-2xl
          group-hover:opacity-100
          transition-opacity duration-300 delay-75
          z-0
        "
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex h-full flex-col gap-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
              {item?.name}
            </h3>

            {!isHome && tags?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      inline-flex items-center rounded-full
                      px-2 py-0.5
                      text-[10px] font-medium
                      bg-[color:var(--accent-soft-bg)]
                      text-[color:var(--accent)]
                    "
                  >
                    {t(`ProceduresPage.tag.${tag}`, tag.toUpperCase())}
                  </span>
                ))}
              </div>
            )}
          </div>

          <span
            aria-hidden="true"
            className="
              mt-1 inline-flex h-8 w-8 items-center justify-center
              rounded-full
              border border-[color:var(--accent)]
              bg-[color:var(--accent-soft-bg)]
              text-[color:var(--accent)]
              text-xs font-semibold
              transition-transform duration-200
              group-hover:scale-105 group-hover:-rotate-6
            "
          >
            {i18n.language === "en" ? "→" : "←"}
          </span>
        </div>

        {/* Description (flex-1 pushes button down) */}
        <div className="flex-1">
          <div className="!text-[11px] md:!text-sm !text-[color:var(--text-muted)] leading-relaxed">
            <HtmlConverter html={item?.description} />
          </div>
        </div>

        {/* Footer – Button always bottom right */}
        <div className="mt-auto flex items-center justify-end text-[10px] md:text-[11px]">
          <Link
            to={`/procedures/${item.slug}`}
            className="
              inline-flex items-center gap-1 font-semibold
              text-[color:var(--accent)]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[color:var(--focus-ring)]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[color:var(--bg-subtle)]
              transition-transform duration-200
              group-hover:translate-x-0.5
            "
          >
            <span>{t("View procedure")}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </motion.li>
  );
};

export default React.memo(ProcedureMainCard);
