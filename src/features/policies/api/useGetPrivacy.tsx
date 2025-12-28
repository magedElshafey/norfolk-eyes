import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Articles } from "@/features/blogs/types/blog.types";
const useGetPrivacy = () => {
  return useQuery({
    queryKey: [apiRoutes?.privacy],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.privacy);
      console.log("data from privacy", data?.data);
      return data?.data as Articles;
    },
  });
};

export default useGetPrivacy;
