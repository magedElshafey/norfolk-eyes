import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { AboutGallery } from "../types/gallery.types";
const useGetWorkGallery = () => {
  return useQuery({
    queryKey: [apiRoutes?.workGallery],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.workGallery);
      return data?.data as AboutGallery;
    },
  });
};

export default useGetWorkGallery;
