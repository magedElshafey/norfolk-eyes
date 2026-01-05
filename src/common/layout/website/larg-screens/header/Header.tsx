// import { Link, useLocation } from "react-router-dom";
// import useGetFeaturedProcedures from "@/features/producers/api/useGetFeaturedProcedures";
// import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
// import { useLanguage } from "@/store/LanguageProvider";
// export default function TopBar() {
//   const location = useLocation();
//   const isActive = (path: string) => location.pathname.includes(path);
//   const queryResult = useGetFeaturedProcedures();
//   const { language } = useLanguage();
//   return (
//     <FetchHandler queryResult={queryResult} skeletonType="navbar">
//       {queryResult?.data && queryResult?.data?.length > 1 ? (
//         <header
//           className="
//         hidden lg:block w-full
//         bg-[var(--topbar-bg)]
//         text-[color:var(--topbar-text)]
//       "
//           aria-label="Specialty shortcuts bar"
//         >
//           <div className="flex h-9 lg:h-10">
//             <nav
//               aria-label="Main eye-care shortcuts"
//               className={`  flex items-center
//             bg-[var(--topbar-bg)]
//            ${language === "ar" ? "text-sm" : "text-xs"}
//             font-medium
//             [clip-path:polygon(1.5rem_0,100%_0,100%_100%,0_100%)]`}
//               style={{
//                 letterSpacing:
//                   "calc(0.22em + var(--a11y-letter-spacing) * 0.01em)",
//               }}
//             >
//               <ul className="flex items-center gap-4 lg:gap-6 px-4 lg:px-8">
//                 {queryResult?.data?.map((item) => {
//                   const active = isActive(item.slug);

//                   return (
//                     <li key={item.slug}>
//                       <Link
//                         to={`/procedures/${item?.slug}`}
//                         className={`
//                       inline-flex items-center gap-1 whitespace-nowrap py-1.5
//                       focus-visible:outline-none
//                       focus-visible:ring-2
//                       focus-visible:ring-[color:var(--focus-ring)]
//                       focus-visible:ring-offset-2
//                       focus-visible:ring-offset-[color:var(--topbar-bg)]
//                       duration-300 transition-colors
//                       ${
//                         active
//                           ? "text-[var(--accent-soft)]"
//                           : "text-[var(--topbar-text)] hover:text-[var(--accent-soft)]"
//                       }
//                     `}
//                         aria-current={active ? "page" : undefined}
//                       >
//                         <span aria-hidden="true" className="text-xs">
//                           ›
//                         </span>
//                         <span>{item.name}</span>
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </nav>
//           </div>
//         </header>
//       ) : null}
//     </FetchHandler>
//   );
// }
// TopBar.tsx
import { Link, useLocation } from "react-router-dom";
import useGetFeaturedProcedures from "@/features/producers/api/useGetFeaturedProcedures";
import { useLanguage } from "@/store/LanguageProvider";

export default function TopBar() {
  const location = useLocation();
  const { data } = useGetFeaturedProcedures();
  const { language } = useLanguage();

  if (!data || data.length <= 1) return null;

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <header
      className="hidden lg:block w-full bg-[var(--topbar-bg)] text-[color:var(--topbar-text)]"
      aria-label="Specialty shortcuts bar"
    >
      <div className="flex h-9 lg:h-10">
        <nav
          className={`flex items-center font-medium ${
            language === "ar" ? "text-sm" : "text-xs"
          }`}
          style={{
            letterSpacing: "calc(0.22em + var(--a11y-letter-spacing) * 0.01em)",
          }}
        >
          <ul className="flex items-center gap-4 px-6">
            {data.map((item) => {
              const active = isActive(item.slug);

              return (
                <li key={item.slug}>
                  <Link
                    to={`/procedures/${item.slug}`}
                    className={`inline-flex items-center gap-1 py-1.5 transition-colors ${
                      active
                        ? "text-[var(--accent-soft)]"
                        : "hover:text-[var(--accent-soft)]"
                    }`}
                  >
                    <span aria-hidden>›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
