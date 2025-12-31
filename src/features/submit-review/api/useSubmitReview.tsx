import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

export type SubmitReviewPayload = {
  rating: number;
  user_name: string;
  title?: string;
  visit_date?: string;
  content: string;
};

// لو عندك Response<T> type استخدمه، هنا هنخليها مرنة:
type ApiResponse = {
  status: boolean;
  message?: string;
  data?: unknown;
};

const useSubmitReview = () => {
  return useMutation({
    mutationFn: async (payload: SubmitReviewPayload) => {
      const { data } = await Axios.post(
        // ✅ غيّر ده للروت بتاعك
        apiRoutes?.submitReview,
        payload
      );
      return data as ApiResponse;
    },
  });
};

export default useSubmitReview;
