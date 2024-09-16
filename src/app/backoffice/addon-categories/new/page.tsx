import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { createAddonCategory } from "../actions";

export default async function NewAddonCategoryPage() {
  const menus = await prisma.menus.findMany();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 500,
      }}
      component={"form"}
      action={createAddonCategory}
    >
      <h1 style={{ marginBottom: 20 }}>Create New Addon-Category</h1>
      <TextField
        placeholder="Name"
        sx={{ mb: 2 }}
        defaultValue={""}
        name="name"
      />
      <Box>
        <Typography>Menus</Typography>
        <Box sx={{ border: "1px solid lightgrey", p: 1, borderRadius: 1 }}>
          {menus.map((menu) => (
            <FormControlLabel
              key={menu.id}
              control={<Checkbox />}
              label={menu.name}
              name="menus"
              value={menu.id}
            />
          ))}
        </Box>
      </Box>
      <FormControlLabel
        control={<Checkbox defaultChecked name="isRequired" />}
        label="Required"
        sx={{ my: 1 }}
      />
      <Button variant="contained" sx={{ width: 100 }} type="submit">
        Create
      </Button>
    </Box>
  );
}
