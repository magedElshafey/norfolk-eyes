import React from "react";

type VisitPrepItemProps = {
  item: {
    step_number: number;
    title: string;
    description: string;
  };
};

const VisitPrepItem: React.FC<VisitPrepItemProps> = ({ item }) => {
  return (
    <li
      className="
        flex gap-3 items-start
        rounded-2xl
        bg-[var(--card-bg)]
        border border-[var(--info-pill-border,rgba(209,213,219,0.8))]
        px-3 py-3 md:px-4 md:py-3.5 duration-300 transition-transform hover:translate-x-1 mb-4
      "
    >
      <span
        aria-hidden="true"
        className="
          mt-1 h-2 w-2 rounded-full
          bg-[var(--accent-dot,#059669)]
          flex-shrink-0
        "
      />
      <div className="space-y-0.5">
        <p className="text-xs md:text-sm font-semibold text-primaryDarkGreen">
          {item?.title}
        </p>
        <p className="text-[11px] md:text-xs text-[var(--text-muted,#6B7280)]">
          {item?.description}
        </p>
      </div>
    </li>
  );
};

export default React.memo(VisitPrepItem);
