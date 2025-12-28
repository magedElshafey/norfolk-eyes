import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { ModernTech } from "../types/modernTechnology.types";
const useGetDoctorTechnology = () => {
  return useQuery({
    queryKey: [apiRoutes?.modernTechnology],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.modernTechnology);
      return data?.data as ModernTech;
    },
  });
};

export default useGetDoctorTechnology;
