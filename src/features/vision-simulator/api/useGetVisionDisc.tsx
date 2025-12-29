import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { SectionType } from "@/types/section.types";
const useGetVisionDisc = () => {
  return useQuery({
    queryKey: [apiRoutes?.visionDisc],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.visionDisc);
      return data?.data as SectionType;
    },
  });
};

export default useGetVisionDisc;
