import React from "react";
import { twMerge } from "tailwind-merge";

type SkeletonMode = "single" | "beforeAfter" | "lensCompare";

type Props = {
  /** نفس الحالات اللي عندك */
  mode?: SkeletonMode;
  /** في lensCompare: هل نظهر تاب Before/After فوق المقارنة؟ */
  showStageTabs?: boolean;
  /** في lensCompare: هل نظهر اختيار comparison lens؟ */
  showComparisonLensSelector?: boolean;
};

const Shimmer = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        `
          relative overflow-hidden
          bg-[color:var(--skeleton-bg,rgba(148,163,184,0.18))]
          border border-[color:var(--skeleton-border,rgba(148,163,184,0.25))]
          rounded-xl
        `,
        className
      )}
      aria-hidden="true"
    >
      <div
        className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_1.25s_infinite]
          bg-gradient-to-r
          from-transparent
          via-[color:var(--skeleton-shine,rgba(255,255,255,0.35))]
          to-transparent
        "
      />
    </div>
  );
};

const Line = ({
  w = "w-full",
  className = "",
}: {
  w?: string;
  className?: string;
}) => {
  return <Shimmer className={twMerge("h-3 rounded-lg", w, className)} />;
};

const ChipRow = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <Shimmer
          key={i}
          className={twMerge(
            "h-7 rounded-full",
            i % 3 === 0 ? "w-24" : i % 3 === 1 ? "w-20" : "w-28"
          )}
        />
      ))}
    </div>
  );
};

const SelectorCardSkeleton = ({
  titleWidth = "w-28",
  lines = 2,
  chips = 7,
}: {
  titleWidth?: string;
  lines?: number;
  chips?: number;
}) => {
  return (
    <section className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5 space-y-4">
      <div className="space-y-2">
        <Shimmer className={twMerge("h-4 rounded-lg", titleWidth)} />
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Line key={i} w={i === 0 ? "w-11/12" : "w-9/12"} />
          ))}
        </div>
      </div>

      <ChipRow count={chips} />
    </section>
  );
};

const LensSelectorSkeleton = ({
  showComparison = false,
}: {
  showComparison?: boolean;
}) => {
  return (
    <section className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5 space-y-4">
      <div className="space-y-2">
        <Shimmer className="h-4 w-28 rounded-lg" />
        <Line w="w-10/12" />
      </div>

      {/* Primary lens */}
      <div className="space-y-2">
        <Shimmer className="h-3 w-24 rounded-lg" />
        <ChipRow count={7} />
      </div>

      {/* toggles row (Before/After + Compare lenses) */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Shimmer className="h-6 w-36 rounded-full" />
        <Shimmer className="h-6 w-40 rounded-full" />
      </div>

      {/* Comparison lens */}
      {showComparison && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Shimmer className="h-3 w-28 rounded-lg" />
            <Shimmer className="h-3 w-12 rounded-lg" />
          </div>
          <ChipRow count={7} />
          <Line w="w-10/12" className="h-2.5" />
        </div>
      )}
    </section>
  );
};

const InfoPanelSkeleton = () => {
  return (
    <section className="space-y-3 text-[var(--text-main)]">
      <Shimmer className="h-5 w-48 rounded-lg" />
      <div className="space-y-2">
        <Line w="w-11/12" />
        <Line w="w-9/12" />
      </div>

      <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--vision-panel-border)] p-3 md:p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Line w="w-40" />
          <Shimmer className="h-3 w-20 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Shimmer className="h-3 w-3 rounded-full mt-1" />
            <Line w="w-10/12" />
          </div>
          <div className="flex items-start gap-2">
            <Shimmer className="h-3 w-3 rounded-full mt-1" />
            <Line w="w-9/12" />
          </div>
          <div className="flex items-start gap-2">
            <Shimmer className="h-3 w-3 rounded-full mt-1" />
            <Line w="w-8/12" />
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoFigureSkeleton = ({
  heightClass = "h-[400px] lg:h-[550px]",
}: {
  heightClass?: string;
}) => {
  return (
    <figure className="rounded-xl overflow-hidden bg-[color:var(--vision-video-bg,#000000)] relative">
      <Shimmer
        className={twMerge("w-full", heightClass, "rounded-none border-0")}
      />

      {/* bottom-left caption pill */}
      <div className="absolute bottom-2 left-2">
        <Shimmer className="h-6 w-36 rounded-full border-0 bg-[color:var(--vision-video-badge-bg,rgba(0,0,0,0.35))]" />
      </div>
    </figure>
  );
};

const VideoPanelSkeleton = ({
  mode = "beforeAfter",
  showStageTabs = true,
}: {
  mode?: SkeletonMode;
  showStageTabs?: boolean;
}) => {
  const twoCols = mode === "beforeAfter" || mode === "lensCompare";

  return (
    <section
      className="
        bg-[var(--card-bg)]
        border border-[var(--vision-panel-border)]
        rounded-2xl p-3 md:p-4
        space-y-3
      "
      aria-label="Vision simulation preview loading"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Shimmer className="h-4 w-36 rounded-lg" />
          <Line w="w-64 max-w-[65vw]" />
        </div>

        {/* Tabs in lensCompare */}
        {mode === "lensCompare" && showStageTabs && (
          <div className="inline-flex rounded-full overflow-hidden border border-[color:var(--chip-border,rgba(209,213,219,0.7))]">
            <Shimmer className="h-7 w-20 rounded-none border-0" />
            <Shimmer className="h-7 w-20 rounded-none border-0" />
          </div>
        )}
      </div>

      <div
        className={twMerge(
          "grid gap-3",
          twoCols ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
        )}
      >
        <VideoFigureSkeleton />
        {twoCols && <VideoFigureSkeleton />}
      </div>
    </section>
  );
};

const VisionSimulatorSkeleton: React.FC<Props> = ({
  mode = "beforeAfter",
  showStageTabs = true,
  showComparisonLensSelector = true,
}) => {
  return (
    <section className="containerr py-8 md:py-10 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] items-start">
        {/* Left controls */}
        <div className="space-y-4">
          <SelectorCardSkeleton titleWidth="w-28" lines={2} chips={6} />
          <SelectorCardSkeleton titleWidth="w-32" lines={2} chips={6} />

          <LensSelectorSkeleton
            showComparison={
              mode === "lensCompare" && showComparisonLensSelector
            }
          />

          <InfoPanelSkeleton />
        </div>

        {/* Right preview */}
        <div className="space-y-4">
          <VideoPanelSkeleton mode={mode} showStageTabs={showStageTabs} />
        </div>
      </div>

      {/* keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default VisionSimulatorSkeleton;
