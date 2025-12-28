interface HtmlConverterProps {
  html: string;
}

const HtmlConverter: React.FC<HtmlConverterProps> = ({ html }) => {
  return (
    <div
      className="prose max-w-full  !text-xs md:!text-sm !text-[var(--text-muted)]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlConverter;
