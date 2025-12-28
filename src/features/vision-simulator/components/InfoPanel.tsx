import React from "react";
import { useTranslation } from "react-i18next";
import type { LensConfig, VisionConditionId } from "../data/data";

type Props = {
  lens: LensConfig;
  conditionId: VisionConditionId;
};

const InfoPanel: React.FC<Props> = ({ lens, conditionId }) => {
  const { t } = useTranslation();
  const conditionLabel =
    conditionId === "cataracts"
      ? t("Vision.condition.cataract", "cataract")
      : t("Vision.condition.presbyopiaAstig", "presbyopia & astigmatism");

  return (
    <section className="space-y-3 text-[var(--text-main)]">
      <h2 className="text-base md:text-lg font-semibold">{lens?.label}</h2>
      <p className="text-xs md:text-sm text-[var(--vision-text-muted)]">
        {lens?.description}
      </p>

      <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--vision-panel-border)] p-3 md:p-4 text-xs md:text-sm space-y-2">
        <p className="font-medium">
          {t("Vision.infoPanel.title", "What this simulation shows for") + " "}
          <span className="underline decoration-[color:var(--vision-accent-underline)]">
            {conditionLabel}
          </span>
          :
        </p>
        <ul className="list-disc ms-4 space-y-1 text-[var(--text-muted)]">
          <li>
            {t(
              "Vision.infoPanel.point1",
              "Relative focus for distance, intermediate and near vision."
            )}
          </li>
          <li>
            {t(
              "Vision.infoPanel.point2",
              "How much halo/glare you may experience in low light."
            )}
          </li>
          <li>
            {t(
              "Vision.infoPanel.point3",
              "This is a visual guide only, not a clinical guarantee."
            )}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default InfoPanel;
