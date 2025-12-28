import React from "react";

type PolicySectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

const PolicySection: React.FC<PolicySectionProps> = ({
  id,
  title,
  children,
}) => {
  return (
    <section
      id={id}
      className="rounded-card border border-border-subtle bg-bg-surface shadow-soft p-5 md:p-6 scroll-mt-24"
      aria-labelledby={`${id}-title`}
    >
      <h2
        id={`${id}-title`}
        className="text-lg md:text-xl font-semibold text-text-main"
      >
        {title}
      </h2>
      <div className="mt-3 text-sm text-text-muted leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
};

export default PolicySection;
