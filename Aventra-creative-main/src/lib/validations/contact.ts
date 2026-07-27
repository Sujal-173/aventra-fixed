import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  service: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more — at least 10 characters"),
  // honeypot — real users never fill this in
  company_website: z.string().max(0, "").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
