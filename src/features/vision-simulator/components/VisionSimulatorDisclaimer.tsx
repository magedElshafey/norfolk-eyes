import React from "react";
import { useTranslation } from "react-i18next";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetVisionDisc from "../api/useGetVisionDisc";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionDetails from "@/common/components/sections/SectionDetails";
import SectionEnding from "@/common/components/sections/SectionEnding";
import { IoWarningOutline } from "react-icons/io5";

type Props = { className?: string };

const VisionSimulatorDisclaimer: React.FC<Props> = ({ className = "" }) => {
  const { t } = useTranslation();
  const query = useGetVisionDisc();

  const isActive = !!query?.data?.is_active;

  return (
    <section aria-label={t("VisionSimulatorDisclaimer.title", "Disclaimer")}>
      <FetchHandler queryResult={query} skeletonType="custome">
        {isActive ? (
          <div
            className={[
              "rounded-2xl border border-[color:var(--border-subtle)]",
              "bg-[color:var(--bg-card)] p-4 md:p-5",
              className,
            ].join(" ")}
          >
            <div className="space-y-3">
              <IoWarningOutline size={20} className="text-[var(--accent)]" />
              {query?.data?.section?.heading && (
                <SectionTitle text={query?.data?.section?.heading} as="h3" />
              )}
              {query?.data?.section?.description && (
                <SectionDescription
                  description={query?.data?.section?.description}
                />
              )}

              {!!query?.data?.section?.details?.length && (
                <ul className="flex flex-col gap-1.5 text-xs md:text-sm">
                  {query.data.section.details.map(
                    (item: string, index: number) => (
                      <SectionDetails key={index} item={item} bullets="•" />
                    )
                  )}
                </ul>
              )}
              {query?.data?.section?.ending && (
                <SectionEnding text={query?.data?.section?.ending} />
              )}
            </div>
          </div>
        ) : null}
      </FetchHandler>
    </section>
  );
};

export default React.memo(VisionSimulatorDisclaimer);
