import { useMutation } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { buildApiPayload } from "../utils/form.builder";

export type SubmitFormVars = {
  values: Record<string, unknown>;
  filesByName?: Record<string, File[]>;
};

function hasAnyFiles(filesByName?: Record<string, File[]>) {
  return Boolean(
    filesByName &&
      Object.values(filesByName).some(
        (arr) => Array.isArray(arr) && arr.length > 0
      )
  );
}

// function buildMultipart(
//   payload: ReturnType<typeof buildApiPayload>,
//   filesByName?: Record<string, File[]>
// ) {
//   const fd = new FormData();

//   fd.append("full_name", payload.full_name);
//   fd.append("email", payload.email);
//   fd.append("phone", payload.phone);
//   fd.append("date_of_birth", payload.date_of_birth);

//   // ✅ ابعت form_data بس لو موجود ومش فاضي
//   if (payload.form_data && !isEmptyObject(payload.form_data)) {
//     fd.append("form_data", JSON.stringify(payload.form_data));
//   }

//   if (filesByName) {
//     Object.entries(filesByName).forEach(([fieldName, files]) => {
//       (files ?? []).forEach((file) => fd.append(fieldName, file));
//     });
//   }

//   return fd;
// }
function buildMultipart(
  payload: ReturnType<typeof buildApiPayload>,
  filesByName?: Record<string, File[]>
) {
  const fd = new FormData();

  // ✅ ابعت كل keys (flat) ما عدا الملفات
  for (const [k, v] of Object.entries(payload)) {
    if (v === undefined || v === null) continue;

    // arrays/objects الأفضل تتحول لـ JSON string
    if (typeof v === "object") {
      fd.append(k, JSON.stringify(v));
    } else {
      fd.append(k, String(v));
    }
  }

  // ✅ الملفات زي ما هي
  if (filesByName) {
    Object.entries(filesByName).forEach(([fieldName, files]) => {
      (files ?? []).forEach((file) => fd.append(fieldName, file));
    });
  }

  return fd;
}

const useSubmitForm = () => {
  return useMutation({
    mutationFn: async ({ values, filesByName }: SubmitFormVars) => {
      const payload = buildApiPayload(values);

      if (hasAnyFiles(filesByName)) {
        const fd = buildMultipart(payload, filesByName);
        const { data } = await Axios.post(apiRoutes.submitForm, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
      }

      // ✅ هنا كمان payload ممكن يبقى من غير form_data أصلاً
      const { data } = await Axios.post(apiRoutes.submitForm, payload);
      return data;
    },
  });
};

export default useSubmitForm;
