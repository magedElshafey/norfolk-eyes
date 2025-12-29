import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionDescription from "@/common/components/sections/SectionDescription";
import { Card, Pill } from "./ui";
import useGetAwards from "../api/useGetAwards";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
const AcheivementSection = () => {
  const query = useGetAwards();
  return (
    <FetchHandler queryResult={query} skeletonType="about">
      {query?.data?.is_active ? (
        <section className="bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
          <div className="containerr py-10 md:py-14 lg:py-16">
            <div className="space-y-4">
              <SectionIntro title={query?.data?.section?.intro} />
              <SectionTitle text={query?.data?.section?.heading} as="h2" />
              <SectionDescription
                description={query?.data?.section?.description}
              />
              {query?.data?.section?.cards?.length > 0 &&
                query?.data?.section?.cards?.map((a, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-[var(--primary-green)]">
                          {a.title}
                        </p>
                        <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-muted)]">
                          {a.description.map((it, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {a.year ? <Pill>{a.year}</Pill> : null}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      ) : null}
    </FetchHandler>
  );
};

export default AcheivementSection;
