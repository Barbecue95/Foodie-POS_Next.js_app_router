import { SideBar } from "@/components/SideBar";
import { TopBar } from "@/components/Topbar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function BackOfficeLayout({ children }: Props) {
  return (
    <div>
      <TopBar />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box sx={{ p: 2, width: "100%" }}>{children}</Box>
      </Box>
    </div>
  );
}
