import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import type { ApiSection } from "../types/form.types";
const useGetFormFields = () => {
  return useQuery({
    queryKey: [apiRoutes?.formFields],
    queryFn: async () => {
      const res = await Axios.get(apiRoutes.formFields);
      return res.data; // رجّع الريسبونس كامل
    },
    select: (res): ApiSection[] => {
      // هنا بتوحّد الشكل النهائي اللي هتستعمله في الفورم
      // حسب مثال الريسبونس: { data: [ ...sections ] }
      return (res?.data ?? []) as ApiSection[];
    },
    staleTime: 60_000,
  });
};

export default useGetFormFields;
