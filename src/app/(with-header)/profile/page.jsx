"use client";

import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "@/components/form-text-field";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStorageUsers } from "@/hooks/useStorageUsers";
import { getLoggedInUser, setLoggedInUser } from "@/utils";
import { useSnackbar } from "@/context/snackbar-context";
import { profileFormSchema } from "@/validation";

export default function EditProfilePage() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { isEmailExist, updateUser } = useStorageUsers();

  const user = getLoggedInUser();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("mobile", user.mobile);
    }
  }, []);

  const onSubmit = (data) => {
    if (isEmailExist(data.email, user.email)) {
      setError("email", {
        type: "manual",
        message: "Email already exists",
      });
      showSnackbar("Email already exists", "error");
      return;
    }

    const updatedUser = {
      ...user,
      ...data,
      oldEmail: user.email,
    };

    updateUser(updatedUser);
    setLoggedInUser(updatedUser);

    showSnackbar("Profile updated successfully", "success");
    router.push("/products");
  };

  return (
    <div className="flex items-center h-full justify-center">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-4 rounded-2xl shadow-lg bg-white"
      >
        <div>
        <Typography variant="h5" className="text-center text-[var(--color-primary-dark)]">
          Manage Profile Information
        </Typography>
        </div>

        <FormTextField name="firstName" label="First Name" register={register} errors={errors} />
        <FormTextField name="lastName" label="Last Name" register={register} errors={errors} />
        <FormTextField name="email" label="Email" register={register} errors={errors} />
        <FormTextField name="mobile" label="Mobile Number" register={register} errors={errors} />

        <Button type="submit" variant="contained" fullWidth>
          Save
        </Button>
      </Box>
    </div>
  );
}
