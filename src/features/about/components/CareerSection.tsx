import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionIntro from "@/common/components/sections/SectionIntro";
import SectionTitle from "@/common/components/sections/SectionTitle";
import { Card, Pill } from "./ui";
import { doctorPlaceholder } from "../data/doctor.placeholder";

const CareerSection = () => {
  const doctor = doctorPlaceholder;
  return (
    <div className="bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="containerr py-10 md:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <SectionIntro title="Career" />
            <SectionTitle text="Experience timeline" as="h2" />
            <SectionDescription description="Clean, professional timeline that patients can scan quickly." />
            <div className="space-y-4">
              {doctor.experienceTimeline.map((t, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-[var(--accent)]">
                      {t.title}
                    </p>
                    <p className="text-sm font-medium text-[var(--text-muted)]">
                      {t.year}
                    </p>
                  </div>
                  {t.place ? (
                    <p className="mt-1 text-sm text-[var(--text-soft)]">
                      {t.place}
                    </p>
                  ) : null}
                  {t.desc ? (
                    <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                      {t.desc}
                    </p>
                  ) : null}
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <SectionIntro title="Credentials" />
            <SectionTitle text={doctor.credentials.title} as="h2" />
            <SectionDescription description="Qualifications, registrations, and professional standards — in a UK-appropriate layout." />

            <Card className="p-6">
              <dl className="grid gap-4">
                {doctor.credentials.items.map((c, idx) => (
                  <div
                    key={idx}
                    className="grid gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4"
                  >
                    <dt className="text-xs font-semibold text-[var(--text-muted)]">
                      {c.label}
                    </dt>
                    <dd className="text-sm font-medium text-[var(--text-soft)]">
                      {c.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSection;
