// src/common/components/inputs/MainInput.tsx
import React, { useState, useId, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  Icon?: IconType;
  required?: boolean;
  enableAutocomplete?: boolean;
  storageKey?: string;
}

const MainInput = React.forwardRef<HTMLInputElement, MainInputProps>(
  (
    {
      id,
      label,
      placeholder,
      type = "text",
      error,
      Icon,
      required = false,
      disabled = false,
      enableAutocomplete = false,
      storageKey,
      value,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const autoId = useId();
    const inputId = id || autoId;

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // ✅ أمان مع SSR + ربط autocomplete بالـ localStorage
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

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

    const togglePassword = () => setShowPassword((prev) => !prev);

    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm md:text-base font-medium"
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
            w-full flex items-center gap-3 rounded-xl px-4 py-3
            bg-[var(--field-bg)]
            border
            ${
              hasError
                ? "border-[color:var(--field-error-border)] ring-1 ring-[color:var(--field-error-ring)]"
                : "border-[color:var(--field-border)] focus-within:ring-2 focus-within:ring-[color:var(--field-focus-ring)] focus-within:border-[color:var(--field-focus-border)]"
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
              className="shrink-0"
              style={{ color: "var(--field-icon)" }}
              aria-hidden="true"
            />
          )}

          <input
            id={inputId}
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder ? t(placeholder) : ""}
            required={required}
            disabled={disabled}
            aria-invalid={hasError}
            aria-required={required}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            list={enableAutocomplete ? `${inputId}-list` : undefined}
            className="
              flex-1 w-full bg-transparent border-none outline-none
              text-sm md:text-base
            "
            style={{
              color: "var(--field-text)",
              caretColor: "var(--field-focus-border)",
            }}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={togglePassword}
              aria-label={
                showPassword
                  ? t("Global.hidePassword", "Hide password")
                  : t("Global.showPassword", "Show password")
              }
              className="inline-flex items-center justify-center h-8 w-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--field-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--field-bg)]"
            >
              {showPassword ? (
                <FiEyeOff size={18} style={{ color: "var(--field-icon)" }} />
              ) : (
                <FiEye size={18} style={{ color: "var(--field-icon)" }} />
              )}
            </button>
          )}
        </div>

        {enableAutocomplete && (
          <datalist id={`${inputId}-list`}>
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
            id={`${inputId}-error`}
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

MainInput.displayName = "MainInput";

export default MainInput;
