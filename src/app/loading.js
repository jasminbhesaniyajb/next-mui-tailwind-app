"use client";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <CircularProgress color="primary" size={60} />
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
