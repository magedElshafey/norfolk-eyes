import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionDescription from "@/common/components/sections/SectionDescription";
import { doctorPlaceholder } from "../data/doctor.placeholder";
import { Card, SimpleIcon, IconCircle } from "./ui";
const WhatExp = () => {
  const doctor = doctorPlaceholder;
  return (
    <div className="bg-[var(--bg-page)]  border-b border-[var(--border-subtle)]">
      <div className="containerr py-10 md:py-16 lg:py-20">
        <div className="space-y-4">
          <SectionIntro title="Visit flow" />
          <SectionTitle as="h2" text={doctor.whatToExpect.title} />
          <SectionDescription description="A premium touch: explains the patient journey and sets expectations." />
          <div className="grid gap-6 lg:grid-cols-2">
            {doctor.whatToExpect.steps.map((s, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start gap-3">
                  <IconCircle>
                    <SimpleIcon type={idx % 2 === 0 ? "check" : "star"} />
                  </IconCircle>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--accent)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatExp;
