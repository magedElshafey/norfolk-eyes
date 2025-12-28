import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { PreVisit } from "../types/preVisit.types";
const useGetPrevistDetails = () => {
  return useQuery({
    queryKey: [apiRoutes?.preVisit],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.preVisit);
      return data?.data as PreVisit;
    },
  });
};

export default useGetPrevistDetails;
