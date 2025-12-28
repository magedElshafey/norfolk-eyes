import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineInvertColors, MdOutlineRestartAlt } from "react-icons/md";
import { BsCircleHalf } from "react-icons/bs";
import { HiOutlineSun, HiOutlineMoon, HiOutlineLink } from "react-icons/hi";
import { HiOutlineHashtag } from "react-icons/hi2";
import { TbLetterSpacing, TbLineHeight } from "react-icons/tb";
import { FiType } from "react-icons/fi";
import { ImAccessibility } from "react-icons/im";

type ContrastMode = "none" | "dark" | "light";

type A11yState = {
  invert: boolean;
  monochrome: boolean;
  contrast: ContrastMode;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  contentScale: number; // 90..150 (يشتغل كـ zoom منطقي)
  fontSize: number; // 80..160
  lineHeight: number; // 90..200
  letterSpacing: number; // 0..30
};

const DEFAULT_STATE: A11yState = {
  invert: false,
  monochrome: false,
  contrast: "none",
  highlightLinks: false,
  highlightHeadings: false,
  contentScale: 100,
  fontSize: 100,
  lineHeight: 130,
  letterSpacing: 0,
};

const STORAGE_KEY = "a11y-settings-v1";

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

const AccessibilityWidget: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  const [state, setState] = useState<A11yState>(() => {
    if (typeof window === "undefined") return DEFAULT_STATE;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_STATE;
      return { ...DEFAULT_STATE, ...JSON.parse(raw) } as A11yState;
    } catch {
      return DEFAULT_STATE;
    }
  });

  // detect RTL once on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const dir =
        document.documentElement.getAttribute("dir") ||
        document.body.getAttribute("dir");
      setIsRTL(dir === "rtl");
    }
  }, []);

  // Sync with <html> classes + CSS vars
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("a11y-invert", state.invert);
    root.classList.toggle("a11y-monochrome", state.monochrome);
    root.classList.toggle("a11y-dark-contrast", state.contrast === "dark");
    root.classList.toggle("a11y-light-contrast", state.contrast === "light");

    root.classList.toggle("a11y-highlight-links", state.highlightLinks);
    root.classList.toggle("a11y-highlight-headings", state.highlightHeadings);

    // contentScale + fontSize يشتغلوا مع بعض كـ zoom على الفونت
    const combinedFontScale = (state.fontSize * state.contentScale) / 10000; // مثال: 120 * 110 / 10000 = 1.32
    const combinedLineHeightScale = state.lineHeight / 100;

    root.style.setProperty("--a11y-font-scale", combinedFontScale.toString());
    root.style.setProperty(
      "--a11y-line-height-scale",
      combinedLineHeightScale.toString()
    );
    root.style.setProperty(
      "--a11y-letter-spacing",
      state.letterSpacing.toString()
    );

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const resetAll = () => {
    setState(DEFAULT_STATE);
  };

  const adjust = (field: keyof A11yState, delta: number) => {
    setState((prev) => {
      const next = { ...prev } as any;

      if (
        field === "contentScale" ||
        field === "fontSize" ||
        field === "lineHeight"
      ) {
        const min = field === "contentScale" ? 90 : 80;
        const max = field === "lineHeight" ? 200 : 160;
        next[field] = clamp((prev as any)[field] + delta, min, max);
      } else if (field === "letterSpacing") {
        next[field] = clamp(prev.letterSpacing + delta, 0, 30);
      }

      return next;
    });
  };

  const sidePosButton = isRTL ? "left-3 sm:left-4" : "right-3 sm:right-4";
  const sidePosPanel = isRTL ? "left-2 sm:left-10" : "right-2 sm:right-10";

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          fixed z-30 top-20 md:top-24  ${sidePosButton}
          duration-300 transition-all
          flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center
          rounded-full bg-[#3F6A54] text-white shadow-lg
          hover:bg-[#325343] hover:scale-105
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3F6A54]
        `}
        aria-label="Accessibility tools"
      >
        <ImAccessibility className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Panel */}
      {open && (
        <div
          className={`
            fixed z-40 top-28 md:top-32 lg:top-44 ${sidePosPanel}
            w-[min(320px,100vw-1.5rem)]
            max-h-[90vh]
            rounded-2xl bg-[#111827] text-white shadow-2xl
            overflow-hidden flex flex-col
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111827]/90">
            <h2 className="text-sm font-semibold">
              {t("AccessibilityWidget.accessibilityTools")}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center justify-center rounded-full bg-white/5 px-2 py-1 text-[11px] hover:bg-white/10"
              >
                <MdOutlineRestartAlt className="mr-1 h-4 w-4" />
                {t("Global.Reset")}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
                aria-label="Close accessibility tools"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="px-4 pb-4 pt-3 space-y-3 overflow-y-auto text-xs">
            {/* Toggles row 1 */}
            <div className="grid grid-cols-2 gap-2">
              <ToggleButton
                label="Invert colors"
                icon={<MdOutlineInvertColors className="h-4 w-4" />}
                active={state.invert}
                onClick={() => setState((s) => ({ ...s, invert: !s.invert }))}
              />
              <ToggleButton
                label="Monochrome"
                icon={<BsCircleHalf className="h-4 w-4" />}
                active={state.monochrome}
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    monochrome: !s.monochrome,
                  }))
                }
              />
            </div>

            {/* Toggles row 2: contrast */}
            <div className="grid grid-cols-2 gap-2">
              <ToggleButton
                label="Dark contrast"
                icon={<HiOutlineMoon className="h-4 w-4" />}
                active={state.contrast === "dark"}
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    contrast: s.contrast === "dark" ? "none" : "dark",
                  }))
                }
              />
              <ToggleButton
                label="Light contrast"
                icon={<HiOutlineSun className="h-4 w-4" />}
                active={state.contrast === "light"}
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    contrast: s.contrast === "light" ? "none" : "light",
                  }))
                }
              />
            </div>

            {/* Toggles row 3 */}
            <div className="grid grid-cols-2 gap-2">
              <ToggleButton
                label="Highlight links"
                icon={<HiOutlineLink className="h-4 w-4" />}
                active={state.highlightLinks}
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    highlightLinks: !s.highlightLinks,
                  }))
                }
              />
              <ToggleButton
                label="Highlight headings"
                icon={<HiOutlineHashtag className="h-4 w-4" />}
                active={state.highlightHeadings}
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    highlightHeadings: !s.highlightHeadings,
                  }))
                }
              />
            </div>

            {/* Sliders */}
            <SliderRow
              label="Content scaling"
              value={state.contentScale}
              onMinus={() => adjust("contentScale", -10)}
              onPlus={() => adjust("contentScale", +10)}
            />

            <SliderRow
              label="Font size"
              value={state.fontSize}
              onMinus={() => adjust("fontSize", -5)}
              onPlus={() => adjust("fontSize", +5)}
              icon={<FiType className="h-4 w-4" />}
            />

            <SliderRow
              label="Line height"
              value={state.lineHeight}
              onMinus={() => adjust("lineHeight", -10)}
              onPlus={() => adjust("lineHeight", +10)}
              icon={<TbLineHeight className="h-4 w-4" />}
            />

            <SliderRow
              label="Letter spacing"
              value={state.letterSpacing}
              onMinus={() => adjust("letterSpacing", -2)}
              onPlus={() => adjust("letterSpacing", +2)}
              icon={<TbLetterSpacing className="h-4 w-4" />}
              valueSuffix="px"
            />
          </div>
        </div>
      )}
    </>
  );
};

