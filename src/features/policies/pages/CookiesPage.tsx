import React from "react";
import ArticleDocPage from "@/features/blogs/pages/ArticleDocPage";
import { useGetCookies } from "@/features/blogs/api/pages";

const CookiesPage: React.FC = () => {
  return <ArticleDocPage useQueryHook={useGetCookies} skeletonType="blog" />;
};

export default CookiesPage;
