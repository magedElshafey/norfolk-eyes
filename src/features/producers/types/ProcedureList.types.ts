export interface ProcedureSearch {
  id: number;
  name: string;
  slug: string;
  type: string;
}
export interface FeatureType {
  title: string;
  description: string;
}
export interface ProceduresCategory {
  id: number;
  name: string;
  slug: string;
}
export interface BaseProcedure {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  description: string;
  tags: string[];
  is_active: boolean

}

export interface Procedure extends BaseProcedure {
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  is_featured: false;
  parent: { id: number; name: string; slug: string } | null;
  parent_id: number | null;
  category: ProceduresCategory;
  children?: ProcedureListType[];
  features?: FeatureType[];
  assets: {
    images?: {
      url: string;
      thumbnail_url: string;
    }[];
    video?: {
      url: string;
      thumbnail_url: string;
    };
    hero_image: string;
  };
  what_involves: string;
  potential_benefits: string;
  risks_considerations: string;
  preparing_instructions: string;
  recovery_instructions: string;
  additional_notes: string;
  sub_description: string;
  faqs: {
    id: number;
    question: string;
    answer: string;
  }[];

}

export interface ProcedureListType extends BaseProcedure {
  children?: ProcedureListType[];
  is_active: boolean

}
