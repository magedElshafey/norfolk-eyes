import { FC } from "react";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionEnding from "@/common/components/sections/SectionEnding";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetProcedureHero from "../../api/useGetProcedureHero";
const ProceduresHero: FC = () => {
  const queryResult = useGetProcedureHero();
  return (
    <FetchHandler queryResult={queryResult} skeletonType="procedure-intro">
      <div aria-labelledby="procedures-hero-heading">
        {queryResult?.data?.is_active ? (
          <section className=" bg-[var(--mm-bg)] border-b border-softGray/50">
            <div className="containerr py-8 md:py-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
                {/* Text */}
                <div className="space-y-3 md:space-y-4">
                  <SectionIntro
                    title={queryResult?.data?.section.intro || ""}
                  />
                  <SectionTitle
                    text={queryResult?.data?.section.heading || ""}
                    as="h2"
                  />
                  <SectionDescription
                    description={queryResult?.data?.section.description || ""}
                  />
                  <SectionEnding
                    text={queryResult?.data?.section.ending || ""}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </FetchHandler>
  );
};

export default ProceduresHero;
