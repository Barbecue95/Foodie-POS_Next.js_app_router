import { Box } from "@mui/material";
import React from "react";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box sx={{ bgcolor: "#F1FAEE", minHeight: "100vh" }}>{children}</Box>;
}
