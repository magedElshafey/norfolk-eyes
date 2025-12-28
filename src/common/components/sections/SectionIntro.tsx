// src/common/components/sections/SectionIntro.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface SectionIntroProps {
  title: string;
}

const SectionIntro: React.FC<SectionIntroProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <p
      className="
        inline-flex items-center gap-2 rounded-full
        px-3 py-1
        text-[11px] font-semibold tracking-[0.18em]
        uppercase
        bg-[color:var(--section-chip-bg)]
        text-[color:var(--section-chip-text)]
      "
    >
      <span
        className="
          h-1.5 w-1.5 rounded-full
          bg-[color:var(--section-chip-dot)]
        "
        aria-hidden="true"
      />
      {t(title)}
    </p>
  );
};

export default React.memo(SectionIntro);
