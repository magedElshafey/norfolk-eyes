import { FC } from "react";

const TechnologySectionSkeleton: FC = () => {
  return (
    <section
      aria-labelledby="clinic-technology-heading"
      className="
        bg-[var(--bg-page)]
        border-b border-[var(--border-subtle)]
      "
    >
      <div className="relative containerr py-10 md:py-14 lg:py-16 space-y-8">
        {/* header row */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
          {/* left content */}
          <div className="space-y-2 md:space-y-3">
            {/* SectionIntro */}
            <div className="h-3 w-40 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />

            {/* SectionTitle */}
            <div className="space-y-2">
              <div className="h-5 md:h-6 w-[min(520px,90%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-5 md:h-6 w-[min(460px,82%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>

            {/* SectionDescription */}
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-[min(620px,95%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3.5 w-[min(590px,90%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3.5 w-[min(520px,80%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>

            {/* SectionEnding */}
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-[min(560px,88%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3.5 w-[min(500px,78%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>
          </div>

          {/* highlight card */}
          <div
            className="
              rounded-3xl
              bg-[var(--card-bg)]
              border border-[var(--card-border)]
              shadow-sm
              p-4 md:p-5
              flex flex-col gap-3
            "
            aria-label="Technology highlight skeleton"
          >
            <div className="h-4 w-48 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-[92%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3 w-[85%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3 w-[88%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3 w-[80%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>
          </div>
        </div>

        {/* cards grid */}
        <div
          className="
            grid gap-4 md:gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
          aria-label="Technology cards skeleton"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="
                rounded-3xl
                bg-[var(--card-bg)]
                border border-[var(--card-border)]
                shadow-sm
                p-4 md:p-5
                space-y-3
              "
            >
              {/* icon / media */}
              <div className="h-10 w-10 rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />

              {/* title */}
              <div className="h-4 w-[70%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />

              {/* description lines */}
              <div className="space-y-2">
                <div className="h-3 w-[95%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                <div className="h-3 w-[88%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                <div className="h-3 w-[75%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              </div>

              {/* footer hint */}
              <div className="pt-1">
                <div className="h-3 w-24 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySectionSkeleton;
