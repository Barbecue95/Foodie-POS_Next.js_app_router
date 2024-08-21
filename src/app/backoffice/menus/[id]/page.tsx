"use client";
import MultiSelect from "@/components/MultiSelect";
import { config } from "@/config";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { MenuCategories, MenuCategoriesMenus, Menus } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function MenuUpdate({ params }: Props) {
  const [menu, setMenu] = useState<Menus>();
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      getMenu();
      getMenuCategories();
    }
  }, [id]);

  const getMenu = async () => {
    const response = await fetch(`${config.backOfficeUrl}/menus/${id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    const dataFromServer = await response.json();
    const { menu } = dataFromServer;
    const selected = menu.MenuCategoriesMenu.map(
      (item: MenuCategoriesMenus) => item.menuCategoryId,
    );
    setSelected(selected);
    setMenu(menu);
  };

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backOfficeUrl}/menu-categories`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  const handleUpdaeMenu = async () => {
    await fetch(`${config.backOfficeUrl}/menus`, {
      headers: { "content-type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ ...menu, menuCategoryIds: selected }),
    });
    router.push("/backoffice/menus");
  };

  const deleteMenu = async () => {
    await fetch(`${config.backOfficeUrl}/menus/${id}`, {
      method: "DELETE",
    });
    router.push("/backoffice/menus");
  };

  if (!menu) return null;

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>New Menu Page</h1>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          sx={{ mb: 2 }}
          value={menu.name}
          onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
        />

        <TextField
          value={menu.price}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setMenu({ ...menu, price: Number(evt.target.value) })
          }
        />

        <MultiSelect
          title="Menu Category"
          selected={selected}
          setSelected={setSelected}
          items={menuCategories}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Available"
          checked={menu.isAvailable}
          onChange={(evt, value) => setMenu({ ...menu, isAvailable: value })}
        />
        <Box sx={{ display: "flex", gap: 15 }}>
          <Button
            variant="contained"
            sx={{ width: 100 }}
            onClick={handleUpdaeMenu}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ width: 100 }}
            onClick={deleteMenu}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
}
