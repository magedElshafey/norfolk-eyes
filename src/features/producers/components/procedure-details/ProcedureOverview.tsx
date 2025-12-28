import React from "react";
import { useTranslation } from "react-i18next";

import { Procedure } from "../../types/ProcedureList.types";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

interface Props {
  procedure: Procedure;
}

const ProcedureOverview: React.FC<Props> = ({ procedure }) => {
  const { t } = useTranslation();

  return (
    <section
      aria-label={t("Procedure.overview", "Procedure overview")}
      className="
        rounded-2xl bg-[var(--bg-surface)]
        border border-[var(--border-subtle)]
        p-4 md:p-5 space-y-4
      "
    >
      <header className="space-y-1">
        <h2 className="text-base md:text-lg font-semibold text-[color:var(--section-title-color)]">
          {t("What does this procedure involve?")}
        </h2>
        <p className="text-xs md:text-sm text-[color:var(--section-muted-color)]">
          <HtmlConverter html={procedure?.what_involves} />
        </p>
      </header>

      {/* <div className="text-xs md:text-sm space-y-3 text-[color:var(--section-body-color)]">
        <p>
          {t(
            "Procedure.genericParagraph1",
            "The procedure is performed through a small incision using modern microsurgical techniques. The cloudy natural lens is carefully removed and replaced with a clear intraocular lens (IOL) chosen to best match your visual goals."
          )}
        </p>
        <p>
          {t(
            "Procedure.genericParagraph2",
            "You will usually go home the same day. Vision often begins to clear within the first 24–48 hours, although it may take several weeks to fully stabilise."
          )}
        </p>
      </div> */}

      <div className="grid gap-3 md:grid-cols-2 text-xs md:text-sm">
        <div className="rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-3 space-y-1">
          <p className="font-semibold text-[color:var(--section-title-color)]">
            {t("Potential benefits")}
          </p>
          <div className="!text-[color:var(--section-body-color)]">
            <HtmlConverter html={procedure?.potential_benefits} />
          </div>
        </div>

        <div className="rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-3 space-y-1">
          <p className="font-semibold text-[color:var(--section-title-color)]">
            {t("Risks & considerations")}
          </p>
          <div className="!text-[color:var(--section-body-color)]">
            <HtmlConverter html={procedure?.risks_considerations} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcedureOverview;
