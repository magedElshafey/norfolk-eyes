// import React, { useEffect, useState } from "react";
// import { useCookieConsent } from "./CookieConsentProvider";
// import CookiePreferencesModal from "./CookiePreferencesModal";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import MainBtn from "@/common/components/buttons/MainBtn";
// const CookieBanner: React.FC = () => {
//   const { hasDecision, acceptAll, rejectNonEssential } = useCookieConsent();
//   const [openPrefs, setOpenPrefs] = useState(false);
//   const { t } = useTranslation();

//   useEffect(() => {
//     const openHandler = () => setOpenPrefs(true);
//     window.addEventListener("wf:open-cookie-settings", openHandler);
//     return () =>
//       window.removeEventListener("wf:open-cookie-settings", openHandler);
//   }, []);

//   if (hasDecision)
//     return (
//       <CookiePreferencesModal
//         open={openPrefs}
//         onClose={() => setOpenPrefs(false)}
//       />
//     );

//   return (
//     <>
//       <div
//         role="region"
//         aria-label="Cookie consent"
//         className="
//           fixed inset-x-0 bottom-0 z-50 bg-[var(--bg-hero)]
//           border-t border-border-subtle
//         "
//       >
//         <div className="containerr py-3">
//           <div className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
//             <div className="space-y-1">
//               <p className="text-sm font-semibold text-[var(--primary-green)]">
//                 {t("Cookies Policy")}
//               </p>
//               <p className="text-xs text-[var(--text-muted)] leading-relaxed">
//                 {t(
//                   "We use essential cookies for site functionality. With your permission, we also use optional cookies (e.g., analytics) to improve the website. You can change your choice at any time in Cookie settings."
//                 )}
//               </p>
//               <Link
//                 to="/cookies"
//                 className="
//                   inline-flex text-xs text-[var(--text-muted)] hover:underline
//                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
//                   focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface rounded-sm
//                 "
//               >
//                 {t("Read our Cookies Policy")}
//               </Link>
//             </div>

//             {/* Buttons: equal prominence (ICO expectation) */}
//             <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
//               <MainBtn
//                 variant="solid"
//                 type="button"
//                 onClick={rejectNonEssential}
//                 text="Reject non-essential"
//                 showArrow={false}
//                 theme="danger"
//               />
//               <MainBtn
//                 variant="solid"
//                 type="button"
//                 onClick={() => setOpenPrefs(true)}
//                 text="Manage"
//                 showArrow={false}
//               />
//               <MainBtn
//                 variant="solid"
//                 type="button"
//                 onClick={acceptAll}
//                 text="Accept all"
//                 showArrow={false}
//                 theme="secondary"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <CookiePreferencesModal
//         open={openPrefs}
//         onClose={() => setOpenPrefs(false)}
//       />
//     </>
//   );
// };

// export default CookieBanner;
// src/cookies/CookieBanner.tsx
import React, { useEffect, useState } from "react";
import { useCookieConsent } from "./CookieConsentProvider";
import CookiePreferencesModal from "./CookiePreferencesModal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MainBtn from "@/common/components/buttons/MainBtn";

const CookieBanner: React.FC = () => {
  const { hasDecision, acceptAll, rejectNonEssential } = useCookieConsent();
  const [openPrefs, setOpenPrefs] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const openHandler = () => setOpenPrefs(true);
    window.addEventListener("wf:open-cookie-settings", openHandler);
    return () =>
      window.removeEventListener("wf:open-cookie-settings", openHandler);
  }, []);

  return (
    <>
      {/* Banner يظهر فقط لو مفيش قرار */}
      {!hasDecision && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 bg-[var(--bg-hero)] border-t border-border-subtle"
        >
          <div className="containerr py-3">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[var(--primary-green)]">
                  {t("Cookies Policy")}
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {t(
                    "We use essential cookies for site functionality. With your permission, we also use optional cookies (e.g., analytics) to improve the website. You can change your choice at any time in Cookie settings."
                  )}
                </p>
                <Link
                  to="/cookies"
                  className="inline-flex text-xs text-[var(--text-muted)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface rounded-sm"
                >
                  {t("Read our Cookies Policy")}
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <MainBtn
                  variant="solid"
                  type="button"
                  onClick={rejectNonEssential}
                  text={t("Reject non-essential")}
                  showArrow={false}
                  theme="danger"
                />
                <MainBtn
                  variant="solid"
                  type="button"
                  onClick={() => setOpenPrefs(true)}
                  text={t("Manage")}
                  showArrow={false}
                />
                <MainBtn
                  variant="solid"
                  type="button"
                  onClick={acceptAll}
                  text={t("Accept all")}
                  showArrow={false}
                  theme="secondary"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal موجودة دايمًا (تفتح من Banner أو من أي مكان بالحدث) */}
      <CookiePreferencesModal
        open={openPrefs}
        onClose={() => setOpenPrefs(false)}
      />
    </>
  );
};

export default CookieBanner;
