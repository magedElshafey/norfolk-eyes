// src/common/components/sections/SectionDescription.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface SectionDescriptionProps {
  description: string;
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({
  description,
}) => {
  const { t } = useTranslation();

  return (
    <p className="max-w-[var(--section-max-width)] text-sm md:text-base text-[color:var(--text-soft)]">
      {t(description)}
    </p>
  );
};

export default React.memo(SectionDescription);
