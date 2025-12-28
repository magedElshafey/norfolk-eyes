import { z } from "zod";
export const contactusSchema = z.object({
  name: z.string().min(1, "user name is required"),
  subject: z.string().min(1, "subject is required"),
  message: z.string().min(1, "message is required"),
  email: z.email(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^07\d{9}$/,
      "Please enter a valid UK mobile number starting with 07 and containing 11 digits."
    ),
});

export type ContactusSchemaType = z.infer<typeof contactusSchema>;
