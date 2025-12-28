import { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import type { NavbarProps } from "../navbar/Navbar";
// import { useLocation } from "react-router-dom";

const StickyNavbar: React.FC<NavbarProps> = ({ logo = "" }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  // const { pathname } = useLocation();

  // const isPatientEducationArticle =
  //   pathname.startsWith("/patient-education/") &&
  //   pathname !== "/patient-education";

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:block">
      {/* الـ sentinel اللي فوق الناف بار الأصلي */}
      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />

      {/* الناف بار في مكانه الطبيعي */}
      <Navbar logo={logo} />

      {/* الناف بار المثبت */}

      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
          ${
            isSticky
              ? "translate-y-0 opacity-100 shadow-md"
              : "-translate-y-full opacity-0"
          }
        `}
        aria-hidden={!isSticky}
      >
        <Navbar logo={logo} />
      </div>
    </div>
  );
};

export default StickyNavbar;
