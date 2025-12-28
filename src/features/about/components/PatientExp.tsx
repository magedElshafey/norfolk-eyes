import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionDescription from "@/common/components/sections/SectionDescription";
import { doctorPlaceholder } from "../data/doctor.placeholder";
import { Card, SimpleIcon, IconCircle } from "./ui";
const PatientExp = () => {
  const doctor = doctorPlaceholder;
  return (
    <section
      className="bg-[var(--bg-subtle)]
        border-y border-[var(--border-subtle)]"
    >
      <div className="containerr py-10 md:py-16 lg:py-20">
        <div className="space-y-4">
          <SectionIntro title="Patient experience" />
          <SectionTitle as="h2" text={doctor.carePhilosophy.title} />
          <SectionDescription description="How the doctor works, what patients should expect, and why it feels premium." />
          <div className="grid gap-6 lg:grid-cols-2">
            {doctor.carePhilosophy.points.map((p, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start gap-3">
                  <IconCircle>
                    <SimpleIcon type={idx % 2 === 0 ? "shield" : "check"} />
                  </IconCircle>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--accent)]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientExp;
