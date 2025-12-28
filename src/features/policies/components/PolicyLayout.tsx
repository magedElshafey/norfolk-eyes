import React from "react";

type TocItem = { id: string; label: string };

type PolicyLayoutProps = {
  title: string;
  updatedAt: string;
  intro?: string;
  toc: TocItem[];
  children: React.ReactNode;
};

const PolicyLayout: React.FC<PolicyLayoutProps> = ({
  title,
  updatedAt,
  intro,
  toc,
  children,
}) => {
  return (
    <main className="section-shell" id="top">
      <div className="containerr">
        <header className="mb-6 md:mb-8">
          <div className="rounded-card border border-border-subtle bg-bg-surface shadow-soft p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Legal
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-text-main">
              {title}
            </h1>
            <p className="mt-2 text-xs text-text-muted">
              Last updated: <span className="font-medium">{updatedAt}</span>
            </p>
            {intro && (
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] items-start">
          <article className="space-y-4">{children}</article>

          <aside className="lg:sticky lg:top-24">
            <nav
              aria-label="On this page"
              className="rounded-card border border-border-subtle bg-bg-surface shadow-soft p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
                On this page
              </p>
              <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="
                        text-text-muted hover:text-text-main
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-primary focus-visible:ring-offset-2
                        focus-visible:ring-offset-bg-surface
                      "
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#top"
                className="
                  mt-4 inline-flex items-center gap-2 text-xs
                  rounded-pill border border-border-subtle bg-bg-page
                  px-3 py-1.5 text-text-muted hover:text-text-main
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-primary focus-visible:ring-offset-2
                  focus-visible:ring-offset-bg-surface
                "
              >
                <span aria-hidden="true">↑</span> Back to top
              </a>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PolicyLayout;
