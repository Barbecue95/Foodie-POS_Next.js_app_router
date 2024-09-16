import { getCompanyAddonCategories } from "@/libs/action";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { createAddon } from "../actions";

export default async function NewAddonPage() {
  const addonCategories = await getCompanyAddonCategories();
  return (
    <>
      <h1 style={{ marginBottom: 10 }}>New Addon </h1>
      <Box
        component={"form"}
        action={createAddon}
        sx={{ display: "flex", flexDirection: "column", width: 400 }}
      >
        <TextField sx={{ mb: 2 }} label="Name" name="name" />

        <TextField sx={{ mb: 3 }} label="Price" name="price" />
        <Box>
          <Typography>Addon Categories</Typography>
          <Box sx={{ border: "1px solid lightgrey", p: 1, borderRadius: 1 }}>
            {addonCategories.map((addonCategory) => (
              <FormControlLabel
                key={addonCategory.id}
                control={<Checkbox />}
                label={addonCategory.name}
                name="addonCategoryId"
                value={addonCategory.id}
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
