import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Procedure } from "../types/ProcedureList.types";
const useGetProcedureDetails = (slug: string) => {
  return useQuery({
    queryKey: [apiRoutes?.procedures, slug],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes?.procedures}/${slug}`);
      return data?.data as Procedure;
    },
    enabled: !!slug,
  });
};

export default useGetProcedureDetails;
