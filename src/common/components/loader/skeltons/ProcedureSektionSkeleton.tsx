type Props = {
  className?: string;
  cardsCount?: number; // default 4 (matches xl:grid-cols-4)
};

const shimmer =
  "relative overflow-hidden bg-[color:var(--bg-surface)] border border-[color:var(--border-subtle)]";
const shimmerAfter =
  "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-black/5 after:to-transparent";

function Skel({ className = "" }: { className?: string }) {
  return <div className={[shimmer, shimmerAfter, className].join(" ")} />;
}

export default function HomeProceduresSkeleton({
  className,
  cardsCount = 4,
}: Props) {
  return (
    <div
      className={["space-y-6 md:space-y-8", className ?? ""].join(" ")}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* Header row */}
      <div className="max-w-3xl space-y-3">
        {/* SectionIntro */}
        <div className="space-y-2">
          <Skel className="h-3 w-28 rounded-full" />
          <Skel className="h-3 w-44 rounded-full" />
        </div>

        {/* SectionTitle */}
        <div className="space-y-2">
          <Skel className="h-6 w-[min(36rem,100%)] rounded-xl" />
          <Skel className="h-6 w-[min(28rem,100%)] rounded-xl" />
        </div>

        {/* SectionDescription */}
        <div className="space-y-2">
          <Skel className="h-3 w-[min(40rem,100%)] rounded-full" />
          <Skel className="h-3 w-[min(36rem,100%)] rounded-full" />
          <Skel className="h-3 w-[min(26rem,100%)] rounded-full" />
        </div>
      </div>

      {/* Cards grid */}
      <div
        className="
          grid gap-4 md:gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
        role="list"
        aria-label="Loading main procedures"
      >
        {Array.from({ length: cardsCount }).map((_, i) => (
          <div
            key={i}
            role="listitem"
            className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] p-4 md:p-5"
          >
            {/* image/thumbnail */}
            <Skel className="aspect-[16/10] w-full rounded-2xl" />

            {/* title */}
            <div className="mt-4 space-y-2">
              <Skel className="h-4 w-[min(14rem,100%)] rounded-full" />
              <Skel className="h-4 w-[min(10rem,100%)] rounded-full" />
            </div>

            {/* short description */}
            <div className="mt-3 space-y-2">
              <Skel className="h-3 w-[min(18rem,100%)] rounded-full" />
              <Skel className="h-3 w-[min(16rem,100%)] rounded-full" />
              <Skel className="h-3 w-[min(12rem,100%)] rounded-full" />
            </div>

            {/* chip/cta placeholder */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <Skel className="h-7 w-24 rounded-full" />
              <Skel className="h-8 w-10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* SectionEnding */}
        <div className="min-w-[min(28rem,100%)] flex-1 space-y-2">
          <Skel className="h-3 w-[min(44rem,100%)] rounded-full" />
          <Skel className="h-3 w-[min(36rem,100%)] rounded-full" />
        </div>

        {/* Button */}
        <Skel className="h-10 w-48 rounded-2xl" />
      </div>

      <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}
