import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const careerBaseSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(1, "Phone number is required"),
  city: z.string().trim().optional().or(z.literal("")),
  country: z.string().trim().optional().or(z.literal("")),
  
  position: z.string().trim().min(1, "Please select a position"),
  experience: z.string().trim().min(1, "Experience is required"),
  college: z.string().trim().optional().or(z.literal("")),
  degree: z.string().trim().optional().or(z.literal("")),
  gradYear: z.string().trim().optional().or(z.literal("")),
  
  portfolioWebsite: z.string().trim().url("Invalid URL").or(z.literal("")).optional(),
  gitHub: z.string().trim().url("Invalid URL").or(z.literal("")).optional(),
  linkedIn: z.string().trim().url("Invalid URL").or(z.literal("")).optional(),
  
  whyJoin: z.string().trim().min(10, "Please explain why you want to join (min 10 characters)"),
  bestProject: z.string().trim().min(10, "Please tell us about your best project (min 10 characters)"),
});

export const clientCareerSchema = careerBaseSchema.extend({
  resume: z
    .any()
    .transform((val) => {
      if (typeof window !== "undefined" && typeof FileList !== "undefined" && val instanceof FileList) {
        return val.item(0);
      }
      return val;
    })
    .refine((file): file is File => file instanceof File, "Resume is required (PDF only)")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Resume size must be less than 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Resume must be a PDF file"),
    
  portfolioFile: z
    .any()
    .transform((val) => {
      if (typeof window !== "undefined" && typeof FileList !== "undefined" && val instanceof FileList) {
        return val.item(0) || undefined;
      }
      return val || undefined;
    })
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid file format")
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Portfolio PDF size must be less than 5MB")
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), "Portfolio file must be a PDF"),
});

interface FileLike {
  size: number;
  type: string;
}

export const serverCareerSchema = careerBaseSchema.extend({
  resume: z
    .custom<FileLike>((val) => val instanceof Blob || (val && typeof val === "object" && "size" in val && "type" in val), "Resume is required")
    .refine((file) => file && file.size <= MAX_FILE_SIZE, "Resume size must be less than 5MB")
    .refine((file) => file && ACCEPTED_FILE_TYPES.includes(file.type), "Resume must be a PDF file"),
    
  portfolioFile: z
    .custom<FileLike>((val) => !val || val instanceof Blob || (val && typeof val === "object" && "size" in val && "type" in val))
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Portfolio PDF size must be less than 5MB")
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), "Portfolio file must be a PDF"),
});

export type CareerFormValues = z.infer<typeof clientCareerSchema>;
