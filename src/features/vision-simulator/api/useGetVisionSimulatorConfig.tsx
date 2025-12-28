import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { VisionConfig } from "../data/data";
const useGetVisionSimulatorConfig = () => {
  return useQuery({
    queryKey: [apiRoutes?.visionSimulator],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.visionSimulator);
      return data?.data as VisionConfig;
    },
  });
};

export default useGetVisionSimulatorConfig;
