import { z } from "zod";

export const blogCategories = ["dsa", "cp", "dp", "general"];

export const blogValidator = z.object({
  title: z
    .string()
    .min(10)
    .max(100, { message: "Minimum 10 and Maximum 100 characters long" }),
  description: z
    .string()
    .min(10)
    .max(500, { message: "Minimum 10 and Maximum 500 characters long" }),
  content: z.string(),
  category: z.enum(["dsa", "cp", "dp", "general"]),
  image: z.string().url(),
});

export type BlogSchema = z.infer<typeof blogValidator>;
