"use client";

import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "@/components/form-text-field";
import { useSnackbar } from "@/context/snackbar-context";
import { useRouter } from "next/navigation";
import {
  getLoggedInUser,
  setLoggedInUser,
  setRegisterUser,
  getRegisterUser,
  decryptPassword,
  encryptPassword,
} from "@/utils";
import { changePasswordFormSchema } from "@/validation";

export default function ChangePasswordPage() {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const user = getLoggedInUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordFormSchema),
    mode: "onChange",
  });

  const onSubmit = ({ currentPassword, newPassword }) => {

    const decrypted = decryptPassword(user.password);
    console.log('decrypted', decrypted);
    
    if (decrypted !== currentPassword) {
      setError("currentPassword", {
        type: "manual",
        message: "Current password is incorrect",
      });
      showSnackbar("Current password is incorrect", "error");
      return;
    }

    const updatedUser = {
      ...user,
      password: encryptPassword(newPassword),
    };

    const allUsers = getRegisterUser();
    const updatedUsers = allUsers.map((user) =>
      user.email === user.email ? updatedUser : user
    );    

    setRegisterUser(updatedUsers);
    setLoggedInUser(updatedUser);

    showSnackbar("Password changed successfully!", "success");
    router.push("/products");
  };

  return (
    <div className="flex items-center justify-center h-full">
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
          Change Password
        </Typography>
        </div>

        <FormTextField
          name="currentPassword"
          label="Current Password"
          type="password"
          register={register}
          errors={errors}
        />
        <FormTextField
          name="newPassword"
          label="New Password"
          type="password"
          register={register}
          errors={errors}
        />
        <FormTextField
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          register={register}
          errors={errors}
        />

        <Button type="submit" variant="contained" fullWidth>
          Update Password
        </Button>
      </Box>
    </div>
  );
}
