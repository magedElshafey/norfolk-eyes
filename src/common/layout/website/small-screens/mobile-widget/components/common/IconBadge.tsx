// import type { IconType } from "react-icons";
// import { useTranslation } from "react-i18next";

// interface IconBadgeProps {
//   Icon: IconType;
//   title: string;
//   onClick: () => void;
// }

// const IconBadge: React.FC<IconBadgeProps> = ({ Icon, title, onClick }) => {
//   const { t } = useTranslation();
//   return (
//     <button
//       onClick={onClick}
//       aria-label={t(title)}
//       className="flex flex-col items-center gap-1  transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orangeColor rounded-lg p-1"
//     >
//       <Icon size={22} aria-hidden="true" />
//       <span className="text-[10px]">{t(title)}</span>
//     </button>
//   );
// };

// export default IconBadge;
import type { IconType } from "react-icons";
import { useTranslation } from "react-i18next";

interface IconBadgeProps {
  Icon: IconType;
  title: string;
  onClick: () => void;
}

const IconBadge: React.FC<IconBadgeProps> = ({ Icon, title, onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t(title)}
      className="
        w-full
        flex flex-col items-center justify-center
        gap-1
        py-2
        rounded-2xl
        transition
        hover:bg-white/10
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--focus-ring)]
      "
    >
      {/* ✅ Icon box موحّد */}
      <span
        aria-hidden="true"
        className="
          grid place-items-center
          w-10 h-10
          rounded-2xl
          bg-white/10
          border border-white/10
        "
      >
        <Icon className="w-5 h-5" />
      </span>

      {/* ✅ Text موحّد (سطر واحد فقط) */}
      <span
        className="
          text-[10px]
          leading-none
          text-center
          max-w-[72px]
          truncate
          opacity-90
        "
      >
        {t(title)}
      </span>
    </button>
  );
};

export default IconBadge;
