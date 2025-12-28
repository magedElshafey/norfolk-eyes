import type { ProcedureListType } from "@/features/producers/types/ProcedureList.types";
import type { NavItem } from "../types/navbar.types";
export const mapProceduresToNavItems = (
  procedures: ProcedureListType[]
): NavItem[] => {
  const normalizePath = (path: string): string => {
    const cleaned = path.replace(/\/+/g, "/").replace(/\/$/, "");
    return cleaned === "" ? "/" : cleaned;
  };

  const build = (list: ProcedureListType[]): NavItem[] => {
    return list.map((proc) => {
      const path = normalizePath(`/procedures/${proc.slug}`);

      return {
        name: proc.name,
        path,
        kind: "procedures",
        children: proc.children ? build(proc.children) : undefined,
      };
    });
  };

  return build(procedures);
};
