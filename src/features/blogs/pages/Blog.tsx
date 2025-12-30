import React from "react";
import { useParams } from "react-router-dom";
import ArticleDocPage from "./ArticleDocPage";
import useGetBlogDetails from "../api/useGetBlogDetails.tsx";
const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams();

  // ✅ wrapper hook عشان ArticleDocPage يبقى consistent
  const useQueryHook = () => useGetBlogDetails(slug || "");

  return <ArticleDocPage useQueryHook={useQueryHook} skeletonType="blog" />;
};

export default BlogDetailsPage;
