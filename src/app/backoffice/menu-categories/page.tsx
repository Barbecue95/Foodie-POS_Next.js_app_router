"use client";

import ItemCard from "@/components/ItemCard";
import { config } from "@/config";
import { Box, Button } from "@mui/material";
import { MenuCategories } from "@prisma/client";
import CategoryIcon from "@mui/icons-material/Category";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuCategoriesPage() {
  const [MenuCategories, setMenuCategories] = useState<MenuCategories[]>([]);

  useEffect(() => {
    getMenuCategories();
  }, []);

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backOfficeUrl}/menu-categories`);
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  const router = useRouter();
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
        <h1>Menu-Categories</h1>
        <Button
          variant="contained"
          onClick={() => router.push("/backoffice/menu-categories/new")}
        >
          Create New
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        {MenuCategories.map((menuCategory) => (
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
