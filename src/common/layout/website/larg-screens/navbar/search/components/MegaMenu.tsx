import type { NavItem } from "../../types/navbar.types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useId, useMemo } from "react";
import Loader from "@/common/components/loader/spinner/Loader";
import { useMegaMenuItems } from "./useMegaMenuItems";

type MegaMenuProps = {
  parent: NavItem;
  onClose: () => void;
};

const MegaMenu: React.FC<MegaMenuProps> = ({ parent, onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const headingId = useId();

  const { items, isLoading, isError } = useMegaMenuItems(parent);
  // هل اسم الـ parent من API ولا من الترجمة؟
  const parentLabel = useMemo(() => {
    const isApiTitle =
      parent.kind === "procedures" || parent.kind === "patientEducation";
    return isApiTitle ? parent.name : t(`Navbar.${parent.name}`);
  }, [parent.kind, parent.name, t]);

  const renderLabel = (item: NavItem) => {
    const isApiTitle =
      item.kind === "procedures" || item.kind === "patientEducation";
    return isApiTitle ? item.name : t(`Navbar.${item.name}`);
  };

  return (
    <div
      className={`
        absolute  top-full border-t-transparent
        w-[min(100vw-2rem,48rem)] 2xl:w-[56rem]
        ${isRTL ? "right-1/2 translate-x-[50%]" : "left-1/2 translate-x-[-50%]"}
        rounded-2xl
        border border-[color:var(--border-subtle)]
        bg-[color:var(--bg-surface)]
        shadow-xl
        z-30 capitalize!
      `}
      role="menu"
      aria-labelledby={headingId}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[color:var(--border-subtle)] flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p
            id={headingId}
            className="text-sm font-semibold text-[color:var(--section-title-color)] truncate"
          >
            {t(`Navbar.${parentLabel}`)}
          </p>
        </div>

        <Link
          to={parent.path}
          onClick={onClose}
          className="
            text-xs md:text-sm font-medium
            text-[color:var(--accent)]
            hover:underline
            whitespace-nowrap
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[color:var(--focus-ring)]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[color:var(--bg-surface)]
            transition-colors !capitalize
          "
        >
          {t("View all")}
          {/* {t("Global.View")}{" "}
          {t(`Navbar.${String(parentLabel).toLowerCase?.()}`) ??
            t(`Navbar.${parentLabel}`)} */}
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          className="w-full py-8 flex justify-center"
          role="status"
          aria-live="polite"
        >
          <Loader className="w-7 h-7" />
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <div
          className="
            grid gap-3 p-4
            sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            max-h-[70vh] overflow-y-auto
            text-[color:var(--section-body-color)]
          "
        >
          {items?.slice(0, 12).map((child) => (
            <div
              key={child.path}
              className="
                group flex flex-col
                px-2 py-2 rounded-xl
                hover:bg-[color:var(--bg-subtle)]
                transition-colors capitalize!
              "
            >
              <Link
                to={child.path}
                onClick={onClose}
                role="menuitem"
                className="
                  inline-flex w-fit
                  text-sm font-semibold
                  text-[color:var(--accent)]
                  border-b border-transparent pb-1
                  hover:border-[color:var(--accent)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[color:var(--focus-ring)]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[color:var(--bg-surface)]
                  transition-colors !capitalize
                "
              >
                {renderLabel(child)}
              </Link>

              {child.children?.length ? (
                <div
                  className="mt-2 flex flex-wrap gap-1.5"
                  role="group"
                  aria-label={t("MegaMenu.subItems")}
                >
                  {child.children.map((sub) => {
                    console.log("sub path", sub?.path);
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={onClose}
                        role="menuitem"
                        className="
                        inline-flex items-center
                        rounded-full
                        px-2.5 py-0.5
                        text-[0.7rem]
                        bg-[color:var(--section-chip-bg)]
                        text-[color:var(--section-chip-text)]
                        hover:underline
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[color:var(--focus-ring)]
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-[color:var(--bg-surface)]
                        transition-colors !capitalize
                      "
                      >
                        {renderLabel(sub)}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ))}

          {!items.length && (
            <p className="text-xs text-[color:var(--section-muted-color)]">
              {isError ? t("Global.ErrorLoading") : t("Global.NoItems")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
