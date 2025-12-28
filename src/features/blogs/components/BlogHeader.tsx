import { useTranslation } from "react-i18next";
import CategoryPill from "./CategoryPill";
import type { Articles } from "../types/blog.types";
import MetaItem from "./MetaItem";
import { formatDate } from "@/utils/formatDate";

const BlogHeader: React.FC<{ post: Articles }> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <header
      data-site-header
      className="bg-[var(--bg-page)] border-b border-[var(--border-subtle)]"
    >
      <div className="containerr py-6 md:py-8 lg:py-10">
        <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-between gap-3">
              {post.category && <CategoryPill label={post.category.name} />}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-green)]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="max-w-3xl text-[var(--text-soft)]">
                {post.excerpt}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {post.author?.image && (
                <MetaItem>
                  <img alt={post?.author?.name} src={post?.author?.image} />
                </MetaItem>
              )}
              {post.author?.name && (
                <MetaItem>
                  {t("Blog.by", "By")} {post.author.name}
                </MetaItem>
              )}
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              {post?.author?.affiliation}
            </p>
            {post.published_at && (
              <MetaItem>
                <time dateTime={formatDate(post.published_at)}>
                  {formatDate(post.published_at)}
                </time>
              </MetaItem>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
