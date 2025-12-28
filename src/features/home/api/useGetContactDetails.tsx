import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { ContactDetails } from "../types/contact.types";
const useGetContactDetails = () => {
  return useQuery({
    queryKey: [apiRoutes?.contactHome],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.contactHome);
      return data?.data as ContactDetails;
    },
  });
};

export default useGetContactDetails;