type ToggleProps = {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

const ToggleButton: React.FC<ToggleProps> = ({
  label,
  icon,
  active,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-colors ${
        active
          ? "bg-[#3F6A54] text-white"
          : "bg-white/5 text-slate-100 hover:bg-white/10"
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/10">
        {icon}
      </span>
      <span className="text-[11px] leading-snug">{t(label)}</span>
    </button>
  );
};

type SliderRowProps = {
  label: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
  icon?: React.ReactNode;
  valueSuffix?: string;
};

const SliderRow: React.FC<SliderRowProps> = ({
  label,
  value,
  onMinus,
  onPlus,
  icon,
  valueSuffix = "%",
}) => {
  // progress width بسيطة (لو letterSpacing بيبقى أقل من 100%)
  const progressWidth =
    label === "Letter spacing" ? (value / 30) * 100 : Math.min(100, value);
  const { t } = useTranslation();
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1">
          {icon && <span className="text-slate-300">{icon}</span>}
          <span>{t(label)}</span>
        </div>
        <span className="text-slate-300">
          {value}
          {valueSuffix}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMinus}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
          aria-label={`Decrease ${t(label)}`}
        >
          −
        </button>
        <div className="flex-1 h-1.5 rounded-full bg-white/10">
          <div
            className="h-1.5 rounded-full bg-[#3F6A54]"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        <button
          type="button"
          onClick={onPlus}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
          aria-label={`Increase ${t(label)}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AccessibilityWidget;
