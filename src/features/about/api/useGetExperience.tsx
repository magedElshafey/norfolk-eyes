import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { Exp } from "../types/experience.types";
const useGetExperience = () => {
  return useQuery({
    queryKey: [apiRoutes?.aboutExp],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.aboutExp);
      return data?.data as Exp;
    },
  });
};

export default useGetExperience;
