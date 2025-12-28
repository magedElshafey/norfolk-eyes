import { BaseProcedure } from "@/features/producers/types/ProcedureList.types";

export interface ProcedureSectionType {
  section: {
    section_type: string;
    intro: string;
    heading: string;
    description: string;
    ending: string | null;
    images: null;
  };
  procedures: BaseProcedure[];
  is_active: boolean
}
