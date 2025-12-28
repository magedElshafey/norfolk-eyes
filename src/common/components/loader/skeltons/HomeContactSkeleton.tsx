import { FC, memo } from "react";

const Shimmer: FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={[
      "relative overflow-hidden rounded-xl",
      "bg-[color:var(--bg-subtle)]",
      "border border-[color:var(--border-subtle)]",
      className,
    ].join(" ")}
    aria-hidden="true"
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

const HomeContactSkeleton: FC = () => {
  return (
    <section
      aria-labelledby="home-contact-heading"
      className="
        bg-[color:var(--bg-surface)]
        border-t border-[color:var(--border-subtle)]
      "
    >
      <div className="containerr py-10 md:py-12 lg:py-14">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] items-start">
          {/* Left: contact details */}
          <div className="space-y-4 md:space-y-5">
            {/* SectionIntro */}
            <Shimmer className="h-7 w-44 rounded-full" />

            {/* SectionTitle */}
            <div className="space-y-2">
              <Shimmer className="h-8 w-[92%] rounded-2xl" />
              <Shimmer className="h-8 w-[74%] rounded-2xl" />
            </div>

            {/* SectionDescription */}
            <div className="space-y-2">
              <Shimmer className="h-4 w-[95%]" />
              <Shimmer className="h-4 w-[86%]" />
              <Shimmer className="h-4 w-[68%]" />
            </div>

            {/* DL items */}
            <div className="space-y-4">
              {/* Address */}
              <div className="space-y-2">
                <Shimmer className="h-3 w-32 rounded-lg" />
                <Shimmer className="h-4 w-[90%]" />
                <Shimmer className="h-4 w-[70%]" />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Shimmer className="h-3 w-20 rounded-lg" />
                <Shimmer className="h-4 w-40" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Shimmer className="h-3 w-16 rounded-lg" />
                <Shimmer className="h-4 w-56" />
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <Shimmer className="h-3 w-28 rounded-lg" />
                <Shimmer className="h-4 w-64" />
                <Shimmer className="h-3 w-[92%]" />
              </div>
            </div>

            {/* CTA row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Shimmer className="h-11 w-48 rounded-2xl" />
              <div className="space-y-2 max-w-xs">
                <Shimmer className="h-3 w-64" />
                <Shimmer className="h-3 w-52" />
              </div>
            </div>
          </div>

          {/* Right: map */}
          <div
            className="
              rounded-2xl
              bg-[color:var(--bg-subtle)]
              border border-[color:var(--border-subtle)]
              shadow-sm
              overflow-hidden
            "
            aria-label="Loading map"
          >
            <div className="p-4 md:p-5 border-b border-[color:var(--border-subtle)]">
              <div className="space-y-2">
                <Shimmer className="h-4 w-40" />
                <Shimmer className="h-3 w-[85%]" />
              </div>
            </div>

            <div className="w-full h-[260px] md:h-[320px] lg:h-[460px] bg-[color:var(--bg-surface)] p-3">
              <Shimmer className="h-full w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* local keyframes */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default memo(HomeContactSkeleton);
