"use client";

import { Pagination as MuiPagination } from "@mui/material";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Pagination({ currentPage, total, limit }) {
  const totalPages = Math.ceil(total / limit);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (_event, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <MuiPagination
      page={currentPage}
      count={totalPages}
      onChange={handlePageChange}
      variant="outlined"
      shape="rounded"
      showFirstButton
      showLastButton
      siblingCount={1}
      boundaryCount={1}
      size="medium"
      color="primary"
      nextIcon={<ArrowForwardIcon />}
      prevIcon={<ArrowBackIcon />}
    />
  );
}
