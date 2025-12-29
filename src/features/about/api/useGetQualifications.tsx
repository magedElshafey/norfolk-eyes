import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { Qul } from "../types/Qual.types";
const useGetQualifications = () => {
  return useQuery({
    queryKey: [apiRoutes?.qualifications],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.qualifications);
      return data?.data as Qul;
    },
  });
};

export default useGetQualifications;
