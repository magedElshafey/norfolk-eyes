import React from "react";
import ArticleDocPage from "@/features/blogs/pages/ArticleDocPage";
import { useGetMedical } from "@/features/blogs/api/pages";

const MedicalPage: React.FC = () => {
  return <ArticleDocPage useQueryHook={useGetMedical} skeletonType="blog" />;
};

export default MedicalPage;
