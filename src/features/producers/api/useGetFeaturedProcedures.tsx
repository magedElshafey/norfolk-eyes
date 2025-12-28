import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Procedure } from "@/features/producers/types/ProcedureList.types";
const useGetFeaturedProcedures = () => {
  return useQuery({
    queryKey: [apiRoutes?.featured_procedure],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.featured_procedure);
      return data?.data as Procedure[];
    },
  });
};

export default useGetFeaturedProcedures;
