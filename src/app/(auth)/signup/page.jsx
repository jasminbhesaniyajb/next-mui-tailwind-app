"use client";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorageUsers } from "@/hooks/useLocalStorageUsers";
import { signupFormSchema } from "@/validation";
import Link from "next/link";
import FormTextField from "@/components/form-text-field";
import { useSnackbar } from "@/context/snackbar-context";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
  });

  const { saveUser, isEmailExist } = useLocalStorageUsers();

  const onSubmit = (data) => {
    console.log("data", data);
    if (isEmailExist(data.email)) {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
      showSnackbar("Email already exists!", "error");
      return;
    }

    saveUser(data);
    showSnackbar("User registered successfully!", "success");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface)]">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-4 rounded-2xl shadow-lg bg-white"
      >
        <Typography
          variant="h5"
          className="text-center text-[var(--color-primary-dark)]"
        >
          Create Your Account
        </Typography>

        <div className="flex gap-4 mt-4">
          <FormTextField
            name="firstName"
            label="First Name"
            register={register}
            errors={errors}
          />
          <FormTextField
            name="lastName"
            label="Last Name"
            register={register}
            errors={errors}
          />
        </div>

          <FormTextField
            name="email"
            label="Email"
            register={register}
            errors={errors}
          />

          <FormTextField
            name="mobile"
            label="Mobile Number"
            register={register}
            errors={errors}
          />

          <FormTextField
            name="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />

          <FormTextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            register={register}
            errors={errors}
          />

        <Button type="submit" variant="contained" fullWidth>
          Sign Up
        </Button>

        <div className="mt-6 text-center">
          <Typography
            variant="body2"
            className="text-[var(--color-text-secondary)]"
          >
            Already have an account?
            <Link
              href="/signin"
              className="ml-1 text-[var(--color-text-primary)] hover:underline"
            >
              Signin
            </Link>
          </Typography>
        </div>
      </Box>
    </div>
  );
}
