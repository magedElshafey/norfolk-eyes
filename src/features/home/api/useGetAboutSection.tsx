import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { AboutSectionType } from "../types/aboutSection.types";
const useGetAboutSection = () => {
  return useQuery({
    queryKey: [apiRoutes?.aboutSection],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.aboutSection);
      return data?.data as AboutSectionType;
    },
  });
};

export default useGetAboutSection;
