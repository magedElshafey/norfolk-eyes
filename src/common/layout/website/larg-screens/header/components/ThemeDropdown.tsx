import React, { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";

const THEME_STORAGE_KEY = "a11y-theme";

const THEME_OPTIONS = [
  {
    value: "default",
    labelKey: "Theme.default",
    fallbackLabel: "Default theme",
  },
  {
    value: "palette-2",
    labelKey: "Theme.clinicalNavy",
    fallbackLabel: "Clinical navy",
  },
  {
    value: "palette-3",
    labelKey: "Theme.calmTealCoral",
    fallbackLabel: "Calm teal & coral",
  },
] as const;

type ThemeId = (typeof THEME_OPTIONS)[number]["value"];

function applyTheme(theme: ThemeId) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  if (theme === "default") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

const ThemeDropdown: React.FC = () => {
  const { t } = useTranslation();
  const selectId = useId();
  const [theme, setTheme] = useState<ThemeId>("default");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(
        THEME_STORAGE_KEY
      ) as ThemeId | null;

      if (stored && THEME_OPTIONS.some((opt) => opt.value === stored)) {
        setTheme(stored);
        applyTheme(stored);
      } else {
        applyTheme("default");
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextTheme = e.target.value as ThemeId;
    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      if (nextTheme === "default") {
        window.localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="inline-flex flex-col gap-1 text-xs md:text-sm">
      <label
        htmlFor={selectId}
        className="font-medium"
        style={{ color: "var(--section-label-color, var(--text-main))" }}
      >
        {t("Theme.label", "Visual theme")}
      </label>

      <div
        className="
          inline-flex items-center gap-2
          rounded-xl px-3 py-2
          bg-[var(--field-bg)]
          border border-[var(--field-border)]
          focus-within:ring-2
          focus-within:ring-[var(--field-focus-ring)]
          focus-within:border-[var(--field-focus-border)]
          transition-colors duration-150
        "
      >
        <select
          id={selectId}
          value={theme}
          onChange={handleChange}
          aria-label={t(
            "Theme.ariaLabel",
            "Select a visual theme for the site"
          )}
          className="
            flex-1 bg-transparent border-none outline-none
            text-xs md:text-sm
          "
          style={{
            color: "var(--field-text)",
          }}
        >
          {THEME_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey, opt.fallbackLabel)}
            </option>
          ))}
        </select>
      </div>

      <p
        className="text-[10px] md:text-[11px]"
        style={{ color: "var(--section-muted-color)" }}
      >
        {t(
          "Theme.helper",
          "Your choice will be saved on this device, so the site opens with the same theme next time."
        )}
      </p>
    </div>
  );
};

export default ThemeDropdown;
