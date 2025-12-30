import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { VisionConfig } from "../types/vision.types";
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
