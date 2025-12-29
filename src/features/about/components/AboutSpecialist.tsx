import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import { Card, IconCircle, SimpleIcon } from "./ui";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetServices from "../api/useGetServices";
const AboutSpecialist = () => {
  const query = useGetServices();
  return (
    <FetchHandler queryResult={query} skeletonType="about">
      {query?.data?.is_active ? (
        <section
          className="bg-[var(--bg-subtle)]
        border-y border-[var(--border-subtle)]"
        >
          <div className="containerr py-10 md:py-14 lg:py-16">
            <div className="space-y-4">
              <SectionIntro title={query?.data?.section?.intro} />
              <SectionTitle text={query?.data?.section?.heading} />
              <SectionDescription
                description={query?.data?.section?.description}
              />
              {query?.data?.section?.cards?.length > 0 && (
                <div className="grid gap-6 lg:grid-cols-2">
                  {query.data.section.cards.map((group, idx) => (
                    <Card key={idx} className="p-6">
                      <div className="flex items-start gap-3">
                        <IconCircle>
                          <SimpleIcon type={idx % 2 === 0 ? "check" : "star"} />
                        </IconCircle>
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--accent)]">
                            {group.title}
                          </h3>
                          <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-muted)]">
                            {group.description.map((it, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </FetchHandler>
  );
};

export default AboutSpecialist;
