import React from "react";
import { useTranslation } from "react-i18next";
import ChipButton from "./ChipButton";
import type { LensConfig, LensId } from "../types/vision.types";

type Props = {
  lenses: LensConfig[];

  primary: LensId | null;
  onPrimaryChange: (id: LensId) => void;

  enableBeforeAfter: boolean;
  onToggleBeforeAfter: (val: boolean) => void;

  enableLensCompare: boolean;
  compareLens: LensId | null;
  onToggleLensCompare: (val: boolean) => void;
  onCompareChange: (id: LensId | null) => void;
};

const LensSelector: React.FC<Props> = ({
  lenses,
  primary,
  onPrimaryChange,

  enableBeforeAfter,
  onToggleBeforeAfter,

  enableLensCompare,
  compareLens,
  onToggleLensCompare,
  onCompareChange,
}) => {
  const { t } = useTranslation();

  if (!lenses.length) return null;

  const handlePrimaryPick = (id: LensId) => {
    onPrimaryChange(id);
    if (compareLens === id) onCompareChange(null);
  };

  return (
    <section
      aria-label={t("Vision.lens.aria", "Lens selection")}
      className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5 space-y-4"
    >
      <div>
        <h2 className="text-sm font-semibold mb-1 text-[var(--text-main)]">
          {t("Lens choice")}
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          {t("Select the lens you want to preview.")}
        </p>
      </div>

      {/* Primary */}
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

      {/* Toggles */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <label className="inline-flex items-center gap-2 text-[11px] md:text-xs text-[var(--text-muted)]">
          <input
            type="checkbox"
            className="h-3.5 w-3.5"
            checked={enableBeforeAfter}
            onChange={(e) => onToggleBeforeAfter(e.target.checked)}
          />
          <span>{t("Before vs After")}</span>
        </label>

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

      {/* Compare */}
      {enableLensCompare ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-[var(--text-muted)]">
              {t("Comparison lens")}
            </p>

            {compareLens ? (
              <button
                type="button"
                onClick={() => onCompareChange(null)}
                className="text-[11px] underline text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {t("Clear")}
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {lenses.map((lens) => {
              const disabled = !!primary && lens.id === primary;
              return (
                <ChipButton
                  key={lens.id}
                  active={lens.id === compareLens}
                  disabled={disabled}
                  label={lens.shortLabel}
                  onClick={() => !disabled && onCompareChange(lens.id)}
                />
              );
            })}
          </div>

          {!compareLens ? (
            <p className="text-[11px] text-[var(--text-muted)]">
              {t("Pick a second lens to compare side-by-side.")}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default React.memo(LensSelector);
