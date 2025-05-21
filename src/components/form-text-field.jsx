"use client"
import { TextField } from "@mui/material";

export default function FormTextField({
  name,
  label,
  register,
  errors,
  type = "text",
  ...rest
}) {
  return (
    <div>
    <TextField
      label={label}
      type={type}
      fullWidth
      size="small"
      variant="outlined"
      className="rounded-lg"
      {...register(name)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      {...rest}
    />
    </div>
  );
}
