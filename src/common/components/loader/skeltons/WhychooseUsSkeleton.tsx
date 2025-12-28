type Props = { className?: string };

const shimmer =
  "relative overflow-hidden bg-[color:var(--bg-surface)] border border-[color:var(--border-subtle)]";
const shimmerAfter =
  "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-black/5 after:to-transparent";

function Skel({ className = "" }: { className?: string }) {
  return <div className={[shimmer, shimmerAfter, className].join(" ")} />;
}

export default function WhyChooseSkeleton({ className }: Props) {
  return (
    <div
      className={[
        "grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start",
        className ?? "",
      ].join(" ")}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* Stats column */}
      <div className="grid gap-4 sm:grid-cols-2 auto-rows-fr">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] p-4 md:p-5"
          >
            {/* big number */}
            <div className="flex items-end justify-between gap-3">
              <Skel className="h-9 w-24 rounded-xl" />
              <Skel className="h-4 w-10 rounded-full" />
            </div>

            {/* label */}
            <div className="mt-3 space-y-2">
              <Skel className="h-4 w-[min(14rem,100%)] rounded-full" />
              <Skel className="h-4 w-[min(12rem,100%)] rounded-full" />
            </div>

            {/* description */}
            <div className="mt-3 space-y-2">
              <Skel className="h-3 w-[min(18rem,100%)] rounded-full" />
              <Skel className="h-3 w-[min(16rem,100%)] rounded-full" />
              <Skel className="h-3 w-[min(12rem,100%)] rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Text column */}
      <div className="space-y-4 md:space-y-5">
        {/* SectionIntro */}
        <div className="space-y-2">
          <Skel className="h-3 w-32 rounded-full" />
          <Skel className="h-3 w-44 rounded-full" />
        </div>

        {/* SectionTitle */}
        <div className="space-y-2">
          <Skel className="h-6 w-[min(26rem,100%)] rounded-xl" />
          <Skel className="h-6 w-[min(20rem,100%)] rounded-xl" />
        </div>

        {/* SectionDescription */}
        <div className="space-y-2">
          <Skel className="h-3 w-[min(34rem,100%)] rounded-full" />
          <Skel className="h-3 w-[min(30rem,100%)] rounded-full" />
          <Skel className="h-3 w-[min(24rem,100%)] rounded-full" />
        </div>

        {/* Details list */}
        <ul className="space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="flex items-start gap-2">
              <Skel className="mt-1 h-3.5 w-3.5 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skel
                  className={[
                    "h-3 rounded-full",
                    i === 0
                      ? "w-[min(22rem,100%)]"
                      : i === 1
                      ? "w-[min(20rem,100%)]"
                      : i === 2
                      ? "w-[min(18rem,100%)]"
                      : "w-[min(16rem,100%)]",
                  ].join(" ")}
                />
                {i % 2 === 0 ? (
                  <Skel className="h-3 w-[min(12rem,100%)] rounded-full" />
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        {/* SectionEnding */}
        <div className="space-y-2 pt-1">
          <Skel className="h-3 w-[min(24rem,100%)] rounded-full" />
          <Skel className="h-3 w-[min(16rem,100%)] rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}
