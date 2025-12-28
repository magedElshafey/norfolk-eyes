import { Axios } from "@/lib/axios/Axios";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Stats } from "../types/stats.types";
const useGetStatistics = () => {
  return useQuery({
    queryKey: [apiRoutes?.stats],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.stats);
      return data?.data as Stats;
    },
  });
};

export default useGetStatistics;
