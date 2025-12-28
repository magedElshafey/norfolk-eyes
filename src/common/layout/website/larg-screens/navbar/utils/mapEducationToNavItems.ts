// src/features/navbar/utils/mapEducationToNavItems.ts

import type { NavItem } from "../types/navbar.types";

export type PatientEducationLink = {
  title: string;
  slug: string;
  excerpt?: string;
};

const normalizePath = (path: string): string => {
  const cleaned = path.replace(/\/+/g, "/").replace(/\/$/, "");
  return cleaned === "" ? "/" : cleaned;
};

export const mapEducationToNavItems = (
  list: PatientEducationLink[]
): NavItem[] => {
  return list.map((item) => ({
    name: item.title, // من الـ API
    path: normalizePath(`/patient-education/${item.slug}`),
    kind: "patientEducation",
    shortDescription: item.excerpt,
  }));
};
