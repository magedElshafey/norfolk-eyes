export type NavItemKind = "default" | "procedures" | "patientEducation";

export type NavItemConfig = {
  name: string;
  segment?: string;
  isIndex?: boolean;
  shortDescription?: string;
  kind?: NavItemKind;
  children?: NavItemConfig[];
};

export type NavItem = {
  name: string;
  path: string;
  shortDescription?: string;
  kind?: NavItemKind;
  children?: NavItem[];
};
