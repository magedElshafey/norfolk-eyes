// import React from "react";
// import { useTranslation } from "react-i18next";
// import { cv } from "css-variants";
// import { twMerge } from "tailwind-merge";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";

// const themes = {
//   main: `
//     bg-[color:var(--btn-main-bg)]
//     text-[color:var(--btn-main-text)]
//     border-[color:var(--btn-main-border)]
//   `,
//   secondary: `
//     bg-[color:var(--btn-secondary-bg)]
//     text-[color:var(--btn-secondary-text)]
//     border-[color:var(--btn-secondary-border)]
//   `,
//   outline: `
//     bg-[color:var(--btn-outline-bg)]
//     text-[color:var(--btn-outline-text)]
//     border-[color:var(--btn-outline-border)]
//   `,
//   danger: `
//     bg-[color:var(--btn-danger-bg)]
//     text-[color:var(--btn-danger-text)]
//     border-[color:var(--btn-danger-border)]
//   `,
// } as const;

// type ThemeKey = keyof typeof themes;
// type VariantKey = "pill" | "solid" | "chip";

// const buttonVariants = cv({
//   base: `
//     relative inline-flex items-center justify-center
//     rounded-full font-semibold
//     border transition-all duration-300
//     disabled:cursor-not-allowed disabled:opacity-50
//     overflow-hidden group select-none
//     focus:outline-none focus-visible:ring-2
//     focus-visible:ring-offset-2
//     focus-visible:ring-[color:var(--focus-ring)]
//     focus-visible:ring-offset-[color:var(--bg-subtle)]
//   `,
//   variants: {
//     theme: { ...themes },
//     variant: {
//       pill: `
//         px-5 md:px-6 py-2.5
//         text-xs md:text-sm
//       `,
//       solid: `
//         px-5 md:px-6 py-2.5
//         text-xs md:text-sm
//       `,
//       chip: `
//         px-3 py-1.5
//         text-[0.7rem] md:text-xs
//       `,
//     },
//   },
//   defaultVariants: {
//     theme: "main",
//     variant: "pill",
//   },
// });

// export interface MainBtnProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   text?: string;
//   isPending?: boolean;
//   theme?: ThemeKey;
//   variant?: VariantKey;
//   hasIcon?: boolean;
//   icon?: React.ReactNode;
//   showArrow?: boolean;
// }

// const MainBtn: React.FC<React.PropsWithChildren<MainBtnProps>> = ({
//   text,
//   isPending = false,
//   className,
//   theme = "main",
//   variant = "pill",
//   hasIcon = false,
//   icon,
//   children,
//   disabled,
//   showArrow = true,
//   ...rest
// }) => {
//   const { t, i18n } = useTranslation();
//   const arrow = i18n.language === "en" ? "→" : "←";

//   const isChip = variant === "chip";
//   const isPill = variant === "pill";

//   const label = text && !children ? t(text) : children || "";

//   return (
//     <button
//       disabled={isPending || disabled}
//       aria-busy={isPending}
//       aria-label={
//         isPending
//           ? t("Submitting, please wait")
//           : typeof label === "string"
//           ? label
//           : undefined
//       }
//       className={`${
//         isPill && theme === "main"
//           ? "hover:text-[var(--bg-surface)]"
//           : isPill && theme === "secondary"
//           ? "hover:text-[var(--accent)]"
//           : null
//       } ${twMerge(buttonVariants({ theme, variant }), className)}`}
//       {...rest}
//     >
//       {/* خلفية هوفر بسيطة في حالة pill */}
//       {isPill && (
//         <span
//           className={` absolute inset-y-0 left-0
//             w-0
//             group-hover:w-full
//             transition-[width]
//             duration-300 ease-out ${
//               theme === "main"
//                 ? "bg-[color:var(--accent)]"
//                 : "  bg-[color:var(--accent-soft-bg)]"
//             }
//           `}
//           aria-hidden="true"
//         />
//       )}

//       <span
//         className={twMerge(
//           `
//           relative z-10 inline-flex items-center gap-2
//           text-[0.7rem] md:text-xs
//           transition-colors
//         `,
//           isChip ? "text-[color:var(--accent)]" : ""
//         )}
//       >
//         {isPending ? (
//           <AiOutlineLoading3Quarters
//             className="animate-spin"
//             size={18}
//             aria-hidden="true"
//           />
//         ) : (
//           <>
//             {hasIcon && icon && (
//               <span className="text-base" aria-hidden="true">
//                 {icon}
//               </span>
//             )}

//             {label}

//             {!isChip && showArrow && (
//               <span
//                 className="
//                   translate-x-0
//                   group-hover:translate-x-0.5
//                   transition-transform
//                 "
//                 aria-hidden="true"
//               >
//                 {arrow}
//               </span>
//             )}
//           </>
//         )}
//       </span>
//     </button>
//   );
// };

