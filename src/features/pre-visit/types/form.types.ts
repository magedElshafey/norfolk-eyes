
export type ApiGridColumn = "full" | "half";

export type ApiFieldType =
  | "text"
  | "email"
  | "phone"
  | "date"
  | "textarea"
  | "select"
  | "file"
  | "radio"
  | "checkbox" // ✅ multi-select array<string>
  | "true_false"; // ✅ toggle boolean

export type ApiOptionObject = {
  value: string;
  label?: string;
};

export type ApiField = {
  id: number;
  section_id: number;
  name: string;
  label: string;
  placeholder?: string;
  help_text?: string;
  type: ApiFieldType;
  is_required: boolean;
  order: number;
  grid_column: ApiGridColumn;

  options?: string[] | ApiOptionObject[]; // ✅ checkbox/select/radio
  regex_validation?: string | null;
};

export type ApiSection = {
  id: number;
  title: string;
  description?: string;
  order: number;
  is_active: boolean;
  fields: ApiField[];
};

export type PreVisitSchemaResponse = {
  data: ApiSection[];
};

// values dynamic
export type DynamicFormValues = Record<string, unknown>;
