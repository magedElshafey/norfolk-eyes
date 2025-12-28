import { RiCloseLine } from "react-icons/ri";
import { memo } from "react";

interface SidebarIntroProps {
  onClose: () => void;
  children: React.ReactNode;
  height?: string;
}

const SidebarIntro: React.FC<SidebarIntroProps> = ({
  onClose,
  children,
  height = "h-36",
}) => (
  <header
    className={`
      w-full ${height}
      bg-[var(--sidebar-header-bg)]
      text-[var(--sidebar-header-text)]
      p-3 flex flex-col
    `}
  >
    <button
      onClick={onClose}
      aria-label="Close sidebar"
      className="
        transition duration-200
        hover:scale-105 hover:text-softYellowLight
        mb-3 self-start
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-softYellowLight
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--sidebar-header-bg)]
      "
    >
      <RiCloseLine size={25} aria-hidden="true" />
    </button>
    {children}
  </header>
);

export default memo(SidebarIntro);
