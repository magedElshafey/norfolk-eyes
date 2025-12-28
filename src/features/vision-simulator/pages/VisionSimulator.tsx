import React from "react";
import {
  visionConfig,
  type VisionSceneId,
  type VisionConditionId,
  type LensId,
} from "../data/data";

import SceneSelector from "../components/SceneSelector";
import ConditionSelector from "../components/ConditionSelector";
import LensSelector from "../components/LensSelector";
import VideoPanel from "../components/VideoPanel";
// import InfoPanel from "../components/InfoPanel";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetVisionSimulatorConfig from "../api/useGetVisionSimulatorConfig";
import MainBtn from "@/common/components/buttons/MainBtn";
import VisionSimulatorDisclaimer from "../components/VisionSimulatorDisclaimer";
const VisionSimulator: React.FC = () => {
  const queryResult = useGetVisionSimulatorConfig();
  const scenes =
    queryResult && queryResult?.data && queryResult?.data?.scenes?.length > 0
      ? queryResult?.data?.scenes
      : visionConfig.scenes;
  const conditions =
    queryResult &&
    queryResult?.data &&
    queryResult?.data?.conditions?.length > 0
      ? queryResult?.data?.conditions
      : visionConfig.conditions;
  const lenses =
    queryResult && queryResult?.data && queryResult?.data?.lenses?.length > 0
      ? queryResult?.data?.lenses
      : visionConfig.lenses;

  const [sceneId, setSceneId] = React.useState<VisionSceneId>(scenes[0]?.id);
  const [conditionId, setConditionId] = React.useState<VisionConditionId>(
    conditions[0]?.id
  );

  const [primaryLens, setPrimaryLens] = React.useState<LensId | null>(
    lenses[0]?.id ?? null
  );

  // ✅ mode 1: Before vs After
  const [enableBeforeAfter, setEnableBeforeAfter] = React.useState(false);

  // ✅ mode 2: Lens vs Lens
  const [enableLensCompare, setEnableLensCompare] = React.useState(false);
  const [compareLens, setCompareLens] = React.useState<LensId | null>(null);

  const scene = React.useMemo(() => {
    return scenes.find((s) => s.id === sceneId) ?? scenes[0];
  }, [scenes, sceneId]);
  const handleReset = () => {
    setSceneId(scenes[0]?.id);
    setConditionId(conditions[0]?.id);
    setPrimaryLens(null);
    setEnableBeforeAfter(false);
    setEnableLensCompare(false);
    setCompareLens(null);
  };

  // const primaryLensObj = React.useMemo(() => {
  //   return lenses.find((l) => l.id === primaryLens) ?? lenses[0];
  // }, [lenses, primaryLens]);

  // لو المستخدم فعل Lens compare ولم يحدد compareLens اختار أول عدسة مختلفة
  React.useEffect(() => {
    if (!enableLensCompare) return;
    if (!primaryLens) return;

    if (compareLens && compareLens !== primaryLens) return;

    const firstDifferent = lenses.find((l) => l.id !== primaryLens)?.id ?? null;
    setCompareLens(firstDifferent);
  }, [enableLensCompare, primaryLens, compareLens, lenses]);

  return (
    <>
      {queryResult?.data?.is_active ? (
        <FetchHandler queryResult={queryResult} skeletonType="vision-simulator">
          <section
            id="vision-simulator"
            className="containerr py-8 md:py-10 lg:py-12"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] items-start">
              {/* Controls */}
              <div className="space-y-4">
                <SceneSelector
                  scenes={scenes}
                  selected={sceneId}
                  onChange={setSceneId}
                />

                <ConditionSelector
                  conditions={conditions}
                  selected={conditionId}
                  onChange={setConditionId}
                />

                <LensSelector
                  lenses={lenses}
                  primary={primaryLens}
                  onPrimaryChange={setPrimaryLens}
                  enableBeforeAfter={enableBeforeAfter}
                  onToggleBeforeAfter={setEnableBeforeAfter}
                  enableLensCompare={enableLensCompare}
                  onToggleLensCompare={setEnableLensCompare}
                  compareLens={compareLens}
                  onCompareChange={setCompareLens}
                />
                <div className="flex items-center justify-center">
                  <MainBtn
                    type="button"
                    text="Clear"
                    onClick={handleReset}
                    variant="pill"
                  />
                </div>
                {/* {primaryLensObj && (
              <InfoPanel lens={primaryLensObj} conditionId={conditionId} />
            )} */}
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
        </FetchHandler>
      ) : null}
    </>
  );
};

export default VisionSimulator;