// export default React.memo(MainBtn);
import React from "react";
import { useTranslation } from "react-i18next";
import { cv } from "css-variants";
import { twMerge } from "tailwind-merge";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const themes = {
  main: `
    bg-[color:var(--btn-main-bg)]
    text-[color:var(--btn-main-text)]
    border-[color:var(--btn-main-border)]
  `,
  secondary: `
    bg-[color:var(--btn-secondary-bg)]
    text-[color:var(--btn-secondary-text)]
    border-[color:var(--btn-secondary-border)]
  `,
  outline: `
    bg-[color:var(--btn-outline-bg)]
    text-[color:var(--btn-outline-text)]
    border-[color:var(--btn-outline-border)]
  `,
  danger: `
    bg-[color:var(--btn-danger-bg)]
    text-[color:var(--btn-danger-text)]
    border-[color:var(--btn-danger-border)]
  `,
} as const;

type ThemeKey = keyof typeof themes;
type VariantKey = "pill" | "solid" | "chip";

const buttonVariants = cv({
  base: `
    relative inline-flex items-center justify-center
    rounded-full font-semibold
    border transition-all duration-300
    disabled:cursor-not-allowed disabled:opacity-50
    overflow-hidden group select-none
    focus:outline-none focus-visible:ring-2 
    focus-visible:ring-offset-2
    focus-visible:ring-[color:var(--focus-ring)]
    focus-visible:ring-offset-[color:var(--bg-subtle)]
    will-change-transform
  `,
  variants: {
    theme: { ...themes },
    variant: {
      pill: `
        px-5 md:px-6 py-2.5
        text-xs md:text-sm
      `,
      solid: `
        px-5 md:px-6 py-2.5
        text-xs md:text-sm
      `,
      chip: `
        px-3 py-1.5
        text-[0.7rem] md:text-xs
      `,
    },
  },
  defaultVariants: {
    theme: "main",
    variant: "pill",
  },
});

export interface MainBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isPending?: boolean;
  theme?: ThemeKey;
  variant?: VariantKey;
  hasIcon?: boolean;
  icon?: React.ReactNode;
  showArrow?: boolean;
}

const MainBtn: React.FC<React.PropsWithChildren<MainBtnProps>> = ({
  text,
  isPending = false,
  className,
  theme = "main",
  variant = "pill",
  hasIcon = false,
  icon,
  children,
  disabled,
  showArrow = true,
  ...rest
}) => {
  const { t, i18n } = useTranslation();
  const arrow = i18n.language === "en" ? "→" : "←";

  const isChip = variant === "chip";
  const isPill = variant === "pill";

  const label = text && !children ? t(text) : children || "";

  return (
    <button
      disabled={isPending || disabled}
      aria-busy={isPending}
      aria-label={
        isPending
          ? t("Submitting, please wait")
          : typeof label === "string"
          ? label
          : undefined
      }
      // ✅ مهم: شيلنا hover:text من هنا تمامًا
      className={twMerge(buttonVariants({ theme, variant }), className)}
      // ✅ تحسين إضافي (لو بعض الأجهزة بتفلكر): دعم للمتصفح
      style={{
        willChange: "transform",
      }}
      {...rest}
    >
      {/* ✅ خلفية هوفر ناعمة: بدل width animation استخدمنا transform scaleX */}
      {isPill && (
        <span
          className={twMerge(
            `
              absolute inset-0
              origin-left
              scale-x-0
              group-hover:scale-x-100
              transition-transform
              duration-300 ease-out
            `,
            theme === "main"
              ? "bg-[color:var(--accent)]"
              : "bg-[color:var(--accent-soft-bg)]"
          )}
          aria-hidden="true"
        />
      )}

      <span
        className={twMerge(
          `
            relative z-10 inline-flex items-center gap-2
            text-[0.7rem] md:text-xs
            transition-colors duration-200
          `,
          // chip لونه ثابت زي ما هو
          isChip ? "text-[color:var(--accent)]" : "",

          // ✅ نقلنا لون الهوفر هنا بدل hover:text على الزر (يقلل/يلغي الفلكر)
          isPill && theme === "main"
            ? "group-hover:text-[var(--bg-surface)]"
            : "",
          isPill && theme === "secondary"
            ? "group-hover:text-[var(--accent)]"
            : ""
        )}
      >
        {isPending ? (
          <AiOutlineLoading3Quarters
            className="animate-spin"
            size={18}
            aria-hidden="true"
          />
        ) : (
          <>
            {hasIcon && icon && (
              <span className="text-base" aria-hidden="true">
                {icon}
              </span>
            )}

            {label}

            {!isChip && showArrow && (
              <span
                className="
                  translate-x-0
                  group-hover:translate-x-0.5
                  transition-transform
                "
                aria-hidden="true"
              >
                {arrow}
              </span>
            )}
          </>
        )}
      </span>
    </button>
  );
};

export default React.memo(MainBtn);
