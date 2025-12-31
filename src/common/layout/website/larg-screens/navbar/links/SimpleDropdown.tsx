import React from "react";
import { Link } from "react-router-dom";
import type { NavItem } from "../types/navbar.types";
import { useTranslation } from "react-i18next";

type Props = {
  parent: NavItem;
  isOpen: boolean;
  isRTL: boolean;
  onClose: () => void;
};

const SimpleDropdown: React.FC<Props> = ({
  parent,
  isOpen,
  isRTL,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`
        absolute  top-full border-t-transparent
        ${isRTL ? "right-1/2 translate-x-[50%]" : "left-1/2 translate-x-[-50%]"}
       
        w-64
        rounded-2xl
        border border-[color:var(--border-subtle)]
        bg-[color:var(--bg-surface)]
        shadow-xl
        transition-all duration-200 ease-out origin-top
        ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }
      `}
      role="menu"
      aria-label={t(`Navbar.${parent.name}`)}
    >
      <div className="p-2">
        {(parent.children ?? []).map((child) => (
          <Link
            key={child.path}
            to={child.path}
            onClick={onClose}
            role="menuitem"
            className="
              flex items-center
              px-3 py-2 rounded-xl
              text-sm
              text-[color:var(--text-muted)]
              hover:bg-[var(--bg-hero)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[color:var(--focus-ring)]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[color:var(--bg-surface)]
              transition-colors
            "
          >
            <span className="truncate">{t(`Navbar.${child.name}`)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimpleDropdown;
