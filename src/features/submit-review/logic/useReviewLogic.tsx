import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import handlePromisError from "@/utils/handlePromiseError";
import useSubmitReview from "../api/useSubmitReview";
import { reviewSchema, ReviewSchemaType } from "../schema/reviewSchema";

const useReviewLogic = () => {
  const { mutateAsync, isPending } = useSubmitReview();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      rating: 0,
      user_name: "",
      title: "",
      visit_date: "",
      content: "",
    },
  });

  const rating = watch("rating");
  const showFields = useMemo(() => Number(rating) > 0, [rating]);

  const onSelectRating = (v: number) => {
    setValue("rating", v, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (values: ReviewSchemaType) => {
    try {
      const res = await mutateAsync({
        rating: values.rating,
        user_name: values.user_name,
        title: values.title || undefined,
        visit_date: values.visit_date || undefined,
        content: values.content,
      });

      if (res?.status) {
        toast.success(res?.message || "Review submitted successfully");
        reset();
        return;
      }

      toast.error(res?.message || "Something went wrong");
    } catch (e) {
      handlePromisError(e);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    rating: Number(rating) || 0,
    showFields,
    onSelectRating,
  };
};

export default useReviewLogic;
