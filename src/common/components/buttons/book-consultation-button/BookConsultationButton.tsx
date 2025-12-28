import React from "react";
import MainBtn from "../MainBtn";

type BookConsultationButtonProps = {
  href?: string;
  label?: string;
  openInNewTab?: boolean;
  className?: string;
};

const BookConsultationButton: React.FC<BookConsultationButtonProps> = ({
  href = "https://www.newmedica.co.uk/book/",
  openInNewTab = true,
  className,
}) => {
  const target = openInNewTab ? "_blank" : "_self";
  const rel = openInNewTab ? "noopener noreferrer" : undefined;

  return (
    <a href={href} target={target} rel={rel} className={className}>
      <MainBtn theme="main" variant="pill" text="Global.Book a consultation" />
    </a>
  );
};

export default BookConsultationButton;
