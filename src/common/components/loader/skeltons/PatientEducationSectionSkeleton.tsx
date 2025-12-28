import { FC } from "react";

const PatientEducationSectionSkeleton: FC = () => {
  return (
    <section
      aria-labelledby="patient-education-heading"
      className="
        bg-[var(--bg-surface)]
        border-b border-[var(--border-subtle)]
      "
    >
      <div className="containerr py-10 md:py-14 lg:py-16 space-y-8 md:space-y-10">
        {/* Header */}
        <div className="md:space-y-3">
          {/* SectionIntro */}
          <div className="h-3 w-36 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />

          {/* SectionTitle */}
          <div className="mt-2 space-y-2">
            <div className="h-6 md:h-7 w-[min(620px,92%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="h-6 md:h-7 w-[min(520px,84%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
          </div>

          {/* SectionDescription */}
          <div className="mt-2 space-y-2">
            <div className="h-3.5 w-[min(760px,98%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="h-3.5 w-[min(720px,94%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="h-3.5 w-[min(560px,78%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
          </div>

          {/* SectionEnding */}
          <div className="mt-2 space-y-2">
            <div className="h-3.5 w-[min(680px,92%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="h-3.5 w-[min(520px,76%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
          </div>
        </div>

        {/* Guides card */}
        <section
          aria-labelledby="guides-articles-heading"
          className="
            rounded-3xl
            bg-[var(--card-bg)]
            border border-[var(--card-border)]
            shadow-sm
            p-4 md:p-5 lg:p-6 space-y-6
          "
        >
          {/* Top row (title/subtitle + button) */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="space-y-2">
              <div className="h-4 w-56 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3 w-72 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>

            {/* desktop button */}
            <div className="hidden md:block">
              <div className="h-10 w-36 rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>
          </div>

          {/* Articles grid (3 cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <article
                key={i}
                className="
                  rounded-3xl
                  bg-[var(--bg-page)]
                  border border-[color:var(--border-subtle)]
                  p-4 md:p-5
                  shadow-sm
                  space-y-3
                "
              >
                {/* image/thumb */}
                <div className="h-36 md:h-40 w-full rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />

                {/* title */}
                <div className="space-y-2">
                  <div className="h-4 w-[88%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                  <div className="h-4 w-[72%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                </div>

                {/* excerpt */}
                <div className="space-y-2 pt-1">
                  <div className="h-3 w-[98%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                  <div className="h-3 w-[92%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                  <div className="h-3 w-[70%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                </div>

                {/* meta/footer */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="h-3 w-24 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                  <div className="h-3 w-16 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                </div>
              </article>
            ))}
          </div>

          {/* EducationVideosRow skeleton */}
          <div
            className="
              rounded-3xl
              bg-[var(--bg-page)]
              border border-[color:var(--border-subtle)]
              p-4 md:p-5
              space-y-4
            "
            aria-label="Education videos row skeleton"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="h-4 w-44 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                <div className="h-3 w-80 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              </div>
              <div className="h-9 w-28 rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="
                    rounded-3xl
                    border border-[color:var(--border-subtle)]
                    bg-[var(--card-bg)]
                    p-4
                    space-y-3
                  "
                >
                  <div className="h-28 w-full rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                  <div className="h-4 w-[85%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                  <div className="h-3 w-[60%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="mt-4 md:hidden">
            <div className="h-11 w-full rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default PatientEducationSectionSkeleton;
