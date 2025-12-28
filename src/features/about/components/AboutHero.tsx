import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import { doctorPlaceholder } from "../data/doctor.placeholder";
import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionDetails from "@/common/components/sections/SectionDetails";
import { Card } from "./ui";
import { useRef } from "react";
const AboutHero = () => {
  const doctor = doctorPlaceholder;
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={sectionRef}
      className="bg-[var(--bg-page)]  border-b border-[var(--border-subtle)]"
    >
      <div className="containerr py-10 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-3">
            <SectionIntro title="UK Ophthalmology • Private & NHS (where applicable)" />
            <SectionTitle text={doctor?.name} />
            <SectionTitle as="h3" text={doctor?.role} />
            {/* <div className="flex gap-2">
              <SectionDescription description={doctor?.role} />
              <SectionDescription
                description={
                  doctor.registration ? `• ${doctor.registration}` : ""
                }
              />
            </div> */}
            <SectionDescription description={doctor?.headline} />
            <ul className="flex items-center gap-2 flex-wrap">
              {doctor?.badges?.map((item, index) => (
                <SectionDetails item={item} key={index} />
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {doctor.intro.map((p, idx) => (
                <Card key={idx} className="p-5">
                  <p className="text-sm">{p}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <div className="w-full h-[360px] md:h-[420px] lg:h-[480px] overflow-hidden">
              {doctor.photoUrl ? (
                <img
                  src={doctor.photoUrl}
                  alt={`${doctor.name} portrait`}
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
  );
};

export default AboutHero;
