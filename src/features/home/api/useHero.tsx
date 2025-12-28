import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { useQuery } from "@tanstack/react-query";
import type { SectionType } from "@/types/section.types";
const useHero = () => {
  return useQuery({
    queryKey: [apiRoutes?.hero],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.hero);
      return data?.data as SectionType;
    },
  });
};

export default useHero;
