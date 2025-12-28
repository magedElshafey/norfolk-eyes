import React from "react";
import { useTranslation } from "react-i18next";

import { Procedure } from "../../types/ProcedureList.types";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

interface Props {
  procedure: Procedure;
}

const ProcedureInstructions: React.FC<Props> = ({ procedure }) => {
  const { t } = useTranslation();

  return (
    <section
      className="
        rounded-2xl bg-[var(--bg-surface)]
        border border-[var(--border-subtle)]
        p-4 md:p-5 space-y-4
      "
      aria-label={t("Procedure.instructions", "Before and after instructions")}
    >
      <header className="space-y-1">
        <h2 className="text-base md:text-lg font-semibold text-[color:var(--section-title-color)]">
          {t("Preparing for – and recovering from – your procedure")}
        </h2>
        <p className="text-xs md:text-sm text-[color:var(--section-muted-color)]">
          {t(
            "These general instructions will be tailored for you at your consultation."
          )}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 text-xs md:text-sm">
        <div className="rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-3 space-y-2">
          <h3 className="text-sm font-semibold text-[color:var(--section-title-color)]">
            {t("Before your procedure")}
          </h3>
          <div className="!text-[color:var(--section-body-color)]">
            <HtmlConverter html={procedure.preparing_instructions} />
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-3 space-y-2">
          <h3 className="text-sm font-semibold text-[color:var(--section-title-color)]">
            {t("After your procedure")}
          </h3>
          <div className="!text-[color:var(--section-body-color)]">
            <HtmlConverter html={procedure.recovery_instructions} />
          </div>
        </div>
      </div>

      <div className="!text-[11px] md:!text-xs !text-[color:var(--section-muted-color)]">
        <HtmlConverter html={procedure?.additional_notes} />
      </div>
    </section>
  );
};

export default ProcedureInstructions;
