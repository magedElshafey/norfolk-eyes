// features/settings/api/useGetWebsiteSettings.ts
import { Axios } from "@/lib/axios/Axios";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Setting } from "../types/settings.type";

const EMPTY_SETTINGS: Setting = {
  app_name: "",
  app_description: "",
  app_logo: "",
  app_favicon: "",
  app_url: "",
  contact_email: "",
  contact_phone: "",
  contact_address: "",
  support_email: "",
  social_facebook: "",
  social_twitter: "",
  social_instagram: "",
  social_linkedin: "",
  social_github: "",
  social_youtube: "",
  maintenance_mode: false,
  copyright_text: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  seo_image: "",
  google_analytics_id: "",
  google_map_url: "",
  business_hours: "",
};

const useGetWebsiteSettings = () => {
  return useQuery({
    queryKey: [apiRoutes.setting],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes.setting);
      return data?.data as Setting;
    },
    placeholderData: EMPTY_SETTINGS,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};

export default useGetWebsiteSettings;
