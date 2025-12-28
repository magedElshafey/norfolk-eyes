import React from "react";
import { useTranslation } from "react-i18next";
import ChipButton from "./ChipButton";
import type { SceneConfig, VisionSceneId } from "../data/data";

type Props = {
  scenes: SceneConfig[];
  selected: VisionSceneId;
  onChange: (id: VisionSceneId) => void;
};

const SceneSelector: React.FC<Props> = ({ scenes, selected, onChange }) => {
  const { t } = useTranslation();

  return (
    <section
      aria-label={t("Vision.scene.aria", "Scene selection")}
      className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5"
    >
      <h2 className="text-sm font-semibold mb-3 text-[var(--text-main)]">
        {t("Choose a scene")}
      </h2>
      <p className="text-xs md:text-sm text-[var(--text-muted)] mb-4">
        {t("Select a real-world situation to see how each lens performs.")}
      </p>

      <div className="flex flex-wrap gap-2">
        {scenes.map((scene) => (
          <ChipButton
            key={scene.id}
            active={scene.id === selected}
            label={scene.label}
            onClick={() => onChange(scene.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default SceneSelector;
