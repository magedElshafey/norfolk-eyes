import React from "react";

type Props = {
  active: boolean;
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const ChipButton: React.FC<Props> = ({ active, label, onClick, disabled }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex items-center justify-center",
        "rounded-full px-3 py-1.5",
        "text-xs md:text-sm",
        "border transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)]",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        active
          ? "bg-[var(--vision-chip-active-bg)] text-[var(--vision-chip-active-text)] border-[var(--vision-chip-active-bg)]"
          : "bg-[var(--vision-chip-bg)] text-[var(--vision-text-main)] border-[var(--vision-panel-border)] hover:border-[color:var(--accent)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
};

export default React.memo(ChipButton);
