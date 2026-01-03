// import { useCallback, useMemo, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import IconBadge from "./components/common/IconBadge";
// import { IoHomeOutline } from "react-icons/io5";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { SiBookstack } from "react-icons/si";
// import { FaHandHoldingMedical } from "react-icons/fa";

// import ProcedureSidebar from "./components/common/procedures-sidebar/ProceduresSidebar";
// import Sidebar from "../sidebar/Sidebar";
// import EducationSidebar from "./components/common/education-sidebar/EducationSidebar";
// import Search from "../../larg-screens/navbar/search/Search";

// const MobileWidget = () => {
//   const navigate = useNavigate();

//   const [showProcedureSidebar, setShowProcedureSidebar] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [showEducationSidebar, setShowEducationSidebar] = useState(false);

//   const openSidebar = useCallback(() => setShowSidebar(true), []);
//   const closeSidebar = useCallback(() => setShowSidebar(false), []);
//   const openProcedureSidebar = useCallback(
//     () => setShowProcedureSidebar(true),
//     []
//   );
//   const closeProcedureSidebar = useCallback(
//     () => setShowProcedureSidebar(false),
//     []
//   );
//   const openEducationSidebar = useCallback(
//     () => setShowEducationSidebar(true),
//     []
//   );
//   const closeEducationSidebar = useCallback(
//     () => setShowEducationSidebar(false),
//     []
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setShowSidebar(false);
//         setShowProcedureSidebar(false);
//         setShowEducationSidebar(false);
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const homeAction = useCallback(() => navigate("/"), [navigate]);

//   const actions = useMemo(
//     () => [
//       { Icon: GiHamburgerMenu, title: "Navbar.Menu", onClick: openSidebar },
//       { Icon: IoHomeOutline, title: "Navbar.Home", onClick: homeAction },
//       {
//         Icon: FaHandHoldingMedical,
//         title: "Navbar.Procedures",
//         onClick: openProcedureSidebar,
//       },
//       {
//         Icon: SiBookstack,
//         title: "Navbar.patient education",
//         onClick: openEducationSidebar,
//       },
//     ],
//     [homeAction, openProcedureSidebar, openSidebar, openEducationSidebar]
//   );

//   return (
//     <>
//       <nav
//         className="
//           fixed bottom-0 left-0 right-0 z-50
//           border-t
//           bg-[var(--mobile-nav-bg)]
//           text-[var(--mobile-nav-text)]
//           border-[var(--mobile-nav-border)]
//           shadow-2xl
//           px-2 py-2
//           md:hidden
//         "
//         role="navigation"
//         aria-label="Mobile bottom navigation"
//       >
//         <div className="containerr">
//           {/* ✅ Grid ثابت = مفيش سكرول */}
//           <ul className="grid grid-cols-5 gap-1 items-stretch">
//             {actions.map(({ Icon, title, onClick }) => (
//               <li key={title} className="min-w-0">
//                 <IconBadge Icon={Icon} title={title} onClick={onClick} />
//               </li>
//             ))}

//             {/* Search – يفضّل يكون icon فقط */}
//             <li className="min-w-0">
//               <Search />
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {showProcedureSidebar && (
//         <ProcedureSidebar
//           isOpen={showProcedureSidebar}
//           onClose={closeProcedureSidebar}
//         />
//       )}
//       {showEducationSidebar && (
//         <EducationSidebar
//           isOpen={showEducationSidebar}
//           onClose={closeEducationSidebar}
//         />
//       )}
//       {showSidebar && <Sidebar isOpen={showSidebar} onClose={closeSidebar} />}
//     </>
//   );
// };

// export default MobileWidget;
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import IconBadge from "./components/common/IconBadge";
import { IoHomeOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";
import { FaHandHoldingMedical } from "react-icons/fa";

import Sidebar from "../sidebar/Sidebar";
import ProcedureSidebar from "./components/common/procedures-sidebar/ProceduresSidebar";
import EducationSidebar from "./components/common/education-sidebar/EducationSidebar";
import Search from "../../larg-screens/navbar/search/Search";

type SidebarType = "menu" | "procedure" | "education" | null;

const MobileWidget = () => {
  const navigate = useNavigate();

  /** 🔥 sidebar controller */
  const [activeSidebar, setActiveSidebar] = useState<SidebarType>(null);

  const openSidebar = useCallback((type: SidebarType) => {
    setActiveSidebar(type);
  }, []);

  const closeSidebar = useCallback(() => {
    setActiveSidebar(null);
  }, []);

  /** 🖥️ close all sidebars on desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setActiveSidebar(null);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const homeAction = useCallback(() => {
    setActiveSidebar(null);
    navigate("/");
  }, [navigate]);

  const actions = useMemo(
    () => [
      {
        Icon: GiHamburgerMenu,
        title: "Navbar.Menu",
        onClick: () => openSidebar("menu"),
      },
      {
        Icon: IoHomeOutline,
        title: "Navbar.Home",
        onClick: homeAction,
      },
      {
        Icon: FaHandHoldingMedical,
        title: "Navbar.Procedures",
        onClick: () => openSidebar("procedure"),
      },
      {
        Icon: SiBookstack,
        title: "Navbar.patient education",
        onClick: () => openSidebar("education"),
      },
    ],
    [homeAction, openSidebar]
  );

  return (
    <>
      {/* 🔻 Bottom Mobile Navigation */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          border-t
          bg-[var(--mobile-nav-bg)]
          text-[var(--mobile-nav-text)]
          border-[var(--mobile-nav-border)]
          shadow-2xl
          px-2 py-2
          md:hidden
        "
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        <div className="containerr">
          <ul className="grid grid-cols-5 gap-1 items-stretch">
            {actions.map(({ Icon, title, onClick }) => (
              <li key={title} className="min-w-0">
                <IconBadge Icon={Icon} title={title} onClick={onClick} />
              </li>
            ))}

            <li className="min-w-0">
              <Search />
            </li>
          </ul>
        </div>
      </nav>

      {/* 🔹 Sidebars */}
      {activeSidebar === "menu" && <Sidebar isOpen onClose={closeSidebar} />}

      {activeSidebar === "procedure" && (
        <ProcedureSidebar isOpen onClose={closeSidebar} />
      )}

      {activeSidebar === "education" && (
        <EducationSidebar isOpen onClose={closeSidebar} />
      )}
    </>
  );
};

export default MobileWidget;
