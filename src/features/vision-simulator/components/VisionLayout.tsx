import React from "react";

type VisionLayoutProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  bottom?: React.ReactNode;
};

const VisionLayout: React.FC<VisionLayoutProps> = ({ left, right, bottom }) => {
  return (
    <section
      className="
        bg-[var(--bg-page)]
        text-[var(--text-main)]
        py-10 md:py-12
      "
      id="vision-simulator"
    >
      <div className="containerr flex flex-col gap-8 ">
        <div className="">{left}</div>
        <div className="space-y-4">{right}</div>
      </div>

      {bottom && (
        <div className="containerr mt-10 border-t border-[var(--vision-panel-border)] pt-6">
          {bottom}
        </div>
      )}
    </section>
  );
};

export default VisionLayout;
