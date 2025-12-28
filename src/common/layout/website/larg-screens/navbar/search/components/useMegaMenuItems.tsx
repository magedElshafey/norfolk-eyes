import { useMemo } from "react";
import type { NavItem } from "../../types/navbar.types";

import useGetAllProcedures from "@/features/producers/api/useGetAllProcedures";
import useGetSimpleBlogs from "@/features/blogs/api/useGetSimpleBlogs";

import { mapProceduresToNavItems } from "../../utils/mapProceduresToNavItems";
import { mapEducationToNavItems } from "../../utils/mapEducationToNavItems";

type Result = {
  items: NavItem[];
  isLoading: boolean;
  isError: boolean;
};

export function useMegaMenuItems(parent: NavItem): Result {
  const kind = parent.kind ?? "default";

  const isProceduresMenu = kind === "procedures";
  const isEducationMenu = kind === "patientEducation";

  const proceduresQuery = useGetAllProcedures({ enabled: isProceduresMenu });
  const educationQuery = useGetSimpleBlogs({
    enabled: isEducationMenu,
  });

  return useMemo(() => {
    if (isProceduresMenu) {
      const list = proceduresQuery.data ?? [];
      return {
        items: list.length
          ? mapProceduresToNavItems(list)
          : parent.children ?? [],
        isLoading: proceduresQuery.isLoading && !proceduresQuery.data,
        isError: !!proceduresQuery.isError,
      };
    }

    if (isEducationMenu) {
      const list = educationQuery.data ?? [];
      return {
        items: list.length
          ? mapEducationToNavItems(list)
          : parent.children ?? [],
        isLoading: educationQuery.isLoading && !educationQuery.data,
        isError: !!educationQuery.isError,
      };
    }

    return {
      items: parent.children ?? [],
      isLoading: false,
      isError: false,
    };
  }, [
    isProceduresMenu,
    isEducationMenu,
    proceduresQuery.data,
    proceduresQuery.isLoading,
    proceduresQuery.isError,
    educationQuery.data,
    educationQuery.isLoading,
    educationQuery.isError,
    parent.path,
    parent.children,
  ]);
}
