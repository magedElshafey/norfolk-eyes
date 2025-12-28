import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { ProcedureListType } from "../../producers/types/ProcedureList.types";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
type Options = {
  enabled?: boolean;
};
const useGetAllProcedures = (options?: Options) => {
  const { enabled = true } = options ?? {};

  return useQuery({
    queryKey: [apiRoutes?.categories_list],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.categories_list);
      return data?.data as ProcedureListType[];
    },
    enabled,
    ...delayOptions,
  });
};

export default useGetAllProcedures;
