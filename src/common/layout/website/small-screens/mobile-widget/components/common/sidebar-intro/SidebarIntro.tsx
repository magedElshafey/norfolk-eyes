import React, { memo } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

interface SidebarIntroProps {
  onClose: () => void;
  children: React.ReactNode;
  height?: string;
}

const SidebarIntro: React.FC<SidebarIntroProps> = ({
  onClose,
  children,
  height = "h-36",
}) => {
  const { t } = useTranslation();

  const closeLabel = t("A11y.closeSidebar", "Close sidebar");

  return (
    <header
      className={`
        w-full ${height}
        bg-[color:var(--bg-subtle)]
        text-[color:var(--text-main)]
        border-b border-[color:var(--border-subtle)]
        p-3 flex flex-col
      `}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="
          transition duration-200
          hover:scale-105
          hover:text-[color:var(--accent)]
          mb-3 self-start
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[color:var(--focus-ring)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[color:var(--bg-subtle)]
        "
      >
        <RiCloseLine size={25} aria-hidden="true" />
      </button>
      {children}
    </header>
  );
};

export default memo(SidebarIntro);
