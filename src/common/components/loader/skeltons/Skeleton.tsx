import { SkeletonType } from "../../../../types/SkeltonType";
import BlogSkelton from "./BlogSkelton";
import HeroSkeleton from "./HeroSkeltion";
import ContactInfoSkeleton from "./ContactInfoSkeleton";
import BlogDetailsSkeleton from "./BlogDetailsSkeleton";
import FooterSkeleton from "./FooterSkeleton";
import TestimonialsCardSkeleton from "./TestimonailSkelton";
import NavbarSkeleton from "./NavbarSkeleton";
import ProcedureSectionSkeleton from "./ProcedureSectionSkeleton";
import ProcedureCardSkeleton from "./ProcedureCardSkeleton";
import WhyChooseSkeleton from "./WhychooseUsSkeleton";
import HomeProceduresSkeleton from "./ProcedureSektionSkeleton";
import FaqSectionSkeleton from "./FaqSectionSkeleton";
import AboutAffiliationsPreviewSectionSkeleton from "./AboutAffiliationsPreviewSectionSkeleton";
import TechnologySectionSkeleton from "./TechnologySectionSkeleton";
import PreparingForVisitSectionSkeleton from "./PreparingForVisitSectionSkeleton";
import PatientEducationSectionSkeleton from "./PatientEducationSectionSkeleton";
import HomeContactSkeleton from "./HomeContactSkeleton";
import SuccessStoriesSliderSkeleton from "./SuccessStoriesSliderSkeleton";
import ProceduresHeroSkeleton from "./ProceduresHeroSkeleton";
import VisionSimulatorSkeleton from "./VisionSimulatorSkeleton";
import ProcedureDetailsSkeletonPage from "./ProcedureDetailsSkeletonPage";
interface SkeltonProps {
  type: SkeletonType;
}
const Skeleton: React.FC<SkeltonProps> = ({ type }) => {
  switch (type) {
    case "hero":
      return <HeroSkeleton />;
    case "navbar":
      return <NavbarSkeleton />;

    case "blog":
      return <BlogSkelton />;

    case "contact":
      return <ContactInfoSkeleton />;

    case "blogDetails":
      return <BlogDetailsSkeleton />;

    case "footer":
      return <FooterSkeleton />;
    case "testimonail":
      return <TestimonialsCardSkeleton />;
    case "procedure-section":
      return <ProcedureSectionSkeleton />;
    case "procedure-card":
      return <ProcedureCardSkeleton />;
    case "stats":
      return <WhyChooseSkeleton />;
    case "procedure-section-home":
      return <HomeProceduresSkeleton />;
    case "faq-section":
      return <FaqSectionSkeleton />;
    case "about-home":
      return <AboutAffiliationsPreviewSectionSkeleton />;
    case "modern-tech":
      return <TechnologySectionSkeleton />;
    case "pre-visit":
      return <PreparingForVisitSectionSkeleton />;
    case "patient-education-home-section":
      return <PatientEducationSectionSkeleton />;
    case "contact-section":
      return <HomeContactSkeleton />;
    case "success-stories":
      return <SuccessStoriesSliderSkeleton />;
    case "procedure-intro":
      return <ProceduresHeroSkeleton />;
    case "vision-simulator":
      return <VisionSimulatorSkeleton />;
    case "procedure-details":
      return <ProcedureDetailsSkeletonPage />;
    default:
      return null;
  }
};

export default Skeleton;
