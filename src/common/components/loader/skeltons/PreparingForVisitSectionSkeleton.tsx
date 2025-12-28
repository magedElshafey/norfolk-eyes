import { FC } from "react";

const PreparingForVisitSectionSkeleton: FC = () => {
  return (
    <section
      aria-labelledby="preparing-visit-heading"
      className="
        bg-[var(--bg-subtle)]
        border-t border-b border-[var(--border-subtle)]
      "
    >
      <div className="containerr py-10 md:py-14 lg:py-16 space-y-8 md:space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2 md:space-y-3">
          {/* SectionIntro */}
          <div className="h-3 w-40 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />

          {/* SectionTitle */}
          <div className="space-y-2">
            <div className="h-6 md:h-7 w-[min(520px,90%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="h-6 md:h-7 w-[min(420px,78%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
          </div>

          {/* SectionDescription */}
          <div className="space-y-2 pt-1">
            <div className="h-3.5 w-[min(640px,95%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="h-3.5 w-[min(600px,90%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="h-3.5 w-[min(520px,80%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
          </div>

          {/* SectionEnding */}
          <div className="space-y-2 pt-1">
            <div className="h-3.5 w-[min(610px,92%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            <div className="h-3.5 w-[min(520px,82%)] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
          </div>
        </div>

        {/* Info band + CTA card */}
        <div
          className="
            grid gap-8 lg:gap-10
            lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]
            items-start
          "
        >
          {/* Info band */}
          <section
            aria-label="Checklist skeleton"
            className="
              rounded-3xl
              bg-[var(--card-bg)]
              border border-[var(--card-border)]
              shadow-sm
              p-4 md:p-5 lg:p-6
            "
          >
            {/* title */}
            <div className="h-4 w-56 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse mb-4" />

            {/* list items skeletons (VisitPrepItem x4) */}
            <ul className="space-y-2 md:space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <li
                  key={i}
                  className="
                    flex gap-3
                    rounded-2xl
                    border border-[color:var(--border-subtle)]
                    bg-[color:var(--bg-page)]
                    p-3 md:p-4
                  "
                >
                  {/* bullet / icon */}
                  <div className="mt-0.5 h-9 w-9 rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse shrink-0" />

                  <div className="min-w-0 flex-1 space-y-2">
                    {/* item title */}
                    <div className="h-4 w-[72%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                    {/* item description */}
                    <div className="space-y-2">
                      <div className="h-3 w-[98%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                      <div className="h-3 w-[90%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                      <div className="h-3 w-[70%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA Card (PreVisitFormCard skeleton) */}
          <aside
            aria-label="Pre-visit form card skeleton"
            className="
              rounded-3xl
              bg-[var(--card-bg)]
              border border-[var(--card-border)]
              shadow-sm
              p-4 md:p-5 lg:p-6
              space-y-4
            "
          >
            {/* heading */}
            <div className="space-y-2">
              <div className="h-4 w-40 rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-6 w-[85%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>

            {/* body text */}
            <div className="space-y-2">
              <div className="h-3.5 w-[98%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3.5 w-[92%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3.5 w-[75%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>

            {/* inputs */}
            <div className="space-y-3 pt-1">
              <div className="h-11 w-full rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-11 w-full rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-11 w-full rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>

            {/* button */}
            <div className="pt-1">
              <div className="h-11 w-full rounded-2xl bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>

            {/* small hint/footer */}
            <div className="space-y-2 pt-1">
              <div className="h-3 w-[88%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
              <div className="h-3 w-[60%] rounded-full bg-[color:var(--skeleton,#E5E7EB)] animate-pulse" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PreparingForVisitSectionSkeleton;
