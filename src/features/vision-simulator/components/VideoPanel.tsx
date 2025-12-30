import React, { useState } from "react";
import type {
  SceneConfig,
  VisionConditionId,
  LensId,
  VisionVideo,
  VisionVideoPair,
  ConditionSceneVideos,
} from "../types/vision.types";
import { useTranslation } from "react-i18next";
import { hasMedia, renderVisionMedia } from "../utils/vision.media";

type Stage = "before" | "after";

type Props = {
  scene: SceneConfig;
  conditionId: VisionConditionId;
  primaryLens: LensId | null;

  enableBeforeAfter: boolean;

  enableLensCompare: boolean;
  compareLens?: LensId | null;
};

function getPair(videos: ConditionSceneVideos, lens: LensId | null) {
  if (!lens) return undefined;
  return videos[lens] as VisionVideoPair | undefined;
}

function getBefore(videos: ConditionSceneVideos, lens: LensId | null) {
  const pair = getPair(videos, lens);
  return pair?.before || videos.before;
}

function getAfter(videos: ConditionSceneVideos, lens: LensId | null) {
  const pair = getPair(videos, lens);
  return pair?.after;
}

function PanelShell({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        bg-[var(--card-bg)]
        border border-[var(--vision-panel-border)]
        rounded-2xl p-3 md:p-4
        space-y-3
      "
    >
      <div>
        <h2 className="text-sm font-semibold text-[var(--text-main)]">
          {title}
        </h2>
        {desc ? (
          <p className="text-xs text-[var(--text-muted)]">{desc}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function MediaFigure({
  video,
  fallbackTitle,
  fallbackBody,
  className,
}: {
  video?: VisionVideo | null;
  fallbackTitle: string;
  fallbackBody: string;
  className: string;
}) {
  if (!video || !hasMedia(video)) {
    return (
      <div className="p-4 text-xs text-white/90">
        <p className="font-semibold mb-1">{fallbackTitle}</p>
        <p className="text-white/70">{fallbackBody}</p>
      </div>
    );
  }

  return (
    <>
      {renderVisionMedia(video, video.label || fallbackTitle, className)}
      <figcaption className="absolute bottom-2 left-2 text-[11px] px-2 py-1 rounded-full bg-[color:var(--vision-video-badge-bg,rgba(0,0,0,0.65))] text-white">
        {video.label || fallbackTitle}
      </figcaption>
    </>
  );
}

const VideoPanel: React.FC<Props> = ({
  scene,
  conditionId,
  primaryLens,
  enableBeforeAfter,
  enableLensCompare,
  compareLens = null,
}) => {
  const { t } = useTranslation();
  const [stage, setStage] = useState<Stage>("after");

  const conditionVideos: ConditionSceneVideos | undefined =
    scene?.videos?.[conditionId];

  if (!conditionVideos) {
    return (
      <PanelShell
        title={t("Preview unavailable")}
        desc={t("This condition does not have any simulation defined yet.")}
      >
        <div />
      </PanelShell>
    );
  }

  const canLensCompare =
    enableLensCompare &&
    !!primaryLens &&
    !!compareLens &&
    compareLens !== primaryLens;

  const className = "w-full h-[400px] lg:h-[550px] object-cover";

  // MODE 2: Lens vs Lens
  if (canLensCompare) {
    const left =
      stage === "before"
        ? getBefore(conditionVideos, primaryLens)
        : getAfter(conditionVideos, primaryLens);

    const right =
      stage === "before"
        ? getBefore(conditionVideos, compareLens)
        : getAfter(conditionVideos, compareLens);

    return (
      <PanelShell title={scene.label} desc={scene.description}>
        <div className="flex items-center justify-end">
          <div className="inline-flex rounded-full border border-[color:var(--chip-border,rgba(209,213,219,0.7))] overflow-hidden">
            <button
              type="button"
              onClick={() => setStage("before")}
              className={`px-3 py-1 text-[11px] ${
                stage === "before"
                  ? "bg-[color:var(--accent)] text-white"
                  : "bg-transparent text-[var(--text-muted)]"
              }`}
            >
              {t("Vision.stage.before", "Before")}
            </button>
            <button
              type="button"
              onClick={() => setStage("after")}
              className={`px-3 py-1 text-[11px] ${
                stage === "after"
                  ? "bg-[color:var(--accent)] text-white"
                  : "bg-transparent text-[var(--text-muted)]"
              }`}
            >
              {t("After")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <figure className="rounded-xl overflow-hidden bg-black relative">
            <MediaFigure
              video={left}
              fallbackTitle={t("Preview unavailable")}
              fallbackBody={
                stage === "after"
                  ? t("No after-image defined for this lens in this scene.")
                  : t(
                      "No before-image defined for this condition in this scene."
                    )
              }
              className={className}
            />
          </figure>

          <figure className="rounded-xl overflow-hidden bg-black relative">
            <MediaFigure
              video={right}
              fallbackTitle={t("Preview unavailable")}
              fallbackBody={
                stage === "after"
                  ? t("No after-image defined for this lens in this scene.")
                  : t(
                      "No before-image defined for this condition in this scene."
                    )
              }
              className={className}
            />
          </figure>
        </div>
      </PanelShell>
    );
  }

  // MODE 1: Before vs After (single lens)
  const before = getBefore(conditionVideos, primaryLens);
  const after = getAfter(conditionVideos, primaryLens);

  const hasBefore = !!before && hasMedia(before);
  const hasAfter = !!after && hasMedia(after);

  if (enableBeforeAfter && hasBefore && hasAfter) {
    return (
      <PanelShell title={scene.label} desc={scene.description}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <figure className="rounded-xl overflow-hidden bg-black relative">
            <MediaFigure
              video={before}
              fallbackTitle={t("Before surgery")}
              fallbackBody={t(
                "No before-image defined for this condition in this scene."
              )}
              className={className}
            />
          </figure>

          <figure className="rounded-xl overflow-hidden bg-black relative">
            <MediaFigure
              video={after}
              fallbackTitle={t("After lens / surgery")}
              fallbackBody={t(
                "No after-image defined for this lens in this scene."
              )}
              className={className}
            />
          </figure>
        </div>
      </PanelShell>
    );
  }

  // Default: single
  const single = after && hasMedia(after) ? after : before;

  if (!single || !hasMedia(single)) {
    return (
      <PanelShell
        title={t("Preview unavailable")}
        desc={t("No suitable image found for this combination.")}
      >
        <div />
      </PanelShell>
    );
  }

  const singleTitle =
    single.label ||
    (single === after ? t("After lens / surgery") : t("Before surgery"));

  return (
    <PanelShell title={scene.label} desc={scene.description}>
      <figure className="rounded-xl overflow-hidden bg-black relative">
        {renderVisionMedia(single, singleTitle, className)}
        <figcaption className="absolute bottom-2 left-2 text-[11px] px-2 py-1 rounded-full bg-[color:var(--vision-video-badge-bg,rgba(0,0,0,0.65))] text-white">
          {singleTitle}
        </figcaption>
      </figure>
    </PanelShell>
  );
};

export default React.memo(VideoPanel);
