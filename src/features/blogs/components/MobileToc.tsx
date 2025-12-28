import { useState } from "react";
import type { TocItem } from "../types/TocItem";
import { jumpToId } from "../utils/jumpToId";
import { useTranslation } from "react-i18next";

type Props = {
  tocItems: TocItem[];
  activeId?: string;
};

const MobileToc: React.FC<Props> = ({ tocItems }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  if (!tocItems.length) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 rounded-full bg-black text-white px-4 py-2 text-xs"
      >
        {t("On this page")}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute bottom-0 w-full rounded-t-3xl bg-[var(--bg-hero)] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold">{t("On this page")}</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <ol className="space-y-2">
              {tocItems.map((item, i) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      jumpToId(item.id);
                      setOpen(false);
                    }}
                    className="flex gap-2 text-left"
                  >
                    <span>{i + 1}.</span>
                    <span>{item.text}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileToc;
