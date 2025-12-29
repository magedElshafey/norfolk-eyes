import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Articles } from "@/features/blogs/types/blog.types";
const useGetCookies = () => {
  return useQuery({
    queryKey: [apiRoutes?.cookies],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.cookies);
      return data?.data as Articles;
    },
  });
};

export default useGetCookies;
