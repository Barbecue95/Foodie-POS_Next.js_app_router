import MenuCard from "@/components/MenuCards";
import { prisma } from "@/libs/prisma";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default async function MenusPage() {
  const menus = await prisma.menus.findMany();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link href={"/backoffice/menus/new"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1D3557",
              "&:hover": { bgcolor: "#2d4466" },
            }}
          >
            New menu
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </Box>
    </>
  );
}
