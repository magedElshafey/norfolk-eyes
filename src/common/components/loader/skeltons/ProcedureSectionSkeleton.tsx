import ProcedureCardSkeleton from "./ProcedureCardSkeleton";

const ProcedureSectionSkeleton = () => {
  return (
    <section
      aria-labelledby="our-main-procedures-heading"
      className="
    bg-[var(--bg-subtle)]
    border-b border-[var(--border-subtle)]
    py-10 md:py-14 lg:py-16
  "
    >
      <div className="containerr space-y-6 md:space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="max-w-3xl space-y-3">
          <div className="h-4 w-40 bg-[var(--skeleton)] rounded-md" />
          <div className="h-7 w-72 bg-[var(--skeleton)] rounded-md" />
          <div className="h-4 w-full max-w-md bg-[var(--skeleton)] rounded-md" />
        </div>

        {/* Cards Skeleton Grid */}
        <ProcedureCardSkeleton />
        {/* CTA Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="h-4 w-72 bg-[var(--skeleton)] rounded-md" />

          <div className="h-10 w-40 bg-[var(--skeleton)] rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default ProcedureSectionSkeleton;
