import { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconBadge from "./components/common/IconBadge";
import { IoHomeOutline } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";

import ProcedureSidebar from "./components/common/procedures-sidebar/ProceduresSidebar";
import Sidebar from "../sidebar/Sidebar";
import Search from "../../larg-screens/navbar/search/Search";
import EducationSidebar from "./components/common/education-sidebar/EducationSidebar";

const MobileWidget = () => {
  const navigate = useNavigate();
  const [showProcedureSidebar, setShowProcedureSidebar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEducationSidebar, setShowEducationSidebar] = useState(false);
  const openSidebar = useCallback(() => setShowSidebar(true), []);
  const closeSidebar = useCallback(() => setShowSidebar(false), []);
  const openProcedureSidebar = useCallback(
    () => setShowProcedureSidebar(true),
    []
  );
  const closeProcedureSidebar = useCallback(
    () => setShowProcedureSidebar(false),
    []
  );
  const openEducationSidebar = useCallback(
    () => setShowEducationSidebar(true),
    []
  );
  const closeEducationSidebar = useCallback(
    () => setShowEducationSidebar(false),
    []
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(false);
        setShowProcedureSidebar(false);
        setShowEducationSidebar(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const homeAction = useCallback(() => navigate("/"), [navigate]);

  const actions = useMemo(
    () => [
      {
        Icon: GiHamburgerMenu,
        title: "Menu",
        onClick: openSidebar,
      },
      { Icon: IoHomeOutline, title: "Home", onClick: homeAction },
      {
        Icon: TbCategoryPlus,
        title: "Procedures",
        onClick: openProcedureSidebar,
      },
      {
        Icon: SiBookstack,
        title: "patient education",
        onClick: openEducationSidebar,
      },
    ],
    [homeAction, openProcedureSidebar, openSidebar, openEducationSidebar]
  );

  return (
    <>
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          border-t
          bg-[var(--mobile-nav-bg)]
          text-[var(--mobile-nav-text)]
          border-[var(--mobile-nav-border)]
          shadow-2xl
          px-2 py-3
          md:hidden
        "
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        <div className="containerr">
          <ul className="flex-center flex-nowrap text-nowrap items-center gap-6 overflow-x-auto">
            {actions.map(({ Icon, title, onClick }) => (
              <li key={title} className="relative">
                <IconBadge
                  Icon={Icon}
                  title={`Navbar.${title}`}
                  onClick={onClick}
                />
              </li>
            ))}
            <li>
              <Search />
            </li>
          </ul>
        </div>
      </nav>

      {showProcedureSidebar && (
        <ProcedureSidebar
          isOpen={showProcedureSidebar}
          onClose={closeProcedureSidebar}
        />
      )}
      {showEducationSidebar && (
        <EducationSidebar
          isOpen={showEducationSidebar}
          onClose={closeEducationSidebar}
        />
      )}
      {showSidebar && <Sidebar isOpen={showSidebar} onClose={closeSidebar} />}
    </>
  );
};

export default MobileWidget;
