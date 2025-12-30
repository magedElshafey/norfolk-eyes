import React from "react";
import ChipButton from "./ChipButton";

type Option = { id: string; label: string; description?: string };

type Props = {
  ariaLabel: string;
  title: string;
  helper?: string;
  options: Option[];
  selectedId: string | null;
  onChange: (id: string) => void;
};

const OptionSelector: React.FC<Props> = ({
  ariaLabel,
  title,
  helper,
  options,
  selectedId,
  onChange,
}) => {
  if (!options.length) return null;

  return (
    <section
      aria-label={ariaLabel}
      className="bg-[var(--card-bg)] border border-[var(--vision-panel-border)] rounded-2xl p-4 md:p-5"
    >
      <h2 className="text-sm font-semibold mb-2 text-[var(--text-main)]">
        {title}
      </h2>

      {helper ? (
        <p className="text-xs md:text-sm text-[var(--text-muted)] mb-4">
          {helper}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <ChipButton
            key={opt.id}
            active={opt.id === selectedId}
            label={opt.label}
            onClick={() => onChange(opt.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(OptionSelector);
