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
import { MenuCategories, MenuCategoriesMenus } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function MenuUpdate({ params }: Props) {
  const [menuCategories, setMenuCategories] = useState<MenuCategories>();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      getMenuCategories();
    }
  }, [id]);

  const getMenuCategories = async () => {
    const response = await fetch(
      `${config.backOfficeUrl}/menu-categories/${id}`,
      {
        headers: { "content-type": "application/json" },
        method: "GET",
      },
    );
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  const handleUpdaeMenuCategories = async () => {
    const SentData = await fetch(`${config.backOfficeUrl}/menu-categories`, {
      headers: { "content-type": "application/json" },
      method: "PUT",
      body: JSON.stringify(menuCategories),
    });
    console.log("MenuCategories: ", SentData);
    router.push("/backoffice/menu-categories");
  };

  const deleteMenuCategories = async () => {
    await fetch(`${config.backOfficeUrl}/menu-categories/${id}`, {
      method: "DELETE",
    });
    router.push("/backoffice/menu-categories");
  };

  if (!menuCategories) return null;

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>New Menu Page</h1>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          sx={{ mb: 2 }}
          value={menuCategories.name}
          onChange={(evt) =>
            setMenuCategories({ ...menuCategories, name: evt.target.value })
          }
        />

        <Box sx={{ display: "flex", gap: 15 }}>
          <Button
            variant="contained"
            sx={{ width: 100 }}
            onClick={handleUpdaeMenuCategories}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ width: 100 }}
            onClick={deleteMenuCategories}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
}
