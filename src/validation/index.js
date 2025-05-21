import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be at most 32 characters")
  .regex(/[a-z]/, "Must include at least one lowercase letter")
  .regex(/[A-Z]/, "Must include at least one uppercase letter")
  .regex(/\d/, "Must include at least one number")
  .regex(/[^a-zA-Z0-9]/, "Must include at least one special character");

export const signupFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    mobile: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .regex(/^[0-9]+$/, "Only digits allowed"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: passwordSchema,
});

export const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Only digits allowed"),
});

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });
