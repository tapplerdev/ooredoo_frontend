import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(5, { message: "Password must be at least 5 characters." }),
  });