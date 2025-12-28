export interface SectionType {
  section: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
    image: string | null;
    details: string[];
    image_title?: string;
    image_description?: string;
  };
  is_active: boolean
}
