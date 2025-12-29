import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { AboutServices } from "../types/aboutServices.types";
const useGetServices = () => {
  return useQuery({
    queryKey: [apiRoutes?.aboutServices],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.aboutServices);
      return data?.data as AboutServices;
    },
  });
};

export default useGetServices;
