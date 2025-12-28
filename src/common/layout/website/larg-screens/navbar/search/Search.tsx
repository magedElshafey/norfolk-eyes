import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import SearchResults from "./components/SearchResult";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import IconBadge from "../../../small-screens/mobile-widget/components/common/IconBadge";

const DEBOUNCE_INTERVAL = 400;
const MIN_CHARS = 2;

const Search = () => {
  const { t } = useTranslation();

  const [showSearch, setShowSearch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // value: اللي في input
  // deferred: اللي هنستخدمه للـ query بعد debounce
  const [search, setSearch] = useState<{ value: string; deferred: string }>({
    value: "",
    deferred: "",
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blurRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleShowSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
  }, []);

  const cancelDebounce = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }, []);

  const cancelBlurTimer = useCallback(() => {
    if (blurRef.current) {
      clearTimeout(blurRef.current);
      blurRef.current = null;
    }
  }, []);

  const clearSearch = useCallback(() => {
    cancelDebounce();
    setSearch({ value: "", deferred: "" });
  }, [cancelDebounce]);

  const onClose = useCallback(() => {
    setShowSearch(false);
    cancelDebounce();
    cancelBlurTimer();
    setIsFocused(false);
  }, [cancelDebounce, cancelBlurTimer]);

  const handleInputChange = useCallback(
    (val: string) => {
      setSearch((prev) => ({ ...prev, value: val }));

      const term = val.trim();

      // أقل من حرفين: اقفل suggestions + امنع request
      if (term.length < MIN_CHARS) {
        cancelDebounce();
        setSearch((prev) => ({ ...prev, deferred: "" }));
        return;
      }

      cancelDebounce();
      debounceRef.current = setTimeout(() => {
        // بنخزن الـ trimmed term عشان query key ثابتة ومافيش مسافات
        setSearch((prev) => ({ ...prev, deferred: term }));
        debounceRef.current = null;
      }, DEBOUNCE_INTERVAL);
    },
    [cancelDebounce]
  );

  // click outside + ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // clean timers on unmount
  useEffect(() => {
    return () => {
      cancelDebounce();
      cancelBlurTimer();
    };
  }, [cancelDebounce, cancelBlurTimer]);

  // focus input when dialog opens
  useEffect(() => {
    if (showSearch && inputRef.current) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [showSearch]);

  const deferredTerm = search.deferred; // ده already trimmed
  const enableQuery = deferredTerm.length >= MIN_CHARS;

  const { data, isFetching } = useQuery({
    queryKey: [apiRoutes.search, deferredTerm],
    enabled: enableQuery,
    queryFn: async ({ queryKey, signal }) => {
      const [, term] = queryKey as [string, string];
      const response = await Axios.get(apiRoutes.search, {
        params: { q: term },
        signal,
      });
      console.log("res", response?.data?.data);
      return response.data.data?.results;
    },
    staleTime: 1000 * 30,
  });

  const trimmedValueLen = search.value.trim().length;
  const hasSearchValue = trimmedValueLen > 0;

  const canShowSuggestions = isFocused && trimmedValueLen >= MIN_CHARS;
  const showResults = showSearch && canShowSuggestions && enableQuery;

  const searchState = useMemo(() => {
    if (!enableQuery) return "idle";
    if (isFetching) return "loading";
    if (Array.isArray(data) && data.length === 0) return "empty";
    if (Array.isArray(data) && data.length > 0) return "success";
    return "idle";
  }, [enableQuery, isFetching, data]);

  return (
    <>
      {/* زرار السيرش في الديسكتوب */}
      <button
        type="button"
        className="
          hidden lg:flex lg:items-center lg:justify-center
          w-8 h-8 rounded-full
          bg-[var(--btn-main-bg)]
          text-[color:var(--btn-main-text)]
          border border-[color:var(--btn-main-border)]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[color:var(--focus-ring)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[color:var(--navbar-bg,var(--bg-page))]
          transition-colors
          hover:opacity-95
        "
        onClick={toggleShowSearch}
        aria-label={t("Search.Search")}
      >
        <IoIosSearch size={20} aria-hidden="true" />
      </button>

      {/* موبايل IconBadge */}
      <div className="lg:hidden">
        <IconBadge
          Icon={IoIosSearch}
          title={`Search.Search`}
          onClick={toggleShowSearch}
        />
      </div>

      {/* Overlay / Dialog */}
      {showSearch && (
        <div
          className="
            fixed inset-0 z-[40000]
            flex items-center justify-center
            bg-[color:var(--overlay-backdrop,rgba(0,0,0,0.5))]
            backdrop-blur-sm
            px-3 md:px-4
          "
          role="dialog"
          aria-modal="true"
          aria-label={t("Search.Search")}
        >
          <div className="w-full max-w-xl md:max-w-2xl">
            <div
              ref={panelRef}
              className="
                relative mx-auto
                rounded-2xl
                bg-[var(--card-bg)]
                border border-[var(--card-border)]
                shadow-2xl
                px-4 py-3 md:px-5 md:py-4
                min-w-0
                animate-[fadeIn_0.18s_ease-out]
              "
            >
              {/* Header row */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-[color:var(--section-title-color)]">
                    <span
                      className="
                        inline-flex h-6 w-6 items-center justify-center
                        rounded-full
                        bg-[color:var(--accent-soft-bg)]
                        text-[color:var(--accent)]
                      "
                    >
                      <IoIosSearch size={14} aria-hidden="true" />
                    </span>
                    {t("Search.Search")}
                  </span>
                  <p className="text-xs text-[color:var(--text-muted)]">
                    {t("Search.desc")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    inline-flex items-center justify-center
                    h-8 w-8 rounded-full
                    bg-[var(--chip-bg,var(--card-bg))]
                    text-[color:var(--text-main)]
                    hover:bg-[color:var(--accent-soft-bg)]
                    hover:text-[color:var(--accent)]
                    transition-colors
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[color:var(--focus-ring)]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[color:var(--card-bg)]
                  "
                  aria-label={t("Global.close")}
                >
                  <RxCross2 size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Input */}
              <div
                className="
                  flex items-center gap-2
                  rounded-full
                  bg-[var(--field-bg)]
                  border border-[var(--field-border)]
                  px-3 py-2
                  focus-within:border-[color:var(--field-focus-border)]
                  focus-within:ring-2 focus-within:ring-[color:var(--field-focus-ring)]
                  transition-colors
                "
              >
                <IoIosSearch
                  size={18}
                  className="shrink-0"
                  aria-hidden="true"
                  style={{ color: "var(--field-icon)" }}
                />

                <input
                  ref={inputRef}
                  type="text"
                  aria-label={t("Search.Search")}
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{
                    color: "var(--field-text)",
                    caretColor: "var(--field-focus-border)",
                  }}
                  placeholder={t("Search.Search")}
                  value={search.value}
                  onFocus={() => {
                    cancelBlurTimer();
                    setIsFocused(true);
                  }}
                  onBlur={() => {
                    cancelBlurTimer();
                    blurRef.current = setTimeout(
                      () => setIsFocused(false),
                      200
                    );
                  }}
                  onChange={(e) => handleInputChange(e.target.value)}
                  aria-busy={isFetching}
                />

                {hasSearchValue && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="
                      text-xs
                      px-1
                      text-[color:var(--field-placeholder)]
                      hover:text-[color:var(--accent)]
                      transition-colors
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[color:var(--focus-ring)]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[color:var(--field-bg)]
                    "
                  >
                    {t("Global.clear")}
                  </button>
                )}
              </div>

              {/* Results box */}
              {showResults && (
                <div
                  className="
                    mt-3
                    w-full
                    rounded-2xl border border-[var(--card-border)]
                    bg-[var(--card-bg)]
                    shadow-lg
                    max-h-80
                    overflow-auto
                  "
                >
                  <SearchResults
                    products={data}
                    isLoading={searchState === "loading"}
                    hasSearchValue={hasSearchValue}
                    onClear={clearSearch}
                    onClose={onClose}
                  />
                </div>
              )}

              {/* Hints */}
              {!showResults && (
                <p className="mt-3 text-xs text-[color:var(--text-muted)]">
                  {trimmedValueLen > 0 && trimmedValueLen < MIN_CHARS
                    ? t("Type at least 2 characters to search.")
                    : null}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
