import { useTranslation } from "react-i18next";
import SidebarIntro from "../mobile-navbar/common/SidebarIntro";
import { memo } from "react";
import Backdrop from "../mobile-navbar/common/Backdrop";
import { Link } from "react-router-dom";
import LanguageDropdown from "../../common/lang-menu/LangMenu";
import { sidebarLinks } from "../../larg-screens/navbar/data/data";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const titleId = "main-sidebar-title";

  return (
    <>
      <Backdrop
        isOpen={isOpen}
        onClick={onClose}
        aria={t("A11y.closeMainNav", "Close main navigation")}
      />

      <aside
        className={`
          fixed top-0
          ${dir === "rtl" ? "left-0" : "right-0"}
          h-screen w-[85%] max-w-sm
          overflow-y-auto
          bg-[color:var(--bg-surface)]
          text-[color:var(--text-main)]
          border border-[color:var(--border-subtle)]
          shadow-2xl
          z-40
          transform transition-transform duration-300 ease-out
          ${
            isOpen
              ? "translate-x-0"
              : dir === "rtl"
              ? "-translate-x-full"
              : "translate-x-full"
          }
        `}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-labelledby={titleId}
      >
        <SidebarIntro onClose={onClose} height="h-24">
          <div className="flex-center">
            <p
              id={titleId}
              className="text-xl font-bold text-[color:var(--sidebar-header-text,var(--section-title-color))]"
            >
              {t("Navbar.Menu")}
            </p>
          </div>
        </SidebarIntro>

        <nav
          aria-label={t("Navbar.Menu") ?? "Main navigation"}
          className="mt-2"
        >
          <ul className="flex flex-col divide-y divide-[color:var(--border-subtle)]">
            {sidebarLinks.map((item, idx) => (
              <li key={idx}>
                <Link
                  onClick={onClose}
                  to={item.path}
                  className="
                    block py-2 ps-3
                    text-base font-medium
                    text-[color:var(--text-main)]
                    hover:text-[color:var(--accent)]
                    hover:bg-[color:var(--bg-subtle)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[color:var(--focus-ring)]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[color:var(--bg-surface)]
                    transition-colors
                  "
                >
                  {t(`Navbar.${item.name}`)}
                </Link>
              </li>
            ))}

            <li className="py-2 ps-3">
              <LanguageDropdown />
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default memo(Sidebar);
