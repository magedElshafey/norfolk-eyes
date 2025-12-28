import React from "react";
import { useTranslation } from "react-i18next";
import ChipButton from "./ChipButton";
import type { ConditionConfig, VisionConditionId } from "../data/data";

type Props = {
  conditions: ConditionConfig[];
  selected: VisionConditionId;
  onChange: (id: VisionConditionId) => void;
};

const ConditionSelector: React.FC<Props> = ({
  conditions,
  selected,
  onChange,
}) => {
  const { t } = useTranslation();
  console.log("condition selected", selected);
  return (
    <section
      aria-label={t("Vision.condition.aria", "Condition selection")}
      className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5"
    >
      <h2 className="text-sm font-semibold mb-3 text-[var(--text-main)]">
        {t("Your condition")}
      </h2>
      <p className="text-xs md:text-sm text-[var(--text-muted)] mb-4">
        {t("Choose the eye condition you want to simulate.")}
      </p>

      <div className="flex flex-wrap gap-2">
        {conditions.map((condition) => {
          console.log("   id", condition?.id);
          console.log("selected", selected);
          console.log("is true", condition?.id === selected);
          return (
            <ChipButton
              key={condition.id}
              active={condition.id === selected}
              label={condition.label}
              onClick={() => onChange(condition.id)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ConditionSelector;
