import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { SectionType } from "@/types/section.types";

const useGetReviewIntro = () => {
  return useQuery({
    queryKey: [apiRoutes?.reviewIntro],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.reviewIntro);
      return data?.data as SectionType;
    },
  });
};

export default useGetReviewIntro;
