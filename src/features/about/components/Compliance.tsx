import { Card } from "./ui";
import { doctorPlaceholder } from "../data/doctor.placeholder";
import { Link } from "react-router-dom";
import BookConsultationButton from "@/common/components/buttons/book-consultation-button/BookConsultationButton";
import MainBtn from "@/common/components/buttons/MainBtn";
const Compliance = () => {
  const doctor = doctorPlaceholder;
  return (
    <div className="bg-[var(--bg-page)]  border-b border-[var(--border-subtle)]">
      <div className="containerr py-10 md:py-16 lg:py-20">
        <Card className="p-6">
          <h3 className="text-base font-semibold text-[var(--primary-green)]">
            Important medical information
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            {doctor.compliance.medicalDisclaimer}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
            <span className="font-semibold">Urgent symptoms:</span>{" "}
            {doctor.compliance.emergency}
          </p>
          {doctor.compliance.complaints ? (
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
              <span className="font-semibold">Concerns/complaints:</span>{" "}
              {doctor.compliance.complaints}
            </p>
          ) : null}

          <div className="mt-6 flex flex-row flex-wrap gap-3">
            <BookConsultationButton />
            <Link to="/privacy">
              <MainBtn theme="secondary" text="Privacy Policy" />
            </Link>
            <Link to="/cookies">
              <MainBtn theme="outline" text="Cookies Policy" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Compliance;
