"use client";

import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useStorageUsers } from "@/hooks/useStorageUsers";
import FormTextField from "@/components/form-text-field";
import { useSnackbar } from "@/context/snackbar-context";
import { loginFormSchema } from "@/validation";
import { decryptPassword, setLoggedInUser } from "@/utils";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { getUserByEmail } = useStorageUsers();
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmit = ({ email, password }) => {
    try {
      const existingUser = getUserByEmail(email);
      if (!existingUser) {
        setError("email", {
          type: "manual",
          message: "Email does not exist",
        });
        showSnackbar("Email does not exist", "error");
        return;
      }

      const decrypted = decryptPassword(existingUser.password);
      console.log("decryptedPassword", decrypted, existingUser);

      if (decrypted !== password) {
        setError("password", {
          type: "manual",
          message: "Incorrect password",
        });
        showSnackbar("Incorrect password", "error");
        return;
      }

      setLoggedInUser(existingUser);
      showSnackbar("Login successful!", "success");
      router.refresh();
      router.push("/products");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface)]">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-4 rounded-2xl shadow-lg bg-white"
      >
        <div>
          <Typography
            variant="h5"
            className="text-center text-[var(--color-primary-dark)]"
          >
            Login to Your Account
          </Typography>
        </div>

        <FormTextField
          name="email"
          label="Email"
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

        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>

        <div className="mt-6 text-center">
          <Typography
            variant="body2"
          >
            Don’t have an account?
            <Link
              href="/signup"
              className="ml-2 text-[var(--color-primary)] hover:underline"
            >
              Sign Up
            </Link>
          </Typography>
        </div>
      </Box>
    </div>
  );
}
