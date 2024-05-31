import { z } from "zod";

export const registerValidator = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      }
    ),
  passion: z
    .string()
    .min(2, { message: "Passion must be at least 2 characters long" })
    .max(50, { message: "Passion must be at most 50 characters long" }),
});
export type RegisterSchema = z.infer<typeof registerValidator>;

export const authValidator = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      }
    ),
});
export type AuthSchema = z.infer<typeof authValidator>;
