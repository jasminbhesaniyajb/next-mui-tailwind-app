"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function FormTextField({
  name,
  label,
  register,
  errors,
  type = "text",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <TextField
        label={label}
        // type={type}
        type={type === "password" && !showPassword ? "password" : "text"}
        fullWidth
        size="small"
        variant="outlined"
        className="rounded-lg"
        {...register(name)}
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message}
        InputProps={{
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  size="small"
                  tabIndex={-1}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        {...rest}
      />
    </div>
  );
}
