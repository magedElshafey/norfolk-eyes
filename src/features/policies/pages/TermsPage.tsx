import React from "react";
import ArticleDocPage from "@/features/blogs/pages/ArticleDocPage";
import { useGetTerms } from "@/features/blogs/api/pages";

const TermsPage: React.FC = () => {
  return <ArticleDocPage useQueryHook={useGetTerms} skeletonType="blog" />;
};

export default TermsPage;
