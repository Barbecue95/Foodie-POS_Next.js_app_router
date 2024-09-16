"use client";
import { createMenu } from "@/app/backoffice/menus/actions";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  menuCategories: MenuCategories[];
}

export function NewMenuForm({ menuCategories }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>New Menu Page</h1>
      <Box
        component={"form"}
        action={async (formData: FormData) => {
          setLoading(true);
          const response = await createMenu(formData);
          if (response.error) {
            toast.error(response.error);
          } else {
            toast.success("Menu Created Successfully");
            setTimeout(() => {
              router.push("/backoffice/menus");
            }, 1500);
          }
          setLoading(false);
        }}
        sx={{ display: "flex", flexDirection: "column", width: 400 }}
      >
        <TextField sx={{ mb: 2 }} label="Name" name="name" />

        <TextField sx={{ mb: 2 }} label="Price" name="price" />
        <Box>
          <Typography>Menu Categories</Typography>
          <Box
            sx={{ border: "1px solid lightgrey", p: 1, borderRadius: 1, mb: 2 }}
          >
            {menuCategories.map((menuCategory) => (
              <FormControlLabel
                key={menuCategory.id}
                control={<Checkbox />}
                label={menuCategory.name}
                name="menuCategories"
                value={menuCategory.id}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ border: "1px solid lightgrey", p: 1, borderRadius: 1 }}>
          <input type="file" name="file" />
        </Box>

        <FormControlLabel
          control={<Checkbox defaultChecked name="isAvailable" />}
          label="Available"
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" type="submit" sx={{ width: 100, mt: 1 }}>
            Create
          </Button>
        )}
      </Box>
    </>
  );
}
