import type { NavItemConfig, NavItem } from "../types/navbar.types";
import { buildNav } from "../utils/buildNav";

export const navConfig: NavItemConfig[] = [
  { name: "Home", isIndex: true },
  { name: "About" },

  {
    name: "Procedures",
    kind: "procedures",
    segment: "procedures",
    // children optional fallback (لو API فاضي)
    children: [{ name: "test" }],
  },

  {
    name: "patient education",
    kind: "patientEducation",
    // children optional fallback
    children: [
      { name: "Eye Conditions & Symptoms" },
      { name: "Treatment Guides" },
    ],
  },

  { name: "vision simulator" },
  { name: "contact us" },
];

export const sidebarConfig: NavItemConfig[] = [
  { name: "Home", isIndex: true },
  { name: "About" },
  { name: "procedures" },
  { name: "patient education" },
  { name: "vision simulator" },
  { name: "contact us" },
];

export const navLinks: NavItem[] = buildNav(navConfig);
export const sidebarLinks: NavItem[] = buildNav(sidebarConfig);
