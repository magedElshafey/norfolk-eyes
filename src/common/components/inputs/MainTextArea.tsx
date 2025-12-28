// src/common/components/inputs/MainTextArea.tsx
import React, { useState, useId, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons";

interface MainTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  Icon?: IconType;
  required?: boolean;
  enableAutocomplete?: boolean;
  storageKey?: string;
  rows?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const MainTextArea = React.forwardRef<HTMLTextAreaElement, MainTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      error,
      Icon,
      required = false,
      disabled = false,
      enableAutocomplete = false,
      storageKey,
      value,
      onChange,
      onBlur,
      rows = 4,
      resize = "vertical",
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const textareaId = id || autoId;

    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
      if (!enableAutocomplete || !storageKey) return;
      if (typeof window === "undefined") return;

      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) setSuggestions(JSON.parse(stored));
      } catch {
        // ignore
      }
    }, [enableAutocomplete, storageKey]);

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (
        enableAutocomplete &&
        storageKey &&
        typeof value === "string" &&
        value.trim()
      ) {
        try {
          const updated = Array.from(new Set([value, ...suggestions])).slice(
            0,
            10
          );
          setSuggestions(updated);
          window.localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
      if (onBlur) onBlur(e);
    };

    const resizeClasses: Record<
      NonNullable<MainTextAreaProps["resize"]>,
      string
    > = {
      none: "resize-none",
      both: "resize-both",
      horizontal: "resize-x",
      vertical: "resize-y",
    };

    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm md:text-base block mb-2 font-medium"
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

        <div
          className={`
            w-full flex items-start gap-3 rounded-xl px-4 py-3
            bg-[var(--field-bg)]
            border
            ${
              hasError
                ? "border-[var(--field-error-border)] ring-1 ring-[var(--field-error-ring)]"
                : "border-[var(--field-border)] focus-within:ring-2 focus-within:ring-[var(--field-focus-ring)] focus-within:border-[var(--field-focus-border)]"
            }
            transition-colors duration-150
            ${
              disabled
                ? "opacity-60 cursor-not-allowed bg-[var(--field-bg-disabled)]"
                : ""
            }
          `}
        >
          {Icon && (
            <Icon
              size={20}
              className="mt-1 shrink-0"
              style={{ color: "var(--field-icon)" }}
              aria-hidden="true"
            />
          )}

          <textarea
            id={textareaId}
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder ? t(placeholder) : ""}
            required={required}
            disabled={disabled}
            rows={rows}
            aria-invalid={hasError}
            aria-required={required}
            aria-describedby={hasError ? `${textareaId}-error` : undefined}
            className={`
              flex-1 w-full bg-transparent border-none outline-none
              text-sm md:text-base max-h-[300px] overflow-y-auto
              ${resizeClasses[resize]}
            `}
            style={{
              color: "var(--field-text)",
              caretColor: "var(--field-focus-border)",
            }}
            {...rest}
          />
        </div>

        {/* datalist technically مش بيشتغل مع textarea, بس لو عايز تخزّن history برضه نخليه موجود */}
        {enableAutocomplete && (
          <datalist id={`${textareaId}-list`}>
            {suggestions.map((item, i) => (
              <option key={i} value={item} />
            ))}
          </datalist>
        )}

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            hasError ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <p
            id={`${textareaId}-error`}
            className="text-xs"
            style={{ color: "var(--field-error-text)" }}
            role="alert"
          >
            {hasError && t(error!)}
          </p>
        </div>
      </div>
    );
  }
);

MainTextArea.displayName = "MainTextArea";

export default MainTextArea;
