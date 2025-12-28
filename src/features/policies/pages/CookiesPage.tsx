import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import BlogHeader from "@/features/blogs/components/BlogHeader";
import BlogAside from "@/features/blogs/components/BlogAside";
import MobileToc from "@/features/blogs/components/MobileToc";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import { useTableOfContents } from "@/features/blogs/hooks/useTableOfContents";
import { slugify, uniqueId } from "@/features/blogs/utils/toc";
import i18n from "@/lib/i18n/i18n";
import { useTranslation } from "react-i18next";
import useGetCookies from "../api/useGetCookies";
const CookiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const query = useGetCookies();
  const [articleEl, setArticleEl] = useState<HTMLElement | null>(null);

  const sections = useMemo(() => query.data?.content ?? [], [query.data]);

  const sectionsWithIds = useMemo(() => {
    const used = new Set<string>();
    return sections.map((sec, i) => {
      const base = slugify(sec.heading) || `section-${i + 1}`;
      return { ...sec, _id: uniqueId(base, used) };
    });
  }, [sections]);

  const { items: tocItems, activeId } = useTableOfContents(
    articleEl,
    sectionsWithIds
  );

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const h = header?.getBoundingClientRect().height ?? 96;
    document.documentElement.style.setProperty("--toc-offset", `${h}px`);
  }, [query.data]);
  return (
    <>
      {query?.data?.is_active ? (
        <FetchHandler queryResult={query} skeletonType="blog">
          {query?.data && (
            <div>
              <BlogHeader post={query.data} />
              <main className="containerr py-10">
                <button onClick={() => navigate(-1)} className="mb-6 text-xs">
                  {i18n.language === "ar" ? "→" : "←"} {t("Back")}
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
                  <article
                    ref={setArticleEl}
                    className="prose max-w-none bg-[var(--bg-hero)] border rounded-2xl p-6 col-span-2"
                  >
                    {sectionsWithIds.map((sec) => (
                      <section
                        key={sec._id}
                        className="scroll-mt-[calc(var(--toc-offset)+16px)]"
                      >
                        <h2 id={sec._id} className="text-[var(--accent)]">
                          {sec.heading}
                        </h2>

                        <div
                          className="text-[var(--text-soft)]"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(sec.content),
                          }}
                        />
                      </section>
                    ))}
                  </article>

                  {/* ✅ Sticky aside uses top = navbar height */}
                  <aside className="hidden lg:block relative">
                    <div className="sticky top-48 z-20">
                      <BlogAside tocItems={tocItems} activeId={activeId} />
                    </div>
                  </aside>
                </div>
              </main>
              <MobileToc tocItems={tocItems} activeId={activeId} />
            </div>
          )}
        </FetchHandler>
      ) : null}
    </>
  );
};

export default CookiesPage;
/**
 *   <FetchHandler queryResult={query} skeletonType="blog">
      {query.data && (
        <div>
          <BlogHeader post={query.data} />

          <main className="containerr py-10">
            <button onClick={() => navigate(-1)} className="mb-6 text-xs">
              {i18n.language === "ar" ? "→" : "←"} {t("Back")}
            </button>

            <article
              ref={setArticleEl}
              className="prose max-w-none bg-[var(--bg-hero)] border rounded-2xl p-6"
            >
              {sectionsWithIds.map((sec) => (
                <section
                  key={sec._id}
                  id={sec._id}
                  className="scroll-mt-[calc(var(--toc-offset)+16px)]"
                >
                  <h2 className="text-[var(--accent)]" id={sec._id}>
                    {sec.heading}
                  </h2>
                  <div
                    className="text-[var(--text-soft)]"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(sec.content),
                    }}
                  />
                </section>
              ))}
            </article>

            <aside className="hidden lg:block fixed top-48 right-20">
              <BlogAside tocItems={tocItems} activeId={activeId} />
            </aside>
          </main>

          <MobileToc tocItems={tocItems} activeId={activeId} />
        </div>
      )}
    </FetchHandler>
 */
