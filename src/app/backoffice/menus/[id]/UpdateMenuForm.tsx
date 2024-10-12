"use client";
import { deleteMenu, updateMenu } from "@/app/backoffice/menus/actions";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { AddonCategories, MenuCategories, Menus } from "@prisma/client";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  menu: Menus;
  isAvailable: boolean;
  menuCategories: MenuCategories[];
  selectedMenuCategories: number[];
  addonCategories: AddonCategories[];
  selectedAddonCategories: number[];
}

export function UpdateMenuForm({
  menu,
  isAvailable,
  menuCategories,
  selectedMenuCategories,
  addonCategories,
  selectedAddonCategories,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdateMenu = async (formData: FormData) => {
    try {
      setLoading(true);
      const file = formData.get("file") as File;
      if (file.size) {
        const { url } = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        formData.set("imageUrl", url);
      }
      const response = await updateMenu(formData);
      if (response.errors) {
        response.errors.forEach((error) => toast.error(error.message));
      } else {
        toast.success("Menu Created Successfully.");
        router.push("/backoffice/menus");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component={"form"}
        onSubmit={async (e) => {
          e.preventDefault(); // Prevent the default form submission

          const formData = new FormData(e.currentTarget); // Create FormData from the form
          const result = await deleteMenu(formData); // Pass formData to deleteMenu

          if (result?.error) {
            console.error(result.error); // Handle the error if any
          }
        }}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <input hidden defaultValue={menu.id} name="id" />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "fit-content" }}
          color="error"
        >
          Delete
        </Button>
      </Box>
      <Box
        component={"form"}
        action={handleUpdateMenu}
        sx={{ mt: 2, display: "flex", flexDirection: "column" }}
      >
        <input hidden defaultValue={menu.id} name="id" />
        <TextField defaultValue={menu?.name} name="name" />
        <TextField defaultValue={menu?.price} sx={{ my: 2 }} name="price" />
        <Box>
          <Typography>Menu categories</Typography>
          <Box
            sx={{
              border: "1px solid lightgray",
              px: 1,
              py: 1,
              borderRadius: 1,
              mb: 2,
            }}
          >
            {menuCategories.map((menuCategory) => (
              <FormControlLabel
                key={menuCategory.id}
                control={
                  <Checkbox
                    defaultChecked={selectedMenuCategories?.includes(
                      menuCategory.id
                    )}
                    name="menuCategories"
                    value={menuCategory.id}
                  />
                }
                label={menuCategory.name}
              />
            ))}
          </Box>
        </Box>
        {
          <Box>
            <Typography>Addon categories</Typography>
            <Box
              sx={{
                border: "1px solid lightgray",
                px: 1,
                py: 1,
                borderRadius: 1,
                mb: 2,
              }}
            >
              {addonCategories.map((addonCategory) => (
                <FormControlLabel
                  key={addonCategory.id}
                  control={
                    <Checkbox
                      defaultChecked={selectedAddonCategories?.includes(
                        addonCategory.id
                      )}
                      name="addonCategories"
                      value={addonCategory.id}
                    />
                  }
                  label={addonCategory.name}
                />
              ))}
            </Box>
          </Box>
        }
        <Box sx={{ border: "1px solid lightgrey", p: 1, borderRadius: 1 }}>
          <input type="file" name="file" />
        </Box>
        <FormControlLabel
          control={<Checkbox defaultChecked={isAvailable} />}
          label="Available"
          name="isAvailable"
        />

        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 3 }}
          type="submit"
        >
          Update
        </Button>
      </Box>
    </>
  );
}
