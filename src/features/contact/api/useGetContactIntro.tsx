import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import type { SectionType } from "@/types/section.types";
const useGetContactIntro = () => {
  return useQuery({
    queryKey: [apiRoutes?.contactIntro],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.contactIntro);
      return data?.data as SectionType;
    },
  });
};

export default useGetContactIntro;
