import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { PatientEducationType } from "../types/patientEducation.types";

type UseGetEducationSystemParams = {
  page?: "home";
};

const useGetEducationSystem = ({ page }: UseGetEducationSystemParams = {}) => {
  return useQuery({
    queryKey: [apiRoutes.educational, page],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes.educational, {
        params: page ? { page } : undefined,
      });

      return data?.data as PatientEducationType;
    },
  });
};

export default useGetEducationSystem;
