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
import { MenuCategories, Menus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewMenuPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [newMenu, setNewMenu] = useState<Partial<Menus>>();
  const [MenuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMenuCategories();
  }, []);

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backOfficeUrl}/menu-categories`);
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  const handleCreateMenu = async () => {
    if (!newMenu) return null;
    const isValid = newMenu.name;
    if (!isValid) return alert("Fill in the blanks");
    await fetch(`${config.backOfficeUrl}/menus`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...newMenu, menuCategoryIds: selected }),
    });
    router.push("/backoffice/menus");
  };

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>New Menu Page</h1>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          placeholder="Name"
          sx={{ mb: 2 }}
          onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
        />

        <TextField
          sx={{ mb: 2 }}
          placeholder="Price"
          onChange={(evt) =>
            setNewMenu({ ...newMenu, price: Number(evt.target.value) })
          }
        />

        <MultiSelect
          title="Menu Category"
          selected={selected}
          setSelected={setSelected}
          items={MenuCategories}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Available"
          onChange={(evt, value) =>
            setNewMenu({ ...newMenu, isAvailable: value })
          }
        />
        <Button
          variant="contained"
          sx={{ width: 100, mt: 1 }}
          onClick={handleCreateMenu}
        >
          Create
        </Button>
      </Box>
    </>
  );
}
