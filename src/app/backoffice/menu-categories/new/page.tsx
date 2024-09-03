import { Box, Button, TextField } from "@mui/material";
import { createMenuCategory } from "../actions";

export default function NewMenuCategoryPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 500,
      }}
      component={"form"}
      action={createMenuCategory}
    >
      <h1 style={{ marginBottom: 20 }}>Create New MenuCategory</h1>
      <TextField
        placeholder="Name"
        sx={{ mb: 2 }}
        defaultValue={""}
        name="name"
      />
      <Button variant="contained" sx={{ width: 100 }} type="submit">
        Create
      </Button>
    </Box>
  );
}
