"use client";

import { LIMIT_OPTIONS } from "@/constant";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function PageSizeSelector({ currentLimit }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event) => {
    const newLimit = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <Box sx={{ width: 150 }}>
      <FormControl size="small" fullWidth>
        <InputLabel id="limit-label">Products per page</InputLabel>
        <Select
          labelId="limit-label"
          id="limit-select"
          value={currentLimit.toString()}
          label="Products per page"
          onChange={handleChange}
        >
          {LIMIT_OPTIONS.map((value) => (
            <MenuItem key={value} value={value.toString()}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
