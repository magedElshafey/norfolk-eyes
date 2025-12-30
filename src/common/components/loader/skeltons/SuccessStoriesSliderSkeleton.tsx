import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SuccessStoriesSliderSkeleton: React.FC = () => {
  const shimmer = "motion-safe:animate-pulse";
  const items = Array.from({ length: 5 });

  return (
    <section
      aria-labelledby="success-stories-heading"
      aria-roledescription="carousel"
      className="
        bg-[var(--bg-subtle)]
        border-b border-[var(--border-subtle)]
        py-10 md:py-14 lg:py-16
      "
    >
      <div className="containerr space-y-3 md:space-y-4">
        {/* Header + arrows */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div
              className={`
                h-4 md:h-5 w-44 md:w-56 rounded-md
                bg-[color:var(--border-subtle)]
                ${shimmer}
              `}
            />
            <div
              className={`
                h-3 w-72 md:w-96 rounded-md
                bg-[color:var(--border-subtle)]
                ${shimmer}
              `}
            />
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              disabled
              aria-label="Previous story"
              className="
                inline-flex items-center justify-center
                h-8 w-8 rounded-full
                border border-[var(--border-subtle)]
                bg-[var(--card-bg)]
                text-[color:var(--text-main)]
                opacity-60 cursor-not-allowed
              "
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            <button
              type="button"
              disabled
              aria-label="Next story"
              className="
                inline-flex items-center justify-center
                h-8 w-8 rounded-full
                border border-[var(--border-subtle)]
                bg-[var(--card-bg)]
                text-[color:var(--text-main)]
                opacity-60 cursor-not-allowed
              "
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          className="
            flex gap-4 md:gap-5
            overflow-x-auto
            no-scrollbar
            pb-2
            snap-x snap-mandatory
            px-1 sm:px-2 md:-mx-2 md:px-2
          "
          role="list"
          aria-label="Scrollable list of patient success stories"
        >
          {items.map((_, idx) => (
            <div
              key={idx}
              role="listitem"
              className="snap-center min-w-[260px] md:min-w-[320px] mx-2"
            >
              {/* Skeleton Card */}
              <div
                className="
                  rounded-2xl
                  bg-[var(--card-bg)]
                  border border-[var(--border-subtle)]
                  shadow-sm
                  p-4 md:p-5
                  space-y-3
                "
              >
                {/* top row */}
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      h-10 w-10 rounded-full
                      bg-[color:var(--border-subtle)]
                      ${shimmer}
                    `}
                  />
                  <div className="space-y-1 flex-1">
                    <div
                      className={`
                        h-3.5 w-32 rounded-md
                        bg-[color:var(--border-subtle)]
                        ${shimmer}
                      `}
                    />
                    <div
                      className={`
                        h-3 w-24 rounded-md
                        bg-[color:var(--border-subtle)]
                        ${shimmer}
                      `}
                    />
                  </div>
                  <div
                    className={`
                      h-6 w-16 rounded-full
                      bg-[color:var(--border-subtle)]
                      ${shimmer}
                    `}
                  />
                </div>

                {/* title */}
                <div
                  className={`
                    h-4 w-40 rounded-md
                    bg-[color:var(--border-subtle)]
                    ${shimmer}
                  `}
                />

                {/* text */}
                <div className="space-y-2">
                  <div
                    className={`h-3 w-full rounded-md bg-[color:var(--border-subtle)] ${shimmer}`}
                  />
                  <div
                    className={`h-3 w-[92%] rounded-md bg-[color:var(--border-subtle)] ${shimmer}`}
                  />
                  <div
                    className={`h-3 w-[80%] rounded-md bg-[color:var(--border-subtle)] ${shimmer}`}
                  />
                </div>

                {/* footer */}
                <div className="pt-2 flex items-center justify-between">
                  <div
                    className={`h-3 w-24 rounded-md bg-[color:var(--border-subtle)] ${shimmer}`}
                  />
                  <div
                    className={`h-8 w-24 rounded-full bg-[color:var(--border-subtle)] ${shimmer}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bullets */}
        <div
          className="flex justify-center mt-1.5 gap-1.5"
          role="tablist"
          aria-label="Select patient story"
        >
          {items.map((_, idx) => (
            <span
              key={idx}
              aria-hidden="true"
              className={`
                h-2 w-4 rounded-full
                bg-[color:var(--border-subtle)]
                ${shimmer}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(SuccessStoriesSliderSkeleton);
