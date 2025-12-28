import React from "react";
import { useTranslation } from "react-i18next";
import ProcedureHero from "../components/procedure-details/ProcedureHero";
import ProcedureKeyFacts from "../components/procedure-details/ProcedureKeyFacts";
import ProcedureOverview from "../components/procedure-details/ProcedureOverview";
import ProcedureMedia from "../components/procedure-details/ProcedureMedia";
import ProcedureInstructions from "../components/procedure-details/ProcedureInstructions";
import ProcedureFaq from "../components/procedure-details/ProcedureFaq";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
import { Link, useParams } from "react-router-dom";
import MainBtn from "@/common/components/buttons/MainBtn";
import useGetProcedureDetails from "../api/useGetProcedureDetails";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";

const ProcedureDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const queryResult = useGetProcedureDetails(params?.slug || "");

  const pageTitleId = "procedure-title";

  return (
    <>
      {queryResult?.data?.is_active ? (
        <FetchHandler
          queryResult={queryResult}
          skeletonType="procedure-details"
        >
          <main
            className="bg-[var(--bg-page)] text-[color:var(--section-body-color)]"
            aria-labelledby={queryResult?.data?.name || pageTitleId}
          >
            {/* Hero + key facts */}
            {queryResult?.data && (
              <ProcedureHero
                id={queryResult?.data?.name || pageTitleId}
                procedure={queryResult?.data}
              />
            )}

            <section
              className="containerr py-6 md:py-8 lg:py-10 space-y-8"
              aria-label={t("Procedure information")}
            >
              {queryResult?.data &&
                queryResult?.data?.features &&
                queryResult?.data?.features?.length > 0 && (
                  <ProcedureKeyFacts features={queryResult?.data?.features} />
                )}
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
                {queryResult?.data && (
                  <ProcedureOverview procedure={queryResult?.data} />
                )}
                {queryResult?.data && queryResult?.data?.assets && (
                  <ProcedureMedia procedure={queryResult?.data} />
                )}
              </div>
              {queryResult?.data && (
                <ProcedureInstructions procedure={queryResult?.data} />
              )}
              {queryResult?.data && (
                <ProcedureFaq procedure={queryResult?.data} />
              )}
              <div className="flex  justify-between items-center gap-3 md:gap-4 pt-2">
                <div className="flex items-center flex-wrap gap-4">
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
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MainBtn
                    text="read more"
                    theme="outline"
                    showArrow={false}
                    variant="solid"
                  />
                </a>
              </div>
            </section>
          </main>
        </FetchHandler>
      ) : null}
    </>
  );
};

export default ProcedureDetailsPage;
