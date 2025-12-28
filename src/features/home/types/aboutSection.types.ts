export interface AboutSectionType {
  section: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
    details: string[];
    images: string | null;
  };
  affiliations: Affiliation[];
  is_active: boolean
}

export interface Affiliation {
  id: number;
  logo: string | null;
  website_url: string;
  role: string;
  description: string;
  organization_name: string;
}
