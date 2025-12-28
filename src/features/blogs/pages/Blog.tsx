import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import BlogHeader from "../components/BlogHeader";
import BlogAside from "../components/BlogAside";
import MobileToc from "../components/MobileToc";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetBlogDetails from "../api/useGetBlogDetails";

import { slugify, uniqueId } from "../utils/toc";
import i18n from "@/lib/i18n/i18n";
import { useTranslation } from "react-i18next";

import type { TocItem } from "../types/TocItem";

const BlogDetailsPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { t } = useTranslation();

  const query = useGetBlogDetails(slug || "");
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  const sections = useMemo(() => query.data?.content ?? [], [query.data]);

  const sectionsWithIds = useMemo(() => {
    const used = new Set<string>();
    return sections.map((sec, i) => {
      const base = slugify(sec.heading) || `section-${i + 1}`;
      return { ...sec, _id: uniqueId(base, used) };
    });
  }, [sections]);

  // ✅ TOC items من الداتا مباشرة (مش من DOM)
  const tocItems: TocItem[] = useMemo(() => {
    return sectionsWithIds
      .filter((s) => String(s.heading || "").trim().length > 0)
      .map((s) => ({
        id: s._id,
        text: s.heading,
        level: 2, // لو TocItem عندك فيه level
      }));
  }, [sectionsWithIds]);

  // ✅ Active section observer على الـ h2 IDs
  useEffect(() => {
    if (!tocItems.length) return;

    const ids = tocItems.map((x) => x.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // اختار أقرب heading ظاهر
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        // يخلي التفعيل يشتغل صح مع sticky header
        rootMargin: `-${Math.max(
          0,
          Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--toc-offset"
            )
          ) || 96
        )}px 0px -70% 0px`,
        threshold: [0, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocItems]);
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
                  <article className="prose max-w-none bg-[var(--bg-hero)] border rounded-2xl p-6 col-span-2">
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

export default BlogDetailsPage;
