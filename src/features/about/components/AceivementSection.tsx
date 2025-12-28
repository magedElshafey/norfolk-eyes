import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionDescription from "@/common/components/sections/SectionDescription";
import { doctorPlaceholder } from "../data/doctor.placeholder";
import { Card, Pill } from "./ui";

const AcheivementSection = () => {
  const doctor = doctorPlaceholder;
  return (
    <section className="bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="containerr py-10 md:py-14 lg:py-16">
        <div className="space-y-4">
          <SectionIntro title="Recognition" />
          <SectionTitle text="Awards & achievements" as="h2" />
          <SectionDescription description="Use this for clinic awards, teaching roles, or quality improvement recognition." />

          {doctor.awards.map((a, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-[var(--primary-green)]">
                    {a.title}
                  </p>
                  {a.desc ? (
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      {a.desc}
                    </p>
                  ) : null}
                </div>
                {a.year ? <Pill>{a.year}</Pill> : null}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcheivementSection;
