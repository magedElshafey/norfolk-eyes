import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import type { ProcedureIntro } from "../types/procedureIntro.types";
const useGetProcedureHero = () => {
  return useQuery({
    queryKey: [apiRoutes?.procedureIntro],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.procedureIntro);
      return data?.data as ProcedureIntro;
    },
    ...delayOptions,
  });
};

export default useGetProcedureHero;
