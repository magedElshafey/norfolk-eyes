import React from "react";

export function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        "rounded-2xl border border-slate-200 bg-[var(--card-bg)] shadow-sm !text-[var(--text-soft)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border-[var(--border-subtle)] bg-[var(--card-bg)] border text-[var(--text-muted)] px-3 py-1 text-sm ">
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-wide text-slate-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white shadow-sm">
      {children}
    </div>
  );
}

export function SimpleIcon({
  type,
}: {
  type: "check" | "star" | "shield" | "book" | "spark";
}) {
  const common = "h-5 w-5 text-slate-700";
  if (type === "check")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (type === "star")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 17.3l-5.4 3 1-6.1-4.4-4.3 6.1-.9L12 3.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (type === "shield")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l8 4v6c0 5-3.4 9.7-8 10-4.6-.3-8-5-8-10V6l8-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (type === "spark")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l1.2 4.6L18 8l-4.8 1.4L12 14l-1.2-4.6L6 8l4.8-1.4L12 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M5 14l.7 2.7L8 17.5l-2.3.8L5 21l-.7-2.7L2 17.5l2.3-.8L5 14z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19.5A2.5 2.5 0 016.5 17H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 2H6a2 2 0 00-2 2v16a2 2 0 002-2h14V2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
