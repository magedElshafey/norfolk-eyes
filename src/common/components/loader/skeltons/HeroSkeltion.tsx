type Props = {
  className?: string;
};

const shimmer =
  "relative overflow-hidden bg-[color:var(--bg-surface)] border border-[color:var(--border-subtle)]";
const shimmerAfter =
  "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-black/5 after:to-transparent";

export default function HomeHeroSkeleton({ className }: Props) {
  return (
    <div
      className={[
        "grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center",
        className ?? "",
      ].join(" ")}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* Doctor image side (matches HeroImage area) */}
      <div className="w-full">
        <div
          className={[
            "aspect-[4/3] w-full rounded-3xl",
            shimmer,
            shimmerAfter,
          ].join(" ")}
        />
        <div className="mt-3 space-y-2">
          <div
            className={["h-3 w-40 rounded-full", shimmer, shimmerAfter].join(
              " "
            )}
          />
          <div
            className={["h-3 w-64 rounded-full", shimmer, shimmerAfter].join(
              " "
            )}
          />
        </div>
      </div>

      {/* Text side */}
      <div className="space-y-4 md:space-y-6">
        {/* SectionIntro */}
        <div className="space-y-2">
          <div
            className={["h-3 w-28 rounded-full", shimmer, shimmerAfter].join(
              " "
            )}
          />
          <div
            className={["h-3 w-44 rounded-full", shimmer, shimmerAfter].join(
              " "
            )}
          />
        </div>

        {/* SectionTitle */}
        <div className="space-y-2">
          <div
            className={[
              "h-5 md:h-6 w-[min(28rem,100%)] rounded-xl",
              shimmer,
              shimmerAfter,
            ].join(" ")}
          />
          <div
            className={[
              "h-5 md:h-6 w-[min(22rem,100%)] rounded-xl",
              shimmer,
              shimmerAfter,
            ].join(" ")}
          />
        </div>

        {/* SectionDescription */}
        <div className="space-y-2">
          <div
            className={[
              "h-3 w-[min(34rem,100%)] rounded-full",
              shimmer,
              shimmerAfter,
            ].join(" ")}
          />
          <div
            className={[
              "h-3 w-[min(32rem,100%)] rounded-full",
              shimmer,
              shimmerAfter,
            ].join(" ")}
          />
          <div
            className={[
              "h-3 w-[min(26rem,100%)] rounded-full",
              shimmer,
              shimmerAfter,
            ].join(" ")}
          />
        </div>

        {/* Details list */}
        <ul className="flex flex-col gap-1.5 text-xs md:text-sm">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="flex items-center gap-2">
              <span
                className={["h-3 w-3 rounded-full", shimmer, shimmerAfter].join(
                  " "
                )}
              />
              <span
                className={[
                  "h-3 rounded-full",
                  shimmer,
                  shimmerAfter,
                  i === 0
                    ? "w-[min(22rem,100%)]"
                    : i === 1
                    ? "w-[min(20rem,100%)]"
                    : i === 2
                    ? "w-[min(18rem,100%)]"
                    : "w-[min(16rem,100%)]",
                ].join(" ")}
              />
            </li>
          ))}
        </ul>

        {/* Buttons row */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2">
          <div
            className={["h-10 w-44 rounded-2xl", shimmer, shimmerAfter].join(
              " "
            )}
          />
          <div
            className={["h-10 w-52 rounded-2xl", shimmer, shimmerAfter].join(
              " "
            )}
          />
        </div>

        {/* SectionEnding */}
        <div className="space-y-2">
          <div
            className={[
              "h-3 w-[min(28rem,100%)] rounded-full",
              shimmer,
              shimmerAfter,
            ].join(" ")}
          />
          <div
            className={[
              "h-3 w-[min(18rem,100%)] rounded-full",
              shimmer,
              shimmerAfter,
            ].join(" ")}
          />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
