// import React from "react";
// import { useTranslation } from "react-i18next";
// import ChipButton from "./ChipButton";
// import type { LensConfig, LensId } from "../data/data";

// type Props = {
//   lenses: LensConfig[];
//   primary: LensId | null;
//   compare?: LensId | null;
//   enableCompare: boolean;
//   onPrimaryChange: (id: LensId) => void;
//   onCompareChange: (id: LensId | null) => void;
//   onToggleCompare: (val: boolean) => void;
// };

// const LensSelector: React.FC<Props> = ({
//   lenses,
//   primary,
//   enableCompare,
//   onPrimaryChange,
//   onToggleCompare,
// }) => {
//   const { t } = useTranslation();

//   return (
//     <section
//       aria-label={t("Vision.lens.aria", "Lens selection")}
//       className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5 space-y-4"
//     >
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <h2 className="text-sm font-semibold mb-1 text-[var(--text-main)]">
//             {t("Vision.lens.heading", "Lens choice")}
//           </h2>
//           <p className="text-xs text-[var(--text-muted)]">
//             {t("Vision.lens.help", "Select the lens you want to preview.")}
//           </p>
//         </div>

//         <label className="inline-flex items-center gap-2 text-[11px] md:text-xs text-[var(--text-muted)]">
//           <input
//             type="checkbox"
//             className="h-3.5 w-3.5"
//             checked={enableCompare}
//             onChange={(e) => onToggleCompare(e.target.checked)}
//           />
//           <span>{t("Vision.lens.compare", "Compare lenses")}</span>
//         </label>
//       </div>

//       <div className="space-y-2">
//         <p className="text-[11px] text-[var(--text-muted)]">
//           {t("Vision.lens.primary", "Primary lens")}
//         </p>
//         <div className="flex flex-wrap gap-2">
//           {lenses.map((lens) => (
//             <ChipButton
//               key={lens.id}
//               active={lens.id === primary}
//               label={lens.shortLabel}
//               onClick={() => onPrimaryChange(lens.id)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LensSelector;
// src/features/vision-simulator/components/LensSelector.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import ChipButton from "./ChipButton";
import type { LensConfig, LensId } from "../data/data";

type Props = {
  lenses: LensConfig[];

  // current selection
  primary: LensId | null;

  // ✅ mode 1: before vs after (same lens)
  enableBeforeAfter: boolean;
  onToggleBeforeAfter: (val: boolean) => void;

  // ✅ mode 2: lens vs lens
  enableLensCompare: boolean;
  compareLens: LensId | null;
  onToggleLensCompare: (val: boolean) => void;
  onCompareChange: (id: LensId | null) => void;

  // changes
  onPrimaryChange: (id: LensId) => void;
};

const LensSelector: React.FC<Props> = ({
  lenses,
  primary,
  enableBeforeAfter,
  onToggleBeforeAfter,

  enableLensCompare,
  compareLens,
  onToggleLensCompare,
  onCompareChange,

  onPrimaryChange,
}) => {
  const { t } = useTranslation();

  const handlePrimaryPick = (id: LensId) => {
    onPrimaryChange(id);
    // لو نفس العدسة كانت مختارة للمقارنة -> افصلها
    if (compareLens === id) onCompareChange(null);
  };

  const handleComparePick = (id: LensId) => {
    if (primary && id === primary) return;
    onCompareChange(id);
  };

  return (
    <section
      aria-label={t("Vision.lens.aria", "Lens selection")}
      className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5 space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold mb-1 text-[var(--text-main)]">
            {t("Lens choice")}
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            {t("Select the lens you want to preview.")}
          </p>
        </div>
      </div>

      {/* ✅ Primary lens */}
      <div className="space-y-2">
        <p className="text-[11px] text-[var(--text-muted)]">
          {t("Primary lens")}
        </p>
        <div className="flex flex-wrap gap-2">
          {lenses.map((lens) => (
            <ChipButton
              key={lens.id}
              active={lens.id === primary}
              label={lens.shortLabel}
              onClick={() => handlePrimaryPick(lens.id)}
            />
          ))}
        </div>
      </div>

      {/* ✅ Mode toggles (يحافظ على الهوية) */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        {/* Before/After toggle */}
        <label className="inline-flex items-center gap-2 text-[11px] md:text-xs text-[var(--text-muted)]">
          <input
            type="checkbox"
            className="h-3.5 w-3.5"
            checked={enableBeforeAfter}
            onChange={(e) => onToggleBeforeAfter(e.target.checked)}
          />
          <span>{t("Before vs After")}</span>
        </label>

        {/* Lens compare toggle */}
        <label className="inline-flex items-center gap-2 text-[11px] md:text-xs text-[var(--text-muted)]">
          <input
            type="checkbox"
            className="h-3.5 w-3.5"
            checked={enableLensCompare}
            onChange={(e) => {
              const val = e.target.checked;
              onToggleLensCompare(val);
              if (!val) onCompareChange(null);
            }}
          />
          <span>{t("Compare lenses")}</span>
        </label>
      </div>

      {/* ✅ Comparison lens chips */}
      {enableLensCompare && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-[var(--text-muted)]">
              {t("Comparison lens")}
            </p>

            {compareLens && (
              <button
                type="button"
                onClick={() => onCompareChange(null)}
                className="text-[11px] underline text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {t("Clear")}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {lenses.map((lens) => {
              const disabled = !!primary && lens.id === primary;
              return (
                <ChipButton
                  key={lens.id}
                  active={lens.id === compareLens}
                  label={lens.shortLabel}
                  disabled={disabled}
                  onClick={() => !disabled && handleComparePick(lens.id)}
                />
              );
            })}
          </div>

          {!compareLens && (
            <p className="text-[11px] text-[var(--text-muted)]">
              {t("Pick a second lens to compare side-by-side.")}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default LensSelector;
