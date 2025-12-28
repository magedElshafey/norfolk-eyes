import React, { useId } from "react";
import { useTranslation } from "react-i18next";

export interface MainToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  label?: string;
  required?: boolean;
  error?: string;
  helpText?: string;

  /** toggle value */
  checked: boolean;
  onCheckedChange: (next: boolean) => void;

  /** ✅ new: true / false labels */
  trueLabel?: string;
  falseLabel?: string;
}

const MainToggle = React.forwardRef<HTMLButtonElement, MainToggleProps>(
  (
    {
      id,
      label,
      required = false,
      disabled = false,
      checked,
      onCheckedChange,
      className = "",
      error,
      helpText,
      trueLabel,
      falseLabel,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const toggleId = id || autoId;

    const hasError = Boolean(error);

    // ✅ determine active state label
    const stateLabel = checked ? trueLabel : falseLabel;

    return (
      <div
        className="flex flex-col gap-1 border border-[color:var(--field-border)] focus-within:ring-2 focus-within:ring-[color:var(--field-focus-ring)] focus-within:border-[color:var(--field-focus-border)] rounded-xl px-4 py-3
            bg-[var(--field-bg)]
            "
      >
        {/* Row */}
        <div
          className={`
            flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition-colors
            ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            ${
              checked
                ? "bg-[color:var(--primary-soft)]"
                : "hover:bg-[color:var(--primary-soft)]"
            }
            ${className}
          `}
        >
          {/* Label + help */}
          {label ? (
            <div className="min-w-0">
              <div
                className="text-sm md:text-base font-medium truncate"
                style={{
                  color: checked ? "var(--primary)" : "var(--field-text)",
                }}
              >
                {t(label)}
                {required && (
                  <span
                    className="ml-1"
                    style={{ color: "var(--field-error-text)" }}
                  >
                    *
                  </span>
                )}
              </div>

              {/* Help text */}
              {helpText ? (
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--field-placeholder)" }}
                >
                  {helpText}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Toggle button */}
          <div className="space-y-2">
            {/* ✅ true / false label */}
            {stateLabel ? (
              <p
                className="mt-1 text-xs font-medium transition-colors"
                style={{
                  color: checked
                    ? "var(--primary-green)"
                    : "var(--field-placeholder)",
                }}
              >
                {t(stateLabel)}
              </p>
            ) : null}
            <button
              ref={ref}
              id={toggleId}
              type="button"
              role="switch"
              aria-checked={checked}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${toggleId}-error` : undefined}
              disabled={disabled}
              onClick={() => onCheckedChange(!checked)}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onCheckedChange(!checked);
                }
              }}
              className={`
              relative h-7 w-12 rounded-full outline-none transition-all duration-150
              ${
                checked
                  ? "bg-[color:var(--primary-green)]"
                  : "bg-[color:var(--field-border)]"
              }
              ${
                hasError
                  ? "ring-2 ring-[color:var(--field-error-ring)]"
                  : "focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]"
              }
            `}
              {...rest}
            >
              <span
                aria-hidden="true"
                className={`
                absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow
                transition-all duration-150 ease-out
                ${
                  checked
                    ? "translate-x-5 scale-105"
                    : "translate-x-0 scale-100"
                }
              `}
              />
            </button>
          </div>
        </div>

        {/* Error */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            hasError ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <p
            id={`${toggleId}-error`}
            className="text-xs"
            role="alert"
            style={{ color: "var(--field-error-text)" }}
          >
            {hasError ? t(error!) : null}
          </p>
        </div>
      </div>
    );
  }
);

MainToggle.displayName = "MainToggle";
export default MainToggle;
