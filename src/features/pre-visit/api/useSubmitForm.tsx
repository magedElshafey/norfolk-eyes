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

function buildMultipart(
  payload: ReturnType<typeof buildApiPayload>,
  filesByName?: Record<string, File[]>
) {
  const fd = new FormData();

  fd.append("full_name", payload.full_name);
  fd.append("email", payload.email);
  fd.append("phone", payload.phone);
  fd.append("date_of_birth", payload.date_of_birth);

  fd.append("form_data", JSON.stringify(payload.form_data ?? {}));

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

      const { data } = await Axios.post(apiRoutes.submitForm, payload);
      return data;
    },

    // onSuccess: () => toast.success("Form submitted successfully ✅"),
    // onError: (error: any) => {
    //   const msg =
    //     error?.response?.data?.message ||
    //     error?.message ||
    //     "Something went wrong";
    //   toast.error(msg);
    //   console.error("❌ submit error:", error);
    // },
  });
};

export default useSubmitForm;
