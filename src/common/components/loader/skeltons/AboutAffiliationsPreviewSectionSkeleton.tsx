import { FC } from "react";

const SkeletonLine = ({
  width = "w-full",
  height = "h-4",
}: {
  width?: string;
  height?: string;
}) => (
  <div
    className={`
      ${width} ${height}
      rounded-md
      bg-[color:var(--bg-muted)]
      animate-pulse
    `}
  />
);

const AboutAffiliationsPreviewSectionSkeleton: FC = () => {
  return (
    <section
      aria-hidden="true"
      className="
        bg-[var(--bg-surface)]
        border-b border-[var(--border-subtle)]
      "
    >
      <div className="containerr py-10 md:py-14 lg:py-16 space-y-8 md:space-y-10">
        {/* Text + Image row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Text skeleton */}
          <div className="space-y-4">
            {/* SectionIntro */}
            <SkeletonLine width="w-24" height="h-3" />

            {/* Title */}
            <div className="space-y-2">
              <SkeletonLine height="h-6" />
              <SkeletonLine width="w-5/6" height="h-6" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine width="w-4/5" />
            </div>

            {/* Ending note */}
            <SkeletonLine width="w-3/4" height="h-3" />

            {/* CTA button */}
            <div className="pt-2">
              <div
                className="
                  h-11 w-56
                  rounded-xl
                  bg-[color:var(--bg-muted)]
                  animate-pulse
                "
              />
            </div>
          </div>

          {/* Hero image skeleton */}
          <div
            className="
              w-full
              aspect-[4/3]
              rounded-2xl
              bg-[color:var(--bg-muted)]
              animate-pulse
            "
          />
        </div>

        {/* Slider skeleton */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="
                h-20 w-32
                flex-shrink-0
                rounded-xl
                bg-[color:var(--bg-muted)]
                animate-pulse
              "
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutAffiliationsPreviewSectionSkeleton;
