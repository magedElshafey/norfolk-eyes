import { memo, useState, useCallback } from "react";
import { IoIosArrowBack } from "react-icons/io";
import type { ProcedureListType } from "@/features/producers/types/ProcedureList.types";

interface ProcedureItemProps {
  category: ProcedureListType;
  level?: number;
  dir: "ltr" | "rtl";
  onNavigate: (slug: string) => void;
}

const ProcedureItem = memo(
  ({ category, level = 0, dir, onNavigate }: ProcedureItemProps) => {
    const [open, setOpen] = useState(false);

    const hasChildren =
      Array.isArray(category.children) && category.children.length > 0;

    const toggleOpen = useCallback(() => {
      setOpen((prev) => !prev);
    }, []);

    const handleClick = useCallback(() => {
      onNavigate(category.slug);
    }, [category.slug, onNavigate]);

    const paddingInline = level * 12; // px

    return (
      <li
        className="py-2 border-b last:border-b-0 mx-2 border-[var(--sidebar-border)]"
        role="none"
      >
        <div className="flex justify-between items-center gap-2">
          {/* زرار العنصر الأساسي */}
          <button
            onClick={handleClick}
            className="
              flex gap-2 items-center text-left
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primaryGreen
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[var(--sidebar-bg)]
              text-sm
              text-[var(--sidebar-text)]
              transition-colors
            "
            role="menuitem"
          >
            <span
              style={
                dir === "rtl"
                  ? { paddingRight: paddingInline }
                  : { paddingLeft: paddingInline }
              }
            >
              {category.name}
            </span>
          </button>

          {/* زرار فتح/قفل الأولاد */}
          {hasChildren && (
            <button
              onClick={toggleOpen}
              aria-expanded={open}
              aria-label={`Toggle ${category.name}`}
              className="
                p-1 rounded-md
                bg-[var(--sidebar-bg)]
                border border-[var(--sidebar-border)]
                shadow-sm
                text-[var(--sidebar-text)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-primaryGreen
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--sidebar-bg)]
                transition-colors
              "
            >
              <IoIosArrowBack
                size={18}
                className={`
                  transition-transform duration-300
                  ${dir === "rtl" ? "" : "rotate-180"}
                  ${open ? "rotate-90" : ""}
                `}
                aria-hidden="true"
              />
            </button>
          )}
        </div>

        {hasChildren && (
          <ul
            className={`
              overflow-hidden
              transition-[max-height]
              duration-300
              ease-in-out
              ${open ? "max-h-96" : "max-h-0"}
            `}
            role="menu"
          >
            {category.children!.map((child) => (
              <ProcedureItem
                key={child.id}
                category={child}
                level={level + 1}
                dir={dir}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }
);

ProcedureItem.displayName = "ProcedureItem";

export default ProcedureItem;
