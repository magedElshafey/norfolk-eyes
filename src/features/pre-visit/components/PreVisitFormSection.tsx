import SectionDescription from "@/common/components/sections/SectionDescription";
import SectionTitle from "@/common/components/sections/SectionTitle";
import { FC, ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  id?: string;
  children: ReactNode;
};

const PreVisitFormSection: FC<Props> = ({
  title,
  description,
  id,
  children,
}) => {
  return (
    <section
      aria-labelledby={id}
      className="bg-[var(--card-bg)] border border-softGray/60 p-4 md:p-6 lg:p-7 shadow-sm space-y-3"
    >
      <header>
        <SectionTitle as="h2" text={title} id={id} />
        {description && <SectionDescription description={description} />}
      </header>
      <div className="space-y-3">{children}</div>
    </section>
  );
};

export default PreVisitFormSection;
