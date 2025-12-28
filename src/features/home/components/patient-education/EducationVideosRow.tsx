import React from "react";
import { useTranslation } from "react-i18next";
import EducationVideoCard from "./EducationVideoCard";
import { Videos } from "../../types/patientEducation.types";
interface EducationVideosRowProps {
  videos: Videos[];
  isHome?: boolean;
}
const EducationVideosRow: React.FC<EducationVideosRowProps> = ({
  videos,
  isHome = true,
}) => {
  const { t } = useTranslation();

  if (!videos.length) return null;

  return (
    <section
      aria-labelledby="education-videos-heading"
      className="space-y-3 md:space-y-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3
            id="education-videos-heading"
            className="text-sm md:text-base font-semibold text-[color:var(--section-title-color)]"
          >
            {t("Educational videos & animations")}
          </h3>
          <p className="text-[11px] md:text-xs text-[color:var(--section-muted-color)]">
            {t(
              "Short explainer videos to help you understand cataract and lens surgery."
            )}
          </p>
        </div>
      </div>

      <div
        className="
          grid gap-3 md:gap-4
          grid-cols-1
          lg:grid-cols-2
        "
      >
        {isHome
          ? videos
              ?.slice(0, 4)
              ?.map((video, index) => (
                <EducationVideoCard key={index} video={video} index={index} />
              ))
          : videos.map((video, idx) => (
              <EducationVideoCard key={idx} video={video} index={idx} />
            ))}
      </div>
    </section>
  );
};

export default React.memo(EducationVideosRow);
