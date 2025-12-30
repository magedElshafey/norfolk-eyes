import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../../../store/LanguageProvider";
import { IoIosArrowDown } from "react-icons/io";
import { LANGUAGES } from "../../../../../data/data";
import type { Lang } from "../../../../../types/Lang";

/* ------------------------------------------------------------------ */
/* Language option */
/* ------------------------------------------------------------------ */
const LanguageOption = ({
  lang,
  onClick,
}: {
  lang: Lang;
  onClick: (label: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => onClick(lang.label)}
      className="
        flex items-center justify-between gap-2
        px-3 py-2
        text-sm
        text-[color:var(--text-main)]
        hover:bg-[color:var(--accent-soft-bg)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[color:var(--focus-ring)]
        focus-visible:ring-offset-1
        focus-visible:ring-offset-[color:var(--card-bg)]
      "
      role="menuitem"
    >
      <span>{t(lang.title)}</span>
    </button>
  );
};

/* ------------------------------------------------------------------ */
/* Detect mobile */
/* ------------------------------------------------------------------ */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isMobile;
};

/* ------------------------------------------------------------------ */
/* Main dropdown */
/* ------------------------------------------------------------------ */
const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const buttonId = useId();
  const menuId = useId();

  // مهم للكيبورد: نتحقق هل الفوكس خرج برّه الكونتينر ولا راح للمنيو جوّه
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* ---------- language data ---------- */
  const { currentLang, otherLangs } = useMemo(() => {
    const current = LANGUAGES.find((l) => l.label === language)!;
    const others = LANGUAGES.filter((l) => l.label !== language);
    return { currentLang: current, otherLangs: others };
  }, [language]);

  const close = useCallback(() => setOpen(false), []);
  const openNow = useCallback(() => setOpen(true), []);

  const handleChange = useCallback(
    (label: string) => {
      changeLanguage(label);
      close();
    },
    [changeLanguage, close]
  );

  /* ---------- keyboard escape ---------- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  if (!currentLang) return null;

  const isRTL = i18n.dir() === "rtl";

  const handleBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    const root = rootRef.current;
    // لو الفوكس انتقل لعنصر جوه نفس الكونتينر (زر/منيو) ما تقفلش
    if (next && root?.contains(next)) return;
    close();
  };

  return (
    <div
      className="relative"
      {...(!isMobile && {
        onMouseEnter: openNow,
        onMouseLeave: close,
      })}
      // كيبورد: افتح لما أي حاجة جوه الكونتينر تاخد فوكس
      onFocusCapture={() => openNow()}
      // واقفل لما الفوكس يطلع برّه الكونتينر كله
      onBlurCapture={handleBlurCapture}
    >
      {/* Trigger button */}
      <button
        id={buttonId}
        type="button"
        className="
          flex items-center gap-2 group cursor-pointer
          focus:outline-none w-full md:w-auto
        "
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t("change_language")}
        onClick={() => {
          // موبايل: toggle بالضغط
          if (isMobile) setOpen((p) => !p);
        }}
      >
        <span className="transition duration-200 group-hover:text-[color:var(--accent)] text-xs md:text-sm">
          {t(currentLang.title)}
        </span>

        <IoIosArrowDown
          size={15}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <div
        id={menuId}
        role="menu"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className={`
          absolute top-full border-t-transparent -mt-1
          ${language === "en" ? "md:right-0" : "md:left-0"}
          md:w-[120px] w-full
          flex flex-col
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          rounded-md shadow-md z-[120000]
          transition-all duration-200 ease-in-out
          ${
            open
              ? "opacity-100 translate-y-1 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }
        `}
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        {otherLangs.map((lang) => (
          <LanguageOption key={lang.label} lang={lang} onClick={handleChange} />
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;
