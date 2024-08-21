"use client";
import { config } from "@/config";
import { Box, Button, TextField } from "@mui/material";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewMenuPage() {
  const defaultMenuCategories = { name: "" };
  const [newMenuCategory, setNewMenuCategory] = useState<
    Partial<MenuCategories>
  >(defaultMenuCategories);
  const router = useRouter();

  const handleCreateMenu = async () => {
    const isValid = newMenuCategory.name;
    if (!isValid) return alert("Fill in the blanks");
    await fetch(`${config.backOfficeUrl}/menu-categories`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newMenuCategory),
    });
    router.push("/backoffice/menu-categories");
  };

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>Create New Menu</h1>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          placeholder="Name"
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
        <Button
          variant="contained"
          sx={{ width: 100 }}
          onClick={handleCreateMenu}
        >
          Create
        </Button>
      </Box>
    </>
  );
}
