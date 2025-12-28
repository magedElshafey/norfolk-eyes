import { useState, useEffect } from "react";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
import Logo from "@/common/components/logo/Logo";
import type { NavbarProps } from "../../larg-screens/navbar/Navbar";
const MobileNavbar: React.FC<NavbarProps> = ({ logo }) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        className={`
          fixed top-0 left-0 w-full
          bg-[var(--navbar-bg,var(--bg-page))]
          border-b border-[var(--border-subtle)]
          shadow-sm z-40 
          transition-all duration-700 ease-in-out 
          ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
        `}
        role="banner"
      >
        <div className="containerr py-3 flex-between">
          <Logo logo={logo} />

          <BookConsultationButton />
        </div>
      </div>

      <div className="h-[65px] md:hidden" />
    </>
  );
};

export default MobileNavbar;
