import React from "react";
import type {
  SceneConfig,
  VisionConditionId,
  LensId,
  VisionVideo,
  VisionVideoPair,
  ConditionSceneVideos,
} from "../data/data";
import { useTranslation } from "react-i18next";

/** Animated frames (زي اللي عندك) */
type AnimatedFramesProps = {
  frames: string[];
  fps?: number;
  alt?: string;
  className?: string;
};

const AnimatedFrames: React.FC<AnimatedFramesProps> = ({
  frames,
  fps = 8,
  alt = "",
  className = "",
}) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!frames.length) return;
    const interval = 1000 / fps;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [frames, fps]);

  return <img src={frames[index]} alt={alt} className={className} />;
};

function hasMedia(v?: VisionVideo) {
  return !!(v && (v.src || (v.frames && v.frames.length > 0)));
}

function renderVisionMedia(video: VisionVideo, alt: string, className: string) {
  if (video.frames && video.frames.length > 0) {
    return (
      <AnimatedFrames
        frames={video.frames}
        fps={video.fps ?? 8}
        alt={alt}
        className={className}
      />
    );
  }
  if (video.src) return <img src={video.src} alt={alt} className={className} />;
  return null;
}

type Stage = "before" | "after";

type Props = {
  scene: SceneConfig;
  conditionId: VisionConditionId;

  primaryLens: LensId | null;

  // ✅ mode 1
  enableBeforeAfter: boolean;

  // ✅ mode 2
  enableLensCompare: boolean;
  compareLens?: LensId | null;
};

