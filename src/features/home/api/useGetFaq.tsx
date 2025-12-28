import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
type FaqItemType = {
  section: {
    intro: string;
    heading: string;
    ending: string;
    description: string;
    details: string[];
    images: string | null;
  };
  faqs: {
    id: number;
    answer: string;
    question: string;
    index: number;
  }[];
  is_active: boolean;
};
const useGetFaq = () => {
  return useQuery({
    queryKey: [apiRoutes?.faq],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.faq);
      console.log("data from faq", data?.data);
      return data?.data as FaqItemType;
    },
  });
};

export default useGetFaq;
