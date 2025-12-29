import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { Awards } from "../types/awards.types";

const useGetAwards = () => {
  return useQuery({
    queryKey: [apiRoutes?.awards],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.awards);
      return data?.data as Awards;
    },
  });
};

export default useGetAwards;
