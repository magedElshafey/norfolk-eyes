import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { navLinks } from "../data/data";
import MegaMenu from "../search/components/MegaMenu";
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "../types/navbar.types";
import SimpleDropdown from "./SimpleDropdown";
interface WebsiteLinksProps {
  handleMainClick: (item: NavItem, e: React.MouseEvent) => void;
  openMega: string | null;
  setOpenMega: React.Dispatch<React.SetStateAction<string | null>>;
}

const WebsiteLinks: React.FC<WebsiteLinksProps> = ({
  handleMainClick,
  openMega,
  setOpenMega,
}) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeAll = useCallback(() => setOpenMega(null), [setOpenMega]);

  return (
    <ul
      className="
    hidden md:flex
    items-center justify-center
    gap-x-4 lg:gap-x-6
    text-sm font-medium
    min-w-0
   
  "
      style={{
        letterSpacing: "calc(0.12em + var(--a11y-letter-spacing) * 0.01em)",
      }}
    >
      {navLinks.map((item) => {
        const active = isActive(item.path);
        const hasChildren = !!item.children?.length;
        const isOpen = openMega === item.path;
        const isMega =
          item.kind === "procedures" || item.kind === "patientEducation";

        const openNow = () => {
          if (!hasChildren) return;
          setOpenMega(item.path);
        };

        const closeNow = () => {
          if (!hasChildren) return;
          closeAll();
        };

        return (
          <li
            key={item.path}
            className="relative text-[var(text-muted)]"
            onMouseEnter={openNow}
            onMouseLeave={closeNow}
            onFocus={openNow}
            onBlur={(e) => {
              const next = e.relatedTarget as Node | null;
              if (next && e.currentTarget.contains(next)) return;
              closeNow();
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeAll();
            }}
          >
            <Link
              to={item.path}
              onClick={(e) => handleMainClick(item, e)}
              className={`
                inline-flex items-center gap-1 py-1 border-b-2 transition-colors
                ${
                  active
                    ? "border-primaryGreen text-[var(--section-title-color)]"
                    : "border-transparent hover:border-softYellow"
                }
              `}
              aria-haspopup={hasChildren ? "true" : undefined}
              aria-expanded={hasChildren ? isOpen : undefined}
            >
              <span>{t(`Navbar.${item.name}`)}</span>

              {hasChildren && (
                <span
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  {isRTL ? "▴" : "▾"}
                </span>
              )}
            </Link>

            {/* Dropdown (زي CartIcon بالأنيميشن) */}
            {hasChildren && (
              <div
                className={`
                  absolute top-full z-50
                  ${
                    isRTL
                      ? "right-[50%] translate-x-[-50%]"
                      : "left-[50%] translate-x-[-50%]"
                  }
                  transition-all duration-200 ease-out transform origin-top
                  ${
                    isOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
              >
                {isMega ? (
                  <MegaMenu parent={item} onClose={closeAll} />
                ) : (
                  <SimpleDropdown
                    parent={item}
                    isOpen={isOpen}
                    isRTL={isRTL}
                    onClose={closeAll}
                  />
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default WebsiteLinks;
// import React, { useCallback } from "react";
// import { useTranslation } from "react-i18next";
// import { navLinks } from "../data/data";
// import MegaMenu from "../search/components/MegaMenu";
// import SimpleDropdown from "./SimpleDropdown";
// import { Link, useLocation } from "react-router-dom";
// import type { NavItem } from "../types/navbar.types";

// interface WebsiteLinksProps {
//   handleMainClick: (item: NavItem, e: React.MouseEvent) => void;
//   openMega: string | null;
//   setOpenMega: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const WebsiteLinks: React.FC<WebsiteLinksProps> = ({
//   handleMainClick,
//   openMega,
//   setOpenMega,
// }) => {
//   const location = useLocation();
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.dir() === "rtl";

//   const isActive = (path: string) => {
//     if (path === "/") return location.pathname === "/";
//     return location.pathname.startsWith(path);
//   };

//   const closeAll = useCallback(() => setOpenMega(null), [setOpenMega]);

//   return (
//     <ul
//       className="
//         hidden md:flex
//         items-center justify-center
//         gap-x-4 lg:gap-x-6
//         text-sm font-medium
//         min-w-0
//         whitespace-nowrap

//       "
//       style={{
//         letterSpacing: "calc(0.12em + var(--a11y-letter-spacing) * 0.01em)",
//       }}
//     >
//       {navLinks.map((item) => {
//         const active = isActive(item.path);
//         const hasChildren = !!item.children?.length;
//         const isOpen = openMega === item.path;

//         const isMega =
//           item.kind === "procedures" || item.kind === "patientEducation";

//         const openNow = () => {
//           if (!hasChildren) return;
//           setOpenMega(item.path);
//         };

//         const closeNow = () => {
//           if (!hasChildren) return;
//           closeAll();
//         };

//         return (
//           <li
//             key={item.path}
//             className="relative text-[var(text-muted)]"
//             onMouseEnter={openNow}
//             onMouseLeave={closeNow}
//             onFocus={openNow}
//             onBlur={(e) => {
//               const next = e.relatedTarget as Node | null;
//               if (next && e.currentTarget.contains(next)) return;
//               closeNow();
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Escape") closeAll();
//             }}
//           >
//             <Link
//               to={item.path}
//               onClick={(e) => handleMainClick(item, e)}
//               className={`
//                 inline-flex items-center gap-1 py-1 border-b-2 transition-colors
//                 whitespace-nowrap
//                 ${
//                   active
//                     ? "border-primaryGreen text-[var(--section-title-color)]"
//                     : "border-transparent hover:border-softYellow"
//                 }
//               `}
//               aria-haspopup={hasChildren ? "true" : undefined}
//               aria-expanded={hasChildren ? isOpen : undefined}
//             >
//               <span className="whitespace-nowrap">
//                 {t(`Navbar.${item.name}`)}
//               </span>

//               {hasChildren && (
//                 <span
//                   className={`transition-transform ${
//                     isOpen ? "rotate-180" : ""
//                   }`}
//                   aria-hidden="true"
//                 >
//                   {isRTL ? "▴" : "▾"}
//                 </span>
//               )}
//             </Link>

//             {/* ✅ Dropdown: Mega للـ procedures/education - Simple لباقي الـ static */}
//             {hasChildren && (
//               <>
//                 {isMega ? (
//                   <div
//                     className={`
//                       absolute top-full z-50
//                       ${
//                         isRTL
//                           ? "right-[50%] translate-x-[-50%]"
//                           : "left-[50%] translate-x-[-50%]"
//                       }
//                       transition-all duration-200 ease-out transform origin-top
//                       ${
//                         isOpen
//                           ? "opacity-100 scale-100"
//                           : "opacity-0 scale-95 pointer-events-none"
//                       }
//                     `}
//                   >
//                     <MegaMenu parent={item} onClose={closeAll} />
//                   </div>
//                 ) : (
//                   <SimpleDropdown
//                     parent={item}
//                     isOpen={isOpen}
//                     isRTL={isRTL}
//                     onClose={closeAll}
//                   />
//                 )}
//               </>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default WebsiteLinks;
