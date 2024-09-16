import { Box, Button, TextField } from "@mui/material";
import { createLocation } from "../actions";

export default async function NewLocationPage() {
  return (
    <>
      <h1 style={{ marginBottom: 10 }}>New Location </h1>
      <Box
        component={"form"}
        action={createLocation}
        sx={{ display: "flex", flexDirection: "column", width: 400 }}
      >
        <TextField sx={{ mb: 2 }} label="Name" name="name" />

        <Button variant="contained" type="submit" sx={{ width: 100, mt: 1 }}>
          Create
        </Button>
      </Box>
    </>
  );
}
