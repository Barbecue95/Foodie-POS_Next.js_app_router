import BackOfficeMenuCard from "@/components/BackOfficeMenuCards";
import { getCompanyMenus } from "@/libs/action";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default async function MenusPage() {
  const menus = await getCompanyMenus();

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
          <BackOfficeMenuCard key={menu.id} menu={menu} />
        ))}
      </Box>
    </>
  );
}
