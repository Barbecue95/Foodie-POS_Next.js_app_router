import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { getMenuCategories } from "../../menu-categories/actions";
import { createMenu } from "../actions";

export default async function NewMenuPage() {
  const menuCategories = await getMenuCategories();

  return (
    <>
      <h1 style={{ marginBottom: 10 }}>New Menu Page</h1>
      <Box
        component={"form"}
        action={createMenu}
        sx={{ display: "flex", flexDirection: "column", width: 400 }}
      >
        <TextField sx={{ mb: 2 }} label="Name" name="name" />

        <TextField sx={{ mb: 3 }} label="Price" name="price" />
        <Box>
          <Typography>Menu Categories</Typography>
          <Box sx={{ border: "1px solid lightgrey", p: 1, borderRadius: 1 }}>
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

        <FormControlLabel
          control={<Checkbox defaultChecked name="isAvailable" />}
          label="Available"
        />
        <Button variant="contained" type="submit" sx={{ width: 100, mt: 1 }}>
          Create
        </Button>
      </Box>
    </>
  );
}
