import React from "react";
import { useTranslation } from "react-i18next";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetVisionDisc from "../api/useGetVisionDisc";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionDetails from "@/common/components/sections/SectionDetails";
import SectionEnding from "@/common/components/sections/SectionEnding";
type Props = {
  className?: string;
};

const VisionSimulatorDisclaimer: React.FC<Props> = ({ className = "" }) => {
  const { t } = useTranslation();
  const query = useGetVisionDisc();
  return (
    <section aria-label={t("VisionSimulatorDisclaimer.title")}>
      <FetchHandler queryResult={query} skeletonType="custome">
        {query?.data?.is_active ? (
          <div
            className={`
        rounded-2xl border border-[color:var(--border-subtle)]
        bg-[color:var(--bg-card)]
        p-4 md:p-5
        ${className}
      `}
          >
            <div className="space-y-3">
              <SectionTitle text={query?.data?.section?.heading} as="h3" />
              <SectionDescription
                description={query?.data?.section?.description}
              />
              <ul className="flex flex-col gap-1.5 text-xs md:text-sm">
                {query?.data?.section.details?.map((item, index) => (
                  <SectionDetails key={index} item={item} bullets="•" />
                ))}
              </ul>
              <SectionEnding text={query?.data?.section?.ending} />
            </div>
          </div>
        ) : null}
      </FetchHandler>
    </section>
  );
};

export default VisionSimulatorDisclaimer;
