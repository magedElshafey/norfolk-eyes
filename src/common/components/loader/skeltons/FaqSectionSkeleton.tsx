// src/features/home/components/faq/FaqSectionSkeleton.tsx
import React from "react";

type Props = {
  items?: number; // عدد عناصر FAQ اللي هتظهر كسكيلتون
};

const Line: React.FC<{ w?: string; h?: string; className?: string }> = ({
  w = "w-full",
  h = "h-3",
  className = "",
}) => (
  <div
    className={`rounded-full bg-[color:var(--border-subtle)]/60 ${w} ${h} ${className}`}
    aria-hidden="true"
  />
);

const Card: React.FC = () => (
  <div
    className="
      rounded-2xl
      border border-[color:var(--border-subtle)]
      bg-[color:var(--bg-surface)]
      shadow-sm
      p-4 md:p-5
    "
    aria-hidden="true"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 space-y-3">
        <Line w="w-[75%]" h="h-4" />
        <Line w="w-[92%]" />
        <Line w="w-[86%]" />
        <Line w="w-[60%]" />
      </div>
      <div className="shrink-0 mt-1 h-9 w-9 rounded-full bg-[color:var(--border-subtle)]/60" />
    </div>
  </div>
);

const FaqSectionSkeleton: React.FC<Props> = ({ items = 6 }) => {
  const list = Array.from({ length: items });

  return (
    <div
      className="relative containerr py-10 md:py-14 lg:py-16"
      aria-busy="true"
      aria-label="Loading frequently asked questions"
    >
      {/* Intro skeleton */}
      <div className="flex flex-col items-center justify-center text-center gap-2 mb-6 animate-pulse">
        <Line w="w-28" h="h-3" />
        <Line w="w-[min(42rem,95%)]" h="h-6" className="mt-1" />
        <div className="mt-2 space-y-2 w-full flex flex-col items-center">
          <Line w="w-[min(56rem,92%)]" />
          <Line w="w-[min(52rem,88%)]" />
        </div>
      </div>

      {/* FAQ list skeleton (same columns layout) */}
      <div
        className="columns-1 md:columns-2 gap-4 md:gap-6 animate-pulse"
        aria-hidden="true"
      >
        {list.map((_, i) => (
          <div key={i} className="break-inside-avoid mb-4 md:mb-6">
            <Card />
          </div>
        ))}
      </div>

      {/* Callout skeleton */}
      <div
        className="
          rounded-3xl
          bg-[var(--accent)]
          border border-[var(--accent)]
          text-[var(--accent-soft-bg)]
          shadow-sm
          p-4 md:p-5
          space-y-2
          mt-6
          flex items-center justify-between
          flex-col md:flex-row gap-4
          animate-pulse
        "
        aria-hidden="true"
      >
        <div className="w-full">
          <Line w="w-[70%]" h="h-4" className="bg-white/25" />
          <div className="mt-3 space-y-2">
            <Line w="w-[92%]" className="bg-white/20" />
            <Line w="w-[78%]" className="bg-white/20" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2">
          <div className="h-10 w-40 rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  );
};

export default FaqSectionSkeleton;
