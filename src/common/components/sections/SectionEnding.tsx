// src/common/components/sections/SectionEnding.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface SectionEndingProps {
  text: string;
}

const SectionEnding: React.FC<SectionEndingProps> = ({ text }) => {
  const { t } = useTranslation();

  return (
    <p className="text-[11px] md:text-xs text-[color:var(--text-muted)] max-w-[var(--section-max-width)]">
      {t(text)}
    </p>
  );
};

export default React.memo(SectionEnding);
