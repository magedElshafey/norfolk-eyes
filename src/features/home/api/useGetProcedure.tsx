import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { ProcedureSectionType } from "../types/procedureSection.types";
const useGetProcedure = () => {
  return useQuery({
    queryKey: [apiRoutes?.homeProcedure],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.homeProcedure);
      return data?.data as ProcedureSectionType;
    },
  });
};

export default useGetProcedure;
