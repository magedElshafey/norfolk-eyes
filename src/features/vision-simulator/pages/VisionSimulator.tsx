import React, { useEffect, useMemo, useState } from "react";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import MainBtn from "@/common/components/buttons/MainBtn";
import useGetVisionSimulatorConfig from "../api/useGetVisionSimulatorConfig";
import type {
  LensId,
  VisionConditionId,
  VisionSceneId,
} from "../types/vision.types";

import OptionSelector from "../components/OptionSelector";
import LensSelector from "../components/LensSelector";
import VideoPanel from "../components/VideoPanel";
import VisionSimulatorDisclaimer from "../components/VisionSimulatorDisclaimer";
import VisionEmptyState from "../components/VisionEmptyState";
import { useTranslation } from "react-i18next";

const VisionSimulator: React.FC = () => {
  const { t } = useTranslation();
  const query = useGetVisionSimulatorConfig();
  const config = query.data;

  // ✅ API ONLY
  const scenes = config?.scenes ?? [];
  const conditions = config?.conditions ?? [];
  const lenses = config?.lenses ?? [];

  // safe defaults after data arrives
  const [sceneId, setSceneId] = useState<VisionSceneId | null>(null);
  const [conditionId, setConditionId] = useState<VisionConditionId | null>(
    null
  );
  const [primaryLens, setPrimaryLens] = useState<LensId | null>(null);

  const [enableBeforeAfter, setEnableBeforeAfter] = useState(false);
  const [enableLensCompare, setEnableLensCompare] = useState(false);
  const [compareLens, setCompareLens] = useState<LensId | null>(null);

  // initialize selections when API data is ready
  useEffect(() => {
    if (!scenes.length || !conditions.length || !lenses.length) return;

    setSceneId((prev) => prev ?? scenes[0].id);
    setConditionId((prev) => prev ?? conditions[0].id);
    setPrimaryLens((prev) => prev ?? lenses[0].id);
  }, [scenes, conditions, lenses]);

  const scene = useMemo(() => {
    if (!scenes.length || !sceneId) return null;
    return scenes.find((s) => s.id === sceneId) ?? scenes[0] ?? null;
  }, [scenes, sceneId]);

  // auto choose compare lens when compare enabled
  useEffect(() => {
    if (!enableLensCompare) return;
    if (!primaryLens) return;

    if (compareLens && compareLens !== primaryLens) return;

    const firstDifferent = lenses.find((l) => l.id !== primaryLens)?.id ?? null;
    setCompareLens(firstDifferent);
  }, [enableLensCompare, primaryLens, compareLens, lenses]);

  const handleReset = () => {
    setSceneId(scenes[0]?.id ?? null);
    setConditionId(conditions[0]?.id ?? null);
    setPrimaryLens(lenses[0]?.id ?? null);
    setEnableBeforeAfter(false);
    setEnableLensCompare(false);
    setCompareLens(null);
  };

  const onRetry = () => {
    query.refetch();
  };

  const isRetrying = query.isFetching;

  return (
    <FetchHandler queryResult={query} skeletonType="vision-simulator">
      {/* ✅ 1) لو backend قافل السكشن */}
      {config && config.is_active === false ? (
        <VisionEmptyState
          variant="inactive"
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      ) : /* ✅ 2) لو الداتا ناقصة */ config &&
        config.is_active === true &&
        (!scenes.length || !conditions.length || !lenses.length) ? (
        <VisionEmptyState
          variant="missing"
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      ) : /* ✅ 3) لو في error */ query.isError ? (
        <VisionEmptyState
          variant="error"
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      ) : /* ✅ 4) الحالة الطبيعية */ config?.is_active &&
        scene &&
        sceneId &&
        conditionId ? (
        <section
          id="vision-simulator"
          className="containerr py-8 md:py-10 lg:py-12"
          aria-label={t("Vision.simulator.aria", "Vision simulator")}
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] items-start">
            {/* Controls */}
            <div className="space-y-4">
              <OptionSelector
                ariaLabel={t("Vision.scene.aria", "Scene selection")}
                title={t("Vision.scene.title", "Choose a scene")}
                helper={t(
                  "Vision.scene.helper",
                  "Select a real-world situation to see how each lens performs."
                )}
                options={scenes}
                selectedId={sceneId}
                onChange={(id) => setSceneId(id)}
              />

              <OptionSelector
                ariaLabel={t("Vision.condition.aria", "Condition selection")}
                title={t("Vision.condition.title", "Your condition")}
                helper={t(
                  "Vision.condition.helper",
                  "Choose the eye condition you want to simulate."
                )}
                options={conditions}
                selectedId={conditionId}
                onChange={(id) => setConditionId(id)}
              />

              <LensSelector
                lenses={lenses}
                primary={primaryLens}
                onPrimaryChange={(id) => setPrimaryLens(id)}
                enableBeforeAfter={enableBeforeAfter}
                onToggleBeforeAfter={(v) => setEnableBeforeAfter(v)}
                enableLensCompare={enableLensCompare}
                onToggleLensCompare={(v) => setEnableLensCompare(v)}
                compareLens={compareLens}
                onCompareChange={(id) => setCompareLens(id)}
              />

              <div className="flex items-center justify-center">
                <MainBtn
                  type="button"
                  text={t("Vision.clear", "Clear")}
                  onClick={handleReset}
                  variant="pill"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <VideoPanel
                scene={scene}
                conditionId={conditionId}
                primaryLens={primaryLens}
                enableBeforeAfter={enableBeforeAfter}
                enableLensCompare={enableLensCompare}
                compareLens={compareLens}
              />

              <VisionSimulatorDisclaimer />
            </div>
          </div>
        </section>
      ) : (
        // fallback لطيف لو config لسه null أو values مش ready
        <VisionEmptyState
          variant="missing"
          onRetry={onRetry}
          isRetrying={isRetrying}
        />
      )}
    </FetchHandler>
  );
};

export default VisionSimulator;
