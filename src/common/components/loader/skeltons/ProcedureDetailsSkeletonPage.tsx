// src/pages/ProcedureDetailsSkeletonPage.tsx
import React from "react";

const SkelLine = ({
  w = "w-full",
  h = "h-4",
  className = "",
}: {
  w?: string;
  h?: string;
  className?: string;
}) => <div className={`rounded-full bg-black/10 ${h} ${w} ${className}`} />;

const SkelBox = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-2xl bg-black/10 ${className}`} />
);

/* ------------------------------ Sections ------------------------------ */

const ProcedureHeroSkeleton: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section
      aria-labelledby={id}
      className="border-b border-black/10 bg-[var(--mm-bg,transparent)]"
    >
      <div className="containerr py-6 md:py-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Left: title + summary */}
          <div className="space-y-4">
            <SkelLine w="w-40" h="h-3" />
            <SkelLine w="w-4/5" h="h-8" className="rounded-2xl" />
            <div className="space-y-2">
              <SkelLine w="w-full" />
              <SkelLine w="w-11/12" />
              <SkelLine w="w-9/12" />
            </div>

            {/* hero pills/buttons placeholders */}
            <div className="flex flex-wrap gap-3 pt-2">
              <SkelBox className="h-11 w-44 rounded-full" />
              <SkelBox className="h-11 w-36 rounded-full" />
            </div>
          </div>

          {/* Right: hero media */}
          <div className="relative">
            <SkelBox className="aspect-[16/10] w-full rounded-2xl" />
            <div className="absolute bottom-3 left-3 flex gap-2">
              <SkelBox className="h-10 w-10 rounded-full" />
              <SkelBox className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcedureKeyFactsSkeleton = () => {
  return (
    <section aria-label="Key facts skeleton">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/10 bg-white/60 p-4"
          >
            <SkelLine w="w-24" h="h-3" />
            <SkelLine w="w-3/4" h="h-5" className="mt-3 rounded-xl" />
            <SkelLine w="w-1/2" h="h-3" className="mt-2" />
          </div>
        ))}
      </div>
    </section>
  );
};

const ProcedureOverviewSkeleton = () => {
  return (
    <section
      aria-label="Overview skeleton"
      className="rounded-2xl border border-black/10 bg-white/60 p-5 md:p-6"
    >
      <SkelLine w="w-40" h="h-5" className="rounded-xl" />
      <div className="mt-4 space-y-2">
        <SkelLine w="w-full" />
        <SkelLine w="w-11/12" />
        <SkelLine w="w-10/12" />
        <SkelLine w="w-9/12" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/10 bg-white/60 p-4"
          >
            <SkelLine w="w-28" h="h-4" className="rounded-xl" />
            <div className="mt-3 space-y-2">
              <SkelLine w="w-full" />
              <SkelLine w="w-10/12" />
              <SkelLine w="w-8/12" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProcedureMediaSkeleton = () => {
  return (
    <section
      aria-label="Media skeleton"
      className="rounded-2xl border border-black/10 bg-white/60 p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <SkelLine w="w-36" h="h-5" className="rounded-xl" />
        <SkelBox className="h-9 w-28 rounded-full" />
      </div>

      <div className="mt-4 space-y-4">
        <SkelBox className="aspect-video w-full rounded-2xl" />

        <div className="grid grid-cols-2 gap-3">
          <SkelBox className="aspect-[4/3] w-full rounded-2xl" />
          <SkelBox className="aspect-[4/3] w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

const ProcedureInstructionsSkeleton = () => {
  return (
    <section
      aria-label="Instructions skeleton"
      className="rounded-2xl border border-black/10 bg-white/60 p-5 md:p-6"
    >
      <SkelLine w="w-56" h="h-5" className="rounded-xl" />

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, col) => (
          <div
            key={col}
            className="rounded-2xl border border-black/10 bg-white/60 p-4"
          >
            <SkelLine w="w-40" h="h-4" className="rounded-xl" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((__, i) => (
                <div key={i} className="flex items-center gap-3">
                  <SkelBox className="h-6 w-6 rounded-full" />
                  <SkelLine w={i % 2 === 0 ? "w-11/12" : "w-9/12"} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProcedureFaqSkeleton = () => {
  return (
    <section
      aria-label="FAQ skeleton"
      className="rounded-2xl border border-black/10 bg-white/60 p-5 md:p-6"
    >
      <SkelLine w="w-28" h="h-5" className="rounded-xl" />

      <div className="mt-5 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/10 bg-white/60 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <SkelLine w="w-8/12" h="h-4" className="rounded-xl" />
              <SkelBox className="h-8 w-8 rounded-full" />
            </div>
            <div className="mt-3 space-y-2">
              <SkelLine w="w-full" />
              <SkelLine w="w-10/12" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProcedureCtaRowSkeleton = () => {
  return (
    <div className="flex justify-between items-center gap-3 md:gap-4 pt-2">
      <div className="flex items-center flex-wrap gap-4">
        <SkelBox className="h-11 w-52 rounded-full" />
        <SkelBox className="h-11 w-44 rounded-full" />
      </div>
      <SkelBox className="h-11 w-28 rounded-2xl" />
    </div>
  );
};

/* ------------------------------ Page ------------------------------ */

const ProcedureDetailsSkeletonPage: React.FC = () => {
  const pageTitleId = "procedure-title";

  return (
    <main
      className="bg-[var(--bg-page)] text-[color:var(--section-body-color)]"
      aria-labelledby={pageTitleId}
    >
      <div className="animate-pulse">
        {/* Hero + key facts */}
        <ProcedureHeroSkeleton id={pageTitleId} />

        <section
          className="containerr py-6 md:py-8 lg:py-10 space-y-8"
          aria-label="Procedure information loading"
        >
          <ProcedureKeyFactsSkeleton />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
            <ProcedureOverviewSkeleton />
            <ProcedureMediaSkeleton />
          </div>

          <ProcedureInstructionsSkeleton />
          <ProcedureFaqSkeleton />
          <ProcedureCtaRowSkeleton />
        </section>
      </div>
    </main>
  );
};

export default ProcedureDetailsSkeletonPage;
