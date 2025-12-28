interface BackdropProps {
  onClick: () => void;
  aria: string; // بنسيبه للـ API لكن مش هنستخدمه كاسم للـ overlay
  isOpen: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick, isOpen }) => {
  return (
    <div
      className={`
        fixed inset-0 z-30
        bg-[color:var(--overlay-backdrop,rgba(0,0,0,0.4))]
        transition-opacity duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClick}
      aria-hidden={!isOpen}
    />
  );
};

export default Backdrop;
