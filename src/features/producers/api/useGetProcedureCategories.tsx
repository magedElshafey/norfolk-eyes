import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
const useGetProcedureCategories = () => {
  return useQuery({
    queryKey: [apiRoutes?.procedureCategories],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.procedureCategories);
      return data?.data;
    },
  });
};

export default useGetProcedureCategories;
