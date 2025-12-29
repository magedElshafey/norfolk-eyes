import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { AboutDoc } from "../types/aboutHero.types";
const useGetAboutHero = () => {
  return useQuery({
    queryKey: [apiRoutes?.aboutHero],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.aboutHero);
      return data?.data as AboutDoc;
    },
  });
};

export default useGetAboutHero;
