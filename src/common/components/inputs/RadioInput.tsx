import React from "react";

export type RadioOption = {
  value: string;
  label?: string;
};

type Props = {
  label: string;
  value: string | null;
  options: RadioOption[];
  onChange: (v: string) => void;
  required?: boolean;
  error?: string | null;
  helpText?: string;
};

const RadioInput: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
  required,
  error,
  helpText,
}) => {
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      <div
        className="mb-2 text-sm md:text-base font-medium"
        style={{ color: "var(--field-label)" }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--field-error-text)" }}>
            *
          </span>
        )}
      </div>

      <div
        className={`
          flex flex-col gap-2 rounded-xl px-4 py-3
          bg-[var(--field-bg)] border
          ${
            hasError
              ? "border-[color:var(--field-error-border)] ring-1 ring-[color:var(--field-error-ring)]"
              : "border-[color:var(--field-border)] focus-within:ring-2 focus-within:ring-[color:var(--field-focus-ring)]"
          }
        `}
        role="radiogroup"
        aria-invalid={hasError}
      >
        {options.map((opt) => {
          const isActive = value === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`
                w-full flex items-center justify-between gap-3
                px-3 py-2 rounded-lg text-sm text-left
                transition-colors duration-300
                ${
                  isActive
                    ? "bg-[var(--primary-green)]/15 text-[var(--primary-green)]"
                    : "bg-transparent hover:bg-primaryGreen/5 text-[color:var(--field-text)]"
                }
              `}
            >
              <span className="truncate">{opt.label ?? opt.value}</span>

              <span
                aria-hidden="true"
                className={`
                  w-4 h-4 rounded-full border flex-shrink-0
                  ${
                    isActive
                      ? "border-primaryDarkGreen bg-primaryDarkGreen"
                      : "border-[color:var(--field-border)] bg-transparent"
                  }
                `}
              />
            </button>
          );
        })}

        {helpText && (
          <span
            className="text-xs mt-1"
            style={{ color: "var(--field-placeholder)" }}
          >
            {helpText}
          </span>
        )}
      </div>

      {hasError && (
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--field-error-text)" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioInput;
