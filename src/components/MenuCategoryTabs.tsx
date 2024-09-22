"use client";

import { menuCategoriesType } from "@/app/order/page";
import { Box, Tab, Tabs } from "@mui/material";
import { MenuCategories } from "@prisma/client";
import { useState } from "react";

interface Props {
  menuCategories: menuCategoriesType[];
  tableId: string;
}

export function MenuCategoryTabs({ menuCategories, tableId }: Props) {
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategories>(menuCategories[0]);

  return (
    <Box
      sx={{
        position: "relative",
        top: { md: -10, lg: -110 },
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tabs
        TabIndicatorProps={{
          style: { background: "#1B9C85" },
        }}
        value={value}
        onChange={(_, value) => setValue(value)}
        sx={{
          pb: 1,
          "& .MuiTab-root.Mui-selected": {
            color: "#1B9C85",
            fontWeight: "bold",
          },
        }}
      >
        {menuCategories.map((item) => (
          <Tab
            key={item.id}
            label={item.name}
            onClick={() => setSelectedMenuCategory(item)}
          />
        ))}
      </Tabs>
    </Box>
  );
}
