import React from "react";

import { useTranslation } from "react-i18next";

interface Props {
  features: {
    duration_minutes: string;
    anesthesia: string;
    recovery_days: string;
    is_eyelid_treated: string;
  };
}

const ProcedureKeyFacts: React.FC<Props> = ({ features }) => {
  const { t } = useTranslation();

  return (
    <section
      className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"
      aria-label={t("Procedure.keyFacts", "Key procedure facts")}
    >
      {features && features?.duration_minutes && (
        <article
          className="
            rounded-2xl
            bg-[var(--card-bg)]
            border border-[var(--card-border)]
            px-3 py-3 md:px-4 md:py-4
          "
        >
          <p className="text-[11px] md:text-xs text-[color:var(--text-muted)] mb-1">
            {t("Procedure.duration", "Procedure time")}
          </p>
          <p className="text-sm md:text-base font-semibold text-[var(--text-primary-green)]">
            {features.duration_minutes}
          </p>
        </article>
      )}
      {features && features?.anesthesia && (
        <article
          className="
            rounded-2xl
            bg-[var(--card-bg)]
            border border-[var(--card-border)]
            px-3 py-3 md:px-4 md:py-4
          "
        >
          <p className="text-[11px] md:text-xs text-[color:var(--text-muted)] mb-1">
            {t("Procedure.anaesthesia", "Anaesthesia")}
          </p>
          <p className="text-sm md:text-base font-semibold text-[var(--text-primary-green)]">
            {features.anesthesia}
          </p>
        </article>
      )}
      {features && features?.recovery_days && (
        <article
          className="
            rounded-2xl
            bg-[var(--card-bg)]
            border border-[var(--card-border)]
            px-3 py-3 md:px-4 md:py-4
          "
        >
          <p className="text-[11px] md:text-xs text-[color:var(--text-muted)] mb-1">
            {t("Procedure.recovery", "Typical recovery")}
          </p>
          <p className="text-sm md:text-base font-semibold text-[var(--text-primary-green)]">
            {features.recovery_days}
          </p>
        </article>
      )}
      {features && features?.is_eyelid_treated && (
        <article
          className="
            rounded-2xl
            bg-[var(--card-bg)]
            border border-[var(--card-border)]
            px-3 py-3 md:px-4 md:py-4
          "
        >
          <p className="text-[11px] md:text-xs text-[color:var(--text-muted)] mb-1">
            {t("Procedure.eyeSide", "Eye(s) treated")}
          </p>
          <p className="text-sm md:text-base font-semibold text-[var(--text-primary-green)]">
            {features.is_eyelid_treated}
          </p>
        </article>
      )}
      {/* {features.map((fact) => (
       
      ))} */}
    </section>
  );
};

export default ProcedureKeyFacts;
