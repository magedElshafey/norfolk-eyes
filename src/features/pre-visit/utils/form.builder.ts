import type {
  ApiField,
  ApiSection,
  ApiOptionObject,
  DynamicFormValues,
} from "../types/form.types";

/** ===== Other Select ===== */
export const OTHER_VALUE = "__other__";

/** 👇 المطلوب: field_name_text */
export const OTHER_TEXT_SUFFIX = "_text";

export function otherTextFieldName(baseName: string) {
  return `${baseName}${OTHER_TEXT_SUFFIX}`; // ex: occupation_text
}

/** options normalize: supports string[] or [{value,label}] */
export function normalizeOptionValues(raw: unknown): string[] {
  if (!raw || !Array.isArray(raw)) return [];
  if (raw.length && typeof raw[0] === "string") return raw as string[];
  return (raw as ApiOptionObject[])
    .map((x) => x?.value)
    .filter((v): v is string => Boolean(v));
}

export function toSelectOptions(values: string[]) {
  return values.map((name, idx) => ({ id: idx + 1, name }));
}

export function selectedIdFromStoredValue(
  storedValue: unknown,
  opts: { id: number; name: string }[]
) {
  if (typeof storedValue !== "string") return null;
  return opts.find((o) => o.name === storedValue)?.id ?? null;
}

export function storedValueFromSelectedId(
  id: number | null,
  opts: { id: number; name: string }[]
) {
  const chosen = opts.find((o) => o.id === id);
  return chosen?.name ?? "";
}

/** sections sorting */
export function sortActiveSections(data?: ApiSection[]) {
  return (data ?? [])
    .filter((s) => s.is_active)
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      ...s,
      fields: (s.fields ?? []).slice().sort((a, b) => a.order - b.order),
    }));
}

/** default values */
export function buildDefaultValues(sections: ApiSection[]) {
  const dv: DynamicFormValues = {};

  for (const section of sections) {
    for (const f of section.fields) {
      switch (f.type) {
        case "file":
          dv[f.name] = [];
          break;

        case "checkbox":
          dv[f.name] = [];
          break;

        case "true_false":
          dv[f.name] = false;
          break;

        case "select":
          dv[f.name] = "";
          // ✅ textarea key المطلوب
          dv[otherTextFieldName(f.name)] = "";
          break;

        case "radio":
        case "text":
        case "email":
        case "phone":
        case "date":
        case "textarea":
        default:
          dv[f.name] = "";
          break;
      }
    }
  }

  return dv;
}

/** UX helper: scroll to first invalid input */
export function scrollToFirstError(errors: any) {
  const firstKey = errors ? Object.keys(errors)[0] : null;
  if (!firstKey) return;

  const el =
    document.querySelector(`[name="${firstKey}"]`) ||
    document.getElementById(firstKey);

  if (!el || !("scrollIntoView" in el)) return;

  (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => (el as HTMLElement)?.focus?.(), 250);
}

/** Validation rules */
function safeRegex(pattern?: string | null): RegExp | null {
  if (!pattern) return null;
  try {
    return new RegExp(pattern);
  } catch {
    return null;
  }
}

export function buildRules(field: ApiField) {
  const rules: Record<string, any> = {};

  if (field.is_required) {
    if (field.type === "checkbox") {
      rules.validate = (v: unknown) =>
        (Array.isArray(v) && v.length > 0) ||
        "Please choose at least one option";
    } else if (field.type === "true_false") {
      rules.validate = (v: unknown) => v === true || "This field is required";
    } else if (field.type === "file") {
      rules.validate = (v: unknown) => {
        const files = Array.isArray(v) ? (v as File[]) : [];
        return files.length > 0 || "Please attach a file";
      };
    } else if (field.type === "radio") {
      rules.validate = (v: unknown) =>
        (typeof v === "string" && v.trim().length > 0) ||
        "Please choose an option";
    } else {
      rules.required = "This field is required";
    }
  }

  const rx = safeRegex(field.regex_validation);
  if (rx && field.type !== "file" && field.type !== "checkbox") {
    rules.pattern = { value: rx, message: "Invalid format" };
  }

  if (!rx) {
    if (field.type === "email") {
      rules.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email",
      };
    }

    if (field.type === "phone") {
      rules.pattern = {
        value: /^[+()\-.\s0-9]{7,}$/,
        message: "Please enter a valid phone number",
      };
    }

    if (field.type === "date") {
      rules.pattern = {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: "Date must be YYYY-MM-DD",
      };
    }
  }

  return rules;
}

/** ✅ helper: detect our "text" keys */
export function isOtherTextKey(key: string) {
  return key.endsWith(OTHER_TEXT_SUFFIX); // endsWith("_text")
}

/** ✅ helper: object empty check */
export function isEmptyObject(x: unknown) {
  return (
    x == null ||
    (typeof x === "object" &&
      !Array.isArray(x) &&
      Object.keys(x as Record<string, unknown>).length === 0)
  );
}

/** API payload builder */
export const BASE_FIELDS = ["full_name", "email", "phone", "date_of_birth"] as const;
const BASE_SET = new Set<string>(BASE_FIELDS);

// export type BuiltApiPayload = {
//   full_name: string;
//   email: string;
//   phone: string;
//   date_of_birth: string;

//   // ✅ بقت optional عشان لو فاضية منبعتهاش
//   form_data?: Record<string, unknown>;
// };

// export function buildApiPayload(values: Record<string, unknown>): BuiltApiPayload {
//   const formData = Object.fromEntries(
//     Object.entries(values).filter(([k]) => !BASE_SET.has(k))
//   ) as Record<string, unknown>;

//   const payload: BuiltApiPayload = {
//     full_name: String(values.full_name ?? ""),
//     email: String(values.email ?? ""),
//     phone: String(values.phone ?? ""),
//     date_of_birth: String(values.date_of_birth ?? ""),
//   };

//   // ✅ لو فاضي: متضيفوش
//   if (!isEmptyObject(formData)) {
//     payload.form_data = formData;
//   }

//   return payload;
// }


export type BuiltApiPayload = Record<string, unknown>;

export function buildApiPayload(values: Record<string, unknown>): BuiltApiPayload {
  // ✅ payload flat: base + dynamic على نفس المستوى
  const payload: Record<string, unknown> = {
    full_name: String(values.full_name ?? ""),
    email: String(values.email ?? ""),
    phone: String(values.phone ?? ""),
    date_of_birth: String(values.date_of_birth ?? ""),
  };

  // ✅ ضيف باقي الـ fields (dynamic) كـ key:value مباشرة
  for (const [k, v] of Object.entries(values)) {
    if (BASE_SET.has(k)) continue; // سيب base fields فوق
    if (v === undefined) continue;

    payload[k] = v;
  }

  return payload;
}
