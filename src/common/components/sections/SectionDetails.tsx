interface SectionDetailsProps {
  childrenClassName?: string;
  bullets?: string;
  item: string;
}

const SectionDetails: React.FC<SectionDetailsProps> = ({
  childrenClassName = "",
  bullets = "•",
  item,
}) => {
  return (
    <li
      className={`
        flex items-start gap-2
        text-xs md:text-sm
        text-[color:var(--text-muted)]
        ${childrenClassName}
      `}
    >
      <span
        className="
          text-[color:var(--text-muted)]
        "
        aria-hidden="true"
      >
        {bullets}
      </span>
      <span>{item}</span>
    </li>
  );
};

export default SectionDetails;
