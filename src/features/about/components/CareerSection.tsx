import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import { Card } from "./ui";
// import { doctorPlaceholder } from "../data/doctor.placeholder";
import useGetExperience from "../api/useGetExperience";
import useGetQualifications from "../api/useGetQualifications";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import { normalizeToArray } from "@/utils/normalizeTags";
const CareerSection = () => {
  // const doctor = doctorPlaceholder;
  const exp = useGetExperience();
  const qual = useGetQualifications();
  return (
    <div className="bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="containerr py-10 md:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <FetchHandler queryResult={exp} skeletonType="custome">
            {exp?.data && exp?.data?.is_active ? (
              <div className="space-y-4">
                <SectionIntro title={exp?.data?.section?.intro} />
                <SectionTitle text={exp?.data?.section?.heading} as="h2" />
                <SectionDescription
                  description={exp?.data?.section?.description}
                />
                {exp?.data?.section?.exp_timeline?.length > 0 && (
                  <div className="space-y-4">
                    {exp?.data?.section?.exp_timeline.map((t, idx) => {
                      const desc = normalizeToArray(t?.description);
                      return (
                        <Card key={idx} className="p-6">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm font-semibold text-[var(--accent)]">
                              {t.title}
                            </p>
                            <p className="text-sm font-medium text-[var(--text-muted)]">
                              {t.duration?.from} - {t?.duration?.to}
                            </p>
                          </div>
                          {t.job_discription ? (
                            <p className="mt-1 text-sm text-[var(--text-soft)]">
                              {t.job_discription}
                            </p>
                          ) : null}
                          {desc.length > 0
                            ? desc.map((item, index) => (
                                <p
                                  key={index}
                                  className="mt-3 text-sm leading-6 text-[var(--text-soft)]"
                                >
                                  {item}
                                </p>
                              ))
                            : null}
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : null}
          </FetchHandler>
          <FetchHandler queryResult={exp} skeletonType="custome">
            {qual?.data && qual?.data?.is_active ? (
              <div className="space-y-4">
                <SectionIntro title={qual?.data?.section?.intro} />
                <SectionTitle text={qual?.data?.section?.heading} as="h2" />
                <SectionDescription
                  description={qual?.data?.section?.description}
                />
                {qual?.data?.section?.list?.length > 0 && (
                  <Card className="p-6">
                    <dl className="grid gap-4">
                      {qual?.data?.section?.list.map((c, idx) => {
                        const desc = normalizeToArray(c.description);
                        return (
                          <div
                            key={idx}
                            className="grid gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4"
                          >
                            <dt className="text-xs font-semibold text-[var(--text-muted)]">
                              {c.title}
                            </dt>
                            {desc?.map((item, index) => (
                              <dd
                                key={index}
                                className="text-sm font-medium text-[var(--text-soft)]"
                              >
                                {item}
                              </dd>
                            ))}
                          </div>
                        );
                      })}
                    </dl>

                    {/* <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4">
                        <p className="text-xs font-semibold text-[var(--text-muted)]">
                          Memberships
                        </p>
                        <ul className="mt-2 space-y-2 text-sm text-[var(--text-soft)]">
                          {doctor.memberships.map((m, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--text-soft)]" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4">
                        <p className="text-xs font-semibold text-[var(--text-soft)]">
                          Languages
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {doctor.languages.map((l, i) => (
                            <Pill key={i}>{l}</Pill>
                          ))}
                        </div>
                      </div>
                    </div> */}
                  </Card>
                )}
              </div>
            ) : null}
          </FetchHandler>
        </div>
      </div>
    </div>
  );
};

export default CareerSection;
