import { z } from "zod";

export const signUpFromEntry = z
  .object({
    email: z.string({}).email({}),
    name: z.string().optional(),
    password: z.string({}).min(8, "Passwrod must be at least 8 chars.").max(32),
    confirmPassword: z
      .string()
      .min(8, "Password mush be at least 8 chars.")
      .max(32),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!!",

    path: ["confirmPassword"],
  });
