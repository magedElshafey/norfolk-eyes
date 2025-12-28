import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Articles } from "@/features/blogs/types/blog.types";
const useGetMedical = () => {
  return useQuery({
    queryKey: [apiRoutes?.disclaimer],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.disclaimer);
      console.log("data from privacy", data?.data);
      return data?.data as Articles;
    },
  });
};

export default useGetMedical;
