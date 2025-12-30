import { useEffect, useState, useId } from "react";
import type { TocItem } from "../types/TocItem";
import { jumpToId } from "../utils/jumpToId";
import { useTranslation } from "react-i18next";

type Props = {
  tocItems: TocItem[];
  activeId?: string;
};

const MobileToc: React.FC<Props> = ({ tocItems, activeId }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dialogId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!tocItems.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          lg:hidden fixed bottom-4 right-4 z-50
          rounded-full
          bg-[var(--accent)]
          text-white
          px-4 py-2 text-xs font-semibold
          shadow-lg
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[color:var(--focus-ring)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[color:var(--bg-page)]
        "
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
      >
        {t("On this page")}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          role="presentation"
        >
          <div
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-label={t("On this page")}
            className="
              absolute bottom-0 w-full
              rounded-t-3xl
              bg-[var(--bg-hero)]
              border-t border-[var(--border-subtle)]
              p-4
              max-h-[75vh]
              overflow-auto
            "
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-[color:var(--section-title-color)]">
                {t("On this page")}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  h-9 w-9 rounded-xl
                  border border-[var(--border-subtle)]
                  bg-[var(--card-bg)]
                  text-[color:var(--text-main)]
                  hover:bg-[var(--bg-subtle)]
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-[color:var(--focus-ring)]
                "
                aria-label={t("Close")}
              >
                ✕
              </button>
            </div>

            <ol className="space-y-2">
              {tocItems.map((item, i) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        jumpToId(item.id);
                        setOpen(false);
                      }}
                      className={[
                        "w-full flex gap-2 text-left rounded-xl px-3 py-2 text-sm",
                        "border border-transparent",
                        isActive
                          ? "bg-[var(--accent-soft-bg)] text-[var(--accent)] font-semibold"
                          : "text-[var(--text-soft)] hover:bg-[var(--bg-subtle)]",
                      ].join(" ")}
                    >
                      <span className="opacity-70">{i + 1}.</span>
                      <span className="line-clamp-2">{item.text}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileToc;