const VideoPanel: React.FC<Props> = ({
  scene,
  conditionId,
  primaryLens,
  enableBeforeAfter,
  enableLensCompare,
  compareLens = null,
}) => {
  const { t } = useTranslation();
  const [stage, setStage] = React.useState<Stage>("after");

  const conditionVideos: ConditionSceneVideos | undefined =
    scene.videos[conditionId];

  if (!conditionVideos) {
    return (
      <section className="bg-[var(--vision-panel-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5">
        <h2 className="text-sm font-semibold mb-2 text-[var(--vision-text-main)]">
          {t("Preview unavailable")}
        </h2>
        <p className="text-xs md:text-sm text-[var(--vision-text-muted)]">
          {t("This condition does not have any simulation defined yet.")}
        </p>
      </section>
    );
  }

  const conditionBefore = conditionVideos.before;

  const getPair = (lens: LensId | null): VisionVideoPair | undefined => {
    if (!lens) return undefined;
    return conditionVideos[lens] as VisionVideoPair | undefined;
  };

  const getBeforeForLens = (lens: LensId | null) => {
    const pair = getPair(lens);
    return pair?.before || conditionBefore; // lens override لو موجود، وإلا قبل الحالة العامة
  };

  const getAfterForLens = (lens: LensId | null) => {
    const pair = getPair(lens);
    return pair?.after;
  };

  // =========================
  // ✅ MODE 2: Lens vs Lens (مع Tabs Before/After)
  // =========================
  const canLensCompare =
    enableLensCompare &&
    !!primaryLens &&
    !!compareLens &&
    compareLens !== primaryLens;

  if (canLensCompare) {
    const leftVideo =
      stage === "before"
        ? getBeforeForLens(primaryLens)
        : getAfterForLens(primaryLens);

    const rightVideo =
      stage === "before"
        ? getBeforeForLens(compareLens)
        : getAfterForLens(compareLens);

    return (
      <section
        className="
          bg-[var(--card-bg)]
          border border-[var(--vision-panel-border)]
          rounded-2xl p-3 md:p-4
          space-y-3
        "
        aria-label={t("Lens comparison preview")}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-main)]">
              {scene.label}
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              {scene.description}
            </p>
          </div>

          {/* Tabs Before/After (يحافظ على الفكرة) */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {/* Lens A */}
          <figure className="rounded-xl overflow-hidden bg-[color:var(--vision-video-bg,#000)] relative">
            {leftVideo && hasMedia(leftVideo) ? (
              <>
                {renderVisionMedia(
                  leftVideo,
                  leftVideo.label || t("Left preview"),
                  "w-full h-[400px] lg:h-[550px] object-cover"
                )}
                <figcaption className="absolute bottom-2 left-2 text-[11px] px-2 py-1 rounded-full bg-[color:var(--vision-video-badge-bg,rgba(0,0,0,0.65))] text-white">
                  {leftVideo.label ||
                    (stage === "before"
                      ? t("Before surgery")
                      : t("After lens / surgery"))}
                </figcaption>
              </>
            ) : (
              <div className="p-4 text-xs text-white/90">
                <p className="font-semibold mb-1">{t("Preview unavailable")}</p>
                <p className="text-white/70">
                  {stage === "after"
                    ? t("No after-image defined for this lens in this scene.")
                    : t(
                        "No before-image defined for this condition in this scene."
                      )}
                </p>
              </div>
            )}
          </figure>

          {/* Lens B */}
          <figure className="rounded-xl overflow-hidden bg-[color:var(--vision-video-bg,#000)] relative">
            {rightVideo && hasMedia(rightVideo) ? (
              <>
                {renderVisionMedia(
                  rightVideo,
                  rightVideo.label || t("Right preview"),
                  "w-full h-[400px] lg:h-[550px] object-cover"
                )}
                <figcaption className="absolute bottom-2 left-2 text-[11px] px-2 py-1 rounded-full bg-[color:var(--vision-video-badge-bg,rgba(0,0,0,0.65))] text-white">
                  {rightVideo.label ||
                    (stage === "before"
                      ? t("Before surgery")
                      : t("After lens / surgery"))}
                </figcaption>
              </>
            ) : (
              <div className="p-4 text-xs text-white/90">
                <p className="font-semibold mb-1">
                  {t("Vision.preview.unavailableTitle", "Preview unavailable")}
                </p>
                <p className="text-white/70">
                  {stage === "after"
                    ? t("No after-image defined for this lens in this scene.")
                    : t(
                        "No before-image defined for this condition in this scene."
                      )}
                </p>
              </div>
            )}
          </figure>
        </div>
      </section>
    );
  }

  // =========================
  // ✅ MODE 1: Before vs After (Single Lens) — زي ما عندك
  // =========================
  const lensBefore = getBeforeForLens(primaryLens);
  const lensAfter = getAfterForLens(primaryLens);

  const hasBefore = !!(lensBefore && hasMedia(lensBefore));
  const hasAfter = !!(lensAfter && hasMedia(lensAfter));
  const hasBoth = hasBefore && hasAfter;

  if (enableBeforeAfter && hasBoth && lensBefore && lensAfter) {
    return (
      <section
        className="
          bg-[var(--card-bg)]
          border border-[var(--vision-panel-border)]
          rounded-2xl p-3 md:p-4
          space-y-3
        "
        aria-label={t("Vision.preview.aria", "Vision simulation preview")}
      >
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-main)]">
            {scene.label}
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            {scene.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <figure className="rounded-xl overflow-hidden bg-[color:var(--vision-video-bg,#000)] relative">
            {renderVisionMedia(
              lensBefore,
              lensBefore.label || t("Before surgery simulation"),
              "w-full h-[400px] lg:h-[550px] object-cover"
            )}
            <figcaption className="absolute bottom-2 left-2 text-[11px] px-2 py-1 rounded-full bg-[color:var(--vision-video-badge-bg,rgba(0,0,0,0.65))] text-white">
              {lensBefore.label || t("Before surgery")}
            </figcaption>
          </figure>

          <figure className="rounded-xl overflow-hidden bg-[color:var(--vision-video-bg,#000)] relative">
            {renderVisionMedia(
              lensAfter,
              lensAfter.label ||
                t("Vision.preview.afterAlt", "After lens preview"),
              "w-full h-[400px] lg:h-[550px] object-cover"
            )}
            <figcaption className="absolute bottom-2 left-2 text-[11px] px-2 py-1 rounded-full bg-[color:var(--vision-video-badge-bg,rgba(0,0,0,0.65))] text-white">
              {lensAfter.label || t("After lens / surgery")}
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

  // =========================
  // ✅ Default: Single preview (بعد العدسة لو موجود، وإلا قبل)
  // =========================
  const single = lensAfter || lensBefore;

  if (!single || !hasMedia(single)) {
    return (
      <section className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5">
        <h2 className="text-sm font-semibold mb-2 text-[var(--text-main)]">
          {t("Preview unavailable")}
        </h2>
        <p className="text-xs md:text-sm text-[var(--text-muted)]">
          {t("No suitable image found for this combination.")}
        </p>
      </section>
    );
  }

  const isAfter = single === lensAfter;

  return (
    <section
      className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-3 md:p-4 space-y-3"
      aria-label={t("Vision simulation preview")}
    >
      <div>
        <h2 className="text-sm font-semibold text-[var(--text-main)]">
          {scene.label}
        </h2>
        <p className="text-xs text-[var(--text-muted)]">{scene.description}</p>
      </div>

      <figure className="rounded-xl overflow-hidden bg-[color:var(--video-bg,#000)] relative">
        {renderVisionMedia(
          single,
          isAfter
            ? t("After lens simulation")
            : t("Before condition simulation"),
          "w-full h-full max-h-[550px] object-cover"
        )}
        <figcaption className="absolute bottom-2 left-2 text-[11px] px-2 py-1 rounded-full bg-[color:var(--vision-video-badge-bg,rgba(0,0,0,0.65))] text-white">
          {single.label ||
            (isAfter ? t("After lens / surgery") : t("Before surgery"))}
        </figcaption>
      </figure>
    </section>
  );
};

export default VideoPanel;
