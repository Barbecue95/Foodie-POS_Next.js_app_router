"use client";

import { menuCategoriesType } from "@/app/order/page";
import { Box, Tab, Tabs } from "@mui/material";
import { Menus } from "@prisma/client";
import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

interface Props {
  menuCategories: menuCategoriesType[];
  tableId: string;
  menus: Menus[];
}

export function MenuCategoryTabs({ menus, menuCategories, tableId }: Props) {
  const [menusToShow, setMenusToShow] = useState<Menus[]>([]);
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<menuCategoriesType>(menuCategories[0]);

  useEffect(() => {
    const menuIds = selectedMenuCategory.MenuCategoriesMenu.map(
      (item) => item.menuId
    );
    const menusToShow = menus.filter((menu) => menuIds.includes(menu.id));
    setMenusToShow(menusToShow);
  }, [selectedMenuCategory]);

  return (
    <Box
      sx={{
        position: "relative",
        top: { md: -10, lg: -110 },
        maxWidth: "800px",
        margin: "0 auto",
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
      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
        {menusToShow.map((menu) => {
          const { id, name, price, imageUrl } = menu;
          return (
            <MenuCard
              key={id}
              name={name}
              price={price}
              href={`/order/menus/${id}?tableId=${tableId}`}
              imageUrl={imageUrl as string}
            />
          );
        })}
      </Box>
    </Box>
  );
}
