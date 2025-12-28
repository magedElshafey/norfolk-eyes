import React from "react";
import { useTranslation } from "react-i18next";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
import MainBtn from "@/common/components/buttons/MainBtn";
import SectionTitle from "@/common/components/sections/SectionTitle";

import { Link } from "react-router-dom";
import { Procedure } from "../../types/ProcedureList.types";
interface Props {
  procedure: Procedure;
  id: string;
}

const ProcedureHero: React.FC<Props> = ({ procedure, id }) => {
  const { t } = useTranslation();
  return (
    <section
      className="
        bg-[var(--bg-hero)]
        border-b border-[var(--border-subtle)]
      "
      aria-label={t("Procedure.heroAria", "Procedure overview")}
    >
      <div className="containerr py-7 md:py-9 lg:py-10 grid gap-6 md:gap-8 lg:gap-10 xl:gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-center">
        {/* Text column */}
        <div className="space-y-3">
          <SectionTitle as="h1" id={id} text={procedure.name} />
          <div
            className="prose max-w-[var(--section-max-width)] text-sm md:text-base text-[color:var(--text-soft)]"
            dangerouslySetInnerHTML={{ __html: procedure.description }}
          />
          <div
            className="text-xs md:text-sm text-[color:var(--section-muted-color)] prose"
            dangerouslySetInnerHTML={{ __html: procedure.sub_description }}
          />

          <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2">
            <BookConsultationButton />
            <Link to="/contact-us">
              <MainBtn
                theme="secondary"
                variant="pill"
                text="Navbar.contact us"
                showArrow={true}
              />
            </Link>
          </div>
        </div>

        {/* Visual column */}
        <div className="relative">
          <div
            className="
              relative rounded-3xl overflow-hidden
              border border-[var(--card-border)]
              bg-[var(--card-bg)]
              shadow-lg
            "
          >
            <img
              src={
                procedure.assets?.hero_image ||
                "/images/procedures/procedure-placeholder.webp"
              }
              alt={procedure.name}
              className="w-full h-full max-h-[340px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* floating caption */}
          {/* <div
            aria-hidden="true"
            className="
              hidden md:block
              absolute -bottom-4 right-3
              rounded-2xl bg-[var(--bg-surface)]
              border border-[var(--border-subtle)]
              shadow-md px-3 py-2 text-[11px] max-w-[220px]
            "
          >
            <p className="font-semibold text-[color:var(--section-title-color)] mb-0.5">
              {t(
                "Procedure.heroFloatTitle",
                "Focused on safe, personalised care"
              )}
            </p>
            <p className="text-[10px] text-[color:var(--section-muted-color)]">
              {t(
                "Procedure.heroFloatBody",
                "We will confirm suitability, lens choice and aftercare at your consultation."
              )}
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProcedureHero;
