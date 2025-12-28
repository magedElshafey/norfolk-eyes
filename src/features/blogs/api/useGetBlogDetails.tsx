import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Articles } from "../types/blog.types";
const useGetBlogDetails = (slug: string) => {
  return useQuery({
    queryKey: [apiRoutes?.blogs, slug],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes?.blogs}/${slug}`);
      console.log("data from blogs", data?.data);
      return data?.data as Articles;
    },
    enabled: !!slug,
  });
};

export default useGetBlogDetails;
