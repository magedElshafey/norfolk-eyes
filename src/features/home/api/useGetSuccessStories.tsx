import { Axios } from "@/lib/axios/Axios";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Revs } from "../types/successStories.types";
const useGetSuccessStories = () => {
  return useQuery({
    queryKey: [apiRoutes?.successStories],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.successStories);
      return data?.data as Revs;
    },
  });
};

export default useGetSuccessStories;
