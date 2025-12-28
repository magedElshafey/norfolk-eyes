// src/config/utils/buildNav.ts
import { createSlug } from "@/utils/createSlug";
import {
  type NavItem,
  type NavItemConfig,
  type NavItemKind,
} from "../types/navbar.types";

type BuildCtx = { sectionKind?: NavItemKind };

const PROCEDURES_BASE = "/procedures";

const lastSegment = (value: string) => {
  // يشيل أي leading /
  const clean = value.replace(/^\/+/, "");
  // لو جاي "procedures/xxx" شيلها
  const noBase = clean.startsWith("procedures/")
    ? clean.replace(/^procedures\/+/, "")
    : clean;
  // خد آخر جزء بعد /
  const parts = noBase.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
};

export const buildNav = (
  config: NavItemConfig[],
  parentPath = "",
  ctx: BuildCtx = {}
): NavItem[] => {
  const inferredInProcedures =
    parentPath === PROCEDURES_BASE ||
    parentPath.startsWith(`${PROCEDURES_BASE}/`);

  return config.map((item) => {
    const isProceduresRoot = item.kind === "procedures";

    const inProceduresSection =
      ctx.sectionKind === "procedures" ||
      inferredInProcedures ||
      isProceduresRoot;

    // slug خام (ممكن يحتوي /)
    const raw = item.segment ?? createSlug(item.name);

    // ✅ داخل procedures: لازم يبقى slug واحد فقط
    const slug = inProceduresSection ? lastSegment(raw) : raw;

    let path: string;

    if (isProceduresRoot) {
      path = PROCEDURES_BASE;
    } else if (inProceduresSection) {
      path = `${PROCEDURES_BASE}/${slug}`;
    } else if (item.isIndex) {
      path = parentPath || "/";
    } else if (item.segment && item.segment.startsWith("/")) {
      path = item.segment;
    } else {
      if (!parentPath || parentPath === "/") path = `/${slug}`;
      else path = `${parentPath}/${slug}`;
    }

    const nextCtx: BuildCtx = inProceduresSection
      ? { sectionKind: "procedures" }
      : ctx;

    return {
      name: item.name,
      path,
      shortDescription: item.shortDescription,
      kind: item.kind ?? "default",
      children: item.children
        ? buildNav(item.children, path, nextCtx)
        : undefined,
    };
  });
};
