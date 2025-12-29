import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import type { SectionType } from "@/types/section.types";
const useGetPreVisitIntro = () => {
  return useQuery({
    queryKey: [apiRoutes?.preVisitIntro],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.preVisitIntro);
      return data?.data as SectionType;
    },
  });
};

export default useGetPreVisitIntro;
