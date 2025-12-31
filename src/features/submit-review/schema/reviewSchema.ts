import { z } from "zod";

export const reviewSchema = z.object({
    rating: z
        .number({ message: "rating required" })
        .min(1, "rating required")
        .max(5),

    user_name: z
        .string()
        .min(2, "full name is required")
        .max(80, "full name is too long"),

    title: z.string().max(80, "job title is too long").optional().or(z.literal("")),

    visit_date: z
        .string()
        .optional()
        .or(z.literal("")), // input type="date" بيرجع string

    content: z
        .string()
        .min(10, "comment is too short")
        .max(800, "comment is too long"),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
