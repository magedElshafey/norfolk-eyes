import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionDetails from "@/common/components/sections/SectionDetails";
import { useRef } from "react";
import useGetAboutHero from "../api/useGetAboutHero";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const AboutHero = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const queryResult = useGetAboutHero();
  return (
    <div ref={sectionRef}>
      <FetchHandler queryResult={queryResult} skeletonType="hero">
        {queryResult?.data && queryResult?.data?.is_active ? (
          <div className="bg-[var(--bg-page)]  border-b border-[var(--border-subtle)]">
            <div className="containerr py-10 md:py-16 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-3">
                  <SectionIntro title={queryResult?.data?.section?.intro} />
                  <SectionTitle text={queryResult?.data?.section?.heading} />
                  {queryResult?.data?.section?.job_title && (
                    <SectionTitle
                      as="h3"
                      text={queryResult?.data?.section.job_title}
                    />
                  )}

                  <SectionDescription
                    description={queryResult?.data?.section?.description || ""}
                  />
                  {queryResult?.data?.section?.details?.length > 0 && (
                    <ul className="flex items-center gap-2 flex-wrap">
                      {queryResult?.data?.section.details.map((item, index) => (
                        <SectionDetails item={item} key={index} />
                      ))}
                    </ul>
                  )}
                </div>
                <div className="space-y-7">
                  <div className="w-full h-[360px] md:h-[420px] lg:h-[480px] overflow-hidden">
                    {queryResult.data?.section?.image ? (
                      <img
                        src={queryResult.data?.section?.image}
                        alt={`${queryResult.data?.section?.heading} portrait`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </FetchHandler>
    </div>
  );
};

export default AboutHero;
