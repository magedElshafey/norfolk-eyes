import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { RxChevronDown } from "react-icons/rx";
import { Procedure } from "../../types/ProcedureList.types";
import HtmlConverter from "@/common/components/htmlConverter/HtmlConverter";

interface Props {
  procedure: Procedure;
}

const ProcedureFaq: React.FC<Props> = ({ procedure }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionId = "procedure-faq";

  if (!procedure.faqs.length) return null;

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className="
        rounded-2xl bg-[var(--bg-surface)]
        border border-[var(--border-subtle)]
        p-4 md:p-5
      "
    >
      <header className="space-y-1 mb-3">
        <h2
          id={`${sectionId}-heading`}
          className="text-base md:text-lg font-semibold text-[color:var(--section-title-color)]"
        >
          {t("Frequently asked questions")}
        </h2>
        <p className="text-xs md:text-sm text-[color:var(--section-muted-color)]">
          {t("Answers to common questions patients ask about this procedure.")}
        </p>
      </header>

      <div className="divide-y divide-[var(--border-subtle)]" role="list">
        {procedure.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `faq-button-${idx}`;
          const panelId = `faq-panel-${idx}`;

          return (
            <div key={faq.question} role="listitem">
              <button
                id={buttonId}
                type="button"
                className="
                  w-full flex items-center justify-between gap-3
                  py-2.5 text-left
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--focus-ring)]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[var(--bg-surface)]
                "
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="text-sm md:text-base font-bold text-[color:var(--text-primary-green)]">
                  {faq.question}
                </span>
                <RxChevronDown
                  className={`shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`overflow-hidden transition-[max-height] duration-200 ${
                  isOpen ? "max-h-40 md:max-h-60" : "max-h-0"
                }`}
              >
                <div className="!text-xs md:text-sm !text-[color:var(--text-muted)] pb-3 pe-3">
                  <HtmlConverter html={faq?.answer} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcedureFaq;
