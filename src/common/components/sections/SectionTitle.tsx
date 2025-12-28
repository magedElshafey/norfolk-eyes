// src/common/components/sections/SectionTitle.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface SectionTitleProps {
  text: string; // key في i18n أو نص عادي
  as?: "h1" | "h2" | "h3";
  id?: string;
}

const variants = {
  base: "font-bold leading-tight text-[color:var(--section-title-color)]",
  h1: "text-2xl md:text-3xl lg:text-4xl xl:text-[2.6rem]",
  h2: "text-lg md:text-xl lg:text-2xl xl:text-3xl",
  h3: "text-base md:text-lg lg:text-xl xl:text-2xl",
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  text,
  as: Tag = "h1",
  id = "",
}) => {
  const { t } = useTranslation();
  const sizeClass =
    Tag === "h1" ? variants.h1 : Tag === "h2" ? variants.h2 : variants.h3;

  return (
    <Tag id={id} className={`${variants.base} ${sizeClass}`}>
      {t(text)}
    </Tag>
  );
};

export default React.memo(SectionTitle);
