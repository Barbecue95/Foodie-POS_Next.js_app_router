import ItemCard from "@/components/ItemCard";
import { Box, Button } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

export default async function MenuCategoriesPage() {
  const menuCategories = await prisma.menuCategories.findMany();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
        <h1>Menu-Categories</h1>
        <Link href={"/backoffice/menu-categories/new"}>
          <Button variant="contained">Create New</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {menuCategories.map((menuCategory) => (
          <ItemCard
            key={menuCategory.id}
            icon={<CategoryIcon fontSize="large" />}
            title={menuCategory.name}
            href={`/backoffice/menu-categories/${menuCategory.id}`}
            isAvailable
          />
        ))}
      </Box>
    </>
  );
}
