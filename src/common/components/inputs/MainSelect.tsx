// src/common/components/select/MainSelect.tsx
import React, {
  useEffect,
  useRef,
  useState,
  useId,
  KeyboardEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import type { IconType } from "react-icons";
import Loader from "../loader/spinner/Loader";

interface OptionType {
  id: number;
  name: string;
}

interface MainSelectProps<T extends OptionType> {
  id?: string;
  name?: string;
  options?: T[];
  onSelect?: (option: T) => void;
  onChange?: (value: number | null) => void;
  onBlur?: (e?: any) => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  fetchApi?: () => Promise<T[]>;
  value?: number | null;
  error?: string | null;
  required?: boolean;
  ariaLabel?: string;
  className?: string;
  Icon?: IconType;
  label?: string;
}

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const MainSelectInner = <T extends OptionType>(
  props: MainSelectProps<T>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ref: React.Ref<HTMLDivElement>
) => {
  const {
    id,
    name,
    options = [],
    onSelect,
    onChange,
    onBlur,
    disabled = false,
    loading = false,
    placeholder,
    fetchApi,
    value,
    error,
    required = false,
    className,
    Icon,
    label = "",
    ariaLabel,
  } = props;

  const { t, i18n } = useTranslation();
  const autoId = useId();
  const inputId = id || `${autoId}-select`;
  const listboxId = `${inputId}-listbox`;
  const errorId = `${inputId}-error`;

  const [showOptions, setShowOptions] = useState(false);
  const [fetchedOptions, setFetchedOptions] = useState<T[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const lastSelectedRef = useRef<T | undefined>(undefined);

  const displayedOptions = fetchApi ? fetchedOptions : options;
  const isRTL = i18n.dir() === "rtl";
  const hasError = Boolean(error);

  // lazy fetch
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (fetchApi && fetchedOptions.length === 0) {
        try {
          const data = await fetchApi();
          if (mounted) setFetchedOptions(data);
        } catch (err) {
          console.error("MainSelect fetchApi error:", err);
        }
      }
    };
    if (showOptions) load();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOptions, fetchApi]);

  // sync selected label
  useEffect(() => {
    if (value != null) {
      const opt =
        options.find((o) => o.id === value) ||
        fetchedOptions.find((o) => o.id === value);
      if (opt) {
        setSelectedLabel(opt.name);
        lastSelectedRef.current = opt;
      } else {
        setSelectedLabel(null);
      }
    } else {
      setSelectedLabel(null);
      lastSelectedRef.current = undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options, fetchedOptions]);

  useClickOutside(containerRef, () => {
    setShowOptions(false);
    setFocusedIndex(-1);
  });

  const filtered = displayedOptions.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  const openList = () => {
    if (disabled) return;
    setShowOptions(true);
    setFocusedIndex((prev) => (prev >= 0 ? prev : filtered.length ? 0 : -1));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!showOptions) {
          openList();
        } else {
          setFocusedIndex((prev) =>
            Math.min(prev + 1, Math.max(0, filtered.length - 1))
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (showOptions) {
          setFocusedIndex((prev) => Math.max(0, prev - 1));
        }
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(filtered.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (
          showOptions &&
          focusedIndex >= 0 &&
          focusedIndex < filtered.length
        ) {
          handleSelectChange(filtered[focusedIndex]);
        } else {
          openList();
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowOptions(false);
        setFocusedIndex(-1);
        break;
      default:
        if (!showOptions) openList();
        break;
    }
  };

  const handleToggle = (e?: React.MouseEvent) => {
    if (disabled) return;
    e?.stopPropagation();
    setShowOptions((s) => {
      const next = !s;
      if (!next) setFocusedIndex(-1);
      return next;
    });
  };

  const handleSelectChange = (option: T) => {
    setSelectedLabel(option.name);
    lastSelectedRef.current = option;
    setShowOptions(false);
    setSearch("");
    setFocusedIndex(-1);
    onSelect?.(option);
    onChange?.(option.id);
    onBlur?.();
  };

  // scroll focused item into view
  useEffect(() => {
    if (focusedIndex < 0) return;
    const listEl = listRef.current;
    const item = listEl?.querySelector(
      `[data-index="${focusedIndex}"]`
    ) as HTMLElement | null;
    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  const labelText = label ? t(label) : undefined;
  const ariaLabelText = ariaLabel ? t(ariaLabel) : labelText;
  const showLabel =
    selectedLabel != null
      ? t(selectedLabel)
      : placeholder
      ? t(placeholder)
      : "";

  return (
    <div className={`w-full ${className || ""}`}>
      {labelText && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm md:text-base font-medium"
          style={{ color: "var(--field-label)" }}
        >
          {labelText}
          {required && (
            <span className="ml-1" style={{ color: "var(--field-error-text)" }}>
              *
            </span>
          )}
        </label>
      )}

      <div ref={containerRef} className="relative w-full">
        {/* Combobox trigger */}
        <div
          id={inputId}
          role="combobox"
          aria-expanded={showOptions}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          aria-required={required || undefined}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          aria-label={ariaLabelText}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          onClick={handleToggle}
          className={`
            w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3
            bg-[var(--field-bg)]
border
${
  hasError
    ? "border-[color:var(--field-error-border)] ring-1 ring-[color:var(--field-error-ring)]"
    : "border-[color:var(--field-border)] focus-visible:ring-2 focus-visible:ring-[color:var(--field-focus-ring)] focus-visible:border-[color:var(--field-focus-border)]"
}
            transition-colors duration-150
            ${
              disabled
                ? "opacity-60 cursor-not-allowed bg-[var(--field-bg-disabled)]"
                : "cursor-pointer"
            }
          `}
        >
          <div className="flex items-center gap-2 min-w-0">
            {Icon && (
              <Icon
                size={20}
                aria-hidden="true"
                style={{ color: "var(--field-icon)" }}
              />
            )}
            <span
              className={`text-sm md:text-base truncate ${
                selectedLabel
                  ? "text-[color:var(--field-text)]"
                  : "text-[var(--field-placeholder)]"
              }`}
            >
              {showLabel}
            </span>
          </div>

          {!disabled && (
            <IoMdArrowDropdown
              size={20}
              aria-hidden="true"
              style={{ color: "var(--field-icon)" }}
            />
          )}
        </div>

        {/* Dropdown listbox */}
        {showOptions && (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={inputId}
            ref={listRef}
            className={`
              absolute mt-1 w-full max-h-56 overflow-y-auto rounded-xl border shadow-lg z-30
              bg-[var(--field-bg)] border-[var(--field-border)]
              ${isRTL ? "right-0" : "left-0"}
            `}
          >
            {loading ? (
              <div className="w-full flex justify-center py-3">
                <Loader />
              </div>
            ) : filtered.length ? (
              filtered.map((item, idx) => {
                const isFocused = idx === focusedIndex;
                const isSelected = lastSelectedRef.current?.id === item.id;
                return (
                  <div
                    key={item.id}
                    role="option"
                    data-index={idx}
                    aria-selected={isSelected}
                    tabIndex={-1}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectChange(item);
                    }}
                    className={`
                      px-3 py-2 text-sm md:text-base cursor-pointer
                      ${
                        isFocused || isSelected
                          ? "bg-primaryGreen/10 text-primaryDarkGreen"
                          : "text-[var(--field-text)] hover:bg-primaryGreen/5"
                      }
                    `}
                  >
                    {t(item.name)}
                  </div>
                );
              })
            ) : (
              <div className="w-full p-3 text-sm text-[var(--field-placeholder)] text-center">
                {t("Global.noData", "No options available")}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          hasError ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
        }`}
      >
        <p
          id={errorId}
          className="text-xs"
          role="alert"
          style={{ color: "var(--field-error-text)" }}
        >
          {hasError && t(error!)}
        </p>
      </div>

      {/* hidden input for HTML forms if محتاج name/value */}
      {name && <input type="hidden" name={name} value={value ?? ""} readOnly />}
    </div>
  );
};

const MainSelect = React.forwardRef(MainSelectInner) as <T extends OptionType>(
  p: MainSelectProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

export default MainSelect;
