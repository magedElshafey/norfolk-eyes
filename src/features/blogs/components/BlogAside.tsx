import { useTranslation } from "react-i18next";
import type { TocItem } from "../types/TocItem";
import { jumpToId } from "../utils/jumpToId";

type Props = {
  tocItems: TocItem[];
  activeId?: string;
};

const BlogAside: React.FC<Props> = ({ tocItems, activeId }) => {
  const { t } = useTranslation();
  if (!tocItems.length) return null;

  return (
    <div
      aria-label={t("On this page")}
      className="rounded-2xl border bg-[var(--bg-surface)] p-4"
    >
      <h2 className="text-xs font-semibold mb-3">{t("On this page")}</h2>

      <ol className="space-y-1.5 text-xs">
        {tocItems.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => jumpToId(item.id)}
              className={`w-full text-left flex gap-2 px-2 py-1 rounded
                  ${
                    item.id === activeId
                      ? "bg-[var(--accent-soft-bg)] text-[var(--accent)] font-semibold"
                      : "text-[var(--text-soft)] hover:bg-[var(--bg-subtle)]"
                  }`}
            >
              <span>{i + 1}.</span>
              <span>{item.text}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BlogAside;
