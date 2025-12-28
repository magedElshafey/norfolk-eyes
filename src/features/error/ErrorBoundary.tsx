import React from "react";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionTitle from "@/common/components/sections/SectionTitle";
import SectionDescription from "@/common/components/sections/SectionDescription";
import MainBtn from "@/common/components/buttons/MainBtn";

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/");
  };

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <SectionTitle as="h2" text={`${error.status} - ${error.statusText}`} />
        <SectionDescription
          description={error.data?.message || t("Something went wrong.")}
        />

        <button
          onClick={handleRetry}
          className="bg-orangeColor text-white px-4 py-2 rounded"
        >
          {t("Retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <SectionTitle text={t("Unexpected Error")} />
      <SectionDescription
        description={
          (error as Error)?.message || t("An unknown error occurred.")
        }
      />
      <MainBtn
        theme="secondary"
        variant="solid"
        text="Retry"
        onClick={handleRetry}
      />
    </div>
  );
};

export default ErrorBoundary;
