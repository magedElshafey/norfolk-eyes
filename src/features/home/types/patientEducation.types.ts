import { Articles } from "@/features/blogs/types/blog.types";

export interface PatientEducationType {
  section: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
    videos: [];
  };
  articles: Articles[];
  is_active: boolean
}

export interface Videos {
  title: string;
  description: string;
  url: string;
}
