import React, { useId } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";

export interface MainCheckInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "onChange"
  > {
  label?: string;
  required?: boolean;
  error?: string;
  labelPosition?: "inline" | "above";

  /** controlled */
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
}

const MainCheckInput = React.forwardRef<HTMLInputElement, MainCheckInputProps>(
  (
    {
      id,
      label,
      required = false,
      disabled = false,
      checked,
      onCheckedChange,
      onBlur,
      className = "",
      error,
      labelPosition = "inline",
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const inputId = id || autoId;

    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1 ">
        {/* label above */}
        {labelPosition === "above" && label && (
          <label
            htmlFor={inputId}
            className={`text-sm md:text-base block mb-2 font-medium ${
              disabled ? "opacity-60" : ""
            }`}
            style={{ color: "var(--field-label)" }}
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
          </label>
        )}

        {/* clickable row */}
        <label
          htmlFor={inputId}
          className={`
            group inline-flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-300
            ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            ${
              checked
                ? "bg-[color:var(--primary-green)] text-[var(--bg-page)]"
                : "hover:bg-[color:var(--primary-green)] hover:text-[var(--bg-page)]"
            }
            ${className}
          `}
        >
          {/* native checkbox for a11y + form */}
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            className="sr-only peer"
            {...rest}
          />

          {/* custom box */}
          <span
            aria-hidden="true"
            className={`
              relative flex items-center justify-center w-5 h-5 rounded-md border
              transition-all duration-150 ease-out
              ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
              ${
                checked
                  ? "bg-[color:var(--primary)] border-[color:var(--primary)] scale-[1.05]"
                  : "bg-[var(--field-bg)] border-[color:var(--field-border)] group-hover:border-[color:var(--primary)]"
              }
              ${
                hasError
                  ? "ring-2 ring-[color:var(--field-error-ring)] border-[color:var(--field-error-border)]"
                  : "group-focus-within:ring-2 group-focus-within:ring-[color:var(--primary)]"
              }
            `}
          >
            {/* check animation (fade + scale) */}
            <FiCheck
              size={14}
              className={`
                text-white transition-all duration-150 ease-out
                ${checked ? "opacity-100 scale-100" : "opacity-0 scale-75"}
              `}
            />
          </span>

          {/* inline label */}
          {labelPosition === "inline" && label && (
            <span
              className={`text-sm md:text-base font-medium transition-colors ${
                disabled ? "opacity-60" : ""
              }`}
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
            </span>
          )}
        </label>

        {/* error */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            hasError ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <p
            id={`${inputId}-error`}
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

MainCheckInput.displayName = "MainCheckInput";

export default MainCheckInput;
