import React from "react";

type ChipButtonProps = {
  active: boolean;
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const ChipButton: React.FC<ChipButtonProps> = ({
  active,
  label,
  onClick,
  disabled = false,
}) => {
  console.log("active", active);
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
      inline-flex items-center justify-center
      rounded-full px-3 py-1.5
      text-xs md:text-sm
      border
      transition-colors
      ${
        active
          ? "bg-[var(--vision-chip-active-bg)] text-[var(--vision-chip-active-text)] border-[var(--vision-chip-active-bg)]"
          : "bg-[var(--vision-chip-bg)] text-[var(--vision-text-main)] border-[var(--vision-panel-border)] hover:border-[color:var(--accent)]"
      }
    `}
    >
      {label}
    </button>
  );
};

export default ChipButton;
