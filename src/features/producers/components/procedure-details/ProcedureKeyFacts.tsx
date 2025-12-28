import React from "react";

import { useTranslation } from "react-i18next";
import { FeatureType } from "../../types/ProcedureList.types";

interface Props {
  features: FeatureType[];
}

const ProcedureKeyFacts: React.FC<Props> = ({ features }) => {
  const { t } = useTranslation();

  return (
    <section
      className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"
      aria-label={t("Procedure.keyFacts", "Key procedure facts")}
    >
      {features.map((fact) => (
        <article
          key={fact.title}
          className="
            rounded-2xl
            bg-[var(--card-bg)]
            border border-[var(--card-border)]
            px-3 py-3 md:px-4 md:py-4
          "
        >
          <p className="text-[11px] md:text-xs text-[color:var(--section-muted-color)] mb-1">
            {fact.title}
          </p>
          <p className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]">
            {fact.description}
          </p>
        </article>
      ))}
    </section>
  );
};

export default ProcedureKeyFacts;
