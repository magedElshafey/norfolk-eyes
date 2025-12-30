import React from "react";
import ArticleDocPage from "@/features/blogs/pages/ArticleDocPage";
import { useGetPrivacy } from "@/features/blogs/api/pages";

const PrivacyPage: React.FC = () => {
  return <ArticleDocPage useQueryHook={useGetPrivacy} skeletonType="blog" />;
};

export default PrivacyPage;
